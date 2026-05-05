"use client";
import { useState, useEffect, useCallback } from "react";
import {
  createHayaSoundscape,
  SoundscapeController,
  playHayaHoot,
  playHayaCrystal,
  playUIWhoosh,
  playUIClick,
} from "./effects";

// Singleton instances to prevent multiple soundscapes
let globalController: SoundscapeController | null = null;
let globalContext: AudioContext | null = null;
let globalIsPlaying = true; // Enabled by default
let hasInitialized = false;
const listeners = new Set<(playing: boolean) => void>();

function notifyListeners() {
  listeners.forEach((l) => l(globalIsPlaying));
}

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(globalIsPlaying);

  useEffect(() => {
    listeners.add(setIsPlaying);
    return () => {
      listeners.delete(setIsPlaying);
    };
  }, []);

  const ensureContext = useCallback(() => {
    if (typeof window !== "undefined" && !globalController) {
      const AudioContextClass =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      globalContext = new AudioContextClass();
      globalController = createHayaSoundscape(globalContext!);
    }
    return { ctx: globalContext, ctrl: globalController };
  }, []);

  const toggleSound = useCallback(() => {
    const { ctrl } = ensureContext();
    if (!ctrl) return;

    if (globalIsPlaying) {
      ctrl.stop();
      globalIsPlaying = false;
    } else {
      ctrl.start();
      globalIsPlaying = true;
    }
    notifyListeners();
  }, [ensureContext]);

  useEffect(() => {
    // Initial play attempt
    if (!hasInitialized && typeof window !== "undefined") {
      hasInitialized = true;

      const attemptPlay = async () => {
        const { ctrl, ctx } = ensureContext();
        if (ctrl && globalIsPlaying) {
          try {
            // Attempt to start - will be suspended by browser initially
            ctrl.start();

            // Try resuming immediately (works if browser policy allows it)
            if (ctx?.state === "suspended") {
              ctx.resume().catch(() => {});
            }

            // Listen for the earliest possible user interaction to unlock audio.
            // mousemove/scroll/keydown fire before a deliberate click, so audio
            // starts the instant the user interacts with the page at all.
            const unlockEvents = [
              "click",
              "touchstart",
              "pointerdown",
              "mousemove",
              "scroll",
              "keydown",
            ] as const;

            const unlock = async () => {
              if (ctx?.state === "suspended") {
                await ctx.resume();
              }
              // If the controller was created but never actually started
              // (can happen on some mobile browsers), start it now.
              if (globalIsPlaying && ctrl) {
                ctrl.start();
              }
              unlockEvents.forEach((evt) =>
                window.removeEventListener(evt, unlock),
              );
            };

            unlockEvents.forEach((evt) =>
              window.addEventListener(evt, unlock, { once: true }),
            );
          } catch (e) {
            console.warn("Autoplay blocked:", e);
          }
        }
      };

      attemptPlay();
    }
  }, [ensureContext]);

  // Test triggers for individual sounds (commented out for user testing)
  const testSounds = useCallback(() => {
    const { ctx } = ensureContext();
    if (!ctx) return;

    // playHayaHoot(ctx, ctx.destination);
    // playHayaCrystal(ctx, ctx.destination);
    // playUIWhoosh(ctx, ctx.destination);
    // playUIClick(ctx, ctx.destination);
  }, [ensureContext]);

  return { isPlaying, toggleSound, testSounds };
}
