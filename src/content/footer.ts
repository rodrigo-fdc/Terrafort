export type FooterLink = {
  label: string;
  href: string;
  external: boolean;
  newTab: boolean;
};

// Reference content only: replace this configuration when applying client branding.
export const footerContent = {
  reference: "https://www.thirdway.com/",
  referenceOnly: true,
  brand: "Thirdway",
  logo: "/template/site/footer/logo.svg",
  image: "/template/site/footer/contact.jpg",
  statement: "If you’re looking to build an exceptional space, [let’s talk.]",
  address: ["224 St John Street,", "London, EC1V 4PH"],
  email: "hello@thirdway.com",
  navigation: [
    {
      label: "Approach",
      href: "/approach",
      external: false,
      newTab: false,
    },
    {
      label: "Services",
      href: "/services",
      external: false,
      newTab: false,
    },
    {
      label: "People",
      href: "/people",
      external: false,
      newTab: false,
    },
    {
      label: "Projects",
      href: "https://www.thirdway.com/projects",
      external: true,
      newTab: false,
    },
    {
      label: "Vision & Values",
      href: "https://www.thirdway.com/vision-and-values",
      external: true,
      newTab: false,
    },
    {
      label: "Our Home",
      href: "https://www.thirdway.com/our-home",
      external: true,
      newTab: false,
    },
    {
      label: "ESG",
      href: "https://www.thirdway.com/esg",
      external: true,
      newTab: false,
    },
    {
      label: "Journal",
      href: "https://www.thirdway.com/journal",
      external: true,
      newTab: false,
    },
  ],
  legal: [
    {
      label: "Careers",
      href: "https://www.thirdway.com/careers",
      external: true,
      newTab: false,
    },
    {
      label: "Governance",
      href: "https://www.thirdway.com/governance",
      external: true,
      newTab: false,
    },
    {
      label: "Privacy Policy",
      href: "https://www.thirdway.com/privacy-policy",
      external: true,
      newTab: false,
    },
    {
      label: "Cookies",
      href: "https://www.thirdway.com/cookie-policy",
      external: true,
      newTab: false,
    },
    {
      label: "Anti-Competitive Practices",
      href: "https://www.thirdway.com/anti-competitive-practices",
      external: true,
      newTab: false,
    },
    {
      label: "Modern Slavery & Human Trafficking Statement",
      href: "https://www.thirdway.com/modern-slavery-and-human-trafficking-statement",
      external: true,
      newTab: false,
    },
    {
      label: "Corporate Social Responsibility",
      href: "https://www.thirdway.com/csr-policy",
      external: true,
      newTab: false,
    },
    {
      label: "Equal Opportunities",
      href: "https://www.thirdway.com/equal-opportunities-policy",
      external: true,
      newTab: false,
    },
  ],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/wearethirdway/",
      external: true,
      newTab: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/wearethirdway/",
      external: true,
      newTab: true,
    },
  ],
  copyright: "© 2026 Thirdway",
  credits: [
    {
      prefix: "Brand & Website by",
      label: "How&How",
      href: "https://howandhow.com",
    },
    {
      prefix: "Built by",
      label: "Hambly Freeman",
      href: "https://hamblyfreeman.com",
    },
  ],
  comparisons: [
    {
      distance: 1,
      text: "That’s the height of [One Smart's Place reception desk].",
      image: "/template/site/footer/comparison-1.webp",
      href: "https://www.thirdway.com/projects/one-smarts-place",
    },
    {
      distance: 2,
      text: "That’s the length of [Synthesia's breakfast bar].",
      image: "/template/site/footer/comparison-2.webp",
      href: "https://www.thirdway.com/projects/synthesia",
    },
    {
      distance: 3,
      text: "That’s the length of [Butternut Box's boardrom table].",
      image: "/template/site/footer/comparison-3.webp",
      href: "https://www.thirdway.com/projects/butternut-box",
    },
    {
      distance: 4,
      text: "That’s the width of [Thirdway's lobby screen].",
      image: "/template/site/footer/comparison-4.webp",
      href: "https://www.thirdway.com/projects/thirdways-hq",
    },
    {
      distance: 5,
      text: "That’s the arch of [Arclight's teapoint].",
      image: "/template/site/footer/comparison-5.webp",
      href: "https://www.thirdway.com/projects/arclight",
    },
    {
      distance: 6,
      text: "That’s the length of [Thirdway's roof terrace].",
      image: "/template/site/footer/comparison-6.webp",
      href: "https://www.thirdway.com/projects/thirdways-hq",
    },
    {
      distance: 7,
      text: "That’s the length of [John Laing's hallway].",
      image: "/template/site/footer/comparison-7.webp",
      href: "https://www.thirdway.com/projects/john-laing",
    },
    {
      distance: 8,
      text: "That’s the length of [Airwallex’s couch].",
      image: "/template/site/footer/comparison-8.webp",
      href: "https://www.thirdway.com/projects/airwallex",
    },
    {
      distance: 9,
      text: "That’s the height of [One Derry Street's lobby door].",
      image: "/template/site/footer/comparison-9.webp",
      href: "https://www.thirdway.com/projects/one-derry-street",
    },
    {
      distance: 10,
      text: "That’s the length of [Russell Reynold's event space].",
      image: "/template/site/footer/comparison-10.webp",
      href: "https://www.thirdway.com/projects/russell-reynolds-associates",
    },
    {
      distance: 20,
      text: "That’s that diameter of [Asticus].",
      image: "/template/site/footer/comparison-11.webp",
      href: "https://www.thirdway.com/projects/asticus",
    },
  ],
  labels: {
    explore: "Explore",
    findUs: "Find us",
    email: "Email",
    follow: "Follow us",
    legal: "Legal information",
    navigation: "Footer navigation",
    contactTitle: "Let’s talk...",
    close: "Close contact form",
    send: "Prepare email",
    delivery:
      "Your email application opens with a draft. Nothing is sent by this page.",
    privacy: "I have read and agree to Thirdway’s Privacy Policy.",
  },
  departments: [
    {
      label: "General Enquiry",
      value: "general",
      email: "hello@thirdway.com",
    },
    {
      label: "New Business",
      value: "business",
      email: "hello@thirdway.com",
    },
    {
      label: "Recruitment",
      value: "recruitment",
      email: "talent@thirdway.com",
    },
    {
      label: "Supplier Enquiry",
      value: "supplier",
      email: "supplier@thirdway.com",
    },
  ],
} as const;
