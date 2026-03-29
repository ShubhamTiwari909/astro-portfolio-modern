import { useCallback, useMemo, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { cn, usePrefersReducedMotion } from "@components/lib/utils";

export type UIShowcaseItem = {
  title: string;
  materialIcon: string;
};

type V2UIShowcaseInteractiveProps = {
  items: readonly UIShowcaseItem[];
};

function iconTone(gridIndex: number) {
  const cycle = gridIndex % 4;
  if (cycle === 0) return "text-v2-primary";
  if (cycle === 1) return "text-v2-secondary";
  if (cycle === 2) return "text-v2-primary-fixed";
  return "text-v2-tertiary";
}

function shuffleArray<T>(source: readonly T[]): T[] {
  const next = [...source];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function V2UIShowcaseInteractive({
  items,
}: V2UIShowcaseInteractiveProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [orderedItems, setOrderedItems] = useState(() => [...items]);

  const handleShuffle = useCallback(() => {
    setOrderedItems((prev) => shuffleArray(prev));
  }, []);

  const layoutTransition = useMemo(
    () =>
      reducedMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 380, damping: 32 },
    [reducedMotion],
  );

  return (
    <section className="bg-v2-surface-container-low py-24" id="ui-showcase">
      <div className="mx-auto max-w-7xl px-8">
        <motion.h2
          className="mb-10 text-center font-v2-headline text-4xl font-bold text-v2-on-surface md:mb-14"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          UI Showcase
        </motion.h2>

        <div className="mb-8 flex justify-center">
          <button
            aria-label="Shuffle showcase cards"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-v2-outline-variant/40 bg-v2-surface-container px-5 py-2.5 font-v2-headline text-sm font-bold uppercase tracking-widest text-v2-on-surface transition-colors hover:border-v2-primary/50 hover:bg-v2-surface-container-high"
            onClick={handleShuffle}
            type="button"
          >
            <span aria-hidden className="material-symbols-outlined text-lg">
              shuffle
            </span>
            Shuffle
          </button>
        </div>

        <LayoutGroup>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {orderedItems.map((item, i) => (
              <motion.div
                className={cn(
                  "flex aspect-square flex-col items-center justify-center rounded-3xl border border-v2-outline-variant/10 bg-v2-surface-container p-6 text-center",
                  "shadow-sm transition-shadow hover:shadow-[0_12px_36px_rgba(0,0,0,0.15)]",
                )}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 32,
                        rotate: ((i * 7 + i * i) % 13) - 6,
                        scale: 0.94,
                      }
                }
                key={item.title}
                layout={!reducedMotion}
                transition={{
                  layout: layoutTransition,
                  opacity: {
                    duration: 0.4,
                    delay: reducedMotion ? 0 : 0.04 * i,
                  },
                  y: {
                    duration: 0.45,
                    delay: reducedMotion ? 0 : 0.04 * i,
                  },
                  rotate: {
                    duration: 0.5,
                    delay: reducedMotion ? 0 : 0.04 * i,
                  },
                  scale: {
                    duration: 0.4,
                    delay: reducedMotion ? 0 : 0.04 * i,
                  },
                }}
                viewport={{ once: true, margin: "-20px" }}
                whileInView={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                      }
                }
              >
                <span
                  className={cn(
                    "material-symbols-outlined mb-4 text-sm md:text-4xl",
                    iconTone(i),
                  )}
                >
                  {item.materialIcon}
                </span>
                <span className="font-v2-headline text-sm font-bold md:text-base">
                  {item.title}
                </span>
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
