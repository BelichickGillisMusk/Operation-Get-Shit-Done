export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/samantha") {
      return Response.redirect("https://bryanoneillgillis.com", 302);
    }

    return new Response(homePage(), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }
};

function homePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SilverbackAI — AI Operations for Real Businesses</title>
<meta name="description" content="SilverbackAI powers NorCal CARB Mobile — AI-driven fleet operations, automated compliance, and mobile diesel emissions testing across Northern California.">
<meta name="theme-color" content="#facc15">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦍</text></svg>">
<meta property="og:title" content="SilverbackAI — AI Operations for Real Businesses">
<meta property="og:description" content="AI-powered fleet operations, compliance automation, and mobile CARB testing across Northern California.">
<meta property="og:url" content="https://silverbackai.agency">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --gold:#facc15;
  --gold-soft:#fde68a;
  --gold-dim:rgba(250,204,21,.08);
  --gold-border:rgba(250,204,21,.2);
  --gold-glow:rgba(250,204,21,.15);
  --bg:#060606;
  --bg2:#0d0d0d;
  --bg3:#141414;
  --text:#e8e8e8;
  --muted:#777;
  --radius:16px;
}
html{scroll-behavior:smooth}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:var(--gold);text-decoration:none;transition:all .2s}
a:hover{color:var(--gold-soft)}
.container{max-width:1080px;margin:0 auto;padding:0 28px}

