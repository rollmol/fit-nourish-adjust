
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Calendar, UtensilsCrossed, Apple, ChefHat } from 'lucide-react';
import Header from '@/components/layout/Header';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Exemples de menus (à remplacer par des données réelles)
const menus = {
  spring: [
    {
      type: 'breakfast',
      title: 'Petit déjeuner énergisant',
      description: 'Bol de flocons d\'avoine avec fruits rouges de saison, noix et miel',
      calories: 380,
      protein: 12,
      carbs: 45,
      fats: 18
    },
    {
      type: 'lunch',
      title: 'Déjeuner léger',
      description: 'Salade de quinoa avec asperges grillées, pois frais, graines et vinaigrette légère',
      calories: 450,
      protein: 18,
      carbs: 52,
      fats: 16
    },
    {
      type: 'dinner',
      title: 'Dîner équilibré',
      description: 'Filet de poisson blanc, purée de petits pois et légumes printaniers',
      calories: 420,
      protein: 32,
      carbs: 28,
      fats: 14
    },
    {
      type: 'snack',
      title: 'Collation revitalisante',
      description: 'Yaourt grec avec fraises fraîches et amandes',
      calories: 180,
      protein: 10,
      carbs: 15,
      fats: 8
    }
  ],
  summer: [
    {
      type: 'breakfast',
      title: 'Petit déjeuner rafraîchissant',
      description: 'Smoothie bowl aux fruits d\'été, graines de chia et granola maison',
      calories: 360,
      protein: 10,
      carbs: 48,
      fats: 14
    },
    {
      type: 'lunch',
      title: 'Déjeuner estival',
      description: 'Salade de concombre, tomates, poivrons et feta avec pain complet',
      calories: 430,
      protein: 16,
      carbs: 46,
      fats: 18
    },
    {
      type: 'dinner',
      title: 'Dîner léger',
      description: 'Poulet grillé aux herbes, courgettes rôties et riz complet',
      calories: 450,
      protein: 35,
      carbs: 30,
      fats: 16
    },
    {
      type: 'snack',
      title: 'Collation fraîche',
      description: 'Brochettes de fruits d\'été et une poignée d\'amandes',
      calories: 170,
      protein: 6,
      carbs: 18,
      fats: 9
    }
  ],
  autumn: [
    {
      type: 'breakfast',
      title: 'Petit déjeuner réconfortant',
      description: 'Porridge à la cannelle avec pommes caramélisées et noix',
      calories: 390,
      protein: 11,
      carbs: 50,
      fats: 16
    },
    {
      type: 'lunch',
      title: 'Déjeuner chaleureux',
      description: 'Soupe de potiron aux lentilles avec pain aux graines',
      calories: 420,
      protein: 18,
      carbs: 48,
      fats: 14
    },
    {
      type: 'dinner',
      title: 'Dîner savoureux',
      description: 'Dinde rôtie aux herbes, patates douces et légumes racines',
      calories: 460,
      protein: 36,
      carbs: 32,
      fats: 15
    },
    {
      type: 'snack',
      title: 'Collation automnale',
      description: 'Compote de pommes maison et biscuit aux flocons d\'avoine',
      calories: 190,
      protein: 4,
      carbs: 26,
      fats: 7
    }
  ],
  winter: [
    {
      type: 'breakfast',
      title: 'Petit déjeuner nourrissant',
      description: 'Œufs brouillés, épinards et pain de seigle grillé',
      calories: 370,
      protein: 20,
      carbs: 35,
      fats: 15
    },
    {
      type: 'lunch',
      title: 'Déjeuner réchauffant',
      description: 'Dahl de lentilles corail aux épices, riz basmati et chou kale sauté',
      calories: 440,
      protein: 16,
      carbs: 55,
      fats: 12
    },
    {
      type: 'dinner',
      title: 'Dîner fortifiant',
      description: 'Ragoût de poulet aux légumes d\'hiver et boulgour',
      calories: 470,
      protein: 34,
      carbs: 36,
      fats: 16
    },
    {
      type: 'snack',
      title: 'Collation hivernale',
      description: 'Pomme au four à la cannelle et fromage blanc',
      calories: 180,
      protein: 8,
      carbs: 22,
      fats: 6
    }
  ]
};

