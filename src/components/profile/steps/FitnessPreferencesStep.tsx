// src/components/profile/steps/FitnessPreferencesStep.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ProfileFormData, FormErrors } from '../useProfileForm';
import { cn } from '@/lib/utils';

interface FitnessPreferencesStepProps {
  formData: ProfileFormData;
  updateForm: (field: keyof ProfileFormData, value: any) => void;
  errors: FormErrors;
}

const FitnessPreferencesStep: React.FC<FitnessPreferencesStepProps> = ({ formData, updateForm, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="fitnessLevel" className={errors.fitnessLevel ? "text-red-500" : ""}>
            Niveau de fitness <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.fitnessLevel}
            onValueChange={val => updateForm('fitnessLevel', val)}
          >
            <SelectTrigger 
              id="fitnessLevel" 
              className={cn(
                "mt-1",
                errors.fitnessLevel ? "border-red-500" : ""
              )}
            >
              <SelectValue placeholder="Sélectionnez votre niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Débutant</SelectItem>
              <SelectItem value="intermediate">Intermédiaire</SelectItem>
              <SelectItem value="advanced">Avancé</SelectItem>
            </SelectContent>
          </Select>
          {errors.fitnessLevel && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="workoutLocation" className={errors.workoutLocation ? "text-red-500" : ""}>
            Lieu d'entraînement <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.workoutLocation}
            onValueChange={val => updateForm('workoutLocation', val)}
          >
            <SelectTrigger 
              id="workoutLocation" 
              className={cn(
                "mt-1",
                errors.workoutLocation ? "border-red-500" : ""
              )}
            >
              <SelectValue placeholder="Où préférez-vous vous entraîner?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">À la maison</SelectItem>
              <SelectItem value="gym">En salle de sport</SelectItem>
              <SelectItem value="outdoors">En extérieur</SelectItem>
              <SelectItem value="mixed">Mixte</SelectItem>
            </SelectContent>
          </Select>
          {errors.workoutLocation && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="workoutDuration" className={errors.workoutDuration ? "text-red-500" : ""}>
            Durée d'entraînement préférée <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.workoutDuration}
            onValueChange={val => updateForm('workoutDuration', val)}
          >
            <SelectTrigger 
              id="workoutDuration" 
              className={cn(
                "mt-1",
                errors.workoutDuration ? "border-red-500" : ""
              )}
            >
              <SelectValue placeholder="Durée d'entraînement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15min">15 minutes</SelectItem>
              <SelectItem value="30min">30 minutes</SelectItem>
              <SelectItem value="45min">45 minutes</SelectItem>
              <SelectItem value="60min">60 minutes ou plus</SelectItem>
            </SelectContent>
          </Select>
          {errors.workoutDuration && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="daysPerWeek" className={errors.daysPerWeek ? "text-red-500" : ""}>
            Jours d'entraînement par semaine <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.daysPerWeek}
            onValueChange={val => updateForm('daysPerWeek', val)}
          >
            <SelectTrigger 
              id="daysPerWeek" 
              className={cn(
                "mt-1",
                errors.daysPerWeek ? "border-red-500" : ""
              )}
            >
              <SelectValue placeholder="Nombre de jours par semaine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2days">1-2 jours</SelectItem>
              <SelectItem value="3days">3-4 jours</SelectItem>
              <SelectItem value="5days">5-6 jours</SelectItem>
              <SelectItem value="7days">Tous les jours</SelectItem>
            </SelectContent>
          </Select>
          {errors.daysPerWeek && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FitnessPreferencesStep;

