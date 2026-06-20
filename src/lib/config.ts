// Aviora Estates — Editable Business Configuration
// All business data lives here. Update values without touching components.

export const business = {
  name: "Aviora Estates",
  tagline: "A Mediterranean Escape, Made for You",
  description:
    "A private Mediterranean-style villa in Noida designed for slow mornings, sun-drenched afternoons, and evenings under the stars.",
  email: "info@avioraestates.com",
  whatsapp: {
    number: "+916205990268",
    message:
      "Hi Aviora Estates, I would like to check availability for your villa.",
  },
  phone: "+91 62059 90268",
  instagram:
    "https://www.instagram.com/aviora.estates?igsh=Njh0dDcxaTN3aGxr",
  airbnb:
    "https://www.airbnb.co.in/rooms/1674763598052658753?viralityEntryPoint=154&s=76&adults=1&guests=1",
  address: "Aviora Estates, Noida, India",
  location: {
    short: "Noida",
    mapUrl: "https://maps.app.goo.gl/XhGWtqgEwLcESpN19",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.209!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjEiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  url: "https://avioraestates.com",
  logo: "/images/branding/aviora-logo.jpg",
  landSize: "50,000 sqft",
  positioning: "Luxury short-term private rental",
  audience: [
    "Couples",
    "Families",
    "Friends",
    "Corporate groups",
    "Party groups",
  ],
  highlights: [
    "Private pool",
    "Outdoor shower",
    "Outdoor dining table",
    "Fully functional kitchen",
    "Free parking on premises",
    "Winter firepit",
    "Garden view",
    "Private lawn",
    "Pets allowed",
    "Tree-covered walkways",
    "Surrounded by nature",
    "BBQ experience",
  ],
};

export const capacity = {
  nightStay: 6,
  dayUse: 12,
  baseGuests: 6,
  extraGuestPrice: 1500,
};

export const pricing = {
  weekday: {
    label: "Weekday Stay",
    originalAmount: "₹28,000",
    amount: "₹22,000",
    per: "per night",
    note: "Sunday to Thursday",
    discountPercent: 21,
  } as const,
  weekend: {
    label: "Weekend Stay",
    originalAmount: "₹32,000",
    amount: "₹25,000",
    per: "per night",
    note: "Friday & Saturday",
    discountPercent: 22,
  } as const,
  securityDeposit: {
    label: "Security Deposit",
    amount: "₹5,000",
    per: "refundable",
    note: "Collected via UPI, refunded after check-out inspection",
  } as const,
  extraGuest: {
    label: "Extra Guest",
    amount: "₹1,500",
    per: "per guest / per night",
    note: "Beyond 1 extra adult over base capacity",
  } as const,
};

export const booking = {
  minNights: 1,
  checkIn: "2:00 PM onwards (Flexible)",
  checkOut: "Before 11:00 AM",
  arrivalTimes: [
    "2:00 PM – 4:00 PM",
    "4:00 PM – 6:00 PM",
    "6:00 PM – 8:00 PM",
    "After 8:00 PM",
  ],
  process: [
    { step: 1, title: "Request", description: "Share your preferred dates, group size, and occasion. Every request is reviewed personally." },
    { step: 2, title: "Review", description: "The owner confirms availability and shares final pricing, house rules, and payment details." },
    { step: 3, title: "Verify", description: "Submit guest ID proofs, accept the terms, and confirm the refundable security deposit." },
    { step: 4, title: "Confirm", description: "Complete the full advance payment. Your reservation is locked only after owner approval." },
    { step: 5, title: "Arrive", description: "Receive check-in instructions, host contact, and curated arrival guidance for a seamless stay." },
  ],
};

export const policies = {
  refund: [
    "Full refund at least 1 day before check-in.",
    "Partial refund within 1 day of check-in.",
    "Security deposit is fully refunded after a successful check-out inspection, provided there is no damage or missing inventory.",
  ],
  houseRules: [
    `Maximum night stay capacity is ${capacity.nightStay} guests.`,
    `Maximum day-use capacity is ${capacity.dayUse} guests.`,
    "Check-in is from 2:00 PM onwards and is flexible by prior arrangement.",
    "Check-out must be completed before 11:00 AM.",
    "Smoking is permitted only in designated outdoor areas.",
    "Pets are allowed with prior notice and a small hygiene deposit.",
    "Loud music must be lowered after 10:00 PM out of respect for neighbors.",
    "Guests are responsible for any damage caused during the stay.",
    "Please dispose of BBQ waste and food scraps in provided bins.",
    "Events and parties require prior approval and may incur additional charges.",
  ],
  curatedHouseRules: [
    { title: "No indoor smoking", description: "Smoking is allowed only in designated outdoor areas to preserve the estate's interiors and air quality." },
    { title: "Music cutoff at 10 PM", description: "Evenings outdoors stay peaceful for neighbors and the surrounding community after 10:00 PM." },
    { title: "Visitors until 9 PM", description: "Day guests are welcome until 9:00 PM. Overnight visitors must be pre-approved in advance." },
    { title: "Extra guests ₹1,500 each", description: "Beyond the included capacity, each additional guest is charged ₹1,500 per night." },
    { title: "Respect the estate", description: "Plants, furniture, art, and fixtures are part of the experience. Treat them with care." },
  ],
  bookingPolicy: [
    { title: "Owner-reviewed reservations", description: "Every stay request is personally reviewed before any confirmation is issued." },
    { title: "Mandatory ID verification", description: "All adult guests submit a valid government ID prior to check-in." },
    { title: "Refundable security deposit", description: "A ₹5,000 security deposit is collected and refunded after a successful checkout inspection." },
    { title: "Full advance payment", description: "Direct bookings require full payment to lock the dates after owner approval." },
    { title: "Final confirmation after approval", description: "Your reservation is confirmed only after the owner reviews and accepts your request." },
  ],
  securityDeposit: {
    title: "Security Deposit",
    amount: pricing.securityDeposit.amount,
    collectedVia: "UPI",
    refundTimeline: "Within 24–48 hours after check-out inspection",
    conditions: [
      "No damage to property, furniture, or fixtures.",
      "No missing inventory items.",
      "No unauthorized extra guests beyond confirmed count.",
      "House rules respected throughout the stay.",
    ],
  },
};

export type Review = {
  quote: string;
  author: string;
  stay: string;
  rating: number;
};

// Guest reviews — only populate with verified, real guest feedback.
// Until then, the site displays a trust-safe placeholder state.
export const reviews: Review[] = [];

export const nearbyLocations = [
  { label: "EV Charger", url: "https://maps.app.goo.gl/RjaeK7TTTsAcTAwS7" },
  { label: "Dominos", url: "https://maps.app.goo.gl/nP5qthvkTD8rvDqP7" },
  { label: "Cafe", url: "https://maps.app.goo.gl/wBCgf4WKWPUFPPTn7" },
  { label: "Gym", url: "https://maps.app.goo.gl/8ToWqZ37fU462K5k7" },
  { label: "Bikanerwala", url: "https://maps.app.goo.gl/xsmLeH4GVeZXa5929" },
  { label: "ATM", url: "https://maps.app.goo.gl/KAFvjJ4WNBbDR9tG7" },
  { label: "ATM", url: "https://maps.app.goo.gl/HNbuLBTzFNTJZUYX8" },
  { label: "Medical Store", url: "https://maps.app.goo.gl/95Rev9XUNQUvYSwn6" },
];

export const expansion = {
  title: "More Luxury Properties Coming Soon",
  description:
    "Aviora Estates is growing. Under the same trusted brand, we are curating exceptional stays across new locations and styles — each designed with the same attention to privacy, design, and comfort.",
  themes: [
    "Mediterranean Villas",
    "Modern Farmhouses",
    "Minimalist Urban Retreats",
    "Nature Cabins",
    "Heritage Restored Homes",
  ],
  locations: ["Noida", "Goa", "Udaipur", "Jaipur", "Rishikesh"],
  unitTypes: ["1 BHK", "2 BHK", "3 BHK", "Villas", "Farmhouses"],
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message || business.whatsapp.message);
  const number = business.whatsapp.number.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${text}`;
}

// -----------------------------------------------------------------------------
// Property collection — scalable architecture for multiple Aviora listings
// -----------------------------------------------------------------------------

export type PropertyStatus = "live" | "coming-soon";

export type PropertyImage = {
  src: string;
  alt: string;
};

export type PropertySpace = {
  title: string;
  image: string;
  description: string;
};

export type PropertyExperience = {
  title: string;
  image: string;
  text: string;
};

export type PropertyNearby = {
  label: string;
  url: string;
};

export type Property = {
  slug: string;
  name: string;
  location: string;
  status: PropertyStatus;
  badge?: string;
  tagline: string;
  shortDescription: string;
  description: string;
  estateSize?: string;
  highlights: string[];
  heroImages: PropertyImage[];
  spaces: PropertySpace[];
  experiences: PropertyExperience[];
  rooms: PropertySpace[];
  galleryImages: PropertyImage[];
  nearby: PropertyNearby[];
  icalUrl?: string;
  hostName?: string;
};

export const properties: Property[] = [
  {
    slug: "noida-estate",
    name: "Aviora Estate, Noida",
    location: "Noida, India",
    status: "live",
    tagline: "A single-story sanctuary in nature.",
    shortDescription: business.description,
    description:
      "Aviora’s single-level villa blends Mediterranean simplicity with contemporary comfort across a sprawling private property. Whitewashed walls, cobalt doors and windows, and handmade tiles create a serene backdrop for a private pool, manicured gardens, and generous living spaces.",
    estateSize: business.landSize,
    highlights: [
      "Private pool with teak deck",
      "3 air-conditioned suites",
      "Landscaped lawn and gardens",
      "Mediterranean interiors",
    ],
    heroImages: [
      {
        src: "/images/hero/villa-front-day.png",
        alt: "Aviora villa front facade with cobalt blue doors and tropical gardens",
      },
      {
        src: "/images/hero/pool-sunset.png",
        alt: "Private swimming pool at sunset reflecting the whitewashed villa",
      },
      {
        src: "/images/gallery/villa-entrance-angle.jpg",
        alt: "Side angle view of the villa entrance surrounded by greenery",
      },
      {
        src: "/images/hero/villa-night.png",
        alt: "Aviora villa exterior beautifully lit at night",
      },
    ],
    spaces: [
      {
        title: "Master Suite",
        image: "/images/spaces/bedroom-2.png",
        description: "King bed, garden views, and an ensuite bathroom finished in patterned tile.",
      },
      {
        title: "Garden Suite",
        image: "/images/spaces/bedroom-3.jpg",
        description: "A light-filled room with woven blinds, natural linens, and attached bath.",
      },
      {
        title: "Poolside Room",
        image: "/images/spaces/bedroom-1.jpg",
        description: "Direct pool access and a calm palette for restful nights.",
      },
      {
        title: "Mediterranean Living",
        image: "/images/gallery/living-room-full.png",
        description: "Open-plan lounge and dining with handpicked ceramics and tropical greenery.",
      },
      {
        title: "Designer Bathrooms",
        image: "/images/spaces/bathroom-master.jpg",
        description: "White stucco walls, cobalt accents, and open rain showers.",
      },
      {
        title: "Modern Kitchen",
        image: "/images/spaces/kitchen-fridge.jpg",
        description: "Sleek counters, appliances, and everything needed for in-villa dining.",
      },
    ],
    experiences: [
      {
        title: "Poolside Living",
        image: "/images/hero/pool-sunset.png",
        text: "Sun-loungers, pool towels, and a teak deck set the scene for long, lazy afternoons.",
      },
      {
        title: "Garden Events",
        image: "/images/gallery/lawn-panorama.jpg",
        text: "The wide lawn is ideal for intimate celebrations, yoga sessions, or open-air dining.",
      },
      {
        title: "Dining & Lounges",
        image: "/images/gallery/living-room-dining.jpg",
        text: "From hammocks to the dining table, every space is built for connection.",
      },
      {
        title: "Evening by the Pool",
        image: "/images/spaces/pool-dusk.png",
        text: "As the day cools, the pool area glows under warm lights for relaxed night-time gatherings.",
      },
      {
        title: "Mediterranean Lounge",
        image: "/images/gallery/mediterranean-lounge.png",
        text: "Curved white seating, cobalt accents, and garden views create the perfect slow-living corner.",
      },
      {
        title: "Alfresco Dining",
        image: "/images/gallery/outdoor-table.jpg",
        text: "Long lunches and candlelit dinners at the outdoor dining table surrounded by greenery.",
      },
    ],
    rooms: [
      {
        title: "Master Bedroom",
        image: "/images/spaces/bedroom-2.png",
        description: "King bed, garden views, and an ensuite bathroom finished in patterned tile.",
      },
      {
        title: "Guest Bedroom",
        image: "/images/spaces/bedroom-3.jpg",
        description: "A light-filled room with woven blinds, natural linens, and attached bath.",
      },
      {
        title: "Living Room",
        image: "/images/gallery/living-room-full.png",
        description: "Open-plan lounge and dining with handpicked ceramics and tropical greenery.",
      },
      {
        title: "Kitchen",
        image: "/images/spaces/kitchen-fridge.jpg",
        description: "Sleek counters, appliances, and everything needed for in-villa dining.",
      },
      {
        title: "Dining Area",
        image: "/images/gallery/living-room-dining.jpg",
        description: "Indoor-outdoor dining spaces designed for long conversations and shared meals.",
      },
      {
        title: "Bathrooms",
        image: "/images/spaces/bathroom-master.jpg",
        description: "White stucco walls, cobalt accents, and open rain showers.",
      },
      {
        title: "Outdoor / Pool / Garden",
        image: "/images/hero/pool-sunset.png",
        description: "Private pool, teak deck, manicured lawn, and tree-covered walkways.",
      },
    ],
    galleryImages: [
      { src: "/images/hero/villa-front-day.png", alt: "Aviora villa front facade with cobalt blue doors and manicured gardens" },
      { src: "/images/hero/pool-sunset.png", alt: "Private pool at sunset reflecting the whitewashed villa" },
      { src: "/images/gallery/living-room-dining.jpg", alt: "Open-plan Mediterranean living and dining space" },
      { src: "/images/gallery/living-room-wide.jpg", alt: "Bright living room with decorative wall plates and tropical plants" },
      { src: "/images/spaces/bedroom-2.png", alt: "Garden-view bedroom with natural linens and cane blinds" },
      { src: "/images/spaces/bathroom-master.jpg", alt: "Master bathroom with blue patterned tile floors" },
      { src: "/images/hero/villa-night.png", alt: "Aviora villa exterior illuminated at night" },
      { src: "/images/gallery/lawn-panorama.jpg", alt: "Wide panoramic lawn backed by mature tropical trees" },
      { src: "/images/gallery/palm-walkway.png", alt: "Palm tree lined stone garden walkway" },
      { src: "/images/spaces/kitchen-fridge.jpg", alt: "Modern villa kitchen with refrigerator and cabinets" },
      { src: "/images/gallery/villa-garden-view.png", alt: "Villa viewed through lush green foliage" },
      { src: "/images/spaces/bedroom-1.jpg", alt: "Poolside bedroom with white and blue bed runner" },
      { src: "/images/gallery/estate-gate-night.png", alt: "Teal estate entrance gate lit at night" },
      { src: "/images/spaces/bathroom-shower.jpg", alt: "Open shower bathroom with cobalt door" },
      { src: "/images/hero/garden-path-hero.png", alt: "Stone garden path with red roses alongside the villa" },
      { src: "/images/gallery/living-room-evening.png", alt: "Living room in warm evening light" },
      { src: "/images/hero/villa-sunset-lawn.png", alt: "Villa and lawn at dusk with colorful sky" },
      { src: "/images/spaces/lounge-hammock.jpg", alt: "Cozy lounge corner with hammock and tropical plants" },
      { src: "/images/gallery/wall-plates-art.png", alt: "Decorative blue and white ceramic plates on wall" },
      { src: "/images/hero/outdoor-lounge-lawn.png", alt: "Curved outdoor lounge bench overlooking green lawn" },
      { src: "/images/gallery/bohemian-corner.png", alt: "Bohemian styled corner with patterned textiles and plants" },
      { src: "/images/gallery/entrance-gate.png", alt: "Elegant estate entrance gate with Mediterranean styling" },
      { src: "/images/gallery/estate-gate-day.png", alt: "Daytime view of the estate entrance gate and driveway" },
      { src: "/images/gallery/garden-lamp-day.jpg", alt: "Garden lamp post framed by tropical greenery" },
      { src: "/images/gallery/garden-lantern.png", alt: "Ornate garden lantern among villa plants" },
      { src: "/images/gallery/garden-path-detail.png", alt: "Close-up of a stone garden path bordered by plants" },
      { src: "/images/gallery/lawn-wide.png", alt: "Wide panoramic view of the manicured lawn and villa" },
      { src: "/images/gallery/living-room-lounge.jpg", alt: "Comfortable living room lounge seating area" },
      { src: "/images/gallery/mediterranean-lounge.png", alt: "Mediterranean style curved lounge seating" },
      { src: "/images/gallery/outdoor-table.jpg", alt: "Outdoor dining table set under villa greenery" },
      { src: "/images/gallery/villa-day-clear.png", alt: "Villa exterior on a bright clear day" },
      { src: "/images/gallery/villa-dusk.jpg", alt: "Villa facade in soft dusk light" },
      { src: "/images/gallery/villa-front-facade.jpg", alt: "Front facade of the whitewashed Mediterranean villa" },
      { src: "/images/gallery/wall-plates-detail.jpg", alt: "Close-up of decorative ceramic plates on a wall" },
      { src: "/images/hero/driveway-night.png", alt: "Estate driveway beautifully lit at night" },
      { src: "/images/hero/villa-exterior-angle.png", alt: "Angled view of the villa exterior and gardens" },
      { src: "/images/spaces/bathroom-suite.jpg", alt: "Spacious ensuite bathroom with modern fittings" },
      { src: "/images/spaces/bedroom-bathroom.png", alt: "Bedroom view leading into a bright bathroom" },
      { src: "/images/spaces/garden-path-side.jpg", alt: "Side garden path alongside the villa" },
      { src: "/images/spaces/kitchen-sink.jpg", alt: "Modern kitchen sink and counter area" },
      { src: "/images/spaces/living-room-plates.png", alt: "Living room wall decorated with ceramic plates" },
      { src: "/images/spaces/living-room-soft.png", alt: "Softly lit living room corner with comfortable seating" },
      { src: "/images/spaces/pool-dusk.png", alt: "Private pool area at dusk with warm lighting" },
      { src: "/images/spaces/tropical-lounge.jpg", alt: "Tropical lounge corner surrounded by lush plants" },
    ],
    nearby: nearbyLocations,
    icalUrl: "",
    hostName: "Alok",
  },
  {
    slug: "goa-grove",
    name: "Aviora Grove, Goa",
    location: "North Goa, India",
    status: "coming-soon",
    badge: "Coming Soon",
    tagline: "Coastal palms meet private luxury.",
    shortDescription:
      "A soon-to-launch Mediterranean villa minutes from Goa’s quiet beaches, designed for sunlit escapes and private poolside living.",
    description:
      "Aviora Grove brings the brand’s signature Mediterranean calm to the Goa coast. Whitewashed volumes, shaded courtyards, and a private pool surrounded by palms create an intimate setting for long lunches, slow mornings, and celebrations under the stars.",
    estateSize: "12,000 sqft",
    highlights: [
      "Private pool with sun deck",
      "4 ensuite bedrooms",
      "Covered alfresco dining",
      "Walk to quiet beach",
    ],
    heroImages: [
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa villa preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa pool preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa garden preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa living preview" },
    ],
    spaces: [
      { title: "Master Bedroom", image: "/images/placeholder/coming-soon.svg", description: "Pool-facing suite with king bed and ensuite bath." },
      { title: "Guest Bedrooms", image: "/images/placeholder/coming-soon.svg", description: "Three additional ensuite rooms for family and friends." },
      { title: "Living Room", image: "/images/placeholder/coming-soon.svg", description: "Open living space flowing into the courtyard." },
      { title: "Kitchen", image: "/images/placeholder/coming-soon.svg", description: "Fully equipped kitchen for private chef service." },
      { title: "Dining Area", image: "/images/placeholder/coming-soon.svg", description: "Indoor-outdoor dining for twelve." },
      { title: "Bathrooms", image: "/images/placeholder/coming-soon.svg", description: "Designer fittings and natural stone finishes." },
    ],
    experiences: [
      { title: "Poolside Living", image: "/images/placeholder/coming-soon.svg", text: "A private pool framed by palms and comfortable loungers." },
      { title: "Beach Access", image: "/images/placeholder/coming-soon.svg", text: "Short walk to a quiet stretch of North Goan coastline." },
      { title: "Garden Dining", image: "/images/placeholder/coming-soon.svg", text: "Alfresco meals under a canopy of tropical greenery." },
    ],
    rooms: [
      { title: "Master Bedroom", image: "/images/placeholder/coming-soon.svg", description: "Pool-facing suite with king bed and ensuite bath." },
      { title: "Guest Bedroom", image: "/images/placeholder/coming-soon.svg", description: "Three additional ensuite rooms for family and friends." },
      { title: "Living Room", image: "/images/placeholder/coming-soon.svg", description: "Open living space flowing into the courtyard." },
      { title: "Kitchen", image: "/images/placeholder/coming-soon.svg", description: "Fully equipped kitchen for private chef service." },
      { title: "Dining Area", image: "/images/placeholder/coming-soon.svg", description: "Indoor-outdoor dining for twelve." },
      { title: "Bathrooms", image: "/images/placeholder/coming-soon.svg", description: "Designer fittings and natural stone finishes." },
      { title: "Outdoor / Pool / Garden", image: "/images/placeholder/coming-soon.svg", description: "Private pool, palm garden, and covered alfresco lounge." },
    ],
    galleryImages: [
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Grove Goa preview" },
    ],
    nearby: [
      { label: "Quiet Beach", url: "#" },
      { label: "Local Café", url: "#" },
      { label: "Grocery Store", url: "#" },
      { label: "Yoga Studio", url: "#" },
      { label: "Seafood Restaurant", url: "#" },
      { label: "ATM", url: "#" },
      { label: "Medical Clinic", url: "#" },
      { label: "Airport", url: "#" },
    ],
    icalUrl: "",
    hostName: "Alok",
  },
  {
    slug: "udaipur-hills",
    name: "Aviora Hills, Udaipur",
    location: "Udaipur, Rajasthan",
    status: "coming-soon",
    badge: "Coming Soon",
    tagline: "Heritage views, restored for slow living.",
    shortDescription:
      "A soon-to-launch hillside retreat near Udaipur, where restored heritage details meet private luxury and Aravalli views.",
    description:
      "Aviora Hills sits above the City of Lakes, offering panoramic Aravalli views, restored heritage architecture, and the same quiet-luxury philosophy. Courtyards, terraces, and private gardens frame every sunset.",
    estateSize: "18,000 sqft",
    highlights: [
      "Aravalli valley views",
      "5 ensuite bedrooms",
      "Restored heritage details",
      "Private terraces",
    ],
    heroImages: [
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur villa preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur terrace preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur courtyard preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur suite preview" },
    ],
    spaces: [
      { title: "Master Bedroom", image: "/images/placeholder/coming-soon.svg", description: "Valley-facing suite with private terrace and antique furnishings." },
      { title: "Guest Bedrooms", image: "/images/placeholder/coming-soon.svg", description: "Four elegant rooms with ensuite baths and garden or courtyard views." },
      { title: "Living Room", image: "/images/placeholder/coming-soon.svg", description: "Double-height lounge with heritage arches and modern comforts." },
      { title: "Kitchen", image: "/images/placeholder/coming-soon.svg", description: "Contemporary kitchen for traditional and global cuisines." },
      { title: "Dining Area", image: "/images/placeholder/coming-soon.svg", description: "Long dining table overlooking the valley." },
      { title: "Bathrooms", image: "/images/placeholder/coming-soon.svg", description: "Stone-clad bathrooms with rain showers and heritage fixtures." },
    ],
    experiences: [
      { title: "Sunset Terrace", image: "/images/placeholder/coming-soon.svg", text: "Watch the Aravalli range turn gold from your private terrace." },
      { title: "Heritage Courtyard", image: "/images/placeholder/coming-soon.svg", text: "Evening gatherings around a traditional courtyard fire." },
      { title: "Lake Excursions", image: "/images/placeholder/coming-soon.svg", text: "Curated boat and heritage walks into Udaipur’s old city." },
    ],
    rooms: [
      { title: "Master Bedroom", image: "/images/placeholder/coming-soon.svg", description: "Valley-facing suite with private terrace and antique furnishings." },
      { title: "Guest Bedroom", image: "/images/placeholder/coming-soon.svg", description: "Four elegant rooms with ensuite baths and garden or courtyard views." },
      { title: "Living Room", image: "/images/placeholder/coming-soon.svg", description: "Double-height lounge with heritage arches and modern comforts." },
      { title: "Kitchen", image: "/images/placeholder/coming-soon.svg", description: "Contemporary kitchen for traditional and global cuisines." },
      { title: "Dining Area", image: "/images/placeholder/coming-soon.svg", description: "Long dining table overlooking the valley." },
      { title: "Bathrooms", image: "/images/placeholder/coming-soon.svg", description: "Stone-clad bathrooms with rain showers and heritage fixtures." },
      { title: "Outdoor / Pool / Garden", image: "/images/placeholder/coming-soon.svg", description: "Terraced gardens, private pool, and sunset lounge." },
    ],
    galleryImages: [
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Hills Udaipur preview" },
    ],
    nearby: [
      { label: "City Palace", url: "#" },
      { label: "Lake Pichola", url: "#" },
      { label: "Jagdish Temple", url: "#" },
      { label: "Old City Market", url: "#" },
      { label: "Sunset Point", url: "#" },
      { label: "Heritage Café", url: "#" },
      { label: "Medical Store", url: "#" },
      { label: "Airport", url: "#" },
    ],
    icalUrl: "",
    hostName: "Alok",
  },
  {
    slug: "rishikesh-valley",
    name: "Aviora Valley, Rishikesh",
    location: "Rishikesh, Uttarakhand",
    status: "coming-soon",
    badge: "Coming Soon",
    tagline: "River-facing serenity for wellness and slow retreats.",
    shortDescription:
      "A soon-to-launch riverside retreat in Rishikesh, where forested hills, yoga-filled mornings, and private outdoor spaces come together under the Aviora philosophy of slow luxury.",
    description:
      "Aviora Valley sits along the gentle rhythm of the Himalayan foothills. Designed as a private wellness sanctuary, the retreat blends natural materials, open-air pavilions, and river-facing suites for guests seeking stillness, practice, and celebration in nature.",
    estateSize: "15,000 sqft",
    highlights: [
      "River-facing suites",
      "Private yoga pavilion",
      "Outdoor firepit lounge",
      "Wellness-oriented spaces",
    ],
    heroImages: [
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh villa preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh river deck preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh yoga pavilion preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh suite preview" },
    ],
    spaces: [
      { title: "Master Suite", image: "/images/placeholder/coming-soon.svg", description: "River-facing suite with private balcony and meditation nook." },
      { title: "Guest Suites", image: "/images/placeholder/coming-soon.svg", description: "Light-filled rooms with forest views and ensuite baths." },
      { title: "Living Pavilion", image: "/images/placeholder/coming-soon.svg", description: "Open-plan lounge flowing into the garden and river deck." },
      { title: "Kitchen", image: "/images/placeholder/coming-soon.svg", description: "Modern kitchen for nourishing, slow-prepared meals." },
      { title: "Dining Area", image: "/images/placeholder/coming-soon.svg", description: "Indoor-outdoor dining for ten with river views." },
      { title: "Bathrooms", image: "/images/placeholder/coming-soon.svg", description: "Stone and wood bathrooms with rain showers." },
    ],
    experiences: [
      { title: "Yoga Pavilion", image: "/images/placeholder/coming-soon.svg", text: "A shaded, open-air pavilion for morning practice and group sessions." },
      { title: "River Deck", image: "/images/placeholder/coming-soon.svg", text: "Quiet hours by the water, designed for reflection and rest." },
      { title: "Forest Dining", image: "/images/placeholder/coming-soon.svg", text: "Celebrations and shared meals under a canopy of leaves." },
    ],
    rooms: [
      { title: "Master Suite", image: "/images/placeholder/coming-soon.svg", description: "River-facing suite with private balcony and meditation nook." },
      { title: "Guest Suite", image: "/images/placeholder/coming-soon.svg", description: "Light-filled rooms with forest views and ensuite baths." },
      { title: "Living Pavilion", image: "/images/placeholder/coming-soon.svg", description: "Open-plan lounge flowing into the garden and river deck." },
      { title: "Kitchen", image: "/images/placeholder/coming-soon.svg", description: "Modern kitchen for nourishing, slow-prepared meals." },
      { title: "Dining Area", image: "/images/placeholder/coming-soon.svg", description: "Indoor-outdoor dining for ten with river views." },
      { title: "Bathrooms", image: "/images/placeholder/coming-soon.svg", description: "Stone and wood bathrooms with rain showers." },
      { title: "Outdoor / River / Garden", image: "/images/placeholder/coming-soon.svg", description: "River deck, yoga pavilion, firepit lounge, and forested gardens." },
    ],
    galleryImages: [
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh preview" },
      { src: "/images/placeholder/coming-soon.svg", alt: "Aviora Valley Rishikesh preview" },
    ],
    nearby: [
      { label: "Ganga Ghats", url: "#" },
      { label: "Yoga Ashrams", url: "#" },
      { label: "Cafés", url: "#" },
      { label: "Rafting Point", url: "#" },
      { label: "Forest Trails", url: "#" },
      { label: "Wellness Centres", url: "#" },
      { label: "Local Market", url: "#" },
      { label: "Airport", url: "#" },
    ],
    icalUrl: "",
    hostName: "Alok",
  },
];

export const liveProperty = properties.find((p) => p.status === "live") || properties[0];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
