
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Calendar, UtensilsCrossed, Apple, ChefHat, Heart, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Types
interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

// Exemples de menus avec options multiples (à remplacer par des données réelles)
const menus = {
  spring: {
    breakfast: [
      {
        title: 'Petit déjeuner énergisant',
        description: 'Bol de flocons d\'avoine avec fruits rouges de saison, noix et miel',
        calories: 380,
        protein: 12,
        carbs: 45,
        fats: 18
      },
      {
        title: 'Petit déjeuner léger',
        description: 'Smoothie vert aux épinards, banane, pomme et graines de chia',
        calories: 320,
        protein: 8,
        carbs: 42,
        fats: 14
      },
      {
        title: 'Petit déjeuner protéiné',
        description: 'Omelette aux asperges, fromage de chèvre et herbes fraîches, pain complet',
        calories: 420,
        protein: 22,
        carbs: 35,
        fats: 20
      }
    ],
    lunch: [
      {
        title: 'Déjeuner léger',
        description: 'Salade de quinoa avec asperges grillées, pois frais, graines et vinaigrette légère',
        calories: 450,
        protein: 18,
        carbs: 52,
        fats: 16
      },
      {
        title: 'Déjeuner méditerranéen',
        description: 'Wrap au houmous, légumes grillés et feta, accompagné d\'une salade verte',
        calories: 480,
        protein: 16,
        carbs: 56,
        fats: 18
      },
      {
        title: 'Déjeuner du marché',
        description: 'Buddha bowl aux légumes printaniers, œuf mollet et sauce au tahini',
        calories: 430,
        protein: 15,
        carbs: 50,
        fats: 17
      }
    ],
    dinner: [
      {
        title: 'Dîner équilibré',
        description: 'Filet de poisson blanc, purée de petits pois et légumes printaniers',
        calories: 420,
        protein: 32,
        carbs: 28,
        fats: 14
      },
      {
        title: 'Dîner végétarien',
        description: 'Risotto aux asperges, petits pois et parmesan, salade d\'herbes',
        calories: 460,
        protein: 18,
        carbs: 60,
        fats: 16
      },
      {
        title: 'Dîner complet',
        description: 'Poulet rôti aux herbes fraîches, pommes de terre nouvelles et légumes de saison',
        calories: 510,
        protein: 35,
        carbs: 42,
        fats: 18
      }
    ],
    snack: [
      {
        title: 'Collation revitalisante',
        description: 'Yaourt grec avec fraises fraîches et amandes',
        calories: 180,
        protein: 10,
        carbs: 15,
        fats: 8
      },
      {
        title: 'Collation fruitée',
        description: 'Salade de fruits de saison avec menthe fraîche',
        calories: 120,
        protein: 2,
        carbs: 28,
        fats: 1
      },
      {
        title: 'Collation énergétique',
        description: 'Mélange de fruits secs et noix, avec un carré de chocolat noir',
        calories: 210,
        protein: 6,
        carbs: 20,
        fats: 12
      }
    ]
  },
  summer: {
    breakfast: [
      {
        title: 'Petit déjeuner rafraîchissant',
        description: 'Smoothie bowl aux fruits d\'été, graines de chia et granola maison',
        calories: 360,
        protein: 10,
        carbs: 48,
        fats: 14
      },
      {
        title: 'Petit déjeuner estival',
        description: 'Bol de fromage blanc, pêches fraîches, miel et pistaches',
        calories: 340,
        protein: 15,
        carbs: 40,
        fats: 12
      },
      {
        title: 'Petit déjeuner méditerranéen',
        description: 'Pain complet, houmous, concombre, tomate et olives',
        calories: 380,
        protein: 14,
        carbs: 45,
        fats: 15
      }
    ],
    lunch: [
      {
        title: 'Déjeuner estival',
        description: 'Salade de concombre, tomates, poivrons et feta avec pain complet',
        calories: 430,
        protein: 16,
        carbs: 46,
        fats: 18
      },
      {
        title: 'Déjeuner méditerranéen',
        description: 'Gaspacho de tomates, tartine de pain complet à l\'avocat et aux herbes',
        calories: 410,
        protein: 12,
        carbs: 48,
        fats: 16
      },
      {
        title: 'Déjeuner protéiné',
        description: 'Salade niçoise aux haricots verts, thon, olives et œuf dur',
        calories: 450,
        protein: 25,
        carbs: 35,
        fats: 22
      }
    ],
    dinner: [
      {
        title: 'Dîner léger',
        description: 'Poulet grillé aux herbes, courgettes rôties et riz complet',
        calories: 450,
        protein: 35,
        carbs: 30,
        fats: 16
      },
      {
        title: 'Dîner méditerranéen',
        description: 'Filet de daurade à la plancha, ratatouille et quinoa',
        calories: 430,
        protein: 30,
        carbs: 36,
        fats: 14
      },
      {
        title: 'Dîner fraîcheur',
        description: 'Salade composée aux crevettes, avocat, mangue et vinaigrette citronnée',
        calories: 410,
        protein: 28,
        carbs: 26,
        fats: 18
      }
    ],
    snack: [
      {
        title: 'Collation fraîche',
        description: 'Brochettes de fruits d\'été et une poignée d\'amandes',
        calories: 170,
        protein: 6,
        carbs: 18,
        fats: 9
      },
      {
        title: 'Collation hydratante',
        description: 'Melon glacé et quelques graines de courge',
        calories: 140,
        protein: 5,
        carbs: 16,
        fats: 6
      },
      {
        title: 'Collation légère',
        description: 'Concombre et radis avec houmous maison',
        calories: 130,
        protein: 4,
        carbs: 14,
        fats: 7
      }
    ]
  },
  autumn: {
    breakfast: [
      {
        title: 'Petit déjeuner réconfortant',
        description: 'Porridge à la cannelle avec pommes caramélisées et noix',
        calories: 390,
        protein: 11,
        carbs: 50,
        fats: 16
      },
      {
        title: 'Petit déjeuner vitaminé',
        description: 'Bol de yaourt aux fruits d\'automne, granola et purée de noisette',
        calories: 410,
        protein: 14,
        carbs: 48,
        fats: 18
      },
      {
        title: 'Petit déjeuner complet',
        description: 'Tartines de pain aux céréales, avocat et œuf poché',
        calories: 430,
        protein: 18,
        carbs: 42,
        fats: 20
      }
    ],
    lunch: [
      {
        title: 'Déjeuner chaleureux',
        description: 'Soupe de potiron aux lentilles avec pain aux graines',
        calories: 420,
        protein: 18,
        carbs: 48,
        fats: 14
      },
      {
        title: 'Déjeuner automnal',
        description: 'Salade tiède de patates douces rôties, roquette, feta et noix',
        calories: 440,
        protein: 16,
        carbs: 50,
        fats: 16
      },
      {
        title: 'Déjeuner gourmand',
        description: 'Bowl de quinoa, champignons, courge rôtie et sauce tahini',
        calories: 460,
        protein: 15,
        carbs: 52,
        fats: 18
      }
    ],
    dinner: [
      {
        title: 'Dîner savoureux',
        description: 'Dinde rôtie aux herbes, patates douces et légumes racines',
        calories: 460,
        protein: 36,
        carbs: 32,
        fats: 15
      },
      {
        title: 'Dîner végétarien',
        description: 'Curry de lentilles et légumes d\'automne, riz basmati',
        calories: 420,
        protein: 18,
        carbs: 56,
        fats: 12
      },
      {
        title: 'Dîner réconfortant',
        description: 'Gratin de chou-fleur et brocoli au fromage, accompagné d\'une salade',
        calories: 440,
        protein: 25,
        carbs: 30,
        fats: 24
      }
    ],
    snack: [
      {
        title: 'Collation automnale',
        description: 'Compote de pommes maison et biscuit aux flocons d\'avoine',
        calories: 190,
        protein: 4,
        carbs: 26,
        fats: 7
      },
      {
        title: 'Collation énergétique',
        description: 'Muffin à la citrouille et aux épices fait maison',
        calories: 210,
        protein: 5,
        carbs: 28,
        fats: 9
      },
      {
        title: 'Collation satisfaisante',
        description: 'Poire et quelques carrés de chocolat noir',
        calories: 160,
        protein: 2,
        carbs: 24,
        fats: 6
      }
    ]
  },
  winter: {
    breakfast: [
      {
        title: 'Petit déjeuner nourrissant',
        description: 'Œufs brouillés, épinards et pain de seigle grillé',
        calories: 370,
        protein: 20,
        carbs: 35,
        fats: 15
      },
      {
        title: 'Petit déjeuner chaud',
        description: 'Bouillie d\'avoine aux pommes cuites, cannelle et beurre de cacahuète',
        calories: 410,
        protein: 14,
        carbs: 52,
        fats: 14
      },
      {
        title: 'Petit déjeuner revigorant',
        description: 'Bol de fromage blanc, muesli, orange et graines de courge',
        calories: 380,
        protein: 18,
        carbs: 42,
        fats: 12
      }
    ],
    lunch: [
      {
        title: 'Déjeuner réchauffant',
        description: 'Dahl de lentilles corail aux épices, riz basmati et chou kale sauté',
        calories: 440,
        protein: 16,
        carbs: 55,
        fats: 12
      },
      {
        title: 'Déjeuner consistant',
        description: 'Soupe de légumes d\'hiver aux haricots blancs, avec pain de campagne',
        calories: 420,
        protein: 18,
        carbs: 52,
        fats: 10
      },
      {
        title: 'Déjeuner complet',
        description: 'Quiche aux poireaux et champignons, salade d\'endives',
        calories: 460,
        protein: 20,
        carbs: 42,
        fats: 22
      }
    ],
    dinner: [
      {
        title: 'Dîner fortifiant',
        description: 'Ragoût de poulet aux légumes d\'hiver et boulgour',
        calories: 470,
        protein: 34,
        carbs: 36,
        fats: 16
      },
      {
        title: 'Dîner hivernal',
        description: 'Pot-au-feu de bœuf aux légumes racines, sauce aux herbes',
        calories: 490,
        protein: 38,
        carbs: 34,
        fats: 18
      },
      {
        title: 'Dîner équilibré',
        description: 'Filet de cabillaud, purée de céleri-rave et carottes glacées',
        calories: 410,
        protein: 32,
        carbs: 30,
        fats: 14
      }
    ],
    snack: [
      {
        title: 'Collation hivernale',
        description: 'Pomme au four à la cannelle et fromage blanc',
        calories: 180,
        protein: 8,
        carbs: 22,
        fats: 6
      },
      {
        title: 'Collation réconfortante',
        description: 'Chocolat chaud à base de lait d\'amande et une clémentine',
        calories: 170,
        protein: 6,
        carbs: 24,
        fats: 5
      },
      {
        title: 'Collation gourmande',
        description: 'Pain d\'épices maison et infusion aux fruits rouges',
        calories: 190,
        protein: 4,
        carbs: 30,
        fats: 6
      }
    ]
  }
};

