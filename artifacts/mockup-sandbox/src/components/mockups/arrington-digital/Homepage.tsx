import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Search, Menu, X, Play, Pause,
  Wifi, Cpu, PanelsTopLeft, Megaphone, MapPin, Mail, MessageCircle,
  ChevronDown, Building2, Hotel, Utensils, Compass, Sparkles, CalendarDays,
  ShieldCheck, Globe2, CircleHelp,
} from "lucide-react";
import "./_group.css";

const CAL = "https://cal.com/arringtondx-info/introduction-call";
const EMAIL = "info@arringtondx.com";
type Page = { title: string; path: string; group: string; description: string; intro?: string; points?: string[] };

const pages: Page[] = [
  { title: "Home", path: "/", group: "Home", description: "Technology and marketing for Jamaica’s resorts, villas, restaurants and developments.", intro: "Build Smarter. Market Better. Scale Further." },
  { title: "What We Do", path: "/what-we-do", group: "Services", description: "Four steps that take a property from bare walls to full bookings. Use one or all four—everything connects.", points: ["Connect — property networks, wifi, access and cameras.", "Run — hospitality software, a 24/7 front desk and custom apps.", "Brand — identity, websites, photography, video and 360 tours.", "Grow — social, email, paid ads, SEO and search."] },
  { title: "Property Network Engineering", path: "/adx-propertyengineering", group: "Connect", description: "Wifi, cabling, gate access, CCTV and smart locks for new builds and renovations—planned with your contractor before the walls close.", intro: "From Building to Bandwidth.", points: ["Guest and staff wifi", "Structured cabling", "Gate access and licence-plate recognition", "Key fobs and smart locks", "CCTV and community surveillance", "Monitoring and alerts"] },
  { title: "ADx Surge", path: "/adx-surge", group: "Run", description: "Payroll, scheduling, hiring and property management for hotels, restaurants and attractions—with tools for hourly, seasonal, multi-location teams.", intro: "One platform. Every location. Every country.", points: ["Payroll and country packs", "Time, attendance and scheduling", "Hiring and onboarding", "Property and portfolio operations", "Finance and accounting sync", "Pricing depends on locations and headcount—we’ll quote on a 20-minute call."] },
  { title: "Vicki Ann", path: "/vicki-ann", group: "Run", description: "A 24/7 AI front desk for phone, text, WhatsApp and web chat—answering guest questions and handing over when someone needs a person.", intro: "The front desk that never clocks out.", points: ["Answers common guest questions around the clock.", "Takes reservation requests and routes the next step.", "Hands over to your team when a guest needs a person.", "Illustrative conversation only; no live demo destination has been supplied."] },
  { title: "Custom Software & Apps", path: "/custom-software", group: "Run", description: "Booking portals, owner and guest apps, and internal tools shaped around how your property works.", points: ["Booking and enquiry portals", "Owner and guest apps", "Internal tools and workflows"] },
  { title: "ADx LaunchIQ", path: "/adx-launchiq", group: "Run", description: "A practical platform for complex, multi-team launches.", points: ["Bring launch work into a shared view.", "Coordinate teams, workstreams and decisions.", "Talk with ADx about fit and scope."] },
  { title: "Websites", path: "/websites", group: "Brand", description: "Custom websites that give your property a clear story and turn visits into enquiries.", points: ["A clear structure for rooms, experiences and enquiries.", "Photography, video and 360 tours can sit within the story.", "Designed to work on mobile and desktop."] },
  { title: "Brand Identity & Brand Kits", path: "/brand-identity", group: "Brand", description: "A distinct identity and practical brand kit that keeps every guest touchpoint recognisable.", points: ["Brand direction and identity", "Logo and visual system", "Practical brand-use files"] },
  { title: "Social Media & Content", path: "/social-media", group: "Grow", description: "A steady, recognisable social presence with content built for the people you want to reach.", points: ["Social planning and publishing", "Photo and video content", "Clear, consistent brand voice"] },
  { title: "Email Marketing & CRM", path: "/email-marketing", group: "Grow", description: "Keep in touch with enquiries and past guests through useful email and CRM follow-up.", points: ["Email campaigns and follow-up", "Enquiry and guest list organisation", "CRM workflows shaped around your team"] },
  { title: "Ads & Search", path: "/digital-marketing", group: "Grow", description: "Paid ads, SEO and answer-engine visibility that help the right people find your property.", points: ["Paid advertising", "Search engine optimisation", "Answer engine optimisation", "Reporting and next steps"] },
  { title: "Who We Help", path: "/who-we-help", group: "Audiences", description: "Hospitality and property businesses across Jamaica, with a dedicated path for enterprise teams.", points: ["Resorts & Hotels", "Villas & Real Estate", "Restaurants & Bars", "Attractions & Excursions", "Enterprise"] },
  { title: "ADx Jamaica", path: "/adx-jamaica", group: "Company", description: "Rooted in Kingston, building with Jamaica’s hospitality, property and technology teams.", points: ["Kingston-based perspective", "Island-wide work", "Creating room for young Jamaicans to do meaningful work"] },
  { title: "Contact", path: "/contact", group: "Company", description: "Talk through a new development, resort refresh or restaurant opening. Book a free 20-minute call or email the team.", points: ["Book a free call", EMAIL, "[JAMAICA PHONE NUMBER]", "Level 9, 60 Knutsford Blvd, Kingston, Jamaica", "Pennsylvania, USA"] },
  { title: "Resorts & Hotels", path: "/who-we-help/resorts-hotels", group: "Audiences", description: "Connect the guest experience from arrival to checkout with dependable property technology, useful operations tools and considered marketing.", points: ["Guest and staff wifi across the property", "Vicki Ann, a 24/7 front desk assistant", "Websites, social and guest follow-up", "ADx Surge for multi-location operations"] },
  { title: "Villas & Real Estate", path: "/who-we-help/villas-real-estate", group: "Audiences", description: "Help overseas buyers discover a development, enquire with confidence and stay connected to property operations.", points: ["Websites and digital brand", "Owner and guest portals", "Property networks and access", "Email follow-up for enquiries"] },
  { title: "Restaurants & Bars", path: "/who-we-help/restaurants-bars", group: "Audiences", description: "Keep service moving with practical operations tools and a marketing presence that brings the right people to the table.", points: ["Scheduling and payroll with ADx Surge", "Brand identity and websites", "Social content and email", "Guest wifi and property networks"] },
  { title: "Attractions & Excursions", path: "/who-we-help/attractions-excursions", group: "Audiences", description: "Give visitors a clear path from discovery to booking, while helping teams run day-to-day operations.", points: ["Websites and booking enquiries", "Social and search visibility", "Scheduling and hiring tools", "Property wifi and access"] },
  { title: "Enterprise: Cloud, Security & Data", path: "/enterprise", group: "Enterprise", description: "Cloud, security, data and software for complex organisations in pharma, manufacturing, retail and education.", points: ["Cloud and infrastructure", "Cybersecurity and compliance", "Data platforms and AI", "Salesforce and ADx LaunchIQ", "SOC 2, HIPAA, GDPR, FDIC and FedRAMP are addressed only in this enterprise context."] },
  { title: "Packages", path: "/packages", group: "Start here", description: "A clear starting point. Scope and quote are shaped around your property—no published prices have been supplied.", points: ["Launch — brand kit, website and social set-up.", "Grow — ongoing social, email, ads and reporting.", "Property Tech — network survey, design and build.", "Custom quote; final scope and pricing are confirmed after a conversation."] },
  { title: "Our Work", path: "/our-work", group: "Company", description: "Case studies will be shared here once client permission and approved project details are available.", points: ["No case studies are published in this concept until approved."] },
  { title: "Case study template", path: "/our-work/client-slug", group: "Company", description: "A case-study structure reserved for future approved project details.", points: ["Client, location and project details are not published.", "This template is intentionally hidden from proof claims until approved."] },
  { title: "Tools We Work With", path: "/tools", group: "Company", description: "A connected toolkit, chosen for the job—not another stack to manage.", points: ["Framer", "HubSpot", "Salesforce", "AWS", "Microsoft Azure", "Google Cloud", "Snowflake", "Databricks"] },
  { title: "How We Work", path: "/how-we-work", group: "Company", description: "Clear steps from the first conversation to handover and ongoing care.", points: ["Understand the property and the people using it.", "Map the right scope and agree next steps.", "Build alongside your team and contractors.", "Test, hand over and continue to support what we build."] },
  { title: "About", path: "/about", group: "Company", description: "Meet the team behind ADx and the people bringing technology and marketing together.", points: ["One team to call across the work.", "Technology and marketing that connect.", "No unverified metrics or partner claims are included in this concept."] },
  { title: "Careers", path: "/careers", group: "Company", description: "ADx is building a team in Jamaica and creating room for young Jamaicans to do meaningful work.", points: ["Career opportunities will be shared when roles are available.", "For now, contact info@arringtondx.com."] },
  { title: "Privacy", path: "/legal/privacy", group: "Legal", description: "Privacy information for Arrington Digital. Legal text should be confirmed with counsel before publication.", points: ["[PRIVACY POLICY TEXT TO BE CONFIRMED]", "[B.Arren, LLC DBA Arrington Digital - Pennsylvania, USA]", "[Arrington Digital Limited - Kingston, Jamaica]"] },
  { title: "Terms", path: "/legal/terms", group: "Legal", description: "Terms for Arrington Digital. Entity wording and legal terms require counsel review before publication.", points: ["[TERMS TEXT TO BE CONFIRMED]", "[B.Arren, LLC DBA Arrington Digital - Pennsylvania, USA]", "[Arrington Digital Limited - Kingston, Jamaica]"] },
  { title: "Insights", path: "/insights", group: "Company", description: "Ideas on hospitality, property technology and marketing from the ADx team.", points: ["Articles will appear here as they are published.", "No placeholder statistics or client claims are included."] },
  { title: "404", path: "/404", group: "Help", description: "That page could not be found. Explore the services, audiences and tools available across the site.", points: ["Go to What We Do", "Browse Who We Help", "Search the site"] },
];

