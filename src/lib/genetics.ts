import fs from 'fs';
import path from 'path';

export interface GeneticPrices {
  pack6: number;
  pack12: number;
  pack25: number;
  pack50: number;
  pack100: number;
}

export interface Genetic {
  id: string;
  title: string;
  slug: string;
  genetics: string;
  composition: string;
  thc: string;
  cbd?: string;
  flowering: string;
  floweringDays?: string;
  difficulty: string;
  type: string;
  smell: string;
  flavor: string;
  productionIndoor: string;
  productionOutdoor: string;
  heightIndoor: string;
  heightOutdoor: string;
  harvestTime: string;
  effectType: string;
  specialFeature?: string;
  image: string;
  color: string;
  prices: GeneticPrices;
  medicalUse?: string[];
  content: string;
}

function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatterText = match[1];
  const remainingContent = content.slice(match[0].length).trim();

  const data: Record<string, any> = {};
  let currentKey = '';
  let currentIndent = 0;

  frontmatterText.split('\n').forEach((line) => {
    const indent = line.search(/\S/);

    if (indent === 0 && line.includes(':')) {
      // Top-level key
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      currentKey = key.trim();

      if (value) {
        data[currentKey] = value;
      } else {
        data[currentKey] = {};
        currentIndent = indent;
      }
    } else if (indent > 0 && line.includes(':')) {
      // Nested key (like prices)
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      const cleanKey = key.trim();

      if (typeof data[currentKey] === 'object' && !Array.isArray(data[currentKey])) {
        data[currentKey][cleanKey] = isNaN(Number(value)) ? value : Number(value);
      }
    }
  });

  return { data, content: remainingContent };
}

export function parseGeneticsMarkdown(markdownContent: string): Genetic[] {
  const genetics: Genetic[] = [];

  // Split by ## headers (each genetic starts with ##)
  const sections = markdownContent.split(/\n##\s+/);

  sections.forEach((section) => {
    if (!section.trim() || section.startsWith('CARACTERÍSTICAS GENERALES')) {
      return;
    }

    // Try to find frontmatter before the section
    const beforeSection = markdownContent.indexOf(`## ${section}`);
    if (beforeSection === -1) return;

    const possibleFrontmatter = markdownContent.substring(Math.max(0, beforeSection - 1000), beforeSection);
    const lastFrontmatterMatch = possibleFrontmatter.match(/---\n([\s\S]*?)\n---/g);

    if (lastFrontmatterMatch && lastFrontmatterMatch.length > 0) {
      const frontmatterText = lastFrontmatterMatch[lastFrontmatterMatch.length - 1];
      const { data } = parseFrontmatter(frontmatterText);

      if (data.id && data.title) {
        // Extract medical use from the content
        const medicalUseMatch = section.match(/### Uso Medicinal\n([\s\S]*?)(?=\n###|\n---|\n##|$)/);
        let medicalUse: string[] = [];

        if (medicalUseMatch) {
          medicalUse = medicalUseMatch[1]
            .split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => line.replace(/^-\s*/, '').trim());
        }

        genetics.push({
          id: data.id,
          title: data.title,
          slug: data.slug,
          genetics: data.genetics || '',
          composition: data.composition || '',
          thc: data.thc || '',
          cbd: data.cbd,
          flowering: data.flowering || '',
          floweringDays: data.floweringDays,
          difficulty: data.difficulty || '',
          type: data.type || '',
          smell: data.smell || '',
          flavor: data.flavor || '',
          productionIndoor: data.productionIndoor || '',
          productionOutdoor: data.productionOutdoor || '',
          heightIndoor: data.heightIndoor || '',
          heightOutdoor: data.heightOutdoor || '',
          harvestTime: data.harvestTime || '',
          effectType: data.effectType || '',
          specialFeature: data.specialFeature,
          image: data.image || '',
          color: data.color || 'emerald',
          prices: data.prices || { pack6: 0, pack12: 0, pack25: 0, pack50: 0, pack100: 0 },
          medicalUse,
          content: section,
        });
      }
    }
  });

  return genetics;
}

export function getAllGenetics(): Genetic[] {
  const filePath = path.join(process.cwd(), 'src', 'data', 'genetics.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return parseGeneticsMarkdown(fileContents);
}

export function getGeneticBySlug(slug: string): Genetic | undefined {
  const genetics = getAllGenetics();
  return genetics.find((g) => g.slug === slug);
}
