# Responsive & Mobile Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the game fully responsive and touch-compatible, using a tab-bar layout on mobile (<1024px) and the existing 3-column layout on desktop.

**Architecture:** The HUD is restructured into two logical row-groups that collapse into two stacked rows on mobile. The 3-column play area becomes a tab-switched single-panel layout on mobile with a pinned bottom tab bar. The canvas uses a dynamic size ref (read from CSS-rendered width at mount) so normalization works correctly at any size. Touch events are added to Canvas.js via React synthetic events + `touch-action: none` CSS.

**Tech Stack:** React, CSS Modules, socket.io-client (no new deps)

---

## Key Architecture Notes

- **Canvas sizing:** `canv.clientWidth` is read after mount (CSS is applied by then). `canv.width = canv.height = clientWidth`. All normalization uses a `canvasSizeRef` instead of the hardcoded `CANVAS_SIZE = 500`. Same approach in RecCanvas.
- **Touch coords:** Extracted as `touch.clientX - rect.left` / `touch.clientY - rect.top` where `rect = canvasRef.current.getBoundingClientRect()`. CSS `touch-action: none` prevents scroll interference without needing `e.preventDefault()`.
- **Mobile layout breakpoint:** `1024px`. Below this, tab bar appears, only active panel is visible.
- **HUD refactor:** Wrap HUD children into `hudRow1` (round + word + score + mute) and `hudRow2` (clocks + pass). On desktop, both rows use `display: contents` so children are direct flex children of `hud`. On mobile they become real rows.

---

### Task 1: Dynamic canvas size in Canvas.js + touch events

**Files:**
- Modify: `client/src/components/Canvas/Canvas.js`

**What to change:**

Remove the module-level `const CANVAS_SIZE = 500`. Add `const canvasSizeRef = React.useRef(500)` inside the component.

In the init `useEffect` (the one with `[ctx]` dep), replace:
```js
canv.width = 500;
canv.height = 500;
```
with:
```js
const size = canv.clientWidth > 0 ? canv.clientWidth : 500;
canv.width = size;
canv.height = size;
canvasSizeRef.current = size;
```

Replace all `CANVAS_SIZE` references with `canvasSizeRef.current`:
- In `takeClear` handler: `ctx.clearRect(0, 0, canvasSizeRef.current, canvasSizeRef.current)`
- In `handleMouseDown` normalizedDot: divide by `canvasSizeRef.current`
- In `handleMouseMove` normalizedPack: divide by `canvasSizeRef.current`

Remove the inline `height: '500px', width: '500px'` from the canvas JSX style. Keep only `cursor: cursorstyle`.

Add touch coordinate helper inside component:
```js
const getTouchPos = (e) => {
  const rect = canvasRef.current.getBoundingClientRect()
  const touch = e.touches[0] || e.changedTouches[0]
  return {
    x: Math.round(touch.clientX - rect.left),
    y: Math.round(touch.clientY - rect.top)
  }
}
```

Add touch handlers:
```js
function handleTouchStart(e) {
  if (frozen) return
  const { x, y } = getTouchPos(e)
  setDrawing(true)
  setPosition({ x, y })
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, thickness / 2, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
  const size = canvasSizeRef.current
  const normalizedDot = { centerx: x / size, centery: y / size, color, thickness: thickness / size }
  strokeHistory.current.push({ type: 'dot', ...normalizedDot })
  socket.emit('sendDot', { payload: normalizedDot })
}

const handleTouchMove = (e) => {
  const { x, y } = getTouchPos(e)
  if (drawing) {
    ctx.strokeStyle = color
    ctx.lineWidth = thickness
    ctx.beginPath()
    ctx.moveTo(position.x, position.y)
    ctx.lineTo(x, y)
    ctx.stroke()
    const size = canvasSizeRef.current
    const normalizedPack = {
      oldx: position.x / size, oldy: position.y / size,
      newx: x / size, newy: y / size,
      color, thickness: thickness / size
    }
    strokeHistory.current.push({ type: 'line', ...normalizedPack })
    socket.emit('sendPack', { payload: normalizedPack })
  }
  setPosition({ x, y })
}

function handleTouchEnd() { setDrawing(false) }
```

Add throttled touch move:
```js
const throttledHandleTouchMove = throttled(50, handleTouchMove)
```