const audienceTiles = [
  { title: "Resorts & Hotels", path: "/who-we-help/resorts-hotels", copy: "Keep the guest experience connected from arrival to checkout.", icon: Hotel, number: "01" },
  { title: "Villas & Real Estate", path: "/who-we-help/villas-real-estate", copy: "Turn overseas enquiries into owners, even while you sleep.", icon: Building2, number: "02" },
  { title: "Restaurants & Bars", path: "/who-we-help/restaurants-bars", copy: "Make every service run smoother, from first shift to last.", icon: Utensils, number: "03" },
  { title: "Attractions & Excursions", path: "/who-we-help/attractions-excursions", copy: "Bring the right guests to the experience they came for.", icon: Compass, number: "04" },
];
const steps = [
  { number: "01", title: "CONNECT", sub: "Get your property online.", copy: "The dependable network behind every room, gate and guest experience.", icon: Wifi, links: [["Property network engineering", "/adx-propertyengineering"], ["Gate access & cameras", "/adx-propertyengineering"], ["Smart locks", "/adx-propertyengineering"]] },
  { number: "02", title: "RUN", sub: "Run it with less effort.", copy: "Practical software that takes admin off your team’s plate.", icon: Cpu, links: [["ADx Surge", "/adx-surge"], ["Vicki Ann, your 24/7 front desk", "/vicki-ann"], ["Custom software & apps", "/custom-software"]] },
  { number: "03", title: "BRAND", sub: "Look the part.", copy: "A distinct identity and a website made to turn a look into an enquiry.", icon: PanelsTopLeft, links: [["Brand kits & identity", "/brand-identity"], ["Custom websites", "/websites"], ["Photo, video & 360 tours", "/websites"]] },
  { number: "04", title: "GROW", sub: "Fill rooms, tables and units.", copy: "Stay visible, follow up and give the right people a reason to book.", icon: Megaphone, links: [["Social media", "/social-media"], ["Email marketing", "/email-marketing"], ["Ads & search", "/digital-marketing"]] },
];

function SiteLink({ to, onNavigate, className = "", children, ...props }: { to: string; onNavigate: (path: string) => void; className?: string; children: ReactNode; [key: string]: any }) {
  return <a href={to} className={className} onClick={(event) => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) { event.preventDefault(); onNavigate(to); } }} {...props}>{children}</a>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`adx-kicker ${light ? "text-white/70" : "text-[#1552C2]"}`}>{children}</div>;
}

