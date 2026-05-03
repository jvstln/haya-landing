import { HayaMark } from "./logo";

export function CTA() {
  return (
    <section className="container" id="cta">
      <div className="cta">
        <h2>
          Your funnel <em>is leaking.</em>
          <br />
          Let's plug it.
        </h2>
        <p>
          Join the private beta. We're onboarding 12 design-led teams a week.
        </p>
        <form
          className="cta-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input placeholder="you@company.com" type="email" required />
          <button className="btn btn-primary" type="submit">
            Request access
          </button>
        </form>
      </div>
    </section>
  );
}

export function Trusted() {
  const logos = [
    { t: "Northwind", cls: "" },
    { t: "LIGHTHOUSE", cls: "sans" },
    { t: "Cumulus", cls: "" },
    { t: "PRISM/CO", cls: "mono" },
    { t: "Atelier", cls: "" },
    { t: "OBSIDIAN", cls: "sans" },
  ];
  return (
    <section className="container">
      <div className="trusted">
        <div className="trusted-label">Backed and used by teams from</div>
        <div className="trusted-row">
          {logos.map((l, i) => (
            <span key={i} className={`trusted-logo ${l.cls}`}>
              {l.t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          <div className="footer-col">
            <div className="logo" style={{ marginBottom: 14 }}>
              <span className="logo-mark">
                <HayaMark size={18} />
              </span>
              HAYA
            </div>
            <p>
              The AI design auditor for ambitious teams. See the friction, fix
              the funnel.
            </p>
            <div className="footer-socials" style={{ marginTop: 16 }}>
              <a className="socbtn" href="#" aria-label="X">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a className="socbtn" href="#" aria-label="GitHub">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .3" />
                </svg>
              </a>
              <a className="socbtn" href="#" aria-label="LinkedIn">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7H9.3V9h3.42v1.56h.05c.48-.91 1.65-1.87 3.4-1.87 3.63 0 4.3 2.39 4.3 5.5v6.26z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <a href="#features">Features</a>
            <a href="#try">Try a demo</a>
            <a href="#how">How it works</a>
            <a href="#">Changelog</a>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Manifesto</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <a href="#">Documentation</a>
            <a href="#">API</a>
            <a href="#">Status</a>
            <a href="#">Privacy</a>
          </div>
        </div>

        <div className="bigmark">haya</div>

        <div className="footer-bottom">
          <span>© 2026 HAYA LABS · BUILT FOR TEAMS WHO SHIP</span>
          <span>v1.4.2 · ALL SYSTEMS NOMINAL</span>
        </div>
      </div>
    </footer>
  );
}
