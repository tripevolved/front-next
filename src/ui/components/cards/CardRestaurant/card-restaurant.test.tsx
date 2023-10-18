import type { CardRestaurantProps } from "./card-restaurant.types";
import { render } from "@testing-library/react";
import { CardRestaurant } from "./card-restaurant.component";

const makeSut = (props?: CardRestaurantProps) => render(<CardRestaurant restaurant={{id: "restaurantId", name: "Xis do guerreiro", tags: "Lanches, Culinária local"}} {...props} />);

describe("<CardTrip>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
