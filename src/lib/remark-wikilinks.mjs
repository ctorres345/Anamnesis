// @ts-check
/**
 * Obsidian-style links in posts.
 *   [[file-name]]              -> link to the post in the same language
 *   [[file-name|Shown text]]   -> same, with custom text
 *   [[file-name#Heading]]      -> link to a section
 *   [[en/file-name]]           -> link to a post in the other language
 *   ![[image.png]]             -> image from the post's assets/ folder
 *   ![[image.png|Description]] -> same, with alt text
 * A link to a post that doesn't exist stops the build, so broken links never go live.
 */
import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import { visit, SKIP } from 'unist-util-visit';

const WIKI = /(!?)\[\[([^\]|#]+)(#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;
const IMAGE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

/**
 * @param {{ root?: string }} [options] root = folder that holds es/ and en/ posts.
 */
export default function remarkWikilinks(options = {}) {
  const root = options.root ?? path.resolve('src/content/journal');

  /** @param {any} tree @param {any} file */
  return (tree, file) => {
    const filePath = String(file.path ?? file.history?.[0] ?? '');
    const lang = filePath.match(/[\\/](es|en)[\\/][^\\/]*$/)?.[1];
    if (!lang) return; // not a post (e.g. a guide note): leave text as is

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined || !node.value.includes('[[')) return;
      /** @type {any[]} */
      const out = [];
      let last = 0;
      for (const m of node.value.matchAll(WIKI)) {
        const [whole, bang, rawTarget, heading, alias] = m;
        const target = rawTarget.trim();
        if (m.index > last) out.push({ type: 'text', value: node.value.slice(last, m.index) });
        last = m.index + whole.length;

        if (bang && IMAGE.test(target)) {
          const url = target.includes('/') ? target : `assets/${target}`;
          out.push({ type: 'image', url: encodeURI(url), alt: alias?.trim() ?? '', title: null });
          continue;
        }

        const explicit = target.match(/^(es|en)\/(.+)$/);
        const linkLang = explicit ? explicit[1] : lang;
        const slug = (explicit ? explicit[2] : target).replace(/\.mdx?$/, '');
        const exists = ['.md', '.mdx'].some((ext) => fs.existsSync(path.join(root, linkLang, slug + ext)));
        if (!exists) {
          throw new Error(`Broken link [[${target}]] in ${path.basename(filePath)}: no post "${linkLang}/${slug}.md"`);
        }
        const anchor = heading ? '#' + new GithubSlugger().slug(heading.slice(1)) : '';
        out.push({
          type: 'link',
          url: `/${linkLang}/journal/${slug}/${anchor}`,
          title: null,
          children: [{ type: 'text', value: alias?.trim() ?? (heading ? heading.slice(1) : slug.replace(/-/g, ' ')) }],
        });
      }
      if (out.length === 0) return;
      if (last < node.value.length) out.push({ type: 'text', value: node.value.slice(last) });
      parent.children.splice(index, 1, ...out);
      return [SKIP, index + out.length];
    });
  };
}