Add to canvas JSX:
```jsx
onTouchStart={handleTouchStart}
onTouchMove={throttledHandleTouchMove}
onTouchEnd={handleTouchEnd}
onTouchCancel={handleTouchEnd}
```

**Step 1:** Make all the above changes to Canvas.js.
**Step 2:** Verify no JS errors (check browser console or build warnings).

---

### Task 2: Canvas.module.css — responsive sizing

**Files:**
- Modify: `client/src/components/Canvas/Canvas.module.css`

**What to change:**

`.boardContainer`:
```css
.boardContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
}
```

`.canvasEl`:
```css
.canvasEl {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px 6px 0 0;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.5);
  background: #fff;
  touch-action: none;
}
```

`.controlContainer`:
```css
.controlContainer {
  width: 100%;
  background: #161b22;
  border: 2px solid rgba(255,255,255,0.08);
  border-top: none;
  border-radius: 0 0 6px 6px;
}
```

**Step 1:** Apply the above CSS changes.

---

### Task 3: Controls.module.css — remove fixed width

**Files:**
- Modify: `client/src/components/Controls/Controls.module.css`

**What to change:**

Change `.controlWrapper` width from `500px` to `100%`:
```css
.controlWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  width: 100%;
}
```

**Step 1:** Apply the change.

---

### Task 4: Dynamic canvas size in RecCanvas.js

**Files:**
- Modify: `client/src/components/RecCanvas/RecCanvas.js`

**What to change:**

Remove `const CANVAS_SIZE = 500` from module level. Add `const canvasSizeRef = React.useRef(500)` inside the component.

In the init `useEffect` (with `[ctx]` dep):
```js
const size = canv.clientWidth > 0 ? canv.clientWidth : 500;
canv.width = size;
canv.height = size;
canvasSizeRef.current = size;
```

In `handlePack`, replace `CANVAS_SIZE` with `canvasSizeRef.current`:
```js
const handlePack = (payload) => {
  const size = canvasSizeRef.current
  const oldx = payload.oldx * size
  const oldy = payload.oldy * size
  const newx = payload.newx * size
  const newy = payload.newy * size
  const thickness = payload.thickness * size
  ctx.strokeStyle = payload.color
  ctx.lineWidth = thickness
  ctx.beginPath()
  ctx.moveTo(oldx, oldy)
  ctx.lineTo(newx, newy)
  ctx.stroke()
  strokeHistory.current.push({ type: 'line', ...payload })
}
```

In `handleDot`:
```js
const handleDot = (payload) => {
  const size = canvasSizeRef.current
  const centerx = payload.centerx * size
  const centery = payload.centery * size
  const thickness = payload.thickness * size
  ctx.fillStyle = payload.color
  ctx.beginPath()
  ctx.arc(centerx, centery, thickness / 2, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
  strokeHistory.current.push({ type: 'dot', ...payload })
}
```

In `takeClear`:
```js
ctx.clearRect(0, 0, canvasSizeRef.current, canvasSizeRef.current)
```

In `fadeCanvas`:
```js
ctx.fillRect(0, 0, canvasSizeRef.current, canvasSizeRef.current)
```

Remove the inline `style={{ height: '500px', width: '500px' }}` from the canvas JSX.

Also fix the hardcoded `500` values in `correctSign` and `passSign` to use `canvasSizeRef.current` (the fillRect/fillText coordinates). Since these draw a fixed overlay, keep them at 500 or scale them — keep at 500 for simplicity since they're UI overlays.

**Step 1:** Apply all changes to RecCanvas.js.

---

### Task 5: RecCanvas.module.css — responsive sizing

**Files:**
- Modify: `client/src/components/RecCanvas/RecCanvas.module.css`

**What to change:**

```css
.boardContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.5);
}

.canvasEl {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  background: #fff;
  touch-action: none;
}

.peepContainer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
```

**Step 1:** Apply the above CSS changes.

---

### Task 6: GameRoom.js — mobile HUD restructure + tab bar

**Files:**
- Modify: `client/src/layouts/GameRoom/GameRoom.js`

**What to change:**

Add `activeTab` state at the top of the component:
```js
const [activeTab, setActiveTab] = useState('canvas')
```

Restructure the HUD from a flat row to two logical row groups. Replace the current HUD contents with:

