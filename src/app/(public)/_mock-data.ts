import type {
  HeroData,
  TeamsData,
  AwardData,
  FeaturedProject,
  PartnersData,
  JournalData,
} from "@/shared/components/sections/homepage.types";
// Static public content extracted from https://www.thirdway.com/ on 2026-09-29.
export const hero = {
  title: "Creation & confidence.\nWithout compromise.",
  description:
    "Thirdway partners with occupiers, owners, and professional teams to create world-class spaces. Combining market-leading design and exceptional delivery to embed confidence at every stage of a project.",
  action: {
    label: "The Thirdway Approach",
    href: "/approach",
  },
  poster:
    "https://www.datocms-assets.com/219766/1787135591-placeholder-frame-sm.png?auto=format&w=1920",
  video:
    "https://www.datocms-assets.com/219766/1787136592-website-hero-video_1080p.mp4",
} as const satisfies HeroData;
export const teams = {
  title: "Six teams.\nOne standard.",
  description:
    "Every project begins with the right people. Thirdway is made up of six bespoke teams, each built around the needs of a different client group and led by subject specialists throughout the project, from concept to completion. This means every client benefits from a team that understands their world, inside and out.",
  action: {
    label: "Meet the teams",
    href: "/people",
  },
  items: [
    {
      id: "studio",
      team: "Studio",
      leader: "Abi Munslow",
      description:
        "Abi Munslow leads the Studio team with a people-first view of design, creating dynamic, collaborative places made to bring out the best in people.",
      mobileDescription:
        "Studio prides itself on vibrant, culture-led spaces that are shaped around the people who own and occupy them. Abi Munslow leads the team with a people-first view of design, creating dynamic, collaborative places made to bring out the best in people.",
      image: {
        src: "https://www.datocms-assets.com/219766/1788270813-abi_munslow_05.jpg?auto=format&w=400",
        alt: "Abi Munslow",
      },
      href: "https://www.thirdway.com/people#studio",
      signatureImage: {
        desktop:
          "https://www.datocms-assets.com/219766/1787847963-abimunslow-w.svg",
        mobile:
          "https://www.datocms-assets.com/219766/1787847942-abimunslow.svg",
        width: 466,
        height: 451,
        desktopWidth: 60,
        mobileWidth: 74,
      },
    },
    {
      id: "tailored",
      team: "Tailored",
      leader: "Duncan Taylor",
      description:
        "Duncan Taylor leads the Tailored team with a focus on creating high-quality, flexible environments that hold their appeal and their value, over time.",
      mobileDescription:
        "Tailored consistently delivers skilful and precise design, at pace, on large-scale, complex projects. Duncan Taylor leads the Tailored team with a focus on creating high-quality, flexible environments that hold their appeal, and their value, over time.",
      image: {
        src: "https://www.datocms-assets.com/219766/1788270814-duncan_taylor_02.jpg?auto=format&w=400",
        alt: "Duncan Taylor",
      },
      href: "https://www.thirdway.com/people#tailored",
      signatureImage: {
        desktop:
          "https://www.datocms-assets.com/219766/1788271586-duncantaylor-w.svg",
        mobile:
          "https://www.datocms-assets.com/219766/1788271616-duncantaylor.svg",
        width: 628,
        height: 366,
        desktopWidth: 100,
        mobileWidth: 124,
      },
    },
    {
      id: "curate",
      team: "Curate",
      leader: "Liam Spencer",
      description:
        "Liam Spencer leads Curate, a team of designers, architects and furniture consultants drawn from globally renowned practices.",
      mobileDescription:
        "Curate sits between the strategic rigour of traditional architecture & the cost, pace, and certainty of modern D&B solutions. Not a compromise between the two. A position that draws on both. Liam Spencer leads his team of designers, architects and furniture consultants drawn from globally renowned practices.",
      image: {
        src: "https://www.datocms-assets.com/219766/1788270575-liam_spencer_05.jpg?auto=format&w=400",
        alt: "Liam Spencer",
      },
      href: "https://www.thirdway.com/people#curate",
      signatureImage: {
        desktop:
          "https://www.datocms-assets.com/219766/1787847842-liamspencer-w.svg",
        mobile:
          "https://www.datocms-assets.com/219766/1787847826-liamspencer.svg",
        width: 2053,
        height: 521,
        desktopWidth: 175,
        mobileWidth: 217,
      },
    },
    {
      id: "boutique",
      team: "Boutique",
      leader: "Trish Watson",
      description:
        "Trish Watson leads the Boutique team on the highest shared standards: thoughtful, polished and highly ambitious.",
      mobileDescription:
        "Boutique is known for creating high-end spaces that balance elegance with timeless craft. Refined environments, in some of London’s most distinctive buildings. Trish Watson leads the team on the highest shared standards: thoughtful, polished and highly ambitious.  ",
      image: {
        src: "https://www.datocms-assets.com/219766/1788270578-trish_watson_03.jpg?auto=format&w=400",
        alt: "Trish Watson",
      },
      href: "https://www.thirdway.com/people#boutique",
      signatureImage: {
        desktop:
          "https://www.datocms-assets.com/219766/1787761282-trishwatson-w.svg",
        mobile:
          "https://www.datocms-assets.com/219766/1787761297-trishwatson.svg",
        width: 853,
        height: 422,
        desktopWidth: 100,
        mobileWidth: 124,
      },
    },
    {
      id: "anomaly",
      team: "Anomaly",
      leader: "Petr Esposito",
      description:
        "Petr Esposito leads the Anomaly team with a human-centred approach, creating places that balance heritage, user experience and long-term value.",
      mobileDescription:
        "Anomaly challenges traditional architecture, taking a holistic view that interconnects interiors and architecture processes. Petr Esposito leads the team with a human-centred approach, creating places that balance heritage, user experience and long-term value.",
      image: {
        src: "https://www.datocms-assets.com/219766/1788270578-petr_esposito_06.jpg?auto=format&w=400",
        alt: "Petr Esposito",
      },
      href: "https://www.thirdway.com/people#anomaly",
      signatureImage: {
        desktop:
          "https://www.datocms-assets.com/219766/1787761317-petrespacito-w.svg",
        mobile:
          "https://www.datocms-assets.com/219766/1787761322-petrespacito.svg",
        width: 828,
        height: 472,
        desktopWidth: 100,
        mobileWidth: 124,
      },
    },
    {
      id: "inspire",
      team: "Inspire",
      leader: "Paul Gaffney",
      description:
        "Paul Gaffney leads the Inspire team with a focus on getting the fundamentals right: programme, cost, compliance and communication.",
      mobileDescription:
        "Inspire brings decades of experience leading complex schemes, offering clarity and control where it matters most. Paul Gaffney leads the team with a focus on getting the fundamentals right: programme, cost, compliance and communication.",
      image: {
        src: "https://www.datocms-assets.com/219766/1788270575-paul_gaffney_04.jpg?auto=format&w=400",
        alt: "Paul Gaffney",
      },
      href: "https://www.thirdway.com/people#inspire",
      signatureImage: {
        desktop:
          "https://www.datocms-assets.com/219766/1787761356-paulgaffney-w.svg",
        mobile:
          "https://www.datocms-assets.com/219766/1787761361-paulgaffney.svg",
        width: 755,
        height: 440,
        desktopWidth: 100,
        mobileWidth: 124,
      },
    },
  ],
} as const satisfies TeamsData;
export const award = {
  title: "FX's Interior Design Practice of the Year",
  description:
    "A million sq ft delivered each year across six specialist teams.",
} as const satisfies AwardData;
export const projects = [
  {
    id: "zopa",
    title: "Zopa",
    location: "Canary Wharf",
    category: "CAT B",
    href: "https://www.thirdway.com/project/zopa",
    image: {
      src: "https://www.datocms-assets.com/219766/1783090636-251022-zopa-2.webp?auto=format&w=1440",
      srcSet:
        "https://www.datocms-assets.com/219766/1783090636-251022-zopa-2.webp?auto=format&dpr=0.25&w=1440 360w,https://www.datocms-assets.com/219766/1783090636-251022-zopa-2.webp?auto=format&dpr=0.5&w=1440 720w,https://www.datocms-assets.com/219766/1783090636-251022-zopa-2.webp?auto=format&dpr=0.75&w=1440 1080w,https://www.datocms-assets.com/219766/1783090636-251022-zopa-2.webp?auto=format&w=1440 1440w",
      sizes: "100vw",
      alt: "Zopa",
    },
    quote:
      "Thirdway were brilliant at helping design a space that worked for Zopa but was also something the landlord was happy to inherit further down the line, focusing on permanent fixtures like flooring and joinery that will suit future occupiers, while allowing brand-specific touches to shine. Thirdway’s prior experience with both us and the landlord enabled streamlined communications and approvals,  keeping the project moving efficiently.",
    author: "Emily Dickens",
    position: "Head of Experience, Zopa",
  },
  {
    id: "russell-reynolds-associates",
    title: "Russell Reynolds Associates",
    location: "St.James",
    category: "CAT B",
    href: "https://www.thirdway.com/project/russell-reynolds-associates",
    image: {
      src: "https://www.datocms-assets.com/219766/1783325835-250531-russel-reynolds-3rd-floor-03.webp?auto=format&w=1440",
      srcSet:
        "https://www.datocms-assets.com/219766/1783325835-250531-russel-reynolds-3rd-floor-03.webp?auto=format&dpr=0.25&w=1440 360w,https://www.datocms-assets.com/219766/1783325835-250531-russel-reynolds-3rd-floor-03.webp?auto=format&dpr=0.5&w=1440 720w,https://www.datocms-assets.com/219766/1783325835-250531-russel-reynolds-3rd-floor-03.webp?auto=format&dpr=0.75&w=1440 1080w,https://www.datocms-assets.com/219766/1783325835-250531-russel-reynolds-3rd-floor-03.webp?auto=format&w=1440 1440w",
      sizes: "100vw",
      alt: "Russell Reynolds Associates",
    },
    quote:
      "It's been a privilege working with such a dedicated team across firms, cities, and disciplines — and the end result speaks for itself. A beautiful space, expertly delivered. Looking forward to the next one already.",
    author: "Scott Stevens",
    position: "Director, Russell Reynolds Associates",
  },
  {
    id: "university-of-hull-london",
    title: "University of Hull London",
    location: "Stratford",
    category: "CAT B",
    href: "https://www.thirdway.com/project/university-of-hull-london",
    image: {
      src: "https://www.datocms-assets.com/219766/1789553161-260612-ceg-71.webp?auto=format&w=1440",
      srcSet:
        "https://www.datocms-assets.com/219766/1789553161-260612-ceg-71.webp?auto=format&dpr=0.25&w=1440 360w,https://www.datocms-assets.com/219766/1789553161-260612-ceg-71.webp?auto=format&dpr=0.5&w=1440 720w,https://www.datocms-assets.com/219766/1789553161-260612-ceg-71.webp?auto=format&dpr=0.75&w=1440 1080w,https://www.datocms-assets.com/219766/1789553161-260612-ceg-71.webp?auto=format&w=1440 1440w",
      sizes: "100vw",
      alt: "University of Hull London",
    },
    quote:
      "Thirdway are such an incredible group of experts. It has been a joy and one of the most exciting projects of my career. We trusted our gut, and our gut told us Thirdway. Thank goodness it did.",
    author: "Fiona Young",
    position: "Director of University Partnerships, CEG",
  },
  {
    id: "john-laing",
    title: "John Laing",
    location: "Covent Garden",
    category: "CAT B",
    href: "https://www.thirdway.com/project/john-laing",
    image: {
      src: "https://www.datocms-assets.com/219766/1787762930-260425-john-laing-5.webp?auto=format&w=1440",
      srcSet:
        "https://www.datocms-assets.com/219766/1787762930-260425-john-laing-5.webp?auto=format&dpr=0.25&w=1440 360w,https://www.datocms-assets.com/219766/1787762930-260425-john-laing-5.webp?auto=format&dpr=0.5&w=1440 720w,https://www.datocms-assets.com/219766/1787762930-260425-john-laing-5.webp?auto=format&dpr=0.75&w=1440 1080w,https://www.datocms-assets.com/219766/1787762930-260425-john-laing-5.webp?auto=format&w=1440 1440w",
      sizes: "100vw",
      alt: "John Laing",
    },
    quote:
      "Thirdway are such an incredible group of experts. It has been a joy and one of the most exciting projects of my career. We trusted our gut, and our gut told us Thirdway. Thank goodness it did.",
    author: "Fiona Young",
    position: "Director of University Partnerships, CEG",
  },
] as const satisfies readonly FeaturedProject[];
export const partners = {
  title: "In good company",
  description:
    "Many of our projects come from clients who choose to work with us time and again. Others are introduced through the professional relationships we’ve built over time. From household brands to the most trusted names in property, our partnerships are designed to continue beyond handover.",
  logos: [
    {
      id: "1",
      src: "https://www.datocms-assets.com/219766/1782203402-legalandgeneral.png?auto=format&w=360",
      alt: "legalandgeneral",
    },
    {
      id: "2",
      src: "https://www.datocms-assets.com/219766/1787913972-michael-kors_blk-copy.png?auto=format&w=360",
      alt: "michael-kors_blk-copy",
    },
    {
      id: "3",
      src: "https://www.datocms-assets.com/219766/1787914005-synthesia.png?auto=format&w=360",
      alt: "synthesia",
    },
    {
      id: "4",
      src: "https://www.datocms-assets.com/219766/1787914023-vitra_wht.png?auto=format&w=360",
      alt: "vitra_wht",
    },
    {
      id: "5",
      src: "https://www.datocms-assets.com/219766/1787916740-hibob-logo.svg?auto=format&w=360",
      alt: "hibob-logo",
    },
    {
      id: "6",
      src: "https://www.datocms-assets.com/219766/1787917190-zopa-logo.svg?auto=format&w=360",
      alt: "zopa-logo",
    },
    {
      id: "7",
      src: "https://www.datocms-assets.com/219766/1787917324-allspring-logo.png?auto=format&w=360",
      alt: "allspring-logo",
    },
    {
      id: "8",
      src: "https://www.datocms-assets.com/219766/1787917338-banque-pictet-cie-logo-white.png?auto=format&w=360",
      alt: "banque-pictet-cie-logo-white",
    },
    {
      id: "9",
      src: "https://www.datocms-assets.com/219766/1787917481-kinrise_black_rgb.svg?auto=format&w=360",
      alt: "kinrise_black_rgb",
    },
    {
      id: "10",
      src: "https://www.datocms-assets.com/219766/1787917590-johnlaing.svg?auto=format&w=360",
      alt: "johnlaing",
    },
    {
      id: "11",
      src: "https://www.datocms-assets.com/219766/1787917727-cleo-logo-blk.png?auto=format&w=360",
      alt: "cleo-logo-blk",
    },
    {
      id: "12",
      src: "https://www.datocms-assets.com/219766/1788366394-cwg-logo-white.png?auto=format&w=360",
      alt: "cwg-logo-white",
    },
    {
      id: "13",
      src: "https://www.datocms-assets.com/219766/1788366540-sephora-logo.png?auto=format&w=360",
      alt: "sephora-logo",
    },
    {
      id: "14",
      src: "https://www.datocms-assets.com/219766/1788366706-netjets.svg?auto=format&w=360",
      alt: "netjets",
    },
    {
      id: "15",
      src: "https://www.datocms-assets.com/219766/1788424762-maslows_logo_mono.png?auto=format&w=360",
      alt: "maslows_logo_mono",
    },
    {
      id: "16",
      src: "https://www.datocms-assets.com/219766/1782203402-cbre.png?auto=format&w=360",
      alt: "cbre",
    },
    {
      id: "17",
      src: "https://www.datocms-assets.com/219766/1787913992-russel-reynolds.png?auto=format&w=360",
      alt: "russel-reynolds",
    },
    {
      id: "18",
      src: "https://www.datocms-assets.com/219766/1787914013-tui_logo_2016-svg.png?auto=format&w=360",
      alt: "tui_logo_2016-svg",
    },
    {
      id: "19",
      src: "https://www.datocms-assets.com/219766/1787914170-synthomer_logo-svg.png?auto=format&w=360",
      alt: "synthomer_logo-svg",
    },
    {
      id: "20",
      src: "https://www.datocms-assets.com/219766/1787916816-bl-logo-b.svg?auto=format&w=360",
      alt: "bl-logo-b",
    },
    {
      id: "21",
      src: "https://www.datocms-assets.com/219766/1787917291-logo-butternut-box.png?auto=format&w=360",
      alt: "logo-butternut-box",
    },
    {
      id: "22",
      src: "https://www.datocms-assets.com/219766/1787917331-airwallex_logo-2025.png?auto=format&w=360",
      alt: "airwallex_logo-2025",
    },
    {
      id: "23",
      src: "https://www.datocms-assets.com/219766/1787917449-sequoia-capital-vector-logo.png?auto=format&w=360",
      alt: "sequoia-capital-vector-logo",
    },
    {
      id: "24",
      src: "https://www.datocms-assets.com/219766/1787917530-royal-london.svg?auto=format&w=360",
      alt: "royal-london",
    },
    {
      id: "25",
      src: "https://www.datocms-assets.com/219766/1787917646-nyetimber.svg?auto=format&w=360",
      alt: "nyetimber",
    },
    {
      id: "26",
      src: "https://www.datocms-assets.com/219766/1788366378-capstone-white-logo.png?auto=format&w=360",
      alt: "capstone-white-logo",
    },
    {
      id: "27",
      src: "https://www.datocms-assets.com/219766/1788366501-bam-logo.png?auto=format&w=360",
      alt: "bam-logo",
    },
    {
      id: "28",
      src: "https://www.datocms-assets.com/219766/1788510198-nfl-logo-bw-copy.png?auto=format&w=360",
      alt: "nfl-logo-bw-copy",
    },
    {
      id: "29",
      src: "https://www.datocms-assets.com/219766/1788366838-reddit_logo_wordmark.svg?auto=format&w=360",
      alt: "reddit_logo_wordmark",
    },
    {
      id: "30",
      src: "https://www.datocms-assets.com/219766/1788424785-revantage.png?auto=format&w=360",
      alt: "revantage",
    },
  ],
} as const satisfies PartnersData;
export const journal = {
  title: "The Thirdway Journal",
  action: {
    label: "View all",
    href: "https://www.thirdway.com/journal",
  },
  items: [
    {
      id: "behind-the-build-the-campus-in-the-sky",
      title: "Behind the Build: The Campus in the Sky",
      href: "https://www.thirdway.com/journal/behind-the-build-the-campus-in-the-sky",
      image: {
        src: "https://www.datocms-assets.com/219766/1789556837-260612-ceg-2.webp?auto=format&w=680",
        alt: "Behind the Build: The Campus in the Sky",
      },
      date: {
        day: "16",
        month: "09",
        year: "2026",
      },
      accent: "cream",
    },
    {
      id: "behind-the-build-meet-abi-munslow",
      title: "Behind the Build: Meet Abi Munslow",
      href: "https://www.thirdway.com/journal/behind-the-build-meet-abi-munslow",
      image: {
        src: "https://www.datocms-assets.com/219766/1782457780-opt_vffti0ufrvym3tvzqnderg.jpg?auto=format&w=680",
        alt: "Behind the Build: Meet Abi Munslow",
      },
      date: {
        day: "12",
        month: "05",
        year: "2026",
      },
      accent: "yellow",
    },
    {
      id: "what-is-the-industry-still-getting-wrong-about-sustainable-offices",
      title:
        "What is the industry still getting wrong about sustainable offices?",
      href: "https://www.thirdway.com/journal/what-is-the-industry-still-getting-wrong-about-sustainable-offices",
      image: {
        src: "https://www.datocms-assets.com/219766/1782461873-241120-one-derry-st-20.webp?auto=format&w=680",
        alt: "What is the industry still getting wrong about sustainable offices?",
      },
      date: {
        day: "22",
        month: "04",
        year: "2026",
      },
      accent: "blue",
    },
  ],
} as const satisfies JournalData;
