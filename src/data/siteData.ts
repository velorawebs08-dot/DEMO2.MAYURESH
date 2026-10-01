export interface SoulCinemaPoint {
  number: string;
  title: string;
}

export interface SoulCinemaData {
  scriptKicker: string;
  heading: string;
  paragraph: string;
  videoUrl: string;
  posterImage: string;
  points: SoulCinemaPoint[];
  ctaText: string;
  ctaLink: string;
}

export interface PortfolioImage {
  url: string;
  caption?: string;
  aspectRatio?: 'vertical' | 'horizontal' | 'square';
}

export interface PortfolioItem {
  slug: string;
  names: string;
  location: string;
  seasonYear: string;
  coverImage: string;
  category: string;
  description: string;
  filmFormat?: string;
  images: PortfolioImage[];
}

export interface FilmItem {
  id: string;
  title: string;
  italicTitle?: string;
  thumbnail: string;
  videoUrl: string;
  embedUrl: string;
  duration: string;
  location: string;
  featured?: boolean;
  synopsis?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  place: string;
  quote: string;
}

export interface TestimonialsSectionData {
  scriptKicker: string;
  heading: string;
  testimonials: TestimonialItem[];
}

export interface PhotographyGalleryPhoto {
  id: string;
  storySlug: string;
  storyName: string;
  url: string;
  alt: string;
  aspect: 'tall' | 'wide';
}

export interface PhotographyStoryGroup {
  storySlug: string;
  storyName: string;
  photos: {
    url: string;
    alt: string;
    aspect: 'tall' | 'wide';
  }[];
}

export interface FilmGalleryItem {
  id: string;
  src: string;
  title: string;
  descriptionLine1: string;
  descriptionLine2: string;
}

export interface SelectedFilmItem {
  id: string;
  thumbnail: string;
  link: string;
  alt: string;
}

export interface SelectedFilmsData {
  scriptKicker: string;
  heading: string;
  paragraph: string;
  videos: SelectedFilmItem[];
}

export interface SiteData {
  brand: {
    name: string;
    tagline: string;
    logo: string;
    heroVideo: string;
    monogram: string;
    established: string;
    scriptHeroAccent: string;
    serifHeroTitle: string;
    heroCtaText: string;
  };
  navigation: {
    left: { label: string; href: string }[];
    right: { label: string; href: string }[];
  };
  contact: {
    phone: string;
    whatsapp: string;
    whatsappMessage: string;
    email: string;
    address: string;
    officeHours: string;
    mapLink: string;
    inquiriesBlurb: string;
  };
  socials: {
    instagram: string;
    youtube: string;
    facebook: string;
  };
  intro: {
    headingLine1: string;
    headingLine2: string;
    bodyLine1: string;
    bodyLine2: string;
    cards: {
      label: string;
      image: string;
      alt: string;
      link: string;
    }[];
    buttonText: string;
    buttonLink: string;
  };
  photographyGallery: {
    heading: string;
    description: string;
    stories: PhotographyStoryGroup[];
    shuffledPhotos: PhotographyGalleryPhoto[];
  };
  filmsGallery: {
    heading: string;
    description: string;
    videos: FilmGalleryItem[];
  };
  storytelling: {
    scriptKicker: string;
    heading: string;
    italicSubtitle: string;
    paragraph: string;
    ctaText: string;
    ctaLink: string;
  };
  storytellingImages: string[];
  filmsVideo: string;
  soulCinema: SoulCinemaData;
  portfolio: PortfolioItem[];
  films: FilmItem[];
  testimonials: TestimonialItem[];
  testimonialsSection: TestimonialsSectionData;
  selectedFilms: SelectedFilmsData;
  about?: {
    scriptKicker: string;
    name: string;
    title: string;
    text: string[];
    image: string;
    buttonText: string;
    buttonLink: string;
    signature: string;
  };
  cta: {
    bgImage: string;
    bgVideo?: string;
    serifHeading: string;
    scriptOverlay: string;
    buttonText: string;
  };
}

