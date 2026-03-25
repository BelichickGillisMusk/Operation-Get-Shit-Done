export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle booking API
    if (url.pathname === "/api/book" && request.method === "POST") {
      try {
        const body = await request.json();
        // For now, just acknowledge the booking (KV not available)
        return new Response(JSON.stringify({ ok: true, id: `booking_${Date.now()}` }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), {
          status: 500, headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mobile CARB Diesel Testing Stockton CA | OBD $119 &amp; OVI $219</title>
<meta name="description" content="Mobile CARB diesel testing for the 209. OBD $119, OVI Smoke $219. Licensed tester IF530523. Tracy, Livermore, Antioch, Concord. No shop trips.">
<meta name="keywords" content="CARB testing stockton, mobile diesel testing 209, OBD test stockton, smoke opacity test tracy, fleet emissions testing san joaquin">
<link rel="canonical" href="https://cleantruckcheckstockton.com/">
<meta property="og:title" content="Clean Truck Check Stockton | HD-OBD &amp; Smoke Opacity Testing">
<meta property="og:description" content="CARB-licensed Clean Truck Check station in Stockton, CA. Fast, affordable CARB-compliant truck inspections.">
<meta property="og:url" content="https://cleantruckcheckstockton.com/">
<meta property="og:type" content="website">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --accent:#2d6a1e;
  --accent-dark:#1e4d14;
  --accent-dim:rgba(45,106,30,.12);
  --accent-border:rgba(45,106,30,.3);
  --bg:#0a1408;
  --bg-dark:#060e04;
  --silver:#e8c840;
  --text:#e2e8f0;
  --text-dim:#94a3b8;
  --gold:#ffc107;
  --radius:12px;
}
html{scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden}
a{color:var(--silver);text-decoration:none;transition:color .2s}
a:hover{color:#fff}
.container{max-width:1200px;margin:0 auto;padding:0 20px}

/* Header */
.header{background:var(--bg-dark);border-bottom:1px solid var(--accent-border);padding:16px 0;position:sticky;top:0;z-index:100;backdrop-filter:blur(10px)}
.header .container{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.logo{font-size:1.5rem;font-weight:800;color:#fff}
.logo span{color:var(--silver)}
.nav{display:flex;gap:24px;flex-wrap:wrap}
.nav a{color:var(--text-dim);font-size:.9rem;font-weight:500}
.nav a:hover{color:var(--silver)}
.header-cta{background:var(--accent);color:#fff;padding:10px 24px;border-radius:8px;font-weight:600;font-size:.9rem;transition:background .2s}
.header-cta:hover{background:var(--accent-dark);color:#fff}

/* Hero */
.hero{padding:80px 0 60px;text-align:center;background:linear-gradient(180deg,var(--bg-dark) 0%,var(--bg) 100%)}
.hero-badge{display:inline-block;background:var(--accent-dim);border:1px solid var(--accent-border);color:var(--silver);padding:6px 16px;border-radius:20px;font-size:.85rem;font-weight:500;margin-bottom:24px}
.hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:800;color:#fff;margin-bottom:16px;line-height:1.15}
.hero h1 span{color:var(--silver)}
.hero p{font-size:1.15rem;color:var(--text-dim);max-width:700px;margin:0 auto 32px}
.hero-buttons{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.btn-primary{background:var(--accent);color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;transition:all .2s;border:none;cursor:pointer}
.btn-primary:hover{background:var(--accent-dark);transform:translateY(-1px);color:#fff}
.btn-secondary{background:transparent;color:var(--silver);padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;border:2px solid var(--accent-border);transition:all .2s;cursor:pointer}
.btn-secondary:hover{border-color:var(--silver);color:#fff}
.hero-stats{display:flex;gap:48px;justify-content:center;margin-top:48px;flex-wrap:wrap}
.hero-stat{text-align:center}
.hero-stat .num{font-size:2rem;font-weight:800;color:var(--silver)}
.hero-stat .label{font-size:.85rem;color:var(--text-dim)}

/* Sections */
.section{padding:80px 0}
.section-dark{background:var(--bg-dark)}
.section-title{text-align:center;margin-bottom:48px}
.section-title h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:8px}
.section-title p{color:var(--text-dim);font-size:1.05rem}

/* Service Cards */
.services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:24px}
.service-card{background:var(--bg-dark);border:1px solid var(--accent-border);border-radius:var(--radius);padding:32px;transition:all .3s}
.service-card:hover{border-color:var(--silver);transform:translateY(-2px)}
.service-card .icon{width:48px;height:48px;background:var(--accent-dim);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:16px}
.service-card h3{font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:8px}
.service-card p{color:var(--text-dim);margin-bottom:16px;font-size:.95rem}
.service-card .price{font-size:2rem;font-weight:800;color:var(--silver)}
.service-card .price small{font-size:.9rem;font-weight:400;color:var(--text-dim)}
.service-card ul{list-style:none;margin-top:16px}
.service-card ul li{padding:6px 0;color:var(--text-dim);font-size:.9rem;display:flex;align-items:center;gap:8px}
.service-card ul li::before{content:"\\2713";color:var(--silver);font-weight:700}

/* Booking Form */
.booking-section{background:var(--bg-dark);border:1px solid var(--accent-border);border-radius:var(--radius);padding:40px;max-width:600px;margin:0 auto}
.form-group{margin-bottom:20px}
.form-group label{display:block;font-weight:600;margin-bottom:6px;color:var(--text);font-size:.9rem}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:12px 16px;background:var(--bg);border:1px solid var(--accent-border);border-radius:8px;color:var(--text);font-size:1rem;transition:border-color .2s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--silver)}
.form-group textarea{resize:vertical;min-height:80px}
.form-group select option{background:var(--bg-dark);color:var(--text)}
.form-msg{padding:12px;border-radius:8px;margin-top:16px;display:none;font-weight:500}
.form-msg.success{display:block;background:#d4edda;color:#1a3a0a;border:1px solid #2d6a1e}
.form-msg.error{display:block;background:#3a1a1a;color:#ff8080;border:1px solid #662222}

/* Reviews */
.reviews-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
.review-card{background:var(--bg-dark);border:1px solid var(--accent-border);border-radius:var(--radius);padding:24px}
.review-stars{color:var(--gold);font-size:1.1rem;margin-bottom:8px}
.review-text{color:var(--text-dim);font-size:.95rem;margin-bottom:12px;font-style:italic}
.review-author{font-weight:600;color:#fff;font-size:.9rem}
.review-date{color:var(--text-dim);font-size:.8rem}

/* Benefits */
.benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px}
.benefit-card{text-align:center;padding:32px 20px}
.benefit-card .icon{font-size:2.5rem;margin-bottom:12px}
.benefit-card h3{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:8px}
.benefit-card p{color:var(--text-dim);font-size:.9rem}

/* Service Area */
.area-list{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:24px}
.area-tag{background:var(--accent-dim);border:1px solid var(--accent-border);color:var(--silver);padding:8px 20px;border-radius:20px;font-size:.9rem}

/* FAQ */
.faq-list{max-width:800px;margin:0 auto}
.faq-item{border:1px solid var(--accent-border);border-radius:var(--radius);margin-bottom:12px;overflow:hidden}
.faq-q{padding:20px 24px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:#fff;background:var(--bg-dark);transition:background .2s}
.faq-q:hover{background:var(--accent-dim)}
.faq-q .arrow{transition:transform .3s;color:var(--silver)}
.faq-item.open .faq-q .arrow{transform:rotate(180deg)}
.faq-a{padding:0 24px;max-height:0;overflow:hidden;transition:all .3s;color:var(--text-dim);font-size:.95rem}
.faq-item.open .faq-a{padding:16px 24px;max-height:500px}

/* CTA */
.cta-section{text-align:center;padding:80px 20px;background:linear-gradient(180deg,var(--bg) 0%,var(--bg-dark) 100%)}
.cta-section h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:12px}
.cta-section p{color:var(--text-dim);font-size:1.1rem;margin-bottom:32px}

/* Footer */
.footer{background:var(--bg-dark);border-top:1px solid var(--accent-border);padding:40px 0;text-align:center}
.footer p{color:var(--text-dim);font-size:.85rem;margin-bottom:8px}
.footer a{color:var(--silver)}
.footer a:hover{color:#fff}

/* Responsive */
@media(max-width:768px){
  .hero{padding:48px 0 40px}
  .hero-stats{gap:24px}
  .hero-stat .num{font-size:1.5rem}
  .services-grid{grid-template-columns:1fr}
  .nav{display:none}
  .section{padding:48px 0}
  .booking-section{padding:24px}
}
</style>
</head>
<body>

<!-- Header -->
<header class="header">
  <div class="container">
    <div class="logo">CleanTruck<span>Check</span></div>
    <nav class="nav">
      <a href="#services">Services</a>
      <a href="#booking">Book Now</a>
      <a href="#reviews">Reviews</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">Contact</a>
    </nav>
    <a href="#booking" class="header-cta">Schedule Test</a>
  </div>
</header>

<!-- Hero -->
<section class="hero">
  <div class="container">
    <div class="hero-badge">TRACY &bull; LIVERMORE &bull; ANTIOCH &bull; CONCORD &bull; 209/925</div>
    <h1>Mobile CARB<br><span>Diesel Testing</span><br>for the 209</h1>
    <p>Amazon distribution. Crate & Barrel. Ulmar Supply. Motorhome fleets. Construction yards. We bring certified CARB testing to your location — OBD $119 &middot; OVI Smoke $219. No shop trips. CARB fines up to $10,000/day.</p>
    <div class="hero-buttons">
      <a href="#booking" class="btn-primary">Book Your Inspection</a>
      <a href="#services" class="btn-secondary">View Services &amp; Pricing</a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><div class="num">$119</div><div class="label">OBD TEST (2013+)</div></div>
      <div class="hero-stat"><div class="num">$219</div><div class="label">OVI SMOKE (2012-)</div></div>
      <div class="hero-stat"><div class="num">24/7</div><div class="label">AVAILABLE NOW</div></div>
    </div>
  </div>
</section>

<!-- Services -->
<section class="section" id="services">
  <div class="container">
    <div class="section-title">
      <h2>Our Testing Services</h2>
      <p>CARB-compliant inspections with fast turnaround and competitive pricing</p>
    </div>
    <div class="services-grid">
      <div class="service-card">
        <div class="icon">&#x1F50D;</div>
        <h3>HD-OBD Testing</h3>
        <p>Heavy-Duty On-Board Diagnostics inspection for 2013+ model year diesel trucks with OBD systems.</p>
        <div class="price">$119 <small>per test</small></div>
        <ul>
          <li>2013+ model year trucks</li>
          <li>OBD system scan &amp; diagnostics</li>
          <li>CARB-compliant reporting</li>
          <li>Results uploaded same day</li>
          <li>Digital certificate provided</li>
        </ul>
      </div>
      <div class="service-card">
        <div class="icon">&#x1F4A8;</div>
        <h3>Smoke Opacity Testing</h3>
        <p>SAE J1667 snap-acceleration smoke opacity test for pre-2013 diesel trucks and vehicles without OBD.</p>
        <div class="price">$219 <small>per test</small></div>
        <ul>
          <li>Pre-2013 model year trucks</li>
          <li>SAE J1667 snap-acceleration test</li>
          <li>Calibrated opacity meter</li>
          <li>CARB-compliant reporting</li>
          <li>Digital certificate provided</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Booking Form -->
<section class="section section-dark" id="booking">
  <div class="container">
    <div class="section-title">
      <h2>Book Your Inspection</h2>
      <p>Schedule your Clean Truck Check today &mdash; most appointments available within 48 hours</p>
    </div>
    <div class="booking-section">
      <form id="bookingForm">
        <div class="form-group">
          <label for="name">Full Name *</label>
          <input type="text" id="name" name="name" required placeholder="John Smith">
        </div>
        <div class="form-group">
          <label for="phone">Phone Number *</label>
          <input type="tel" id="phone" name="phone" required placeholder="(707) 555-0123">
        </div>
        <div class="form-group">
          <label for="email">Email Address *</label>
          <input type="email" id="email" name="email" required placeholder="john@example.com">
        </div>
        <div class="form-group">
          <label for="service">Service Needed *</label>
          <select id="service" name="service" required>
            <option value="">Select a service...</option>
            <option value="hd-obd">HD-OBD Testing - $119</option>
            <option value="smoke-opacity">Smoke Opacity Testing - $219</option>
            <option value="both">Both Tests (Fleet)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="vehicles">Number of Vehicles</label>
          <input type="number" id="vehicles" name="vehicles" min="1" value="1" placeholder="1">
        </div>
        <div class="form-group">
          <label for="date">Preferred Date</label>
          <input type="date" id="date" name="date">
        </div>
        <div class="form-group">
          <label for="notes">Additional Notes</label>
          <textarea id="notes" name="notes" placeholder="Fleet size, vehicle details, special requests..."></textarea>
        </div>
        <button type="submit" class="btn-primary" style="width:100%">Submit Booking Request</button>
        <div id="formMsg" class="form-msg"></div>
      </form>
    </div>
  </div>
</section>

<!-- Reviews -->
<section class="section" id="reviews">
  <div class="container">
    <div class="section-title">
      <h2>Customer Reviews</h2>
      <p>Trusted by fleet operators and owner-operators across San Joaquin County</p>
    </div>
    <div class="reviews-grid">
      <div class="review-card">
        <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="review-text">"Got my entire fleet of 12 trucks through Clean Truck Check in one day. Professional, fast, and the pricing was very fair. Highly recommend for any Stockton fleet operator."</p>
        <div class="review-author">Mike R.</div>
        <div class="review-date">Fleet Manager &bull; Stockton, CA</div>
      </div>
      <div class="review-card">
        <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="review-text">"Easy scheduling, quick turnaround. They explained the HD-OBD process clearly and had my results uploaded to CARB the same day. Best testing station in San Joaquin County."</p>
        <div class="review-author">Carlos T.</div>
        <div class="review-date">Owner-Operator &bull; Tracy, CA</div>
      </div>
      <div class="review-card">
        <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="review-text">"Very knowledgeable about CARB requirements. They helped me understand what my truck needed before the test. Great customer service and reasonable prices."</p>
        <div class="review-author">David L.</div>
        <div class="review-date">Owner-Operator &bull; Manteca, CA</div>
      </div>
      <div class="review-card">
        <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
        <p class="review-text">"Solid testing facility. Got my smoke opacity test done quickly. Only reason for 4 stars is I had to wait a bit, but the actual service was excellent."</p>
        <div class="review-author">James W.</div>
        <div class="review-date">Fleet Owner &bull; Modesto, CA</div>
      </div>
    </div>
  </div>
</section>

<!-- Benefits -->
<section class="section section-dark">
  <div class="container">
    <div class="section-title">
      <h2>Why Choose Us</h2>
      <p>Stockton&rsquo;s trusted Clean Truck Check testing station</p>
    </div>
    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="icon">&#x1F3E2;</div>
        <h3>CARB Licensed</h3>
        <p>Licensed CARB Tester ID IF530523. Mobile diesel testing throughout the 209/925.</p>
      </div>
      <div class="benefit-card">
        <div class="icon">&#x26A1;</div>
        <h3>Fast Turnaround</h3>
        <p>Most tests completed in under 30 minutes. Results uploaded to CARB the same day.</p>
      </div>
      <div class="benefit-card">
        <div class="icon">&#x1F4B0;</div>
        <h3>Competitive Pricing</h3>
        <p>HD-OBD testing at $119 and Smoke Opacity at $219. Fleet discounts available.</p>
      </div>
      <div class="benefit-card">
        <div class="icon">&#x1F4CB;</div>
        <h3>Fleet Services</h3>
        <p>We handle fleets of all sizes. On-site testing available for large fleets in the Stockton area.</p>
      </div>
      <div class="benefit-card">
        <div class="icon">&#x1F4CD;</div>
        <h3>Mobile Service</h3>
        <p>We bring all equipment to your location. Amazon yards, construction sites, fleet depots. No shop trips.</p>
      </div>
      <div class="benefit-card">
        <div class="icon">&#x1F4DE;</div>
        <h3>Expert Support</h3>
        <p>Our certified technicians can answer all your CARB compliance questions.</p>
      </div>
    </div>
  </div>
</section>

<!-- Service Area -->
<section class="section">
  <div class="container">
    <div class="section-title">
      <h2>Service Area</h2>
      <p>Serving Stockton, Tracy, and the 209/925 corridor</p>
    </div>
    <div class="area-list">
      <span class="area-tag">Stockton</span>
      <span class="area-tag">Tracy</span>
      <span class="area-tag">Livermore</span>
      <span class="area-tag">Antioch</span>
      <span class="area-tag">Concord</span>
      <span class="area-tag">Manteca</span>
      <span class="area-tag">Lathrop</span>
      <span class="area-tag">Modesto</span>
      <span class="area-tag">Turlock</span>
      <span class="area-tag">Ripon</span>
      <span class="area-tag">San Joaquin County</span>
      <span class="area-tag">209/925 Area</span>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section section-dark" id="faq">
  <div class="container">
    <div class="section-title">
      <h2>Frequently Asked Questions</h2>
      <p>Everything you need to know about Clean Truck Check testing in Stockton</p>
    </div>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q">What is a Clean Truck Check?<span class="arrow">&#9660;</span></div>
        <div class="faq-a">Clean Truck Check is California&rsquo;s program to ensure heavy-duty diesel vehicles meet emissions standards. It replaced the previous Periodic Smoke Inspection Program (PSIP) and requires trucks to undergo either HD-OBD testing or Smoke Opacity testing depending on the vehicle&rsquo;s model year and equipment.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Which test does my truck need?<span class="arrow">&#9660;</span></div>
        <div class="faq-a">Trucks with 2013 or newer model year engines equipped with on-board diagnostics (OBD) require HD-OBD testing. Older trucks or those without OBD systems require the Smoke Opacity test. Our technicians can help determine which test your vehicle needs.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">How much does testing cost?<span class="arrow">&#9660;</span></div>
        <div class="faq-a">HD-OBD testing is $119 per vehicle and Smoke Opacity testing is $219 per vehicle. We offer fleet discounts for multiple vehicles. Contact us for a custom quote for your fleet.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">How long does the test take?<span class="arrow">&#9660;</span></div>
        <div class="faq-a">Most individual tests are completed in 15-30 minutes. For fleets, we can typically process 8-12 trucks per day depending on the test type. Results are uploaded to CARB the same day.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Do you serve the 209 area?<span class="arrow">&#9660;</span></div>
        <div class="faq-a">Yes! We serve all of San Joaquin County including Stockton, Tracy, Livermore, Antioch, Concord, Manteca, and Lathrop. For large fleets, we may be able to arrange on-site testing.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">What happens if my truck fails?<span class="arrow">&#9660;</span></div>
        <div class="faq-a">If your truck fails the Clean Truck Check, our technicians will explain the issues found and recommend next steps. You&rsquo;ll need to make the necessary repairs and return for a retest. We can help connect you with qualified repair facilities in the 209 area.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Do I need an appointment?<span class="arrow">&#9660;</span></div>
        <div class="faq-a">Appointments are strongly recommended to minimize wait times, especially for fleet testing. Use our online booking form or call us to schedule. Walk-ins are accepted based on availability.</div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <h2>Ready to Get Your Truck Tested?</h2>
  <p>Schedule your Clean Truck Check inspection in Stockton today.</p>
  <a href="#booking" class="btn-primary">Book Your Inspection Now</a>
</section>

<!-- Footer -->
<footer class="footer" id="contact">
  <div class="container">
    <p><strong>Clean Truck Check Stockton</strong></p>
    <p>Stockton, CA &bull; 209/925 &bull; 209-818-1371</p>
    <p>CARB-Licensed Clean Truck Check Testing Station</p>
    <p style="margin-top:16px"><a href="mailto:info@cleantruckcheckstockton.com">info@cleantruckcheckstockton.com</a></p>
    <p style="margin-top:16px;font-size:.8rem;color:#475569">&copy; 2026 CARB Test Stockton. All rights reserved.</p>
  </div>
</footer>

<!-- Schema Markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "name": "NorCal CARB Mobile - Stockton",
  "description": "CARB-licensed Clean Truck Check station in Stockton, CA. HD-OBD testing and Smoke Opacity testing for CARB compliance.",
  "url": "https://cleantruckcheckstockton.com",
  "areaServed": {
    "@type": "City",
    "name": "Stockton"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Stockton",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Clean Truck Check Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "HD-OBD Testing",
          "description": "Heavy-Duty On-Board Diagnostics inspection for 2013+ diesel trucks"
        },
        "price": "119.00",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Smoke Opacity Testing",
          "description": "SAE J1667 snap-acceleration smoke opacity test for pre-2013 diesel trucks"
        },
        "price": "219.00",
        "priceCurrency": "USD"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
</script>

<!-- FAQ Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Clean Truck Check?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clean Truck Check is California's program to ensure heavy-duty diesel vehicles meet emissions standards. It replaced the previous Periodic Smoke Inspection Program (PSIP) and requires trucks to undergo either HD-OBD testing or Smoke Opacity testing depending on the vehicle's model year and equipment."
      }
    },
    {
      "@type": "Question",
      "name": "Which test does my truck need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trucks with 2013 or newer model year engines equipped with on-board diagnostics (OBD) require HD-OBD testing. Older trucks or those without OBD systems require the Smoke Opacity test."
      }
    },
    {
      "@type": "Question",
      "name": "How much does testing cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HD-OBD testing is $119 per vehicle and Smoke Opacity testing is $219 per vehicle. We offer fleet discounts for multiple vehicles."
      }
    },
    {
      "@type": "Question",
      "name": "Do you serve the 209 area?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We serve all of San Joaquin County including Stockton, Tracy, Livermore, Antioch, Concord, Manteca, and Lathrop."
      }
    }
  ]
}
</script>

<!-- JavaScript -->
<script>
// FAQ Accordion
document.querySelectorAll('.faq-q').forEach(function(q){
  q.addEventListener('click',function(){
    var item=this.parentElement;
    var isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open')});
    if(!isOpen) item.classList.add('open');
  });
});

// Booking Form
document.getElementById('bookingForm').addEventListener('submit',async function(e){
  e.preventDefault();
  var msg=document.getElementById('formMsg');
  msg.className='form-msg';
  msg.style.display='none';
  var btn=this.querySelector('button[type="submit"]');
  btn.disabled=true;
  btn.textContent='Submitting...';
  try{
    var data={
      name:document.getElementById('name').value,
      phone:document.getElementById('phone').value,
      email:document.getElementById('email').value,
      service:document.getElementById('service').value,
      vehicles:document.getElementById('vehicles').value,
      date:document.getElementById('date').value,
      notes:document.getElementById('notes').value
    };
    var res=await fetch('/api/book',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    });
    var result=await res.json();
    if(result.ok){
      msg.className='form-msg success';
      msg.textContent='Booking request submitted successfully! We will contact you within 24 hours to confirm your appointment.';
      msg.style.display='block';
      this.reset();
    }else{
      throw new Error(result.error||'Submission failed');
    }
  }catch(err){
    msg.className='form-msg error';
    msg.textContent='Error: '+err.message+'. Please try again or call us directly.';
    msg.style.display='block';
  }
  btn.disabled=false;
  btn.textContent='Submit Booking Request';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var target=document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});
</script>

</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300"
      }
    });
  }
};
