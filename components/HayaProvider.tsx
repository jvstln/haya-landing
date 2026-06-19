"use client";

import haya from "@tryhaya/analytics";
import { useEffect } from "react";

export function HayaProvider() {
	useEffect(() => {
		haya.init("c5b9cdc8-987d-45ac-a2c2-35197619cb94", {
			sessionReplay: true,
			heatmaps: true,
			autoTrack: { clicks: true, scrolls: true, pageviews: true },
			maskInputs: true,
		});
	}, []);

	return null;
}
