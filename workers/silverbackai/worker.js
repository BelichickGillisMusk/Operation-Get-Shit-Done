export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({ ok: true, ts: Date.now() });
    }

    if (url.pathname === "/api/samantha" && request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (url.pathname === "/api/samantha" && request.method === "POST") {
      return handleChat(request, env);
    }

    if (url.pathname === "/samantha") {
      return new Response(samanthaPage(), { headers: htmlHeaders() });
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

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function htmlHeaders() {
  return {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=300"
  };
}

const SYSTEM_PROMPT = `You are Samantha, Bryan Gillis's personal AI assistant and chief of staff. You run inside the SilverbackAI command center at silverbackai.agency.

ABOUT BRYAN:
- Owner of NorCal CARB Mobile LLC — mobile CARB diesel emissions testing
- License: IF530523 (valid through Jun 2027)
- Phone: 916-890-4427
- Based in Sacramento, CA area

BUSINESS METRICS:
- 622+ customers served
- $120K+ MTD revenue
- $15.3K in retests due (outstanding revenue)
- 2026 Revenue Target: $240K
- Services: HD-OBD testing $119, Smoke Opacity $219, Fleet $149+, RV/Motorhome $300

SATELLITE SITES (all Cloudflare Workers):
- cleantruckcheckhayward.com (East Bay / Raiders theme)
- cleantruckcheckfairfield.com (North Bay / Air Force theme)
- cleantruckcheckroseville.com (Sacramento / SF Giants theme)
- carbteststockton.com (Central Valley / green-gold theme)
- norcalcarbmobile.com (main site)

YOUR PERSONALITY:
- Direct, tactical, action-oriented
- Think like a chief of staff who gets shit done
- You know Bryan personally — call him by name
- Keep responses concise unless detail is requested
- You care about revenue, growth, compliance deadlines, and fleet operations
- You're aware it's 2026 and CARB biannual testing is now required`;

async function handleChat(request, env) {
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({
      error: "Samantha is sleeping. Add ANTHROPIC_API_KEY in Cloudflare dashboard → Workers → silverbackai → Settings → Variables → Add secret."
    }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const { message, history } = body;
  if (!message) return json({ error: "Message required" }, 400);

  const messages = [
    ...(history || []).map(m => ({ role: m.role, content: m.content })),
    { role: "user", content: message }
  ];

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        stream: true,
        messages
      })
    });

    if (!res.ok) {
      const err = await res.text();
      return json({ error: `API error: ${res.status}` }, 502);
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const event = JSON.parse(data);
              if (event.type === "content_block_delta" && event.delta?.text) {
                await writer.write(encoder.encode(event.delta.text));
              }
            } catch {}
          }
        }
      } catch (e) {
        await writer.write(encoder.encode("\n[Error: stream interrupted]"));
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        ...corsHeaders()
      }
    });
  } catch (e) {
    return json({ error: e.message || "Failed to reach Anthropic" }, 502);
  }
}

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

function samanthaPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<title>Samantha — SilverbackAI</title>
<meta name="description" content="Samantha is your AI chief of staff for NorCal CARB Mobile operations.">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--gold:#facc15;--bg:#0a0a0a;--bg2:#111;--bg3:#1a1a1a;--text:#e8e8e8;--muted:#888;--radius:12px}
html,body{height:100%}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);display:flex;flex-direction:column}

