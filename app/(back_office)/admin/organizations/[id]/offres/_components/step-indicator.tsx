'use client'

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2",
                index < currentStep 
                  ? "bg-[#1E1F22] border-[#1E1F22] text-white"
                  : index === currentStep
                  ? "border-[#1E1F22] text-[#1E1F22]"
                  : "border-gray-300 text-gray-300"
              )}>
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={cn(
                "text-xs mt-2",
                index <= currentStep ? "text-[#1E1F22]" : "text-gray-300"
              )}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5",
                index < currentStep ? "bg-[#1E1F22]" : "bg-gray-300"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}