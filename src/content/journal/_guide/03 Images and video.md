# 03 · Images and video

## Images
1. Copy an image, then **paste it into the note** (`Cmd + V`), or drag the file in.
2. Obsidian saves it in `assets/` next to the post and writes:
   `![](assets/Pasted%20image%2020261102.png)`
3. **Add a description** inside the brackets (for screen readers and search):
   `![The first boss fight](assets/Pasted%20image%2020261102.png)`

What the site does for you:
- Converts the image to a smaller format (WebP) and loads it only when it scrolls into view.
- If the image file is missing, the publish **stops** with a message saying which image. Nothing broken goes live.

Tips:
- Screenshots and photos: PNG or JPG are fine. Try to keep each under ~3 MB.
- Spaces in file names work, but short names are easier: `boss-fight.png`.
- Images for a Spanish post go in `es/assets/`, for an English post in `en/assets/`. If both versions use the same image, paste it in both.

## Image with a caption
```html
<figure>
  <img src="..." alt="..." />
  <figcaption>Caption text</figcaption>
</figure>
```
Simpler: put the caption as a normal line in *italics* right below the image.

## YouTube video
Paste this where the video should go and replace `VIDEO_ID` (the part after `v=` in the YouTube link):
```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="Video title" loading="lazy" allowfullscreen></iframe>
```
- Use **youtube-nocookie.com** (other video sites are blocked for privacy).
- It shows full width and 16:9 automatically.

## Other files
- Don't put videos (MP4) or big files in the vault: they make the repo heavy. Upload videos to YouTube and embed them.
- GIFs work like images.

## Wikilink embeds
`![[image.png]]` does **not** work yet. Keep Wikilinks off (see [01 One-time setup](01%20One-time%20setup.md)).
