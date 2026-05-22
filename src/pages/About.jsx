import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import { getImageUrl } from '../utils/imageUtils';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  { accent: '#38bdf8', glow: 'rgba(56,189,248,0.3)',  rgb: '56,189,248'  },
  { accent: '#818cf8', glow: 'rgba(129,140,248,0.3)', rgb: '129,140,248' },
  { accent: '#34d399', glow: 'rgba(52,211,153,0.3)',  rgb: '52,211,153'  },
  { accent: '#fb923c', glow: 'rgba(251,146,60,0.3)',  rgb: '251,146,60'  },
  { accent: '#f472b6', glow: 'rgba(244,114,182,0.3)', rgb: '244,114,182' },
  { accent: '#facc15', glow: 'rgba(250,204,21,0.3)',  rgb: '250,204,21'  },
];

/* ─── Shared card renderer ── */
const CardFace = ({ member, index, total, showOverlay = true }) => {
  const name    = member?.Name  || 'Unnamed';
  const title   = member?.title || '';
  const empImg  = member?.EmployeeImage;
  const imgData = empImg?.formats?.medium ?? empImg?.formats?.small ?? empImg?.formats?.thumbnail ?? empImg ?? null;
  const imgUrl  = imgData ? getImageUrl(imgData) : null;
  const { accent, glow } = COLORS[index % COLORS.length];

  return (
    <div className="card-inner" style={{ '--accent': accent, '--glow': glow }}>
      <div className="card-topline" />
      <span className="cc tl" /><span className="cc tr" />
      <span className="cc bl" /><span className="cc br" />

      <div className="card-photo">
        {imgUrl ? (
          <img src={imgUrl} alt={name} />
        ) : (
          <div className="card-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
            </svg>
          </div>
        )}
        <div className="photo-grad" />
        {showOverlay && (
          <div className="card-overlay-info">
            <div className="card-number-badge">
              {String(index + 1).padStart(2, '0')}
              <span className="card-total-badge">/{String(total).padStart(2, '0')}</span>
            </div>
            <h3 className="member-name">{name}</h3>
            {title && <p className="member-title">{title}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Section 1: Reveal card (left panel) ── */
const TeamCard = ({ member, index, total }) => {
  const { accent, glow } = COLORS[index % COLORS.length];
  return (
    <div
      className="team-card"
      data-index={index}
      style={{ '--accent': accent, '--glow': glow, zIndex: index + 1 }}
    >
      <CardFace member={member} index={index} total={total} showOverlay={true} />
    </div>
  );
};

/* ─── Section 1: Detail panel (right) ── */
const MemberDetail = ({ member, index, isActive }) => {
  const panelRef = useRef(null);
  const { accent, rgb } = COLORS[index % COLORS.length];
  const rawFeatures = member?.features || '';
  const features    = rawFeatures.replace(/^[""\u201c\u201d]|[""\u201c\u201d]$/g, '').trim();
  const description = member?.description || '';
  const title       = member?.title || '';
  const name        = member?.Name || '';

  useEffect(() => {
    if (!panelRef.current) return;
    const els = panelRef.current.querySelectorAll('.da');
    if (isActive) {
      gsap.killTweensOf(els);
      gsap.fromTo(els,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.12 }
      );
    } else {
      gsap.killTweensOf(els);
      gsap.to(els, { y: -18, opacity: 0, duration: 0.28, stagger: 0.04, ease: 'power2.in' });
    }
  }, [isActive]);

  return (
    <div
      ref={panelRef}
      className={`detail-panel${isActive ? ' is-active' : ''}`}
      style={{
        '--accent': accent,
        '--rgb': rgb,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {title && (
        <div className="da d-badge">
          <span className="d-badge-dot" />
          {title}
        </div>
      )}
      <h2 className="da d-name">{name}</h2>
      <div className="da d-rule" />
      {description && (
        <div className="da d-field">
          <span className="d-field-label">Full Name</span>
          <span className="d-field-value">{description}</span>
        </div>
      )}
      {features && (
        <div className="da d-quote-block">
          <div className="d-quote-mark">"</div>
          <p className="d-quote-text">{features}</p>
        </div>
      )}
      <div className="d-ghost-num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
};

/* ─── Stat ── */
const Stat = ({ value, label }) => (
  <div className="stat-item">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

/* ─── About ── */
const About = () => {
  const mainRef        = useRef(null);
  const headerRef      = useRef(null);
  const paragraphRef   = useRef(null);
  const quoteRef       = useRef(null);
  const statsRef       = useRef(null);
  const teamWrapRef    = useRef(null);   // section 1 pin
  const lineupWrapRef  = useRef(null);   // section 2 pin

  const [activeIndex, setActiveIndex] = useState(0);
  const { data: about, loading, error } = useCMSData('about');

  useEffect(() => {
    const el = document.querySelector('.fx-cursor');
    if (!el) return;

    const move = (e) => {
      el.style.setProperty('--mx', `${e.clientX}px`);
      el.style.setProperty('--my', `${e.clientY}px`);
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    const bar = document.querySelector('.top-progress-bar');
    if (!bar) return;

    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Section reveals ── */
  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 80, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out',
        });
      }
      [paragraphRef, quoteRef].forEach(r => {
        if (!r.current) return;
        gsap.from(r.current, {
          scrollTrigger: { trigger: r.current, start: 'top 82%', toggleActions: 'play reverse play reverse' },
          y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        });
      });
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%', toggleActions: 'play reverse play reverse' },
          y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        });
      }
    }, mainRef);
    return () => ctx.revert();
  }, [loading]);

  /* ── Section 1: cards reveal one by one ── */
  useEffect(() => {
    if (loading) return;
    const cards = gsap.utils.toArray('.team-card');
    if (!cards.length || !teamWrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cards[0], { yPercent: 0, opacity: 1, scale: 1 });
      cards.forEach((c, i) => {
        if (i > 0) gsap.set(c, { yPercent: 130, opacity: 0, scale: 0.96 });
      });
      setActiveIndex(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: teamWrapRef.current,
          start: 'top top',
          end: `+=${cards.length * 650}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate(self) {
            const step = Math.min(Math.floor(self.progress * cards.length), cards.length - 1);
            setActiveIndex(step);
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        tl.to(card,        { yPercent: -108, opacity: 0, scale: 0.94, duration: 1, ease: 'power2.inOut' }, i);
        tl.to(cards[i+1], { yPercent: 0,    opacity: 1, scale: 1,    duration: 1, ease: 'power2.inOut' }, i);
      });
    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  /* ── Section 2: lineup slide-in ── */
  useEffect(() => {
    if (loading) return;
    const lineupCards = gsap.utils.toArray('.lineup-card');
    if (!lineupCards.length || !lineupWrapRef.current) return;

    const ctx = gsap.context(() => {
      const total = lineupCards.length;

      // All cards start far off to the right, invisible
      gsap.set(lineupCards, { xPercent: 160, opacity: 0, scale: 0.85 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lineupWrapRef.current,
          start: 'top 20%',
          end: `+=${total * 520}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Each card flies in from right and lands in its column position
      lineupCards.forEach((card, i) => {
        tl.to(card, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        }, i * 0.8); // slight overlap so it feels fluid
      });

    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  /* ── Guards ── */
  if (loading) return (
    <div className="about-loading"><div className="loading-spinner" /><span>Loading…</span></div>
  );
  if (error) return (
    <div className="about-loading"><span>Error loading content</span></div>
  );

  const seo     = about?.seo || {};
  const heading = about?.heading || 'CREATIVE IMPACT, MEASURABLE RESULTS.';
  const quote   = about?.quote   || '"OUR JOURNEY OF GROWTH IS BUILT ON SHARED SUCCESSES WITH THOSE WE SERVE."';

  let paragraphText = '"Fource" is a blend of \'force\' and \'source\' — representing the power behind innovation and the source of intelligent solutions.';
  if (about?.paragraphs) {
    if (typeof about.paragraphs === 'string') paragraphText = about.paragraphs;
    else if (Array.isArray(about.paragraphs) && about.paragraphs.length) paragraphText = about.paragraphs[0];
  }

  const teamMembers    = Array.isArray(about?.teams) ? about.teams : [];
  const displayMembers = teamMembers.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'About Us'}</title>
        <meta name="description" content={seo?.metaDescription || seo?.description || ''} />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          /* ===== FX background ===== */
          .fx-bg{
            position:fixed; inset:0; pointer-events:none; z-index:0;
            background:
              radial-gradient(900px 500px at 20% 20%, rgba(56,189,248,.12), transparent 60%),
              radial-gradient(800px 520px at 80% 25%, rgba(129,140,248,.10), transparent 60%),
              radial-gradient(900px 600px at 50% 85%, rgba(52,211,153,.10), transparent 60%),
              radial-gradient(700px 500px at 85% 80%, rgba(244,114,182,.08), transparent 60%);
            filter:saturate(1.1);
          }

          .fx-bg::after{
            content:'';
            position:absolute; inset:0;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.08'/%3E%3C/svg%3E");
            opacity:.18; mix-blend-mode:overlay;
          }

          /* Cursor glow */
          .fx-cursor{
            position:fixed; inset:0; pointer-events:none; z-index:2;
          }
          .fx-cursor::before{
            content:'';
            position:absolute;
            left:var(--mx); top:var(--my);
            width:520px; height:520px;
            transform:translate(-50%,-50%);
            background:radial-gradient(circle, rgba(56,189,248,.14), transparent 65%);
            filter:blur(12px);
            transition:opacity .2s ease;
            opacity:.9;
          }

          .top-progress{
            position:fixed; top:0; left:0; right:0; height:2px; z-index:10;
            background:rgba(148,163,184,.10);
          }
          .top-progress-bar{
            height:100%;
            transform-origin:left;
            transform:scaleX(0);
            background:linear-gradient(90deg,#38bdf8,#818cf8,#34d399);
          }

          .about-loading {
            min-height:100vh; display:flex; flex-direction:column;
            align-items:center; justify-content:center; gap:1rem;
            font-family:'DM Mono',monospace; color:#94a3b8;
          }
          .loading-spinner {
            width:36px; height:36px;
            border:2px solid rgba(148,163,184,0.15);
            border-top-color:#38bdf8; border-radius:50%;
            animation:spin .8s linear infinite;
          }
          @keyframes spin { to { transform:rotate(360deg); } }

          .about-page { font-family:'Syne',sans-serif; color:#f0f4ff; position:relative; z-index:1; }

          .card-inner{
            transform-style:preserve-3d;
            transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
          }
          .team-card:hover .card-inner{
            transform: perspective(900px) rotateX(6deg) rotateY(-8deg) translateY(-6px);
            box-shadow:
              0 0 0 1px rgba(255,255,255,.05),
              0 0 70px var(--glow),
              0 40px 110px rgba(0,0,0,.8);
          }
          .card-inner::before{
            content:'';
            position:absolute; inset:-40%;
            background:linear-gradient(120deg, transparent 35%, rgba(255,255,255,.10) 50%, transparent 65%);
            transform:translateX(-40%) rotate(12deg);
            opacity:0;
            transition:opacity .2s ease;
          }
          .team-card:hover .card-inner::before{
            opacity:1;
            animation: sheen 1.1s ease;
          }
          @keyframes sheen{
            to { transform:translateX(40%) rotate(12deg); }
          }

          /* Badge */
          .about-badge {
            display:inline-flex; align-items:center; gap:.5rem;
            padding:.4rem 1rem;
            border:1px solid rgba(56,189,248,.25); border-radius:999px;
            font-size:.68rem; letter-spacing:.2em; text-transform:uppercase;
            color:#38bdf8; background:rgba(56,189,248,.06); margin-bottom:2rem;
          }
          .about-badge-dot {
            width:5px; height:5px; background:#38bdf8; border-radius:50%;
            animation:blink 2s ease-in-out infinite;
          }
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }

          /* Header */
          .about-header { text-align:center; padding:8rem 2rem 5rem; }
          .about-headline {
            font-size:clamp(2.2rem,5.5vw,4.5rem); font-weight:800;
            line-height:1.04; letter-spacing:-.03em;
            background:linear-gradient(130deg,#f0f4ff 0%,#38bdf8 45%,#818cf8 100%);
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
            max-width:860px; margin:0 auto;
          }

          /* Content */
          .about-content {
            max-width:1100px; margin:0 auto;
            padding:0 2.5rem 5rem;
            display:flex; flex-direction:column; gap:2rem;
          }
          .glass-panel {
            background:rgba(15,23,42,.65);
            border:1px solid rgba(148,163,184,.1);
            border-radius:1.5rem; padding:3rem;
            backdrop-filter:blur(20px);
            position:relative; overflow:hidden;
          }
          .glass-panel::after {
            content:''; position:absolute;
            top:0; left:0; right:0; height:1px;
            background:linear-gradient(90deg,transparent,rgba(56,189,248,.3),transparent);
          }
          .paragraph-text {
            font-family:'DM Mono',monospace;
            font-size:1rem; line-height:2; color:#94a3b8; text-align:center;
            max-width:720px; margin:0 auto;
          }
          .quote-panel { border-color:rgba(56,189,248,.15); }
          .quote-inner { display:flex; align-items:flex-start; gap:2rem; }
          .quote-icon-wrap {
            flex-shrink:0; margin-top:.25rem;
            width:40px; height:40px;
            background:rgba(56,189,248,.08); border:1px solid rgba(56,189,248,.2);
            border-radius:50%; display:flex; align-items:center; justify-content:center;
          }
          .quote-icon-wrap svg { width:16px; height:16px; color:#38bdf8; fill:currentColor; }
          .quote-text {
            font-size:clamp(1.05rem,2.2vw,1.45rem); font-weight:700;
            letter-spacing:-.01em; line-height:1.5; color:#e2e8f0;
          }
          .stats-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; }
          @media(max-width:560px){ .stats-row { grid-template-columns:1fr; } }
          .stat-item {
            background:rgba(15,23,42,.65);
            border:1px solid rgba(148,163,184,.1);
            border-radius:1.25rem; padding:2.25rem 1.5rem; text-align:center;
            backdrop-filter:blur(14px);
            transition:border-color .3s, transform .3s;
          }
          .stat-item:hover { border-color:rgba(56,189,248,.3); transform:translateY(-5px); }
          .stat-value {
            font-size:2.75rem; font-weight:800; line-height:1;
            background:linear-gradient(135deg,#38bdf8,#818cf8);
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          }
          .stat-label {
            font-family:'DM Mono',monospace;
            font-size:.7rem; letter-spacing:.12em; color:#475569;
            margin-top:.6rem; text-transform:uppercase;
          }

          /* ════════════════════════════════
             SECTION 1 — one-by-one reveal
          ════════════════════════════════ */
          .team-section-header { text-align:center; padding:5rem 2rem 3rem; }
          .team-headline {
            font-size:clamp(1.8rem,4vw,3rem); font-weight:800; letter-spacing:-.025em;
            background:linear-gradient(135deg,#f0f4ff,#818cf8);
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
            margin-top:1rem;
          }
          .team-sub {
            font-family:'DM Mono',monospace;
            font-size:.75rem; color:#334155; margin-top:.75rem; letter-spacing:.1em;
          }

          .scroll-hint {
            display:flex; flex-direction:column; align-items:center; gap:.5rem;
            padding:0 0 2.5rem;
            font-family:'DM Mono',monospace;
            font-size:.68rem; letter-spacing:.14em; color:#1e293b; text-transform:uppercase;
          }
          .scroll-arrow {
            width:1px; height:36px;
            background:linear-gradient(to bottom,#38bdf8,transparent);
            animation:scrollLine 1.6s ease-in-out infinite;
          }
          @keyframes scrollLine {
            0%  { transform:scaleY(0); transform-origin:top; }
            50% { transform:scaleY(1); transform-origin:top; }
            51% { transform:scaleY(1); transform-origin:bottom; }
            100%{ transform:scaleY(0); transform-origin:bottom; }
          }

          .team-pin-wrap { position:relative; }
          .team-stage {
            width:100%; height:100vh;
            display:flex; align-items:center; justify-content:center;
            position:relative;
          }
          .team-inner {
            display:grid;
            grid-template-columns: 420px 1fr;
            width:100%; max-width:1100px;
            height:580px;
            padding:0 2.5rem;
            gap:0;
            align-items:stretch;
          }
          .cards-col { position:relative; }

          /* Shared card shell */
          .team-card {
            position:absolute; inset:0;
            will-change:transform, opacity;
          }
          .card-inner {
            width:100%; height:100%;
            background:#080f20;
            border:1px solid rgba(255,255,255,.05);
            border-radius:1.75rem;
            position:relative; overflow:hidden;
            box-shadow:
              0 0 0 1px rgba(255,255,255,.03),
              0 0 50px var(--glow),
              0 30px 80px rgba(0,0,0,.7);
          }
          .card-topline {
            position:absolute; top:0; left:0; right:0; height:1px; z-index:2;
            background:linear-gradient(90deg,transparent,var(--accent),transparent);
          }
          .cc {
            position:absolute; width:18px; height:18px;
            border-color:var(--accent); border-style:solid; opacity:.5; z-index:2;
          }
          .cc.tl{top:14px;left:14px;border-width:2px 0 0 2px;border-radius:4px 0 0 0;}
          .cc.tr{top:14px;right:14px;border-width:2px 2px 0 0;border-radius:0 4px 0 0;}
          .cc.bl{bottom:14px;left:14px;border-width:0 0 2px 2px;border-radius:0 0 0 4px;}
          .cc.br{bottom:14px;right:14px;border-width:0 2px 2px 0;border-radius:0 0 4px 0;}
          .card-photo { position:absolute; inset:0; background:#0f172a; }
          .card-photo img {
            width:100%; height:100%;
            object-fit:cover; object-position:top center; display:block;
          }
          .card-avatar {
            width:100%; height:100%;
            display:flex; align-items:center; justify-content:center; background:#0f172a;
          }
          .card-avatar svg { width:80px; height:80px; color:#1e293b; }
          .photo-grad {
            position:absolute; inset:0;
            background:linear-gradient(
              to top,
              rgba(8,15,32,1) 0%,
              rgba(8,15,32,.7) 25%,
              rgba(8,15,32,.1) 55%,
              transparent 100%
            );
          }
          .card-overlay-info {
            position:absolute; bottom:0; left:0; right:0;
            padding:1.75rem 2rem 2rem; z-index:2;
          }
          .card-number-badge {
            font-family:'DM Mono',monospace;
            font-size:.65rem; letter-spacing:.15em;
            color:var(--accent); margin-bottom:.75rem; opacity:.8;
          }
          .card-total-badge { color:#334155; }
          .member-name {
            font-size:1.35rem; font-weight:800; letter-spacing:-.01em;
            color:#f0f4ff; line-height:1.1; margin-bottom:.4rem;
          }
          .member-title {
            font-family:'DM Mono',monospace;
            font-size:.7rem; color:var(--accent); letter-spacing:.1em;
          }

          /* Detail panel */
          .detail-col {
            position:relative;
            border-left:1px solid rgba(148,163,184,.07);
            overflow:hidden;
          }
          .detail-panel {
            position:absolute; inset:0;
            display:flex; flex-direction:column; justify-content:center;
            padding:2.5rem 3rem;
            transition:opacity .15s;
          }
          .d-badge {
            display:inline-flex; align-items:center; gap:.5rem;
            padding:.35rem 1rem;
            border:1px solid rgba(var(--rgb),.25); border-radius:999px;
            font-family:'DM Mono',monospace;
            font-size:.62rem; letter-spacing:.18em; text-transform:uppercase;
            color:var(--accent); background:rgba(var(--rgb),.06);
            margin-bottom:2rem; width:fit-content;
          }
          .d-badge-dot {
            width:5px; height:5px; border-radius:50%; background:var(--accent);
            animation:blink 2s ease-in-out infinite;
          }
          .d-name {
            font-size:clamp(1.6rem,3vw,3rem); font-weight:800;
            letter-spacing:-.03em; line-height:.95; color:#f0f4ff;
            margin-bottom:2rem; word-break:break-word; overflow-wrap:break-word;
          }
          .d-rule {
            width:60px; height:2px;
            background:linear-gradient(90deg,var(--accent),transparent);
            border-radius:2px; margin-bottom:2rem;
          }
          .d-field { margin-bottom:2rem; }
          .d-field-label {
            display:block; font-family:'DM Mono',monospace;
            font-size:.58rem; letter-spacing:.25em; text-transform:uppercase;
            color:#334155; margin-bottom:.5rem;
          }
          .d-field-value {
            font-size:1.1rem; font-weight:600;
            color:#94a3b8; letter-spacing:.01em; line-height:1.3;
          }
          .d-quote-block { display:flex; flex-direction:column; gap:.75rem; }
          .d-quote-mark {
            font-size:4rem; line-height:.6;
            color:var(--accent); opacity:.25;
            font-family:Georgia,serif;
          }
          .d-quote-text {
            font-family:'DM Mono',monospace;
            font-size:.9rem; line-height:1.8;
            color:#475569; font-style:italic; letter-spacing:.02em;
          }
          .d-ghost-num {
            position:absolute; bottom:-2rem; right:2.5rem;
            font-size:10rem; font-weight:800; line-height:1;
            color:rgba(var(--rgb),.05);
            letter-spacing:-.06em; user-select:none; pointer-events:none;
          }

          /* Progress strip */
          .progress-strip {
            position:absolute; bottom:2.5rem; left:50%;
            transform:translateX(-50%);
            display:flex; align-items:center; gap:.75rem;
          }
          .pdot {
            width:5px; height:5px; border-radius:50%;
            background:#1e293b; border:1px solid #1e293b;
            transition:all .4s cubic-bezier(.34,1.56,.64,1);
            cursor:pointer;
          }
          .pdot:focus{ outline:2px solid rgba(56,189,248,.35); outline-offset:4px; }
          .pdot.active { width:20px; border-radius:3px; }

          /* Section 1 — mobile / narrow (≤734px, e.g. 734×1318) */
          @media (max-width: 734px) {
            .team-stage {
              height: auto;
              min-height: 100vh;
              padding: 1.5rem 0 3rem;
              align-items: stretch;
            }
            .team-inner {
              display: flex;
              flex-direction: column;
              width: 100%;
              max-width: 100%;
              height: auto;
              padding: 0 1.25rem;
              gap: 0;
            }
            .cards-col {
              position: relative;
              width: 100%;
              max-width: 380px;
              height: min(62vw, 420px);
              margin: 0 auto;
              flex-shrink: 0;
            }
            .detail-col {
              position: relative;
              width: 100%;
              max-width: 380px;
              margin: 0 auto;
              border-left: none;
              border-top: 1px solid rgba(148,163,184,.07);
              min-height: 0;
              overflow: visible;
              margin-top: 1.25rem;
            }
            .detail-panel {
              display: none;
            }
            .detail-panel.is-active {
              display: flex;
              position: relative;
              inset: auto;
              height: auto;
              min-height: 0;
              justify-content: flex-start;
              padding: 1.5rem 0 2rem;
              overflow: visible;
            }
            .d-name {
              font-size: 1.75rem;
              margin-bottom: 1.25rem;
            }
            .d-rule { margin-bottom: 1.25rem; }
            .d-badge { margin-bottom: 1.25rem; }
            .d-field {
              margin-bottom: 1.25rem;
              flex-shrink: 0;
            }
            .d-field-value {
              display: block;
              font-size: 0.95rem;
              line-height: 1.65;
              white-space: normal;
              word-break: break-word;
              overflow-wrap: anywhere;
            }
            .d-quote-text {
              white-space: normal;
              word-break: break-word;
            }
            .d-ghost-num {
              position: relative;
              bottom: auto;
              right: auto;
              align-self: flex-end;
              margin-top: 0.5rem;
              font-size: 4.5rem;
              line-height: 1;
            }
            .progress-strip {
              position: relative;
              bottom: auto;
              left: auto;
              transform: none;
              margin-top: 1.5rem;
              padding-bottom: 0.5rem;
            }
            .team-card:hover .card-inner {
              transform: none;
              box-shadow:
                0 0 0 1px rgba(255,255,255,.03),
                0 0 50px var(--glow),
                0 30px 80px rgba(0,0,0,.7);
            }
          }

          /* ════════════════════════════════
             SECTION 2 — lineup assembly
          ════════════════════════════════ */
          .lineup-card{
            transition: transform .35s cubic-bezier(.22,1,.36,1), filter .35s, opacity .35s;
          }
          .lineup-row:hover .lineup-card{
            opacity:.55;
            filter:saturate(.9);
          }
          .lineup-row:hover .lineup-card:hover{
            opacity:1;
            filter:saturate(1.2);
            transform: translateY(-10px) scale(1.04);
            z-index:5;
          }        
          .lineup-section-header {
            text-align:center; padding:5rem 2rem 3rem;
          }
          .lineup-pin-wrap { position:relative; overflow:hidden; }
          .lineup-stage {
            width:100%; height:100vh;
            display:flex; flex-direction:column;
            align-items:center; justify-content:center;
            position:relative;
            padding:0 2.5rem;
          }

          /* The row that holds all mini cards side by side */
          .lineup-row {
            display:flex;
            gap:1.25rem;
            align-items:flex-end;
            justify-content:center;
            width:100%;
            max-width:1200px;
          }

          /* Each lineup card slot */
          .lineup-card {
            flex:1;
            min-width:0;
            max-width:220px;
            aspect-ratio: 2/3;
            will-change:transform, opacity;
            position:relative;
            border-radius:1.25rem;
            overflow:hidden;
            background:#080f20;
            box-shadow:
              0 0 0 1px rgba(255,255,255,.04),
              0 0 30px var(--glow),
              0 20px 50px rgba(0,0,0,.65);
            flex-shrink:0;
          }

          /* Shimmer top */
          .lineup-card::before {
            content:''; position:absolute;
            top:0; left:0; right:0; height:1px; z-index:2;
            background:linear-gradient(90deg,transparent,var(--accent),transparent);
          }

          .lineup-card img {
            width:100%; height:100%;
            object-fit:cover; object-position:top center; display:block;
          }
          .lineup-card .card-avatar {
            width:100%; height:100%;
            display:flex; align-items:center; justify-content:center; background:#0f172a;
          }
          .lineup-card .card-avatar svg { width:48px; height:48px; color:#1e293b; }

          /* Gradient + info overlay */
          .lineup-overlay {
            position:absolute; inset:0; z-index:1;
            background:linear-gradient(
              to top,
              rgba(8,15,32,1) 0%,
              rgba(8,15,32,.75) 30%,
              rgba(8,15,32,.05) 60%,
              transparent 100%
            );
            display:flex; flex-direction:column; justify-content:flex-end;
            padding:1rem 1rem 1.25rem;
          }
          .lineup-name {
            font-size:.85rem; font-weight:800;
            color:#f0f4ff; line-height:1.1; margin-bottom:.3rem;
          }
          .lineup-title {
            font-family:'DM Mono',monospace;
            font-size:.6rem; letter-spacing:.1em;
            color:var(--accent); line-height:1.3;
          }

          /* "Full Team" label above the row */
          .lineup-label {
            font-family:'math';
            font-size:2rem; letter-spacing:.2em; text-transform:uppercase;
            color:#ffff; margin-bottom:1.75rem;
            margin-top:-25rem;
            display:flex; align-items:center; gap:.75rem;
          }
          .lineup-label::before,
          .lineup-label::after {
            content:''; flex:1; height:1px;
            background:linear-gradient(90deg,transparent,#1e293b);
          }
          .lineup-label::after {
            background:linear-gradient(90deg,#1e293b,transparent);
          }
        `}</style>
      </Helmet>

      <main ref={mainRef} className="about-page">
        <div className="fx-bg" aria-hidden="true" />
        <div className="fx-cursor" aria-hidden="true" />

        <div className="top-progress" aria-hidden="true">
          <div className="top-progress-bar" />
        </div>

        {/* ── Header ── */}
        <div ref={headerRef} className="about-header">
          <div className="about-badge">
            <span className="about-badge-dot" />
            About Our Company
          </div>
          <h1 className="about-headline">{heading}</h1>
        </div>

        {/* ── Content ── */}
        <div className="about-content">
          <div ref={paragraphRef} className="glass-panel">
            <p className="paragraph-text">{paragraphText}</p>
          </div>
          <div ref={quoteRef} className="glass-panel quote-panel">
            <div className="quote-inner">
              <div className="quote-icon-wrap">
                <svg viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <p className="quote-text">{quote}</p>
            </div>
          </div>
          <div ref={statsRef} className="stats-row">
            <Stat value="2+"   label="Years Experience"    />
            <Stat value="20+"  label="Projects Completed"  />
            <Stat value="100%" label="Client Satisfaction" />
          </div>
        </div>

        {/* ════════════════════════════════
            SECTION 1 — one-by-one reveal
        ════════════════════════════════ */}
        {displayMembers.length > 0 && (
          <>
            <div className="team-section-header">
              <div className="about-badge" style={{ borderColor:'rgba(129,140,248,.25)', color:'#818cf8', background:'rgba(129,140,248,.06)' }}>
                <span className="about-badge-dot" style={{ background:'#818cf8' }} />
                Meet the Team
              </div>
              <h2 className="team-headline">The People Behind The Work</h2>
              <p className="team-sub">Scroll to meet everyone</p>
            </div>

            <div className="scroll-hint">
              <span>Scroll</span>
              <div className="scroll-arrow" />
            </div>

            <div ref={teamWrapRef} className="team-pin-wrap">
              <div className="team-stage">
                <div className="team-inner">
                  <div className="cards-col">
                    {displayMembers.map((member, idx) => (
                      <TeamCard key={member?.id || idx} member={member} index={idx} total={displayMembers.length} />
                    ))}
                  </div>
                  <div className="detail-col">
                    {displayMembers.map((member, idx) => (
                      <MemberDetail key={member?.id || idx} member={member} index={idx} isActive={activeIndex === idx} />
                    ))}
                  </div>
                </div>

                <div className="progress-strip">
                  {displayMembers.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`pdot${activeIndex === i ? ' active' : ''}`}
                      onClick={() => {
                        // jump scroll to that "step"
                        const st = ScrollTrigger.getAll().find(t => t.trigger === teamWrapRef.current);
                        if (!st) return;
                        const progress = i / (displayMembers.length - 1 || 1);
                        window.scrollTo({ top: st.start + (st.end - st.start) * progress, behavior: 'smooth' });
                      }}
                      style={activeIndex === i ? {
                        background: COLORS[i % COLORS.length].accent,
                        borderColor: COLORS[i % COLORS.length].accent,
                      } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════════════════
            SECTION 2 — lineup assembly
        ════════════════════════════════ */}
        {displayMembers.length > 0 && (
          <>
            <div className="lineup-section-header">
              <div className="about-badge" style={{ borderColor:'rgba(52,211,153,.25)', color:'#34d399', background:'rgba(52,211,153,.06)' }}>
                <span className="about-badge-dot" style={{ background:'#34d399' }} />
                The Full Lineup
              </div>
              <h2 className="team-headline" style={{ backgroundImage:'linear-gradient(135deg,#f0f4ff,#34d399)' }}>
                All Hands On Deck
              </h2>
              <p className="team-sub">Watch the team assemble</p>
            </div>

            <div className="scroll-hint">
              <span>Scroll</span>
              <div className="scroll-arrow" />
            </div>

            <div ref={lineupWrapRef} className="lineup-pin-wrap">
              <div className="lineup-stage">
                <div className="lineup-label">Full Team</div>
                <div className="lineup-row">
                  {displayMembers.map((member, idx) => {
                    const name    = member?.Name  || 'Unnamed';
                    const title   = member?.title || '';
                    const empImg  = member?.EmployeeImage;
                    const imgData = empImg?.formats?.medium ?? empImg?.formats?.small ?? empImg?.formats?.thumbnail ?? empImg ?? null;
                    const imgUrl  = imgData ? getImageUrl(imgData) : null;
                    const { accent, glow } = COLORS[idx % COLORS.length];

                    return (
                      <div
                        key={member?.id || idx}
                        className="lineup-card"
                        style={{ '--accent': accent, '--glow': glow }}
                      >
                        {imgUrl ? (
                          <img src={imgUrl} alt={name} />
                        ) : (
                          <div className="card-avatar">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
                            </svg>
                          </div>
                        )}
                        <div className="lineup-overlay">
                          <div className="lineup-name">{name}</div>
                          {title && <div className="lineup-title">{title}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

      </main>
    </>
  );
};

export default About;