import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn, usePrefersReducedMotion } from "@components/lib/utils";

const SESSION_KEY = "v2-portfolio-intro-seen";

const BOOT_LINES = [
  { text: "Portfolio runtime v2.0.0", muted: false },
  { text: "Resolving workspace…", muted: true },
  { text: "Optimizing graph…", muted: true },
  { text: "Local:   http://localhost:4321", muted: false },
  { text: "✓ Ready in 842ms", muted: false },
] as const;


export function V2OpeningScene({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const [overlayOpen, setOverlayOpen] = useState(() => {
    if (typeof sessionStorage === "undefined") return true;
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  });

  const [phase, setPhase] = useState<"boot" | "prompt">(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "prompt"
      : "boot",
  );
  const [visibleBootLines, setVisibleBootLines] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? BOOT_LINES.length
      : 0,
  );

  useEffect(() => {
    if (reducedMotion && phase === "boot") {
      setPhase("prompt");
      setVisibleBootLines(BOOT_LINES.length);
    }
  }, [reducedMotion, phase]);

  useEffect(() => {
    if (!overlayOpen || phase !== "boot" || reducedMotion) return;
    if (visibleBootLines >= BOOT_LINES.length) {
      const t = window.setTimeout(() => setPhase("prompt"), 420);
      return () => window.clearTimeout(t);
    }
    const delay = reducedMotion ? 0 : 360;
    const t = window.setTimeout(
      () => setVisibleBootLines((n) => n + 1),
      delay,
    );
    return () => window.clearTimeout(t);
  }, [overlayOpen, phase, visibleBootLines, reducedMotion]);

  useEffect(() => {
    if (phase === "prompt") {
      const t = window.setTimeout(() => enterButtonRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setOverlayOpen(false);
    window.setTimeout(() => {
      const target =
        document.querySelector<HTMLElement>("#home") ??
        document.querySelector<HTMLElement>("main a, main button");
      target?.focus({ preventScroll: true });
    }, 80);
  }, []);

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen, dismiss]);

  useEffect(() => {
    if (!overlayOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
    };
  }, [overlayOpen]);

  return (
    <>
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            aria-describedby="v2-opening-hint"
            aria-labelledby="v2-opening-title"
            aria-modal="true"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden p-6"
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            initial={{ opacity: 1 }}
            key="v2-opening-overlay"
            role="dialog"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-v2-background/92 backdrop-blur-sm"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(162,209,183,0.12),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(205,191,240,0.08),transparent_50%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(204,233,218,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(204,233,218,0.4)_1px,transparent_1px)] [background-size:24px_24px]"
            />

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-v2-outline-variant/40 bg-v2-surface-container-low/95 shadow-[0_0_0_1px_rgba(162,209,183,0.06),0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md"
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              initial={{ opacity: 0.96, y: 6 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center gap-2 border-b border-v2-outline-variant/30 bg-v2-surface-container/80 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span
                  className="ml-2 font-mono text-[11px] text-v2-on-surface-variant"
                  id="v2-opening-title"
                >
                  portfolio — zsh
                </span>
              </div>

              <div className="min-h-[min(40vh,280px)] space-y-1 px-4 py-5 font-mono text-sm leading-relaxed text-v2-on-surface md:px-6 md:text-[15px]">
                {BOOT_LINES.slice(0, visibleBootLines).map((line, i) => (
                  <div
                    className={cn(
                      "flex gap-2",
                      line.muted && "text-v2-on-surface-variant",
                    )}
                    key={`boot-${line.text}-${i}`}
                  >
                    <span className="shrink-0 select-none text-v2-primary/70">
                      ›
                    </span>
                    <span>{line.text}</span>
                  </div>
                ))}

                {phase === "prompt" && (
                  <p
                    className="pt-4 text-v2-on-surface-variant text-xs md:text-sm"
                    id="v2-opening-hint"
                  >
                    When you&apos;re ready, continue below.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-v2-outline-variant/30 bg-v2-surface-container-high/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
                <button
                  className="rounded-full bg-v2-primary px-6 py-3 font-v2-headline font-bold text-v2-on-primary text-sm transition-transform hover:bg-v2-primary-fixed-dim active:scale-95 disabled:opacity-40 cursor-pointer"
                  disabled={phase !== "prompt"}
                  onClick={dismiss}
                  ref={enterButtonRef}
                  type="button"
                >
                  Enter portfolio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(overlayOpen && "pointer-events-none")}
        inert={overlayOpen ? true : undefined}
      >
        {children}
      </div>
    </>
  );
}
