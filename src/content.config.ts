import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const KINDS = ['project', 'psychology', 'game', 'thought', 'video-idea'] as const;
export const GAME_STATUS = ['playing', 'finished', 'dropped'] as const;
export const VIDEO_STAGES = ['idea', 'script', 'recorded', 'published'] as const;

const journal = defineCollection({
  // Only files inside es/ or en/ are posts. _templates/ (Obsidian) is ignored.
  loader: glob({ pattern: '{es,en}/**/[^_]*.{md,mdx}', base: './src/content/journal' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z.coerce.date(),
        kind: z.enum(KINDS),
        summary: z.string().optional(),
        /** Short handwritten note shown in the margin ("field note"). */
        note: z.string().max(40).optional(),
        tags: z.array(z.string()).default([]),
        /** Same value in the es and en versions of one post. */
        translationKey: z.string(),
        draft: z.boolean().default(false),
        /** Placeholder content: shows a "sample" badge. */
        sample: z.boolean().default(false),
        /** Image at the top of the post and on game cards: ./assets/file.png */
        cover: image().optional(),
        /** Short description of the cover for screen readers. */
        coverAlt: z.string().optional(),
        game: z
          .object({
            platform: z.string(),
            status: z.enum(GAME_STATUS),
            hours: z.number().nonnegative().optional(),
            rating: z.number().int().min(1).max(5).optional(),
          })
          .optional(),
        project: z
          .object({
            url: z.url().optional(),
            repo: z.url().optional(),
            stack: z.array(z.string()).default([]),
          })
          .optional(),
        video: z
          .object({
            stage: z.enum(VIDEO_STAGES),
            youtubeUrl: z.url().optional(),
          })
          .optional(),
      })
      .refine((d) => d.kind !== 'game' || d.game, {
        message: 'kind: game needs a "game:" block (platform, status)',
        path: ['game'],
      })
      .refine((d) => d.kind !== 'video-idea' || d.video, {
        message: 'kind: video-idea needs a "video:" block (stage)',
        path: ['video'],
      }),
});

/** Fixed pages written in Markdown (About). Lives inside the Obsidian vault: journal/pages/{es,en}/. */
const pages = defineCollection({
  loader: glob({ pattern: '{es,en}/*.{md,mdx}', base: './src/content/journal/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    note: z.string().max(40).optional(),
  }),
});

export const collections = { journal, pages };
