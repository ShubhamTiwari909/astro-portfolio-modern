import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@components/lib/utils";

type Cta = { label: string; href: string };

type SocialLink = {
  name: string;
  href: string;
  materialIcon: string;
};

type V2HeroTextProps = {
  eyebrow: string;
  titleLine1: string;
  titleLine2Accent: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  socialLinks: readonly SocialLink[];
};

export function V2HeroText({
  eyebrow,
  titleLine1,
  titleLine2Accent,
  description,
  primaryCta,
  secondaryCta,
  socialLinks,
}: V2HeroTextProps) {
  const reducedMotion = usePrefersReducedMotion();

  const baseTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  const delay = (step: number) => (reducedMotion ? 0 : 0.07 * step);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="font-v2-headline text-sm font-bold uppercase tracking-widest text-v2-secondary"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ ...baseTransition, delay: delay(0) }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1 className="font-v2-headline text-4xl font-extrabold leading-none tracking-tighter text-v2-on-surface lg:text-7xl">
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="block"
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            transition={{ ...baseTransition, delay: delay(1) }}
          >
            {titleLine1}
          </motion.span>
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 block text-v2-primary italic"
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            transition={{ ...baseTransition, delay: delay(2) }}
          >
            {titleLine2Accent}
          </motion.span>
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg font-v2-body text-xl leading-relaxed text-v2-on-surface-variant"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ ...baseTransition, delay: delay(3) }}
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-6"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        transition={{ ...baseTransition, delay: delay(4) }}
      >
        <a
          className="rounded-full bg-v2-primary px-8 py-4 font-v2-headline text-lg font-bold text-v2-on-primary transition-all hover:bg-v2-primary-fixed-dim active:scale-95"
          href={primaryCta.href}
        >
          {primaryCta.label}
        </a>
        <a
          className="rounded-full border border-v2-outline-variant px-8 py-4 font-v2-headline text-lg font-bold text-v2-on-surface transition-all hover:border-v2-primary active:scale-95"
          download
          href={secondaryCta.href}
        >
          {secondaryCta.label}
        </a>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-6"
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        transition={{ ...baseTransition, delay: delay(5) }}
      >
        {socialLinks.map((link) => (
          <a
            aria-label={link.name}
            className="text-v2-on-surface-variant transition-colors hover:text-v2-primary"
            href={link.href}
            key={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined">{link.materialIcon}</span>
          </a>
        ))}
      </motion.div>
    </div>
  );
}
