import { Workout, Exercise, ExerciseMetricType } from '@/components/fitness/WorkoutCard';

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
        calories: 10,
        metricType: 'durationOnly'
      },
      {
        id: '1-2',
        name: 'Squats',
        description: '15 répétitions de squats pour travailler les jambes',
        duration: 1,
        level: 'beginner',
        equipment: ['Sans équipement'],
        muscleGroups: ['Bas du corps'],
        calories: 15,
        metricType: 'repsOnly'
      },
      {
        id: '1-3',
        name: 'Pompes',
        description: '10 répétitions de pompes (sur les genoux si nécessaire)',
        duration: 1,
        level: 'beginner',
        equipment: ['Sans équipement'],
        muscleGroups: ['Haut du corps'],
        calories: 12,
        metricType: 'repsOnly'
      },
      {
        id: '1-4',
        name: 'Planche',
        description: 'Tenir la position de planche pendant 30 secondes',
        duration: 0.5,
        level: 'beginner',
        equipment: ['Sans équipement'],
        muscleGroups: ['Core'],
        calories: 8,
        metricType: 'durationOnly'
      },
      {
        id: '1-5',
        name: 'Mountain Climbers',
        description: '30 secondes de mountain climbers à un rythme modéré',
        duration: 0.5,
        level: 'beginner',
        equipment: ['Sans équipement'],
        muscleGroups: ['Full body'],
        calories: 12,
        metricType: 'durationOnly'
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
      {
        id: '2-1',
        name: 'Burpees',
        description: '45 secondes de burpees, suivies de 15 secondes de repos',
        duration: 1,
        level: 'intermediate',
        equipment: ['Sans équipement'],
        muscleGroups: ['Full body'],
        calories: 15,
        metricType: 'repsOnly'
      },
      {
        id: '2-2',
        name: 'High Knees',
        description: '45 secondes de montées de genoux rapides, suivies de 15 secondes de repos',
        duration: 1,
        level: 'intermediate',
        equipment: ['Sans équipement'],
        muscleGroups: ['Bas du corps', 'Cardio'],
        calories: 14,
        metricType: 'durationOnly'
      },
      {
        id: '2-3',
        name: 'Jumping Lunges',
        description: '45 secondes de fentes sautées, suivies de 15 secondes de repos',
        duration: 1,
        level: 'intermediate',
        equipment: ['Sans équipement'],
        muscleGroups: ['Bas du corps'],
        calories: 16,
        metricType: 'durationOnly'
      },
      {
        id: '2-4',
        name: 'Mountain Climbers',
        description: '45 secondes de mountain climbers rapides, suivies de 15 secondes de repos',
        duration: 1,
        level: 'intermediate',
        equipment: ['Sans équipement'],
        muscleGroups: ['Full body', 'Core'],
        calories: 14,
        metricType: 'durationOnly'
      },
      {
        id: '2-5',
        name: 'Jumping Jacks',
        description: '45 secondes de jumping jacks, suivies de 15 secondes de repos',
        duration: 1,
        level: 'intermediate',
        equipment: ['Sans équipement'],
        muscleGroups: ['Full body', 'Cardio'],
        calories: 13,
        metricType: 'durationOnly'
      }
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
      {
        id: '3-1',
        name: 'Squats avec haltères',
        description: '3 séries de 12 répétitions, repos de 60 secondes entre les séries',
        duration: 5,
        level: 'intermediate',
        equipment: ['Haltères'],
        muscleGroups: ['Bas du corps'],
        calories: 45,
        metricType: 'weightAndReps'
      },
      {
        id: '3-2',
        name: 'Développé couché avec haltères',
        description: '3 séries de 10 répétitions, repos de 60 secondes entre les séries',
        duration: 5,
        level: 'intermediate',
        equipment: ['Haltères', 'Banc'],
        muscleGroups: ['Poitrine', 'Haut du corps'],
        calories: 40,
        metricType: 'weightAndReps'
      },
      {
        id: '3-3',
        name: 'Rowing avec haltères',
        description: '3 séries de 12 répétitions par bras, repos de 60 secondes entre les séries',
        duration: 6,
        level: 'intermediate',
        equipment: ['Haltères'],
        muscleGroups: ['Dos', 'Haut du corps'],
        calories: 42,
        metricType: 'weightAndReps'
      },
      {
        id: '3-4',
        name: 'Curls avec bande élastique',
        description: '3 séries de 15 répétitions, repos de 45 secondes entre les séries',
        duration: 4,
        level: 'intermediate',
        equipment: ['Bandes élastiques'],
        muscleGroups: ['Bras'],
        calories: 35,
        metricType: 'repsOnly'
      },
      {
        id: '3-5',
        name: 'Élévations latérales',
        description: '3 séries de 12 répétitions, repos de 45 secondes entre les séries',
        duration: 4,
        level: 'intermediate',
        equipment: ['Haltères'],
        muscleGroups: ['Épaules', 'Haut du corps'],
        calories: 38,
        metricType: 'weightAndReps'
      }
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
      {
        id: '4-1',
        name: 'Posture de la montagne',
        description: 'Tenez la posture pendant 1 minute, en vous concentrant sur la respiration',
        duration: 1,
        level: 'beginner',
        equipment: ['Tapis'],
        muscleGroups: ['Full body'],
        calories: 5,
        metricType: 'durationOnly'
      },
      {
        id: '4-2',
        name: 'Posture du chien tête en bas',
        description: 'Tenez la posture pendant 2 minutes, respirez profondément',
        duration: 2,
        level: 'beginner',
        equipment: ['Tapis'],
        muscleGroups: ['Full body', 'Dos'],
        calories: 12,
        metricType: 'durationOnly'
      },
      {
        id: '4-3',
        name: 'Posture du guerrier I',
        description: '1 minute de chaque côté',
        duration: 2,
        level: 'beginner',
        equipment: ['Tapis'],
        muscleGroups: ['Bas du corps', 'Équilibre'],
        calories: 15,
        metricType: 'durationOnly'
      },
      {
        id: '4-4',
        name: 'Posture de l\'arbre',
        description: '45 secondes de chaque côté, concentrez-vous sur votre équilibre',
        duration: 1.5,
        level: 'beginner',
        equipment: ['Tapis'],
        muscleGroups: ['Équilibre', 'Core'],
        calories: 10,
        metricType: 'durationOnly'
      },
      {
        id: '4-5',
        name: 'Posture de l\'enfant',
        description: 'Relaxation de 2 minutes dans cette posture',
        duration: 2,
        level: 'beginner',
        equipment: ['Tapis'],
        muscleGroups: ['Dos', 'Relaxation'],
        calories: 8,
        metricType: 'durationOnly'
      }
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
      {
        id: '5-1',
        name: 'Planche',
        description: 'Tenez la position pendant 60 secondes',
        duration: 1,
        level: 'advanced',
        equipment: ['Tapis'],
        muscleGroups: ['Core', 'Épaules'],
        calories: 12,
        metricType: 'durationOnly'
      },
      {
        id: '5-2',
        name: 'Crunchs',
        description: '3 séries de 20 répétitions, repos de 30 secondes entre les séries',
        duration: 4,
        level: 'advanced',
        equipment: ['Tapis'],
        muscleGroups: ['Core'],
        calories: 25,
        metricType: 'repsOnly'
      },
      {
        id: '5-3',
        name: 'Russian Twists',
        description: '3 séries de 24 répétitions (12 de chaque côté), repos de 30 secondes',
        duration: 4,
        level: 'advanced',
        equipment: ['Tapis'],
        muscleGroups: ['Core'],
        calories: 28,
        metricType: 'repsOnly'
      },
      {
        id: '5-4',
        name: 'Mountain Climbers',
        description: '45 secondes à haute intensité, suivies de 15 secondes de repos, répétez 3 fois',
        duration: 3,
        level: 'advanced',
        equipment: ['Tapis'],
        muscleGroups: ['Core', 'Cardio'],
        calories: 35,
        metricType: 'durationOnly'
      },
      {
        id: '5-5',
        name: 'Hollow Hold',
        description: 'Tenez la position pendant 45 secondes, répétez 3 fois avec 30 secondes de repos',
        duration: 3.5,
        level: 'advanced',
        equipment: ['Tapis'],
        muscleGroups: ['Core'],
        calories: 30,
        metricType: 'durationOnly'
      }
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
      {
        id: '6-1',
        name: 'Box Jumps',
        description: '4 séries de 10 sauts, repos de 45 secondes entre les séries',
        duration: 6,
        level: 'advanced',
        equipment: ['Box'],
        muscleGroups: ['Bas du corps', 'Puissance'],
        calories: 50,
        metricType: 'repsOnly'
      },
      {
        id: '6-2',
        name: 'Kettlebell Swings',
        description: '4 séries de 15 répétitions, repos de 45 secondes entre les séries',
        duration: 6,
        level: 'advanced',
        equipment: ['Kettlebell'],
        muscleGroups: ['Full body', 'Puissance'],
        calories: 55,
        metricType: 'weightAndReps'
      },
      {
        id: '6-3',
        name: 'Burpees',
        description: '4 séries de 12 répétitions, repos de 45 secondes entre les séries',
        duration: 6,
        level: 'advanced',
        equipment: ['Sans équipement'],
        muscleGroups: ['Full body', 'Cardio'],
        calories: 60,
        metricType: 'repsOnly'
      },
      {
        id: '6-4',
        name: 'Sprint sur place',
        description: '30 secondes à intensité maximale, suivies de 30 secondes de repos, répétez 4 fois',
        duration: 4,
        level: 'advanced',
        equipment: ['Sans équipement'],
        muscleGroups: ['Bas du corps', 'Cardio'],
        calories: 45,
        metricType: 'durationOnly'
      },
      {
        id: '6-5',
        name: 'Push Press',
        description: '4 séries de 10 répétitions, repos de 45 secondes entre les séries',
        duration: 6,
        level: 'advanced',
        equipment: ['Kettlebell', 'Haltères'],
        muscleGroups: ['Épaules', 'Puissance'],
        calories: 50,
        metricType: 'weightAndReps'
      }
    ]
  }
];

export default workouts;

