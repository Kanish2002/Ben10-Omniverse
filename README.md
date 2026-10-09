# Omniverse

A living, isometric **Ben 10 fan universe**, inspired by the explorability and repeating character actions of [Floor796](https://floor796.com/).

The project is a dependency-free static website. It runs entirely in the browser, uses locally bundled raster sprites and Canvas animation, and needs no API keys, database, image CDN, or server runtime.

## Explore

- Twelve districts: Bellwood, the Rust Bucket campsite, Plumber headquarters, Galvan laboratory, Undertown, Anur observatory, Null Void, villain laboratory, the crossroads of time, Forge of Creation, evolution arena, and predator habitat.
- 63 base transformation entries across Classic, Alien Force, Ultimate Alien, and Omniverse, counting both Upchuck subspecies separately.
- Twelve evolved alien forms, nine known fusion entries, eleven predator forms including Ultimate Panuncian, and a labelled supplemental archive.
- Friends, villains, era avatars, and alternate wielders including Ben 23, Gwen 10, Bad Ben, Mad Ben, Nega Ben, Benzarro, Albedo, No Watch Ben, and the future Bens.
- Seventeen selectable device simulations, era playlists, Ultimate gating, and a two-sample Biomnitrix simulator.
- Character inspection, source links, search, district map, discovery tracking, optional synthesised sound, animation pause, reduced-motion support, pointer and touch controls.

## Run and build

Requires Node.js 20 or newer. There are no package dependencies to install.

```sh
npm run check
npm test
npm run build
```

Serve `dist/` with any static HTTP server. Opening `index.html` directly using `file://` will not load browser ES modules; use an HTTP server.

## Deploy on Vercel

Import this repository into Vercel. The included `vercel.json` selects:

| Setting | Value |
| --- | --- |
| Framework | Other |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variables | None |

The project is deployed at https://ben10-omniverse.vercel.app/.

## Controls

| Action | Control |
| --- | --- |
| Pan | Drag, or arrow keys |
| Zoom | Scroll, pinch, or `+` / `-` |
| Inspect | Click a character, or select in the keyboard-accessible archive |
| Transform | Transform button or Space |
| DNA archive | `A` |
| Pause | `P` |
| Fit world | `F` |

Discovery progress and selected DNA are stored locally in the browser. Device, DNA, and sector selections are encoded in the URL. No analytics or external services are used by the app.

## Catalogue policy

This is a **curated first edition**, not a claim to include every comic, incidental character, creator statement, or unseen Omnitrix sample. Each entry links to a reference page. Series introductions and actual device unlock states are different: playlists are simplified for this simulator and are described in the in-app source notes.

The expanded Classic playlist includes Arctiguana, Buzzshock, and Spitter from future-Ben appearances. Nanomech is grouped in the Alien Force era, and Shocksquatch in the Ultimate Alien / Heroes United era. Ultimate Grey Matter links to Ultimate Albedo. Albedo-only Omniverse Ultimate forms are available through his stabilizer, not Ben's Ultimate Alien playlist.

Alternate watches share curated simulator playlists. This does not imply their owners used every listed transformation on screen. The Nemetrix uses a suitable predator host instead of treating its forms as a normal human-Ben playlist. Non-screen Biomnitrix pairs are clearly marked **fan simulations**.

Stage-show, creator-concept, non-canon-game, and named-but-unseen entries are separately labelled. Entries without suitable artwork are shown as references rather than invented character bodies. Comic appearances are reference-linked; newly published comic continuities are not automatically merged into the original TV timeline. The supplemental Spitter comic archive entry points to the same alien rather than implying a separate species.

## Artwork and implementation

The generic procedural character bodies have been removed. The new assets are original AI-generated pixel-style fan interpretations, generated with the built-in imagegen tool. They are not official show or game sprites. `assets/PROMPTS.md` records the production prompts.

Twelve main characters have four-frame action clips: Classic Ben, Heatblast, Four Arms, XLR8, Gwen, Kevin, Grandpa Max, Vilgax, Doctor Animo, Rook, Azmuth and Professor Paradox. Other illustrated entries use a full-body raster sprite with ambient movement and selected power effects. This does **not** mean every supporting character has a custom task animation. Several supporting-character drafts were rejected for poor resemblance; those catalogue entries remain clearly marked reference-only. Named but unseen forms also remain reference-only.

The opening scene is a bespoke pixel-style Rust Bucket campsite with Kevin's garage, Mr. Smoothy and a Plumber workbench. Nine featured characters are placed in the scene, with names visible by default. Transformations get a large preview, and selected characters replay their animation in the detail panel. The other districts are activity bays for the wider roster.

`src/data.js` owns catalogue and device rules. `src/sprite-manifest.js` maps approved sprites to measured atlas rectangles and animation frames. `src/sprites.js` loads images, renders frame clips, adds ambient effects and creates thumbnails. `src/world.js` manages districts, camera gestures, hit testing and transformations. `src/app.js` connects the interface and discovery storage. Vercel serves the WebP assets locally; no image CDN is needed.

Keep new visual assets separate from catalogue-only records. Add a manifest entry only after checking its resemblance and crop. Existing PNG generation originals are preserved outside the repository; production atlases use WebP encoding for smaller transfers.

## References

- [Original Omnitrix](https://ben10.fandom.com/wiki/Omnitrix_%28Original%29)
- [Ultimatrix](https://ben10.fandom.com/wiki/Ultimatrix_%28Original%29)
- [Completed Omnitrix](https://ben10.fandom.com/wiki/Omnitrix_%28Omniverse%29)
- [Ultimate forms](https://ben10.fandom.com/wiki/Ultimate_Forms)
- [Biomnitrix](https://ben10.fandom.com/wiki/Biomnitrix)
- [Nemetrix](https://ben10.fandom.com/wiki/Nemetrix)
- [Characters](https://en.wikipedia.org/wiki/List_of_Ben_10_characters)
- [Floor796](https://floor796.com/)

Ben 10 names and characters belong to their respective rights holders. This is an unofficial fan experiment with no affiliation with Cartoon Network, Warner Bros., or Floor796. No official media assets are redistributed.

## Verification

Run `npm run check`, `npm test`, and `npm run build`. Tests cover device compatibility and catalogue integrity, as well as raster coverage for every base alien, Ultimate form, known fusion, predator and watch wielder; frame bounds; twelve action clips; and asset packaging. Browser checks exercise the campsite, alien transformation, Ultimate evolution, alternate Bens, pause/resume, archive search and character detail playback. Physical touch-device testing remains outstanding.
