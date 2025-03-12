// src/components/profile/steps/PersonalInfoStep.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProfileFormData, FormErrors } from '../useProfileForm';
import { cn } from '@/lib/utils';

interface PersonalInfoStepProps {
  formData: ProfileFormData;
  updateForm: (field: keyof ProfileFormData, value: any) => void;
  errors: FormErrors;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, updateForm, errors }) => {
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
          <Label htmlFor="gender" className={errors.gender ? "text-red-500" : ""}>
            Genre <span className="text-red-500">*</span>
          </Label>
          <RadioGroup 
            id="gender" 
            className="flex space-x-4 mt-2"
            value={formData.gender}
            onValueChange={val => updateForm('gender', val)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Homme</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Femme</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Autre</Label>
            </div>
          </RadioGroup>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="age" className={errors.age ? "text-red-500" : ""}>
            Âge <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Votre âge"
            className={cn(
              "mt-1",
              errors.age ? "border-red-500" : ""
            )}
            value={formData.age}
            onChange={e => updateForm('age', e.target.value)}
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="height" className={errors.height ? "text-red-500" : ""}>
            Taille (cm) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="height" 
            type="number" 
            placeholder="Votre taille en centimètres"
            className={cn(
              "mt-1",
              errors.height ? "border-red-500" : ""
            )}
            value={formData.height}
            onChange={e => updateForm('height', e.target.value)}
          />
          {errors.height && (
            <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="weight" className={errors.weight ? "text-red-500" : ""}>
            Poids actuel (kg) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder="Votre poids actuel en kilogrammes"
            className={cn(
              "mt-1",
              errors.weight ? "border-red-500" : ""
            )}
            value={formData.weight}
            onChange={e => updateForm('weight', e.target.value)}
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="targetWeight" className={errors.targetWeight ? "text-red-500" : ""}>
            Poids cible (kg) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="targetWeight" 
            type="number" 
            placeholder="Votre poids cible en kilogrammes"
            className={cn(
              "mt-1",
              errors.targetWeight ? "border-red-500" : ""
            )}
            value={formData.targetWeight}
            onChange={e => updateForm('targetWeight', e.target.value)}
          />
          {errors.targetWeight && (
            <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalInfoStep;

