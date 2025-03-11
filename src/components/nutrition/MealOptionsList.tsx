import React from 'react';
import { motion } from 'framer-motion';
import MealCard, { Meal } from './MealCard';

interface MealOptionsListProps {
  mealType: string;
  meals: Meal[];
  selectedMealIndex: number | null;
  onMealSelect: (index: number) => void;
}

const MealOptionsList: React.FC<MealOptionsListProps> = ({
  mealType,
  meals,
  selectedMealIndex,
  onMealSelect
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
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4 capitalize">{mealType}</h3>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {meals.map((meal, index) => (
          <motion.div key={index} variants={item}>
            <MealCard
              meal={meal}
              isSelected={selectedMealIndex === index}
              onSelect={() => onMealSelect(index)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MealOptionsList;
