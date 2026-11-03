# 03 · Images and video

## Images
1. Copy an image, then **paste it into the note** (`Cmd + V`), or drag the file in.
2. Obsidian saves it in `assets/` next to the post and writes:
   `![[Pasted image 20261102.png]]`
3. **Add a description** after a `|` (for screen readers and search):
   `![[Pasted image 20261102.png|The first boss fight]]`

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

## Cover image
A big image at the top of the post (and on game and project cards):
```yaml
cover: ./assets/boss-fight.png
coverAlt: The first boss fight
```
Put the image in the post's `assets/` folder first. Use a normal path here (not `[[ ]]`).

## Links to other posts
| Write | Goes to |
|---|---|
| `[[hollow-knight]]` | that post, same language |
| `[[hollow-knight\|my review]]` | same, with your own text |
| `[[hollow-knight#Ending]]` | a section of that post |
| `[[es/hollow-knight]]` | the Spanish version |

A link to a post that doesn't exist **stops the publish** and names the file, so no broken links go live.
