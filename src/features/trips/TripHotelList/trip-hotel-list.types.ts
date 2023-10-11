import { TripHotelList, TripStayRoom } from "@/core/types";

export interface TripHotelListProps {
  tripId: string;
};

interface EditHotelSteps {
  onNext: (content: { value: any, isAccommodation: boolean}) => void;
  onPrevious?: () => void;
}

export interface HotelStepProps extends EditHotelSteps {
  hotelLists:TripHotelList;
}

export interface RoomsStep extends EditHotelSteps {
  roomsList: TripStayRoom[];
  isSubmitting: boolean;
}
