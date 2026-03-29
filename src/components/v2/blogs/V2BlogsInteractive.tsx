import { motion } from "motion/react";
import { cn, usePrefersReducedMotion } from "@components/lib/utils";
import { formatBlogDateShort, type DevToBlog } from "@lib/devto-blogs";

type V2BlogsInteractiveProps = {
  blogs: DevToBlog[];
};

export function V2BlogsInteractive({ blogs }: V2BlogsInteractiveProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (blogs.length === 0) {
    return (
      <section className="bg-v2-surface-dim py-24" id="blogs">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="mb-16 font-v2-headline text-4xl font-bold text-v2-on-surface">
            Blogs
          </h2>
          <p className="text-center text-v2-on-surface-variant">No blogs found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-v2-surface-dim py-24" id="blogs">
      <div className="mx-auto max-w-7xl px-8">
        <motion.h2
          className="mb-16 font-v2-headline text-4xl font-bold text-v2-on-surface"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Blogs
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogs.map((blog, i) => (
            <motion.article
              className={cn(
                "group rounded-2xl bg-v2-surface-container-high p-6 transition-[background-color,box-shadow] duration-200",
                "hover:bg-v2-surface-container-highest hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
              )}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              key={blog.url}
              transition={{
                duration: 0.4,
                delay: reducedMotion ? 0 : 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-30px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {blog.cover_image ? (
                <div className="relative mb-4">
                  <img
                    alt={blog.title}
                    className="h-48 w-full rounded-2xl object-cover"
                    decoding="async"
                    height={1278}
                    loading="lazy"
                    src={blog.cover_image}
                    width={1920}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-v2-surface-container-lowest to-transparent opacity-80" />
                </div>
              ) : (
                <div className="mb-4 h-48 w-full rounded-2xl bg-v2-surface-container-lowest" />
              )}
              <time className="mb-2 block font-v2-label text-[10px] uppercase text-v2-primary/60">
                {formatBlogDateShort(blog.published_at)}
              </time>
              <a
                className="block"
                href={blog.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <h3 className="mb-3 font-v2-headline text-xl font-bold transition-colors group-hover:text-v2-primary">
                  {blog.title}
                </h3>
                <p className="line-clamp-2 text-sm text-v2-on-surface-variant">
                  {blog.description}
                </p>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            className="rounded-full border border-v2-primary/20 bg-v2-surface-container-highest px-8 py-3 font-v2-headline font-bold text-v2-primary transition-all hover:bg-v2-primary hover:text-v2-on-primary"
            href="https://dev.to/shubhamtiwari909"
            rel="noopener noreferrer"
            target="_blank"
          >
            Load More Blogs
          </a>
        </div>
      </div>
    </section>
  );
}
