import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { cn, usePrefersReducedMotion } from "@components/lib/utils";

type SocialLink = {
  name: string;
  href: string;
  materialIcon: string;
};

type V2ContactInteractiveProps = {
  locationLine: string;
  availabilityLine: string;
  email: string;
  socialLinks: readonly SocialLink[];
};

function orderSocialLinks(links: readonly SocialLink[]): SocialLink[] {
  if (links.length < 3) return [...links];
  return [links[0], links[2], links[1]];
}

function socialAccentClass(index: number) {
  if (index === 0) return "hover:text-v2-primary";
  if (index === 1) return "hover:text-v2-secondary";
  return "hover:text-v2-primary-fixed";
}

export function V2ContactInteractive({
  locationLine,
  availabilityLine,
  email,
  socialLinks,
}: V2ContactInteractiveProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const orderedSocials = orderSocialLinks(socialLinks);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [email]);

  return (
    <section className="py-12 md:py-28 lg:py-36" id="contact">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10">
        <motion.div
          className="overflow-hidden rounded-2xl bg-v2-surface-container md:rounded-[3rem] lg:min-h-[28rem]"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col justify-between gap-8 bg-v2-surface-container-high p-6 sm:p-10 md:gap-16 md:p-16 lg:gap-20 lg:p-20 xl:p-24">
            <div className="space-y-3 sm:space-y-5 md:space-y-8 lg:space-y-10">
              <motion.h2
                className="font-v2-headline text-xl font-bold tracking-tight text-v2-on-surface sm:text-3xl md:text-4xl lg:text-5xl"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.05 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                Contact
              </motion.h2>
              <motion.p
                className="max-w-3xl text-base leading-snug text-v2-on-surface-variant sm:text-xl sm:leading-relaxed md:text-2xl lg:text-3xl"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {locationLine}
                <br />
                {availabilityLine}
              </motion.p>

              <div className="space-y-3 pt-1 md:pt-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a
                    className="flex min-w-0 items-start gap-3 text-base font-medium text-v2-on-surface transition-colors hover:text-v2-primary sm:items-center sm:text-xl md:text-2xl lg:text-3xl"
                    href={`mailto:${email}`}
                  >
                    <span
                      aria-hidden
                      className="material-symbols-outlined shrink-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                    >
                      mail
                    </span>
                    <span className="break-all leading-snug sm:break-normal">
                      {email}
                    </span>
                  </a>
                  <button
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2 font-v2-headline text-xs font-bold uppercase tracking-widest transition-colors sm:self-center",
                      copied
                        ? "border-v2-primary/60 bg-v2-primary/15 text-v2-primary"
                        : "border-v2-outline-variant/50 text-v2-on-surface-variant hover:border-v2-primary/40 hover:text-v2-primary",
                    )}
                    onClick={copyEmail}
                    type="button"
                  >
                    <span aria-hidden className="material-symbols-outlined text-lg">
                      {copied ? "check" : "content_copy"}
                    </span>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-5 pt-2 sm:gap-8 md:gap-10 md:pt-0 lg:gap-12">
              {orderedSocials.map((link, i) => (
                <motion.a
                  aria-label={link.name}
                  className={cn(
                    "text-v2-on-surface-variant transition-colors",
                    socialAccentClass(i),
                  )}
                  href={link.href}
                  key={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  whileHover={reducedMotion ? undefined : { scale: 1.08 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                >
                  <span
                    className="material-symbols-outlined text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                  >
                    {link.materialIcon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
