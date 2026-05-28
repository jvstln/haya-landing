import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
	title: "Haya | Behavioral Anticipation Platform for SaaS & Web3",
	description:
		"Haya's agents run silently inside your product tracking every hesitation, loop, and abandonment signal across every session. Real behavioral personas. Real friction intelligence. No surveys needed.",
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
		title: "Haya | The Behavioral Anticipation Platform",
		description:
			"Haya watches how your users actually move inside your product, builds behavioral personas from what it sees, and anticipates where friction will cost you revenue — before it does.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Haya | The Behavioral Anticipation Platform",
		description:
			"Haya watches how your users actually move inside your product, builds behavioral personas from what it sees, and anticipates where friction will cost you revenue — before it does.",
	},
};

export default function Home() {
	return <HomePage />;
}
