export interface AudioController {
	play: () => void;
	pause: () => void;
	onPause: (cb: (paused: boolean) => void) => () => void;
	paused: boolean;
	ctx: AudioContext | null;
}

type Timer = ReturnType<typeof setTimeout> | null;

export function audioEffectPlayer(ctx?: AudioContext): AudioController {
	let activeCtx: AudioContext | null = ctx ?? null;
	let master: GainNode | null = null;
	let playing = false;

	let owlTimer: Timer = null;
	let crystalTimer: Timer = null;

	const nodes: { stop?: (time?: number) => void; disconnect?: () => void }[] =
		[];

	const listeners = new Set<(paused: boolean) => void>();
	const notify = (paused: boolean) =>
		listeners.forEach((l) => {
			l(paused);
		});

	function mkRev(dur: number, dec: number) {
		if (!activeCtx) throw new Error("AudioContext is not initialized");
		const len = activeCtx.sampleRate * dur;
		const buf = activeCtx.createBuffer(2, len, activeCtx.sampleRate);
		for (let c = 0; c < 2; c++) {
			const d = buf.getChannelData(c);
			for (let i = 0; i < len; i++)
				d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** dec;
		}
		const cv = activeCtx.createConvolver();
		cv.buffer = buf;
		return cv;
	}

	function startAudio() {
		if (!activeCtx || !playing) return;

		master = activeCtx.createGain();
		master.gain.setValueAtTime(0, activeCtx.currentTime);
		master.connect(activeCtx.destination);
		master.gain.linearRampToValueAtTime(0.65, activeCtx.currentTime + 5);

		// --- Breath ---
		const gBreath = activeCtx.createGain();
		gBreath.gain.setValueAtTime(0, activeCtx.currentTime);
		const revBreath = mkRev(5, 1.8);
		const rGBreath = activeCtx.createGain();
		rGBreath.gain.setValueAtTime(0.65, activeCtx.currentTime);

		const chord = [110, 138.6, 165, 220, 261.6, 277.2, 330];
		const vols = [0.55, 0.32, 0.42, 0.28, 0.2, 0.15, 0.1];

		chord.forEach((f, i) => {
			if (!activeCtx) return;
			const o = activeCtx.createOscillator();
			o.type = "sine";
			o.frequency.setValueAtTime(
				f * (1 + Math.random() * 0.002),
				activeCtx.currentTime,
			);

			const og = activeCtx.createGain();
			og.gain.setValueAtTime(vols[i], activeCtx.currentTime);

			const lfo = activeCtx.createOscillator();
			lfo.type = "sine";
			lfo.frequency.setValueAtTime(0.055 + i * 0.012, activeCtx.currentTime);

			const lG = activeCtx.createGain();
			lG.gain.setValueAtTime(f * 0.003, activeCtx.currentTime);

			lfo.connect(lG);
			lG.connect(o.frequency);
			o.connect(og);
			og.connect(gBreath);

			o.start();
			lfo.start();
			nodes.push(o, lfo);
		});

		const bLFO = activeCtx.createOscillator();
		bLFO.type = "sine";
		bLFO.frequency.setValueAtTime(1 / 7, activeCtx.currentTime);
		const blG = activeCtx.createGain();
		blG.gain.setValueAtTime(0.16, activeCtx.currentTime);
		bLFO.connect(blG);
		blG.connect(gBreath.gain);
		bLFO.start();
		nodes.push(bLFO);

		const filt = activeCtx.createBiquadFilter();
		filt.type = "lowpass";
		filt.frequency.setValueAtTime(850, activeCtx.currentTime);

		gBreath.connect(filt);
		filt.connect(revBreath);
		revBreath.connect(rGBreath);
		rGBreath.connect(master);
		filt.connect(master);

		gBreath.gain.linearRampToValueAtTime(0.2, activeCtx.currentTime + 7);

		// --- Wind ---
		const gWind = activeCtx.createGain();
		gWind.gain.setValueAtTime(0, activeCtx.currentTime);
		const wLen = activeCtx.sampleRate * 4;
		const wBuf = activeCtx.createBuffer(1, wLen, activeCtx.sampleRate);
		const wData = wBuf.getChannelData(0);
		for (let i = 0; i < wLen; i++) wData[i] = Math.random() * 2 - 1;

		const src = activeCtx.createBufferSource();
		src.buffer = wBuf;
		src.loop = true;

		const f1 = activeCtx.createBiquadFilter();
		f1.type = "bandpass";
		f1.frequency.setValueAtTime(260, activeCtx.currentTime);
		f1.Q.setValueAtTime(0.4, activeCtx.currentTime);

		const f2 = activeCtx.createBiquadFilter();
		f2.type = "bandpass";
		f2.frequency.setValueAtTime(480, activeCtx.currentTime);
		f2.Q.setValueAtTime(0.3, activeCtx.currentTime);

		const revWind = mkRev(6, 2.2);
		const rGWind = activeCtx.createGain();
		rGWind.gain.setValueAtTime(0.75, activeCtx.currentTime);

		src.connect(f1);
		f1.connect(gWind);
		src.connect(f2);
		f2.connect(gWind);
		gWind.connect(revWind);
		revWind.connect(rGWind);
		rGWind.connect(master);

		gWind.gain.linearRampToValueAtTime(0.05, activeCtx.currentTime + 9);
		src.start();
		nodes.push(src);

		// --- Owl ---
		function fireOwl() {
			if (!playing || !master || !activeCtx) return;
			const now = activeCtx.currentTime;
			const base = 170 + Math.random() * 50;
			const rev = mkRev(4, 2.4);
			const rG = activeCtx.createGain();
			rG.gain.setValueAtTime(0.85, now);
			rev.connect(rG);
			rG.connect(master);

			[0, 0.88].forEach((offset, hi) => {
				if (!activeCtx) return;
				const t = now + offset;
				const env = activeCtx.createGain();
				env.gain.setValueAtTime(0, t);
				env.gain.linearRampToValueAtTime(0.085, t + 0.2);
				env.gain.setValueAtTime(0.085, t + 0.52);
				env.gain.linearRampToValueAtTime(0, t + 1.1);

				[1, 1.99, 3.02].forEach((ratio, j) => {
					if (!activeCtx) return;
					const o = activeCtx.createOscillator();
					o.type = "sine";
					const f = base * (hi ? 0.87 : 1) * ratio;
					o.frequency.setValueAtTime(f * 1.04, t);
					o.frequency.linearRampToValueAtTime(f * (hi ? 0.9 : 0.96), t + 1.1);

					const hG = activeCtx.createGain();
					hG.gain.setValueAtTime([1, 0.1, 0.035][j], t);

					const filt = activeCtx.createBiquadFilter();
					filt.type = "lowpass";
					filt.frequency.setValueAtTime(580, t);
					filt.Q.setValueAtTime(3.5, t);

					o.connect(filt);
					filt.connect(hG);
					hG.connect(env);
					env.connect(rev);
					env.connect(master!);

					o.start(t);
					o.stop(t + 1.25);
					nodes.push(o);
				});
			});

			owlTimer = setTimeout(fireOwl, 12000 + Math.random() * 13000);
		}

		// --- Crystal ---
		function fireCrystal() {
			if (!playing || !master || !activeCtx) return;
			const now = activeCtx.currentTime;
			const scale = [261.6, 293.7, 329.6, 369.9, 415.3, 466.2, 523.3, 587.3];
			const note = scale[Math.floor(Math.random() * scale.length)];
			const rev = mkRev(7, 1.3);
			const rG = activeCtx.createGain();
			rG.gain.setValueAtTime(0.9, now);
			rev.connect(rG);
			rG.connect(master);

			[1, 2, 3].forEach((ratio, i) => {
				if (!activeCtx) return;
				const o = activeCtx.createOscillator();
				o.type = "sine";
				o.frequency.setValueAtTime(note * ratio, now);

				const env = activeCtx.createGain();
				const vol = [0.065, 0.022, 0.007][i];
				env.gain.setValueAtTime(0, now);
				env.gain.linearRampToValueAtTime(vol, now + 0.012);
				env.gain.exponentialRampToValueAtTime(0.0001, now + 5.5 + i * 1.8);

				o.connect(env);
				env.connect(rev);
				env.connect(master!);

				o.start(now);
				o.stop(now + 8);
				nodes.push(o);
			});

			crystalTimer = setTimeout(fireCrystal, 9000 + Math.random() * 11000);
		}

		setTimeout(fireOwl, 6000);
		setTimeout(fireCrystal, 4000);
	}

	const controller: AudioController = {
		play() {
			if (playing) return;

			if (!activeCtx && typeof window !== "undefined") {
				const AC =
					(window as any).AudioContext ?? (window as any).webkitAudioContext;
				activeCtx = new AC();
			}

			if (!activeCtx) return;

			playing = true;
			notify(false);

			if (activeCtx.state === "suspended") {
				const unlockEvents = [
					"click",
					"touchstart",
					"pointerdown",
					"mousemove",
					"scroll",
					"keydown",
				] as const;

				const unlock = async () => {
					if (activeCtx?.state === "suspended") {
						await activeCtx.resume().catch(() => {});
					}

					if (playing) startAudio();
					unlockEvents.forEach((evt) => {
						window.removeEventListener(evt, unlock);
					});
				};
				unlockEvents.forEach((evt) => {
					window.addEventListener(evt, unlock, { once: true });
				});
			} else {
				startAudio();
			}
		},

		pause() {
			if (!playing) return;
			playing = false;
			notify(true);

			if (owlTimer) clearTimeout(owlTimer);
			if (crystalTimer) clearTimeout(crystalTimer);

			if (master && activeCtx) {
				master.gain.cancelScheduledValues(activeCtx.currentTime);
				master.gain.linearRampToValueAtTime(0, activeCtx.currentTime + 2.5);
			}

			nodes.forEach((n) => {
				try {
					if (n.stop && activeCtx) n.stop(activeCtx.currentTime + 3);
				} catch (_) {}
			});

			setTimeout(() => {
				nodes.length = 0;
			}, 3000);
		},

		onPause(cb) {
			listeners.add(cb);
			return () => listeners.delete(cb);
		},

		get ctx() {
			return activeCtx;
		},

		get paused() {
			return !playing;
		},
	};

	return controller;
}
