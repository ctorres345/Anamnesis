import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { describe, expect, it } from 'vitest';
import remarkWikilinks from './remark-wikilinks.mjs';

const root = path.resolve('src/content/journal');

function run(md: string, file = '/repo/src/content/journal/en/test.md') {
  const processor = unified().use(remarkParse).use(remarkWikilinks, { root });
  const tree = processor.parse(md);
  processor.runSync(tree, { path: file } as never);
  return JSON.stringify(tree);
}

describe('remarkWikilinks', () => {
  it('links to a post in the same language', () => {
    const out = run('See [[yuyay]].');
    expect(out).toContain('"url":"/en/journal/yuyay/"');
    expect(out).toContain('"value":"yuyay"');
  });

  it('uses the alias and heading anchor', () => {
    const out = run('See [[yuyay#Open tests|my project]].');
    expect(out).toContain('"url":"/en/journal/yuyay/#open-tests"');
    expect(out).toContain('"value":"my project"');
  });

  it('links across languages', () => {
    expect(run('[[es/yuyay]]')).toContain('"url":"/es/journal/yuyay/"');
  });

  it('turns image embeds into images from assets/', () => {
    const out = run('![[Pasted image 1.png|A cat]]');
    expect(out).toContain('"type":"image"');
    expect(out).toContain('"url":"assets/Pasted%20image%201.png"');
    expect(out).toContain('"alt":"A cat"');
  });

  it('stops the build on a broken link', () => {
    expect(() => run('[[does-not-exist]]')).toThrow(/Broken link \[\[does-not-exist\]\]/);
  });

  it('leaves notes outside es/ and en/ alone', () => {
    expect(run('[[anything]]', '/repo/src/content/journal/_guide/x.md')).toContain('[[anything]]');
  });
});
