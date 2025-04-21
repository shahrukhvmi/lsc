import React from "react";
import { useSelector } from "react-redux";

export default function Stepper() {
  const currentStep = useSelector((state) => state.step.currentStep);

  const steps = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 7",
    "Step 8",
  ];

  return (
    <div className="w-full  p-4 rounded-md">
      <div className="flex items-center justify-between relative">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
                  ${isCompleted ? "bg-primary text-white" : ""}
                  ${isCurrent ? "bg-blue-600 text-white" : ""}
                  ${!isCompleted && !isCurrent ? "bg-gray-200 text-gray-500" : ""}
                `}
              >
                {isCompleted ? "✔" : stepNumber}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-sm text-gray-600 text-center">
                {label}
              </div>

              {/* Horizontal Line Connector (not on last step) */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-24 w-full h-0.5 
                    ${stepNumber < currentStep ? "bg-primary" : "bg-blue-600"}
                  `}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
