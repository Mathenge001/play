# PartyPlay v1.1 Platform

**One screen. Any crowd. Any kind of game.**

This build replaces the old page-per-deck architecture with a shared PartyPlay engine. It is local-first and does **not** use Supabase or a permanent database.

## What works in this build

- Proper player roster with **multiple players**.
- **Teams** with editable team names, multiple members, add/remove and shuffle.
- Device-aware setup: player-device count, one shared device / one per team / one per player / mixed, TV availability, camera permission and internet availability.
- Automatic game filtering based on the room's capabilities.
- Quick Play, Host Party, Join Game and Play & Learn entry paths.
- Timers: untimed, relaxed, timed and chaos/speed.
- Local scoring, turn rotation, adjustable scores, leaderboards, winner and rematch.
- **Virtual point wagering**: off / final round / special rounds / full risk mode, with 25%, 50% or 100% confidence wagers. Correct wagers boost the round; wrong wagers deduct only the risk portion and scores never fall below zero.
- Optional host-defined **winner prize / award text** plus end-game recognition awards such as Most Correct, Fastest Answer, Biggest Risk Taker and Puzzle Mind.
- Party Director deck mixing so long sessions alternate quiz / puzzle / visual / task / social / music styles.
- Structured content packs: Party, Kenya, Brainrot, History, Natural Geography, Science, Task Arena and Play & Learn.
- Kenyan Cocktail content across history, geography, food, culture, wildlife, Sheng and landmarks.
- Puzzle Lab: word scrambles, number sequences, ciphers, timeline ordering, geography ordering and logic.
- Visual Discovery rounds for places and monuments, including Nairobi/Kenya examples and world landmarks.
- Task Arena with safe physical challenges and optional **photo proof**. Local photos remain in memory for the current session and are not uploaded.
- Music rounds that do **not** bundle commercial MP3s: use a local audio file or open Spotify, YouTube Music, YouTube or Audius search.
- Play & Learn with level selection and maths/science/geography questions.
- TV mode: fullscreen local presentation; live rooms can open a dedicated `display.html` screen.
- Custom Party Pack JSON import + downloadable template.
- PWA/service worker for the local app shell.
- Clean, wordmark-first startup splash. The rejected neon/cartoon and generic play-triangle logo concepts are intentionally **not** bundled; the final brand mark can be swapped later without changing the game engine.
- Legacy 345+ trivia / 145+ challenge / flag decks retained under `/classic`.

## PartyPlay Live (multi-device)

PartyPlay Live uses one tiny, **zero-dependency** in-memory WebSocket server built with Node.js. There are no user accounts and no database.

Temporary room state includes only things needed for the current game: room code, connected players, team membership, current round, responses and scores. Rooms expire from server memory.

### Run locally / on the same Wi-Fi

```bash
npm start
```

Open `http://localhost:8787` on the host laptop. For phones on the same Wi-Fi, use the laptop's LAN IP, for example:

```text
http://192.168.1.20:8787
```

Windows can show the address with `ipconfig` (look for the Wi-Fi IPv4 address). Allow Node through Windows Firewall if prompted.

Host flow:

1. **Host a Party**.
2. Set individuals/teams and the device setup.
3. Choose **PartyPlay Live**.
4. PartyPlay creates a five-character room code.
5. Players open `/join.html`, enter the code and their name, and join.
6. For a TV/projector, open the display from the host's TV button or navigate to `/display.html?room=CODE`.

Speed rounds use server receipt time so response timing does not depend on the player phone's clock. Live players can also lock a virtual confidence wager from their own controller before submitting an eligible answer.

### Deploying Live mode

Deploy this repository on a Node host that supports WebSocket upgrades and runs:

```bash
npm start
```

If the static frontend and realtime server are separated, set this before loading the frontend:

```js
window.PARTYPLAY_LIVE_URL = "wss://your-live-server.example/live";
```

A purely static deployment still supports Quick Play/local PartyPlay, but Live rooms need the included realtime server somewhere.

## Build

```bash
npm run build
```

The production static output is written to `dist/`.

## Tests

```bash
npm test
npm run test:live
```

`npm test` checks JavaScript syntax and verifies the content library contains the expected engines/packs. `npm run test:live` launches a temporary server, creates a room, joins a simulated player, starts a round and submits a response.

## Content packs

A custom pack can be imported from the setup screen. Minimal example:

```json
{
  "name": "My Party Pack",
  "rounds": [
    {
      "id": "friends-1",
      "engine": "quiz",
      "category": "Friends",
      "difficulty": "easy",
      "prompt": "Who is most likely to arrive late?",
      "answer": "Host decides",
      "options": ["Lorna", "Miriam", "Jay", "Brian"],
      "points": 1,
      "seconds": 20
    }
  ]
}
```

Supported engines in v1: `quiz`, `puzzle`, `task`, `social`, `visual`, `music`, `learn`.

## Privacy / safety decisions

- No required accounts.
- No Supabase/database.
- Local settings/sessions use browser storage.
- Local challenge photos are in-memory only and can be deleted from the evidence gallery.
- Live photo submissions are resized in the browser, relayed to the host through the temporary room and are not written to disk by the included server.
- Camera tasks are off unless the host enables them; Play & Learn defaults them off.
- The bundled Task Arena uses low-risk, non-destructive prompts; hosts should skip any task that does not fit their environment.

## Music

The repository intentionally does not ship copyrighted commercial recordings. Music rounds support:

- local audio chosen by the host at play time;
- Spotify search/open;
- YouTube Music search/open;
- YouTube search/open;
- Audius search/open.

This keeps the app light and avoids making a public repository depend on unlicensed MP3 copies.

## Visual sources

See `ATTRIBUTIONS.md`. The current Visual Discovery sample uses remote Wikimedia Commons imagery to keep the package small. Offline visual rounds gracefully fall back when an image is unavailable.

## Wagering / awards boundary

PartyPlay wagering is intentionally limited to **virtual game points**. The app does not accept deposits, sell betting chips, hold a cash pot, settle real-money bets, or distribute money. Hosts may optionally type a prize/award description for the winner (for example a trophy or dinner), but fulfillment happens outside PartyPlay. Play & Learn disables wagering.
