// src/components/profile/steps/NutritionPreferencesStep.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { ProfileFormData, FormErrors } from '../useProfileForm';

interface NutritionPreferencesStepProps {
  formData: ProfileFormData;
  updateForm: (field: keyof ProfileFormData, value: any) => void;
  handleSelectDietaryRestriction: (restriction: string) => void;
  errors: FormErrors;
}

const NutritionPreferencesStep: React.FC<NutritionPreferencesStepProps> = ({ 
  formData, 
  updateForm,
  handleSelectDietaryRestriction,
  errors
}) => {
  const dietaryRestrictions = [
    'Végétarien', 
    'Végétalien', 
    'Sans gluten', 
    'Sans lactose', 
    'Sans fruits de mer', 
    'Sans noix'
  ];

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
          <Label className="block mb-3">Restrictions alimentaires</Label>
          <div className="grid grid-cols-2 gap-3">
            {dietaryRestrictions.map((restriction) => (
              <div
                key={restriction}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  formData.dietaryRestrictions.includes(restriction)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleSelectDietaryRestriction(restriction)}
              >
                <span className="text-sm font-medium">{restriction}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="includeSnacks" className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id="includeSnacks"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              checked={formData.includeSnacks}
              onChange={(e) => updateForm('includeSnacks', e.target.checked)}
            />
            <span>Inclure des collations dans mes plans de repas</span>
          </Label>
        </div>
      </div>
    </motion.div>
  );
};

export default NutritionPreferencesStep;

