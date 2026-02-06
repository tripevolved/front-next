"use client";

interface CheckoutStepperProps {
  stepNames: readonly string[];
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export function CheckoutStepper({
  stepNames,
  currentStep,
  totalSteps,
  progress,
}: CheckoutStepperProps) {
  return (
    <div className="w-full mb-8">
      <div className="h-2 bg-secondary-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-accent-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Passo ${currentStep} de ${totalSteps}`}
        />
      </div>
      <div className="flex justify-between gap-2">
        {stepNames.map((name, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          return (
            <div
              key={step}
              className={`flex flex-col items-center flex-1 min-w-0 ${
                isActive ? "text-secondary-900" : isCompleted ? "text-secondary-600" : "text-secondary-400"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-baloo font-semibold shrink-0 mb-1 ${
                  isActive
                    ? "bg-accent-500 text-secondary-900"
                    : isCompleted
                      ? "bg-accent-400/80 text-secondary-900"
                      : "bg-secondary-200 text-secondary-500"
                }`}
              >
                {isCompleted ? "✓" : step}
              </span>
              <span className="font-comfortaa text-xs md:text-sm text-center truncate w-full">
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
