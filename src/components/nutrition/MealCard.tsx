import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

// Types
export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealCardProps {
  meal: Meal;
  isSelected?: boolean;
  onSelect?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, isSelected = false, onSelect }) => {
  return (
    <GlassCard intensity="low" className={`relative transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{meal.title}</h3>
        <p className="text-muted-foreground mb-4">{meal.description}</p>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="text-center">
            <div className="text-sm font-medium">{meal.calories}</div>
            <div className="text-xs text-muted-foreground">calories</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">{meal.protein}g</div>
            <div className="text-xs text-muted-foreground">protéines</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">{meal.carbs}g</div>
            <div className="text-xs text-muted-foreground">glucides</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">{meal.fats}g</div>
            <div className="text-xs text-muted-foreground">lipides</div>
          </div>
        </div>
        
        <Button 
          onClick={onSelect} 
          variant={isSelected ? "default" : "outline"} 
          className="w-full"
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Sélectionné
            </>
          ) : (
            "Sélectionner"
          )}
        </Button>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}
    </GlassCard>
  );
};

export default MealCard;

