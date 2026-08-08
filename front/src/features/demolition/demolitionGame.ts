import { FRAMES, SPRITE_HEIGHT, SPRITE_WIDTH, frameToSvg } from "./heroSprite";
import type { FrameName } from "./heroSprite";

const SCALE = 3;
const HERO_W = SPRITE_WIDTH * SCALE;
const HERO_H = SPRITE_HEIGHT * SCALE;

const GRAVITY = 2600; // px/s²
const MOVE_SPEED = 340; // px/s
const JUMP_SPEED = 950; // px/s
const MAX_FALL_SPEED = 1800; // px/s
const CUT_JUMP_SPEED = 260; // upward speed kept when the jump key is released
const HEAD_BOUNCE = 80; // downward push after breaking a brick with the hat
const SMASH_BOUNCE = 420; // upward push after smashing the brick underneath
const COYOTE_TIME = 0.1; // s of grace to still jump after leaving a platform
const RUN_FRAME_TIME = 0.09; // s per running frame
const EDGE_TOLERANCE = 6; // px of overlap needed to stand on a brick
const BREAK_DURATION = 320; // ms of the brick break animation

const MIN_BRICK_WIDTH = 24;
const MIN_BRICK_HEIGHT = 8;

const BRICK_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,img,svg,button,a,li,label,input,textarea,hr,blockquote";

const PARTICLE_COLORS = ["#C21F22", "#394149", "#A8794C", "#F3F2F2"];

export type DemolitionLabels = {
  jump: string;
  smash: string;
  quit: string;
};

type BrickElement = HTMLElement | SVGElement;

type Brick = {
  el: BrickElement;
  left: number;
  top: number;
  right: number;
  bottom: number;
  alive: boolean;
  previousDisplay: string;
};

const STYLE_ID = "demolition-style";

const CSS = `
.demolition-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  overflow: hidden;
  cursor: crosshair;
}
.demolition-hero {
  position: absolute;
  top: 0;
  left: 0;
  width: ${HERO_W}px;
  height: ${HERO_H}px;
  will-change: transform;
  filter: drop-shadow(0 2px 0 rgba(57, 65, 73, 0.25));
}
.demolition-hero svg {
  display: block;
  width: 100%;
  height: 100%;
}
.demolition-hud {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(57, 65, 73, 0.92);
  color: #F3F2F2;
  font-family: "Overpass", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  white-space: nowrap;
  animation: demolition-hud-in 0.4s ease-out both;
}
.demolition-hud b {
  color: #C21F22;
  font-variant-numeric: tabular-nums;
}
.demolition-hud span {
  opacity: 0.75;
}
.demolition-particle {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform, opacity;
  animation: demolition-burst 0.7s cubic-bezier(0.2, 0.7, 0.4, 1) forwards;
}
@keyframes demolition-burst {
  from { transform: translate3d(var(--from-x), var(--from-y), 0) rotate(0deg); opacity: 1; }
  to { transform: translate3d(var(--to-x), var(--to-y), 0) rotate(var(--spin)); opacity: 0; }
}
@keyframes demolition-hud-in {
  from { transform: translate(-50%, 20px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}
.demolition-broken {
  animation: demolition-break ${BREAK_DURATION}ms ease-in forwards;
}
@keyframes demolition-break {
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-1deg); }
  100% { transform: translateY(22px) rotate(3deg) scale(0.9); opacity: 0; }
}
`;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function collectBricks(): Brick[] {
  const bricks: Brick[] = [];
  const { scrollX, scrollY } = window;

  document.querySelectorAll<HTMLElement>(BRICK_SELECTOR).forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < MIN_BRICK_WIDTH || rect.height < MIN_BRICK_HEIGHT) return;

    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.opacity === "0") return;

    // Elements are walked in document order, so an ancestor already picked as a
    // brick means this one is only a part of it.
    if (bricks.some((brick) => brick.el.contains(el))) return;

    bricks.push({
      el,
      left: rect.left + scrollX,
      top: rect.top + scrollY,
      right: rect.right + scrollX,
      bottom: rect.bottom + scrollY,
      alive: true,
      previousDisplay: el.style.display,
    });
  });

  return bricks;
}

function refreshBricks(bricks: Brick[]) {
  const { scrollX, scrollY } = window;

  bricks.forEach((brick) => {
    if (!brick.alive) return;
    const rect = brick.el.getBoundingClientRect();
    brick.left = rect.left + scrollX;
    brick.top = rect.top + scrollY;
    brick.right = rect.right + scrollX;
    brick.bottom = rect.bottom + scrollY;
  });
}

