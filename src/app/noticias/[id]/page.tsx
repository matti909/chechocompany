'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, ArrowLeft, Scale, Tag, Users, Shield, FileText, Leaf, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        // Check if the requested article ID matches available articles
        if (params.id === 'scraped-reprocann' || params.id === 'scraped-inase' || params.id === 'scraped-normativa') {
          setLoading(false);
        } else {
          // Article not found
          notFound();
        }
      } catch (error) {
        console.error('Error loading article:', error);
        notFound();
      }
    };

    loadArticle();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  // Get article data based on ID
  const getArticleData = () => {
    if (params.id === 'scraped-reprocann') {
      return {
        titulo: "Registro REPROCANN",
        categoria: "Regulación",
        fechaPublicacion: "2025-01-29",
        fuente: {
          nombre: "Argentina.gob.ar",
          url: "https://www.argentina.gob.ar/salud/cannabis-medicinal/reprocann",
        },
        tags: ["REPROCANN", "Cannabis Medicinal", "Argentina", "Regulación", "Salud Pública"],
        isReprocann: true,
        color: "purple"
      };
    } else if (params.id === 'scraped-inase') {
      return {
        titulo: "Certificación de Semillas - INASE",
        categoria: "Certificación",
        fechaPublicacion: "2025-01-29",
        fuente: {
          nombre: "Argentina.gob.ar",
          url: "https://www.argentina.gob.ar/inase/certificacionsemillas",
        },
        tags: ["INASE", "Certificación Semillas", "Argentina", "Agricultura"],
        isInase: true,
        color: "emerald"
      };
    } else if (params.id === 'scraped-normativa') {
      return {
        titulo: "Decreto 883/2020 - Cannabis Medicinal",
        categoria: "Normativa",
        fechaPublicacion: "2020-12-01",
        fuente: {
          nombre: "Argentina.gob.ar",
          url: "https://www.argentina.gob.ar/normativa/nacional/decreto-883-2020-344131/texto",
        },
        tags: ["Decreto 883/2020", "Cannabis Medicinal", "Argentina", "Normativa"],
        isNormativa: true,
        color: "blue"
      };
    }
    return null;
  };

  const article = getArticleData();

  if (!article) {
    return notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const colorClasses = {
    purple: {
      gradient: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-500/30",
      text: "text-purple-400",
      badge: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400"
    },
    emerald: {
      gradient: "from-emerald-500/10 to-lime-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      badge: "from-emerald-500/20 to-lime-500/20 border-emerald-500/30 text-emerald-400"
    },
    blue: {
      gradient: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      badge: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400"
    }
  };

  const colors = colorClasses[article.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-20 w-72 h-72 bg-gradient-to-r ${colors.gradient} rounded-full blur-3xl animate-pulse`} />
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-l from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/#noticias">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-0 h-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Noticias
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-12">
            {/* Category badge */}
            <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${colors.badge} backdrop-blur-sm border ${colors.border} px-6 py-3 rounded-xl text-sm font-mono uppercase tracking-wider mb-6`}>
              {article.isReprocann ? <Scale className="w-5 h-5" /> :
               article.isInase ? <Leaf className="w-5 h-5" /> :
               <FileText className="w-5 h-5" />}
              <span>{article.categoria}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                article.color === 'purple' ? 'from-purple-400 via-pink-400 to-purple-400' :
                article.color === 'emerald' ? 'from-emerald-400 via-lime-400 to-emerald-400' :
                'from-blue-400 via-cyan-400 to-blue-400'
              }`}>
                {article.titulo}
              </span>
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>{formatDate(article.fechaPublicacion)}</time>
              </div>
              <div className="flex items-center gap-2">
                <span>Fuente:</span>
                <a
                  href={article.fuente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${colors.text} hover:opacity-80 transition-colors`}
                >
                  {article.fuente.nombre}
                </a>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colors.badge} border ${colors.border} rounded-full text-sm font-mono uppercase tracking-wider`}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Summary */}
            <div className={`bg-gradient-to-r ${colors.gradient} border ${colors.border} rounded-2xl p-6 backdrop-blur-sm`}>
              <p className="text-xl text-gray-300 leading-relaxed">
                {article.isReprocann ? (
                  'El Programa procura mejorar el acceso a quienes tienen indicación médica basada en la evidencia científica disponible, a un producto como especialidad medicinal; con formulación magistral; o que se origine en un cultivo controlado de la planta de cannabis.'
                ) : article.isInase ? (
                  'El Instituto Nacional de Semillas (INASE) regula la fiscalización de semillas para asegurar la pureza varietal y calidad de las semillas utilizadas en la agricultura argentina.'
                ) : (
                  'El Decreto 883/2020 establece el marco normativo para la regulación del cannabis medicinal en Argentina, definiendo los procedimientos, requisitos y autoridades competentes.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className={`bg-black/80 backdrop-blur-xl border ${colors.border} rounded-3xl overflow-hidden`}>
          <div className="p-8 md:p-12">
            {/* Content based on article type */}
            {article.isReprocann ? (
              <ReprocannContent colors={colors} />
            ) : article.isInase ? (
              <InaseContent colors={colors} />
            ) : (
              <NormativaContent colors={colors} />
            )}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {article.isReprocann ? '¿Te interesa el cannabis medicinal?' :
               article.isInase ? '¿Necesitas semillas certificadas?' :
               '¿Quieres conocer más sobre regulación?'}
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {article.isReprocann ? (
                'Conoce nuestras genéticas premium diseñadas para diferentes necesidades medicinales y recreativas.'
              ) : article.isInase ? (
                'Descubre nuestras genéticas certificadas que cumplen con los más altos estándares de calidad y pureza varietal.'
              ) : (
                'Explora nuestras genéticas que cumplen con toda la normativa vigente en materia de cannabis medicinal.'
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/genetics">
              <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-3 transition-all duration-300 hover:scale-105">
                Ver Genéticas
              </Button>
            </Link>

            <a
              href={article.fuente.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className={`border-${article.color}-500/30 ${colors.text} hover:bg-${article.color}-500/10 hover:border-${article.color}-400/50 transition-all duration-300`}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Fuente oficial
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// REPROCANN Content Component
function ReprocannContent({ colors }: { colors: any }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <p className="text-xl text-gray-200 leading-relaxed mb-8">
        El Programa procura mejorar el acceso a quienes tienen indicación médica basada en la evidencia científica disponible, a un producto como especialidad medicinal; con formulación magistral; o que se origine en un cultivo controlado de la planta de cannabis realizado por los pacientes para sí, por terceros, o por una red de pacientes asistidos por Organizaciones No Gubernamentales (ONG) autorizadas por el Programa a través del Registro del Programa de Cannabis (REPROCANN).
      </p>

      {/* ¿Cómo acceder? Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">¿Cómo acceder?</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-emerald-400 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Sistema Público de Salud
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Las personas que no posean cobertura de salud y sean atendidas exclusivamente en el Sistema Público de Salud y que cuenten con indicación médica tienen derecho a acceder en forma gratuita a los derivados de la planta de cannabis por parte del Estado Nacional.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Obras Sociales y Prepagas
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Para las personas que tienen obra social o prepaga la cobertura la deberán brindar las Obras Sociales y Agentes del Seguro de Salud del Sistema Nacional, las demás obras sociales y organismos que hagan sus veces creados o regidos por leyes nacionales, y las empresas o entidades que presten servicios de medicina prepaga.
            </p>
          </div>
        </div>
      </div>

      {/* ¿Quiénes pueden acceder? Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">¿Quiénes pueden acceder?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              Especialidad Médica o Formulación Magistral
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Pacientes con indicación médica de especialidad médica o formulación magistral, cuyo expendio se realizará en las farmacias autorizadas.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              Cultivo Controlado
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Pacientes con indicación médica que deban inscribirse en el REPROCANN, para obtener autorización para cultivo controlado.
            </p>
          </div>
        </div>
      </div>

      {/* Important notice */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <Scale className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">
              Información Importante
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Este programa está regulado por el Ministerio de Salud de la Nación Argentina y requiere indicación médica específica. Para más información sobre el proceso de registro y requisitos, consulte el sitio oficial del gobierno.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// INASE Content Component
function InaseContent({ colors }: { colors: any }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <p className="text-xl text-gray-200 leading-relaxed mb-8">
        Cuando se hace referencia a la fiscalización de semilla se refiere a los procesos que de acuerdo a la legislación nacional vigente deben seguirse a los fines de asegurar la pureza varietal de la semilla que se utiliza en el país.
      </p>

      {/* Marco Legal */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
            <Scale className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Marco Legal</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-emerald-400 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Ley de Semillas y Creaciones Fitogenéticas
            </h3>
            <p className="text-gray-300 leading-relaxed">
              La producción y comercialización de la semilla fiscalizada en la República Argentina está reglamentada por la <strong>Ley Nº 20.247</strong> y su <strong>Decreto Reglamentario Nº 2.183/91</strong>, cuyo órgano de aplicación es el Instituto Nacional de Semillas (INASE).
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Definición de Semilla Fiscalizada
            </h3>
            <p className="text-gray-300 leading-relaxed">
              <em>"La clase de semilla 'fiscalizada'. Es aquella que, además de cumplir los requisitos exigidos para la simiente "Identificada" y demostrando un buen comportamiento en ensayos aprobados oficialmente, está sometida a control oficial durante las etapas de su ciclo de producción."</em>
            </p>
            <p className="text-gray-400 text-sm mt-2">— Decreto Reglamentario Nº 2.183/91, Artículo 11</p>
          </div>
        </div>
      </div>

      {/* Proceso de Fiscalización */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Proceso de Fiscalización</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">
              Requisitos Iniciales
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Declaración de superficie a sembrar</li>
              <li>• Aislamiento necesario según la especie</li>
              <li>• Semilla origen fiscalizada</li>
              <li>• Control de pureza varietal</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              Etapas del Proceso
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Inspecciones a campo</li>
              <li>• Cosecha controlada</li>
              <li>• Acondicionamiento</li>
              <li>• Envasado y rotulado oficial</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Responsabilidad del Director Técnico
          </h3>
          <p className="text-gray-300 leading-relaxed">
            El Director Técnico es el responsable de dicho proceso en todas sus etapas, esto es, campo, cosecha, acondicionamiento y análisis de laboratorio, a fin de que la semilla sea envasada y rotulada, para su multiplicación o comercialización.
          </p>
        </div>
      </div>

      {/* Beneficios */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Garantías de Calidad</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Calidad Genética", desc: "Pureza varietal garantizada" },
            { title: "Poder Germinativo", desc: "Viabilidad de semillas asegurada" },
            { title: "Sanidad", desc: "Libre de patógenos y plagas" },
            { title: "Homogeneidad", desc: "Uniformidad del lote" },
            { title: "Trazabilidad", desc: "Seguimiento completo del origen" },
            { title: "Investigación", desc: "Impulso a la mejora genética" }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 rounded-xl p-4">
              <h4 className="text-emerald-400 font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important notice */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <Leaf className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">
              Identificación Oficial
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              El productor encontrará la Semilla Fiscalizada adecuadamente identificada mediante un rótulo oficial en envases u otros contenedores autorizados por INASE.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Normativa Content Component (Decreto 883/2020)
function NormativaContent({ colors }: { colors: any }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <p className="text-xl text-gray-200 leading-relaxed mb-8">
        El Decreto 883/2020 establece el Régimen de Regulación del Cannabis para uso medicinal, científico y tecnológico en el ámbito de la República Argentina.
      </p>

      {/* Marco Regulatorio */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
            <Scale className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Marco Regulatorio</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Objeto del Decreto
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Establece el régimen de regulación del cannabis para uso medicinal, científico y tecnológico, creando el marco normativo para su cultivo controlado, producción, elaboración, fraccionamiento, comercialización, distribución, dispensación, tenencia, almacenamiento, transporte e importación.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-emerald-400 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Autoridades Competentes
            </h3>
            <p className="text-gray-300 leading-relaxed">
              <strong>ANMAT</strong> (Administración Nacional de Medicamentos, Alimentos y Tecnología Médica) es la autoridad de aplicación para productos medicinales, mientras que el <strong>INASE</strong> regula aspectos relacionados con semillas y material de propagación.
            </p>
          </div>
        </div>
      </div>

      {/* Tipos de Autorización */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Tipos de Autorización</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              Cultivo Controlado
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Cultivo para investigación científica</li>
              <li>• Cultivo para producción industrial</li>
              <li>• Cultivo para uso medicinal personal</li>
              <li>• Cultivo solidario por organizaciones</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">
              Producción Industrial
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Fabricación de medicamentos</li>
              <li>• Elaboración de aceites</li>
              <li>• Productos farmacológicos derivados</li>
              <li>• Preparaciones magistrales</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Requisitos y Controles */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Requisitos y Controles</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Seguridad y Trazabilidad
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Todos los establecimientos deben implementar sistemas de seguridad física, control de acceso, videovigilancia y trazabilidad completa desde el cultivo hasta el producto final. Se requiere el mantenimiento de registros detallados de todas las operaciones.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Habilitaciones y Licencias
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Las personas humanas y jurídicas deben obtener habilitaciones específicas según el tipo de actividad. Se establecen diferentes categorías de licencias con requisitos técnicos, legales y de idoneidad específicos para cada una.
            </p>
          </div>
        </div>
      </div>

      {/* Important notice */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <FileText className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Vigencia y Aplicación
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Este decreto está en vigencia desde diciembre de 2020 y establece el marco regulatorio integral para todas las actividades relacionadas con el cannabis medicinal en Argentina. Su cumplimiento es obligatorio para todas las personas físicas y jurídicas involucradas en la cadena de valor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}