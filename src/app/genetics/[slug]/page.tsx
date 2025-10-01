import { notFound } from 'next/navigation';
import { Award, Clock, Sparkles } from "lucide-react";
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
  marmalate: {
    name: "MARMALATE",
    subtitle: "Early Version",
    description: "Genética premiada con floración ultra rápida de tan solo 45 días en interior. Especial para clonar, potente, resistente y la más rápida que existe en el mercado. Con un dulce sabor afrutado y efectos equilibrados.",
    genetics: "Genética exclusiva Early Version",
    composition: "30% Sativa - 70% Indica",
    thc: "21%",
    cbd: "N/A",
    flowering: "6-7 semanas",
    floweringIndoor: "45 días",
    difficulty: "Fácil",
    smell: "Medio",
    flavor: "Dulce afrutado",
    effect: "Equilibrado y potente",
    productionIndoor: "500g/m²",
    productionOutdoor: "900g/planta",
    heightIndoor: "Medio",
    heightOutdoor: "Medio",
    harvestTime: "Principios de septiembre",
    awards: [
      "1° Premio Outdoor Copa MF 2013",
      "2° Indoor Copa Txapelketa 2013"
    ],
    effects: [
      "Cerebral",
      "Equilibrado",
      "Relajante",
      "Potente"
    ],
    effectsData: {
      cerebral: 80,
      body: 85,
      euphoric: 75,
      relaxing: 90,
      creative: 70
    },
    flavorProfile: [
      "Dulce",
      "Afrutado"
    ],
    flavorsData: {
      sweet: 90,
      fruity: 95,
      earthy: 40,
      spicy: 25,
      floral: 60
    },
    features: [
      "Especial para clonar",
      "Ultra rápida floración",
      "Genética estable y confiable"
    ],
    image: "/sems/sati.jpeg",
    color: "blue",
    icon: Award
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
    { slug: 'esquizofrenia' },
    { slug: 'marmalate' },
  ];
}