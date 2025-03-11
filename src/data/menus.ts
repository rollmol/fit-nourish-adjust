import { Meal } from '@/components/nutrition/MealCard';
import { Season } from '@/components/nutrition/SeasonSelector';

const menus: Record<Season, Record<string, Meal[]>> = {
  spring: {
    breakfast: [
      {
        type: 'breakfast',
        title: 'Petit déjeuner énergisant',
        description: 'Bol de flocons d\'avoine avec fruits rouges de saison, noix et miel',
        calories: 380,
        protein: 12,
        carbs: 45,
        fats: 18
      },
      // Autres petits déjeuners de printemps...
    ],
    lunch: [
      // Déjeuners de printemps...
    ],
    dinner: [
      // Dîners de printemps...
    ]
  },
  summer: {
    breakfast: [
      {
        type: 'breakfast',
        title: 'Petit déjeuner estival',
        description: 'Yaourt grec avec fruits d\'été, granola maison et miel',
        calories: 350,
        protein: 15,
        carbs: 40,
        fats: 12
      },
      // Autres petits déjeuners d'été...
    ],
lunch: [
    {
      type: 'lunch',
      title: 'Salade estivale',
      description: 'Salade composée de tomates, concombres, feta et olives',
      calories: 420,
      protein: 15,
      carbs: 30,
      fats: 25
    },
    // Ajoutez d'autres options de déjeuner
  ],
  dinner: [
    {
      type: 'dinner',
      title: 'Grillade d\'été',
      description: 'Légumes grillés et filet de poisson, sauce aux herbes fraîches',
      calories: 450,
      protein: 30,
      carbs: 25,
      fats: 20
    },
    // Ajoutez d'autres options de dîner
  ]
  },
  // Ajouter les données pour autumn et winter...
  autumn: { breakfast: [], lunch: [], dinner: [] },
  winter: { breakfast: [], lunch: [], dinner: [] }
};

export default menus;

