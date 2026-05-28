"use client";
import { LINKS } from "@workspace/assets/data";
import { Button } from "@workspace/ui/components/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@workspace/ui/components/input-group";
import { gsap, useGSAP } from "@workspace/ui/lib/gsap.util";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

export function TryHaya() {
	const [url, setUrl] = React.useState("");
	const container = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			gsap.from(".try-inner > *", {
				scrollTrigger: {
					trigger: ".try",
					start: "top 80%",
				},
				y: 20,
				opacity: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: "power4.out",
			});
		},
		{ scope: container },
	);

	return (
		<section className="section" id="try" ref={container}>
			<div className="container gsap-reveal">
				<div className="try">
					<div className="try-inner">
						<div className="section-eyebrow">03 · Try it now</div>
						<h3 className="font-inter mb-2 text-balance">
							See your behavioral personas <em>in 7 days.</em>
						</h3>
						<p>
							Paste your product URL. Haya's agents begin observing immediately.
							Within 7 days, you'll see exactly which behavioral personas are
							active inside your product, where each one breaks, and which
							friction points are costing you the most revenue.
						</p>

						<InputGroup className="h-auto">
							<InputGroupInput
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://yourwebsite.com"
							/>
							<InputGroupAddon align="inline-end">
								<Button size="lg" asChild>
									<Link href={LINKS.webAppUrl}>
										Reveal Friction Points
										<ArrowRight />
									</Link>
								</Button>
							</InputGroupAddon>
						</InputGroup>
					</div>
				</div>
			</div>
		</section>
	);
}
