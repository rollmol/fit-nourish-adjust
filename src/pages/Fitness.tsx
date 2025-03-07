
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Timer, Activity, Heart, Award, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const workoutPlans = {
  beginner: [
    {
      title: "Introduction au Fitness",
      duration: "20 min",
      focus: "Corps entier",
      intensity: "Légère",
      description: "Un programme doux pour s'initier à l'activité physique avec des exercices de base.",
      exercises: [
        { name: "Marche rapide", reps: "5 min" },
        { name: "Squats débutants", reps: "3 × 8" },
        { name: "Pompes sur genoux", reps: "3 × 6" },
        { name: "Planche modifiée", reps: "3 × 20 sec" },
        { name: "Étirements", reps: "5 min" }
      ]
    },
    {
      title: "Fondations Cardio",
      duration: "25 min",
      focus: "Cardiovasculaire",
      intensity: "Légère à modérée",
      description: "Améliorer l'endurance cardiovasculaire avec des intervalles accessibles.",
      exercises: [
        { name: "Jumping jacks", reps: "3 × 30 sec" },
        { name: "Pas chassés", reps: "3 × 30 sec" },
        { name: "Marche avec élévation de genoux", reps: "3 × 30 sec" },
        { name: "Récupération active", reps: "1 min entre séries" },
        { name: "Étirements", reps: "5 min" }
      ]
    },
  ],
  intermediate: [
    {
      title: "Force & Endurance",
      duration: "40 min",
      focus: "Corps entier",
      intensity: "Modérée",
      description: "Un programme équilibré pour développer à la fois force et endurance.",
      exercises: [
        { name: "Échauffement dynamique", reps: "5 min" },
        { name: "Squats avec haltères", reps: "3 × 12" },
        { name: "Pompes standard", reps: "3 × 10" },
        { name: "Fentes alternées", reps: "3 × 10 par jambe" },
        { name: "Planche", reps: "3 × 45 sec" },
        { name: "Mountain climbers", reps: "3 × 45 sec" },
        { name: "Récupération et étirements", reps: "5 min" }
      ]
    },
    {
      title: "HIIT Intermédiaire",
      duration: "35 min",
      focus: "Cardio & Force",
      intensity: "Modérée à élevée",
      description: "Intervalles d'intensité pour maximiser la dépense calorique.",
      exercises: [
        { name: "Échauffement", reps: "5 min" },
        { name: "Burpees modifiés", reps: "30 sec + 15 sec repos × 4" },
        { name: "Squats sautés", reps: "30 sec + 15 sec repos × 4" },
        { name: "Mountain climbers", reps: "30 sec + 15 sec repos × 4" },
        { name: "Pompes", reps: "30 sec + 15 sec repos × 4" },
        { name: "Récupération entre circuits", reps: "1 min" },
        { name: "Étirements", reps: "5 min" }
      ]
    },
  ],
  advanced: [
    {
      title: "Performance & Puissance",
      duration: "50 min",
      focus: "Puissance musculaire",
      intensity: "Élevée",
      description: "Programme avancé pour développer force, puissance et explosivité.",
      exercises: [
        { name: "Échauffement complet", reps: "8 min" },
        { name: "Squats lestés profonds", reps: "4 × 8" },
        { name: "Soulevé de terre", reps: "4 × 6" },
        { name: "Développé couché", reps: "4 × 8" },
        { name: "Tractions", reps: "4 × max" },
        { name: "Box jumps", reps: "3 × 10" },
        { name: "Pompes pliométriques", reps: "3 × 12" },
        { name: "Récupération et étirements", reps: "10 min" }
      ]
    },
    {
      title: "HIIT Avancé",
      duration: "45 min",
      focus: "Cardio intensif",
      intensity: "Très élevée",
      description: "Intervalles à haute intensité pour athlètes expérimentés.",
      exercises: [
        { name: "Activation musculaire", reps: "5 min" },
        { name: "Burpees complets", reps: "40 sec + 20 sec repos × 5" },
        { name: "Kettlebell swings", reps: "40 sec + 20 sec repos × 5" },
        { name: "Thrusters", reps: "40 sec + 20 sec repos × 5" },
        { name: "Mountain climbers rapides", reps: "40 sec + 20 sec repos × 5" },
        { name: "Récupération entre circuits", reps: "90 sec" },
        { name: "Étirements et mobilité", reps: "10 min" }
      ]
    },
  ]
};

