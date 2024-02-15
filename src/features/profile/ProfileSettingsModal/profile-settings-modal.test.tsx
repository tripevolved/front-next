import type { ProfileSettingsModalProps } from "./profile-settings-modal.types";
import { render } from "@testing-library/react";
import { ProfileSettingsModal } from "./profile-settings-modal.component";

const makeSut = (props?: ProfileSettingsModalProps) => render(<ProfileSettingsModal {...props} />);

describe("<ProfileSettingsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
