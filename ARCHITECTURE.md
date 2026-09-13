# PartyPlay architecture

PartyPlay is organised around reusable game engines rather than page-specific decks.

## Session layer

- players / teams
- device capabilities
- timer mode
- scoring
- virtual risk / wager rules
- host-defined award labels
- round rotation
- Party Director
- local persistence
- temporary Live room state

## Engines

1. **Quiz** — multiple choice and typed knowledge rounds.
2. **Puzzle** — ordering, scramble, logic and cipher mechanics.
3. **Task** — host-judged real-world challenges and photo proof.
4. **Social** — voting / group-decision rounds.
5. **Visual** — identify place, monument, city or event from an image.
6. **Music** — local host audio + provider handoff.
7. **Learn** — child/learning rounds with explanations and level metadata.

The next engines can be added without changing session setup: secret roles, distributed-clue co-op, buzzer-only rounds and richer drawing canvases.

## Capability filtering

Every round may declare requirements:

```js
requires: {
  minDevices: 1,
  personal: false,
  camera: false,
  tv: false,
  online: false
}
```

Setup captures the actual room capabilities before the deck is generated. Incompatible rounds never enter the session deck.

## Live room model

`server/live-server.mjs` maintains a `Map` of temporary rooms in memory. It does not persist profiles, answers or photos to a database. WebSocket roles are host, player, display and (server-supported) audience.

Core events:

- `create-room`
- `room-info-request`
- `join-room`
- `room-state`
- `round-start` (including eligible wager choices)
- `answer` (including locked virtual wager percentage)
- `answer-received`
- `photo-submit`
- `round-result`
- `game-finished`

Response timing is stamped by the realtime server, not trusted from client clocks.

## Risk system

Wagers are session mechanics rather than a separate engine. `wager.mode` controls eligibility (`off`, `final`, `special`, `full`) and `wager.max` caps the allowed percentage. Eligible live controllers receive wager choices with the round. The host validates the wager against its own session rules before score calculation. No monetary value is represented or stored.
