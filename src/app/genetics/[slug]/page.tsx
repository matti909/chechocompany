import { notFound } from 'next/navigation';
import { Clock, Sparkles } from "lucide-react";
import { GeneticsClient, type GeneticsData } from './GeneticsClient';

const geneticsData = {
  epilepsia: {
    name: "EPILEPSIA",
    subtitle: "Big Bud x Skunk #1",
    description: "Fuerte aroma floral dulce muy agradable al paladar, que se combina a la perfección con un potente y equilibrado subidón cerebral, que deriva en una sensación de relajación posterior muy placentera. Nos ayuda a reducir el insomnio, los dolores de cabeza y la indigestión causada por la comida pesada.",
    genetics: "Big Bud x Skunk #1",
    composition: "70% Indica - 30% Sativa",
    thc: "18-20%",
    cbd: "0.7%",
    flowering: "9-10 semanas",
    floweringIndoor: "9-10 semanas",
    difficulty: "Fácil",
    smell: "Alto - Aroma floral intenso",
    flavor: "Flores dulces muy agradables al paladar",
    effect: "Sedante cerebral equilibrado",
    productionIndoor: "500-600g/m²",
    productionOutdoor: "600-1000g/planta",
    heightIndoor: "Medio (400cm)",
    heightOutdoor: "Medio (2.5m)",
    harvestTime: "Principios de septiembre",
    medicalUse: [
      "Anti-insomnio",
      "Analgésico para dolores de cabeza",
      "Ayuda con problemas digestivos",
      "Relajante muscular"
    ],
    effects: [
      "Cerebral",
      "Equilibrado",
      "Relajante",
      "Body-buzz"
    ],
    effectsData: {
      cerebral: 85,
      body: 90,
      euphoric: 70,
      relaxing: 95,
      creative: 60
    },
    flavorProfile: [
      "Dulce",
      "Floral",
      "Agradable al paladar"
    ],
    flavorsData: {
      sweet: 90,
      fruity: 60,
      earthy: 40,
      spicy: 30,
      floral: 95
    },
    image: "/sems/indu.jpeg",
    color: "pink",
    icon: Sparkles
  },
  esquizofrenia: {
    name: "ESQUIZOFRENIA",
    subtitle: "Ultra Rápida",
    description: "Al inhalar tiene un sabor dulce a uva y golosinas, con notas dulces como vainilla o madera muy aromática. Nos ayuda a bajar los nervios y la ansiedad. Es ideal para acompañarnos en momentos tensos y que nos inquietan, provoca un efecto de estimulación cerebral, acompañado posteriormente de una sensación de relajación física de intensidad media muy agradable.",
    genetics: "Genética exclusiva Chex Seeds",
    composition: "70% Indica - 30% Sativa",
    thc: "21%",
    cbd: "Desconocido",
    flowering: "6-7 semanas",
    floweringIndoor: "45 días",
    difficulty: "Fácil",
    smell: "Bajo - Discreto",
    flavor: "Dulce a uva y golosinas, notas de vainilla y madera aromática",
    effect: "Eufórico cerebral equilibrado",
    productionIndoor: "500g/m²",
    productionOutdoor: "600g/planta",
    heightIndoor: "Medio",
    heightOutdoor: "Medio",
    harvestTime: "Principios de septiembre",
    medicalUse: [
      "Anti-ansiedad potente",
      "Reduce nerviosismo",
      "Efecto analgésico",
      "Ideal para momentos tensos"
    ],
    effects: [
      "Cerebral",
      "Equilibrado",
      "Relajante",
      "Body-buzz"
    ],
    effectsData: {
      cerebral: 95,
      body: 75,
      euphoric: 90,
      relaxing: 80,
      creative: 85
    },
    flavorProfile: [
      "Dulce",
      "Vainilla",
      "Caramelo",
      "Madera aromática"
    ],
    flavorsData: {
      sweet: 95,
      fruity: 80,
      earthy: 50,
      spicy: 20,
      floral: 30
    },
    features: [
      "Especial para clonar",
      "La más rápida que existe",
      "Potente y resistente"
    ],
    image: "/sems/cali.jpeg",
    color: "emerald",
    icon: Clock
  },
  "bipolaridad-maniaca": {
    name: "BIPOLARIDAD MANÍACA",
    subtitle: "GG#4 x Santabilbo",
    description: "Genética Sativa dominante con alto contenido de THC (25%). Produce un efecto cerebral intenso y eufórico, ideal para estabilizar el ánimo y combatir el estrés. Su sabor dulce con notas frutales y terrosas la hace única. Perfecta para estimular la creatividad y mantener un estado mental positivo.",
    genetics: "GG#4 x Santabilbo",
    composition: "60% Sativa - 40% Indica",
    thc: "25%",
    cbd: "Medio",
    flowering: "8-10 semanas",
    floweringIndoor: "8-10 semanas",
    difficulty: "Fácil",
    smell: "Alto - Dulce frutal",
    flavor: "Dulce con notas frutales y terrosas",
    effect: "Cerebral eufórico",
    productionIndoor: "550-650g/m²",
    productionOutdoor: "800-1000g/planta",
    heightIndoor: "Mediana",
    heightOutdoor: "Grande",
    harvestTime: "Mediados de octubre",
    medicalUse: [
      "Estabilizador de ánimo",
      "Anti-estrés",
      "Estimula creatividad",
      "Efecto cerebral eufórico"
    ],
    effects: [
      "Cerebral",
      "Eufórico",
      "Energizante",
      "Creativo"
    ],
    effectsData: {
      cerebral: 95,
      body: 60,
      euphoric: 95,
      relaxing: 55,
      creative: 90
    },
    flavorProfile: [
      "Dulce",
      "Frutal",
      "Terroso",
      "Cítrico"
    ],
    flavorsData: {
      sweet: 85,
      fruity: 90,
      earthy: 75,
      spicy: 40,
      floral: 50
    },
    features: [
      "Alto contenido de THC (25%)",
      "Producción abundante",
      "Efecto duradero y potente"
    ],
    image: "/sems/bipolaridad.jpg",
    color: "orange",
    icon: Sparkles
  },
  "pack-mix": {
    name: "PACK MIX",
    subtitle: "Las 3 Genéticas Premium",
    description: "Nuestro Pack Mix te ofrece la experiencia completa de ChexSeeds con las 3 genéticas premium en un solo pack. Perfecto para cultivadores que quieren probar toda nuestra línea o experimentar con diferentes perfiles de efectos y sabores. Obtén lo mejor de cada variedad: la potencia relajante de Epilepsia, la velocidad extrema de Esquizofrenia, y el efecto eufórico de Bipolaridad Maníaca.",
    genetics: "Big Bud x Skunk #1 + GG#4 x Santabilbo + Exclusiva Chex Seeds",
    composition: "Mix: Indica/Sativa",
    thc: "18-25%",
    cbd: "Variado",
    flowering: "6-10 semanas",
    floweringIndoor: "6-10 semanas",
    difficulty: "Fácil",
    smell: "Variado - Todos los perfiles",
    flavor: "Mix completo: Floral dulce, Uva vainilla, Frutal terroso",
    effect: "Variedad completa de efectos",
    productionIndoor: "500-650g/m²",
    productionOutdoor: "600-1000g/planta",
    heightIndoor: "Media",
    heightOutdoor: "Media-Grande",
    harvestTime: "Septiembre - Octubre",
    medicalUse: [
      "Combina todos los beneficios terapéuticos",
      "Anti-insomnio y relajación muscular",
      "Anti-ansiedad potente",
      "Estabilizador de ánimo y anti-estrés"
    ],
    effects: [
      "Variedad completa",
      "Cerebral & Corporal",
      "Relajante & Energizante",
      "Versátil"
    ],
    effectsData: {
      cerebral: 90,
      body: 75,
      euphoric: 85,
      relaxing: 80,
      creative: 75
    },
    flavorProfile: [
      "Dulce",
      "Floral",
      "Frutal",
      "Terroso",
      "Vainilla"
    ],
    flavorsData: {
      sweet: 90,
      fruity: 80,
      earthy: 60,
      spicy: 30,
      floral: 70
    },
    features: [
      "3 genéticas premium en 1 pack",
      "Máxima variedad de efectos y sabores",
      "Perfecto para cultivadores experimentales",
      "Mejor precio por semilla"
    ],
    image: "/sems/cana.png",
    color: "purple",
    icon: Sparkles
  }
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GeneticsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const genetics = geneticsData[slug as keyof typeof geneticsData];

  if (!genetics) {
    notFound();
  }

  // Convert the genetics data to be client-safe
  const clientSafeGenetics = {
    ...genetics,
    icon: null // Remove the icon component for now
  };

  return <GeneticsClient genetics={clientSafeGenetics as GeneticsData} />;
}

export async function generateStaticParams() {
  return [
    { slug: 'epilepsia' },
    { slug: 'bipolaridad-maniaca' },
    { slug: 'esquizofrenia' },
    { slug: 'pack-mix' },
  ];
}