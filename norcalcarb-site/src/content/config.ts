import { defineCollection, z } from "astro:content";

// Services — diesel smog inspection service pages
const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(), // Used in meta description AND Service schema
    priceRange: z.string().optional(), // "$65–$120 per vehicle"
    serviceOutput: z.string().optional(), // "CARB-compliant smog certificate"
    youtubeId: z.string().optional(), // YouTube video ID for VideoObject schema
    youtubeDuration: z.string().optional(), // ISO 8601 e.g. "PT3M42S"
    youtubeUploadDate: z.string().optional(), // "2025-09-15"
    youtubeTitle: z.string().optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(), // MUST be in prompt language
          answer: z.string(),
        })
      )
      .min(4),
    order: z.number().default(99), // Display order in services index
    published: z.boolean().default(true),
  }),
});

// Cities — one file per city in the region
const cities = defineCollection({
  type: "content",
  schema: z.object({
    city: z.string(), // "Sacramento"
    region: z.string(), // "sacramento" — matches REGIONS key
    slug: z.string(), // "sacramento" — used in URL /cities/[slug]
    metaDescription: z.string(),
    // At least 1 locally unique fact (NOT AI-generated generic copy)
    localFact: z.string(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .min(2),
    published: z.boolean().default(true),
  }),
});

// FAQs — master FAQ collection, prompt-language questions
const faqs = defineCollection({
  type: "content",
  schema: z.object({
    question: z.string(), // The full question — must be prompt language
    category: z.enum([
      "compliance",
      "cost",
      "process",
      "vehicle-types",
      "scheduling",
      "regulations",
    ]),
    order: z.number().default(99),
    published: z.boolean().default(true),
  }),
});

// Videos — YouTube video metadata for VideoObject schema
const videos = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    youtubeId: z.string(),
    uploadDate: z.string(), // "2025-09-15"
    duration: z.string(), // ISO 8601 "PT3M42S"
    category: z.enum([
      "how-it-works",
      "fleet-inspection",
      "regulations",
      "pricing",
      "testimonials",
    ]),
    published: z.boolean().default(true),
  }),
});

// Reviews — fleet operator testimonials (Bryan's real customer stories)
const reviews = defineCollection({
  type: "content",
  schema: z.object({
    companyName: z.string(),
    contactName: z.string(), // First name only for privacy
    city: z.string(),
    rating: z.number().min(1).max(5),
    datePublished: z.string(), // "2025-08-14"
    fleetSize: z.number().optional(), // Number of trucks inspected
    vehicleType: z.string().optional(), // "Class 7 diesel semi"
    featured: z.boolean().default(false), // Show on homepage
    published: z.boolean().default(true),
  }),
});

export const collections = { services, cities, faqs, videos, reviews };