export const siteData: SiteData = {
  brand: {
    name: "AURA & KIN",
    tagline: "Quiet, luminous editorial photography & 16mm cinematography for deliberate souls.",
    logo: "/images/studio-logo.png",
    heroVideo: "https://www.image2url.com/r2/default/videos/1790649972936-a313ee75-2ba7-4414-a84d-6e88650c7842.mp4",
    monogram: "A & K",
    established: "EST. 2018",
    scriptHeroAccent: "capturing",
    serifHeroTitle: "TIMELESS STORIES",
    heroCtaText: "VIEW PORTFOLIO",
  },
  navigation: {
    left: [
      { label: "HOME", href: "#home" },
      { label: "PHOTOGRAPHY", href: "#photography" },
      { label: "FILMS", href: "#films" },
    ],
    right: [
      { label: "STORYTELLING", href: "#storytelling" },
      { label: "TESTIMONIALS", href: "#testimonials" },
      { label: "CONTACT", href: "#contact" },
    ],
  },
  contact: {
    phone: "+91 95959 55220",
    whatsapp: "+919595955220",
    whatsappMessage: "Hello, I would like to inquire about photography & films.",
    email: "inquiries@aurakin-studio.com",
    address: "742 Montgomery Street, Suite 4, San Francisco, CA 94111",
    officeHours: "Monday – Saturday by appointment",
    mapLink: "https://maps.google.com/?q=San+Francisco+CA",
    inquiriesBlurb: "We accept a strictly limited number of wedding commissions and creative editorial projects each calendar year to ensure devotion, stillness, and impeccable craft.",
  },
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  intro: {
    headingLine1: "PHOTOGRAPHY",
    headingLine2: "",
    bodyLine1: "Mayuresh captures real emotions, quiet glances and big celebrations.",
    bodyLine2: "So years from now, you can return to your photographs and feel it all over again.",
    cards: [
      {
        label: "WEDDING CEREMONY",
        image: "/images/philosophy_1.jpg",
        alt: "Wedding ceremony photograph",
        link: "#portfolio",
      },
      {
        label: "COUPLE MOVEMENTS",
        image: "/images/philosophy_2.jpg",
        alt: "Couple movements celebration portrait",
        link: "#portfolio",
      },
      {
        label: "COUPLE PORTRAIT",
        image: "/images/philosophy_3_v2.jpg",
        alt: "Fine-art couple portrait",
        link: "#portfolio",
      },
      {
        label: "COUPLE MOMENTS",
        image: "/images/philosophy_4.jpg",
        alt: "Candid couple moments photography",
        link: "#portfolio",
      },
      {
        label: "WEDDING PORTRAIT",
        image: "/images/sec2_img1.jpg",
        alt: "Fine-art wedding portrait",
        link: "#portfolio",
      },
      {
        label: "CANDID MOMENTS",
        image: "/images/sec2_img2.jpg",
        alt: "Candid wedding moments",
        link: "#portfolio",
      },
      {
        label: "ENGAGEMENT",
        image: "/images/sec2_img3.jpg",
        alt: "Intimate engagement portrait",
        link: "#portfolio",
      },
      {
        label: "LOVE STORIES",
        image: "/images/sec2_img4.jpg",
        alt: "Atmospheric love stories celebration",
        link: "#portfolio",
      },
    ],
    buttonText: "Explore More",
    buttonLink: "#photography-gallery",
  },
  photographyGallery: {
    heading: "HONEST AND ELEGANT",
    description: "We believe the most beautiful moments are the unplanned ones, a shared laugh, a tender glance, a tearful hug. Our approach is calm, natural and unobtrusive, so you stay relaxed while every heartfelt detail is preserved with elegance.",
    stories: [
      {
        storySlug: "preet-and-anisha",
        storyName: "Preet & Anisha",
        photos: [
          {
            url: "https://i.postimg.cc/hGLw11tM/Save-Clip-App-687412473-18065263070699200-6627715729941070460-n-jpg-(1).jpg",
            alt: "Preet & Anisha ceremony portraiture",
            aspect: "tall",
          },
          {
            url: "https://i.postimg.cc/K84pg5nh/Save-Clip-App-689898441-18065263172699200-2403307910708481016-n-jpg.jpg",
            alt: "Sacred canopy rituals and blessings",
            aspect: "wide",
          },
          {
            url: "https://i.postimg.cc/tR2ztxRG/Save-Clip-App-688930588-18065263190699200-6956331044914275211-n-(1)-jpg.jpg",
            alt: "Stolen glances through architectural arches",
            aspect: "tall",
          },
        ],
      },
      {
        storySlug: "tanvish-and-srushti",
        storyName: "Tanvish & Srushti",
        photos: [
          {
            url: "https://i.postimg.cc/B6YG2BmV/Save-Clip-App-753933137-18076019171699200-5290634338121356592-n-jpg.jpg",
            alt: "Tanvish & Srushti wedding portrait",
            aspect: "tall",
          },
          {
            url: "https://i.postimg.cc/C16WRL1M/Save-Clip-App-753652039-18076019210699200-3365365113919994575-n-jpg.jpg",
            alt: "Joyful celebration ceremony with family",
            aspect: "wide",
          },
          {
            url: "https://i.postimg.cc/6prJMXHf/Save-Clip-App-753954049-18076019231699200-3319415317381893815-n-jpg.jpg",
            alt: "Bridal artistry and quiet wedding moments",
            aspect: "tall",
          },
        ],
      },
      {
        storySlug: "sarvesh-and-shraddha",
        storyName: "Sarvesh & Shraddha",
        photos: [
          {
            url: "https://i.postimg.cc/TPwjhbP1/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
            alt: "Sarvesh & Shraddha regal beginning",
            aspect: "tall",
          },
          {
            url: "https://i.postimg.cc/rpFjWbQG/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
            alt: "Sacred ceremonies beneath ornate archways",
            aspect: "wide",
          },
          {
            url: "https://i.postimg.cc/nh79Kdqf/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
            alt: "Palace corridors and golden light",
            aspect: "tall",
          },
        ],
      },
      {
        storySlug: "shridar-and-ashwini",
        storyName: "Shridar & Ashwini",
        photos: [
          {
            url: "https://i.postimg.cc/bvmy1bVZ/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(4)-j.jpg",
            alt: "Shridar & Ashwini palace portrait",
            aspect: "tall",
          },
          {
            url: "https://i.postimg.cc/YjBMtx0d/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(3)-j.jpg",
            alt: "Floral canopy vows and sacred pheras",
            aspect: "wide",
          },
          {
            url: "https://i.postimg.cc/MHQzkL6B/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(1)-j.jpg",
            alt: "Quiet bridal preparation and jewelry details",
            aspect: "tall",
          },
        ],
      },
    ],
    shuffledPhotos: [
      {
        id: "photo-p03",
        storySlug: "photography",
        storyName: "Photography Collection",
        url: "/images/philosophy_3_v2.jpg",
        alt: "Fine-art couple portrait",
        aspect: "tall",
      },
      {
        id: "photo-s01-b",
        storySlug: "preet-and-anisha",
        storyName: "Preet & Anisha",
        url: "https://i.postimg.cc/K84pg5nh/Save-Clip-App-689898441-18065263172699200-2403307910708481016-n-jpg.jpg",
        alt: "Sacred canopy rituals and blessings",
        aspect: "wide",
      },
      {
        id: "photo-s04-ext2",
        storySlug: "shridar-and-ashwini",
        storyName: "Shridar & Ashwini",
        url: "https://i.postimg.cc/Dy1bLjrm/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(6)-j.jpg",
        alt: "Sunset pheras surrounded by soft golden light",
        aspect: "wide",
      },
      {
        id: "photo-p07",
        storySlug: "photography",
        storyName: "Photography Collection",
        url: "/images/sec2_img3.jpg",
        alt: "Intimate engagement portrait",
        aspect: "tall",
      },
      {
        id: "photo-s03-a",
        storySlug: "sarvesh-and-shraddha",
        storyName: "Sarvesh & Shraddha",
        url: "https://i.postimg.cc/TPwjhbP1/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
        alt: "Sarvesh & Shraddha regal beginning",
        aspect: "tall",
      },
      {
        id: "photo-s02-ext",
        storySlug: "tanvish-and-srushti",
        storyName: "Tanvish & Srushti",
        url: "https://i.postimg.cc/sDSgCb6J/Save-Clip-App-753225118-18076019183699200-2410993381969297639-n-jpg.jpg",
        alt: "Intimate glances during the wedding vows",
        aspect: "tall",
      },
      {
        id: "photo-p01",
        storySlug: "photography",
        storyName: "Photography Collection",
        url: "/images/philosophy_1.jpg",
        alt: "Wedding ceremony photograph",
        aspect: "tall",
      },
      {
        id: "photo-s04-b",
        storySlug: "shridar-and-ashwini",
        storyName: "Shridar & Ashwini",
        url: "https://i.postimg.cc/YjBMtx0d/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(3)-j.jpg",
        alt: "Floral canopy vows and sacred pheras",
        aspect: "wide",
      },
      {
        id: "photo-s01-ext",
        storySlug: "preet-and-anisha",
        storyName: "Preet & Anisha",
        url: "https://i.postimg.cc/Bvz0K6LS/Save-Clip-App-687529356-18065263079699200-7430590239601520-n-jpg.jpg",
        alt: "Quiet embrace before the royal festivities",
        aspect: "tall",
      },
      {
        id: "photo-p05",
        storySlug: "photography",
        storyName: "Photography Collection",
        url: "/images/sec2_img1.jpg",
        alt: "Fine-art wedding portrait",
        aspect: "tall",
      },
      {
        id: "photo-s03-ext",
        storySlug: "sarvesh-and-shraddha",
        storyName: "Sarvesh & Shraddha",
        url: "https://i.postimg.cc/fTC0XbpV/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
        alt: "Intimate exchange of vows and timeless gazes",
        aspect: "tall",
      },
      {
        id: "photo-s02-c",
        storySlug: "tanvish-and-srushti",
        storyName: "Tanvish & Srushti",
        url: "https://i.postimg.cc/6prJMXHf/Save-Clip-App-753954049-18076019231699200-3319415317381893815-n-jpg.jpg",
        alt: "Bridal artistry and quiet wedding moments",
        aspect: "tall",
      },
      {
        id: "photo-s01-a",
        storySlug: "preet-and-anisha",
        storyName: "Preet & Anisha",
        url: "https://i.postimg.cc/hGLw11tM/Save-Clip-App-687412473-18065263070699200-6627715729941070460-n-jpg-(1).jpg",
        alt: "Preet & Anisha ceremony portraiture",
        aspect: "tall",
      },
      {
        id: "photo-p02",
        storySlug: "photography",
        storyName: "Photography Collection",
        url: "/images/philosophy_2.jpg",
        alt: "Couple movements celebration portrait",
        aspect: "tall",
      },
      {
        id: "photo-s03-b",
        storySlug: "sarvesh-and-shraddha",
        storyName: "Sarvesh & Shraddha",
        url: "https://i.postimg.cc/rpFjWbQG/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
        alt: "Sacred ceremonies beneath ornate archways",
        aspect: "wide",
      },
      {
        id: "photo-s04-ext1",
        storySlug: "shridar-and-ashwini",
        storyName: "Shridar & Ashwini",
        url: "https://i.postimg.cc/xjwzkDbN/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(2)-j.jpg",
        alt: "Timeless embrace along the historic palace corridors",
        aspect: "tall",
      },
      {
        id: "photo-p08",
        storySlug: "photography",
        storyName: "Photography Collection",
        url: "/images/sec2_img4.jpg",
        alt: "Atmospheric love stories celebration",
        aspect: "tall",
      },
      {
        id: "photo-s02-b",
        storySlug: "tanvish-and-srushti",
        storyName: "Tanvish & Srushti",
        url: "https://i.postimg.cc/C16WRL1M/Save-Clip-App-753652039-18076019210699200-3365365113919994575-n-jpg.jpg",
        alt: "Joyful celebration ceremony with family",
        aspect: "wide",
      },
      {
        id: "photo-p04",
        storySlug: "photography",
        storyName: "Photography Collection",
        url: "/images/philosophy_4.jpg",
        alt: "Candid couple moments photography",
        aspect: "tall",
      },
      {
        id: "photo-s04-a",
        storySlug: "shridar-and-ashwini",
        storyName: "Shridar & Ashwini",
        url: "https://i.postimg.cc/bvmy1bVZ/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(4)-j.jpg",
        alt: "Shridar & Ashwini palace portrait",
        aspect: "tall",
      },
      {
        id: "photo-s01-c",
        storySlug: "preet-and-anisha",
        storyName: "Preet & Anisha",
        url: "https://i.postimg.cc/tR2ztxRG/Save-Clip-App-688930588-18065263190699200-6956331044914275211-n-(1)-jpg.jpg",
        alt: "Stolen glances through architectural arches",
        aspect: "tall",
      },
      {
        id: "photo-s03-c",
        storySlug: "sarvesh-and-shraddha",
        storyName: "Sarvesh & Shraddha",
        url: "https://i.postimg.cc/nh79Kdqf/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
        alt: "Palace corridors and golden light",
        aspect: "tall",
      },
      {
        id: "photo-p06",
        storySlug: "photography",
        storyName: "Photography Collection",
        url: "/images/sec2_img2.jpg",
        alt: "Candid wedding moments",
        aspect: "tall",
      },
      {
        id: "photo-s02-a",
        storySlug: "tanvish-and-srushti",
        storyName: "Tanvish & Srushti",
        url: "https://i.postimg.cc/B6YG2BmV/Save-Clip-App-753933137-18076019171699200-5290634338121356592-n-jpg.jpg",
        alt: "Tanvish & Srushti wedding portrait",
        aspect: "tall",
      },
      {
        id: "photo-s04-c",
        storySlug: "shridar-and-ashwini",
        storyName: "Shridar & Ashwini",
        url: "https://i.postimg.cc/MHQzkL6B/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(1)-j.jpg",
        alt: "Quiet bridal preparation and jewelry details",
        aspect: "tall",
      },
    ],
  },
  storytelling: {
    scriptKicker: "our art",
    heading: "STORYTELLING APPROACH",
    italicSubtitle: "Weddings told the way you felt them",
    paragraph: "Every wedding has a story that no script can write. It lives in the trembling hands during the pheras, the quiet tears at vidaai, and the laughter that breaks out when no one is watching. We stay close and never interrupt, so you get honest frames instead of staged poses. Years from now, you won't just see your wedding, you'll feel it again.",
    ctaText: "BOOK YOUR DATE",
    ctaLink: "#contact",
  },
  storytellingImages: [
    "https://i.postimg.cc/gJxYwBVK/Save-Clip-App-623537013-18052152026699200-51602176749310186-n-jpg.jpg",
    "https://i.postimg.cc/WbL238hh/Save-Clip-App-620956156-18051575108699200-8579281125768085149-n-jpg.jpg",
    "https://i.postimg.cc/R0Fm8bDM/Save-Clip-App-613094796-18049640006699200-7816834079843382682-n-jpg.jpg",
    "https://i.postimg.cc/NF1vmh5J/Save-Clip-App-753255432-18075737645699200-6926454398888834197-n-jpg.jpg",
  ],
  filmsVideo: "https://www.image2url.com/r2/default/videos/1790675060170-94f33d1b-e3ff-4c19-a6cd-e959390a4c9b.mp4",
  soulCinema: {
    scriptKicker: "our films",
    heading: "FILMS WE CREATE",
    paragraph: "Every celebration has its own rhythm, its own people and its own joy. Whether it is a wedding, a baby's first birthday or a family milestone, we film it with care and turn it into a heartfelt keepsake you can watch again and again.",
    videoUrl: "https://www.image2url.com/r2/default/videos/1790675060170-94f33d1b-e3ff-4c19-a6cd-e959390a4c9b.mp4",
    posterImage: "https://i.postimg.cc/gJxYwBVK/Save-Clip-App-623537013-18052152026699200-51602176749310186-n-jpg.jpg",
    points: [
      { number: "I", title: "Cinematic Storytelling" },
      { number: "II", title: "Highlight Films" },
      { number: "III", title: "Full-Length Films" },
      { number: "IV", title: "Timeless Keepsakes" },
    ],
    ctaText: "BOOK YOUR DATE",
    ctaLink: "#contact",
  },
  filmsGallery: {
    heading: "THE ART OF FILM",
    description: "Filmmaking is our way of painting with light, sound and emotion. Every frame is composed with care, every moment is shaped with patience, and every story is crafted to feel like a piece of art you can treasure forever.",
    // Video URLs can be easily swapped below to any CDN or host (e.g. Cloudflare R2, AWS S3, or local /videos/)
    videos: [
      {
        id: "film-01",
        src: "https://www.image2url.com/r2/default/videos/1790842917209-580728ff-b81d-4ce3-8dd8-50d122a26c13.mp4",
        title: "Aniket × Tanvi",
        descriptionLine1: "Two hearts, one beautiful beginning.",
        descriptionLine2: "A day of rituals, laughter and love, told as a cinematic story.",
      },
      {
        id: "film-02",
        src: "https://www.image2url.com/r2/default/videos/1790842996677-e340c41e-8ba2-4130-9af0-cdd6f3c53ea8.mp4",
        title: "Baby Shlok, 1st Birthday",
        descriptionLine1: "One little year, a lifetime of joy.",
        descriptionLine2: "Smiles, cake and family love, captured for Shlok's first big day.",
      },
      {
        id: "film-03",
        src: "https://www.image2url.com/r2/default/videos/1790844438549-440fb784-9934-41cb-aa01-f106909a97a2.mp4",
        title: "Vinit × Palavi",
        descriptionLine1: "A promise made with love and tradition.",
        descriptionLine2: "Every glance, every ritual and every happy tear, beautifully preserved.",
      },
    ],
  },
  portfolio: [
    {
      slug: "preet-and-anisha",
      names: "Preet & Anisha",
      location: "The Royal Palace, Udaipur",
      seasonYear: "Winter 2025",
      coverImage: "https://i.postimg.cc/hGLw11tM/Save-Clip-App-687412473-18065263070699200-6627715729941070460-n-jpg-(1).jpg",
      category: "Royal Heritage Celebration",
      description: "An opulent celebration steeped in generational heritage and quiet reverence. Intricate royal regalia, sacred pheras by flickering oil lamps, and intimate moments beneath moonlit arches.",
      filmFormat: "Medium Format & 16mm Motion Picture",
      images: [
        {
          url: "https://i.postimg.cc/hGLw11tM/Save-Clip-App-687412473-18065263070699200-6627715729941070460-n-jpg-(1).jpg",
          caption: "Preet & Anisha in royal ceremony portraiture",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/Bvz0K6LS/Save-Clip-App-687529356-18065263079699200-7430590239601520-n-jpg.jpg",
          caption: "Quiet embrace before the royal festivities",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/gkKbK4Xr/Save-Clip-App-687191227-18065263139699200-6256495540406747217-n-jpg.jpg",
          caption: "Intricate heirloom jewelry and bridal preparations",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/K84pg5nh/Save-Clip-App-689898441-18065263172699200-2403307910708481016-n-jpg.jpg",
          caption: "Ceremony rituals under the hand-embroidered canopy",
          aspectRatio: "horizontal",
        },
        {
          url: "https://i.postimg.cc/D0gp1jjz/Save-Clip-App-688366599-18065263181699200-1789784349268893528-n-jpg.jpg",
          caption: "Sacred fire blessings and wedding traditions",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/zGLpfGrb/Save-Clip-App-687848068-18065263211699200-7507429834905461420-n-jpg.jpg",
          caption: "Sacred pheras and whispered vows",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/tR2ztxRG/Save-Clip-App-688930588-18065263190699200-6956331044914275211-n-(1)-jpg.jpg",
          caption: "Stolen glances through the palace arches",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/T3Wq6NVT/Save-Clip-App-673876478-18065263142699200-6504897767415933244-n-jpg.jpg",
          caption: "Evening twilight and courtyard celebration",
          aspectRatio: "horizontal",
        },
        {
          url: "https://i.postimg.cc/yNH9z16j/Save-Clip-App-687969121-18065263136699200-3889575383635737984-n-jpg.jpg",
          caption: "The emotional vidaai farewell in golden hour",
          aspectRatio: "vertical",
        },
      ],
    },
    {
      slug: "tanvish-and-srushti",
      names: "Tanvish & Srushti",
      location: "The Grand Courtyard, Mumbai",
      seasonYear: "Spring 2025",
      coverImage: "https://i.postimg.cc/B6YG2BmV/Save-Clip-App-753933137-18076019171699200-5290634338121356592-n-jpg.jpg",
      category: "Grand Wedding Celebration",
      description: "A vibrant yet soulful celebration filled with deep reverence and heartfelt laughter. From sunrise prayer blessings to the joyful baarat and candlelit evening vows.",
      filmFormat: "Medium Format & 35mm Archival Film",
      images: [
        {
          url: "https://i.postimg.cc/B6YG2BmV/Save-Clip-App-753933137-18076019171699200-5290634338121356592-n-jpg.jpg",
          caption: "Tanvish & Srushti in timeless ceremony portraiture",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/6prJMXHf/Save-Clip-App-753954049-18076019231699200-3319415317381893815-n-jpg.jpg",
          caption: "Bridal glow and the delicate artistry of wedding rituals",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/C16WRL1M/Save-Clip-App-753652039-18076019210699200-3365365113919994575-n-jpg.jpg",
          caption: "Sacred ceremonies surrounded by loved ones",
          aspectRatio: "horizontal",
        },
        {
          url: "https://i.postimg.cc/sDSgCb6J/Save-Clip-App-753225118-18076019183699200-2410993381969297639-n-jpg.jpg",
          caption: "Intimate glances during the wedding vows",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/J4wRxPr4/Save-Clip-App-753206044-18076019255699200-7625399297213354222-n-jpg.jpg",
          caption: "Joyful celebratory moments under floral garlands",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/RCpMt481/Save-Clip-App-753231477-18076019174699200-4088360819407938328-n-jpg.jpg",
          caption: "Evening twilight portraiture and eternal vows",
          aspectRatio: "horizontal",
        },
      ],
    },
    {
      slug: "sarvesh-and-shraddha",
      names: "Sarvesh & Shraddha",
      location: "The Oberoi Amarvilas, Agra",
      seasonYear: "Winter 2025",
      coverImage: "https://i.postimg.cc/TPwjhbP1/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
      category: "Regal Palace Celebration",
      description: "Elegance in every frame, love in every glance. Two souls, one beautiful beginning celebrated through sacred rituals, quiet architectural grandeur, and timeless golden hour embrace.",
      filmFormat: "Medium Format & 16mm Archival Motion Picture",
      images: [
        {
          url: "https://i.postimg.cc/TPwjhbP1/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Two souls, one beautiful beginning in regal splendor",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/k51cycH8/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Elegance in every frame and quiet bridal devotion",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/nh79Kdqf/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Sarvesh & Shraddha in golden palace corridors",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/rpFjWbQG/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Sacred ceremonies beneath traditional ornate archways",
          aspectRatio: "horizontal",
        },
        {
          url: "https://i.postimg.cc/fTC0XbpV/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Intimate exchange of vows and timeless gazes",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/wT8kF3wf/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Palace courtyard celebrations in afternoon sunlight",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/bvhDmQR0/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Joyful celebratory emotions and wedding rituals",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/CL2SWTft/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Love in every glance during sunset rituals",
          aspectRatio: "horizontal",
        },
        {
          url: "https://i.postimg.cc/X7r0KHDY/Elegance-in-every-frame-love-in-every-glance-Two-souls-one-beautiful-beginning-Shoot-heic.jpg",
          caption: "Eternal promises by twilight candlelight",
          aspectRatio: "vertical",
        },
      ],
    },
    {
      slug: "shridar-and-ashwini",
      names: "Shridar & Ashwini",
      location: "The Leela Palace, Udaipur",
      seasonYear: "Winter 2025",
      coverImage: "https://i.postimg.cc/bvmy1bVZ/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(4)-j.jpg",
      category: "Palace Wedding Celebration",
      description: "A graceful love, calm, beautiful and forever finding a home in the heart. Celebrated under starlit palace canopies, surrounded by family devotion and timeless wedding vows.",
      filmFormat: "Medium Format & 16mm Motion Picture",
      images: [
        {
          url: "https://i.postimg.cc/bvmy1bVZ/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(4)-j.jpg",
          caption: "A graceful love finding a home in the heart",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/MHQzkL6B/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(1)-j.jpg",
          caption: "Quiet bridal preparation and intricate jewelry details",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/YjBMtx0d/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(3)-j.jpg",
          caption: "Sacred ceremonies and whispered vows under floral canopies",
          aspectRatio: "horizontal",
        },
        {
          url: "https://i.postimg.cc/xjwzkDbN/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(2)-j.jpg",
          caption: "Timeless embrace along the historic palace corridors",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/8PLrMKhn/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(7)-j.jpg",
          caption: "Joyous laughter and blessing rituals with family",
          aspectRatio: "vertical",
        },
        {
          url: "https://i.postimg.cc/Dy1bLjrm/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(6)-j.jpg",
          caption: "Sunset pheras surrounded by soft golden light",
          aspectRatio: "horizontal",
        },
        {
          url: "https://i.postimg.cc/T3G59V09/A-graceful-love-calm-beautiful-and-forever-finding-a-home-in-the-heart-Your-big-day-our-(5)-j.jpg",
          caption: "Candlelit courtyard celebration into the evening",
          aspectRatio: "vertical",
        },
      ],
    },
  ],
  films: [
    {
      id: "film-01",
      title: "THE SOUND OF STILLNESS",
      italicTitle: "Elena & Mateo in Lake Como",
      thumbnail: "/images/service_film.jpg",
      videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      embedUrl: "https://www.youtube-nocookie.com/embed/ysz5S6PUM-U?autoplay=1",
      duration: "08:42",
      location: "Villa Balbiano, Italy",
      featured: true,
      synopsis: "Documented on Kodak 16mm 500T motion picture stock. An acoustic exploration of morning mist, church bells echoing across the water, and vows whispered in an ancient lemon grove.",
    },
    {
      id: "film-02",
      title: "RAIN OVER MONTMARTRE",
      italicTitle: "Clara & Julian in Paris",
      thumbnail: "/images/portfolio_clara_julian.jpg",
      videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      embedUrl: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1",
      duration: "04:15",
      location: "Paris, France",
      featured: false,
      synopsis: "Super 8mm snippets intertwined with intimate ambient soundscapes of Paris under spring rain.",
    },
    {
      id: "film-03",
      title: "PACIFIC HAZE",
      italicTitle: "Maya & Liam in Big Sur",
      thumbnail: "/images/portfolio_maya_liam.jpg",
      videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      embedUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1",
      duration: "05:50",
      location: "Big Sur, California",
      featured: false,
      synopsis: "A cinematic ode to raw nature, wind against silk, and the eternal ocean.",
    },
  ],
  testimonialsSection: {
    scriptKicker: "kind words",
    heading: "WHAT COUPLES SAY",
    testimonials: [
      {
        id: "review-01",
        quote: "They made us feel so relaxed that we forgot the camera was there. Every photo and film feels like our wedding day, exactly as we remember it.",
        name: "Priya & Rohan",
        place: "Sangli",
      },
      {
        id: "review-02",
        quote: "The film made our whole family emotional. We have watched it so many times, and it gets better every time.",
        name: "Sneha & Aditya",
        place: "Kolhapur",
      },
      {
        id: "review-03",
        quote: "Calm, professional and so creative. They captured moments we did not even know happened.",
        name: "Pooja & Nikhil",
        place: "Pune",
      },
      {
        id: "review-04",
        quote: "Our baby's first birthday film is now our favourite keepsake. Thank you for making it so special.",
        name: "Meera & Karan",
        place: "Solapur",
      },
      {
        id: "review-05",
        quote: "From the first call to the final delivery, everything was smooth. The quality of the work is beyond our expectations.",
        name: "Ankita & Suraj",
        place: "Satara",
      },
    ],
  },
  testimonials: [
    {
      id: "review-01",
      quote: "They made us feel so relaxed that we forgot the camera was there. Every photo and film feels like our wedding day, exactly as we remember it.",
      name: "Priya & Rohan",
      place: "Sangli",
    },
    {
      id: "review-02",
      quote: "The film made our whole family emotional. We have watched it so many times, and it gets better every time.",
      name: "Sneha & Aditya",
      place: "Kolhapur",
    },
    {
      id: "review-03",
      quote: "Calm, professional and so creative. They captured moments we did not even know happened.",
      name: "Pooja & Nikhil",
      place: "Pune",
    },
    {
      id: "review-04",
      quote: "Our baby's first birthday film is now our favourite keepsake. Thank you for making it so special.",
      name: "Meera & Karan",
      place: "Solapur",
    },
    {
      id: "review-05",
      quote: "From the first call to the final delivery, everything was smooth. The quality of the work is beyond our expectations.",
      name: "Ankita & Suraj",
      place: "Satara",
    },
  ],
  selectedFilms: {
    scriptKicker: "press play",
    heading: "SELECTED FILMS",
    paragraph: "Here are some selected films from the past couple of years, made to showcase the union of two people, and the joy of families, in the most authentic way possible.",
    videos: [
      {
        id: "selected-01",
        thumbnail: "https://i.postimg.cc/7P22M7bV/Screenshot-20261001-115353-You-Tube-jpg.jpg",
        link: "https://youtu.be/Ja57udTyeZw?si=KbVr4f0PLXcbZs2u",
        alt: "Wedding film 1",
      },
      {
        id: "selected-02",
        thumbnail: "https://i.postimg.cc/DyQ4RTr8/Screenshot-20261001-123258-You-Tube-jpg.jpg",
        link: "https://youtu.be/Ja57udTyeZw?si=KbVr4f0PLXcbZs2u", // [PASTE YOUTUBE LINK HERE - swappable link]
        alt: "Wedding film 2",
      },
      {
        id: "selected-03",
        thumbnail: "https://i.postimg.cc/YCq0Vm2P/Screenshot-20261001-123833-You-Tube-jpg.jpg",
        link: "https://youtu.be/TKiZWVhNebk?si=k1yycCBdcbu6PpZF",
        alt: "Wedding film 3",
      },
    ],
  },
  cta: {
    bgImage: "/images/cta_night.jpg",
    bgVideo: "https://www.image2url.com/r2/default/videos/1790846681038-8a8fff51-9107-40e9-ab59-46f746fed15e.mp4",
    serifHeading: "READY TO CAPTURE YOUR",
    scriptOverlay: "special moments?",
    buttonText: "INQUIRE NOW",
  },
};