/**
 * Starts the demolition game. Returns a function that stops it and puts every
 * broken piece of the page back where it was.
 */
export function startDemolition(
  labels: DemolitionLabels,
  onExit: () => void
): () => void {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);

  const bricks = collectBricks();

  const overlay = document.createElement("div");
  overlay.className = "demolition-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const heroEl = document.createElement("div");
  heroEl.className = "demolition-hero";

  const sprites = {} as Record<FrameName, HTMLDivElement>;
  (Object.keys(FRAMES) as FrameName[]).forEach((name) => {
    const sprite = document.createElement("div");
    sprite.innerHTML = frameToSvg(FRAMES[name]);
    sprite.style.display = "none";
    heroEl.appendChild(sprite);
    sprites[name] = sprite;
  });

  const hud = document.createElement("div");
  hud.className = "demolition-hud";
  ["← →", `↑ ${labels.jump}`, `↓ ${labels.smash}`, `ESC ${labels.quit}`].forEach(
    (text) => {
      const hint = document.createElement("span");
      hint.textContent = text;
      hud.appendChild(hint);
    }
  );
  const score = document.createElement("b");
  hud.appendChild(score);

  overlay.append(heroEl, hud);
  document.body.appendChild(overlay);

  const previousUserSelect = document.body.style.userSelect;
  document.body.style.userSelect = "none";

  const hero = {
    x: window.scrollX + window.innerWidth / 2 - HERO_W / 2,
    y: window.scrollY - HERO_H,
    vy: 0,
    facing: 1,
    grounded: false,
    coyote: 0,
    runTimer: 0,
    runFrame: false,
  };

  const keys = { left: false, right: false, down: false };
  const timeouts = new Set<number>();
  let destroyed = 0;
  let currentFrame: FrameName | null = null;
  let running = true;
  let rafId = 0;

  const updateScore = () => {
    score.textContent = `${destroyed}/${bricks.length}`;
  };

  const spawnParticles = (brick: Brick) => {
    const width = brick.right - brick.left;
    const height = brick.bottom - brick.top;
    const count = clamp(Math.round((width * height) / 2600), 6, 20);

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.className = "demolition-particle";

      const size = 4 + Math.round(Math.random() * 5);
      const fromX = brick.left - window.scrollX + Math.random() * width;
      const fromY = brick.top - window.scrollY + Math.random() * height;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      particle.style.setProperty("--from-x", `${fromX}px`);
      particle.style.setProperty("--from-y", `${fromY}px`);
      particle.style.setProperty("--to-x", `${fromX + (Math.random() - 0.5) * 220}px`);
      particle.style.setProperty("--to-y", `${fromY + 120 + Math.random() * 160}px`);
      particle.style.setProperty("--spin", `${(Math.random() - 0.5) * 720}deg`);

      particle.addEventListener("animationend", () => particle.remove());
      overlay.appendChild(particle);
    }
  };

  const breakBrick = (brick: Brick) => {
    if (!brick.alive) return;
    brick.alive = false;
    destroyed += 1;
    updateScore();
    spawnParticles(brick);

    // Inline elements ignore transforms, and keeping the broken element in the
    // flow (hidden, not removed) means the rest of the page never reflows.
    if (getComputedStyle(brick.el).display === "inline") {
      brick.el.style.display = "inline-block";
    }
    brick.el.classList.add("demolition-broken");

    const timeout = window.setTimeout(() => {
      timeouts.delete(timeout);
      brick.el.classList.remove("demolition-broken");
      brick.el.style.visibility = "hidden";
    }, BREAK_DURATION);
    timeouts.add(timeout);
  };

  const jump = () => {
    if (!hero.grounded && hero.coyote <= 0) return;
    hero.vy = -JUMP_SPEED;
    hero.grounded = false;
    hero.coyote = 0;
  };

  const overlaps = (brick: Brick) =>
    hero.x + HERO_W > brick.left + EDGE_TOLERANCE &&
    hero.x < brick.right - EDGE_TOLERANCE;

  const update = (dt: number) => {
    const direction = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    if (direction !== 0) hero.facing = direction;

    const pageWidth = document.documentElement.scrollWidth;
    hero.x = clamp(hero.x + direction * MOVE_SPEED * dt, 0, pageWidth - HERO_W);

    hero.vy = Math.min(hero.vy + GRAVITY * dt, MAX_FALL_SPEED);
    const previousY = hero.y;
    hero.y += hero.vy * dt;

    const wasGrounded = hero.grounded;
    hero.grounded = false;

    if (hero.vy > 0) {
      let landing: Brick | null = null;

      for (const brick of bricks) {
        if (!brick.alive || !overlaps(brick)) continue;
        // One-way platforms: only catch the hero coming from above.
        if (previousY + HERO_H > brick.top) continue;
        if (hero.y + HERO_H < brick.top) continue;
        if (!landing || brick.top < landing.top) landing = brick;
      }

      if (landing) {
        if (keys.down) {
          // Ground pound: one brick per landing, then bounce back up.
          breakBrick(landing);
          hero.y = landing.top - HERO_H;
          hero.vy = -SMASH_BOUNCE;
        } else {
          hero.y = landing.top - HERO_H;
          hero.vy = 0;
          hero.grounded = true;
        }
      }

      const floor = document.documentElement.scrollHeight;
      if (hero.y + HERO_H >= floor) {
        hero.y = floor - HERO_H;
        hero.vy = 0;
        hero.grounded = true;
      }
    } else if (hero.vy < 0) {
      // Head bump: everything the hat hits goes down.
      for (const brick of bricks) {
        if (!brick.alive || !overlaps(brick)) continue;
        if (previousY < brick.bottom || hero.y > brick.bottom) continue;
        breakBrick(brick);
        hero.vy = HEAD_BOUNCE;
      }
    }

    hero.coyote = hero.grounded
      ? COYOTE_TIME
      : Math.max(hero.coyote - dt, wasGrounded ? COYOTE_TIME : 0);

    hero.runTimer += dt;
    if (hero.runTimer >= RUN_FRAME_TIME) {
      hero.runTimer = 0;
      hero.runFrame = !hero.runFrame;
    }

    let frame: FrameName = "IDLE";
    if (!hero.grounded) frame = "JUMP";
    else if (direction !== 0) frame = hero.runFrame ? "RUN_A" : "RUN_B";

    if (frame !== currentFrame) {
      if (currentFrame) sprites[currentFrame].style.display = "none";
      sprites[frame].style.display = "block";
      currentFrame = frame;
    }
  };

  const followHero = () => {
    const viewport = window.innerHeight;
    const margin = viewport * 0.3;
    const screenY = hero.y - window.scrollY;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - viewport,
      0
    );

    let target = window.scrollY;
    if (screenY < margin) target = hero.y - margin;
    else if (screenY + HERO_H > viewport - margin) {
      target = hero.y + HERO_H - viewport + margin;
    }

    target = clamp(target, 0, maxScroll);
    if (Math.abs(target - window.scrollY) > 1) window.scrollTo(0, target);
  };

  const render = () => {
    heroEl.style.transform = `translate3d(${hero.x - window.scrollX}px, ${
      hero.y - window.scrollY
    }px, 0) scaleX(${hero.facing})`;
  };

  let lastTime = performance.now();
  const loop = (now: number) => {
    if (!running) return;
    const dt = Math.min((now - lastTime) / 1000, 1 / 30);
    lastTime = now;

    update(dt);
    followHero();
    render();

    rafId = requestAnimationFrame(loop);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        keys.left = true;
        break;
      case "ArrowRight":
        keys.right = true;
        break;
      case "ArrowDown":
        keys.down = true;
        break;
      case "ArrowUp":
      case " ":
        jump();
        break;
      case "Escape":
        stop();
        return;
      default:
        return;
    }
    event.preventDefault();
  };

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        keys.left = false;
        break;
      case "ArrowRight":
        keys.right = false;
        break;
      case "ArrowDown":
        keys.down = false;
        break;
      case "ArrowUp":
      case " ":
        // Short press, short jump.
        if (hero.vy < -CUT_JUMP_SPEED) hero.vy = -CUT_JUMP_SPEED;
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const onResize = () => refreshBricks(bricks);

  const stop = () => {
    if (!running) return;
    running = false;

    cancelAnimationFrame(rafId);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("resize", onResize);

    timeouts.forEach((timeout) => window.clearTimeout(timeout));
    timeouts.clear();

    // Rebuild the site.
    bricks.forEach((brick) => {
      brick.el.classList.remove("demolition-broken");
      brick.el.style.visibility = "";
      brick.el.style.display = brick.previousDisplay;
    });

    document.body.style.userSelect = previousUserSelect;
    overlay.remove();
    style.remove();

    onExit();
  };

  updateScore();
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);
  rafId = requestAnimationFrame(loop);

  return stop;
}
