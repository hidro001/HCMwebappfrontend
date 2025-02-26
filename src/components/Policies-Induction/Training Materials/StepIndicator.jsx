import React from "react";
import { FaCheck } from "react-icons/fa";

const stepsConfig = [
  { step: 1, label: "Select Company" },
  { step: 2, label: "Select Module" },
  { step: 3, label: "View Materials" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="relative mb-8">
      {/* 1) The single horizontal line behind all circles */}
      <div className="absolute inset-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-600 h-0.5 z-0" />

      {/* 2) Steps container with equal spacing */}
      <div className="relative flex justify-between items-center">
        {stepsConfig.map(({ step, label }, index) => {
          const isActive = currentStep === step;
          const isComplete = currentStep > step;

          return (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* 3) Step circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-1
                  ${
                    isComplete
                      ? "border-green-500 bg-green-500 text-white"
                      : isActive
                      ? "border-blue-500 bg-white dark:bg-gray-900 text-blue-500"
                      : "border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-900 text-gray-600"
                  }
                `}
              >
                {isComplete ? <FaCheck /> : step}
              </div>

              {/* 4) Label */}
              <span
                className={`text-xs ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