const Nutrition: React.FC = () => {
  const { toast } = useToast();
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [customMenu, setCustomMenu] = useState<Meal[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<Record<string, number>>({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0
  });

  const handleGenerateMenu = () => {
    setIsGenerating(true);
    
    // Simuler un temps de calcul du menu personnalisé
    setTimeout(() => {
      // Créer un menu personnalisé basé sur les choix sélectionnés
      const generatedMenu: Meal[] = [
        {
          ...menus[currentSeason as keyof typeof menus].breakfast[selectedMeals.breakfast],
          type: 'breakfast'
        },
        {
          ...menus[currentSeason as keyof typeof menus].lunch[selectedMeals.lunch],
          type: 'lunch'
        },
        {
          ...menus[currentSeason as keyof typeof menus].dinner[selectedMeals.dinner],
          type: 'dinner'
        },
        {
          ...menus[currentSeason as keyof typeof menus].snack[selectedMeals.snack],
          type: 'snack'
        }
      ];
      
      setCustomMenu(generatedMenu);
      setIsGenerating(false);
      
      toast({
        title: "Menu personnalisé généré",
        description: "Votre nouveau menu a été créé selon vos préférences.",
      });
    }, 1500);
  };

  const handleSelectMeal = (type: string, index: number) => {
    setSelectedMeals(prev => ({
      ...prev,
      [type]: index
    }));
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
                <h3 className="text-2xl font-semibold mb-2">Composez votre menu personnalisé</h3>
                <p className="text-foreground/70 mb-4">
                  Sélectionnez vos plats préférés pour chaque repas et générez votre menu idéal.
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
              <TabsContent key={season} value={season} className="space-y-8">
                {/* Petit-déjeuner options */}
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-nutrition" />
                    Options de petit-déjeuner
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menus[season as keyof typeof menus].breakfast.map((item, index) => (
                      <GlassCard 
                        key={`breakfast-${index}`} 
                        className={`p-6 cursor-pointer transition-all hover:shadow-md ${selectedMeals.breakfast === index && season === currentSeason ? 'border-2 border-nutrition' : ''}`}
                        onClick={() => handleSelectMeal('breakfast', index)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium">{item.title}</h4>
                          {selectedMeals.breakfast === index && season === currentSeason && (
                            <div className="bg-nutrition text-white p-1 rounded-full">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-foreground/70 text-sm mb-3">{item.description}</p>
                        <div className="flex justify-between text-xs text-foreground/60">
                          <span>{item.calories} kcal</span>
                          <span>{item.protein}g protéines</span>
                          <span>{item.carbs}g glucides</span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
                
                {/* Déjeuner options */}
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <UtensilsCrossed className="w-6 h-6 mr-2 text-nutrition" />
                    Options de déjeuner
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menus[season as keyof typeof menus].lunch.map((item, index) => (
                      <GlassCard 
                        key={`lunch-${index}`} 
                        className={`p-6 cursor-pointer transition-all hover:shadow-md ${selectedMeals.lunch === index && season === currentSeason ? 'border-2 border-nutrition' : ''}`}
                        onClick={() => handleSelectMeal('lunch', index)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium">{item.title}</h4>
                          {selectedMeals.lunch === index && season === currentSeason && (
                            <div className="bg-nutrition text-white p-1 rounded-full">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-foreground/70 text-sm mb-3">{item.description}</p>
                        <div className="flex justify-between text-xs text-foreground/60">
                          <span>{item.calories} kcal</span>
                          <span>{item.protein}g protéines</span>
                          <span>{item.carbs}g glucides</span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
                
                {/* Dîner options */}
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-nutrition" />
                    Options de dîner
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menus[season as keyof typeof menus].dinner.map((item, index) => (
                      <GlassCard 
                        key={`dinner-${index}`} 
                        className={`p-6 cursor-pointer transition-all hover:shadow-md ${selectedMeals.dinner === index && season === currentSeason ? 'border-2 border-nutrition' : ''}`}
                        onClick={() => handleSelectMeal('dinner', index)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium">{item.title}</h4>
                          {selectedMeals.dinner === index && season === currentSeason && (
                            <div className="bg-nutrition text-white p-1 rounded-full">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-foreground/70 text-sm mb-3">{item.description}</p>
                        <div className="flex justify-between text-xs text-foreground/60">
                          <span>{item.calories} kcal</span>
                          <span>{item.protein}g protéines</span>
                          <span>{item.carbs}g glucides</span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
                
                {/* Collation options */}
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Apple className="w-6 h-6 mr-2 text-nutrition" />
                    Options de collations
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menus[season as keyof typeof menus].snack.map((item, index) => (
                      <GlassCard 
                        key={`snack-${index}`} 
                        className={`p-6 cursor-pointer transition-all hover:shadow-md ${selectedMeals.snack === index && season === currentSeason ? 'border-2 border-nutrition' : ''}`}
                        onClick={() => handleSelectMeal('snack', index)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium">{item.title}</h4>
                          {selectedMeals.snack === index && season === currentSeason && (
                            <div className="bg-nutrition text-white p-1 rounded-full">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-foreground/70 text-sm mb-3">{item.description}</p>
                        <div className="flex justify-between text-xs text-foreground/60">
                          <span>{item.calories} kcal</span>
                          <span>{item.protein}g protéines</span>
                          <span>{item.fats}g lipides</span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
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
