'use client';

import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent as ReactKeyboardEvent,
    type PointerEvent as ReactPointerEvent,
} from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

/**
 * ConcaveCarousel — dinding galeri yang melengkung mengelilingi penonton.
 *
 * Implementasi orisinal berbasis CSS 3D (tanpa canvas). Panel diletakkan di sisi DALAM
 * sebuah silinder; penonton berdiri di dalamnya, jadi tepi kiri/kanan melengkung
 * mendekat ke arah penonton (cekung).
 */

export interface ConcaveCarouselItem {
    src: string;
    alt: string;
    title?: string;
    subtitle?: string;
    /** Dipakai sebagai fallback saat panel di tengah diklik dan `onSelect` tidak diberikan. */
    href?: string;
    /** Opsional: label kecil di pojok panel + warna aksennya. */
    badge?: string;
    accent?: string;
}

export interface ConcaveCarouselHandle {
    next: () => void;
    previous: () => void;
    goTo: (index: number) => void;
}

export interface ConcaveCarouselProps {
    items: ConcaveCarouselItem[];
    /** Indeks gambar yang mulai di tengah. */
    startIndex?: number;
    /** Lebar ÷ tinggi tiap panel. */
    aspect?: number;
    /** Tinggi panel tengah sebagai pecahan ruang di atas caption. */
    size?: number;
    /** 0 = lurus, 1 = drum rapat. */
    curvature?: number;
    /** Jarak penonton ke dinding, dalam satuan tinggi panel. */
    distance?: number;
    /** Sudut pandang (derajat). Negatif = mendongak, positif = menunduk. */
    tilt?: number;
    /** Jarak antar panel (px), diukur di panel tengah. */
    gap?: number;
    /** Radius sudut (px), diukur di panel tengah. */
    radius?: number;
    /** Kekuatan pantulan lantai (hanya tampil di browser berbasis WebKit/Blink). */
    reflection?: number;
    /** Seberapa memudar ke arah tepi kiri/kanan. */
    dim?: number;
    autoplay?: 'drift' | 'step' | 'off';
    /** Kecepatan drift (panel/detik). Negatif = arah sebaliknya, juga untuk `step`. */
    speed?: number;
    /** Detik antar langkah saat autoplay = 'step'. */
    interval?: number;
    snap?: boolean;
    inertia?: number;
    pauseOnHover?: boolean;
    draggable?: boolean;
    /**
     * Gesek horizontal (trackpad / shift+scroll) memutar dinding, satu panel per gesekan.
     * `true` = hanya horizontal, scroll vertikal halaman tidak diganggu.
     * `'all'` = scroll vertikal ikut memutar dinding.
     */
    wheel?: boolean | 'all';
    captions?: boolean;
    controls?: boolean;
    backgroundColor?: string;
    paused?: boolean;
    ariaLabel?: string;
    onIndexChange?: (index: number) => void;
    onSelect?: (item: ConcaveCarouselItem, index: number) => void;
    className?: string;
    style?: CSSProperties;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const mod = (x: number, n: number) => ((x % n) + n) % n;
/** Selisih terpendek pada lingkaran berukuran n → rentang [-n/2, n/2]. */
const wrap = (x: number, n: number) => x - n * Math.round(x / n);

const toneOf = (bg: string): 'light' | 'dark' => {
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(bg.trim());
    if (!m) return 'dark';
    let hex = m[1];
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? 'light' : 'dark';
};

export const ConcaveCarousel = forwardRef<ConcaveCarouselHandle, ConcaveCarouselProps>(
    function ConcaveCarousel(props, ref) {
        const {
            items,
            startIndex = 0,
            aspect = 1.25,
            size = 0.46,
            curvature = 0.72,
            distance = 4,
            tilt = 0,
            gap = 16,
            radius = 14,
            reflection = 0.06,
            dim = 0.35,
            autoplay = 'drift',
            speed = 0.16,
            interval = 4,
            snap = true,
            inertia = 0.5,
            pauseOnHover = true,
            draggable = true,
            wheel = true,
            captions = true,
            controls = true,
            backgroundColor = 'transparent',
            paused = false,
            ariaLabel = 'Galeri melengkung. Seret, gesek, atau gunakan tombol panah untuk memutar dinding.',
            onIndexChange,
            onSelect,
            className = '',
            style,
        } = props;

        const rootRef = useRef<HTMLDivElement>(null);
        const stageRef = useRef<HTMLDivElement>(null);
        const sceneRef = useRef<HTMLDivElement>(null);
        const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
        const wakeRef = useRef<() => void>(() => { });

        const count = items.length;
        const [active, setActive] = useState(() => (count ? mod(startIndex, count) : 0));

        // Nilai terbaru dibaca lewat ref supaya loop animasi tidak perlu dipasang ulang.
        const itemsRef = useRef(items);
        itemsRef.current = items;
        const cfg = useRef({
            aspect, size, curvature, distance, tilt, gap, dim,
            autoplay, speed, interval, snap, inertia,
            pauseOnHover, draggable, wheel, paused,
        });
        cfg.current = {
            aspect, size, curvature, distance, tilt, gap, dim,
            autoplay, speed, interval, snap, inertia,
            pauseOnHover, draggable, wheel, paused,
        };
        const onIndexChangeRef = useRef(onIndexChange);
        onIndexChangeRef.current = onIndexChange;
        const onSelectRef = useRef(onSelect);
        onSelectRef.current = onSelect;

        const state = useRef({
            pos: count ? mod(startIndex, count) : 0,
            vel: 0,
            target: null as number | null,
            drift: 1,
            timer: 0,
            down: false,
            dragging: false,
            moved: 0,
            startX: 0,
            startPos: 0,
            lastT: 0,
            downIndex: -1,
            hover: false,
            userPaused: false,
            visible: true,
            reduce: false,
            center: -1,
            wheelAccum: 0,
            wheelAt: 0,
            lastWheelStep: 0,
            g: { w: 0, h: 0, W: 0, H: 0, persp: 1, R: 1, step: 0, maxA: 1 },
        });

        // ───────────── Geometri ─────────────
        const layout = useCallback(() => {
            const stage = stageRef.current;
            const scene = sceneRef.current;
            if (!stage || !scene) return;
            const c = cfg.current;
            const st = state.current;
            const W = stage.clientWidth;
            const H = stage.clientHeight;
            if (!W || !H) return;

            let h = clamp(c.size, 0.1, 1) * H;
            let w = h * c.aspect;
            const maxW = W * 0.72;
            if (w > maxW) {
                w = maxW;
                h = w / c.aspect;
            }

            const curv = clamp(c.curvature, 0.05, 1);
            const persp = Math.max(200, c.distance * h);
            const R = persp / curv; // jari-jari silinder
            const step = (w + c.gap) / R; // sudut antar panel (rad)
            const maxA = Math.min(Math.acos(clamp(1 - 0.85 * curv, -1, 1)), 1.3);
            st.g = { w, h, W, H, persp, R, step, maxA };

            stage.style.perspective = `${persp}px`;
            stage.style.perspectiveOrigin = '50% 46%';
            scene.style.transformOrigin = '50% 46%';
            scene.style.transform = `rotateX(${-c.tilt}deg)`;

            for (const el of panelRefs.current) {
                if (!el) continue;
                el.style.width = `${w}px`;
                el.style.height = `${h}px`;
                el.style.marginLeft = `${-w / 2}px`;
                el.style.marginTop = `${-h / 2}px`;
            }
        }, []);

        const render = useCallback(() => {
            const st = state.current;
            const { w, W, persp, R, step, maxA } = st.g;
            const list = itemsRef.current;
            const N = list.length;
            if (!N || !w) return;
            const c = cfg.current;

            for (let i = 0; i < N; i++) {
                const el = panelRefs.current[i];
                if (!el) continue;
                const d = wrap(i - st.pos, N);
                const a = d * step;
                const x = R * Math.sin(a);
                const z = R * (1 - Math.cos(a));
                const sc = persp / Math.max(1, persp - z);

                // Sembunyikan panel yang di luar layar / terlalu dekat kamera.
                if (Math.abs(a) > maxA || z >= persp * 0.9 || Math.abs(x * sc) > W / 2 + w * sc) {
                    if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden';
                    continue;
                }

                el.style.visibility = 'visible';
                // Panel menghadap ke pusat silinder → rotateY berlawanan tanda dengan posisi.
                el.style.transform = `translate3d(${x.toFixed(2)}px,0,${z.toFixed(2)}px) rotateY(${(
                    (-a * 180) / Math.PI
                ).toFixed(3)}deg)`;
                const f = Math.min(1, Math.abs(d) / 2.8);
                el.style.opacity = (1 - c.dim * Math.pow(f, 1.4)).toFixed(3);
            }

            const center = mod(Math.round(st.pos), N);
            if (center !== st.center) {
                const first = st.center === -1;
                st.center = center;
                setActive(center);
                if (!first) onIndexChangeRef.current?.(center);
            }
        }, []);

        // ───────────── Kontrol ─────────────
        const goBy = useCallback((n: number) => {
            const st = state.current;
            st.vel = 0;
            st.timer = 0;
            const base = st.target ?? Math.round(st.pos);
            st.target = base + n;
            wakeRef.current();
        }, []);

        const goTo = useCallback((index: number) => {
            const N = itemsRef.current.length;
            if (!N) return;
            const st = state.current;
            const base = st.target ?? Math.round(st.pos);
            st.vel = 0;
            st.timer = 0;
            st.target = base + wrap(index - base, N);
            wakeRef.current();
        }, []);

        const select = useCallback((index: number) => {
            const item = itemsRef.current[index];
            if (!item) return;
            if (onSelectRef.current) onSelectRef.current(item, index);
            else if (item.href) window.location.assign(item.href);
        }, []);

        useImperativeHandle(
            ref,
            () => ({ next: () => goBy(1), previous: () => goBy(-1), goTo }),
            [goBy, goTo],
        );

        // ───────────── Loop animasi + observer ─────────────
        useEffect(() => {
            const root = rootRef.current;
            const stage = stageRef.current;
            if (!root || !stage) return undefined;
            const st = state.current;

            const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
            st.reduce = motionQuery?.matches ?? false;
            const onMotionChange = () => {
                st.reduce = motionQuery?.matches ?? false;
            };
            motionQuery?.addEventListener?.('change', onMotionChange);

            let raf = 0;
            let last = 0;
            let alive = true;

            const autoOn = () => {
                const c = cfg.current;
                return !c.paused && !st.userPaused && !st.reduce && c.autoplay !== 'off';
            };

            const needsFrame = () =>
                st.dragging ||
                st.target !== null ||
                Math.abs(st.vel) > 0.002 ||
                autoOn() ||
                Math.abs(st.drift) > 0.001;

            const advance = (dt: number) => {
                const c = cfg.current;
                const braked = c.pauseOnHover && st.hover;

                // Drift ber-rem halus saat hover / drag / sedang menuju target.
                const wantDrift = autoOn() && !braked && !st.dragging && st.target === null ? 1 : 0;
                st.drift += (wantDrift - st.drift) * (1 - Math.exp(-dt * 5));

                if (st.dragging) return;

                if (st.target !== null) {
                    const diff = st.target - st.pos;
                    const k = st.reduce ? 40 : 7;
                    st.pos += diff * (1 - Math.exp(-dt * k));
                    if (Math.abs(diff) < 0.0008) {
                        st.pos = st.target;
                        st.target = null;
                        st.vel = 0;
                    }
                    return;
                }

                if (Math.abs(st.vel) > 0.002) {
                    // Inertia bebas (snap = false)
                    st.pos += st.vel * dt;
                    st.vel *= Math.exp(-dt * (7 - 5.8 * clamp(c.inertia, 0, 1)));
                }

                if (c.autoplay === 'drift') {
                    st.pos += c.speed * st.drift * dt;
                } else if (c.autoplay === 'step' && autoOn() && !braked) {
                    st.timer += dt;
                    if (st.timer >= Math.max(0.5, c.interval)) {
                        st.timer = 0;
                        const base = Math.round(st.pos);
                        st.target = base + (Math.sign(c.speed) || 1);
                    }
                }
            };

            const frame = (now: number) => {
                raf = 0;
                if (!alive || !st.visible || document.hidden) {
                    last = 0;
                    return;
                }
                const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
                last = now;
                advance(dt);
                render();
                if (needsFrame()) raf = requestAnimationFrame(frame);
                else last = 0;
            };

            const wake = () => {
                if (!raf && alive && st.visible && !document.hidden) raf = requestAnimationFrame(frame);
            };
            wakeRef.current = wake;

            const resizeObserver = new ResizeObserver(() => {
                layout();
                render();
            });
            resizeObserver.observe(stage);

            const intersection = new IntersectionObserver((entries) => {
                st.visible = entries.some((e) => e.isIntersecting);
                if (st.visible) {
                    last = 0;
                    wake();
                }
            });
            intersection.observe(root);

            const onVisibility = () => {
                last = 0;
                wake();
            };
            document.addEventListener('visibilitychange', onVisibility);

            // Gesek horizontal → putar dinding (listener native agar bisa preventDefault).
            const onWheel = (event: WheelEvent) => {
                const mode = cfg.current.wheel;
                if (!mode) return;
                const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
                if (!horizontal && mode !== 'all') return;
                event.preventDefault();

                const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
                const now = performance.now();
                if (now - st.wheelAt > 240) st.wheelAccum = 0;
                st.wheelAt = now;
                st.wheelAccum += delta;
                if (Math.abs(st.wheelAccum) >= 40 && now - st.lastWheelStep > 220) {
                    goBy(Math.sign(st.wheelAccum));
                    st.wheelAccum = 0;
                    st.lastWheelStep = now;
                }
            };
            root.addEventListener('wheel', onWheel, { passive: false });

            layout();
            render();
            wake();

            return () => {
                alive = false;
                cancelAnimationFrame(raf);
                wakeRef.current = () => { };
                resizeObserver.disconnect();
                intersection.disconnect();
                document.removeEventListener('visibilitychange', onVisibility);
                root.removeEventListener('wheel', onWheel);
                motionQuery?.removeEventListener?.('change', onMotionChange);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        // Geometri dihitung ulang bila props tampilan berubah.
        useEffect(() => {
            layout();
            render();
            wakeRef.current();
        }, [aspect, size, curvature, distance, tilt, gap, count, layout, render]);

        // ───────────── Pointer: drag, flick, klik ─────────────
        const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            const st = state.current;
            st.down = true;
            st.dragging = false;
            st.moved = 0;
            st.startX = e.clientX;
            st.startPos = st.pos;
            st.lastT = performance.now();
            const hit = (e.target as HTMLElement).closest<HTMLElement>('[data-index]');
            st.downIndex = hit ? Number(hit.dataset.index) : -1;
            st.vel = 0;
            st.target = null; // menggenggam dinding menghentikan gerakan
        };

        const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
            const st = state.current;
            if (!st.down) return;
            const dx = e.clientX - st.startX;
            st.moved = Math.max(st.moved, Math.abs(dx));

            if (!st.dragging) {
                if (!cfg.current.draggable || st.moved <= 5) return;
                st.dragging = true;
                stageRef.current?.setPointerCapture?.(e.pointerId);
                wakeRef.current();
            }

            // Titik yang digenggam tetap berada di bawah pointer.
            const perPanel = st.g.w + cfg.current.gap;
            const next = st.startPos - dx / perPanel;
            const now = performance.now();
            const dt = Math.max(1, now - st.lastT) / 1000;
            st.vel = st.vel * 0.6 + ((next - st.pos) / dt) * 0.4;
            st.pos = next;
            st.lastT = now;
            render();
        };

        const endPointer = (e: ReactPointerEvent<HTMLDivElement>, cancelled: boolean) => {
            const st = state.current;
            if (!st.down) return;
            st.down = false;
            const wasDragging = st.dragging;
            st.dragging = false;
            const stage = stageRef.current;
            if (stage?.hasPointerCapture?.(e.pointerId)) stage.releasePointerCapture(e.pointerId);

            if (wasDragging) {
                const c = cfg.current;
                if (performance.now() - st.lastT > 90) st.vel = 0; // berhenti dulu sebelum dilepas
                if (c.snap) {
                    st.target = Math.round(st.pos + st.vel * (0.05 + clamp(c.inertia, 0, 1) * 0.45));
                    st.vel = 0;
                } else {
                    st.vel *= 0.4 + clamp(c.inertia, 0, 1);
                }
                wakeRef.current();
                return;
            }

            if (cancelled || st.moved >= 6 || st.downIndex < 0) return;
            const N = itemsRef.current.length;
            const centerIndex = mod(Math.round(st.pos), N);
            if (st.downIndex === centerIndex) select(centerIndex);
            else goTo(st.downIndex);
        };

        const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                goBy(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goBy(-1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                goTo(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                goTo(count - 1);
            } else if (e.key === ' ') {
                e.preventDefault();
                state.current.userPaused = !state.current.userPaused;
                wakeRef.current();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                select(mod(Math.round(state.current.pos), count));
            }
        };

        // ───────────── Tampilan ─────────────
        const tone = toneOf(backgroundColor);
        const light = tone === 'light';
        const reflectStyle: CSSProperties | undefined =
            reflection > 0
                ? ({
                    WebkitBoxReflect: `below 8px linear-gradient(to bottom, rgba(255,255,255,${Math.min(
                        1,
                        reflection * 4,
                    )}) 0%, transparent 45%)`,
                } as CSSProperties)
                : undefined;
        const current = items[active];
        const maskStyle: CSSProperties | undefined =
            dim > 0
                ? {
                    WebkitMaskImage:
                        'linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%)',
                    maskImage:
                        'linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%)',
                }
                : undefined;

        const buttonClass = light
            ? 'border-black/10 bg-black/[0.03] text-black/60 hover:border-black/25 hover:bg-black/[0.07] hover:text-black'
            : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:bg-white/[0.07] hover:text-white';

        return (
            <div
                ref={rootRef}
                role="region"
                aria-roledescription="carousel"
                aria-label={ariaLabel}
                tabIndex={0}
                onKeyDown={onKeyDown}
                className={`relative flex min-h-[420px] w-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 ${className}`}
                style={{ backgroundColor, ...style }}
            >
                <style>{`
          @keyframes ccFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          .cc-caption { animation: ccFade .5s cubic-bezier(.22,1,.36,1) both; }
          @media (prefers-reduced-motion: reduce) { .cc-caption { animation: none; } }
        `}</style>

                {/* Dinding */}
                <div
                    ref={stageRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={(e) => endPointer(e, false)}
                    onPointerCancel={(e) => endPointer(e, true)}
                    onPointerEnter={(e) => {
                        if (e.pointerType === 'mouse') state.current.hover = true;
                    }}
                    onPointerLeave={(e) => {
                        if (e.pointerType === 'mouse') {
                            state.current.hover = false;
                            wakeRef.current();
                        }
                    }}
                    className={`relative min-h-0 flex-1 touch-pan-y select-none overflow-hidden ${draggable ? 'cursor-grab active:cursor-grabbing' : ''
                        }`}
                    style={maskStyle}
                >
                    <div ref={sceneRef} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                        {items.map((item, i) => (
                            <div
                                key={`${item.src}-${i}`}
                                ref={(el) => {
                                    panelRefs.current[i] = el;
                                }}
                                data-index={i}
                                aria-hidden={i !== active}
                                className="absolute left-1/2 top-[46%] will-change-transform [backface-visibility:hidden]"
                                style={{ visibility: 'hidden' }}
                            >
                                <div
                                    className="relative h-full w-full overflow-hidden bg-black/40 ring-1 ring-white/10"
                                    style={{ borderRadius: radius, ...reflectStyle }}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        draggable={false}
                                        className="pointer-events-none h-full w-full object-cover"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                                    {item.badge && (
                                        <span
                                            className="pointer-events-none absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-medium backdrop-blur-md"
                                            style={{
                                                background: `${item.accent ?? '#ffffff'}1a`,
                                                borderColor: `${item.accent ?? '#ffffff'}44`,
                                                color: item.accent ?? '#ffffff',
                                            }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Caption + kontrol */}
                {(captions || controls) && count > 0 && (
                    <div className="relative z-10 flex min-h-[96px] flex-col items-center justify-start gap-4 px-5 pb-1 pt-2 text-center">
                        {captions && (
                            <div key={active} className="cc-caption min-h-[44px]">
                                {current?.title && (
                                    <h3
                                        className={`text-lg font-semibold tracking-tight ${light ? 'text-neutral-900' : 'text-white'
                                            }`}
                                    >
                                        {current.title}
                                    </h3>
                                )}
                                {current?.subtitle && (
                                    <p className={`mt-1 text-xs ${light ? 'text-black/50' : 'text-white/45'}`}>
                                        {current.subtitle}
                                    </p>
                                )}
                            </div>
                        )}

                        {controls && (
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => goBy(-1)}
                                    aria-label="Sebelumnya"
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${buttonClass}`}
                                >
                                    <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <span
                                    className={`min-w-[64px] text-[11px] font-medium tabular-nums tracking-[0.14em] ${light ? 'text-black/40' : 'text-white/35'
                                        }`}
                                >
                                    <span className={light ? 'text-black/80' : 'text-white/80'}>
                                        {String(active + 1).padStart(2, '0')}
                                    </span>
                                    {' / '}
                                    {String(count).padStart(2, '0')}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => goBy(1)}
                                    aria-label="Berikutnya"
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${buttonClass}`}
                                >
                                    <LuArrowRight className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="sr-only" aria-live="polite">
                    {current?.title}
                    {current?.subtitle ? `, ${current.subtitle}` : ''}
                </div>
            </div>
        );
    },
);

export default ConcaveCarousel;