import React from 'react';
import { Meal } from './MealCard';
import { Heart, Apple } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface NutritionStatsProps {
  selectedMeals: (Meal | null)[];
}

const NutritionStats: React.FC<NutritionStatsProps> = ({ selectedMeals }) => {
  // Filtrer les repas null et calculer les totaux
  const validMeals = selectedMeals.filter((meal): meal is Meal => meal !== null);
  
  const totalCalories = validMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = validMeals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = validMeals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = validMeals.reduce((sum, meal) => sum + meal.fats, 0);

  return (
    <GlassCard intensity="low" className="p-5">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Heart className="mr-2 h-5 w-5 text-red-500" />
        Résumé nutritionnel
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold">{totalCalories}</div>
          <div className="text-sm text-muted-foreground">calories</div>
        </div>
        <div className="bg-background/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold">{totalProtein}g</div>
          <div className="text-sm text-muted-foreground">protéines</div>
        </div>
        <div className="bg-background/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold">{totalCarbs}g</div>
          <div className="text-sm text-muted-foreground">glucides</div>
        </div>
        <div className="bg-background/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold">{totalFats}g</div>
          <div className="text-sm text-muted-foreground">lipides</div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center text-sm text-muted-foreground">
        <Apple className="h-4 w-4 mr-1" />
        <span>
          Ce plan alimentaire est adapté à votre profil et vos objectifs
        </span>
      </div>
    </GlassCard>
  );
};

export default NutritionStats;

