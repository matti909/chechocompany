import { defineConfig, defineCollection, s } from 'velite'

// Esquema para los precios de diferentes packs
const pricesSchema = s.object({
  pack6: s.number(),
  pack12: s.number(),
  pack25: s.number(),
  pack50: s.number(),
  pack100: s.number(),
})

// Esquema principal para las genéticas
const genetics = defineCollection({
  name: 'Genetic',
  pattern: 'genetics/**/*.md',
  schema: s
    .object({
      // Metadata básica
      id: s.string(),
      title: s.string(),
      slug: s.slug('genetics'),

      // Información genética
      genetics: s.string(),
      composition: s.string(),
      thc: s.string(),
      cbd: s.string().optional(),

      // Cultivo
      flowering: s.string(),
      floweringDays: s.string().optional(),
      difficulty: s.string(),
      type: s.string(),

      // Características
      smell: s.string(),
      flavor: s.string(),

      // Producción
      productionIndoor: s.string(),
      productionOutdoor: s.string(),
      heightIndoor: s.string(),
      heightOutdoor: s.string(),
      harvestTime: s.string(),

      // Efectos
      effectType: s.string(),
      specialFeature: s.string().optional(),

      // Visuales
      image: s.string(),
      color: s.enum(['pink', 'emerald', 'blue', 'orange', 'purple', 'cyan']),

      // Precios
      prices: pricesSchema,

      // Contenido markdown
      content: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/genetics/${data.slug}`,
    }))
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { genetics },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
})
