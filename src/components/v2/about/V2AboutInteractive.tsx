import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn, usePrefersReducedMotion } from "@components/lib/utils";

const SPOTLIGHT_TAGS = [
  "TypeScript",
  "React",
  "Design systems",
  "A11y",
  "Performance",
] as const;

type V2AboutInteractiveProps = {
  heading: string;
  paragraphs: readonly string[];
  statValue: string;
  statLabel: string;
};

function AboutPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-v2-outline-variant/25">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(162,209,183,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(162,209,183,0.06)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div className="relative px-6 py-10 md:px-10 md:py-14">{children}</div>
    </div>
  );
}

function TiltStatCard({
  value,
  label,
  reducedMotion,
}: {
  value: string;
  label: string;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 280, damping: 28 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xp = (e.clientX - rect.left) / rect.width - 0.5;
    const yp = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xp);
    y.set(yp);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.div
        className="relative cursor-default rounded-xl border border-v2-primary/25 bg-v2-surface-container-high/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm will-change-transform"
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        ref={ref}
        style={
          reducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-40 [background:linear-gradient(125deg,rgba(162,209,183,0.2),transparent_45%,rgba(205,191,240,0.12))]"
        />
        <div className="relative text-center md:text-left">
          <div className="font-v2-headline text-4xl font-black tracking-tighter text-v2-primary md:text-5xl">
            {value}
          </div>
          <div className="mt-1 font-v2-headline text-xs font-bold uppercase tracking-[0.2em] text-v2-on-surface-variant">
            {label}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function V2AboutInteractive({
  heading,
  paragraphs,
  statValue,
  statLabel,
}: V2AboutInteractiveProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="bg-v2-surface-container-low py-24" id="about">
      <div className="mx-auto max-w-7xl px-8">
        <AboutPanel>
          <div className="grid items-start gap-12 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5">
              <motion.h2
                className="mb-6 font-v2-headline text-4xl font-bold tracking-tight text-v2-on-surface md:text-5xl"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-40px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {heading}
              </motion.h2>
              <motion.div
                aria-hidden
                className="mb-10 h-1 origin-left rounded-full bg-v2-primary"
                initial={reducedMotion ? false : { scaleX: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-40px" }}
                whileInView={{ scaleX: 1 }}
              />
              <div className="max-w-xs">
                <TiltStatCard
                  label={statLabel}
                  reducedMotion={reducedMotion}
                  value={statValue}
                />
              </div>
            </div>

            <div className="space-y-6 md:col-span-7">
              {paragraphs.map((p, i) => (
                <motion.p
                  className="text-lg leading-relaxed text-v2-on-surface-variant"
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  key={`about-p-${i}`}
                  transition={{
                    duration: 0.4,
                    delay: reducedMotion ? 0 : 0.06 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, margin: "-32px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {p}
                </motion.p>
              ))}

              <motion.div
                className="flex flex-wrap gap-2 pt-4"
                initial={reducedMotion ? false : { opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1 }}
              >
                {SPOTLIGHT_TAGS.map((tag) => (
                  <motion.span
                    className={cn(
                      "cursor-default rounded-full border border-v2-outline-variant/50 bg-v2-surface-container/80 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-v2-on-surface-variant",
                      "hover:border-v2-primary/50 hover:bg-v2-surface-container-high hover:text-v2-primary",
                    )}
                    key={tag}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                    whileHover={reducedMotion ? undefined : { scale: 1.06, y: -2 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </AboutPanel>
      </div>
    </section>
  );
}
