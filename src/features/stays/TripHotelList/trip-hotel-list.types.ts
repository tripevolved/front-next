import { TripHotelListTransaction, TripStay, TripStayRoom } from "@/core/types";

export interface TripHotelListProps {
  tripId: string;
}

interface EditHotelSteps {
  onNext: () => void;
  onPrevious?: () => void;
}

export interface HotelStepProps extends EditHotelSteps {
  hotelLists: TripHotelListTransaction;
  setFunction: (value: Omit<TripStay, "highlight">) => void;
}

export interface RoomsStep extends EditHotelSteps {
  roomsList: TripStayRoom[];
  isSubmitting: boolean;
  setFunction: (value: TripStayRoom[]) => void;
  chosenRooms: TripStayRoom[];
}
