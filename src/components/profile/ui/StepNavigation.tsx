// src/components/profile/ui/StepNavigation.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLastStep: boolean;
  isCurrentStepValid: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isLastStep,
  isCurrentStepValid
}) => {
  return (
    <div className="flex justify-between pt-4">
      {currentStep > 1 ? (
        <Button type="button" variant="outline" onClick={onPrev}>
          Précédent
        </Button>
      ) : (
        <div></div> // Espace vide pour l'alignement
      )}
      
      {isLastStep ? (
        <Button 
          type="submit" 
          onClick={onSubmit}
          disabled={!isCurrentStepValid}
        >
          Enregistrer mon profil
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={onNext}
          disabled={!isCurrentStepValid}
        >
          Suivant
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;

