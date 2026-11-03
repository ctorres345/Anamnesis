/**
 * Soft organic blob as an SVG path (like haikei.app blobs, generated in code).
 * Same seed = same shape, so the page looks the same on every build.
 */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Closed smooth path centered in a 200x200 box. `wobble` 0..1 = how uneven the edge is. */
export function blobPath(seed: number, points = 7, wobble = 0.28): string {
  const r = rng(seed);
  const cx = 100;
  const cy = 100;
  const base = 78;
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const rad = base * (1 - wobble / 2 + r() * wobble);
    pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]);
  }
  // Catmull-Rom spline through the points, as cubic Béziers.
  const p = (i: number) => pts[(i + points) % points];
  let d = `M${p(0)[0].toFixed(1)},${p(0)[1].toFixed(1)}`;
  for (let i = 0; i < points; i++) {
    const [p0, p1, p2, p3] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}
