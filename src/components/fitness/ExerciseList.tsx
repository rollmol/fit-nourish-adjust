import React from 'react';
import { motion } from 'framer-motion';
import WorkoutCard, { Workout } from './WorkoutCard';

interface ExerciseListProps {
  workouts: Workout[];
  selectedWorkoutId: string | null;
  onWorkoutSelect: (id: string) => void;
  onWorkoutStart: (id: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  workouts,
  selectedWorkoutId,
  onWorkoutSelect,
  onWorkoutStart
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {workouts.map((workout) => (
        <motion.div key={workout.id} variants={item}>
          <WorkoutCard
            workout={workout}
            isSelected={selectedWorkoutId === workout.id}
            onSelect={() => onWorkoutSelect(workout.id)}
            onStart={() => onWorkoutStart(workout.id)}
          />
        </motion.div>
      ))}
      
      {workouts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">
            Aucun entraînement ne correspond à vos critères. Essayez d'ajuster vos filtres.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ExerciseList;
