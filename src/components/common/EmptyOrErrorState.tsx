import Image from "next/image";

export type EmptyOrErrorStateStatus = "empty" | "error";

export type EmptyOrErrorStateProps = {
  status: EmptyOrErrorStateStatus;
  title: string;
  description?: string;
  className?: string;
};

const STATUS_IMAGE: Record<EmptyOrErrorStateStatus, string> = {
  empty: "/assets/states/empty-state.svg",
  error: "/assets/states/error-state.svg",
};

export function EmptyOrErrorState({ status, title, description, className }: EmptyOrErrorStateProps) {
  return (
    <div className={["flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-xl", className].filter(Boolean).join(" ")}>
      <Image src={STATUS_IMAGE[status]} alt="" width={240} height={240} className="object-contain" />
      <h3 className="text-xl font-bold text-gray-900 mt-4 text-center">{title}</h3>
      {description ? <p className="text-gray-600 mt-2 text-center max-w-md">{description}</p> : null}
    </div>
  );
}

