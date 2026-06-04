"use client";
import { useEffect, useState } from "react";
import { type AudioController, audioEffectPlayer } from "./effects";

let globalController: AudioController | null = null;

export const useAudioEffect = () => {
	const [audioEffectController, setAudioEffectController] =
		useState<AudioController | null>(globalController);
	const [paused, setPaused] = useState(
		globalController ? globalController.paused : true,
	);

	// Initialize global audio controller singleton on the client
	useEffect(() => {
		if (!globalController) {
			globalController = audioEffectPlayer(window);
		}
		setAudioEffectController(globalController);
		setPaused(globalController.paused);
	}, []);

	const toggle = () => {
		if (!audioEffectController) return;

		if (paused) {
			audioEffectController.play();
		} else {
			audioEffectController.pause();
		}
	};

	useEffect(() => {
		if (!audioEffectController) return;
		return audioEffectController.onPause(setPaused);
	}, [audioEffectController]);

	return {
		...audioEffectController,
		paused,
		toggle,
	};
};
