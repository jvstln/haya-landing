"use client";
import { gsap, useGSAP } from "@workspace/ui/lib/gsap.util";
import React from "react";
import { Bento } from "./bento";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { LogoPlay } from "./logo";
import { Nav } from "./nav";
import { Steps } from "./steps";

export function HomePage() {
	const container = React.useRef(null);

	useGSAP(
		() => {
			gsap.from(".floating-owl", {
				y: 40,
				opacity: 0,
				duration: 1.5,
				delay: 1,
				ease: "power4.out",
			});
		},
		{ scope: container },
	);

	return (
		<div ref={container}>
			<div className="bg-field" />
			<div className="shell">
				<Nav />
				<Hero />
				<Bento />
				{/* <TryHaya /> */}
				<Steps />
				{/* <CTA /> */}
				<Footer />
			</div>
			<div className="floating-owl fixed bottom-10 right-10 z-60 gsap-reveal">
				<LogoPlay />
			</div>
		</div>
	);
}
