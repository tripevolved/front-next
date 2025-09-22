import { ReactNode } from "react";

type DetailsCardProps = {
  message: string | ReactNode;
};

export const DetailsCard = ({ message }: DetailsCardProps) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow w-96 h-52 flex flex-col items-center">
      <div className="text-primary-300 mb-4">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
      <p className="text-secondary-600 text-lg font-comfortaa text-center">{message}</p>
    </div>
  );
};
