"use client";
import { useEffect, useState } from "react";
import { audioEffectPlayer } from "./effects";

const audioEffectController = audioEffectPlayer(new window.AudioContext());

export const useAudioEffect = () => {
	const [paused, setPaused] = useState(audioEffectController.paused);

	const toggle = () => {
		if (paused) {
			audioEffectController.play();
		} else {
			audioEffectController.pause();
		}
	};

	useEffect(() => {
		return audioEffectController.onPause(setPaused);
	}, []);

	return {
		...audioEffectController,
		paused,
		toggle,
	};
};
