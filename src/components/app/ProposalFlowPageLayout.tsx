import Image from "next/image";

type Props = {
  children: React.ReactNode;
  showLeftColumn?: boolean;
  leftImage?: { src: string; alt?: string };
};

const DEFAULT_LEFT_IMAGE = { src: "/assets/trip/trip-cover.png", alt: "" };

export function ProposalFlowPageLayout({
  children,
  showLeftColumn = false,
  leftImage = DEFAULT_LEFT_IMAGE,
}: Props) {
  if (showLeftColumn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row min-h-screen">
          <div className="hidden lg:flex lg:w-[45%] lg:min-h-screen lg:shrink-0 bg-primary-600 items-center justify-center p-8">
            <div className="relative w-full max-w-md aspect-[4/3]">
              <Image
                src={leftImage.src}
                alt={leftImage.alt ?? ""}
                fill
                className="object-contain object-center"
                priority
                sizes="(min-width: 1024px) 45vw, 0px"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-screen w-full min-w-0 px-4 pb-4">
            <div className="w-full flex flex-col flex-1 min-h-screen bg-white shadow-sm rounded-b-lg overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto w-full min-h-screen px-4 pb-4">
        <div className="w-full flex flex-col flex-1 min-h-screen bg-white shadow-sm rounded-b-lg overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
