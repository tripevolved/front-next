import { NextResponse } from "next/server";
import { fetchAccommodationExtendedFromTravelService } from "@/services/api/server-travel-api";

type RouteContext = {
  params: Promise<{ uniqueName: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { uniqueName } = await context.params;

  if (!uniqueName?.trim()) {
    return NextResponse.json({ message: "Missing accommodation unique name" }, { status: 400 });
  }

  try {
    const extended = await fetchAccommodationExtendedFromTravelService(uniqueName);
    return NextResponse.json(extended);
  } catch {
    return NextResponse.json({ message: "Accommodation not found" }, { status: 404 });
  }
}
