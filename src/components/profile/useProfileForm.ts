// src/components/profile/useProfileForm.ts
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

// ... autres interfaces ...

export const useProfileForm = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isValidated, setIsValidated] = useState(false);
  
  // ... autres fonctions ...
  
  // Validation modifiée pour éviter les re-renders infinis
  const validateStep1 = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    if (!formData.gender) {
      newErrors.gender = true;
      isValid = false;
    }
    
    // ... autres validations ...
    
    // Mise à jour des erreurs seulement si nécessaire
    if (isValidated) {
      setErrors(newErrors);
    }
    
    return isValid;
  }, [formData, isValidated]);
  
  // Autres fonctions de validation similaires...
  
  const validateCurrentStep = useCallback((): boolean => {
    switch (formStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      default:
        return false;
    }
  }, [formStep, validateStep1, validateStep2, validateStep3]);
  
  // Navigation modifiée
  const handleNextStep = () => {
    setIsValidated(true);
    
    if (validateCurrentStep()) {
      setFormStep(prev => prev + 1);
    } else {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires pour continuer.",
        variant: "destructive"
      });
    }
  };
  
  // ...
  
  return {
    formStep,
    formData,
    errors,
    isValidated,
    updateForm,
    handleSelectDietaryRestriction,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    validateCurrentStep
  };
};

