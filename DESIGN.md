# Design notes

Why the site looks the way it does, so a later change can keep it consistent.

## Who it is for

A hiring manager or founder giving it about a minute. In that minute they need,
in this order: name, role and stack; proof of real work; a way to reach me.
So the hero carries all three, featured work comes second, and contact sits in
the hero, the closing band and the footer.

## The idea

I build the systems that watch AI agents and decide whether they did the job.
The page watches back: a pair of eyes (a nod to xeyes, the X11 toy) that follow
the pointer, blink, and smile over the hire and contact buttons. One idea,
used in two places (hero and closing band), and nowhere else.

## Colour has a job

| Token     | Job                                   |
| --------- | ------------------------------------- |
| cobalt    | action: buttons, links, focus         |
| tangerine | emphasis, one hot spot per screen     |
| sun       | numbers you read as data              |
| mint      | alive: live data, passing, available  |
| pink, lilac | chart series five and six only      |

Dark is the brand, light is a full theme with its own steps. On paper sun and
mint are too pale for text, so text uses `sun-ink` and `mint-ink` (both above
4.5:1 on white). Fills keep the bright versions.

## Type

Bricolage Grotesque for display, Geist for text, Geist Mono for labels, data
and anything that should read as a machine talking. Headlines are set line by
line on desktop; check them at 1024, 1280 and 1440 before changing their size.

## Surfaces and texture

Bento tiles with 24 to 28px radii, a blueprint grid behind the hero, a few
percent of film grain over everything. Real screenshots in browser frames, no
stock images or illustrations.

## Motion

Entrances 300 to 700ms, eased out, once. The marquee pauses on hover. The eyes
are the only thing that moves without being asked. Everything respects
`prefers-reduced-motion`: the eyes hold still, the underline is drawn, and
nothing waits to be revealed.

## Live data

The GitHub section is server rendered from cached data, refreshed in the
browser on load, and falls back piece by piece to `data/github-snapshot.json`.
The chip says whether it is live or saved. Never show a live badge on saved data.

## Before shipping a visual change

Screenshot desktop dark, desktop light and a 375px phone, scrolling with the
mouse wheel so reveals fire. Check headline line breaks, contrast of coloured
text in light mode, and that nothing overflows on the phone.
