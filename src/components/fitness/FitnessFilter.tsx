import React from 'react';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import GlassCard from '@/components/ui/GlassCard';

export interface FitnessFilters {
  level: string;
  duration: string;
  equipment: string[];
  muscleGroups: string[];
}

interface FitnessFilterProps {
  filters: FitnessFilters;
  onFilterChange: (key: keyof FitnessFilters, value: any) => void;
}

const FitnessFilter: React.FC<FitnessFilterProps> = ({ 
  filters, 
  onFilterChange 
}) => {
  const equipment = [
    'Sans équipement',
    'Haltères',
    'Bandes élastiques',
    'Tapis',
    'Kettlebell',
    'Barre de traction'
  ];
  
  const muscleGroups = [
    'Full body',
    'Haut du corps',
    'Bas du corps',
    'Core',
    'Dos',
    'Poitrine',
    'Bras',
    'Jambes'
  ];
  
  const handleMuscleGroupToggle = (value: string[]) => {
    onFilterChange('muscleGroups', value);
  };
  
  const handleEquipmentToggle = (value: string[]) => {
    onFilterChange('equipment', value);
  };

  return (
    <GlassCard intensity="low" className="p-5 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filtres</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="level" className="mb-2 block">Niveau</Label>
          <Select 
            value={filters.level} 
            onValueChange={(value) => onFilterChange('level', value)}
          >
            <SelectTrigger id="level">
              <SelectValue placeholder="Sélectionnez un niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              <SelectItem value="beginner">Débutant</SelectItem>
              <SelectItem value="intermediate">Intermédiaire</SelectItem>
              <SelectItem value="advanced">Avancé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="duration" className="mb-2 block">Durée</Label>
          <Select 
            value={filters.duration} 
            onValueChange={(value) => onFilterChange('duration', value)}
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Sélectionnez une durée" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les durées</SelectItem>
              <SelectItem value="15">15 minutes ou moins</SelectItem>
              <SelectItem value="30">30 minutes ou moins</SelectItem>
              <SelectItem value="45">45 minutes ou moins</SelectItem>
              <SelectItem value="60">60 minutes ou moins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="mb-2 block">Groupes musculaires</Label>
          <ToggleGroup 
            type="multiple" 
            variant="outline"
            className="flex flex-wrap"
            value={filters.muscleGroups}
            onValueChange={handleMuscleGroupToggle}
          >
            {muscleGroups.map((group) => (
              <ToggleGroupItem 
                key={group} 
                value={group}
                className="text-xs m-1"
              >
                {group}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        <div>
          <Label className="mb-2 block">Équipement</Label>
          <ToggleGroup 
            type="multiple" 
            variant="outline"
            className="flex flex-wrap"
            value={filters.equipment}
            onValueChange={handleEquipmentToggle}
          >
            {equipment.map((item) => (
              <ToggleGroupItem 
                key={item} 
                value={item}
                className="text-xs m-1"
              >
                {item}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </GlassCard>
  );
};

export default FitnessFilter;
