<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
    <canvas ref="bgCanvas" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
    <div
      class="relative z-10 w-full h-full flex flex-col lg:flex-row"
      style="animation: pageIn 0.8s cubic-bezier(0.16,1,0.3,1) both;"
    >
      <div class="hidden lg:flex flex-col justify-between w-1/2 h-full px-16 py-14">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="0" y="0" width="6" height="6" fill="black"/>
              <rect x="8" y="0" width="6" height="6" fill="black" fill-opacity="0.4"/>
              <rect x="0" y="8" width="6" height="6" fill="black" fill-opacity="0.4"/>
              <rect x="8" y="8" width="6" height="6" fill="black"/>
            </svg>
          </div>
          <span class="text-white text-xs font-medium tracking-[0.22em] uppercase font-mono">Veyra</span>
        </div>
        <div>
          <p class="text-zinc-600 text-xs tracking-[0.22em] uppercase mb-7 font-mono">Dashboard Access</p>
          <h2 class="text-white leading-[1.0] tracking-[-0.04em] mb-8 font-display"
              style="font-size: clamp(3rem, 4.5vw, 5rem); font-weight: 800;">
            Built for<br/>Veyra.
          </h2>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          <span class="text-zinc-600 text-xs tracking-[0.2em] uppercase font-mono">Systems Online</span>
        </div>
      </div>
      <div class="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px bg-zinc-900"></div>
      <div class="flex flex-col items-center justify-center w-full lg:w-1/2 h-full px-6 sm:px-0">
        <div class="flex lg:hidden items-center gap-3 mb-14">
          <div class="w-7 h-7 bg-white flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="0" y="0" width="6" height="6" fill="black"/>
              <rect x="8" y="0" width="6" height="6" fill="black" fill-opacity="0.4"/>
              <rect x="0" y="8" width="6" height="6" fill="black" fill-opacity="0.4"/>
              <rect x="8" y="8" width="6" height="6" fill="black"/>
            </svg>
          </div>
          <span class="text-white text-xs font-medium tracking-[0.22em] uppercase font-mono">Veyra</span>
        </div>
        <div class="w-full max-w-[360px]" style="animation: cardIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both;">
          <div class="mb-10">
            <h1 class="text-white leading-none tracking-[-0.04em] mb-3 font-display"
                style="font-size: 2.6rem; font-weight: 800;">
              Sign in
            </h1>
            <p class="text-zinc-500 text-sm leading-relaxed">
              Connect your Discord account to access <br class="hidden sm:block"/>the server dashboard.
            </p>
          </div>
          <a
            :href="discordAuthUrl"
            class="group flex items-center justify-between w-full py-4 px-5 bg-white hover:bg-zinc-100 active:bg-zinc-200 active:scale-[0.98] transition-all duration-100 mb-3 select-none"
          >
            <div class="flex items-center gap-3">
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.93 1.33A16.41 16.41 0 0 0 12.86.02a.06.06 0 0 0-.06.03c-.18.32-.38.73-.52 1.06a15.15 15.15 0 0 0-4.56 0A10.96 10.96 0 0 0 7.19.05a.06.06 0 0 0-.06-.03 16.37 16.37 0 0 0-4.07 1.31.06.06 0 0 0-.03.02C.44 5.53-.27 9.6.08 13.62c0 .02.01.04.03.05a16.52 16.52 0 0 0 4.97 2.51.06.06 0 0 0 .07-.02c.38-.52.72-1.07 1.01-1.65a.06.06 0 0 0-.03-.08 10.88 10.88 0 0 1-1.55-.74.06.06 0 0 1-.01-.1c.1-.08.21-.16.31-.24a.06.06 0 0 1 .06-.01c3.26 1.49 6.79 1.49 10.01 0a.06.06 0 0 1 .06.01c.1.08.2.16.31.24a.06.06 0 0 1-.01.1c-.5.29-1.02.53-1.55.74a.06.06 0 0 0-.03.08c.3.58.64 1.13 1.01 1.65.02.02.04.03.07.02a16.48 16.48 0 0 0 4.98-2.51.06.06 0 0 0 .03-.05c.41-4.59-.69-8.62-2.92-12.27a.05.05 0 0 0-.03-.02ZM6.68 10.16c-.98 0-1.79-.9-1.79-2.01s.79-2.01 1.79-2.01c1.01 0 1.81.91 1.79 2.01 0 1.11-.79 2.01-1.79 2.01Zm6.61 0c-.98 0-1.79-.9-1.79-2.01s.79-2.01 1.79-2.01c1.01 0 1.81.91 1.79 2.01 0 1.11-.78 2.01-1.79 2.01Z" fill="black"/>
              </svg>
              <span class="text-black text-sm font-semibold tracking-tight">Continue with Discord</span>
            </div>
            <svg class="transition-transform duration-150 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <transition
            enter-active-class="transition-all duration-200 ease-out"
            leave-active-class="transition-all duration-150 ease-in"
            enter-from-class="opacity-0 -translate-y-1"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="route.query.error"
              class="flex items-center gap-2.5 bg-zinc-950 px-4 py-3 mb-3"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" class="shrink-0">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="#52525b" stroke-width="1"/>
                <path d="M6.5 3.5v3M6.5 8.5v.5" stroke="#52525b" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
              <p class="text-zinc-500 text-xs font-mono">
                Authentication failed. Please try again.
              </p>
            </div>
          </transition>
          <div class="flex items-center gap-4 my-7">
            <div class="flex-1 h-px bg-zinc-900"></div>
            <span class="text-zinc-700 text-xs tracking-[0.2em] uppercase font-mono">access</span>
            <div class="flex-1 h-px bg-zinc-900"></div>
          </div>
          <p class="text-zinc-600 text-xs leading-relaxed">
            By continuing, you agree to our
            <span class="text-zinc-400 underline underline-offset-2 decoration-zinc-700 hover:text-white cursor-pointer transition-colors duration-150">terms of service</span>.
            Only verified server members may access this dashboard.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bgCanvas = ref(null);
