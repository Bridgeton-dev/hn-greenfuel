"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, prefersReduced } from "../lib/gsap";
import { Arrow } from "./Hero";

const MODES = {
  pellets: {
    label: "Pellets",
    title: "Biomass Pellet Ring-Die Machine",
    desc: "Animated diagram showing dried crop residue entering the hopper, rollers pressing it through a rotating ring die, and fuel pellets exiting onto a conveyor.",
    labels: ["Crop residue in", "Ring-die press", "Fuel pellets out"],
    steps: [
      { n: "01", title: "Feeding", text: "Dried and crushed crop residue enters the hopper." },
      { n: "02", title: "Pressing", text: "Rollers push it through the ring-die holes." },
      { n: "03", title: "Pellets", text: "Pellets leave the die, cool and are bagged." },
    ],
  },
  briquettes: {
    label: "Briquettes",
    title: "Biomass Briquette Ram Press Machine",
    desc: "Animated diagram showing prepared biomass entering the hopper, a reciprocating ram compressing it with natural lignin, and dense hollow briquette logs exiting onto a conveyor.",
    labels: ["Biomass in", "Briquette press", "Briquettes out"],
    steps: [
      { n: "01", title: "Feeding", text: "Prepared biomass enters the hopper." },
      { n: "02", title: "Compressing", text: "Heat and high pressure bind it with natural lignin." },
      { n: "03", title: "Briquettes", text: "Dense logs come out, cool, are cut and stacked." },
    ],
  },
};

