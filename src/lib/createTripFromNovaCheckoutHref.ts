import { TripsApiService } from "@/clients/trips";
import { parseAccommodationApiDateTime, type AvailabilityTravelerType } from "@/clients/accommodations";
import type { FamilyRoom } from "@/components/trip-planning/familyTypes";
import { buildRoomsInput, type CreateTripByAccommodationRoomInput } from "@/clients/trips/by-accommodation";

function parseTravelerType(raw: string | null): AvailabilityTravelerType | null {
  if (raw === "COUPLE" || raw === "FAMILY") return raw;
  return null;
}

function parseRooms(raw: string | null, travelerType: AvailabilityTravelerType): FamilyRoom[] | undefined {
  if (travelerType !== "FAMILY" || raw == null || raw.trim() === "") return undefined;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return undefined;
    return parsed as FamilyRoom[];
  } catch {
    return undefined;
  }
}

function parseRoomsInput(raw: string | null): CreateTripByAccommodationRoomInput[] | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return undefined;
    const out: CreateTripByAccommodationRoomInput[] = [];
    for (const item of parsed) {
      const r = item as Record<string, unknown>;
      if (
        typeof r?.adults !== "number" ||
        typeof r?.children !== "number" ||
        !Array.isArray(r?.childrenAges) ||
        typeof r?.rateId !== "string" ||
        typeof r?.accommodationRoomId !== "string" ||
        typeof r?.vendor !== "string"
      ) {
        return undefined;
      }
      out.push({
        adults: r.adults as number,
        children: r.children as number,
        childrenAges: r.childrenAges as number[],
        rateId: r.rateId as string,
        accommodationRoomId: r.accommodationRoomId as string,
        vendor: r.vendor as string,
      });
    }
    return out.length ? out : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Same contract as `/app/viagens/nova` checkout bootstrap: parses query string from
 * `buildAccommodationCheckoutHref` output and creates the trip.
 */
export async function createTripFromNovaCheckoutHref(checkoutHref: string, travelerId: string): Promise<string> {
  const url = checkoutHref.startsWith("http")
    ? new URL(checkoutHref)
    : new URL(checkoutHref, "https://local.invalid");
  const searchParams = url.searchParams;

  const accommodation = searchParams.get("accommodation")?.trim();
  const accommodationRoomId = searchParams.get("accommodationRoomId")?.trim();
  const startDate = searchParams.get("startDate")?.trim();
  const endDate = searchParams.get("endDate")?.trim();
  const travelerType = parseTravelerType(searchParams.get("travelerType"));
  const rateId = searchParams.get("rateId")?.trim();
  const vendor = searchParams.get("vendor")?.trim();
  const uniqueTransactionId = searchParams.get("uniqueTransactionId")?.trim();
  const uniqueTransactionValidUntil = parseAccommodationApiDateTime(searchParams.get("uniqueTransactionValidUntil"));
  const roomsRaw = searchParams.get("rooms");

  if (
    !accommodation ||
    !accommodationRoomId ||
    !startDate ||
    !endDate ||
    !travelerType ||
    !rateId ||
    !vendor ||
    !uniqueTransactionId ||
    !uniqueTransactionValidUntil
  ) {
    throw new Error("Parâmetros de checkout incompletos.");
  }

  const roomsInput = parseRoomsInput(roomsRaw);
  const rooms = parseRooms(roomsRaw, travelerType);

  if (travelerType === "FAMILY" && !roomsInput && (!rooms || rooms.length === 0)) {
    throw new Error("Quartos obrigatórios para família.");
  }

  const { id } = await TripsApiService.createTripByAccommodation({
    travelerId,
    accommodationUniqueName: accommodation,
    uniqueTransactionId,
    uniqueTransactionValidUntil,
    startDate,
    endDate,
    travelerType,
    rooms:
      roomsInput ??
      buildRoomsInput({
        travelerType,
        accommodationRoomId,
        rateId,
        vendor,
        rooms,
      }),
  });
  return id;
}