let animFrameId = null;
let resizeHandler = null;
let mouseMoveHandler = null;
let touchMoveHandler = null;

const discordAuthUrl = computed(() => {
  return `${import.meta.env.VITE_API_BASE_URL}/auth/discord`;
});

onMounted(() => {
  if (!document.getElementById('veyra-fonts')) {
    const link = document.createElement('link');
    link.id = 'veyra-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600&family=DM+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }

  const canvas = bgCanvas.value;
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  resizeHandler = resize;
  window.addEventListener('resize', resizeHandler);

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
  let smoothX = mouse.x;
  let smoothY = mouse.y;

  mouseMoveHandler = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  };
  touchMoveHandler = (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  };
  window.addEventListener('mousemove', mouseMoveHandler);
  window.addEventListener('touchmove', touchMoveHandler, { passive: true });

  const TRAIL_MAX = 55;
  const trail = [];

  const rings = [
    { r: 55,  angle: 0,             speed: 0.006, alpha: 0.09 },
    { r: 100, angle: Math.PI / 2,   speed: 0.004, alpha: 0.055 },
    { r: 155, angle: Math.PI,       speed: 0.0025, alpha: 0.03 },
  ];

  const DOT_SPACING = 40;
  const INFLUENCE_R = 190;

  const PART_COUNT = 50;
  const parts = Array.from({ length: PART_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.0 + 0.2,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    alpha: Math.random() * 0.15 + 0.03,
    rx: 0, ry: 0,
  }));

  const draw = () => {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    smoothX += (mouse.x - smoothX) * 0.08;
    smoothY += (mouse.y - smoothY) * 0.08;

    if (mouse.active) {
      trail.push({ x: smoothX, y: smoothY });
      if (trail.length > TRAIL_MAX) trail.shift();
    }
    for (let i = 1; i < trail.length; i++) {
      const t = i / trail.length;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${t * t * 0.14})`;
      ctx.lineWidth = t * 1.6;
      ctx.lineCap = 'round';
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x, trail[i].y);
      ctx.stroke();
    }

    if (mouse.active) {
      const CH = 11;
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(smoothX - CH, smoothY); ctx.lineTo(smoothX + CH, smoothY);
      ctx.moveTo(smoothX, smoothY - CH); ctx.lineTo(smoothX, smoothY + CH);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(smoothX, smoothY, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fill();
    }

    rings.forEach(ring => {
      ring.angle += ring.speed;
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(smoothX, smoothY, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${ring.alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        const ox = smoothX + Math.cos(ring.angle) * ring.r;
        const oy = smoothY + Math.sin(ring.angle) * ring.r;
        ctx.beginPath();
        ctx.arc(ox, oy, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ring.alpha * 6})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          smoothX + Math.cos(ring.angle + Math.PI) * ring.r,
          smoothY + Math.sin(ring.angle + Math.PI) * ring.r,
          1.0, 0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(255,255,255,${ring.alpha * 3})`;
        ctx.fill();
      }
    });

    const cols = Math.ceil(w / DOT_SPACING) + 1;
    const rows = Math.ceil(h / DOT_SPACING) + 1;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const bx = col * DOT_SPACING;
        const by = row * DOT_SPACING;
        const dx = bx - smoothX;
        const dy = by - smoothY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inf = Math.max(0, 1 - dist / INFLUENCE_R);
        const push = inf * 12;
        const ang = Math.atan2(dy, dx);
        const px = bx + Math.cos(ang) * push;
        const py = by + Math.sin(ang) * push;
        const dotR = 0.7 + inf * 3.0;
        const alpha = 0.055 + inf * 0.25;
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
    }

    const REPEL_R = 110;
    for (const p of parts) {
      const dx = p.x - smoothX;
      const dy = p.y - smoothY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_R && dist > 0) {
        const f = ((REPEL_R - dist) / REPEL_R) * 0.55;
        p.rx += (dx / dist) * f;
        p.ry += (dy / dist) * f;
      }
      p.rx *= 0.87; p.ry *= 0.87;
      p.x += p.vx + p.rx;
      p.y += p.vy + p.ry;
      if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
    }

    const CONN = 85;
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const dx = parts[i].x - parts[j].x;
        const dy = parts[i].y - parts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONN) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / CONN) * 0.06})`;
          ctx.lineWidth = 0.4;
          ctx.moveTo(parts[i].x, parts[i].y);
          ctx.lineTo(parts[j].x, parts[j].y);
          ctx.stroke();
        }
      }
    }

    animFrameId = requestAnimationFrame(draw);
  };

  draw();
});

onBeforeUnmount(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (resizeHandler) window.removeEventListener('resize', resizeHandler);
  if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler);
  if (touchMoveHandler) window.removeEventListener('touchmove', touchMoveHandler);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

.font-display { font-family: 'Syne', sans-serif; }
.font-mono    { font-family: 'DM Mono', monospace; }

@keyframes pageIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>