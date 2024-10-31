import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;
          
          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className="relative w-full">
                {index > 0 && (
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 -mx-2 ${
                      isCompleted ? 'bg-fedex-purple' : 'bg-gray-200'
                    }`}
                    style={{ width: 'calc(100% + 1rem)' }}
                  />
                )}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted || isCurrent
                      ? 'bg-fedex-purple text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
              </div>
              <span
                className={`mt-2 text-sm ${
                  isCompleted || isCurrent ? 'text-fedex-purple' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;