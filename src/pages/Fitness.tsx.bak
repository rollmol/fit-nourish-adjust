
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Timer, Activity, Heart, Award, ArrowRight, Calendar, PlusCircle, Trash2, BarChart, Edit, Save, Check, X, List, CheckSquare } from 'lucide-react';
import Header from '@/components/layout/Header';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Types for workout activities
interface WorkoutActivity {
  id: string;
  date: string;
  type: string;
  duration: number;
  intensity: 'Légère' | 'Modérée' | 'Intense';
  notes: string;
}

// Types for exercise tracking
interface ExerciseTrackingEntry {
  id: string;
  date: string;
  exerciseName: string;
  sets: ExerciseSet[];
  programId?: string; // To link with the generated program
  workoutTitle?: string;
}

interface ExerciseSet {
  reps: number;
  weight?: number; // Optional for bodyweight exercises
  completed: boolean;
}

// Sample workout plans
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
  const [selectedWorkout, setSelectedWorkout] = useState<any | null>(null);
  
  // État pour le formulaire d'activité
  const [newActivity, setNewActivity] = useState<Omit<WorkoutActivity, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    type: 'Course',
    duration: 30,
    intensity: 'Modérée',
    notes: ''
  });
  
  // État pour la liste des activités
  const [activities, setActivities] = useState<WorkoutActivity[]>([]);
  
  // Nouvel état pour le suivi des exercices
  const [exercisesTracking, setExercisesTracking] = useState<ExerciseTrackingEntry[]>([]);
  const [currentExerciseTracking, setCurrentExerciseTracking] = useState<ExerciseTrackingEntry | null>(null);
  const [isAddingExerciseTracking, setIsAddingExerciseTracking] = useState(false);
  
  // Charger les activités et le suivi des exercices depuis le localStorage au chargement
  useEffect(() => {
    const savedActivities = localStorage.getItem('workoutActivities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
    
    const savedExercisesTracking = localStorage.getItem('exercisesTracking');
    if (savedExercisesTracking) {
      setExercisesTracking(JSON.parse(savedExercisesTracking));
    }
    
    const savedProgram = localStorage.getItem('generatedProgram');
    if (savedProgram) {
      setGeneratedProgram(JSON.parse(savedProgram));
      setShowGeneratedProgram(true);
    }
  }, []);
  
  // Sauvegarder les activités et le suivi des exercices dans le localStorage
  useEffect(() => {
    localStorage.setItem('workoutActivities', JSON.stringify(activities));
  }, [activities]);
  
  useEffect(() => {
    localStorage.setItem('exercisesTracking', JSON.stringify(exercisesTracking));
  }, [exercisesTracking]);
  
  useEffect(() => {
    if (generatedProgram.length > 0) {
      localStorage.setItem('generatedProgram', JSON.stringify(generatedProgram));
    }
  }, [generatedProgram]);
  
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
  
  // Ajouter une nouvelle activité
  const handleAddActivity = () => {
    const newActivityWithId: WorkoutActivity = {
      ...newActivity,
      id: Date.now().toString()
    };
    
    setActivities([newActivityWithId, ...activities]);
    
    // Réinitialiser le formulaire
    setNewActivity({
      date: new Date().toISOString().split('T')[0],
      type: 'Course',
      duration: 30,
      intensity: 'Modérée',
      notes: ''
    });
    
    toast({
      title: "Activité ajoutée",
      description: "Votre séance d'entraînement a été enregistrée avec succès.",
    });
  };
  
  // Supprimer une activité
  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
    
    toast({
      title: "Activité supprimée",
      description: "La séance d'entraînement a été supprimée.",
    });
  };
  
  // Calculer des statistiques
  const calculateStats = () => {
    if (activities.length === 0) return { totalSessions: 0, totalDuration: 0, avgDuration: 0 };
    
    const totalSessions = activities.length;
    const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
    const avgDuration = Math.round(totalDuration / totalSessions);
    
    return { totalSessions, totalDuration, avgDuration };
  };
  
  // Nouvelle fonction pour ouvrir le suivi d'un exercice
  const handleSelectWorkout = (workout: any) => {
    setSelectedWorkout(workout);
    setIsAddingExerciseTracking(false);
  };
  
  // Commencer à suivre un exercice spécifique
  const handleTrackExercise = (exerciseName: string) => {
    if (!selectedWorkout) return;
    
    const newExerciseTracking: ExerciseTrackingEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      exerciseName: exerciseName,
      sets: Array(3).fill({ reps: 0, weight: 0, completed: false }),
      programId: Date.now().toString(), // Utiliser un ID unique pour le programme
      workoutTitle: selectedWorkout.title
    };
    
    setCurrentExerciseTracking(newExerciseTracking);
    setIsAddingExerciseTracking(true);
  };
  
  // Modifier un set d'exercice
  const handleSetChange = (index: number, field: 'reps' | 'weight', value: number) => {
    if (!currentExerciseTracking) return;
    
    const updatedSets = [...currentExerciseTracking.sets];
    updatedSets[index] = { 
      ...updatedSets[index], 
      [field]: value 
    };
    
    setCurrentExerciseTracking({
      ...currentExerciseTracking,
      sets: updatedSets
    });
  };
  
  // Marquer un set comme complété
  const handleSetCompleted = (index: number, completed: boolean) => {
    if (!currentExerciseTracking) return;
    
    const updatedSets = [...currentExerciseTracking.sets];
    updatedSets[index] = { 
      ...updatedSets[index], 
      completed
    };
    
    setCurrentExerciseTracking({
      ...currentExerciseTracking,
      sets: updatedSets
    });
  };
  
  // Ajouter un nouveau set
  const handleAddSet = () => {
    if (!currentExerciseTracking) return;
    
    const updatedSets = [
      ...currentExerciseTracking.sets,
      { reps: 0, weight: 0, completed: false }
    ];
    
    setCurrentExerciseTracking({
      ...currentExerciseTracking,
      sets: updatedSets
    });
  };
  
  // Enregistrer le suivi d'exercice
  const handleSaveExerciseTracking = () => {
    if (!currentExerciseTracking) return;
    
    // Vérifier si cet exercice a déjà été suivi aujourd'hui
    const existingIndex = exercisesTracking.findIndex(
      et => et.exerciseName === currentExerciseTracking.exerciseName && 
           et.date === currentExerciseTracking.date
    );
    
    if (existingIndex >= 0) {
      // Mettre à jour l'entrée existante
      const updatedTracking = [...exercisesTracking];
      updatedTracking[existingIndex] = currentExerciseTracking;
      setExercisesTracking(updatedTracking);
    } else {
      // Ajouter une nouvelle entrée
      setExercisesTracking([currentExerciseTracking, ...exercisesTracking]);
    }
    
    setCurrentExerciseTracking(null);
    setIsAddingExerciseTracking(false);
    
    toast({
      title: "Exercice enregistré",
      description: "Le suivi de votre exercice a été sauvegardé avec succès.",
    });
  };
  
  // Annuler l'ajout du suivi d'exercice
  const handleCancelExerciseTracking = () => {
    setCurrentExerciseTracking(null);
    setIsAddingExerciseTracking(false);
  };
  
  // Supprimer un suivi d'exercice
  const handleDeleteExerciseTracking = (id: string) => {
    setExercisesTracking(exercisesTracking.filter(et => et.id !== id));
    
    toast({
      title: "Suivi supprimé",
      description: "Le suivi de cet exercice a été supprimé.",
    });
  };
  
  // Obtenir les suivis pour un exercice spécifique
  const getExerciseTrackingHistory = (exerciseName: string) => {
    return exercisesTracking
      .filter(et => et.exerciseName === exerciseName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  
  const stats = calculateStats();

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
                <GlassCard 
                  key={index} 
                  className="p-6" 
                  onClick={() => handleSelectWorkout(workout)}
                  isSelected={selectedWorkout === workout}
                  hoverLift={true}
                >
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
                  
                  {selectedWorkout === workout && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedWorkout) {
                            setSelectedWorkout(null);
                          }
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Fermer la sélection
                      </Button>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
            
            {/* Affichage du suivi de séance pour le workout sélectionné */}
            {selectedWorkout && (
              <div className="mt-8">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Suivi des exercices - {selectedWorkout.title}
                  </h2>
                  
                  {isAddingExerciseTracking ? (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{currentExerciseTracking?.exerciseName}</h3>
                          <p className="text-sm text-foreground/70">
                            {new Date(currentExerciseTracking?.date || '').toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2 mt-2 md:mt-0">
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={handleAddSet}
                          >
                            <PlusCircle className="w-4 h-4 mr-1" />
                            Ajouter une série
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-background/50 rounded-lg p-4">
                        <div className="grid grid-cols-12 font-medium text-sm mb-2">
                          <div className="col-span-1">#</div>
                          <div className="col-span-4">Répétitions</div>
                          <div className="col-span-4">Poids (kg)</div>
                          <div className="col-span-3 text-right">Terminé</div>
                        </div>
                        
                        {currentExerciseTracking?.sets.map((set, index) => (
                          <div key={index} className="grid grid-cols-12 gap-2 items-center py-2 border-b border-border/30 last:border-0">
                            <div className="col-span-1 text-sm">{index + 1}</div>
                            <div className="col-span-4">
                              <Input
                                type="number"
                                min="0"
                                value={set.reps || 0}
                                onChange={(e) => handleSetChange(index, 'reps', parseInt(e.target.value) || 0)}
                                className="h-8"
                              />
                            </div>
                            <div className="col-span-4">
                              <Input
                                type="number"
                                min="0"
                                step="0.5"
                                value={set.weight || 0}
                                onChange={(e) => handleSetChange(index, 'weight', parseFloat(e.target.value) || 0)}
                                className="h-8"
                              />
                            </div>
                            <div className="col-span-3 text-right">
                              <button
                                onClick={() => handleSetCompleted(index, !set.completed)}
                                className={`w-8 h-8 rounded-md flex items-center justify-center ${
                                  set.completed 
                                    ? 'bg-fitness/20 text-fitness' 
                                    : 'bg-secondary text-foreground/70'
                                }`}
                              >
                                {set.completed ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button 
                          variant="outline" 
                          onClick={handleCancelExerciseTracking}
                        >
                          Annuler
                        </Button>
                        <Button onClick={handleSaveExerciseTracking}>
                          <Save className="w-4 h-4 mr-2" />
                          Enregistrer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {selectedWorkout.exercises.map((exercise: any, index: number) => {
                          const trackingHistory = getExerciseTrackingHistory(exercise.name);
                          const hasHistory = trackingHistory.length > 0;
                          const lastTracking = hasHistory ? trackingHistory[0] : null;
                          
                          return (
                            <div 
                              key={index}
                              className="bg-background/50 p-4 rounded-lg border border-border/30"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-medium">{exercise.name}</h4>
                                <span className="text-sm text-foreground/70">{exercise.reps}</span>
                              </div>
                              
                              {hasHistory && (
                                <div className="mb-3 p-3 bg-fitness/5 rounded-md">
                                  <p className="text-sm font-medium">Dernière séance:</p>
                                  <p className="text-xs text-foreground/70 mb-2">
                                    {new Date(lastTracking?.date || '').toLocaleDateString()}
                                  </p>
                                  <div className="space-y-1">
                                    {lastTracking?.sets.map((set, idx) => (
                                      <div key={idx} className="flex justify-between text-xs">
                                        <span>Série {idx + 1}:</span>
                                        <span className={set.completed ? 'text-fitness' : 'text-foreground/50'}>
                                          {set.reps} reps {set.weight ? `× ${set.weight} kg` : ''}
                                          {set.completed ? ' ✓' : ''}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleTrackExercise(exercise.name)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                {hasHistory ? 'Mettre à jour' : 'Commencer le suivi'}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {/* Nouvelle section: Suivi des activités */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Suivi de vos séances d'entraînement</h2>
            <div className="p-2 bg-fitness/10 rounded-full">
              <Activity className="w-6 h-6 text-fitness" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Carte d'ajout d'activité */}
            <GlassCard intensity="medium" className="p-6 col-span-1">
              <h3 className="text-xl font-semibold mb-4">Ajouter une séance</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type d'exercice</Label>
                  <Select 
                    value={newActivity.type}
                    onValueChange={(value) => setNewActivity({...newActivity, type: value})}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Course">Course</SelectItem>
                      <SelectItem value="Musculation">Musculation</SelectItem>
                      <SelectItem value="Natation">Natation</SelectItem>
                      <SelectItem value="Vélo">Vélo</SelectItem>
                      <SelectItem value="Yoga">Yoga</SelectItem>
                      <SelectItem value="HIIT">HIIT</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="duration">Durée (minutes)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    min="1"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({...newActivity, duration: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="intensity">Intensité</Label>
                  <Select 
                    value={newActivity.intensity}
                    onValueChange={(value: 'Légère' | 'Modérée' | 'Intense') => setNewActivity({...newActivity, intensity: value})}
                  >
                    <SelectTrigger id="intensity">
                      <SelectValue placeholder="Sélectionner l'intensité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Légère">Légère</SelectItem>
                      <SelectItem value="Modérée">Modérée</SelectItem>
                      <SelectItem value="Intense">Intense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Notez vos impressions, performances..."
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleAddActivity}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Enregistrer cette séance
                </Button>
              </div>
            </GlassCard>
            
            {/* Carte des statistiques */}
            <GlassCard intensity="light" className="p-6 col-span-1">
              <h3 className="text-xl font-semibold mb-4">Vos statistiques</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-fitness" />
                    <span>Nombre de séances</span>
                  </div>
                  <span className="text-xl font-bold">{stats.totalSessions}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center">
                    <Timer className="w-5 h-5 mr-3 text-fitness" />
                    <span>Temps total d'entraînement</span>
                  </div>
                  <span className="text-xl font-bold">{stats.totalDuration} min</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center">
                    <BarChart className="w-5 h-5 mr-3 text-fitness" />
                    <span>Durée moyenne par séance</span>
                  </div>
                  <span className="text-xl font-bold">{stats.avgDuration} min</span>
                </div>
              </div>
            </GlassCard>
            
            {/* Liste des activités récentes */}
            <GlassCard intensity="light" className="p-6 col-span-1">
              <h3 className="text-xl font-semibold mb-4">Historique récent</h3>
              
              {activities.length > 0 ? (
                <div className="space-y-3">
                  {activities.slice(0, 5).map((activity) => (
                    <div 
                      key={activity.id} 
                      className="p-3 bg-background/50 rounded-lg border border-border/30 flex justify-between items-start"
                    >
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{activity.type}</span>
                          <span className="text-xs ml-2 px-2 py-0.5 rounded bg-fitness/10 text-fitness">
                            {activity.intensity}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-foreground/70 mt-1">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                          <Timer className="w-3.5 h-3.5 mx-1 ml-2" />
                          <span>{activity.duration} min</span>
                        </div>
                        {activity.notes && (
                          <p className="text-xs text-foreground/70 mt-1 line-clamp-1">
                            {activity.notes}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="text-foreground/40 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {activities.length > 5 && (
                    <Button variant="ghost" className="w-full text-sm">
                      Voir toutes les séances ({activities.length})
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed border-border rounded-lg">
                  <Activity className="w-8 h-8 text-foreground/30 mx-auto mb-2" />
                  <p className="text-foreground/50">Aucune activité enregistrée</p>
                  <p className="text-sm text-foreground/40 mt-1">
                    Ajoutez votre première séance d'entraînement
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Fitness;