function Header({ navigate, onSearch }: { navigate: (path: string) => void; onSearch: () => void }) {
  const [open, setOpen] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const groupLists: Record<string, Page[]> = {
    "What We Do": pages.filter((p) => p.path === "/what-we-do" || ["Connect", "Run", "Brand", "Grow", "Enterprise"].includes(p.group)),
    "Who We Help": pages.filter((p) => p.group === "Audiences").concat(pages.filter((p) => p.path === "/enterprise")),
    "Our Software": pages.filter((p) => ["/adx-surge", "/vicki-ann", "/adx-launchiq"].includes(p.path)),
    "Company": pages.filter((p) => p.group === "Company" || p.group === "Legal"),
  };
  const menuGroups = ["What We Do", "Who We Help", "Our Software", "Company"];
  const close = () => { setOpen(""); setMobileOpen(false); };
  const go = (path: string) => { close(); navigate(path); };
  return <header className="sticky top-0 z-50 border-b border-[#081020]/10 bg-[#FBFAF9]/95 backdrop-blur-xl">
    <div className="adx-container flex h-[72px] items-center justify-between gap-3">
      <SiteLink to="/" onNavigate={go} aria-label="Arrington Digital home" className="flex h-12 w-[64px] shrink-0 items-center sm:w-[106px]"><img src="/__mockup/images/adx-logo.png" alt="Arrington Digital" className="h-10 w-full object-contain object-left sm:h-11" /></SiteLink>
      <nav className="hidden items-center gap-4 xl:flex" aria-label="Main navigation">
        {menuGroups.slice(0, 2).map((label) => <button key={label} className={`adx-nav-link ${open === label ? "text-[#E8621A]" : ""}`} aria-expanded={open === label} onClick={() => setOpen(open === label ? "" : label)}>{label}<ChevronDown size={13} /></button>)}
        <button className={`adx-nav-link ${open === "Our Software" ? "text-[#E8621A]" : ""}`} aria-expanded={open === "Our Software"} onClick={() => setOpen(open === "Our Software" ? "" : "Our Software")}>Our Software<ChevronDown size={13} /></button>
        <SiteLink to="/our-work" onNavigate={go} className="adx-nav-link">Our Work</SiteLink>
        <SiteLink to="/packages" onNavigate={go} className="adx-nav-link">Packages</SiteLink>
        <button className={`adx-nav-link ${open === "Company" ? "text-[#E8621A]" : ""}`} aria-expanded={open === "Company"} onClick={() => setOpen(open === "Company" ? "" : "Company")}>Company<ChevronDown size={13} /></button>
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <button onClick={onSearch} className="grid h-8 w-8 place-items-center border border-[#081020]/15 hover:border-[#E8621A] sm:h-10 sm:w-10" aria-label="Search the site"><Search size={16} /></button>
        <div className="flex items-center gap-1.5" title="WhatsApp action unavailable: [WHATSAPP NUMBER]"><button type="button" disabled aria-label="WhatsApp us — unavailable until [WHATSAPP NUMBER] is supplied" className="grid h-8 w-8 cursor-not-allowed place-items-center border border-[#081020]/15 text-[#081020]/45 sm:h-10 sm:w-10"><MessageCircle size={16} /></button><span className="hidden text-[9px] text-[#081020]/45 2xl:inline">Unavailable</span></div>
        <a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary min-h-8 px-2 text-[9px] sm:min-h-10 sm:px-3 sm:text-[11px]">Book a free call <ArrowUpRight className="adx-header-arrow" size={12} /></a>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="grid h-8 w-8 place-items-center border border-[#081020]/15 xl:hidden sm:h-10 sm:w-10" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </div>
    {open && <div className="absolute left-0 right-0 top-full hidden border-y border-[#081020]/10 bg-[#FBFAF9] px-7 py-7 shadow-xl xl:block">
      <div className="adx-container">
        <div className="mb-5 flex items-center justify-between"><Eyebrow>{open.toUpperCase()}</Eyebrow><button onClick={() => setOpen("")} className="grid h-9 w-9 place-items-center border border-[#081020]/15" aria-label="Close navigation menu"><X size={16} /></button></div>
        <div className="adx-menu-grid">
          {(groupLists[open] || []).map((page) => <SiteLink key={page.path} to={page.path} onNavigate={go} className="border-t border-[#081020]/15 py-4 hover:border-[#E8621A]"><span className="adx-mono block text-[9px] tracking-[.13em] text-[#E8621A]">{page.group.toUpperCase()}</span><span className="mt-2 block text-sm font-semibold">{page.title}</span><span className="mt-1 block max-w-[270px] text-xs leading-5 text-[#081020]/60">{page.description}</span></SiteLink>)}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-8 border-t border-[#081020]/10 pt-4 text-xs"><SiteLink to="/enterprise" onNavigate={go} className="font-semibold text-[#1552C2]">Enterprise: Cloud, Security & Data <ArrowRight className="ml-1 inline" size={13} /></SiteLink><SiteLink to="/tools" onNavigate={go} className="font-semibold text-[#1552C2]">Tools we work with <ArrowRight className="ml-1 inline" size={13} /></SiteLink><SiteLink to="/how-we-work" onNavigate={go} className="font-semibold text-[#1552C2]">How we work <ArrowRight className="ml-1 inline" size={13} /></SiteLink></div>
      </div>
    </div>}
    {mobileOpen && <div className="absolute left-0 right-0 top-full max-h-[calc(100dvh-72px)] overflow-auto border-t border-[#081020]/10 bg-[#FBFAF9] px-5 pb-7 pt-4 shadow-xl xl:hidden">
      <div className="mb-4 flex items-center justify-between gap-3 text-xs text-[#081020]/55"><span>Jamaica · island-wide<br /><span className="text-[10px] text-[#081020]/45">WhatsApp unavailable: [WHATSAPP NUMBER]</span></span><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary min-h-10 px-3">Book a free call <ArrowUpRight size={13} /></a></div>
      {menuGroups.map((label) => <div key={label} className="border-t border-[#081020]/10"><button onClick={() => setOpen(open === label ? "" : label)} className="flex min-h-[50px] w-full items-center justify-between text-left text-sm font-semibold" aria-expanded={open === label}>{label}<ChevronDown size={15} /></button>{open === label && <div className="grid grid-cols-1 gap-x-5 pb-3 sm:grid-cols-2">{(groupLists[label] || []).map((p) => <SiteLink key={p.path} to={p.path} onNavigate={go} className="flex min-h-11 items-center justify-between border-t border-[#081020]/[.07] py-2 text-sm">{p.title}<ArrowUpRight size={13} className="text-[#1552C2]" /></SiteLink>)}</div>}</div>)}
      <div className="grid grid-cols-2 gap-x-4 border-t border-[#081020]/10 py-3 text-sm"><SiteLink to="/our-work" onNavigate={go} className="flex min-h-11 items-center">Our Work</SiteLink><SiteLink to="/packages" onNavigate={go} className="flex min-h-11 items-center">Packages</SiteLink><SiteLink to="/tools" onNavigate={go} className="flex min-h-11 items-center">Tools</SiteLink><SiteLink to="/contact" onNavigate={go} className="flex min-h-11 items-center">Contact</SiteLink></div>
    </div>}
  </header>;
}

function SearchOverlay({ onClose, navigate }: { onClose: () => void; navigate: (path: string) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pages.filter((p) => !["Home", "Case study template", "404", "Privacy", "Terms"].includes(p.title)).slice(0, 8);
    return pages.filter((p) => `${p.title} ${p.group} ${p.description} ${p.points?.join(" ") || ""}`.toLowerCase().includes(q)).slice(0, 12);
  }, [query]);
  useEffect(() => {
    inputRef.current?.focus();
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") closeRef.current(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  const select = (path: string) => { onClose(); navigate(path); };
  return <div className="adx-search-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section ref={panelRef} onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const items = panelRef.current?.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled]), a[href]');
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }} role="dialog" aria-modal="true" aria-labelledby="site-search-heading" className="adx-search-panel">
      <div className="flex items-center justify-between border-b border-[#081020]/10 px-5 py-4"><div><div id="site-search-heading" className="adx-mono text-[10px] tracking-[.14em] text-[#1552C2]">SEARCH ADx</div><p className="mt-1 text-xs text-[#081020]/55">Find a service, product or page.</p></div><button onClick={onClose} className="grid h-10 w-10 place-items-center border border-[#081020]/15" aria-label="Close search"><X size={17} /></button></div>
      <label className="flex items-center gap-3 px-5 py-4"><Search size={19} className="shrink-0 text-[#1552C2]" /><input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “hotel wifi” or “email marketing”" className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-[#081020]/40" /></label>
      <div className="border-t border-[#081020]/10 px-5 py-3"><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/45">{query ? `${results.length} MATCHING PAGES` : "POPULAR DESTINATIONS"}</span></div>
      <div className="max-h-[48dvh] overflow-auto">
        {results.map((item) => <button key={item.path} onClick={() => select(item.path)} className="adx-search-result"><span><span className="adx-mono block text-[9px] tracking-[.12em] text-[#E8621A]">{item.group.toUpperCase()}</span><span className="mt-1 block text-sm font-semibold">{item.title}</span><span className="mt-1 block max-w-[560px] text-xs leading-5 text-[#081020]/60">{item.description}</span></span><ArrowUpRight size={16} className="shrink-0 text-[#1552C2]" /></button>)}
        {!results.length && <div className="px-5 py-10 text-center"><CircleHelp size={22} className="mx-auto text-[#E8621A]" /><p className="mt-3 text-sm font-semibold">No page found for “{query}”</p><p className="mt-1 text-xs text-[#081020]/60">Try a service name, audience or product.</p></div>}
      </div>
      <div className="flex justify-between border-t border-[#081020]/10 px-5 py-3 text-[10px] text-[#081020]/45"><span>Search services and pages</span><span>ESC to close</span></div>
    </section>
  </div>;
}

function Footer({ navigate }: { navigate: (path: string) => void }) {
  const groups = [
    { title: "CONNECT · RUN", links: pages.filter((p) => ["Connect", "Run"].includes(p.group)) },
    { title: "BRAND · GROW", links: pages.filter((p) => ["Brand", "Grow"].includes(p.group)) },
    { title: "WHO WE HELP", links: pages.filter((p) => p.group === "Audiences" && p.path !== "/who-we-help") },
    { title: "COMPANY", links: pages.filter((p) => ["Company", "Start here", "Enterprise", "Legal"].includes(p.group) && p.path !== "/our-work/client-slug") },
  ];
  return <footer className="bg-[#081020] px-5 pb-7 pt-12 text-white sm:px-8 sm:pt-16">
    <div className="adx-container">
      <div className="grid gap-9 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_repeat(4,1fr)]">
        <div><img src="/__mockup/images/adx-logo.png" alt="Arrington Digital" className="h-12 w-32 object-contain object-left" /><p className="mt-4 max-w-[260px] text-sm font-medium">Build Smarter. Market Better. Scale Further.</p><p className="mt-3 max-w-[260px] text-xs leading-5 text-white/55">Technology and marketing for Jamaica’s hospitality and property businesses. One team, start to finish.</p></div>
        {groups.map((group) => <div key={group.title}><div className="adx-mono text-[9px] tracking-[.15em] text-white/45">{group.title}</div>{group.links.map((p) => <SiteLink key={p.path} to={p.path} onNavigate={navigate} className="adx-footer-link">{p.title}</SiteLink>)}</div>)}
      </div>
      <div className="grid gap-7 border-b border-white/10 py-7 text-xs text-white/60 md:grid-cols-[1.4fr_1fr]">
        <div><div className="adx-mono mb-3 text-[9px] tracking-[.14em] text-white/45">CONTACT</div><p>Level 9, 60 Knutsford Blvd, Kingston, Jamaica</p><p className="mt-1">Pennsylvania, USA</p><a href={`mailto:${EMAIL}`} className="mt-2 inline-flex min-h-8 items-center text-white/85 hover:text-white">{EMAIL}</a><p>[JAMAICA PHONE NUMBER]</p></div>
        <div><div className="adx-mono mb-3 text-[9px] tracking-[.14em] text-white/45">FOLLOW</div><p>LinkedIn · Instagram [@HANDLE] · [OTHER SOCIALS]</p></div>
      </div>
      <div className="flex flex-col gap-3 pt-5 text-[10px] text-white/40 sm:flex-row sm:items-start sm:justify-between"><span>© 2026 Arrington Digital. All rights reserved.</span><span className="max-w-xl">ADx contracts under [B.Arren, LLC DBA Arrington Digital - Pennsylvania, USA] and [Arrington Digital Limited - Kingston, Jamaica]. Confirm wording with counsel.</span><div className="flex gap-4"><SiteLink to="/legal/privacy" onNavigate={navigate}>Privacy</SiteLink><SiteLink to="/legal/terms" onNavigate={navigate}>Terms</SiteLink></div></div>
    </div>
  </footer>;
}

function CTA({ title = "Tell us what you’re building.", copy = "A new development, a resort refresh, a restaurant opening—we’ll map out what you need and what it costs on a free 20-minute call." }: { title?: string; copy?: string }) {
  return <section className="bg-[#E8621A] px-5 py-14 text-white sm:px-8 sm:py-16"><div className="adx-container flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><Eyebrow light>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2 className="mt-5 max-w-[670px] text-4xl font-medium leading-[1.03] tracking-[-.055em] sm:text-6xl">{title}</h2><p className="mt-4 max-w-[550px] text-sm leading-6 text-white/85">{copy}</p></div><div className="shrink-0"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[54px] px-6">Book a free call <ArrowUpRight size={16} /></a><div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/85"><a className="inline-flex items-center gap-2" href={`mailto:${EMAIL}`}><Mail size={13} />{EMAIL}</a><span>[JAMAICA PHONE NUMBER]</span></div></div></div></section>;
}

function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const scenes = [
    { time: 0, number: "01", title: "ADx in motion", source: "CURRENT ADx SITE VIDEO" },
    { time: 3.2, number: "02", title: "Kingston hillside", source: "KINGSTON AERIAL · PEXELS" },
    { time: 6.4, number: "03", title: "Kingston from above", source: "KINGSTON AERIAL · PEXELS" },
  ];
  const [activeScene, setActiveScene] = useState(1);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => video.pause();
  }, []);
  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { try { await video.play(); setPlaying(true); } catch { setPlaying(false); } }
    else { video.pause(); setPlaying(false); }
  };
  const updateScene = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused && video.currentTime < 0.15) return;
    if (video.currentTime >= 9.55) {
      video.currentTime = 0;
      setActiveScene(0);
      return;
    }
    const next = video.currentTime < 3.2 ? 0 : video.currentTime < 6.4 ? 1 : 2;
    if (next !== activeScene) setActiveScene(next);
  };
  const selectScene = async (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = scenes[index].time;
    setActiveScene(index);
    if (video.paused) { try { await video.play(); setPlaying(true); } catch { setPlaying(false); } }
  };
  const stepsFor = steps;
  return <>
    <section id="home" className="px-3 pb-5 pt-3 sm:px-6 sm:pt-6">
      <div className="mx-auto grid max-w-[1520px] overflow-hidden border border-[#081020]/15 bg-[#FBFAF9] lg:grid-cols-[.92fr_1.08fr]">
        <div className="relative order-2 flex min-h-[510px] flex-col justify-between px-6 py-7 sm:px-10 sm:py-10 lg:order-1 lg:min-h-[690px] lg:px-12 lg:py-12">
          <div className="flex items-center justify-between gap-4 border-b border-[#081020]/10 pb-4">
            <Eyebrow>JAMAICA FIRST <span className="text-[#222]/35">/</span> TECHNOLOGY + MARKETING</Eyebrow>
            <span className="adx-mono shrink-0 text-[9px] tracking-[.12em] text-[#081020]/45">01—04</span>
          </div>
          <div className="py-10 lg:py-12">
            <p className="adx-mono mb-5 text-[9px] tracking-[.16em] text-[#1552C2]">FOR THE PLACES JAMAICA RUNS ON</p>
            <h1 className="adx-reveal max-w-[650px] text-[clamp(2.9rem,6vw,5.8rem)] font-medium leading-[.95] tracking-[-.075em] text-[#081020]">Build Smarter.<br />Market Better.<br /><span className="text-[#1552C2]">Scale Further.</span></h1>
            <p className="adx-reveal adx-delay-1 mt-6 max-w-[500px] text-[15px] leading-7 text-[#081020]/72 sm:text-[16px]">Technology and marketing for Jamaica’s resorts, villas, restaurants and attractions. One local team connects the systems, story and demand behind every guest experience.</p>
            <div className="adx-reveal adx-delay-2 mt-7 flex flex-col gap-3 min-[430px]:flex-row">
              <a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary min-h-[50px] px-5">Book a free call <ArrowUpRight size={15} /></a>
              <a href="/what-we-do" onClick={(e) => { e.preventDefault(); navigate("/what-we-do"); }} className="adx-action min-h-[50px] border border-[#081020]/25 px-5 text-[#081020] hover:border-[#1552C2] hover:text-[#1552C2]">Explore Jamaica services <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#081020]/15 pt-4">
            <span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/55"><MapPin size={12} className="mr-2 inline text-[#E8621A]" />KINGSTON-BASED · JAMAICA-WIDE</span>
            <span className="text-[11px] text-[#081020]/55">One team, start to finish.</span>
          </div>
        </div>
        <div className="relative order-1 min-h-[290px] overflow-hidden bg-[#081020] sm:min-h-[400px] lg:order-2 lg:min-h-[690px]">
          <img src="/__mockup/images/arrington-digital-kingston-poster.jpg" alt="" className={`absolute inset-0 h-full w-full object-cover object-[60%_center] transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`} />
          <video ref={videoRef} className="adx-video" src="/__mockup/videos/adx-hero-reel.mp4" poster="/__mockup/images/arrington-digital-kingston-poster.jpg" muted autoPlay playsInline preload="auto" aria-label="Muted video montage of ADx technology footage and Kingston aerial views" onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 3.2; }} onCanPlay={() => { videoRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }} onTimeUpdate={updateScene} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,32,.35),transparent_35%,rgba(8,16,32,.9))]" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3 sm:left-7 sm:right-7 sm:top-7">
            <span className="adx-mono text-[9px] tracking-[.15em] text-white/80">JAMAICA, IN MOTION <span className="ml-2 text-[#E8621A]">/</span> {scenes[activeScene].source}</span>
            <button onClick={toggleVideo} aria-label={playing ? "Pause hero video" : "Play hero video"} aria-pressed={playing} className="inline-flex min-h-10 shrink-0 items-center gap-2 border border-white/45 bg-[#081020]/25 px-3 text-[10px] font-medium text-white backdrop-blur-sm transition hover:bg-white/10">{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? "Pause" : "Play reel"}</button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12 sm:px-7 sm:pb-7">
            <div className="mb-4 flex items-end justify-between gap-4 text-white"><div><div className="adx-mono text-[9px] tracking-[.13em] text-white/55">ON THE GROUND</div><h2 className="mt-1 text-2xl font-medium tracking-[-.045em] sm:text-3xl">{scenes[activeScene].title}</h2></div><span className="adx-mono text-[10px] text-white/55">0{activeScene + 1} / 03</span></div>
            <div className="grid grid-cols-3 border-t border-white/30">
              {scenes.map((scene, index) => <button key={scene.number} type="button" onClick={() => void selectScene(index)} aria-current={activeScene === index ? "step" : undefined} className="group min-h-[57px] border-r border-white/20 px-2 pt-3 text-left last:border-r-0 sm:px-3">
                <span className={`adx-mono block text-[9px] tracking-[.1em] ${activeScene === index ? "text-[#E8621A]" : "text-white/45"}`}>{scene.number} <span className="text-white/30">/</span> 03</span>
                <span className="mt-1 block text-[10px] font-medium leading-4 text-white/80 transition group-hover:text-white sm:text-xs">{scene.title}</span>
              </button>)}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-x-5 gap-y-1 px-3 pt-2 text-[9px] leading-4 text-[#081020]/50 sm:px-6">
        <span>Concept reel: current ADx footage + Pexels Kingston aerials. Stock scenes are illustrative—not client property footage.</span>
        <span className="shrink-0">Muted · 3-scene loop</span>
      </div>
    </section>

    <section aria-label="Tools we work with" className="border-y border-[#081020]/10 bg-[#F2ECE8]"><div className="adx-container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="adx-mono text-[9px] tracking-[.15em] text-[#081020]/50">TOOLS WE BUILD ON</div><p className="mt-1 text-sm text-[#081020]/70">A connected toolkit, chosen for the job—not another stack to manage.</p></div><SiteLink to="/tools" onNavigate={navigate} className="adx-text-link">See every tool we use <ArrowUpRight size={14} /></SiteLink></div></section>

    <section id="steps" className="adx-section adx-container">
      <div className="grid gap-6 md:grid-cols-[1.05fr_.8fr] md:items-end"><div><Eyebrow>WHAT WE DO <span className="text-[#222]/35">/</span> FOUR CONNECTED STEPS</Eyebrow><h2 className="adx-heading">Everything your property needs, <span className="text-[#1552C2]">from the walls to the bookings.</span></h2></div><p className="adx-copy max-w-[440px] md:justify-self-end">No need to juggle a wifi company, a web designer and a marketing agency. Start with one step—or bring it all under one team.</p></div>
      <div className="mt-12 grid border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-4">{stepsFor.map(({ number, title, sub, copy, icon: Icon, links }) => <article key={number} className="group min-h-[306px] border-b border-[#081020]/15 py-6 pr-4 sm:px-4 lg:border-r lg:first:pl-0 lg:last:border-r-0"><div className="flex items-center justify-between"><span className="adx-mono text-[9px] tracking-[.13em] text-[#E8621A]">{number} <span className="text-[#081020]/30">/</span> {title}</span><span className="grid h-10 w-10 place-items-center border border-[#081020]/15 text-[#1552C2] transition group-hover:border-[#E8621A] group-hover:bg-[#E8621A] group-hover:text-white"><Icon size={17} /></span></div><h3 className="mt-7 text-[23px] font-medium leading-tight tracking-[-.04em]">{sub}</h3><p className="mt-3 min-h-[50px] max-w-[260px] text-sm leading-6 text-[#081020]/65">{copy}</p><div className="mt-5 space-y-1.5">{links.map(([link, path]) => <SiteLink key={link} to={path} onNavigate={navigate} className="flex min-h-7 w-fit items-center gap-2 text-xs font-medium text-[#081020]/75 hover:text-[#E8621A]">{link}<ArrowUpRight size={11} className="opacity-0 transition group-hover:opacity-100" /></SiteLink>)}</div></article>)}</div>
      <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-[#081020]/65">Start with one step or let us handle all four. Everything we build connects.</p><SiteLink to="/what-we-do" onNavigate={navigate} className="adx-text-link">See everything we do <ArrowRight size={14} /></SiteLink></div>
    </section>

    <section className="bg-[#F2ECE8] py-16 sm:py-20"><div className="adx-container"><div className="grid gap-6 md:grid-cols-[1fr_.6fr] md:items-end"><div><Eyebrow>WHO WE HELP <span className="text-[#222]/35">/</span> JAMAICA FIRST</Eyebrow><h2 className="adx-heading max-w-[700px]">Built for the businesses that keep Jamaica moving.</h2></div><p className="adx-copy max-w-[370px] md:justify-self-end">Hospitality and property first. Enterprise technology is here too, one click deeper.</p></div>
      <div className="mt-10 grid gap-0 border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-4">{audienceTiles.map(({ title, path, copy, icon: Icon, number }) => <SiteLink key={path} to={path} onNavigate={navigate} className="group relative flex min-h-[250px] flex-col justify-between border-b border-[#081020]/15 py-5 pr-4 sm:px-4 lg:border-r lg:first:pl-0 lg:last:border-r-0"><div className="flex items-center justify-between"><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/50">0{number} / JAMAICA</span><Icon size={17} className="text-[#E8621A]" /></div><div><h3 className="text-[22px] font-medium tracking-[-.04em]">{title}</h3><p className="mt-2 max-w-[255px] text-sm leading-6 text-[#081020]/65">{copy}</p><span className="mt-4 flex h-9 w-9 items-center justify-center border border-[#081020]/30 transition group-hover:border-[#E8621A] group-hover:bg-[#E8621A] group-hover:text-white"><ArrowUpRight size={15} /></span></div></SiteLink>)}</div>
      <SiteLink to="/enterprise" onNavigate={navigate} className="group mt-5 flex min-h-[60px] flex-col justify-center gap-2 border-t border-[#081020]/15 pt-4 text-sm text-[#081020]/70 sm:flex-row sm:items-center sm:justify-between">Larger organisation? We also work with pharma, manufacturing, retail and education.<span className="font-semibold text-[#1552C2]">See enterprise cloud, security & data <ArrowRight className="ml-1 inline transition-transform group-hover:translate-x-1" size={14} /></span></SiteLink>
    </div></section>

      <section className="bg-[#081020] py-16 text-white sm:py-24"><div className="adx-container grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><Eyebrow light>WHY ONE TEAM</Eyebrow><h2 className="mt-5 max-w-[470px] text-4xl font-medium leading-[1.04] tracking-[-.055em] sm:text-5xl">One team.<br />One contract.<br /><span className="text-[#E8621A]">One number to call.</span></h2><p className="mt-6 max-w-[360px] text-sm leading-7 text-white/65">Good work happens when the people building your technology and your marketing talk to each other.</p></div><div className="grid sm:grid-cols-2">{[["01","One point of contact","No chasing the wifi company, web designer and marketing agency separately."],["02","Local team, island-wide","Based in Kingston and working across Jamaica with local property teams."],["03","We stay after launch","Ongoing care for the things we build, not a goodbye at handover."],["04","You own what we build","Your website, your data and your accounts stay yours."]].map(([n,title,body])=><div key={n} className="border-t border-white/20 py-5 sm:px-5"><div className="adx-mono text-[10px] tracking-[.14em] text-[#E8621A]">{n}</div><h3 className="mt-3 text-lg font-medium">{title}</h3><p className="mt-2 max-w-[270px] text-sm leading-6 text-white/60">{body}</p></div>)}</div></div></section>

    <section className="adx-section adx-container"><div className="grid gap-9 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><Eyebrow>MEET VICKI ANN <span className="text-[#222]/35">/</span> ALWAYS ON</Eyebrow><h2 className="adx-heading max-w-[480px]">The front desk that never clocks out.</h2><p className="adx-copy mt-5 max-w-[450px]">Vicki Ann answers your phone, texts and website chat around the clock—taking reservations, answering guest questions and handing over when someone needs a person.</p><div className="mt-7 flex flex-wrap gap-3"><button disabled title="Demo destination needed: [DEMO NUMBER / CHAT]" className="adx-action cursor-not-allowed bg-[#081020] px-5 text-white/75">Try Vicki Ann <span className="text-[9px] text-white/55">[DEMO NUMBER / CHAT]</span></button><SiteLink to="/vicki-ann" onNavigate={navigate} className="adx-text-link px-2">Learn more <ArrowUpRight size={14} /></SiteLink></div><p className="adx-mono mt-7 text-[9px] tracking-[.14em] text-[#081020]/45">MADE FOR HOSPITALITY, NOT ANOTHER INBOX</p></div>
      <div className="relative border border-[#081020]/10 bg-[#F2ECE8] p-5 sm:p-8"><div className="mx-auto max-w-[470px] border border-[#081020]/10 bg-[#FBFAF9] p-5 sm:p-7"><div className="flex items-center justify-between border-b border-[#081020]/10 pb-4"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center bg-[#081020] text-white"><Sparkles size={16} /></div><div><div className="text-sm font-semibold">Vicki Ann</div><div className="text-[11px] text-[#081020]/55">Guest experience assistant</div></div></div><span className="flex items-center gap-2 text-[10px] text-[#245C37]"><span className="h-2 w-2 bg-[#4C9B60]" /> Illustrative</span></div><div className="mt-6 space-y-4 text-xs leading-5"><div className="max-w-[82%] border border-[#081020]/10 bg-[#F2ECE8] p-3.5">Good afternoon. How can I help with your stay?</div><div className="ml-auto max-w-[78%] bg-[#1552C2] p-3.5 text-white">Do you have a room with a sea view for Friday?</div><div className="max-w-[86%] border border-[#081020]/10 bg-[#F2ECE8] p-3.5">I can help with that. Let me check availability and connect you with the team.</div></div><div className="adx-mono mt-6 border-t border-[#081020]/10 pt-4 text-[9px] tracking-[.12em] text-[#081020]/45">ILLUSTRATIVE CONVERSATION</div></div><div className="mt-4 flex items-center gap-2 text-[10px] text-[#081020]/55"><CalendarDays size={13} className="text-[#E8621A]" /> Phone · text · web chat</div></div>
    </div></section>

    <section className="bg-[#F2ECE8] py-16 sm:py-20"><div className="adx-container"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><Eyebrow>START HERE <span className="text-[#222]/35">/</span> THREE WAYS IN</Eyebrow><h2 className="adx-heading">A good place to begin.</h2></div><p className="adx-copy max-w-[360px]">A clear starting point. We’ll shape the scope and quote around your property.</p></div><div className="mt-9 grid gap-0 border-t border-[#081020]/15 md:grid-cols-3">{[
      {id:"01",title:"Launch",label:"BRAND + WEBSITE",copy:"A clear identity, a custom website and the social set-up to open well.",path:"/packages"},
      {id:"02",title:"Grow",label:"ONGOING MARKETING",copy:"A steady rhythm of social, email, ads and reporting.",path:"/packages"},
      {id:"03",title:"Property tech",label:"NETWORK + ACCESS",copy:"A considered network plan, designed around the building and the people in it.",path:"/packages"},
    ].map((p)=><SiteLink to={p.path} onNavigate={navigate} key={p.id} className="group flex min-h-[225px] flex-col justify-between border-b border-[#081020]/15 py-5 pr-5 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"><div className="flex justify-between"><span className="adx-mono text-[9px] tracking-[.14em] text-[#E8621A]">{p.label}</span><span className="adx-mono text-[10px] text-[#081020]/45">{p.id}</span></div><div><h3 className="text-3xl font-medium tracking-[-.05em]">{p.title}</h3><p className="mt-2 max-w-[290px] text-sm leading-6 text-[#081020]/65">{p.copy}</p></div><div className="flex items-center justify-between border-t border-[#081020]/15 pt-4 text-xs font-semibold"><span>Custom quote</span><ArrowUpRight size={16} className="text-[#1552C2] transition group-hover:-translate-y-1 group-hover:translate-x-1" /></div></SiteLink>)}</div><p className="mt-4 text-xs text-[#081020]/55">Final scope and pricing are confirmed after a conversation. No prices have been supplied for this concept.</p></div></section>

    <section className="adx-section adx-container grid gap-9 md:grid-cols-[.7fr_1.3fr] md:items-center"><div className="relative min-h-[340px] overflow-hidden bg-[#F2ECE8]"><img src="/__mockup/images/jamaica-hospitality-hero.jpg" alt="Hospitality property image used as illustrative concept imagery" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[65%_center]" /><div className="absolute inset-0 bg-gradient-to-t from-[#081020]/55 to-transparent" /><div className="absolute bottom-4 left-4 max-w-[220px] border-l-2 border-[#E8621A] bg-[#081020]/75 p-4 text-white"><div className="adx-mono text-[9px] tracking-[.14em] text-white/65">ROOTED HERE</div><p className="mt-2 text-sm font-medium">Building something to bring home.</p></div></div><div className="md:pl-8"><Eyebrow>A NOTE FROM OUR FOUNDER</Eyebrow><h2 className="adx-heading max-w-[650px]">Good technology should feel close to home.</h2><p className="adx-copy mt-6 max-w-[600px]">Jamaica is home. The people building its next chapter deserve technology and marketing partners who understand the place, the pace and the ambition. That’s why we’re building a team here—and creating room for young Jamaicans to do meaningful work.</p><p className="mt-6 text-sm font-semibold">Alexia Fulton <span className="ml-2 font-normal text-[#081020]/55">Founder, Arrington Digital</span></p><SiteLink to="/adx-jamaica" onNavigate={navigate} className="adx-text-link mt-4">Our story in Jamaica <ArrowRight size={14} /></SiteLink></div></section>

      <section className="border-y border-[#081020]/10 bg-[#F2ECE8]/80"><div className="adx-container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"><div><Eyebrow>ALSO FOR U.S. ENTERPRISE TEAMS</Eyebrow><p className="mt-2 text-base font-medium">A wider industry view, one click deeper.</p><p className="mt-1 text-sm text-[#081020]/60">Cloud, security, data and software for pharma, manufacturing, retail and education.</p></div><SiteLink to="/enterprise" onNavigate={navigate} className="adx-text-link">Explore enterprise services <ArrowUpRight size={14} /></SiteLink></div></section>
    <CTA />
  </>;
}

function InteriorPage({ page, navigate }: { page: Page; navigate: (path: string) => void }) {
  const is404 = page.path === "/404";
  const icon = page.group === "Connect" ? Wifi : page.group === "Run" ? Cpu : page.group === "Brand" ? PanelsTopLeft : page.group === "Grow" ? Megaphone : page.group === "Audiences" ? Hotel : page.group === "Enterprise" ? ShieldCheck : Globe2;
  const Icon = icon;
  const related = pages.filter((p) => p.group === page.group && p.path !== page.path && p.path !== "/our-work/client-slug").slice(0, 4);
  return <>
    <section className="relative overflow-hidden bg-[#081020] px-5 py-16 text-white sm:py-24"><div className="absolute inset-y-0 right-0 hidden w-[43%] border-l border-white/10 lg:block"><div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(21,82,194,.28),transparent_55%,rgba(232,98,26,.12))]" /><div className="absolute bottom-8 right-8 text-right"><div className="adx-mono text-[9px] tracking-[.15em] text-white/45">ARRINGTON DIGITAL</div><div className="mt-2 text-xs text-white/55">JAMAICA · ISLAND-WIDE</div></div></div>
      <div className="adx-container relative"><nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[11px] text-white/55"><a href="/" onClick={(e) => {e.preventDefault();navigate("/")}}>Home</a><span>/</span><span className="text-white/85">{page.title}</span></nav><div className="max-w-[760px]"><Eyebrow light>{page.group.toUpperCase()} <span className="text-white/35">/</span> ARRINGTON DIGITAL</Eyebrow><div className="mt-8 flex items-center gap-4"><span className="grid h-12 w-12 place-items-center border border-white/25 text-[#E8621A]"><Icon size={20} /></span><span className="adx-mono text-[9px] tracking-[.14em] text-white/45">KINGSTON & PENNSYLVANIA</span></div><h1 className="mt-6 text-[clamp(2.7rem,7vw,5.6rem)] font-medium leading-[.96] tracking-[-.07em]">{page.intro || page.title}</h1>{page.intro && page.title !== page.intro && <p className="mt-4 text-xl text-white/80">{page.title}</p>}<p className="mt-6 max-w-[650px] text-[15px] leading-7 text-white/75">{page.description}</p><div className="mt-8 flex flex-wrap gap-3"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary">Book a free call <ArrowUpRight size={15} /></a><a href="#details" className="adx-action adx-action-ghost">Explore this page <ArrowDown size={15} /></a></div></div></div></section>
    <section id="details" className="adx-section adx-container"><div className="grid gap-9 md:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>{page.group.toUpperCase()} <span className="text-[#222]/35">/</span> THE DETAILS</Eyebrow><h2 className="adx-heading max-w-[500px]">{is404 ? "Find your next step." : page.path === "/our-work" ? "Proof comes after permission." : "A clearer way forward."}</h2><p className="adx-copy mt-5 max-w-[410px]">{page.path === "/our-work" ? "Case studies stay hidden until the client, details and permission are confirmed. No results or client names are invented here." : page.path === "/contact" ? "No contact form. Choose a direct route to the team and keep your details with you." : "The work starts with the place, the people and what needs to happen next."}</p>{page.path === "/contact" && <div className="mt-7 flex flex-col items-start gap-2"><a className="adx-text-link" href={CAL} target="_blank" rel="noreferrer">Book a free call <ArrowUpRight size={14} /></a><a className="adx-text-link" href={`mailto:${EMAIL}`}><Mail size={14} />{EMAIL}</a></div>}</div><div className="border-t border-[#081020]/15">{(page.points || []).map((point, index) => <div key={point} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[#081020]/15 py-5"><span className="adx-mono pt-1 text-[10px] tracking-[.1em] text-[#E8621A]">0{index + 1}</span><p className="max-w-[660px] text-sm leading-6 text-[#081020]/75">{point}</p></div>)}</div></div></section>
    {related.length > 0 && <section className="bg-[#F2ECE8] py-14"><div className="adx-container"><Eyebrow>KEEP EXPLORING <span className="text-[#222]/35">/</span> {page.group.toUpperCase()}</Eyebrow><div className="mt-7 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <SiteLink key={r.path} to={r.path} onNavigate={navigate} className="adx-page-card"><span className="adx-mono text-[9px] tracking-[.12em] text-[#E8621A]">{r.group.toUpperCase()}</span><span><span className="block text-lg font-medium tracking-[-.03em]">{r.title}</span><span className="mt-2 block text-xs leading-5 text-[#081020]/60">{r.description}</span></span><span className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#1552C2]">Explore <ArrowRight size={13} /></span></SiteLink>)}</div></div></section>}
    <CTA title={page.path === "/contact" ? "Talk through what comes next." : undefined} copy={page.path === "/contact" ? "Book a free 20-minute call or email the team directly. No form, no pressure." : undefined} />
  </>;
}

export function Homepage() {
  const [path, setPath] = useState(window.location.hash.startsWith("#/") ? window.location.hash.slice(1) : "/");
  const [searchOpen, setSearchOpen] = useState(false);
  const [top, setTop] = useState(true);
  const navigate = (nextPath: string) => {
    const known = pages.some((p) => p.path === nextPath);
    const finalPath = known ? nextPath : "/404";
    window.history.pushState({}, "", `${window.location.pathname}${window.location.search}#${finalPath}`);
    setPath(finalPath);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  useEffect(() => {
    const pop = () => setPath(window.location.hash.startsWith("#/") ? window.location.hash.slice(1) : "/");
    const scroll = () => setTop(window.scrollY < 24);
    const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } };
    window.addEventListener("popstate", pop);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("popstate", pop); window.removeEventListener("scroll", scroll); window.removeEventListener("keydown", key); };
  }, []);
  const page = pages.find((p) => p.path === path) || pages.find((p) => p.path === "/404")!;
  const home = path === "/";
  useEffect(() => {
    document.title = page.title === "Home" ? "Arrington Digital | Tech & Marketing for Jamaica’s Properties" : `${page.title} | Arrington Digital`;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement("meta"); description.setAttribute("name", "description"); document.head.appendChild(description); }
    description.setAttribute("content", page.description.slice(0, 155));
  }, [page]);
  return <main className="adx-home min-h-[100dvh] overflow-x-clip">
    <Header navigate={navigate} onSearch={() => setSearchOpen(true)} />
    {home ? <HomePage navigate={navigate} /> : <InteriorPage page={page} navigate={navigate} />}
    <Footer navigate={navigate} />
    {!top && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center border border-white/20 bg-[#081020] text-white shadow-lg transition hover:bg-[#1552C2]"><ArrowDown size={16} className="rotate-180" /></button>}
    {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} navigate={navigate} />}
  </main>;
}
