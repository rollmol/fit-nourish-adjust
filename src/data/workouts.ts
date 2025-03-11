import { Workout } from '@/components/fitness/WorkoutCard';

const workouts: Workout[] = [
  {
    id: '1',
    title: 'Full Body Express',
    description: 'Un entraînement complet du corps en 20 minutes, parfait pour les journées chargées',
    duration: 20,
    level: 'beginner',
    equipment: ['Sans équipement'],
    calories: 150,
    exercises: [
      {
        id: '1-1',
        name: 'Jumping Jacks',
        description: '30 secondes de jumping jacks pour échauffer le corps',
        duration: 0.5,
        level: 'beginner',
        equipment: ['Sans équipement'],
        muscleGroups: ['Full body'],
        calories: 10
      },
      // Autres exercices...
          {
      id: '1-2',
      name: 'Squats',
      description: '15 répétitions de squats pour travailler les jambes',
      duration: 1,
      level: 'beginner',
      equipment: ['Sans équipement'],
      muscleGroups: ['Bas du corps'],
      calories: 15
    },
    {
      id: '1-3',
      name: 'Pompes',
      description: '10 répétitions de pompes (sur les genoux si nécessaire)',
      duration: 1,
      level: 'beginner',
      equipment: ['Sans équipement'],
      muscleGroups: ['Haut du corps'],
      calories: 12
    },
    {
      id: '1-4',
      name: 'Planche',
      description: 'Tenir la position de planche pendant 30 secondes',
      duration: 0.5,
      level: 'beginner',
      equipment: ['Sans équipement'],
      muscleGroups: ['Core'],
      calories: 8
    },
    {
      id: '1-5',
      name: 'Mountain Climbers',
      description: '30 secondes de mountain climbers à un rythme modéré',
      duration: 0.5,
      level: 'beginner',
      equipment: ['Sans équipement'],
      muscleGroups: ['Full body'],
      calories: 12
    }
    ]
  },
  {
    id: '2',
    title: 'Hiit Cardio Brûle-graisses',
    description: 'Entraînement intense par intervalles pour maximiser la combustion des graisses',
    duration: 30,
    level: 'intermediate',
    equipment: ['Tapis'],
    calories: 300,
    exercises: [
      // Exercices...
    ]
  },
  {
    id: '3',
    title: 'Force et Musculation',
    description: 'Renforcement musculaire ciblé pour développer force et tonicité',
    duration: 45,
    level: 'intermediate',
    equipment: ['Haltères', 'Bandes élastiques'],
    calories: 350,
    exercises: [
      // Exercices...
    ]
  },
  {
    id: '4',
    title: 'Yoga Doux',
    description: 'Session de yoga relaxante pour améliorer la flexibilité et réduire le stress',
    duration: 40,
    level: 'beginner',
    equipment: ['Tapis'],
    calories: 180,
    exercises: [
      // Exercices...
    ]
  },
  {
    id: '5',
    title: 'Challenge Core Intensif',
    description: 'Renforcement du centre du corps pour un ventre tonique et un dos solide',
    duration: 25,
    level: 'advanced',
    equipment: ['Tapis'],
    calories: 220,
    exercises: [
      // Exercices...
    ]
  },
  {
    id: '6',
    title: 'Entraînement Explosif',
    description: 'Exercices de puissance pour développer la force explosive et l\'agilité',
    duration: 35,
    level: 'advanced',
    equipment: ['Kettlebell', 'Tapis'],
    calories: 320,
    exercises: [
      // Exercices...
    ]
  }
];

export default workouts;
