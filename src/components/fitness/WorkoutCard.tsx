import React from 'react';
import { Clock, Dumbbell, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

// Types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // en minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  muscleGroups: string[];
  calories: number;
  image?: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  duration: number; // en minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  calories: number;
}

export type ExerciseMetricType = 'weightAndReps' | 'repsOnly' | 'durationOnly' | 'distanceAndDuration';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // en minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  muscleGroups: string[];
  calories: number;
  image?: string;
  metricType: ExerciseMetricType; // Nouvelle propriété
}

interface WorkoutCardProps {
  workout: Workout;
  isSelected?: boolean;
  onSelect?: () => void;
  onStart?: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  workout, 
  isSelected = false, 
  onSelect,
  onStart
}) => {
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'beginner': return 'text-green-500';
      case 'intermediate': return 'text-blue-500';
      case 'advanced': return 'text-purple-500';
      default: return 'text-gray-500';
    }
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
    <GlassCard intensity="low" className={`relative transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{workout.title}</h3>
        <p className="text-muted-foreground mb-4">{workout.description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm">{workout.duration} min</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className={`h-4 w-4 mr-1 ${getLevelColor(workout.level)}`} />
            <span className="text-sm">{getLevelLabel(workout.level)}</span>
          </div>
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm">{workout.calories} cal</span>
          </div>
        </div>
        
        {workout.equipment.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">Équipement:</p>
            <div className="flex flex-wrap gap-1">
              {workout.equipment.map((item, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-secondary px-2 py-0.5 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex space-x-2 mt-4">
          <Button 
            onClick={onSelect} 
            variant={isSelected ? "default" : "outline"} 
            className="flex-1"
          >
            {isSelected ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Sélectionné
              </>
            ) : (
              "Sélectionner"
            )}
          </Button>
          
          {onStart && (
            <Button 
              onClick={onStart}
              variant="secondary"
              className="flex-1"
            >
              Commencer
            </Button>
          )}
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
          <CheckCircle className="h-4 w-4" />
        </div>
      )}
    </GlassCard>
  );
};

export default WorkoutCard;

