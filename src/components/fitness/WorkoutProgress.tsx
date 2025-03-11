import React from 'react';
import { Calendar, Award, TrendingUp, BarChart } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Progress } from '@/components/ui/progress';

interface WorkoutProgressProps {
  weeklyWorkouts: number;
  weeklyGoal: number;
  streak: number;
  totalWorkouts: number;
}

const WorkoutProgress: React.FC<WorkoutProgressProps> = ({
  weeklyWorkouts,
  weeklyGoal,
  streak,
  totalWorkouts
}) => {
  const progressPercentage = Math.min((weeklyWorkouts / weeklyGoal) * 100, 100);
  
  return (
    <GlassCard intensity="low" className="p-5 mb-6">
      <h3 className="text-lg font-semibold mb-4">Votre progression</h3>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Cette semaine</span>
          <span className="text-sm font-medium">{weeklyWorkouts}/{weeklyGoal} entraînements</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
          <Calendar className="h-5 w-5 text-primary mb-1" />
          <span className="text-lg font-bold">{weeklyWorkouts}</span>
          <span className="text-xs text-muted-foreground">cette semaine</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
          <Award className="h-5 w-5 text-amber-500 mb-1" />
          <span className="text-lg font-bold">{streak}</span>
          <span className="text-xs text-muted-foreground">jours consécutifs</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
          <BarChart className="h-5 w-5 text-blue-500 mb-1" />
          <span className="text-lg font-bold">{totalWorkouts}</span>
          <span className="text-xs text-muted-foreground">total</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default WorkoutProgress;
