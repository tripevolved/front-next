import { PageProps } from "@/types";

type PickedPageProps = Pick<PageProps, "navbar" | "footer">;

export interface PageBaseProps extends PickedPageProps {
  children?: any;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}
