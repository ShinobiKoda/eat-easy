import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  name?: string;
  type?: string;
}

export default function SEO({ title, description, type }: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {type && <meta property="og:type" content={type} />}

      {/* Twitter tags */}
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
}
