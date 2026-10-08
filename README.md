# Omniverse

A living, isometric **Ben 10 fan universe**, inspired by the explorability and repeating character actions of [Floor796](https://floor796.com/).

The project is a dependency-free static website. It runs entirely in the browser, uses locally drawn Canvas artwork, and needs no API keys, database, image CDN, or server runtime.

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

This source package does not create or deploy a Vercel project.

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

Stage-show, creator-concept, non-canon-game, and named-but-unseen entries are separately labelled. Their miniatures are schematic interpretations. Comic appearances are reference-linked; newly published comic continuities are not automatically merged into the original TV timeline. The supplemental Spitter comic archive entry points to the same alien rather than implying a separate species.

## Artwork and implementation

All scenery and character miniatures are original simplified code-drawn fan art, using shared shape and animation rigs. They are not official screenshots or individually hand-animated show-accurate sprite sheets. Each resident repeats a pose/effect cycle; the displayed action describes its scene vignette. The implementation is designed so future custom sprite sheets or richer per-character animation clips can replace these rigs.

`src/data.js` owns catalogue records, device compatibility, source links, and fusion/evolution lookup. `src/sprites.js` renders vector miniatures and thumbnails. `src/world.js` owns isometric scenery, cached district backgrounds, camera gestures, hit testing, and animation. `src/app.js` connects UI, discovery storage, and transformation interactions.

To add a resident, extend a catalogue table with a unique name, species, colour, shape, source, and action. Add new drawing rigs in `drawSprite` when the existing shapes are insufficient. Keep hypothetical material labelled and run the catalogue tests.

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

The included Node tests cover catalogue integrity, era playlists, Ultimate availability, predator isolation, fusion lookup, and district references. JavaScript syntax checks and the production build run without third-party dependencies. During creation, an additional headless DOM/Canvas smoke check exercised application startup, device switching, Ultimate evolution, Atomic-X fusion, predator transformation, search and inspection, supplemental playlists, and source notes. Scene and sprite renders were inspected separately. Full browser visual QA and physical device testing have not been performed and remain recommended before public release.
