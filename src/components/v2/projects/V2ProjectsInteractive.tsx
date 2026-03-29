import { motion } from "motion/react";
import { cn, usePrefersReducedMotion } from "@components/lib/utils";
import type { ProjectEntry } from "@data/portfolio-site";

type V2ProjectsInteractiveProps = {
  projects: ProjectEntry[];
};

export function V2ProjectsInteractive({ projects }: V2ProjectsInteractiveProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="py-24" id="projects">
      <div className="mx-auto max-w-7xl px-8">
        <motion.h2
          className="mb-16 font-v2-headline text-4xl font-bold text-v2-on-surface"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Projects
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              className={cn(
                "group rounded-2xl transition-[box-shadow] duration-200",
                "hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)]",
              )}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              key={project.title}
              transition={{
                duration: 0.42,
                delay: reducedMotion ? 0 : 0.08 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-36px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div
                aria-label={project.imageAlt}
                className="relative mb-6 aspect-video overflow-hidden rounded-[2rem] bg-v2-surface-container-high"
                role="img"
              >
                <div className="h-full w-full bg-gradient-to-br from-v2-surface-variant to-v2-surface-container-highest opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-v2-surface-container-lowest to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      className="rounded bg-v2-surface-container-highest px-3 py-1 font-v2-label text-[10px] uppercase text-v2-secondary"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="mb-3 font-v2-headline text-2xl font-bold text-v2-on-surface">
                {project.title}
              </h3>
              <p className="mb-4 line-clamp-3 text-v2-on-surface-variant">
                {project.description}
              </p>
              {project.liveUrl ? (
                <a
                  className="flex items-center gap-2 font-bold text-v2-primary transition-all hover:gap-4"
                  href={project.liveUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Examine Specimen{" "}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              ) : (
                <span className="font-v2-label text-sm text-v2-on-surface-variant/60">
                  Demo coming soon
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
