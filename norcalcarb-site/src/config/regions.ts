export interface RegionConfig {
  id: string;
  name: string;
  slug: string;
  host: string;
  phone: string;
  license: string;
  cities: string[];
  metaDescription: string;
}

export const REGIONS: Record<string, RegionConfig> = {
  sacramento: {
    id: "sacramento",
    name: "Sacramento Region",
    slug: "sacramento",
    host: "https://sacramento.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Sacramento",
      "Elk Grove",
      "Folsom",
      "Roseville",
      "Rancho Cordova",
      "Citrus Heights",
      "Rocklin",
      "Lincoln",
      "Auburn",
      "Woodland",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in Sacramento. CARB-licensed, we come to your fleet location. Same-day appointments.",
  },
  bayarea: {
    id: "bayarea",
    name: "Bay Area",
    slug: "bayarea",
    host: "https://bayarea.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Oakland",
      "San Francisco",
      "Richmond",
      "Hayward",
      "Fremont",
      "Concord",
      "Vallejo",
      "Pittsburg",
      "Antioch",
      "Livermore",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in the Bay Area. CARB-licensed fleet inspections — we come to your location.",
  },
  stockton: {
    id: "stockton",
    name: "Stockton & San Joaquin Valley",
    slug: "stockton",
    host: "https://stockton.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Stockton",
      "Modesto",
      "Turlock",
      "Lodi",
      "Tracy",
      "Manteca",
      "Merced",
      "Los Banos",
      "Newman",
      "Patterson",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in Stockton and San Joaquin Valley. On-site fleet inspections, CARB compliant.",
  },
  fresno: {
    id: "fresno",
    name: "Fresno & Central Valley",
    slug: "fresno",
    host: "https://fresno.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Fresno",
      "Clovis",
      "Madera",
      "Visalia",
      "Tulare",
      "Hanford",
      "Selma",
      "Sanger",
      "Reedley",
      "Dinuba",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in Fresno and Central Valley. CARB-licensed, agricultural and commercial fleet specialists.",
  },
  redding: {
    id: "redding",
    name: "Redding & Shasta Region",
    slug: "redding",
    host: "https://redding.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Redding",
      "Anderson",
      "Shasta Lake",
      "Red Bluff",
      "Corning",
      "Cottonwood",
      "Palo Cedro",
      "Dunsmuir",
      "Mount Shasta",
      "Weed",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in Redding and Shasta County. CARB-licensed, we serve construction and logging fleets.",
  },
  chico: {
    id: "chico",
    name: "Chico & North Valley",
    slug: "chico",
    host: "https://chico.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Chico",
      "Oroville",
      "Paradise",
      "Gridley",
      "Yuba City",
      "Marysville",
      "Live Oak",
      "Orland",
      "Willows",
      "Colusa",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in Chico and the North Sacramento Valley. CARB-licensed fleet inspections.",
  },
  northbay: {
    id: "northbay",
    name: "North Bay",
    slug: "northbay",
    host: "https://northbay.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Santa Rosa",
      "Napa",
      "Petaluma",
      "Novato",
      "Fairfield",
      "Vacaville",
      "Dixon",
      "Rohnert Park",
      "Healdsburg",
      "Windsor",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in Napa, Sonoma, and Solano Counties. CARB-licensed fleet and agricultural truck specialists.",
  },
  eastbay: {
    id: "eastbay",
    name: "East Bay",
    slug: "eastbay",
    host: "https://eastbay.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Oakland",
      "Berkeley",
      "Richmond",
      "Hayward",
      "San Leandro",
      "Alameda",
      "Castro Valley",
      "Union City",
      "Newark",
      "San Lorenzo",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in the East Bay. Port-proximity fleet specialists, CARB-licensed.",
  },
  southbay: {
    id: "southbay",
    name: "South Bay",
    slug: "southbay",
    host: "https://southbay.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "San Jose",
      "Fremont",
      "Milpitas",
      "Santa Clara",
      "Sunnyvale",
      "Mountain View",
      "Gilroy",
      "Morgan Hill",
      "Los Gatos",
      "Campbell",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection in San Jose and South Bay. CARB-licensed, industrial corridor fleet specialists.",
  },
  centralcoast: {
    id: "centralcoast",
    name: "Central Coast",
    slug: "centralcoast",
    host: "https://centralcoast.norcalcarb.com",
    phone: "916-890-4427",
    license: "IF530523",
    cities: [
      "Salinas",
      "Monterey",
      "Santa Cruz",
      "Watsonville",
      "Seaside",
      "Pacific Grove",
      "Scotts Valley",
      "Hollister",
      "King City",
      "Greenfield",
    ],
    metaDescription:
      "Mobile diesel and truck smog inspection on the Central Coast. CARB-licensed, agricultural fleet specialists in Salinas Valley.",
  },
};

// Active region driven by env var set in Cloudflare Pages project settings
export function getRegion(): RegionConfig {
  const regionId =
    typeof process !== "undefined"
      ? (process.env.REGION ?? "sacramento")
      : "sacramento";
  return REGIONS[regionId] ?? REGIONS.sacramento;
}

export const BUSINESS = {
  name: "NorCal CARB Mobile",
  legalName: "NorCal CARB Mobile",
  owner: "Bryan Gillis",
  license: "IF530523",
  phone: "916-890-4427",
  email: "bryan@norcalcarb.com",
  founded: "2018",
  logo: "/images/norcalcarb-logo.svg",
  sameAs: [
    // Add GBP, Yelp, LinkedIn URLs here as they're created
  ],
  knowsAbout: [
    "diesel emissions testing",
    "CARB compliance",
    "truck smog inspection",
    "California Air Resources Board regulations",
    "heavy-duty diesel inspection",
    "mobile smog station",
    "fleet emissions compliance",
    "CARB Truck and Bus Regulation",
  ],
};
