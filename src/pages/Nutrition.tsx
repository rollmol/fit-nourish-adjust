import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, UtensilsCrossed, ChefHat } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

// Import des nouveaux composants
import SeasonSelector, { Season } from '@/components/nutrition/SeasonSelector';
import MealOptionsList from '@/components/nutrition/MealOptionsList';
import NutritionStats from '@/components/nutrition/NutritionStats';
import { Meal } from '@/components/nutrition/MealCard';

// Données des menus (à déplacer dans un fichier séparé plus tard)
import menus from '@/data/menus';

const Nutrition: React.FC = () => {
  const { toast } = useToast();
  const [selectedSeason, setSelectedSeason] = useState<Season>('spring');
  const [selectedMeals, setSelectedMeals] = useState<Record<string, number | null>>({
    breakfast: null,
    lunch: null,
    dinner: null
  });
  const [activeTab, setActiveTab] = useState('daily');

  const handleMealSelect = (mealType: string, index: number) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType] === index ? null : index
    }));
  };

  const getSelectedMealsList = () => {
    return [
      selectedMeals.breakfast !== null ? menus[selectedSeason].breakfast[selectedMeals.breakfast] : null,
      selectedMeals.lunch !== null ? menus[selectedSeason].lunch[selectedMeals.lunch] : null,
      selectedMeals.dinner !== null ? menus[selectedSeason].dinner[selectedMeals.dinner] : null
    ];
  };

  const handleSaveMealPlan = () => {
    toast({
      title: "Plan de repas enregistré",
      description: "Votre plan de repas a été sauvegardé avec succès."
    });
  };

  return (
    <>
      <Header />
      <main className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Votre Plan Nutritionnel</h1>
            <p className="text-muted-foreground">
              Découvrez des repas sains, délicieux et adaptés à la saison pour atteindre vos objectifs.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="daily" className="flex items-center">
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                Plan Quotidien
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Plan Hebdomadaire
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily">
              <div className="space-y-8">
                <SeasonSelector
                  selectedSeason={selectedSeason}
                  onSeasonChange={setSelectedSeason}
                />
                
                <div className="mb-6">
                  <MealOptionsList
                    mealType="Petit déjeuner"
                    meals={menus[selectedSeason].breakfast}
                    selectedMealIndex={selectedMeals.breakfast}
                    onMealSelect={(index) => handleMealSelect('breakfast', index)}
                  />
                  
                  <MealOptionsList
                    mealType="Déjeuner"
                    meals={menus[selectedSeason].lunch}
                    selectedMealIndex={selectedMeals.lunch}
                    onMealSelect={(index) => handleMealSelect('lunch', index)}
                  />
                  
                  <MealOptionsList
                    mealType="Dîner"
                    meals={menus[selectedSeason].dinner}
                    selectedMealIndex={selectedMeals.dinner}
                    onMealSelect={(index) => handleMealSelect('dinner', index)}
                  />
                </div>
                
                <NutritionStats selectedMeals={getSelectedMealsList()} />
                
                <div className="flex justify-end">
                  <Button 
                    size="lg" 
                    onClick={handleSaveMealPlan}
                    disabled={!Object.values(selectedMeals).some(val => val !== null)}
                  >
                    <ChefHat className="mr-2 h-5 w-5" />
                    Enregistrer mon plan de repas
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly">
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  La planification hebdomadaire sera disponible prochainement.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </>
  );
};

export default Nutrition;