/* ── Header ── */
.header{padding:20px 0;position:sticky;top:0;z-index:100;background:rgba(6,6,6,.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--gold-border)}
.header .container{display:flex;justify-content:space-between;align-items:center}
.logo-mark{display:flex;align-items:center;gap:14px}
.logo-icon{width:40px;height:40px}
.logo-text{font-size:1.4rem;font-weight:800;color:#fff;letter-spacing:-.5px}
.logo-text span{color:var(--gold)}
.header-nav{display:flex;align-items:center;gap:24px}
.header-nav a{color:var(--muted);font-size:.9rem;font-weight:500}
.header-nav a:hover{color:var(--gold)}
.header-cta{background:var(--gold);color:#000;padding:10px 22px;border-radius:10px;font-weight:700;font-size:.85rem;transition:all .25s;display:inline-flex;align-items:center;gap:6px}
.header-cta:hover{transform:translateY(-1px);box-shadow:0 4px 20px var(--gold-glow);color:#000}

/* ── Hero ── */
.hero{padding:120px 0 100px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:800px;height:800px;background:radial-gradient(circle,var(--gold-glow) 0%,transparent 70%);pointer-events:none}
.hero-content{position:relative;z-index:1}
.hero-logo{width:80px;height:80px;margin:0 auto 32px;animation:float 6s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.hero-badge{display:inline-block;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);padding:6px 18px;border-radius:24px;font-size:.8rem;font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-bottom:28px}
.hero h1{font-size:clamp(2.8rem,7vw,5rem);font-weight:800;color:#fff;margin-bottom:20px;line-height:1.05;letter-spacing:-1px}
.hero h1 em{font-style:normal;color:var(--gold);display:block}
.hero .lead{font-size:1.2rem;color:var(--muted);max-width:580px;margin:0 auto 44px;line-height:1.7}
.hero-buttons{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:16px 36px;border-radius:12px;font-weight:700;font-size:.95rem;transition:all .25s;border:none;cursor:pointer}
.btn-gold{background:var(--gold);color:#000}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 30px var(--gold-glow);color:#000}
.btn-outline{background:transparent;color:var(--text);border:1px solid rgba(255,255,255,.15)}
.btn-outline:hover{border-color:var(--gold);color:var(--gold)}

/* ── Stats ── */
.stats-bar{background:var(--bg2);border-top:1px solid var(--gold-border);border-bottom:1px solid var(--gold-border)}
.stats-bar .container{display:flex;justify-content:center;gap:0;flex-wrap:wrap}
.stat{flex:1;min-width:140px;text-align:center;padding:28px 20px;border-right:1px solid var(--gold-border)}
.stat:last-child{border-right:none}
.stat .num{font-size:1.8rem;font-weight:800;color:var(--gold);letter-spacing:-.5px}
.stat .label{font-size:.75rem;color:var(--muted);margin-top:4px;text-transform:uppercase;letter-spacing:1px}

/* ── Sections ── */
.section{padding:100px 0}
.section-alt{background:var(--bg2)}
.section-title{text-align:center;margin-bottom:56px}
.section-title .eyebrow{color:var(--gold);font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px}
.section-title h2{font-size:2.2rem;font-weight:800;color:#fff;letter-spacing:-.5px}
.section-title p{color:var(--muted);font-size:1rem;margin-top:10px}

/* ── Cards ── */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
.card{background:var(--bg3);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius);padding:36px 32px;transition:all .3s;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--gold);opacity:0;transition:opacity .3s}
.card:hover{border-color:var(--gold-border);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.4)}
.card:hover::before{opacity:1}
.card-icon{width:48px;height:48px;background:var(--gold-dim);border:1px solid var(--gold-border);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:20px}
.card h3{font-size:1.15rem;font-weight:700;color:#fff;margin-bottom:8px}
.card p{color:var(--muted);font-size:.9rem;line-height:1.6}

/* ── Network Grid ── */
.network-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px}
.network-card{display:block;background:var(--bg3);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius);padding:24px;text-align:center;transition:all .25s;position:relative}
.network-card:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
.network-card .dot{width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;margin-right:6px}
.network-card .city{font-weight:700;color:#fff;font-size:1rem;margin-bottom:4px}
.network-card .domain{color:var(--muted);font-size:.78rem;font-family:monospace}

/* ── CTA ── */
.cta-block{text-align:center;padding:80px 20px;position:relative}
.cta-block::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:600px;height:400px;background:radial-gradient(circle,var(--gold-glow) 0%,transparent 70%);pointer-events:none}
.cta-block>*{position:relative;z-index:1}
.cta-block h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:12px;letter-spacing:-.5px}
.cta-block p{color:var(--muted);font-size:1.1rem;margin-bottom:36px;max-width:500px;margin-left:auto;margin-right:auto}

/* ── Footer ── */
.footer{border-top:1px solid rgba(255,255,255,.06);padding:40px 0}
.footer-inner{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
.footer-brand{display:flex;align-items:center;gap:10px}
.footer-brand svg{width:24px;height:24px}
.footer-brand span{font-weight:700;color:#fff;font-size:.9rem}
.footer-brand span em{font-style:normal;color:var(--gold)}
.footer-info{text-align:right;color:var(--muted);font-size:.8rem}
.footer-info a{color:var(--muted)}
.footer-info a:hover{color:var(--gold)}

@media(max-width:768px){
  .hero{padding:80px 0 60px}
  .header-nav a:not(.header-cta){display:none}
  .stats-bar .container{flex-wrap:wrap}
  .stat{min-width:50%;border-bottom:1px solid var(--gold-border)}
  .stat:nth-child(odd){border-right:1px solid var(--gold-border)}
  .stat:nth-child(even){border-right:none}
  .hero-buttons{flex-direction:column;align-items:center}
  .btn{width:100%;justify-content:center}
  .section{padding:64px 0}
  .footer-inner{flex-direction:column;text-align:center}
  .footer-info{text-align:center}
}
</style>
</head>
<body>

<header class="header">
  <div class="container">
    <div class="logo-mark">
      <svg class="logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="#facc15" fill-opacity=".12"/>
        <path d="M24 8c-3 0-5.5 1-7 3-2 2.5-2.5 6-2.5 9 0 2 .3 4 1 5.5.5 1 1.2 2 2 2.8V36c0 1.1.9 2 2 2h2v2h2v-2h5v2h2v-2h2c1.1 0 2-.9 2-2v-7.7c.8-.8 1.5-1.8 2-2.8.7-1.5 1-3.5 1-5.5 0-3-.5-6.5-2.5-9-1.5-2-4-3-7-3z" fill="#facc15"/>
        <circle cx="20" cy="18" r="2" fill="#060606"/>
        <circle cx="28" cy="18" r="2" fill="#060606"/>
        <path d="M21 24c0 0 1.5 2 3 2s3-2 3-2" stroke="#060606" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M13 16c-2 1-3 3-3 5s1 4 2 5" stroke="#facc15" stroke-width="2" stroke-linecap="round" opacity=".5"/>
        <path d="M35 16c2 1 3 3 3 5s-1 4-2 5" stroke="#facc15" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      </svg>
      <div class="logo-text"><span>SILVERBACK</span>AI</div>
    </div>
    <nav class="header-nav">
      <a href="#services">Services</a>
      <a href="#network">Network</a>
      <a href="/samantha" class="header-cta">Talk to Samantha <span>&rarr;</span></a>
    </nav>
  </div>
</header>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <svg class="hero-logo" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="#facc15" fill-opacity=".1"/>
        <circle cx="40" cy="40" r="30" fill="#facc15" fill-opacity=".08"/>
        <path d="M40 15c-5 0-9.5 1.8-12 5.2C24.5 24.5 24 30 24 34c0 3.5.5 6.8 1.8 9.5.8 1.8 2 3.3 3.2 4.5V58c0 1.7 1.3 3 3 3h3v3h3v-3h4v3h3v-3h3c1.7 0 3-1.3 3-3V48c1.2-1.2 2.4-2.7 3.2-4.5C55.5 40.8 56 37.5 56 34c0-4-.5-9.5-4-13.8C49.5 16.8 45 15 40 15z" fill="#facc15"/>
        <circle cx="35" cy="29" r="3" fill="#060606"/>
        <circle cx="45" cy="29" r="3" fill="#060606"/>
        <path d="M36 39c0 0 2 3 4 3s4-3 4-3" stroke="#060606" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 26c-3 1.5-5 5-5 8.5s1.5 6.5 3 8" stroke="#facc15" stroke-width="2.5" stroke-linecap="round" opacity=".4"/>
        <path d="M58 26c3 1.5 5 5 5 8.5s-1.5 6.5-3 8" stroke="#facc15" stroke-width="2.5" stroke-linecap="round" opacity=".4"/>
      </svg>
      <div class="hero-badge">AI-Powered Operations</div>
      <h1>Built for businesses<em>that move.</em></h1>
      <p class="lead">SilverbackAI runs the backend of NorCal CARB Mobile — fleet compliance, revenue ops, and AI-powered customer management across Northern California.</p>
      <div class="hero-buttons">
        <a href="/samantha" class="btn btn-gold">Talk to Samantha &rarr;</a>
        <a href="#network" class="btn btn-outline">Explore our network</a>
      </div>
    </div>
  </div>
</section>

<div class="stats-bar">
  <div class="container">
    <div class="stat"><div class="num">622+</div><div class="label">Customers</div></div>
    <div class="stat"><div class="num">$120K</div><div class="label">MTD Revenue</div></div>
    <div class="stat"><div class="num">5</div><div class="label">Live Sites</div></div>
    <div class="stat"><div class="num">4</div><div class="label">Regions</div></div>
    <div class="stat"><div class="num">24/7</div><div class="label">AI Ops</div></div>
  </div>
</div>

<section class="section" id="services">
  <div class="container">
    <div class="section-title">
      <div class="eyebrow">What we run</div>
      <h2>Three systems. One operator.</h2>
      <p>Everything Bryan needs to run NorCal CARB Mobile from anywhere.</p>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-icon">&#x1F69B;</div>
        <h3>Mobile CARB Testing</h3>
        <p>HD-OBD ($119) and Smoke Opacity ($219) testing across Sacramento, East Bay, North Bay, and the Central Valley. Licensed tester IF530523. We come to your yard.</p>
      </div>
      <div class="card">
        <div class="card-icon">&#x1F916;</div>
        <h3>Samantha &mdash; Personal AI</h3>
        <p>AI chief of staff built on Vertex AI. Handles revenue tracking, customer follow-ups, scheduling, compliance deadlines, and growth strategy.</p>
      </div>
      <div class="card">
        <div class="card-icon">&#x26A1;</div>
        <h3>Multi-Site Automation</h3>
        <p>Five satellite sites, each with local SEO, booking forms, and city-specific branding. All managed from one repo, deployed on Cloudflare Workers.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt" id="network">
  <div class="container">
    <div class="section-title">
      <div class="eyebrow">Our network</div>
      <h2>Clean Truck Check &mdash; Northern California</h2>
      <p>City-specific landing pages for CARB compliance testing</p>
    </div>
    <div class="network-grid">
      <a href="https://cleantruckcheckhayward.com" target="_blank" rel="noopener" class="network-card">
        <div class="city"><span class="dot"></span>Hayward</div>
        <div class="domain">cleantruckcheckhayward.com</div>
      </a>
      <a href="https://cleantruckcheckfairfield.com" target="_blank" rel="noopener" class="network-card">
        <div class="city"><span class="dot"></span>Fairfield</div>
        <div class="domain">cleantruckcheckfairfield.com</div>
      </a>
      <a href="https://cleantruckcheckroseville.com" target="_blank" rel="noopener" class="network-card">
        <div class="city"><span class="dot"></span>Roseville</div>
        <div class="domain">cleantruckcheckroseville.com</div>
      </a>
      <a href="https://carbteststockton.com" target="_blank" rel="noopener" class="network-card">
        <div class="city"><span class="dot"></span>Stockton</div>
        <div class="domain">carbteststockton.com</div>
      </a>
      <a href="https://norcalcarbmobile.com" target="_blank" rel="noopener" class="network-card">
        <div class="city"><span class="dot"></span>HQ</div>
        <div class="domain">norcalcarbmobile.com</div>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-block">
      <h2>Operation: Get Shit Done</h2>
      <p>Samantha is standing by. Ask her about revenue, compliance deadlines, or what to prep for your next meeting.</p>
      <a href="/samantha" class="btn btn-gold">Open Samantha &rarr;</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="12" fill="#facc15" fill-opacity=".12"/>
          <path d="M24 8c-3 0-5.5 1-7 3-2 2.5-2.5 6-2.5 9 0 2 .3 4 1 5.5.5 1 1.2 2 2 2.8V36c0 1.1.9 2 2 2h2v2h2v-2h5v2h2v-2h2c1.1 0 2-.9 2-2v-7.7c.8-.8 1.5-1.8 2-2.8.7-1.5 1-3.5 1-5.5 0-3-.5-6.5-2.5-9-1.5-2-4-3-7-3z" fill="#facc15"/>
          <circle cx="20" cy="18" r="2" fill="#060606"/>
          <circle cx="28" cy="18" r="2" fill="#060606"/>
        </svg>
        <span><em>SILVERBACK</em>AI</span>
      </div>
      <div class="footer-info">
        <p>NorCal CARB Mobile LLC &bull; Bryan Gillis &bull; License IF530523</p>
        <p><a href="tel:9168904427">916-890-4427</a> &bull; Sacramento, CA &bull; &copy; 2026</p>
      </div>
    </div>
  </div>
</footer>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SilverbackAI",
  "url": "https://silverbackai.agency",
  "description": "AI-powered operations for NorCal CARB Mobile — fleet compliance, revenue ops, and multi-site management.",
  "founder": {"@type": "Person", "name": "Bryan Gillis"},
  "telephone": "916-890-4427",
  "address": {"@type": "PostalAddress", "addressRegion": "CA", "addressCountry": "US"}
}
</script>

</body>
</html>`;
}
