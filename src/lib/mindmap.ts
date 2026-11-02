import type { Lang } from './i18n';

export type NodeId = 'eng' | 'psy' | 'gam' | 'art' | 'wri';

export interface MindNode {
  id: NodeId;
  label: Record<Lang, string>;
  /** CSS color token for the pill. */
  color: string;
  /** Position in % of the map box: [left, top]. */
  desk: [number, number];
  phone: [number, number];
}

export interface MindEdge {
  a: NodeId;
  b: NodeId;
  /** What joins the two topics. Edit freely. */
  link: Record<Lang, string>;
}

export const NODES: MindNode[] = [
  { id: 'eng', label: { es: 'Ingeniería', en: 'Engineering' }, color: 'var(--sky)', desk: [12, 30], phone: [26, 12] },
  { id: 'psy', label: { es: 'Psicología', en: 'Psychology' }, color: 'var(--lavender)', desk: [42, 72], phone: [70, 32] },
  { id: 'gam', label: { es: 'Juegos', en: 'Games' }, color: 'var(--peach)', desk: [62, 22], phone: [26, 55] },
  { id: 'art', label: { es: 'Arte', en: 'Art' }, color: 'var(--matcha)', desk: [86, 66], phone: [72, 75] },
  { id: 'wri', label: { es: 'Escritura', en: 'Writing' }, color: 'var(--butter)', desk: [90, 22], phone: [32, 90] },
];

export const EDGES: MindEdge[] = [
  { a: 'eng', b: 'psy', link: { es: 'Yuyay, pruebas psicológicas abiertas', en: 'Yuyay, open psych tests' } },
  { a: 'eng', b: 'gam', link: { es: 'cómo se construyen los juegos', en: 'how games are built' } },
  { a: 'eng', b: 'art', link: { es: 'PawlyPaint', en: 'PawlyPaint' } },
  { a: 'psy', b: 'gam', link: { es: 'por qué algunos juegos se sienten tan bien', en: 'why some games feel so good' } },
  { a: 'psy', b: 'wri', link: { es: 'apuntes de clase en este diario', en: 'class notes in this journal' } },
  { a: 'gam', b: 'wri', link: { es: 'reseñas de juegos', en: 'game reviews' } },
  { a: 'art', b: 'wri', link: { es: 'ideas y guiones de videos', en: 'video ideas and scripts' } },
];