export default function MachineAnimation() {
  const [mode, setMode] = useState("pellets");
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const tlRef = useRef(null);
  const visibleRef = useRef(false);
  const pausedRef = useRef(false);
  const manualRef = useRef(false);

  pausedRef.current = paused;

  useEffect(() => {
    setReduced(prefersReduced());
  }, []);

  // Auto-cycle active step 0 -> 1 -> 2 when playing and visible
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      if (!visibleRef.current || document.hidden || manualRef.current) return;
      setActiveStep((s) => (s + 1) % 3);
    }, 2600);
    return () => clearInterval(id);
  }, [paused, reduced, mode]);

  // Build GSAP animations for the active machine SVG
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: !visibleRef.current || pausedRef.current || document.hidden });

      // Straw / biomass pieces falling into hopper
      svg.querySelectorAll(".ma-straw").forEach((el, i) => {
        tl.fromTo(
          el,
          { y: -26, opacity: 0, rotation: (i % 2 === 0 ? -18 : 18), transformOrigin: "50% 50%" },
          { y: 38, opacity: 1, rotation: (i % 2 === 0 ? 15 : -15), duration: 1.4, ease: "power1.in", repeat: -1, repeatDelay: 0.2 },
          i * 0.28
        );
      });

      // Motor 3-blade fan spinning fast
      tl.to(".ma-fan", { rotation: 360, duration: 0.75, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, 0);

      // Control panel blinking green LED & gauge needle
      tl.to(".ma-led", { opacity: 0.25, duration: 0.55, ease: "power1.inOut", yoyo: true, repeat: -1 }, 0);
      tl.to(".ma-needle", { rotation: 36, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 85%" }, 0);

      // Conveyor wheels & belt dashes
      tl.to(".ma-wheel", { rotation: 360, duration: 2.2, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, 0);
      tl.to(".ma-belt-dash", { x: 24, duration: 0.65, ease: "none", repeat: -1 }, 0);

      if (mode === "pellets") {
        // Large toothed ring die rotating slowly
        tl.to(".ma-ring-die", { rotation: 360, duration: 10, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, 0);
        // Two inner rollers spinning in believable direction
        tl.to(".ma-roller", { rotation: 360, duration: 3.2, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, 0);
        // Pellets sliding down angled chute
        svg.querySelectorAll(".ma-chute-pellet").forEach((el, i) => {
          tl.fromTo(
            el,
            { x: -34, y: -22, opacity: 0 },
            { x: 26, y: 18, opacity: 1, duration: 1.1, ease: "power1.in", repeat: -1, repeatDelay: 0.3 },
            i * 0.35
          );
        });
        // Pellets traveling along conveyor
        svg.querySelectorAll(".ma-conv-pellet").forEach((el, i) => {
          tl.fromTo(
            el,
            { x: 0, opacity: 0 },
            { x: 145, opacity: 1, duration: 2.4, ease: "none", repeat: -1 },
            i * 0.48
          );
        });
      } else {
        // Briquette screw/ram reciprocating press
        tl.to(".ma-ram", { x: 30, duration: 0.7, ease: "power2.inOut", yoyo: true, repeat: -1 }, 0);
        tl.to(".ma-cutter", { y: 16, duration: 0.35, ease: "power2.in", yoyo: true, repeat: -1, repeatDelay: 0.7 }, 0.45);
        // Briquette logs moving along conveyor
        svg.querySelectorAll(".ma-log").forEach((el, i) => {
          tl.fromTo(
            el,
            { x: -16, opacity: 0 },
            { x: 140, opacity: 1, duration: 2.8, ease: "none", repeat: -1 },
            i * 0.93
          );
        });
      }

      tlRef.current = tl;
    }, svg);

    return () => ctx.revert();
  }, [mode, reduced]);

  // Play/pause based on IntersectionObserver, tab visibility & user toggle
  useEffect(() => {
    const syncPlayback = () => {
      const tl = tlRef.current;
      if (!tl) return;
      if (visibleRef.current && !pausedRef.current && !document.hidden) {
        tl.play();
      } else {
        tl.pause();
      }
    };

    const el = sectionRef.current;
    let io;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          visibleRef.current = Boolean(entries[0]?.isIntersecting);
          syncPlayback();
        },
        { threshold: 0.15 }
      );
      io.observe(el);
    } else {
      visibleRef.current = true;
    }

    const onVis = () => syncPlayback();
    document.addEventListener("visibilitychange", onVis);
    syncPlayback();

    return () => {
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [paused, mode]);

  const data = MODES[mode];

  const handleStepTap = (idx) => {
    manualRef.current = true;
    setActiveStep(idx);
    setTimeout(() => {
      manualRef.current = false;
    }, 4500);
  };

  return (
    <section className="sec ma-sec" ref={sectionRef} aria-labelledby="ma-heading">
      <div className="wrap">
        <div className="ma-head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="ma-heading" className="h2 ma-h">See how biomass becomes fuel</h2>
          </div>
          <div className="ma-controls">
            <div className="ma-tabs" role="tablist" aria-label="Machine type">
              {Object.entries(MODES).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={mode === key}
                  className={`ma-tab${mode === key ? " is-active" : ""}`}
                  onClick={() => {
                    setMode(key);
                    setActiveStep(0);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {!reduced && (
              <button
                type="button"
                className="ma-pause"
                aria-pressed={paused}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? "Play" : "Pause"}
              </button>
            )}
          </div>
        </div>

        <div className="ma-grid">
          <div className="ma-stage">
            <svg
              ref={svgRef}
              className="ma-svg"
              viewBox="0 0 640 420"
              role="img"
              aria-labelledby="ma-svg-title ma-svg-desc"
            >
              <title id="ma-svg-title">{data.title}</title>
              <desc id="ma-svg-desc">{data.desc}</desc>

              <defs>
                <radialGradient id="maGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff6a1a" stopOpacity="0.32" />
                  <stop offset="65%" stopColor="#ff6a1a" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ff6a1a" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="maBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#26211c" />
                  <stop offset="100%" stopColor="#161310" />
                </linearGradient>
                <linearGradient id="maHopper" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2c2620" />
                  <stop offset="50%" stopColor="#3a3129" />
                  <stop offset="100%" stopColor="#221d18" />
                </linearGradient>
              </defs>

              {/* Soft ember glow & faint dotted circle behind machine */}
              <circle cx="240" cy="235" r="145" fill="url(#maGlow)" />
              <circle
                cx="240"
                cy="235"
                r="134"
                fill="none"
                stroke="#ff6a1a"
                strokeOpacity="0.22"
                strokeWidth="2"
                strokeDasharray="5 8"
              />

              {/* Floor line & machine legs */}
              <line x1="20" y1="366" x2="620" y2="366" stroke="#f3eadb" strokeOpacity="0.18" strokeWidth="2" />
              <rect x="166" y="328" width="16" height="38" rx="2" fill="#241f1a" stroke="#4a4036" strokeWidth="1.5" />
              <rect x="298" y="328" width="16" height="38" rx="2" fill="#241f1a" stroke="#4a4036" strokeWidth="1.5" />
              <rect x="156" y="320" width="170" height="12" rx="3" fill="#2f2822" stroke="#52463b" strokeWidth="1.5" />

              {/* Side motor + shaft + 3-blade fan */}
              <g className="ma-motor">
                <rect x="108" y="230" width="46" height="12" fill="#463c33" />
                <rect x="44" y="206" width="68" height="62" rx="8" fill="url(#maBody)" stroke="#52463b" strokeWidth="2" />
                <line x1="56" y1="218" x2="96" y2="218" stroke="#52463b" strokeWidth="2" />
                <line x1="56" y1="228" x2="96" y2="228" stroke="#52463b" strokeWidth="2" />
                <line x1="56" y1="248" x2="96" y2="248" stroke="#52463b" strokeWidth="2" />
                <line x1="56" y1="258" x2="96" y2="258" stroke="#52463b" strokeWidth="2" />
                {/* Fan housing & 3-blade fan */}
                <circle cx="76" cy="237" r="22" fill="#120f0d" stroke="#5c4e41" strokeWidth="2" />
                <g className="ma-fan">
                  <path d="M76 237 L71 218 A7 7 0 0 1 81 218 Z" fill="#ffc46b" />
                  <path d="M76 237 L93 245 A7 7 0 0 1 87 254 Z" fill="#ffc46b" />
                  <path d="M76 237 L60 250 A7 7 0 0 1 60 239 Z" fill="#ffc46b" />
                  <circle cx="76" cy="237" r="4.5" fill="#ff6a1a" />
                </g>
              </g>

              {/* Control panel: blinking green light + moving gauge needle */}
              <g className="ma-panel">
                <rect x="100" y="286" width="52" height="58" rx="5" fill="#181411" stroke="#52463b" strokeWidth="1.5" />
                <circle cx="115" cy="300" r="4.5" fill="#8fc65a" className="ma-led" />
                <circle cx="132" cy="300" r="4" fill="#ff6a1a" fillOpacity="0.65" />
                {/* Gauge */}
                <circle cx="126" cy="324" r="14" fill="#0f0d0b" stroke="#6a5c4e" strokeWidth="1.5" />
                <path d="M116 326 A10 10 0 0 1 136 326" fill="none" stroke="#8fc65a" strokeWidth="2" />
                <line x1="126" y1="326" x2="119" y2="318" stroke="#ff6a1a" strokeWidth="2" strokeLinecap="round" className="ma-needle" />
                <circle cx="126" cy="326" r="2.2" fill="#f3eadb" />
              </g>

              {/* STEP 1 ZONE: Funnel hopper + falling straw particles */}
              <g className={`ma-zone${activeStep === 0 ? " is-hot" : ""}`}>
                {/* Falling straw/biomass particles */}
                <g>
                  <rect className="ma-straw" x="212" y="52" width="12" height="4" rx="1.5" fill="#8fc65a" />
                  <rect className="ma-straw" x="234" y="48" width="14" height="4" rx="1.5" fill="#ffc46b" />
                  <rect className="ma-straw" x="256" y="54" width="11" height="4" rx="1.5" fill="#8fc65a" />
                  <rect className="ma-straw" x="224" y="60" width="13" height="4" rx="1.5" fill="#d8b979" />
                  <rect className="ma-straw" x="246" y="58" width="10" height="4" rx="1.5" fill="#8fc65a" />
                </g>
                {/* Funnel hopper */}
                <polygon
                  points="186,84 294,84 264,146 216,146"
                  fill="url(#maHopper)"
                  stroke={activeStep === 0 ? "#ff6a1a" : "#625447"}
                  strokeWidth={activeStep === 0 ? "2.5" : "2"}
                />
                <rect x="180" y="76" width="120" height="10" rx="3" fill="#3b3229" stroke="#625447" strokeWidth="1.5" />
              </g>

              {/* STEP 2 ZONE: Machine body + Press */}
              <g className={`ma-zone${activeStep === 1 ? " is-hot" : ""}`}>
                <rect
                  x="152"
                  y="146"
                  width="176"
                  height="174"
                  rx="18"
                  fill="url(#maBody)"
                  stroke={activeStep === 1 ? "#ff6a1a" : "#5a4e42"}
                  strokeWidth={activeStep === 1 ? "3" : "2"}
                />

                {mode === "pellets" ? (
                  <g>
                    {/* Large toothed ring die */}
                    <g className="ma-ring-die">
                      <circle
                        cx="240"
                        cy="234"
                        r="68"
                        fill="#15120f"
                        stroke="#ffc46b"
                        strokeWidth="6"
                        strokeDasharray="10 7"
                      />
                      <circle cx="240" cy="234" r="56" fill="#1d1814" stroke="#6b5d4f" strokeWidth="2" />
                    </g>

                    {/* Two inner rollers with cross spokes */}
                    <g className="ma-roller">
                      <circle cx="218" cy="234" r="19" fill="#2f2821" stroke="#f3eadb" strokeOpacity="0.65" strokeWidth="2" />
                      <line x1="205" y1="234" x2="231" y2="234" stroke="#ffc46b" strokeWidth="2" />
                      <line x1="218" y1="221" x2="218" y2="247" stroke="#ffc46b" strokeWidth="2" />
                    </g>
                    <g className="ma-roller">
                      <circle cx="262" cy="234" r="19" fill="#2f2821" stroke="#f3eadb" strokeOpacity="0.65" strokeWidth="2" />
                      <line x1="249" y1="234" x2="275" y2="234" stroke="#ffc46b" strokeWidth="2" />
                      <line x1="262" y1="221" x2="262" y2="247" stroke="#ffc46b" strokeWidth="2" />
                    </g>

                    {/* Centre hub in ember colour */}
                    <circle cx="240" cy="234" r="10" fill="#ff6a1a" stroke="#ffc46b" strokeWidth="2" />
                  </g>
                ) : (
                  <g>
                    {/* Briquette compression chamber & reciprocating ram */}
                    <rect x="174" y="198" width="132" height="72" rx="8" fill="#14110e" stroke="#625447" strokeWidth="2" />
                    {/* Heating bands */}
                    <rect x="260" y="192" width="14" height="84" rx="2" fill="#ff6a1a" fillOpacity="0.45" stroke="#ff6a1a" strokeWidth="1.5" />
                    <rect x="282" y="192" width="14" height="84" rx="2" fill="#ff6a1a" fillOpacity="0.45" stroke="#ff6a1a" strokeWidth="1.5" />
                    {/* Ram & screw */}
                    <g className="ma-ram">
                      <rect x="178" y="218" width="52" height="32" rx="4" fill="#3e342b" stroke="#ffc46b" strokeWidth="2" />
                      <line x1="186" y1="224" x2="216" y2="224" stroke="#ffc46b" strokeWidth="2" />
                      <line x1="186" y1="234" x2="216" y2="234" stroke="#ff6a1a" strokeWidth="2" />
                      <line x1="186" y1="244" x2="216" y2="244" stroke="#ffc46b" strokeWidth="2" />
                    </g>
                    {/* Extruded hollow briquette nozzle */}
                    <rect x="328" y="220" width="44" height="28" rx="4" fill="#2c251f" stroke="#706152" strokeWidth="2" />
                    <rect x="364" y="224" width="24" height="20" rx="3" fill="#c98842" />
                    <ellipse cx="388" cy="234" rx="4" ry="10" fill="#5b3b1e" />
                    <ellipse cx="388" cy="234" rx="2" ry="4" fill="#0f0d0b" />
                    {/* Vertical cutter blade */}
                    <rect className="ma-cutter" x="394" y="200" width="6" height="26" rx="2" fill="#ffc46b" />
                  </g>
                )}
              </g>

              {/* STEP 3 ZONE: Chute + Conveyor + Output */}
              <g className={`ma-zone${activeStep === 2 ? " is-hot" : ""}`}>
                {mode === "pellets" && (
                  <g>
                    {/* Angled chute */}
                    <polygon
                      points="324,252 396,304 388,318 318,268"
                      fill="#2c251f"
                      stroke={activeStep === 2 ? "#ff6a1a" : "#625447"}
                      strokeWidth="2"
                    />
                    {/* Sliding pellets */}
                    <rect className="ma-chute-pellet" x="348" y="274" width="12" height="6" rx="3" fill="#d8a25e" transform="rotate(35 354 277)" />
                    <rect className="ma-chute-pellet" x="348" y="274" width="12" height="6" rx="3" fill="#ffc46b" transform="rotate(35 354 277)" />
                    <rect className="ma-chute-pellet" x="348" y="274" width="12" height="6" rx="3" fill="#d8a25e" transform="rotate(35 354 277)" />
                  </g>
                )}

                {/* Conveyor belt + legs */}
                <rect x="386" y="330" width="10" height="36" fill="#2c251f" />
                <rect x="536" y="330" width="10" height="36" fill="#2c251f" />
                <rect
                  x="368"
                  y="314"
                  width="196"
                  height="20"
                  rx="10"
                  fill="#1f1b17"
                  stroke={activeStep === 2 ? "#ff6a1a" : "#5c5044"}
                  strokeWidth="2"
                />
                {/* Moving belt dashes */}
                <line className="ma-belt-dash" x1="388" y1="319" x2="538" y2="319" stroke="#8fc65a" strokeWidth="2" strokeDasharray="8 16" />

                {/* Turning conveyor wheels */}
                <g className="ma-wheel">
                  <circle cx="382" cy="324" r="8" fill="#3a3229" stroke="#f3eadb" strokeOpacity="0.7" strokeWidth="1.5" />
                  <line x1="376" y1="324" x2="388" y2="324" stroke="#ffc46b" strokeWidth="1.5" />
                </g>
                <g className="ma-wheel">
                  <circle cx="466" cy="324" r="8" fill="#3a3229" stroke="#f3eadb" strokeOpacity="0.7" strokeWidth="1.5" />
                  <line x1="460" y1="324" x2="472" y2="324" stroke="#ffc46b" strokeWidth="1.5" />
                </g>
                <g className="ma-wheel">
                  <circle cx="550" cy="324" r="8" fill="#3a3229" stroke="#f3eadb" strokeOpacity="0.7" strokeWidth="1.5" />
                  <line x1="544" y1="324" x2="556" y2="324" stroke="#ffc46b" strokeWidth="1.5" />
                </g>

                {mode === "pellets" ? (
                  <g>
                    {/* Traveling pellets on conveyor */}
                    <rect className="ma-conv-pellet" x="394" y="306" width="12" height="6" rx="3" fill="#d8a25e" />
                    <rect className="ma-conv-pellet" x="394" y="306" width="12" height="6" rx="3" fill="#ffc46b" />
                    <rect className="ma-conv-pellet" x="394" y="306" width="12" height="6" rx="3" fill="#d8a25e" />
                    <rect className="ma-conv-pellet" x="394" y="306" width="12" height="6" rx="3" fill="#ffc46b" />
                    <rect className="ma-conv-pellet" x="394" y="306" width="12" height="6" rx="3" fill="#d8a25e" />
                    {/* Collection bin / bag */}
                    <path d="M566 322 L606 322 L612 366 L560 366 Z" fill="#2c2620" stroke="#8fc65a" strokeWidth="2" />
                    <circle cx="578" cy="318" r="4" fill="#ffc46b" />
                    <circle cx="586" cy="316" r="4" fill="#d8a25e" />
                    <circle cx="594" cy="319" r="4" fill="#ffc46b" />
                  </g>
                ) : (
                  <g>
                    {/* Moving briquette logs */}
                    <g className="ma-log">
                      <rect x="396" y="294" width="38" height="18" rx="4" fill="#c98842" stroke="#5b3b1e" strokeWidth="1.5" />
                      <circle cx="434" cy="303" r="3" fill="#0f0d0b" />
                    </g>
                    <g className="ma-log">
                      <rect x="396" y="294" width="38" height="18" rx="4" fill="#b87634" stroke="#5b3b1e" strokeWidth="1.5" />
                      <circle cx="434" cy="303" r="3" fill="#0f0d0b" />
                    </g>
                    <g className="ma-log">
                      <rect x="396" y="294" width="38" height="18" rx="4" fill="#c98842" stroke="#5b3b1e" strokeWidth="1.5" />
                      <circle cx="434" cy="303" r="3" fill="#0f0d0b" />
                    </g>
                    {/* Stacked briquettes at end */}
                    <rect x="562" y="346" width="44" height="18" rx="4" fill="#b87634" stroke="#5b3b1e" strokeWidth="1.5" />
                    <rect x="566" y="326" width="44" height="18" rx="4" fill="#c98842" stroke="#5b3b1e" strokeWidth="1.5" />
                  </g>
                )}
              </g>

              {/* Labels with small dots (>= 12px on 360px screen -> 24px in 640px viewBox) */}
              <g className="ma-labels" fontSize="24" fontWeight="600" fill="#f3eadb">
                <circle cx="316" cy="54" r="5" fill="#8fc65a" />
                <text x="328" y="62">{data.labels[0]}</text>

                <circle cx="348" cy="176" r="5" fill="#ff6a1a" />
                <text x="360" y="184">{data.labels[1]}</text>

                <circle cx="448" cy="272" r="5" fill="#ffc46b" />
                <text x="460" y="280">{data.labels[2]}</text>
              </g>
            </svg>
          </div>

          <div className="ma-side">
            <ol className="ma-steps">
              {data.steps.map((step, i) => (
                <li key={step.n}>
                  <button
                    type="button"
                    className={`ma-step${activeStep === i ? " is-active" : ""}`}
                    onClick={() => handleStepTap(i)}
                    aria-current={activeStep === i ? "step" : undefined}
                  >
                    <span className="ma-step-n">{step.n}</span>
                    <span className="ma-step-body">
                      <strong>{step.title}</strong>
                      <span>{step.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="ma-cta">
              <Link href="/contact" className="btn btn-ember" data-magnetic>
                Get a quote <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
