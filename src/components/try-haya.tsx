import React from "react";

export function TryHaya() {
  const [url, setUrl] = React.useState("");
  const [phase, setPhase] = React.useState("idle"); // idle, running, done
  const [logs, setLogs] = React.useState([]);
  const [results, setResults] = React.useState(null);
  const [elapsed, setElapsed] = React.useState(0);
  const timerRef = React.useRef(null);

  const seedLogs = [
    { t: "INIT", m: "Spawning sandbox · region us-east-1", s: "" },
    { t: "NAV ", m: "Loading first paint...", s: "ok" },
    { t: "DOM ", m: "Parsed 2,438 nodes · 14 viewports", s: "" },
    { t: "A11Y", m: "WCAG 2.2 AA pass · checking AAA", s: "warn" },
    { t: "HEUR", m: "Nielsen + Fitt's + Hick's heuristics", s: "" },
    { t: "CV  ", m: "Vision model: identifying CTAs, dead-ends", s: "" },
    { t: "SCAN", m: "Cross-referencing 1.2M shipped patterns", s: "" },
    { t: "DONE", m: "Audit complete", s: "ok" },
  ];

  const run = (e) => {
    e.preventDefault();
    if (!url || phase === "running") return;
    setPhase("running");
    setLogs([]);
    setResults(null);
    setElapsed(0);
    const start = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(((Date.now() - start) / 1000).toFixed(1));
    }, 100);

    seedLogs.forEach((line, i) => {
      setTimeout(
        () => {
          setLogs((p) => [...p, line]);
          if (i === seedLogs.length - 1) {
            clearInterval(timerRef.current);
            setPhase("done");
            // Stable hash of url for fake but consistent results
            let h = 0;
            for (let j = 0; j < url.length; j++)
              h = (h * 31 + url.charCodeAt(j)) | 0;
            const high = Math.abs(h % 6) + 2;
            const med = Math.abs((h >> 3) % 9) + 3;
            const low = Math.abs((h >> 6) % 14) + 5;
            setResults({ high, med, low });
          }
        },
        300 + i * 280,
      );
    });
  };

  return (
    <section className="section" id="try">
      <div className="container">
        <div className="try">
          <div className="try-inner">
            <div className="section-eyebrow">03 · Try it now</div>
            <h3>
              Audit any live URL in <em>under 12 seconds.</em>
            </h3>
            <p>No signup. No install. Drop a link, watch Haya tear it apart.</p>

            <form className="try-input-row" onSubmit={run}>
              <input
                className="try-input"
                placeholder="https://your-product.com/checkout"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={phase === "running"}
              />
              <button
                className="try-btn"
                type="submit"
                disabled={phase === "running" || !url}
              >
                {phase === "running" ? (
                  <React.Fragment>
                    <span
                      className="spin"
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                        animation: "spin 0.8s linear infinite",
                      }}
                    ></span>
                    Auditing
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    Run audit
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </React.Fragment>
                )}
              </button>
            </form>

            {phase !== "idle" && (
              <div className="try-output">
                <div className="try-output-h">
                  <span className="url">{url || "—"}</span>
                  <span className="timer">{elapsed}s elapsed</span>
                </div>
                <div className="try-log">
                  {logs.map((l, i) => (
                    <div key={i} className="line">
                      <span className="t">[{l.t}]</span>
                      <span className={l.s}>{l.m}</span>
                    </div>
                  ))}
                </div>
                {results && (
                  <div className="try-results">
                    <div className="try-result">
                      <div className="label">High severity</div>
                      <div className="val high">{results.high}</div>
                      <div className="delta">blocking conversion</div>
                    </div>
                    <div className="try-result">
                      <div className="label">Medium</div>
                      <div className="val med">{results.med}</div>
                      <div className="delta">friction & confusion</div>
                    </div>
                    <div className="try-result">
                      <div className="label">Low / polish</div>
                      <div className="val low">{results.low}</div>
                      <div className="delta">a11y & micro-copy</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
