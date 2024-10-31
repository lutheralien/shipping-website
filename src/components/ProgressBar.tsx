// src/components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${
                index + 1 <= currentStep
                  ? 'bg-fedex-purple text-white'
                  : 'bg-gray-200 text-gray-600'
              }
            `}
          >
            {index + 1}
          </div>
          <span className="ml-2 text-sm hidden md:inline">{step}</span>
          {index < steps.length - 1 && (
            <div
              className={`
                flex-1 h-1 mx-4
                ${
                  index + 1 < currentStep
                    ? 'bg-fedex-purple'
                    : 'bg-gray-200'
                }
              `}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProgressBar;