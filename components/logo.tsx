"use client";
import { Logo as LogoPrimitive } from "@workspace/assets/logo";
import { gsap, useGSAP } from "@workspace/ui/lib/gsap.util";
import { cn } from "@workspace/ui/lib/utils";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAudioEffect } from "@/src/assets/audio/player";

export const LogoIcon = () => {
	return <Logo />;
};

export const Logo = ({
	className,
	...props
}: React.ComponentProps<"button">) => {
	const { play, paused, toggle } = useAudioEffect();
	const container = useRef(null);

	// Autoplay on page load
	useEffect(() => {
		play?.();
	}, [play]);

	useGSAP(
		() => {
			if (!paused) {
				gsap.to(".logo-icon-wrap", {
					rotation: 360,
					duration: 8,
					repeat: -1,
					ease: "none",
				});
				gsap.to(".logo-icon-wrap", {
					scale: 1.1,
					duration: 2,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			} else {
				gsap.set(".logo-icon-wrap", { rotation: 0, scale: 1 });
			}
		},
		{ scope: container, dependencies: [!paused] },
	);

	return (
		<button
			ref={container}
			className={cn(
				"flex items-center gap-2 font-bold tracking-widest text-sm cursor-pointer select-none",
				className,
			)}
			onClick={toggle}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === "") {
					toggle();
				}
			}}
			{...props}
		>
			<div className="logo-icon-wrap flex items-center justify-center">
				<LogoPrimitive className="size-5" />
			</div>
			HAYA
		</button>
	);
};

export const LogoPlay = ({
	className,
	...props
}: React.ComponentProps<"button">) => {
	const { paused, toggle } = useAudioEffect();
	const container = useRef(null);

	useGSAP(
		() => {
			if (!paused) {
				gsap.to(".logo-icon-wrap", {
					rotation: 360,
					duration: 12,
					repeat: -1,
					ease: "none",
				});
			} else {
				gsap.set(".logo-icon-wrap", { rotation: 0 });
			}
		},
		{ scope: container, dependencies: [!paused] },
	);

	return (
		<button
			ref={container}
			className={cn(
				"relative group cursor-pointer transition-transform active:scale-95",
				className,
			)}
			onClick={toggle}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === "") {
					toggle();
				}
			}}
			{...props}
		>
			<div className="logo-icon-wrap flex items-center justify-center">
				<LogoPrimitive className="size-16" />
			</div>
			<div
				className={cn(
					"absolute inset-0 flex items-center justify-center transition-opacity",
					!paused ? "opacity-0 group-hover:opacity-100" : "opacity-100",
				)}
			>
				<div className="bg-violet/80 backdrop-blur-sm rounded-full p-2.5 shadow-xl border border-violet-2/30">
					{!paused ? (
						<Pause className="size-5 fill-white text-white" />
					) : (
						<Play className="size-5 fill-white text-white translate-x-0.5" />
					)}
				</div>
			</div>
		</button>
	);
};
