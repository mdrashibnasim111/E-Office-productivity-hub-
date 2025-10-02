
'use client';

import React, { useState, Children, isValidElement, cloneElement, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface StepperProps {
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  finishButtonText?: string;
  children: ReactNode;
  validateStep?: (step: number) => Promise<boolean> | boolean;
}

export const Step = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const Stepper: React.FC<StepperProps> = ({
  initialStep = 0,
  onStepChange,
  onFinalStepCompleted,
  backButtonText = 'Back',
  nextButtonText = 'Next',
  finishButtonText = 'Finish',
  children,
  validateStep
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isLoading, setIsLoading] = useState(false);
  const steps = Children.toArray(children).filter(child => isValidElement(child) && child.type === Step);
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = async () => {
    setIsLoading(true);
    if (validateStep) {
        const isValid = await validateStep(currentStep);
        if (!isValid) {
            setIsLoading(false);
            return; 
        }
    }
    
    if (isLastStep) {
      if (onFinalStepCompleted) {
        onFinalStepCompleted();
      }
    } else {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      if (onStepChange) {
        onStepChange(newStep);
      }
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    if (!isFirstStep) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      if (onStepChange) {
        onStepChange(newStep);
      }
    }
  };
  
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-4">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  index === currentStep ? 'bg-[#46EBEB] text-black' : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 w-16 transition-colors duration-300 ${index < currentStep ? 'bg-[#46EBEB]' : 'bg-muted'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
            <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full"
            >
            {steps[currentStep]}
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        {!isFirstStep && (
          <Button variant="outline" onClick={handleBack} disabled={isLoading}>
            {backButtonText}
          </Button>
        )}
        <Button onClick={handleNext} disabled={isLoading} className="bg-[#46EBEB] text-black hover:bg-[#46EBEB]/90 focus:ring-[#46EBEB]">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLastStep ? finishButtonText : nextButtonText}
        </Button>
      </div>
    </div>
  );
};

export default Stepper;
