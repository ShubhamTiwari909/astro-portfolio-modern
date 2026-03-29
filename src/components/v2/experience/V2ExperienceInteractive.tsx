import { motion } from "motion/react";
import { cn, usePrefersReducedMotion } from "@components/lib/utils";

type ExperienceCard = {
  title: string;
  description: string;
};

type V2ExperienceInteractiveProps = {
  sectionTitle: string;
  cards: readonly ExperienceCard[];
};

function borderClass(index: number) {
  return index === 0 ? "border-v2-primary" : "border-v2-secondary";
}

export function V2ExperienceInteractive({
  sectionTitle,
  cards,
}: V2ExperienceInteractiveProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="bg-v2-surface-container-lowest py-24" id="experience">
      <div className="mx-auto max-w-7xl px-8">
        <motion.h2
          className="mb-16 font-v2-headline text-4xl font-bold text-v2-on-surface"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {sectionTitle}
        </motion.h2>

        <div className="grid gap-8">
          {cards.map((card, i) => (
            <motion.article
              className={cn(
                "flex flex-col items-center gap-8 rounded-3xl border-l-4 bg-v2-surface-container-low p-8 md:flex-row md:items-start",
                "transition-[box-shadow] duration-200",
                "hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
                borderClass(i),
              )}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              key={card.title}
              transition={{
                duration: 0.42,
                delay: reducedMotion ? 0 : 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-40px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div>
                <h3 className="mb-2 font-v2-headline text-xl font-bold text-v2-on-surface">
                  {card.title}
                </h3>
                <p className="text-v2-on-surface-variant leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
