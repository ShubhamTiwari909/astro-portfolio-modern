import { motion } from "motion/react";
import { cn, usePrefersReducedMotion } from "@components/lib/utils";
import type { SkillCategoryV2 } from "@data/portfolio-site";

function barClass(accent: SkillCategoryV2["accent"]) {
  if (accent === "primary") return "bg-v2-primary";
  if (accent === "secondary") return "bg-v2-secondary";
  return "bg-v2-on-surface";
}

function iconWrapClass(accent: SkillCategoryV2["accent"]) {
  if (accent === "primary") return "bg-v2-primary/10 text-v2-primary";
  if (accent === "secondary") return "bg-v2-secondary/10 text-v2-secondary";
  return "bg-v2-on-surface/10 text-v2-on-surface";
}

type V2SkillsInteractiveProps = {
  categories: SkillCategoryV2[];
};

export function V2SkillsInteractive({ categories }: V2SkillsInteractiveProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="py-24" id="skills">
      <div className="mx-auto max-w-7xl px-8">
        <motion.h2
          className="mb-16 text-center font-v2-headline text-4xl font-bold text-v2-on-surface"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Technical Skills
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((cat, catIndex) => (
            <motion.div
              className="rounded-3xl border border-v2-outline-variant/10 bg-v2-surface-container p-8 transition-[border-color,box-shadow] duration-200 hover:border-v2-primary/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              key={cat.title}
              transition={{
                duration: 0.45,
                delay: reducedMotion ? 0 : 0.07 * catIndex,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    iconWrapClass(cat.accent),
                  )}
                >
                  <span className="material-symbols-outlined">
                    {cat.materialIcon}
                  </span>
                </div>
                <h3 className="font-v2-headline text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="space-y-6">
                {cat.bars.map((bar, barIndex) => (
                  <div key={`${cat.title}-${bar.name}`}>
                    <div className="mb-2 flex justify-between font-v2-label text-sm uppercase tracking-widest">
                      <span>{bar.name}</span>
                      <span>{bar.percentage}%</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-v2-surface-container-highest">
                      {reducedMotion ? (
                        <div
                          className={cn(
                            "h-full rounded-full",
                            barClass(cat.accent),
                          )}
                          style={{ width: `${bar.percentage}%` }}
                        />
                      ) : (
                        <motion.div
                          className={cn(
                            "h-full rounded-full",
                            barClass(cat.accent),
                          )}
                          initial={{ width: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.05 * barIndex + 0.1 * catIndex,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          viewport={{ once: true, amount: 0.35 }}
                          whileInView={{ width: `${bar.percentage}%` }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
