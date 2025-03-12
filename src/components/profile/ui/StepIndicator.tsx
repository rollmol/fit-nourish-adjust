// src/components/profile/ui/StepIndicator.tsx
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: { label: string; number: number }[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col items-center">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-colors ${
              currentStep === step.number 
                ? 'bg-primary text-white' 
                : currentStep > step.number 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-secondary text-foreground/50'
            }`}
          >
            {step.number}
          </div>
          <span className="text-xs text-foreground/70">
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;

