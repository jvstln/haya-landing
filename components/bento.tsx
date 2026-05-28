"use client";
import { gsap, useGSAP } from "@workspace/ui/lib/gsap.util";
import { Grid2 } from "iconsax-reactjs";
import { type ReactNode, useRef } from "react";

interface BentoItem {
	cardClassName: string;
	icon: ReactNode;
	title: string;
	description: string;
	animAreaClassName?: string;
	animContent: ReactNode;
}

const bentoItems: BentoItem[] = [
	{
		cardClassName: "col-3 row-2",
		icon: <Grid2 />,
		title: "Silent Observation Engine",
		description:
			"Haya installs with one line of script. From that moment, it tracks every behavioral signal silently,  hover hesitation, scroll reversals, rage clicks, form abandonment, and session path sequences. Haya watches without being seen.",
		animContent: (
			<div className="scanner-mini">
				<div className="blocks">
					{Array.from({ length: 30 }).map(() => (
						<div key={Math.random()}></div>
					))}
				</div>
				<div className="scan"></div>
			</div>
		),
	},
	{
		cardClassName: "col-3",
		icon: <path d="M3 3l7.07 19 2.51-7.42L20 12.07 3 3z" />,
		title: "Behavioral Persona Builder",
		description:
			"Haya doesn't rely on demographics or assumptions. It builds dynamic user personas from real behavioral patterns observed across your product continuously learning how users interact, hesitate, navigate, and drop off in real time.",
		animAreaClassName: "cursor-trail",
		animContent: (
			<svg viewBox="0 0 300 60" preserveAspectRatio="none">
				<title>Line path illustration</title>
				<path className="path" d="M10,30 Q60,5 110,30 T210,30 Q260,55 290,20" />
				<path
					className="cursor"
					transform="translate(10,30)"
					d="M0,0 L0,12 L4,9 L7,15 L9,14 L6,8 L11,8 Z"
				/>
			</svg>
		),
	},
	{
		cardClassName: "col-3",
		icon: (
			<>
				<rect x="2" y="4" width="20" height="14" rx="2" />
				<path d="M8 22h8M12 18v4" />
			</>
		),
		title: "Friction Detection",
		description:
			"Every behavioral anomaly is flagged with the exact screen, the exact signal, and the exact moment it happened backed by session context. Not a vague report.",
		animAreaClassName: "shot-stack",
		animContent: (
			<>
				<div className="shot"></div>
				<div className="shot"></div>
				<div className="shot"></div>
			</>
		),
	},
	{
		cardClassName: "col-3",
		icon: <path d="M20 6L9 17l-5-5" />,
		title: "Fix Recommendations with Impact Score",
		description:
			"Every friction point comes with a ranked, actionable fix and a predicted conversion delta directly into your teams channel. Your team knows what to ship next and why.",
		animAreaClassName: "fix-list",
		animContent: (
			<>
				<div className="fix-item">
					<span className="check">✓</span> button.aria-label
				</div>
				<div className="fix-item">
					<span className="check">✓</span> input/autocomplete
				</div>
				<div className="fix-item">
					<span className="check">✓</span> focus-visible ring
				</div>
			</>
		),
	},
	// {
	// 	cardClassName: "col-2",
	// 	icon: <Grid2 />,
	// 	title: "Behavioral Intelligence Marketplace",
	// 	description:
	// 		"List your product, set a bounty, and let expert behavioral reviewers surface friction points your agents flagged for human validation. You pay for results — not retainers.",
	// 	animAreaClassName: "market-grid",
	// 	animContent: (
	// 		<>
	// 			{Array.from({ length: 6 }).map(() => (
	// 				<div key={Math.random()} className="market-card"></div>
	// 			))}
	// 		</>
	// 	),
	// },
	{
		cardClassName: "col-3",
		icon: <path d="M12 2v20M2 12h20" />,
		title: "Human Intelligence Canvas",
		description:
			"Real behavioral reviewers validate and annotate what Haya's agents surface on a shared canvas. The loop closes: agent intelligence confirmed by human judgment.",
		animContent: (
			<div className="x402-flow">
				<div className="x402-node">CI</div>
				<div className="x402-line">
					<div className="x402-pulse"></div>
				</div>
				<div className="x402-node">HAYA</div>
				<div className="x402-line">
					<div className="x402-pulse" style={{ animationDelay: "1s" }}></div>
				</div>
				<div className="x402-node">PR</div>
			</div>
		),
	},
];

export function Bento() {
	const container = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			gsap.from(".section-head > *", {
				scrollTrigger: {
					trigger: ".section-head",
					start: "top 80%",
				},
				y: 30,
				opacity: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: "power4.out",
			});

			gsap.from(".bento-card", {
				scrollTrigger: {
					trigger: ".bento",
					start: "top 90%",
				},
				y: 40,
				opacity: 0,
				duration: 1,
				stagger: 0.15,
				ease: "power4.out",
			});
		},
		{ scope: container },
	);

	const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = e.currentTarget;
		const r = card.getBoundingClientRect();
		card.style.setProperty("--mx", `${e.clientX - r.left}px`);
		card.style.setProperty("--my", `${e.clientY - r.top}px`);
	};

	return (
		<section className="section" id="features" ref={container}>
			<div className="container gsap-reveal">
				<div className="section-head">
					<div className="section-eyebrow">02 · The product</div>
					<h2 className="font-inter mb-4 text-balance">
						Two agents. One continuous loop. <em>Zero blind spots.</em>
					</h2>
					<p className="section-sub">
						One agent watches every user session. The other turns patterns into
						live behavioral archetypes and flags friction before it hurts
						growth. Together, they give your product a real-time understanding
						of user behavior.
					</p>
				</div>

				<div className="bento">
					{bentoItems.map(
						({
							cardClassName,
							icon,
							title,
							description,
							animAreaClassName,
							animContent,
						}) => (
							<section
								role="region"
								key={title}
								className={`bento-card ${cardClassName}`}
								onMouseMove={onMove}
							>
								<div className="icon">
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<title>{title}</title>
										{icon}
									</svg>
								</div>
								<h3>{title}</h3>
								<p>{description}</p>
								<div
									className={`anim-area${animAreaClassName ? ` ${animAreaClassName}` : ""}`}
								>
									{animContent}
								</div>
							</section>
						),
					)}
				</div>
			</div>
		</section>
	);
}
