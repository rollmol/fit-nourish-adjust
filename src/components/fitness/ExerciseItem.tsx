import React from 'react';
import { Clock, Dumbbell } from 'lucide-react';
import { Exercise } from './WorkoutCard';
import { Button } from '@/components/ui/button';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  onLogResults?: (exerciseId: string) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  index,
  onLogResults
}) => {
  return (
    <div className="border-b border-border last:border-0 py-3">
      <div className="flex items-start">
        <div className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
          {index + 1}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-base mb-1">{exercise.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
              {exercise.duration < 1 
                ? `${Math.round(exercise.duration * 60)} sec` 
                : `${exercise.duration} min`}
            </div>
            
            {exercise.equipment.length > 0 && exercise.equipment[0] !== 'Sans équipement' && (
              <div className="flex items-center">
                <Dumbbell className="h-3 w-3 mr-1 text-muted-foreground" />
                {exercise.equipment.join(', ')}
              </div>
            )}
            
            <div className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs">
              {exercise.muscleGroups.join(', ')}
            </div>
          </div>
          
          {onLogResults && (
            <div className="mt-2 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onLogResults(exercise.id)}
              >
                Enregistrer mes résultats
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;