// Type pour un repas
interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const Nutrition: React.FC = () => {
  const { toast } = useToast();
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [customMenu, setCustomMenu] = useState<Meal[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMenu = () => {
    setIsGenerating(true);
    
    // Simuler un temps de calcul du menu personnalisé
    setTimeout(() => {
      // Créer un menu personnalisé basé sur le menu de la saison actuelle
      // mais avec quelques modifications pour le rendre unique
      const baseMenu = menus[currentSeason as keyof typeof menus];
      const generatedMenu = baseMenu.map(meal => ({
        ...meal,
        // Ensure we're preserving the correct type value
        type: meal.type as 'breakfast' | 'lunch' | 'dinner' | 'snack',
        title: `${meal.title} personnalisé`,
        calories: Math.round(meal.calories * (0.9 + Math.random() * 0.2)), // Variation de ±10%
        protein: Math.round(meal.protein * (0.9 + Math.random() * 0.2)),
        carbs: Math.round(meal.carbs * (0.9 + Math.random() * 0.2)),
        fats: Math.round(meal.fats * (0.9 + Math.random() * 0.2))
      }));
      
      setCustomMenu(generatedMenu);
      setIsGenerating(false);
      
      toast({
        title: "Menu personnalisé généré",
        description: "Votre nouveau menu a été créé selon vos préférences.",
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-12"
    >
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-nutrition bg-nutrition/10 rounded-full">
            Nutrition personnalisée
          </span>
          <h1 className="text-4xl font-bold mb-4">Menus équilibrés et saisonniers</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Des repas délicieux et nutritifs, adaptés à vos besoins et aux produits de saison.
          </p>
        </div>

        <div className="mb-12">
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">Obtenez votre menu personnalisé</h3>
                <p className="text-foreground/70 mb-4">
                  Générez un menu adapté à vos objectifs, préférences et restrictions alimentaires.
                </p>
              </div>
              <div>
                <Button 
                  onClick={handleGenerateMenu} 
                  className="px-6" 
                  disabled={isGenerating}
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  {isGenerating ? "Génération en cours..." : "Générer mon menu"}
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Section du menu personnalisé */}
        {customMenu && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <ChefHat className="w-6 h-6 text-nutrition mr-2" />
              <h2 className="text-2xl font-semibold">Votre menu personnalisé</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customMenu
                .filter(item => item.type !== 'snack')
                .map((item, index) => (
                  <GlassCard key={`custom-${index}`} className="p-6 hover-lift border-2 border-nutrition/20">
                    <div className="mb-4">
                      {item.type === 'breakfast' ? (
                        <Calendar className="w-8 h-8 text-nutrition" />
                      ) : item.type === 'lunch' ? (
                        <UtensilsCrossed className="w-8 h-8 text-nutrition" />
                      ) : (
                        <Leaf className="w-8 h-8 text-nutrition" />
                      )}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-foreground/70 mb-4">{item.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-secondary/50 rounded">
                        <div className="font-medium">{item.calories}</div>
                        <div className="text-xs text-foreground/50">kcal</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/50 rounded">
                        <div className="font-medium">{item.protein}g</div>
                        <div className="text-xs text-foreground/50">Protéines</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/50 rounded">
                        <div className="font-medium">{item.carbs}g</div>
                        <div className="text-xs text-foreground/50">Glucides</div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
            </div>
            
            <div className="mt-8">
              <GlassCard className="p-6 border-2 border-nutrition/20">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <Apple className="w-5 h-5 mr-2 text-nutrition" />
                  Collations recommandées (personnalisées)
                </h3>
                {customMenu
                  .filter(item => item.type === 'snack')
                  .map((item, index) => (
                    <div key={`custom-snack-${index}`} className="mb-4 last:mb-0">
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-foreground/70 text-sm mb-2">{item.description}</p>
                      <div className="flex space-x-4 text-xs">
                        <span>{item.calories} kcal</span>
                        <span>{item.protein}g protéines</span>
                        <span>{item.carbs}g glucides</span>
                        <span>{item.fats}g lipides</span>
                      </div>
                    </div>
                  ))}
              </GlassCard>
            </div>
          </motion.div>
        )}

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Exemples de menus saisonniers</h2>
          
          <Tabs defaultValue="spring" className="w-full" onValueChange={setCurrentSeason}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="spring">Printemps</TabsTrigger>
              <TabsTrigger value="summer">Été</TabsTrigger>
              <TabsTrigger value="autumn">Automne</TabsTrigger>
              <TabsTrigger value="winter">Hiver</TabsTrigger>
            </TabsList>
            
            {['spring', 'summer', 'autumn', 'winter'].map((season) => (
              <TabsContent key={season} value={season} className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menus[season as keyof typeof menus]
                    .filter(item => item.type !== 'snack')
                    .map((item, index) => (
                      <GlassCard key={index} className="p-6 hover-lift">
                        <div className="mb-4">
                          {item.type === 'breakfast' ? (
                            <Calendar className="w-8 h-8 text-nutrition" />
                          ) : item.type === 'lunch' ? (
                            <UtensilsCrossed className="w-8 h-8 text-nutrition" />
                          ) : (
                            <Leaf className="w-8 h-8 text-nutrition" />
                          )}
                        </div>
                        <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                        <p className="text-foreground/70 mb-4">{item.description}</p>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-secondary/50 rounded">
                            <div className="font-medium">{item.calories}</div>
                            <div className="text-xs text-foreground/50">kcal</div>
                          </div>
                          <div className="text-center p-2 bg-secondary/50 rounded">
                            <div className="font-medium">{item.protein}g</div>
                            <div className="text-xs text-foreground/50">Protéines</div>
                          </div>
                          <div className="text-center p-2 bg-secondary/50 rounded">
                            <div className="font-medium">{item.carbs}g</div>
                            <div className="text-xs text-foreground/50">Glucides</div>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Apple className="w-5 h-5 mr-2 text-nutrition" />
                    Collations recommandées
                  </h3>
                  <GlassCard className="p-6">
                    {menus[season as keyof typeof menus]
                      .filter(item => item.type === 'snack')
                      .map((item, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <h4 className="font-medium mb-1">{item.title}</h4>
                          <p className="text-foreground/70 text-sm mb-2">{item.description}</p>
                          <div className="flex space-x-4 text-xs">
                            <span>{item.calories} kcal</span>
                            <span>{item.protein}g protéines</span>
                            <span>{item.carbs}g glucides</span>
                            <span>{item.fats}g lipides</span>
                          </div>
                        </div>
                      ))}
                  </GlassCard>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </motion.div>
  );
};

export default Nutrition;