const progressSteps = [
  {
    week: "Semaines 1-2",
    focus: "Adaptation",
    description: "Familiarisation avec les mouvements de base et création d'habitudes régulières."
  },
  {
    week: "Semaines 3-4",
    focus: "Fondation",
    description: "Développement des capacités de base et augmentation progressive du volume."
  },
  {
    week: "Semaines 5-8",
    focus: "Progression",
    description: "Augmentation de l'intensité et introduction de variantes plus exigeantes."
  },
  {
    week: "Semaines 9-12",
    focus: "Évolution",
    description: "Personnalisation plus poussée et introduction d'exercices avancés selon votre niveau."
  }
];

const Fitness: React.FC = () => {
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [showGeneratedProgram, setShowGeneratedProgram] = useState(false);
  const [generatedProgram, setGeneratedProgram] = useState<any[]>([]);
  
  const generateRandomWorkout = (level: string) => {
    // Sélectionner aléatoirement des exercices du niveau approprié
    const levelWorkouts = workoutPlans[level as keyof typeof workoutPlans];
    
    // Créer un programme hebdomadaire (3-5 séances selon le niveau)
    const sessionsPerWeek = level === 'beginner' ? 3 : level === 'intermediate' ? 4 : 5;
    
    // Générer le programme avec variations
    const program = [];
    for (let i = 0; i < sessionsPerWeek; i++) {
      // Sélectionner un workout aléatoire comme base
      const baseWorkout = {...levelWorkouts[Math.floor(Math.random() * levelWorkouts.length)]};
      
      // Ajouter des variations pour rendre le programme unique
      program.push({
        ...baseWorkout,
        title: `Séance ${i+1}: ${baseWorkout.title}`,
        day: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'][i % 7],
        exercises: baseWorkout.exercises.map(ex => ({
          ...ex,
          reps: typeof ex.reps === 'string' && ex.reps.includes('×') 
            ? ex.reps  // Conserver le format pour les séries
            : typeof ex.reps === 'string' && ex.reps.includes('min')
              ? `${parseInt(ex.reps) + (Math.random() > 0.5 ? 1 : -1)} min`  // Varier légèrement le temps
              : ex.reps  // Conserver les autres formats
        }))
      });
    }
    
    return program;
  };

  const handleGenerateWorkout = () => {
    const program = generateRandomWorkout(currentLevel);
    setGeneratedProgram(program);
    setShowGeneratedProgram(true);
    
    toast({
      title: "Programme d'entraînement généré",
      description: "Votre programme personnalisé a été créé selon votre profil.",
    });
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
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-fitness bg-fitness/10 rounded-full">
            Fitness personnalisé
          </span>
          <h1 className="text-4xl font-bold mb-4">Programmes d'entraînement adaptés</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Des séances d'exercices conçues selon votre niveau, vos objectifs et votre équipement disponible.
          </p>
        </div>

        <div className="mb-12">
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">Créez votre programme personnalisé</h3>
                <p className="text-foreground/70 mb-4">
                  Générez un programme d'entraînement adapté à votre niveau et à vos objectifs.
                </p>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Sélectionnez votre niveau :</h4>
                  <div className="flex space-x-4">
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setCurrentLevel(level)}
                        className={`px-4 py-2 rounded-md ${
                          currentLevel === level 
                            ? 'bg-fitness text-white' 
                            : 'bg-secondary hover:bg-fitness/20'
                        }`}
                      >
                        {level === 'beginner' ? 'Débutant' : level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Button onClick={handleGenerateWorkout} className="px-6">
                  <Dumbbell className="w-4 h-4 mr-2" />
                  Générer mon programme
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {showGeneratedProgram && generatedProgram.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Votre programme personnalisé</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedProgram.map((workout, index) => (
                <GlassCard key={index} className="p-6 hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-fitness/10 rounded-full">
                      <Dumbbell className="w-6 h-6 text-fitness" />
                    </div>
                    <div className="flex items-center text-sm text-foreground/70">
                      <Timer className="w-4 h-4 mr-1" />
                      <span>{workout.duration}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-1">{workout.title}</h3>
                  <p className="text-sm text-fitness font-medium mb-2">{workout.day}</p>
                  <p className="text-foreground/70 mb-4">{workout.description}</p>
                  
                  <div className="flex gap-3 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground/70">
                      {workout.focus}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground/70">
                      Intensité: {workout.intensity}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Exercices:</h4>
                    <ul className="space-y-2">
                      {workout.exercises.map((exercise: any, idx: number) => (
                        <li key={idx} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0">
                          <span>{exercise.name}</span>
                          <span className="text-foreground/70">{exercise.reps}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Exemples de programmes</h2>
          
          <Tabs defaultValue="beginner" className="w-full" onValueChange={setCurrentLevel}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="beginner">Débutant</TabsTrigger>
              <TabsTrigger value="intermediate">Intermédiaire</TabsTrigger>
              <TabsTrigger value="advanced">Avancé</TabsTrigger>
            </TabsList>
            
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <TabsContent key={level} value={level} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {workoutPlans[level as keyof typeof workoutPlans].map((workout, index) => (
                    <GlassCard key={index} className="p-6 hover-lift">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-fitness/10 rounded-full">
                          <Dumbbell className="w-6 h-6 text-fitness" />
                        </div>
                        <div className="flex items-center text-sm text-foreground/70">
                          <Timer className="w-4 h-4 mr-1" />
                          <span>{workout.duration}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-medium mb-2">{workout.title}</h3>
                      <p className="text-foreground/70 mb-4">{workout.description}</p>
                      
                      <div className="flex gap-3 mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground/70">
                          {workout.focus}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground/70">
                          Intensité: {workout.intensity}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Exercices:</h4>
                        <ul className="space-y-2">
                          {workout.exercises.map((exercise, idx) => (
                            <li key={idx} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0">
                              <span>{exercise.name}</span>
                              <span className="text-foreground/70">{exercise.reps}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Votre progression</h2>
          <GlassCard className="p-8">
            <div className="grid md:grid-cols-4 gap-6">
              {progressSteps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-fitness text-white mb-4">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{step.week}</h3>
                    <div className="text-sm font-medium text-fitness mb-1">{step.focus}</div>
                    <p className="text-sm text-center text-foreground/70">{step.description}</p>
                  </div>
                  
                  {i < progressSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-border transform -translate-x-6">
                      <ArrowRight className="absolute right-0 -top-2 text-border w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6 hover-lift">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-fitness/10 mb-4">
                <Heart className="w-6 h-6 text-fitness" />
              </div>
              <h3 className="text-lg font-medium mb-2">Adapté à vos besoins</h3>
              <p className="text-foreground/70">
                Programmes qui évoluent selon votre niveau et vos progrès.
              </p>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 hover-lift">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-fitness/10 mb-4">
                <Activity className="w-6 h-6 text-fitness" />
              </div>
              <h3 className="text-lg font-medium mb-2">Efficacité prouvée</h3>
              <p className="text-foreground/70">
                Exercices sélectionnés pour des résultats optimaux en fonction de vos objectifs.
              </p>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 hover-lift">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-fitness/10 mb-4">
                <Award className="w-6 h-6 text-fitness" />
              </div>
              <h3 className="text-lg font-medium mb-2">Suivi des progrès</h3>
              <p className="text-foreground/70">
                Visualisez vos avancées et célébrez chaque étape de votre transformation.
              </p>
            </div>
          </GlassCard>
        </div>
      </main>
    </motion.div>
  );
};

export default Fitness;
