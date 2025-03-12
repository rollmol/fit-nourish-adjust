import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Exercise } from './WorkoutCard';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/GlassCard';

interface WorkoutSessionFormProps {
  exercise: Exercise;
  onComplete: () => void;
}

const WorkoutSessionForm: React.FC<WorkoutSessionFormProps> = ({ exercise, onComplete }) => {
  const { toast } = useToast();
  const [repetitions, setRepetitions] = useState('');
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [notes, setNotes] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique selon le type d'exercice
    let isValid = false;
    
    switch (exercise.metricType) {
      case 'weightAndReps':
        isValid = !!repetitions || !!weight;
        break;
      case 'repsOnly':
        isValid = !!repetitions;
        break;
      case 'durationOnly':
        isValid = !!duration;
        break;
      case 'distanceAndDuration':
        isValid = !!distance || !!duration;
        break;
    }
    
    if (!isValid) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez saisir au moins une information sur votre performance.",
        variant: "destructive"
      });
      return;
    }
    
    // Dans une application réelle, vous sauvegarderiez ces données
    console.log('Résultats de la séance:', {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      repetitions: repetitions ? parseInt(repetitions) : null,
      weight: weight ? parseInt(weight) : null,
      duration: duration ? parseInt(duration) : null,
      distance: distance ? parseInt(distance) : null,
      notes,
      date: new Date()
    });
    
    toast({
      title: "Résultats enregistrés",
      description: "Vos performances ont été enregistrées avec succès.",
    });
    
    onComplete();
  };
  
  return (
    <GlassCard intensity="low" className="p-5 mt-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Enregistrer vos résultats</h3>
      <p className="text-muted-foreground mb-4">Exercice: {exercise.name}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Afficher le champ de répétitions pour les exercices concernés */}
          {(exercise.metricType === 'weightAndReps' || exercise.metricType === 'repsOnly') && (
            <div>
              <Label htmlFor="repetitions">Répétitions</Label>
              <Input
                id="repetitions"
                type="number"
                value={repetitions}
                onChange={(e) => setRepetitions(e.target.value)}
                placeholder="Nombre de répétitions"
              />
            </div>
          )}
          
          {/* Afficher le champ de poids uniquement pour les exercices avec poids */}
          {exercise.metricType === 'weightAndReps' && (
            <div>
              <Label htmlFor="weight">Poids (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Poids utilisé"
              />
            </div>
          )}
          
          {/* Afficher le champ de durée pour les exercices concernés */}
          {(exercise.metricType === 'durationOnly' || exercise.metricType === 'distanceAndDuration') && (
            <div>
              <Label htmlFor="duration">Durée (min)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Temps en minutes"
              />
            </div>
          )}
          
          {/* Afficher le champ de distance pour les exercices concernés */}
          {exercise.metricType === 'distanceAndDuration' && (
            <div>
              <Label htmlFor="distance">Distance (m)</Label>
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Distance en mètres"
              />
            </div>
          )}
        </div>
        
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Commentaires sur votre performance..."
            rows={3}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onComplete}>
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </GlassCard>
  );
};

export default WorkoutSessionForm;