.topbar{background:var(--bg2);border-bottom:1px solid rgba(250,204,21,.2);padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.topbar-left{display:flex;align-items:center;gap:12px}
.topbar-left a{color:var(--muted);font-size:.9rem;font-weight:500}
.topbar-left a:hover{color:#fff;text-decoration:none}
.topbar-title{font-weight:700;color:#fff;font-size:1.1rem}
.topbar-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;margin-left:8px;display:inline-block}
.topbar-right button{background:none;border:1px solid rgba(255,255,255,.15);color:var(--muted);padding:6px 14px;border-radius:6px;font-size:.8rem;cursor:pointer;transition:all .2s}
.topbar-right button:hover{border-color:var(--gold);color:var(--gold)}

.chat-area{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px}
.msg{max-width:80%;padding:14px 18px;border-radius:var(--radius);font-size:.95rem;line-height:1.6;white-space:pre-wrap;word-wrap:break-word}
.msg-user{align-self:flex-end;background:var(--gold);color:#000;border-bottom-right-radius:4px}
.msg-sam{align-self:flex-start;background:var(--bg3);color:var(--text);border:1px solid rgba(255,255,255,.08);border-bottom-left-radius:4px}
.msg-error{align-self:center;background:#3a1a1a;color:#ff8080;border:1px solid #662222;font-size:.85rem;text-align:center}

.empty-state{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:var(--muted);padding:40px}
.empty-state h2{font-size:1.4rem;color:#fff;margin-bottom:8px;font-weight:700}
.empty-state p{margin-bottom:24px;font-size:.95rem}
.suggestions{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.suggestion{background:var(--bg3);border:1px solid rgba(255,255,255,.1);color:var(--text);padding:10px 18px;border-radius:20px;font-size:.85rem;cursor:pointer;transition:all .2s}
.suggestion:hover{border-color:var(--gold);color:var(--gold)}

.input-area{background:var(--bg2);border-top:1px solid rgba(255,255,255,.08);padding:16px 20px;flex-shrink:0}
.input-row{display:flex;gap:10px;max-width:800px;margin:0 auto}
.input-row input{flex:1;background:var(--bg);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:14px 16px;color:#fff;font-size:1rem;outline:none;transition:border-color .2s}
.input-row input:focus{border-color:var(--gold)}
.input-row input::placeholder{color:#555}
.send-btn{background:var(--gold);color:#000;border:none;padding:14px 24px;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:all .2s;white-space:nowrap}
.send-btn:hover{opacity:.9}
.send-btn:disabled{opacity:.4;cursor:not-allowed}

.typing{display:inline-flex;gap:4px;padding:4px 0}
.typing span{width:6px;height:6px;background:var(--muted);border-radius:50%;animation:bounce .6s infinite alternate}
.typing span:nth-child(2){animation-delay:.15s}
.typing span:nth-child(3){animation-delay:.3s}
@keyframes bounce{to{opacity:.3;transform:translateY(-4px)}}

@media(max-width:600px){
  .msg{max-width:90%}
  .suggestions{flex-direction:column;align-items:center}
}
</style>
</head>
<body>

<div class="topbar">
  <div class="topbar-left">
    <a href="/">&larr; Home</a>
    <span class="topbar-title">Samantha<span class="topbar-dot"></span></span>
  </div>
  <div class="topbar-right">
    <button onclick="clearChat()">Clear</button>
  </div>
</div>

<div class="chat-area" id="chatArea">
  <div class="empty-state" id="emptyState">
    <h2>Hey Bryan.</h2>
    <p>I'm Samantha, your AI chief of staff. What do you need?</p>
    <div class="suggestions">
      <div class="suggestion" onclick="sendSuggestion(this)">How's revenue this month?</div>
      <div class="suggestion" onclick="sendSuggestion(this)">Draft a fleet follow-up email</div>
      <div class="suggestion" onclick="sendSuggestion(this)">What CARB deadlines are coming up?</div>
      <div class="suggestion" onclick="sendSuggestion(this)">Prep me for tomorrow's meeting</div>
    </div>
  </div>
</div>

<div class="input-area">
  <div class="input-row">
    <input type="text" id="msgInput" placeholder="Message Samantha..." autocomplete="off">
    <button class="send-btn" id="sendBtn" onclick="send()">Send</button>
  </div>
</div>

<script>
var history = [];
var isStreaming = false;

var input = document.getElementById('msgInput');
var btn = document.getElementById('sendBtn');
var area = document.getElementById('chatArea');
var empty = document.getElementById('emptyState');

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
});

function sendSuggestion(el) {
  input.value = el.textContent;
  send();
}

function clearChat() {
  history = [];
  area.innerHTML = '<div class="empty-state" id="emptyState"><h2>Hey Bryan.</h2><p>I\\'m Samantha, your AI chief of staff. What do you need?</p><div class="suggestions"><div class="suggestion" onclick="sendSuggestion(this)">How\\'s revenue this month?</div><div class="suggestion" onclick="sendSuggestion(this)">Draft a fleet follow-up email</div><div class="suggestion" onclick="sendSuggestion(this)">What CARB deadlines are coming up?</div><div class="suggestion" onclick="sendSuggestion(this)">Prep me for tomorrow\\'s meeting</div></div></div>';
  empty = document.getElementById('emptyState');
}

async function send() {
  var text = input.value.trim();
  if (!text || isStreaming) return;

  if (empty) { empty.remove(); empty = null; }

  appendMsg(text, 'user');
  history.push({ role: 'user', content: text });
  input.value = '';
  isStreaming = true;
  btn.disabled = true;
  btn.textContent = '...';

  var samDiv = appendMsg('', 'sam');
  samDiv.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';

  try {
    var res = await fetch('/api/samantha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history.slice(-20) })
    });

    if (!res.ok) {
      var err = await res.json();
      samDiv.className = 'msg msg-error';
      samDiv.textContent = err.error || 'Something went wrong';
      return;
    }

    var reader = res.body.getReader();
    var decoder = new TextDecoder();
    var full = '';
    samDiv.innerHTML = '';

    while (true) {
      var chunk = await reader.read();
      if (chunk.done) break;
      full += decoder.decode(chunk.value, { stream: true });
      samDiv.textContent = full;
      area.scrollTop = area.scrollHeight;
    }

    history.push({ role: 'assistant', content: full });
  } catch (e) {
    samDiv.className = 'msg msg-error';
    samDiv.textContent = 'Connection error. Check your internet.';
  } finally {
    isStreaming = false;
    btn.disabled = false;
    btn.textContent = 'Send';
    input.focus();
  }
}

function appendMsg(text, type) {
  var div = document.createElement('div');
  div.className = 'msg msg-' + (type === 'user' ? 'user' : 'sam');
  div.textContent = text;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
  return div;
}

input.focus();
</script>

</body>
</html>`;
}
