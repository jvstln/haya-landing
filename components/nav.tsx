"use client";
import { LINKS } from "@workspace/assets/data";
import { Button } from "@workspace/ui/components/button";
import { gsap, useGSAP } from "@workspace/ui/lib/gsap.util";
import Link from "next/link";
import React from "react";
import { Logo } from "./logo";

export function Nav() {
	const container = React.useRef(null);

	useGSAP(
		() => {
			gsap.from(".nav-inner > *", {
				y: -20,
				opacity: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: "power4.out",
				delay: 0.2,
			});
		},
		{ scope: container },
	);

	return (
		<nav className="nav backdrop-blur-xs" ref={container}>
			<div className="container nav-inner gsap-reveal">
				<Logo className="nav-logo" />
				<div className="nav-links">
					<a href="#features">Product</a>
					<a
						href={LINKS.documentationUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Documentation
					</a>
				</div>
				<div className="nav-cta">
					<Button
						appearance="solid"
						color="primary"
						className="animate-border-glow rounded-full"
						asChild
					>
						<Link href={LINKS.webAppUrl}>Start now</Link>
					</Button>
				</div>
			</div>
		</nav>
	);
}
