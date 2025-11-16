import React, { useRef } from "react";

type Item = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function CruiseOptionsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef && scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const items: Item[] = [
    {
      id: 1,
      title: "Filme 1",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 2,
      title: "Filme 2",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 3,
      title: "Filme 3",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 4,
      title: "Filme 4",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 5,
      title: "Filme 5",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 6,
      title: "Filme 6",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 7,
      title: "Filme 7",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 8,
      title: "Filme 8",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
  ];

  return (
    <div className="w-full">
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 h-full w-6 z-10 bg-transparent hover:bg-black/50 text-gray-300 flex items-center justify-center transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 h-full w-6 z-10 bg-transparent hover:bg-black/50 text-gray-300 flex items-center justify-center transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth p-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg rounded-lg bg-white border border-gray-200 overflow-hidden group/item"
            >
              <div className="flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover/item:scale-110"
                  />
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <h1 className="font-bold font-baloo text-gray-800 text-xl mb-1">
                      {item.title}
                    </h1>
                    <p className="text-gray-600 text-md">
                      A partir de{" "}
                      <span className="font-bold text-primary-500 text-lg">
                        R${item.price}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
