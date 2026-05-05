import { HomePage } from "@/components/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haya | AI-Powered Behavioral Audit & Funnel Optimization",
  description:
    "See the friction, fix the funnel. Haya AI automatically identifies conversion blockers and behavioral friction points on your website or app in minutes.",
  keywords: [
    "AI audit",
    "behavioral audit",
    "funnel optimization",
    "UX design",
    "conversion rate optimization",
    "CRO",
  ],
  authors: [{ name: "Haya Team" }],
  openGraph: {
    title: "Haya | AI-Powered Behavioral Audit",
    description:
      "Automatically identify and fix friction points in your user journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haya | AI-Powered Behavioral Audit",
    description: "Identify friction points in your funnel automatically.",
  },
};

export default function Home() {
  return <HomePage />;
}
