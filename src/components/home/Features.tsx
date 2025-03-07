
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Apple, Utensils, Target, BarChart, Gauge } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const featureItems = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Menus saisonniers",
    description: "Des repas élaborés avec des ingrédients frais et de saison pour un maximum de saveurs et de bienfaits."
  },
  {
    icon: <Apple className="w-6 h-6" />,
    title: "Collations équilibrées",
    description: "Des options de collations saines pour satisfaire vos petites faims sans compromettre vos objectifs."
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    title: "Trois repas complets",
    description: "Petit-déjeuner, déjeuner et dîner soigneusement élaborés pour couvrir tous vos besoins nutritionnels."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Objectifs personnalisés",
    description: "Des programmes adaptés à vos données corporelles et à vos objectifs spécifiques de perte de poids."
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Suivi des progrès",
    description: "Suivez votre évolution et visualisez vos progrès pour rester motivé et engagé."
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "Adaptation continue",
    description: "Des exercices qui évoluent avec vous à mesure que vous progressez et gagnez en force."
  }
];

const Features: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Tout ce dont vous avez besoin</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Notre application combine nutrition et fitness pour vous offrir une expérience complète et personnalisée.
          </p>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featureItems.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard
                intensity="light"
                hoverEffect
                className="h-full p-6"
              >
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-foreground/70 flex-grow">{feature.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
