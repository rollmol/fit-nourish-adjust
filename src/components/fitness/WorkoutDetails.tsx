import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Flame, Clock, Dumbbell, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { Workout } from './WorkoutCard';
import ExerciseItem from './ExerciseItem';
import WorkoutSessionForm from './WorkoutSessionForm';

interface WorkoutDetailsProps {
  workout: Workout;
  onClose: () => void;
  onStart: () => void;
}

const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ 
  workout, 
  onClose,
  onStart
}) => {
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

  // Récupérer l'exercice actif
  const activeExercise = activeExerciseId 
    ? workout.exercises.find(ex => ex.id === activeExerciseId)
    : null;

  // Ajouter un handler pour terminer l'exercice
  const handleExerciseComplete = () => {
    setActiveExerciseId(null);
  };

  const getLevelLabel = (level: string) => {
    switch(level) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return level;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-6 mb-8"
    >
      <GlassCard intensity="low" className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{workout.title}</h3>
            <p className="text-muted-foreground">{workout.description}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Résumé du programme */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
            <Clock className="h-5 w-5 text-primary mb-1" />
            <span className="text-lg font-bold">{workout.duration}</span>
            <span className="text-xs text-muted-foreground">minutes</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
            <Flame className="h-5 w-5 text-orange-500 mb-1" />
            <span className="text-lg font-bold">{workout.calories}</span>
            <span className="text-xs text-muted-foreground">calories</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-lg font-bold">{getLevelLabel(workout.level)}</span>
            <span className="text-xs text-muted-foreground">niveau</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
            <Dumbbell className="h-5 w-5 text-purple-500 mb-1" />
            <span className="text-lg font-bold">{workout.exercises.length}</span>
            <span className="text-xs text-muted-foreground">exercices</span>
          </div>
        </div>
        
        {/* Liste des exercices */}
        <div className="mb-6">
          <h4 className="font-medium text-base mb-3">Exercices au programme</h4>
          <div className="border rounded-lg divide-y">
            {workout.exercises.map((exercise, index) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise} 
                index={index}
                onLogResults={(id) => setActiveExerciseId(id)}
              />
            ))}
          </div>
        </div>
        
        {/* Formulaire de résultats si un exercice est sélectionné */}
        {activeExercise && (
          <WorkoutSessionForm
            exercise={activeExercise}
            onComplete={handleExerciseComplete}
          />
        )}
        
        <div className="flex justify-end">
          <Button onClick={onStart} size="lg">
            Commencer l'entraînement
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default WorkoutDetails;