```jsx
<div className={classes.hud}>
  <div className={classes.hudRow1}>
    <div className={classes.roundBadge}>
      <span className={classes.roundLabel}>ROUND</span>
      <span className={classes.roundNum}>{props.round}<span className={classes.roundTotal}>/{props.numRounds}</span></span>
    </div>
    <div className={classes.hudDivider}/>
    <div className={classes.wordboxContainer}>
      <WordBox word={word} isDrawing={props.isDrawing} showRight={showRight}/>
    </div>
    <div className={classes.hudDivider}/>
    <div className={classes.scorecardContainer}>
      <ScoreCard
        setRedPoints={props.setRedPoints}
        setBluePoints={props.setBluePoints}
        redPoints={props.redPoints}
        bluePoints={props.bluePoints}/>
    </div>
    <button className={classes.muteButton} onClick={toggleMute} aria-label="Toggle mute">
      {props.onmute ? '🔇' : '🔊'}
    </button>
  </div>
  <div className={classes.hudRow2}>
    <div className={classes.roundclockContainer}>
      <RoundClock maxTime={props.roundTime}/>
    </div>
    <div className={classes.hudDivider}/>
    <div className={classes.bonusclockContainer}>
      <BonusClock maxTime={props.bonusTime}/>
    </div>
    <div className={classes.hudDivider}/>
    <div className={classes.passbuttonContainer}>
      <PassButton isDrawing={props.isDrawing}/>
    </div>
  </div>
</div>
```

Update the play area to pass activeTab classes to panels:
```jsx
<div className={classes.playArea}>
  <div className={`${classes.chatPanel} ${activeTab === 'chat' ? classes.tabVisible : classes.tabHidden}`}>
    <MessageHolder />
    <MessageInput isDrawing={props.isDrawing}/>
  </div>
  <div className={`${classes.canvasPanel} ${activeTab === 'canvas' ? classes.tabVisible : classes.tabHidden}`}>
    <CanvasRoom isDrawing={props.isDrawing} word={word}/>
  </div>
  <div className={`${classes.sidePanel} ${activeTab === 'team' ? classes.tabVisible : classes.tabHidden}`}>
    <PlayerTags
      teamTags={props.teamTags}
      oppTags={props.oppTags}
      teamColor={props.teamColor}
      oppColor={props.oppColor}/>
    <AttackZone maxTime={props.attackTime} />
  </div>
</div>
```

Add tab bar after the play area (inside gameContainer):
```jsx
<nav className={classes.tabBar}>
  <button
    className={`${classes.tab} ${activeTab === 'canvas' ? classes.tabActive : ''}`}
    onClick={() => setActiveTab('canvas')}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
    <span>Canvas</span>
  </button>
  <button
    className={`${classes.tab} ${activeTab === 'chat' ? classes.tabActive : ''}`}
    onClick={() => setActiveTab('chat')}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span>Chat</span>
  </button>
  <button
    className={`${classes.tab} ${activeTab === 'team' ? classes.tabActive : ''}`}
    onClick={() => setActiveTab('team')}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
    <span>Team</span>
  </button>
</nav>
```

**Step 1:** Apply all the above JSX changes to GameRoom.js.

---

### Task 7: GameRoom.module.css — full responsive overhaul

**Files:**
- Modify: `client/src/layouts/GameRoom/GameRoom.module.css`

**Replace the entire file with:**

