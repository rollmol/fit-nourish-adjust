import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

// Types
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonSelectorProps {
  selectedSeason: Season;
  onSeasonChange: (season: Season) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ 
  selectedSeason, 
  onSeasonChange 
}) => {
  const seasons: { id: Season; label: string; icon: JSX.Element; color: string }[] = [
    { 
      id: 'spring', 
      label: 'Printemps', 
      icon: <Leaf className="h-5 w-5" />, 
      color: 'from-green-300 to-green-500' 
    },
    { 
      id: 'summer', 
      label: 'Été', 
      icon: <Leaf className="h-5 w-5" />, 
      color: 'from-yellow-300 to-yellow-500' 
    },
    { 
      id: 'autumn', 
      label: 'Automne', 
      icon: <Leaf className="h-5 w-5" />, 
      color: 'from-orange-300 to-orange-500' 
    },
    { 
      id: 'winter', 
      label: 'Hiver', 
      icon: <Leaf className="h-5 w-5" />, 
      color: 'from-blue-300 to-blue-500' 
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {seasons.map((season) => (
        <motion.div
          key={season.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSeasonChange(season.id)}
          className={`relative cursor-pointer rounded-lg overflow-hidden ${
            selectedSeason === season.id ? 'ring-2 ring-primary' : ''
          }`}
        >
          <div className={`bg-gradient-to-r ${season.color} p-4 w-24 h-24 flex flex-col items-center justify-center`}>
            {season.icon}
            <span className="mt-2 text-white font-medium">{season.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SeasonSelector;

