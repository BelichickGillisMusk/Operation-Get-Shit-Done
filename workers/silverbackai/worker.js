export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({ ok: true, ts: Date.now() });
    }

    if (url.pathname === "/samantha") {
      return Response.redirect("https://bryanoneillgillis.com", 302);
    }

    return new Response(homePage(), { headers: htmlHeaders() });
  }
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function htmlHeaders() {
  return {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=300"
  };
}

/* Samantha lives at bryanoneillgillis.com (Vercel) */

/* ─── PAGES ─────────────────────────────────────────────── */

function homePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SilverbackAI — AI Operations for Real Businesses</title>
<meta name="description" content="SilverbackAI powers NorCal CARB Mobile — AI-driven fleet operations, automated compliance, and mobile diesel emissions testing across Northern California.">
<meta property="og:title" content="SilverbackAI — AI Operations for Real Businesses">
<meta property="og:url" content="https://silverbackai.agency">
<meta property="og:type" content="website">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--gold:#facc15;--gold-dim:rgba(250,204,21,.12);--gold-border:rgba(250,204,21,.25);--bg:#0a0a0a;--bg2:#111;--text:#e8e8e8;--muted:#888;--radius:12px}
html{scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
a{color:var(--gold);text-decoration:none;transition:opacity .2s}
a:hover{opacity:.85}
.container{max-width:1000px;margin:0 auto;padding:0 24px}

.header{border-bottom:1px solid var(--gold-border);padding:16px 0}
.header .container{display:flex;justify-content:space-between;align-items:center}
.logo{font-size:1.6rem;font-weight:800;color:#fff;letter-spacing:-.5px}
.logo span{color:var(--gold)}
.header-cta{background:var(--gold);color:#000;padding:10px 24px;border-radius:8px;font-weight:700;font-size:.9rem;transition:all .2s}
.header-cta:hover{opacity:.9;color:#000}

.hero{padding:100px 0 80px;text-align:center;background:radial-gradient(ellipse at 50% 0,rgba(250,204,21,.06) 0%,transparent 60%)}
.hero h1{font-size:clamp(2.5rem,6vw,4.5rem);font-weight:800;color:#fff;margin-bottom:16px;line-height:1.05}
.hero h1 span{color:var(--gold)}
.hero p{font-size:1.2rem;color:var(--muted);max-width:600px;margin:0 auto 40px}
.hero-buttons{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-block;padding:16px 36px;border-radius:8px;font-weight:700;font-size:1rem;transition:all .2s;border:none;cursor:pointer}
.btn-gold{background:var(--gold);color:#000}
.btn-gold:hover{opacity:.9;color:#000;transform:translateY(-1px)}
.btn-outline{background:transparent;color:var(--gold);border:2px solid var(--gold-border)}
.btn-outline:hover{border-color:var(--gold);color:#fff}

.stats{display:flex;gap:48px;justify-content:center;margin-top:60px;flex-wrap:wrap}
.stat{text-align:center}
.stat .num{font-size:2rem;font-weight:800;color:var(--gold)}
.stat .label{font-size:.85rem;color:var(--muted);margin-top:4px}

.section{padding:80px 0}
.section-dark{background:var(--bg2)}
.section-title{text-align:center;margin-bottom:48px}
.section-title h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:8px}
.section-title p{color:var(--muted);font-size:1rem}

.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
.card{background:var(--bg2);border:1px solid var(--gold-border);border-radius:var(--radius);padding:32px;transition:all .3s}
.card:hover{border-color:var(--gold);transform:translateY(-2px)}
.card .icon{font-size:2.5rem;margin-bottom:12px}
.card h3{font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:8px}
.card p{color:var(--muted);font-size:.9rem}

.sites-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.site-link{display:block;background:var(--gold-dim);border:1px solid var(--gold-border);border-radius:var(--radius);padding:20px;text-align:center;transition:all .2s}
.site-link:hover{border-color:var(--gold);background:rgba(250,204,21,.18)}
.site-link .name{font-weight:700;color:#fff;font-size:1rem;margin-bottom:4px}
.site-link .url{color:var(--muted);font-size:.8rem}

.footer{border-top:1px solid var(--gold-border);padding:32px 0;text-align:center}
.footer p{color:var(--muted);font-size:.85rem;margin-bottom:4px}

@media(max-width:600px){
  .hero{padding:60px 0 50px}
  .stats{gap:24px}
  .hero-buttons{flex-direction:column;align-items:center}
  .btn{width:100%;text-align:center}
}
</style>
</head>
<body>

<header class="header">
  <div class="container">
    <div class="logo"><span>SILVERBACK</span>AI</div>
    <a href="/samantha" class="header-cta">Talk to Samantha</a>
  </div>
</header>

<section class="hero">
  <div class="container">
    <h1>AI Operations for<br><span>Real Businesses</span></h1>
    <p>SilverbackAI powers NorCal CARB Mobile — automating fleet compliance, customer ops, and growth across Northern California.</p>
    <div class="hero-buttons">
      <a href="/samantha" class="btn btn-gold">Talk to Samantha &rarr;</a>
      <a href="#sites" class="btn btn-outline">Our Network</a>
    </div>
    <div class="stats">
      <div class="stat"><div class="num">622+</div><div class="label">Customers</div></div>
      <div class="stat"><div class="num">$120K+</div><div class="label">MTD Revenue</div></div>
      <div class="stat"><div class="num">5</div><div class="label">Live Sites</div></div>
      <div class="stat"><div class="num">24/7</div><div class="label">AI Ops</div></div>
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="container">
    <div class="section-title">
      <h2>What We Run</h2>
      <p>AI-powered operations across NorCal CARB Mobile</p>
    </div>
    <div class="cards">
      <div class="card">
        <div class="icon">&#x1F69B;</div>
        <h3>Mobile CARB Testing</h3>
        <p>HD-OBD ($119) and Smoke Opacity ($219) testing across Sacramento, East Bay, North Bay, and Central Valley. We come to you.</p>
      </div>
      <div class="card">
        <div class="icon">&#x1F916;</div>
        <h3>Samantha AI</h3>
        <p>Personal AI chief of staff. Revenue tracking, customer management, scheduling, and growth strategy — all in one conversation.</p>
      </div>
      <div class="card">
        <div class="icon">&#x1F4CA;</div>
        <h3>Fleet Operations</h3>
        <p>Multi-site fleet compliance management. Automated scheduling, pricing, and customer outreach across 5 satellite sites.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="sites">
  <div class="container">
    <div class="section-title">
      <h2>Our Network</h2>
      <p>Clean Truck Check sites across Northern California</p>
    </div>
    <div class="sites-grid">
      <a href="https://cleantruckcheckhayward.com" target="_blank" class="site-link">
        <div class="name">Hayward</div>
        <div class="url">cleantruckcheckhayward.com</div>
      </a>
      <a href="https://cleantruckcheckfairfield.com" target="_blank" class="site-link">
        <div class="name">Fairfield</div>
        <div class="url">cleantruckcheckfairfield.com</div>
      </a>
      <a href="https://cleantruckcheckroseville.com" target="_blank" class="site-link">
        <div class="name">Roseville</div>
        <div class="url">cleantruckcheckroseville.com</div>
      </a>
      <a href="https://carbteststockton.com" target="_blank" class="site-link">
        <div class="name">Stockton</div>
        <div class="url">carbteststockton.com</div>
      </a>
      <a href="https://norcalcarbmobile.com" target="_blank" class="site-link">
        <div class="name">Main Site</div>
        <div class="url">norcalcarbmobile.com</div>
      </a>
    </div>
  </div>
</section>

<section class="section section-dark" style="text-align:center">
  <div class="container">
    <h2 style="font-size:2rem;font-weight:800;margin-bottom:12px">Ready to Get Shit Done?</h2>
    <p style="color:var(--muted);font-size:1.1rem;margin-bottom:32px">Samantha is standing by. Ask her anything about the business.</p>
    <a href="/samantha" class="btn btn-gold">Open Samantha &rarr;</a>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <p><strong>SilverbackAI</strong> &mdash; NorCal CARB Mobile LLC</p>
    <p>Bryan Gillis &bull; License IF530523 &bull; 916-890-4427</p>
    <p style="margin-top:12px;font-size:.75rem;color:#555">&copy; 2026 SilverbackAI. Sacramento, CA.</p>
  </div>
</footer>

</body>
</html>`;
}

/* samanthaPage removed — Samantha lives at bryanoneillgillis.com */
