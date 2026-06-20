import { business, pricing } from "@/lib/config";

export function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.phone,
    email: business.email,
    image: `${business.url}/images/hero/villa-front-day.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressCountry: "IN",
    },
    priceRange: `${pricing.weekday.amount} - ${pricing.weekend.amount}`,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private pool" },
      { "@type": "LocationFeatureSpecification", name: "Air conditioning" },
      { "@type": "LocationFeatureSpecification", name: "Fully equipped kitchen" },
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi" },
      { "@type": "LocationFeatureSpecification", name: "Parking" },
      { "@type": "LocationFeatureSpecification", name: "Garden" },
    ],
    sameAs: [business.instagram, business.airbnb].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