```css
.gameContainer {
  --bg: #0d1117;
  --surface: #161b22;
  --surface2: #1c2128;
  --border: rgba(255,255,255,0.08);
  --teal: #27b6d8;
  --red: #ff3b2d;
  --blue: #2df1ff;
  --gold: #ffd700;
  --text: #e6edf3;
  --muted: #7d8590;
  --tab-bar-height: 56px;

  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
}

/* ── HUD ── */
.hud {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  height: 68px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

/* On desktop, both row groups are invisible wrappers (display:contents)
   so their children are direct flex children of .hud */
.hudRow1,
.hudRow2 {
  display: contents;
}

.hudDivider {
  width: 1px;
  height: 36px;
  background: var(--border);
  flex-shrink: 0;
}

.roundBadge {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  flex-shrink: 0;
}

.roundLabel {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--muted);
}

.roundNum {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  color: var(--text);
  letter-spacing: 0.05em;
}

.roundTotal {
  font-size: 18px;
  color: var(--muted);
}

.roundclockContainer {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.bonusclockContainer {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 140px;
}

.wordboxContainer {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.passbuttonContainer {
  flex-shrink: 0;
}

.scorecardContainer {
  flex-shrink: 0;
}

.muteButton {
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  width: 36px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
  padding: 0;
}

.muteButton:hover {
  background: var(--border);
}

/* ── Play area ── */
.playArea {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.chatPanel {
  display: flex;
  flex-direction: column;
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: var(--surface);
}

.canvasPanel {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 16px;
  background: var(--bg);
  overflow-y: auto;
}

.sidePanel {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border);
  background: var(--surface);
  overflow-y: auto;
}

/* ── Tab bar (hidden on desktop) ── */
.tabBar {
  display: none;
}

/* tabVisible / tabHidden are no-ops on desktop */
.tabVisible {}
.tabHidden {}

/* ── Mobile layout (<1024px) ── */
@media (max-width: 1023px) {
  .gameContainer {
    padding-bottom: calc(var(--tab-bar-height) + env(safe-area-inset-bottom, 0px));
  }

  /* HUD: two stacked rows */
  .hud {
    height: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0;
  }

  .hudRow1,
  .hudRow2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
  }

  .hudRow1 {
    border-bottom: 1px solid var(--border);
  }

  /* Hide desktop dividers on mobile */
  .hudRow1 .hudDivider,
  .hudRow2 .hudDivider {
    display: none;
  }

  .wordboxContainer {
    flex: 1;
    min-width: 0;
  }

  .bonusclockContainer {
    width: auto;
    flex: 1;
  }

  .roundNum {
    font-size: 22px;
  }

  /* Play area: single panel, full width */
  .playArea {
    position: relative;
  }

  .chatPanel,
  .canvasPanel,
  .sidePanel {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .chatPanel {
    border-right: none;
  }

  .sidePanel {
    border-left: none;
    width: 100%;
  }

  .canvasPanel {
    padding: 12px;
    align-items: center;
    justify-content: center;
  }

  /* Panel visibility switching */
  .tabHidden {
    display: none !important;
  }

  .tabVisible {
    display: flex !important;
  }

  /* ── Tab bar ── */
  .tabBar {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--tab-bar-height);
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding-bottom: env(safe-area-inset-bottom, 0px);
    z-index: 100;
  }

  .tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 6px 0;
    border-top: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
    -webkit-tap-highlight-color: transparent;
  }

  .tab:active {
    background: var(--border);
  }

  .tabActive {
    color: var(--text);
    border-top-color: var(--teal);
  }
}
```

**Step 1:** Replace the entire GameRoom.module.css with the above.

---

### Task 8: CanvasRoom — let canvas fill panel on mobile

**Files:**
- Modify: `client/src/layouts/canvasroom/CanvasRoom.js`

**What to change:**

The `.bigboy` div needs to be a flex container that fills the panel. Change to pass width through:

```jsx
const CanvasRoom = ({isDrawing, word}) => {
  return (
    <div style={{width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column'}}>
      {isDrawing ? <Canvas word={word}/> : <RecCanvas word={word}/>}
    </div>
  )
}
```

(Remove the `import socket` and unused `import useState, useEffect` while here — they generate build warnings but aren't required to fix for functionality.)

**Step 1:** Update CanvasRoom.js.

---

### Task 9: Build and verify

**Step 1:** Run the build:
```bash
cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build 2>&1
```

Expected: build succeeds with only pre-existing warnings (no new errors).

**Step 2:** Serve and test on mobile viewport in browser devtools. Verify:
- Tab bar appears below 1024px, hidden above
- HUD shows two rows on mobile
- Canvas tab shows the drawing canvas, scales to fill width
- Chat tab shows message feed + input
- Team tab shows player tags + attack cards
- Touch drawing works on canvas (draw with finger)
- Desktop 3-column layout is unchanged

---

**Plan complete and saved to `docs/plans/2026-04-07-responsive-mobile.md`.**

Two execution options:

**1. Subagent-Driven (this session)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Parallel Session (separate)** — Open a new session with executing-plans in the worktree, batch execution with checkpoints.

Which approach?
