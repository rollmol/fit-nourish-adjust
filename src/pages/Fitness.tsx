import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Filter, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Import des composants
import FitnessFilter, { FitnessFilters } from '@/components/fitness/FitnessFilter';
import ExerciseList from '@/components/fitness/ExerciseList';
import WorkoutProgress from '@/components/fitness/WorkoutProgress';
import WorkoutDetails from '@/components/fitness/WorkoutDetails';
import { Workout } from '@/components/fitness/WorkoutCard';

// Import des données
import workouts from '@/data/workouts';

const Fitness: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('workouts');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FitnessFilters>({
    level: 'all',
    duration: 'all',
    equipment: [],
    muscleGroups: []
  });
  
  // Filtrage des entraînements
  const filteredWorkouts = workouts.filter(workout => {
    // Filtre par niveau
    if (filters.level !== 'all' && workout.level !== filters.level) return false;
    
    // Filtre par durée
    if (filters.duration !== 'all') {
      const maxDuration = parseInt(filters.duration);
      if (workout.duration > maxDuration) return false;
    }
    
    // Filtre par équipement
    if (filters.equipment.length > 0) {
      if (!filters.equipment.some(eq => workout.equipment.includes(eq))) return false;
    }
    
    // Filtre par groupes musculaires
    if (filters.muscleGroups.length > 0) {
      // Dans une implémentation réelle, vous vérifieriez les groupes musculaires des exercices
    }
    
    return true;
  });
  
  // Récupérer le workout sélectionné
  const selectedWorkout = selectedWorkoutId 
    ? workouts.find(w => w.id === selectedWorkoutId) 
    : null;
  
  const handleFilterChange = (key: keyof FitnessFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleWorkoutSelect = (id: string) => {
    setSelectedWorkoutId(id === selectedWorkoutId ? null : id);
  };
  
  const handleWorkoutStart = (id: string) => {
    const workout = workouts.find(w => w.id === id);
    if (workout) {
      toast({
        title: "Entraînement démarré",
        description: `Vous avez commencé l'entraînement: ${workout.title}`
      });
      // Dans une application réelle, vous redirigeriez vers une page d'entraînement actif
    }
  };
  
  const handleSaveWorkoutPlan = () => {
    if (selectedWorkoutId) {
      toast({
        title: "Programme d'entraînement enregistré",
        description: "Votre programme d'entraînement a été sauvegardé avec succès."
      });
    } else {
      toast({
        title: "Aucun entraînement sélectionné",
        description: "Veuillez sélectionner au moins un entraînement pour votre programme.",
        variant: "destructive"
      });
    }
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
            <h1 className="text-3xl font-bold mb-2">Votre Programme Fitness</h1>
            <p className="text-muted-foreground">
              Découvrez des entraînements adaptés à votre niveau et à vos objectifs.
            </p>
          </div>

          {/* Composant de progression */}
          <WorkoutProgress 
            weeklyWorkouts={2}
            weeklyGoal={4}
            streak={3}
            totalWorkouts={12}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="workouts" className="flex items-center">
                <Dumbbell className="mr-2 h-4 w-4" />
                Entraînements
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Planning
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="workouts">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Entraînements recommandés</h2>
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {showFilters ? 'Masquer les filtres' : 'Filtrer'}
                </Button>
              </div>
              
              {showFilters && (
                <FitnessFilter 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              )}
              
              <ExerciseList 
                workouts={filteredWorkouts}
                selectedWorkoutId={selectedWorkoutId}
                onWorkoutSelect={handleWorkoutSelect}
                onWorkoutStart={handleWorkoutStart}
              />
              
              {/* Affichage des détails du workout sélectionné */}
              {selectedWorkout && (
                <WorkoutDetails
                  workout={selectedWorkout}
                  onClose={() => setSelectedWorkoutId(null)}
                  onStart={() => handleWorkoutStart(selectedWorkout.id)}
                />
              )}
              
              <div className="flex justify-end mt-8">
                <Button 
                  size="lg" 
                  onClick={handleSaveWorkoutPlan}
                  disabled={!selectedWorkoutId}
                >
                  <Dumbbell className="mr-2 h-5 w-5" />
                  Enregistrer mon programme
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule">
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  Le planning d'entraînement hebdomadaire sera disponible prochainement.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </>
  );
};

export default Fitness;

