export const siteMeta = {
  pageTitle: "Portfolio - Full Stack Developer",
  pageDescription:
    "Portfolio of a passionate full-stack developer creating beautiful, functional, and user-friendly web experiences.",
  brandName: "ENGINEER",
} as const;

export const heroContent = {
  eyebrow: "Portfolio",
  titleLine1: "Hi, I'm Shubham Tiwari",
  titleLine2Accent: "Frontend Engineer",
  description:
    "I create beautiful, functional, and user-friendly web experiences that make a difference. Let's build something amazing together.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: {
    label: "Download Resume",
    href: "/Shubham_resume_2026.pdf",
  },
  socialLinks: [
    {
      name: "Code",
      href: "https://dev.to/shubhamtiwari909",
      materialIcon: "code",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/shubham-tiwari-b7544b193/",
      materialIcon: "account_circle",
    },
    {
      name: "GitHub",
      href: "https://github.com/ShubhamTiwari909",
      materialIcon: "terminal",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/supremacism__shubh/",
      materialIcon: "photo_camera",
    },
  ],
} as const;

export const aboutContent = {
  heading: "My Journey",
  paragraphs: [
    "I'm a passionate Frontend Engineer with over 3 years of experience creating beautiful, functional, and user-friendly web applications. I love turning complex problems into simple, elegant solutions.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date with the latest trends in web development.",
  ],
  statBadge: {
    value: "3+",
    label: "Years Experience",
  },
} as const;

export type SkillBar = { name: string; percentage: number };

export type SkillCategoryV2 = {
  title: string;
  materialIcon: string;
  accent: "primary" | "secondary" | "on-surface";
  bars: SkillBar[];
};

export const skillCategoriesV2: SkillCategoryV2[] = [
  {
    title: "Frontend",
    materialIcon: "layers",
    accent: "primary",
    bars: [
      { name: "HTML", percentage: 95 },
      { name: "CSS", percentage: 95 },
      { name: "JavaScript", percentage: 95 },
      { name: "TypeScript", percentage: 88 },
      { name: "Tailwind CSS", percentage: 92 },
      { name: "React", percentage: 95 },
      { name: "Next.js", percentage: 85 },
      { name: "Astro", percentage: 80 },
    ],
  },
  {
    title: "Backend",
    materialIcon: "database",
    accent: "secondary",
    bars: [
      { name: "Node.js", percentage: 90 },
      { name: "MongoDB", percentage: 75 },
      { name: "Express", percentage: 80 },
      { name: "Payload CMS", percentage: 85 },
      { name: "REST API", percentage: 85 },
    ],
  },
  {
    title: "Systems",
    materialIcon: "architecture",
    accent: "on-surface",
    bars: [
      { name: "Git", percentage: 95 },
      { name: "Docker", percentage: 60 },
      { name: "Vercel", percentage: 80 },
      { name: "Figma", percentage: 85 },
      { name: "AI", percentage: 90 },
      { name: "Linting & Formatting", percentage: 90 },
      { name: "Testing (Playwright)", percentage: 80 },
      { name: "Performance Optimization", percentage: 80 },
      { name: "Accessibility", percentage: 80 },
      { name: "SEO", percentage: 80 },
    ],
  },
];

export const experienceContent = {
  sectionTitle: "Growth & Evolution",
  cards: [
    {
      title: "Next.js platform modernization",
      description:
        "Led the migration of legacy frontend applications to Next.js, significantly improving performance, SEO, accessibility, and overall developer experience.",
    },
    {
      title: "Headless CMS & delivery",
      description:
        "Designed and developed a scalable headless CMS using Next.js, Payload CMS, and PostgreSQL, reducing page publishing time by ~80% and accelerating content delivery across teams.",
    },
    {
      title: "Multi-brand CMS setup",
      description:
        "Architected a multi-brand CMS setup using a monorepo, improving code reuse, maintainability, and onboarding speed for new brands.",
    },
    {
      title: "Playwright automation suite",
      description:
        "Implemented a comprehensive Playwright automation suite covering E2E flows, API testing, UI and snapshot tests, accessibility checks, link validation, and authentication workflows.",
    },
    {
      title: "Collaboration with backend, QA, and product teams",
      description:
        "Collaborated closely with backend, QA, and product teams to own frontend delivery and improve product stability and release confidence.",
    },
    {
      title: "Database schema and data migrations",
      description:
        "Performed database schema and data migrations in coordination with Payload CMS and PostgreSQL.",
    },
    {
      title: "Legacy JSP applications maintenance",
      description:
        "Maintained and enhanced legacy JSP applications, contributing to gradual modernization without disrupting production systems.",
    },
  ],
} as const;

export type ProjectEntry = {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  imageAlt: string;
};

export const featuredProjects: ProjectEntry[] = [
  {
    title: "Payload CMS",
    description:
      "A personal blog website content management system built with Next JS, Tailwind CSS, and MongoDB. Features include user authentication, admin dashboard, content management, media management, analytics, pagespeed test, revalidation, and more.",
    tags: ["Next JS", "Tailwind CSS", "MongoDB", "Node JS", "Monorepo"],
    liveUrl: "https://blazing-blogs-frontend.vercel.app",
    imageAlt: "Payload CMS project preview",
  },
  {
    title: "Gemini Zentauri",
    description:
      "An AI powered app to create content and images with a social media app like interface and features",
    tags: [
      "Next JS",
      "Tailwind CSS",
      "MongoDB",
      "Node JS",
      "Express JS",
      "Vercel",
      "AI",
    ],
    liveUrl: "https://gemini-ai-agent.vercel.app/",
    imageAlt: "Gemini Zentauri project preview",
  },
  {
    title: "Static Websites",
    description:
      "A collection of static websites built with React JS, Next JS, and Tailwind CSS. Features include responsive design, animations, and interactive elements.",
    tags: ["React", "Next JS", "Tailwind CSS"],
    liveUrl: null,
    imageAlt: "Static websites collection preview",
  },
];

export const uiShowcaseItems = [
  { title: "Dashboards", materialIcon: "dashboard" },
  { title: "Responsive Websites", materialIcon: "devices" },
  { title: "E-commerce", materialIcon: "shopping_cart" },
  { title: "Landing Pages", materialIcon: "analytics" },
  { title: "Admin Panel", materialIcon: "admin_panel_settings" },
  { title: "Portfolio", materialIcon: "design_services" },
  { title: "CMS Websites", materialIcon: "content_copy" },
  { title: "AI Websites", materialIcon: "ai" },
  { title: "Blogs", materialIcon: "blog" },
] as const;

export const contactContent = {
  locationLine: "Based in India.",
  availabilityLine: "Available for global strategic collaborations.",
  email: "shubhmtiwri00@gmail.com",
  form: {
    nameLabel: "Legal Identity",
    namePlaceholder: "Your Name",
    emailLabel: "Digital Address",
    emailPlaceholder: "Your Email",
    messageLabel: "Subject of Inquiry",
    messagePlaceholder: "How can we grow together?",
    submitLabel: "Send Transmission",
  },
  socialLinks: heroContent.socialLinks,
} as const;

export const footerContent = {
  tagline: "© 2026 Shubham Tiwari. Crafted with precision.",
  links: [
    { label: "GitHub", href: "https://github.com/ShubhamTiwari909" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shubham-tiwari-b7544b193/",
    },
    { label: "Code", href: "https://dev.to/shubhamtiwari909" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/supremacism__shubh/",
    },
  ],
} as const;

export const topNavLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "UI Showcase", href: "#ui-showcase" },
  { label: "Blogs", href: "#blogs" },
] as const;
