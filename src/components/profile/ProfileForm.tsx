// src/components/profile/ProfileForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProfileForm: React.FC = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1 - Informations personnelles
    gender: '',
    age: '',
    height: '',
    weight: '',
    targetWeight: '',
    
    // Étape 2 - Préférences de fitness
    fitnessLevel: '',
    workoutLocation: '',
    workoutDuration: '',
    daysPerWeek: '',
    
    // Étape 3 - Préférences alimentaires
    dietaryRestrictions: [] as string[],
    mealPreferences: [] as string[],
    includeSnacks: false
  });
  
  // État pour les erreurs
  const [errors, setErrors] = useState({
    gender: false,
    age: false,
    height: false,
    weight: false,
    targetWeight: false,
    fitnessLevel: false,
    workoutLocation: false,
    workoutDuration: false,
    daysPerWeek: false
  });
  
  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Réinitialiser l'erreur si une valeur est saisie
    if (value) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };
  
  const handleSelectDietaryRestriction = (restriction: string) => {
    setFormData(prev => {
      const restrictions = [...prev.dietaryRestrictions];
      if (restrictions.includes(restriction)) {
        return { 
          ...prev, 
          dietaryRestrictions: restrictions.filter(r => r !== restriction) 
        };
      } else {
        return { 
          ...prev, 
          dietaryRestrictions: [...restrictions, restriction] 
        };
      }
    });
  };
  
  // Validation des étapes
  const validateStep1 = () => {
    const newErrors = {
      gender: !formData.gender,
      age: !formData.age,
      height: !formData.height,
      weight: !formData.weight,
      targetWeight: !formData.targetWeight
    };
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    
    return !Object.values(newErrors).includes(true);
  };
  
  const validateStep2 = () => {
    const newErrors = {
      fitnessLevel: !formData.fitnessLevel,
      workoutLocation: !formData.workoutLocation,
      workoutDuration: !formData.workoutDuration,
      daysPerWeek: !formData.daysPerWeek
    };
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    
    return !Object.values(newErrors).includes(true);
  };
  
  // L'étape 3 n'a pas de validation obligatoire
  const validateStep3 = () => {
    return true;
  };
  
  // Navigation avec validation
  const handleNextStep = () => {
    let isValid = false;
    
    switch (formStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = false;
    }
    
    if (isValid) {
      setFormStep(prev => prev + 1);
    } else {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires pour continuer.",
        variant: "destructive"
      });
    }
  };
  
  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valider l'étape finale avant soumission
    if (!validateStep3()) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Profil utilisateur:', formData);
    
    toast({
      title: "Profil enregistré",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
  };
  
  // Contenu de l'étape 1 : Informations personnelles
  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="gender" className={errors.gender ? "text-red-500" : ""}>
            Genre <span className="text-red-500">*</span>
          </Label>
          <RadioGroup 
            id="gender" 
            className="flex space-x-4 mt-2"
            value={formData.gender}
            onValueChange={val => updateForm('gender', val)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Homme</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Femme</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Autre</Label>
            </div>
          </RadioGroup>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="age" className={errors.age ? "text-red-500" : ""}>
            Âge <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Votre âge"
            className={`mt-1 ${errors.age ? "border-red-500" : ""}`}
            value={formData.age}
            onChange={e => updateForm('age', e.target.value)}
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="height" className={errors.height ? "text-red-500" : ""}>
            Taille (cm) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="height" 
            type="number" 
            placeholder="Votre taille en centimètres"
            className={`mt-1 ${errors.height ? "border-red-500" : ""}`}
            value={formData.height}
            onChange={e => updateForm('height', e.target.value)}
          />
          {errors.height && (
            <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="weight" className={errors.weight ? "text-red-500" : ""}>
            Poids actuel (kg) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder="Votre poids actuel en kilogrammes"
            className={`mt-1 ${errors.weight ? "border-red-500" : ""}`}
            value={formData.weight}
            onChange={e => updateForm('weight', e.target.value)}
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="targetWeight" className={errors.targetWeight ? "text-red-500" : ""}>
            Poids cible (kg) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="targetWeight" 
            type="number" 
            placeholder="Votre poids cible en kilogrammes"
            className={`mt-1 ${errors.targetWeight ? "border-red-500" : ""}`}
            value={formData.targetWeight}
            onChange={e => updateForm('targetWeight', e.target.value)}
          />
          {errors.targetWeight && (
            <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
          )}
        </div>
      </div>
    </motion.div>
  );
  
  // Contenu de l'étape 2 : Préférences de fitness
  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="fitnessLevel" className={errors.fitnessLevel ? "text-red-500" : ""}>
            Niveau de fitness <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.fitnessLevel}
            onValueChange={val => updateForm('fitnessLevel', val)}
          >
            <SelectTrigger className={`mt-1 ${errors.fitnessLevel ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Sélectionnez votre niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Débutant</SelectItem>
              <SelectItem value="intermediate">Intermédiaire</SelectItem>
              <SelectItem value="advanced">Avancé</SelectItem>
            </SelectContent>
          </Select>
          {errors.fitnessLevel && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="workoutLocation" className={errors.workoutLocation ? "text-red-500" : ""}>
            Lieu d'entraînement <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.workoutLocation}
            onValueChange={val => updateForm('workoutLocation', val)}
          >
            <SelectTrigger className={`mt-1 ${errors.workoutLocation ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Où préférez-vous vous entraîner?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">À la maison</SelectItem>
              <SelectItem value="gym">En salle de sport</SelectItem>
              <SelectItem value="outdoors">En extérieur</SelectItem>
              <SelectItem value="mixed">Mixte</SelectItem>
            </SelectContent>
          </Select>
          {errors.workoutLocation && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="workoutDuration" className={errors.workoutDuration ? "text-red-500" : ""}>
            Durée d'entraînement préférée <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.workoutDuration}
            onValueChange={val => updateForm('workoutDuration', val)}
          >
            <SelectTrigger className={`mt-1 ${errors.workoutDuration ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Durée d'entraînement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15min">15 minutes</SelectItem>
              <SelectItem value="30min">30 minutes</SelectItem>
              <SelectItem value="45min">45 minutes</SelectItem>
              <SelectItem value="60min">60 minutes ou plus</SelectItem>
            </SelectContent>
          </Select>
          {errors.workoutDuration && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="daysPerWeek" className={errors.daysPerWeek ? "text-red-500" : ""}>
            Jours d'entraînement par semaine <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.daysPerWeek}
            onValueChange={val => updateForm('daysPerWeek', val)}
          >
            <SelectTrigger className={`mt-1 ${errors.daysPerWeek ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Nombre de jours par semaine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2days">1-2 jours</SelectItem>
              <SelectItem value="3days">3-4 jours</SelectItem>
              <SelectItem value="5days">5-6 jours</SelectItem>
              <SelectItem value="7days">Tous les jours</SelectItem>
            </SelectContent>
          </Select>
          {errors.daysPerWeek && (
            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une option</p>
          )}
        </div>
      </div>
    </motion.div>
  );
  
  // Contenu de l'étape 3 : Préférences alimentaires
  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <Label className="block mb-3">Restrictions alimentaires</Label>
          <div className="grid grid-cols-2 gap-3">
            {['Végétarien', 'Végétalien', 'Sans gluten', 'Sans lactose', 'Sans fruits de mer', 'Sans noix'].map((restriction) => (
              <div
                key={restriction}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  formData.dietaryRestrictions.includes(restriction)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleSelectDietaryRestriction(restriction)}
              >
                <span className="text-sm font-medium">{restriction}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="includeSnacks" className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id="includeSnacks"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              checked={formData.includeSnacks}
              onChange={(e) => updateForm('includeSnacks', e.target.checked)}
            />
            <span>Inclure des collations dans mes plans de repas</span>
          </Label>
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <GlassCard intensity="medium" className="p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">Votre profil personnalisé</h2>
          <p className="text-foreground/70 mb-8">
            Renseignez vos informations pour des recommandations adaptées à vos besoins
          </p>
          
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-colors ${
                    formStep === step 
                      ? 'bg-primary text-white' 
                      : formStep > step 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-secondary text-foreground/50'
                  }`}
                >
                  {step}
                </div>
                <span className="text-xs text-foreground/70">
                  {step === 1 ? 'Infos personnelles' : step === 2 ? 'Fitness' : 'Nutrition'}
                </span>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Afficher l'étape correspondante */}
            {formStep === 1 && renderStep1()}
            {formStep === 2 && renderStep2()}
            {formStep === 3 && renderStep3()}
            
            <div className="flex justify-between pt-4">
              {formStep > 1 ? (
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  Précédent
                </Button>
              ) : (
                <div></div> // Espace vide pour l'alignement
              )}
              
              {formStep < 3 ? (
                <Button type="button" onClick={handleNextStep}>
                  Suivant
                </Button>
              ) : (
                <Button type="submit">
                  Enregistrer mon profil
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </GlassCard>
    </div>
  );
};

export default ProfileForm;

