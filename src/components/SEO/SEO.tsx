import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://flipyu.in/images/social/og-main.png', 
  url = 'https://flipyu.in/' 
}) => {
  const fullTitle = title ? `${title} | Flip` : 'Flip - Trade your craft. Find your people.';
  const fullDescription = description || "The skill-swapping platform for Bengaluru's top creators. Connect with designers, developers, and artists to trade your craft and grow together.";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Flip",
    "url": "https://flipyu.in",
    "description": fullDescription,
    "applicationCategory": "ProfessionalNetworking",
    "operatingSystem": "Web",
    "about": {
      "@type": "Service",
      "name": "Skill-Swapping Platform",
      "description": "A platform for creative professionals to exchange skills in Bengaluru."
    },
    "location": {
      "@type": "Place",
      "name": "Bengaluru, India"
    }
  };

  return (
    <Helmet>
      {/* Base Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
