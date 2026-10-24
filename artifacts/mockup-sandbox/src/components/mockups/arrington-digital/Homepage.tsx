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
  { title: "Home", path: "/", group: "Home", description: "Cloud, cybersecurity, data and AI, and digital experience for organizations in the U.S. and Jamaica.", intro: "Build Smarter. Market Better. Scale Further." },
  { title: "What We Do", path: "/what-we-do", group: "Services", description: "Four connected capabilities: cloud and infrastructure, cybersecurity and compliance, data and AI, and marketing and digital experience.", points: ["Cloud & Infrastructure — resilient foundations for the work ahead.", "Cybersecurity & Compliance — protect systems, people and information.", "Data & AI — make data more useful and put AI to work thoughtfully.", "Marketing & Digital Experience — create clear, useful experiences across channels."] },
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
  { title: "Who We Help", path: "/who-we-help", group: "Audiences", description: "Organizations across industries in the U.S. and Jamaica.", points: ["Pharmaceutical & Life Sciences", "Manufacturing", "Hospitality & Tourism", "Retail & CPG", "Agriculture", "And other industries"] },
  { title: "Arrington Digital Limited", path: "/adx-jamaica", group: "Company", description: "The Jamaica-specific home for Arrington Digital Limited’s services, locations, industries and local context.", points: ["Kingston, Montego Bay, Ocho Rios, Negril, Mandeville and island-wide coverage", "Hospitality & Tourism, Financial Services and Government Modernization", "Local technology, security, data and marketing services"] },
  { title: "Pharmaceutical & Life Sciences", path: "/industries/pharmaceutical-life-sciences", group: "Industries", description: "Cloud, security, data and digital capabilities for pharmaceutical and life sciences organizations.", points: ["Cloud and infrastructure", "Cybersecurity and compliance", "Data platforms and AI", "Marketing and digital experience"] },
  { title: "Manufacturing", path: "/industries/manufacturing", group: "Industries", description: "Connected infrastructure, security, data and digital experience for manufacturing organizations.", points: ["Cloud and infrastructure", "Cybersecurity and compliance", "Data platforms and AI", "Marketing and digital experience"] },
  { title: "Hospitality & Tourism", path: "/industries/hospitality-tourism", group: "Industries", description: "Technology and digital experience for hospitality and tourism organizations in both markets.", points: ["Cloud and infrastructure", "Cybersecurity and compliance", "Data platforms and AI", "Marketing and digital experience", "Hospitality products include ADx Surge and Vicki Ann"] },
  { title: "Retail & CPG", path: "/industries/retail-cpg", group: "Industries", description: "Cloud, data, security and digital experience for retail and consumer goods.", points: ["Cloud and infrastructure", "Cybersecurity and compliance", "Data platforms and AI", "Marketing and digital experience"] },
  { title: "Agriculture", path: "/industries/agriculture", group: "Industries", description: "Technology and digital capabilities for agriculture organizations.", points: ["Cloud and infrastructure", "Cybersecurity and compliance", "Data platforms and AI", "Marketing and digital experience"] },
  { title: "Contact", path: "/contact", group: "Company", description: "Talk through a new development, resort refresh or restaurant opening. Book a free 20-minute call or email the team.", points: ["Book a free call", EMAIL, "[JAMAICA PHONE NUMBER]", "Level 9, 60 Knutsford Blvd, Kingston, Jamaica", "Pennsylvania, USA"] },
  { title: "Resorts & Hotels", path: "/who-we-help/resorts-hotels", group: "Audiences", description: "Connect the guest experience from arrival to checkout with dependable property technology, useful operations tools and considered marketing.", points: ["Guest and staff wifi across the property", "Vicki Ann, a 24/7 front desk assistant", "Websites, social and guest follow-up", "ADx Surge for multi-location operations"] },
  { title: "Villas & Real Estate", path: "/who-we-help/villas-real-estate", group: "Audiences", description: "Help overseas buyers discover a development, enquire with confidence and stay connected to property operations.", points: ["Websites and digital brand", "Owner and guest portals", "Property networks and access", "Email follow-up for enquiries"] },
  { title: "Restaurants & Bars", path: "/who-we-help/restaurants-bars", group: "Audiences", description: "Keep service moving with practical operations tools and a marketing presence that brings the right people to the table.", points: ["Scheduling and payroll with ADx Surge", "Brand identity and websites", "Social content and email", "Guest wifi and property networks"] },
  { title: "Attractions & Excursions", path: "/who-we-help/attractions-excursions", group: "Audiences", description: "Give visitors a clear path from discovery to booking, while helping teams run day-to-day operations.", points: ["Websites and booking enquiries", "Social and search visibility", "Scheduling and hiring tools", "Property wifi and access"] },
  { title: "Enterprise: Cloud, Security & Data", path: "/enterprise", group: "Enterprise", description: "Cloud, security, data and software for complex organizations across industries in the U.S. and Jamaica.", points: ["Cloud and infrastructure", "Cybersecurity and compliance", "Data platforms and AI", "Marketing and digital experience", "SOC 2, HIPAA, GDPR, FDIC and FedRAMP are addressed only in this enterprise context."] },
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

const steps = [
  { number: "01", title: "CLOUD", sub: "Cloud & infrastructure.", copy: "Build the infrastructure and foundations your organization can rely on.", icon: Wifi, links: [["Cloud & infrastructure", "/enterprise"], ["Property network engineering", "/adx-propertyengineering"], ["Tools we work with", "/tools"]] },
  { number: "02", title: "SECURITY", sub: "Cybersecurity & compliance.", copy: "Protect systems and information with a considered, practical approach.", icon: ShieldCheck, links: [["Cybersecurity & compliance", "/enterprise"], ["Enterprise services", "/enterprise"], ["How we work", "/how-we-work"]] },
  { number: "03", title: "DATA + AI", sub: "Make data work harder.", copy: "Connect data, clarify decisions and explore useful applications for AI.", icon: Cpu, links: [["Data platforms & AI", "/enterprise"], ["ADx LaunchIQ", "/adx-launchiq"], ["Custom software & apps", "/custom-software"]] },
  { number: "04", title: "EXPERIENCE", sub: "Marketing & digital experience.", copy: "Make every digital touchpoint clearer, more useful and easier to act on.", icon: Megaphone, links: [["Websites & digital experience", "/websites"], ["Marketing services", "/digital-marketing"], ["Brand identity", "/brand-identity"]] },
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
    "Who We Help": pages.filter((p) => p.group === "Industries").concat(pages.filter((p) => p.path === "/who-we-help" || p.path === "/enterprise" || p.path.startsWith("/who-we-help/"))),
    "Our Software": pages.filter((p) => ["/adx-surge", "/vicki-ann", "/adx-launchiq"].includes(p.path)),
    "Company": pages.filter((p) => p.group === "Company" || p.group === "Legal"),
  };
  const menuGroups = ["What We Do", "Who We Help", "Our Software", "Company"];
  const close = () => { setOpen(""); setMobileOpen(false); };
  const go = (path: string) => { close(); navigate(path); };
  return <header className="sticky top-0 z-50 border-b border-[#081020]/10 bg-[#FBFAF9]/95 backdrop-blur-xl">
    <div className="adx-container flex h-[72px] items-center justify-between gap-3">
      <SiteLink to="/" onNavigate={go} aria-label="Arrington Digital home" className="flex h-12 w-[64px] shrink-0 items-center overflow-hidden sm:w-[106px]"><img src="/__mockup/images/adx-logo.png" alt="Arrington Digital" className="h-[90px] w-[90px] max-w-none shrink-0 object-contain sm:h-[140px] sm:w-[140px]" /></SiteLink>
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
       <div className="mb-4 flex items-center justify-between gap-3 text-xs text-[#081020]/55"><span>United States · Jamaica<br /><span className="text-[10px] text-[#081020]/45">WhatsApp unavailable: [WHATSAPP NUMBER]</span></span><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary min-h-10 px-3">Book a free call <ArrowUpRight size={13} /></a></div>
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
    { title: "INDUSTRIES", links: pages.filter((p) => p.group === "Industries") },
    { title: "COMPANY", links: pages.filter((p) => ["Company", "Start here", "Enterprise", "Legal"].includes(p.group) && p.path !== "/our-work/client-slug") },
  ];
  return <footer className="bg-[#081020] px-5 pb-7 pt-12 text-white sm:px-8 sm:pt-16">
    <div className="adx-container">
      <div className="grid gap-9 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_repeat(4,1fr)]">
         <div><img src="/__mockup/images/adx-logo.png" alt="Arrington Digital" className="h-12 w-32 object-contain object-left" /><p className="mt-4 max-w-[260px] text-sm font-medium">Build Smarter. Market Better. Scale Further.</p><p className="mt-3 max-w-[260px] text-xs leading-5 text-white/55">Cloud, security, data and digital experience for organizations in the U.S. and Jamaica.</p></div>
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

function CTA({ title = "Tell us what you’re building.", copy = "A new initiative, platform refresh or digital experience—we’ll map the right scope and next steps on a free 20-minute call." }: { title?: string; copy?: string }) {
  return <section className="bg-[#E8621A] px-5 py-14 text-white sm:px-8 sm:py-16"><div className="adx-container flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><Eyebrow light>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2 className="mt-5 max-w-[670px] text-4xl font-medium leading-[1.03] tracking-[-.055em] sm:text-6xl">{title}</h2><p className="mt-4 max-w-[550px] text-sm leading-6 text-white/85">{copy}</p></div><div className="shrink-0"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[54px] px-6">Book a free call <ArrowUpRight size={16} /></a><div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/85"><a className="inline-flex items-center gap-2" href={`mailto:${EMAIL}`}><Mail size={13} />{EMAIL}</a><span>[JAMAICA PHONE NUMBER]</span></div></div></div></section>;
}

function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const scenes = [
    { number: "01", title: "ADx in motion", source: "TEAM" },
    { number: "02", title: "Hospitality & Tourism", source: "HOSPITALITY" },
    { number: "03", title: "Pharmaceutical & Life Sciences", source: "LIFE SCIENCES" },
    { number: "04", title: "Manufacturing", source: "PRODUCTION" },
    { number: "05", title: "Cloud, Security & Data", source: "TECHNOLOGY" },
  ];
  const [activeScene, setActiveScene] = useState(0);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(query.matches);
    query.addEventListener("change", updateMotionPreference);
    return () => query.removeEventListener("change", updateMotionPreference);
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!reducedMotion) video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => video.pause();
  }, [reducedMotion]);
  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { try { await video.play(); setPlaying(true); } catch { setPlaying(false); } }
    else { video.pause(); setPlaying(false); }
  };
  const updateScene = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (video.paused && video.currentTime < 0.15) return;
    if (video.currentTime >= video.duration - 0.12) {
      video.currentTime = 0;
      setActiveScene(0);
      return;
    }
    const next = Math.min(scenes.length - 1, Math.floor((video.currentTime / video.duration) * scenes.length));
    if (next !== activeScene) setActiveScene(next);
  };
  const selectScene = async (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 10;
    video.currentTime = Math.min(duration - 0.12, (duration / scenes.length) * index);
    setActiveScene(index);
    if (video.paused) { try { await video.play(); setPlaying(true); } catch { setPlaying(false); } }
  };
  const stepsFor = steps;
  return <>
    <section id="home" className="px-3 pb-5 pt-3 sm:px-6 sm:pt-6">
      <div className="mx-auto grid max-w-[1520px] overflow-hidden border border-[#081020]/15 bg-[#1552C2] lg:grid-cols-[.92fr_1.08fr]">
        <div className="relative order-1 flex min-h-[510px] flex-col justify-between overflow-hidden bg-[#E8621A] px-6 py-7 text-white sm:px-10 sm:py-10 lg:order-1 lg:min-h-[690px] lg:px-12 lg:py-12">
          <div className="adx-hero-kicker relative flex items-center justify-between gap-4 border-b border-white/30 pb-4">
            <Eyebrow light>U.S. + JAMAICA <span className="text-white/50">/</span> TECHNOLOGY + DIGITAL EXPERIENCE</Eyebrow>
            <span className="adx-mono shrink-0 text-[9px] tracking-[.12em] text-white/60">01—04</span>
          </div>
          <div className="relative py-10 lg:py-12">
            <p className="adx-mono mb-5 text-[9px] tracking-[.16em] text-white/70">CLOUD · CYBERSECURITY · DATA + AI · DIGITAL EXPERIENCE</p>
            <h1 className="adx-reveal max-w-[650px] text-[clamp(2.9rem,6vw,5.8rem)] font-medium leading-[.95] tracking-[-.075em]"><span className="text-[#081020]">Build</span> Smarter.<br /><span className="text-[#FBFAF9]">Market</span> Better.<br /><span className="text-[#092B68]">Scale</span> Further.</h1>
            <p className="adx-reveal adx-delay-1 mt-6 max-w-[500px] text-[15px] leading-7 text-white/85 sm:text-[16px]">Arrington Digital brings cloud and infrastructure, cybersecurity and compliance, data and AI, and marketing and digital experience together for organizations in the U.S. and Jamaica.</p>
            <div className="adx-reveal adx-delay-2 mt-7 flex flex-col gap-3 min-[430px]:flex-row">
              <a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[50px] px-5">Book a free call <ArrowUpRight size={15} /></a>
              <a href="/what-we-do" onClick={(e) => { e.preventDefault(); navigate("/what-we-do"); }} className="adx-action min-h-[50px] border border-white/55 px-5 text-white hover:border-white hover:bg-white/10">Explore what we do <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/25 pt-4">
            <span className="adx-mono text-[9px] tracking-[.13em] text-white/75"><MapPin size={12} className="mr-2 inline text-[#F2ECE8]" />PENNSYLVANIA · KINGSTON</span>
            <span className="text-[11px] text-white/70">One connected team.</span>
          </div>
        </div>
        <div className="relative order-2 min-h-[290px] overflow-hidden bg-[#081020] sm:min-h-[400px] lg:order-2 lg:min-h-[690px]">
          <video ref={videoRef} className="adx-video" src="/__mockup/videos/adx-hero-reel.mp4" poster="/__mockup/images/adx-hero-poster.jpg" muted autoPlay={!reducedMotion} playsInline preload="auto" aria-label="Illustrative montage of the ADx team, hospitality, life sciences, manufacturing, and technology" onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 0; }} onCanPlay={() => { if (!reducedMotion) videoRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }} onTimeUpdate={updateScene} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
          {!playing && <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-start justify-start px-4 pt-16 sm:items-center sm:justify-center sm:px-6 sm:pb-20 sm:pt-16">
            <div className="flex items-center gap-3 sm:gap-8">
              <div className="relative h-14 w-14 shrink-0 border border-white/20 sm:h-32 sm:w-32">
                <div className="absolute inset-2 border border-[#E8621A] sm:inset-5" />
                <div className="absolute inset-4 bg-[#1552C2] sm:inset-10" />
                <div className="absolute bottom-2 right-2 h-4 w-4 bg-[#E8621A] sm:bottom-5 sm:right-5 sm:h-8 sm:w-8" />
              </div>
              <div>
                <p className="adx-mono text-[7px] tracking-[.14em] text-white/55 sm:text-[9px] sm:tracking-[.16em]">THE WORK, IN FIVE SCENES</p>
                <p className="mt-1 max-w-[220px] text-[15px] font-medium leading-[1.04] tracking-[-.045em] text-white sm:mt-2 sm:max-w-[260px] sm:text-3xl">Five frames.<br /><span className="text-[#F2ECE8]">One connected team.</span></p>
              </div>
            </div>
          </div>}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,32,.35),transparent_35%,rgba(8,16,32,.9))]" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3 sm:left-7 sm:right-7 sm:top-7">
            <span className="adx-mono text-[9px] tracking-[.15em] text-white/80">ADx, IN MOTION <span className="ml-2 text-[#E8621A]">/</span> {scenes[activeScene].source}</span>
            <button onClick={toggleVideo} aria-label={playing ? "Pause hero video" : "Play hero video"} aria-pressed={playing} className="inline-flex min-h-10 shrink-0 items-center gap-2 border border-white/55 bg-[#081020]/70 px-3 text-[10px] font-medium !text-white backdrop-blur-sm transition hover:bg-white/10">{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? "Pause" : "Play reel"}</button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12 sm:px-7 sm:pb-7">
            <div className="mb-4 flex items-end justify-between gap-4 text-white"><div><div className="adx-mono text-[9px] tracking-[.13em] text-white/55">IN FOCUS</div><h2 className="mt-1 text-xl font-medium leading-tight tracking-[-.045em] sm:text-3xl">{scenes[activeScene].title}</h2></div><span className="adx-mono shrink-0 text-[10px] text-white/55">0{activeScene + 1} / 05</span></div>
            <div className="grid grid-cols-5 border-t border-white/30">
              {scenes.map((scene, index) => <button key={scene.number} type="button" onClick={() => void selectScene(index)} aria-current={activeScene === index ? "step" : undefined} className="group min-h-[57px] border-r border-white/20 px-2 pt-3 text-left last:border-r-0 sm:px-3">
                 <span className={`adx-mono block text-[9px] tracking-[.1em] ${activeScene === index ? "text-[#E8621A]" : "text-white/45"}`}>{scene.number} <span className="text-white/30">/</span> 05</span>
                 <span className="mt-1 block text-[9px] font-medium leading-[1.25] text-white/80 transition group-hover:text-white sm:text-xs">{scene.title}</span>
              </button>)}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-x-5 gap-y-1 px-3 pt-2 text-[9px] leading-4 text-[#081020]/50 sm:px-6">
        <span>Illustrative industry footage—not a client endorsement or a named property.</span>
        <span className="shrink-0">Muted · 5-scene loop</span>
      </div>
    </section>

    <section aria-label="Tools we work with" className="border-y border-[#081020]/10 bg-[#F2ECE8]"><div className="adx-container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="adx-mono text-[9px] tracking-[.15em] text-[#081020]/50">TOOLS WE BUILD ON</div><p className="mt-1 text-sm text-[#081020]/70">A connected toolkit, chosen for the job—not another stack to manage.</p></div><SiteLink to="/tools" onNavigate={navigate} className="adx-text-link">See every tool we use <ArrowUpRight size={14} /></SiteLink></div></section>

    <section id="steps" className="adx-section adx-container">
      <div className="grid gap-6 md:grid-cols-[1.05fr_.8fr] md:items-end"><div><Eyebrow>WHAT WE DO <span className="text-[#222]/35">/</span> FOUR CONNECTED CAPABILITIES</Eyebrow><h2 className="adx-heading">One partner across <span className="text-[#1552C2]">the systems and the story.</span></h2></div><p className="adx-copy max-w-[440px] md:justify-self-end">From secure infrastructure to useful digital experiences, ADx brings complementary teams of work together across U.S. and Jamaica markets.</p></div>
      <div className="mt-12 grid border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-4">{stepsFor.map(({ number, title, sub, copy, icon: Icon, links }) => <article key={number} className="group min-h-[306px] border-b border-[#081020]/15 py-6 pr-4 sm:px-4 lg:border-r lg:first:pl-0 lg:last:border-r-0"><div className="flex items-center justify-between"><span className="adx-mono text-[9px] tracking-[.13em] text-[#E8621A]">{number} <span className="text-[#081020]/30">/</span> {title}</span><span className="grid h-10 w-10 place-items-center border border-[#081020]/15 text-[#1552C2] transition group-hover:border-[#E8621A] group-hover:bg-[#E8621A] group-hover:text-white"><Icon size={17} /></span></div><h3 className="mt-7 text-[23px] font-medium leading-tight tracking-[-.04em]">{sub}</h3><p className="mt-3 min-h-[50px] max-w-[260px] text-sm leading-6 text-[#081020]/65">{copy}</p><div className="mt-5 space-y-1.5">{links.map(([link, path]) => <SiteLink key={link} to={path} onNavigate={navigate} className="flex min-h-7 w-fit items-center gap-2 text-xs font-medium text-[#081020]/75 hover:text-[#E8621A]">{link}<ArrowUpRight size={11} className="opacity-0 transition group-hover:opacity-100" /></SiteLink>)}</div></article>)}</div>
      <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-[#081020]/65">Start with one step or let us handle all four. Everything we build connects.</p><SiteLink to="/what-we-do" onNavigate={navigate} className="adx-text-link">See everything we do <ArrowRight size={14} /></SiteLink></div>
    </section>

      <section className="relative overflow-hidden bg-[#F2ECE8] py-16 sm:py-20"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 border border-[#1552C2]/15" /><div className="adx-container relative"><div className="grid gap-6 md:grid-cols-[1fr_.6fr] md:items-end"><div><Eyebrow>INDUSTRIES <span className="text-[#222]/35">/</span> U.S. + JAMAICA</Eyebrow><h2 className="adx-heading max-w-[700px]">Different worlds. Connected challenges.</h2></div><p className="adx-copy max-w-[370px] md:justify-self-end">Explore the industries ADx serves. The work meets each organization where it is.</p></div>
      <div className="mt-10 grid gap-0 border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-5">{[
        ["01","Pharmaceutical & Life Sciences","/industries/pharmaceutical-life-sciences","Complex systems. Clearer ways to connect."],
        ["02","Manufacturing","/industries/manufacturing","Infrastructure and insight for connected operations."],
        ["03","Hospitality & Tourism","/industries/hospitality-tourism","Thoughtful digital journeys for guests and teams."],
        ["04","Retail & CPG","/industries/retail-cpg","Digital experiences across products and channels."],
        ["05","Agriculture","/industries/agriculture","Digital foundations for a changing industry."],
      ].map(([number,title,path,copy])=><SiteLink key={path} to={path} onNavigate={navigate} className="group flex min-h-[236px] flex-col justify-between border-b border-[#081020]/15 py-5 pr-4 sm:px-4 lg:border-r lg:first:pl-0 lg:last:border-r-0"><div className="flex items-center justify-between"><span className="adx-mono text-[9px] tracking-[.13em] text-[#E8621A]">{number} / INDUSTRY</span><ArrowUpRight size={15} className="text-[#1552C2] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div><h3 className="text-[21px] font-medium leading-tight tracking-[-.04em]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#081020]/65">{copy}</p></div></SiteLink>)}</div>
      <div className="mt-5 flex flex-col gap-2 border-t border-[#081020]/15 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between"><span className="text-[#081020]/65">ADx serves other industries too.</span><SiteLink to="/who-we-help" onNavigate={navigate} className="adx-text-link">Explore industries <ArrowRight size={14} /></SiteLink></div>
    </div></section>

      <section className="bg-[#081020] py-16 text-white sm:py-24"><div className="adx-container grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><Eyebrow light>HOW WE WORK</Eyebrow><h2 className="mt-5 max-w-[470px] text-4xl font-medium leading-[1.04] tracking-[-.055em] sm:text-5xl">One connected view.<br /><span className="text-[#E8621A]">Clear next steps.</span></h2><p className="mt-6 max-w-[360px] text-sm leading-7 text-white/65">Technology and digital experience work better when they are considered together, around the needs of your organization.</p></div><div className="grid sm:grid-cols-2">{[["01","Start with the context","Understand the organization, the people and what needs to happen next."],["02","Shape the right scope","Map a focused approach to the work and agree on next steps."],["03","Build alongside your team","Coordinate work with the people who will use and support it."],["04","Support the transition","Test, hand over and continue to support what we build."]].map(([n,title,body])=><div key={n} className="border-t border-white/20 py-5 sm:px-5"><div className="adx-mono text-[10px] tracking-[.14em] text-[#E8621A]">{n}</div><h3 className="mt-3 text-lg font-medium">{title}</h3><p className="mt-2 max-w-[270px] text-sm leading-6 text-white/60">{body}</p></div>)}</div></div></section>

    <section className="adx-section adx-container"><div className="grid gap-9 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><Eyebrow>MEET VICKI ANN <span className="text-[#222]/35">/</span> ALWAYS ON</Eyebrow><h2 className="adx-heading max-w-[480px]">The front desk that never clocks out.</h2><p className="adx-copy mt-5 max-w-[450px]">Vicki Ann answers your phone, texts and website chat around the clock—taking reservations, answering guest questions and handing over when someone needs a person.</p><div className="mt-7 flex flex-wrap gap-3"><button disabled title="Demo destination needed: [DEMO NUMBER / CHAT]" className="adx-action cursor-not-allowed bg-[#081020] px-5 text-white/75">Try Vicki Ann <span className="text-[9px] text-white/55">[DEMO NUMBER / CHAT]</span></button><SiteLink to="/vicki-ann" onNavigate={navigate} className="adx-text-link px-2">Learn more <ArrowUpRight size={14} /></SiteLink></div><p className="adx-mono mt-7 text-[9px] tracking-[.14em] text-[#081020]/45">MADE FOR HOSPITALITY, NOT ANOTHER INBOX</p></div>
      <div className="relative border border-[#081020]/10 bg-[#F2ECE8] p-5 sm:p-8"><div className="mx-auto max-w-[470px] border border-[#081020]/10 bg-[#FBFAF9] p-5 sm:p-7"><div className="flex items-center justify-between border-b border-[#081020]/10 pb-4"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center bg-[#081020] text-white"><Sparkles size={16} /></div><div><div className="text-sm font-semibold">Vicki Ann</div><div className="text-[11px] text-[#081020]/55">Guest experience assistant</div></div></div><span className="flex items-center gap-2 text-[10px] text-[#245C37]"><span className="h-2 w-2 bg-[#4C9B60]" /> Illustrative</span></div><div className="mt-6 space-y-4 text-xs leading-5"><div className="max-w-[82%] border border-[#081020]/10 bg-[#F2ECE8] p-3.5">Good afternoon. How can I help with your stay?</div><div className="ml-auto max-w-[78%] bg-[#1552C2] p-3.5 text-white">Do you have a room with a sea view for Friday?</div><div className="max-w-[86%] border border-[#081020]/10 bg-[#F2ECE8] p-3.5">I can help with that. Let me check availability and connect you with the team.</div></div><div className="adx-mono mt-6 border-t border-[#081020]/10 pt-4 text-[9px] tracking-[.12em] text-[#081020]/45">ILLUSTRATIVE CONVERSATION</div></div><div className="mt-4 flex items-center gap-2 text-[10px] text-[#081020]/55"><CalendarDays size={13} className="text-[#E8621A]" /> Phone · text · web chat</div></div>
    </div></section>

    <section className="bg-[#F2ECE8] py-16 sm:py-20"><div className="adx-container"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><Eyebrow>START HERE <span className="text-[#222]/35">/</span> THREE WAYS IN</Eyebrow><h2 className="adx-heading">A good place to begin.</h2></div><p className="adx-copy max-w-[360px]">A clear starting point. We’ll shape the scope and quote around your property.</p></div><div className="mt-9 grid gap-0 border-t border-[#081020]/15 md:grid-cols-3">{[
      {id:"01",title:"Launch",label:"BRAND + WEBSITE",copy:"A clear identity, a custom website and the social set-up to open well.",path:"/packages"},
      {id:"02",title:"Grow",label:"ONGOING MARKETING",copy:"A steady rhythm of social, email, ads and reporting.",path:"/packages"},
      {id:"03",title:"Property tech",label:"NETWORK + ACCESS",copy:"A considered network plan, designed around the building and the people in it.",path:"/packages"},
    ].map((p)=><SiteLink to={p.path} onNavigate={navigate} key={p.id} className="group flex min-h-[225px] flex-col justify-between border-b border-[#081020]/15 py-5 pr-5 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"><div className="flex justify-between"><span className="adx-mono text-[9px] tracking-[.14em] text-[#E8621A]">{p.label}</span><span className="adx-mono text-[10px] text-[#081020]/45">{p.id}</span></div><div><h3 className="text-3xl font-medium tracking-[-.05em]">{p.title}</h3><p className="mt-2 max-w-[290px] text-sm leading-6 text-[#081020]/65">{p.copy}</p></div><div className="flex items-center justify-between border-t border-[#081020]/15 pt-4 text-xs font-semibold"><span>Custom quote</span><ArrowUpRight size={16} className="text-[#1552C2] transition group-hover:-translate-y-1 group-hover:translate-x-1" /></div></SiteLink>)}</div><p className="mt-4 text-xs text-[#081020]/55">Final scope and pricing are confirmed after a conversation. No prices have been supplied for this concept.</p></div></section>

      <section className="bg-[#F2ECE8] py-16 sm:py-20"><div className="adx-container"><Eyebrow>LOCAL CONTEXT, SHARED CAPABILITY</Eyebrow><div className="mt-5 grid gap-8 md:grid-cols-2"><article className="border-t-2 border-[#E8621A] pt-5"><div className="adx-mono text-[9px] tracking-[.15em] text-[#E8621A]">JAMAICA</div><h2 className="mt-3 text-3xl font-medium tracking-[-.05em]">Built with Jamaica in view.</h2><p className="mt-3 max-w-[480px] text-sm leading-6 text-[#081020]/65">Meet Arrington Digital Limited: Kingston roots, island-wide perspective, and local offers for hospitality, property and technology teams.</p><SiteLink to="/adx-jamaica" onNavigate={navigate} className="adx-text-link mt-4">Explore Arrington Digital Limited <ArrowRight size={14} /></SiteLink></article><article className="border-t-2 border-[#1552C2] pt-5"><div className="adx-mono text-[9px] tracking-[.15em] text-[#1552C2]">UNITED STATES</div><h2 className="mt-3 text-3xl font-medium tracking-[-.05em]">Enterprise work, clearly scoped.</h2><p className="mt-3 max-w-[480px] text-sm leading-6 text-[#081020]/65">Cloud and infrastructure, cybersecurity and compliance, data and AI, and software for organizations with complex needs.</p><SiteLink to="/enterprise" onNavigate={navigate} className="adx-text-link mt-4">Explore enterprise services <ArrowRight size={14} /></SiteLink></article></div></div></section>
    <CTA />
  </>;
}

function InteriorPage({ page, navigate }: { page: Page; navigate: (path: string) => void }) {
  const is404 = page.path === "/404";
  const isJamaica = page.path === "/adx-jamaica";
  const icon = page.group === "Connect" ? Wifi : page.group === "Run" ? Cpu : page.group === "Brand" ? PanelsTopLeft : page.group === "Grow" ? Megaphone : page.group === "Audiences" ? Hotel : page.group === "Enterprise" ? ShieldCheck : Globe2;
  const Icon = icon;
  const related = pages.filter((p) => p.group === page.group && p.path !== page.path && p.path !== "/our-work/client-slug").slice(0, 4);
  return <>
    <section className="relative overflow-hidden bg-[#081020] px-5 py-16 text-white sm:py-24"><div className="absolute inset-y-0 right-0 hidden w-[43%] border-l border-white/10 lg:block"><div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(21,82,194,.28),transparent_55%,rgba(232,98,26,.12))]" /><div className="absolute bottom-8 right-8 text-right"><div className="adx-mono text-[9px] tracking-[.15em] text-white/45">{isJamaica ? "ARRINGTON DIGITAL LIMITED" : "ARRINGTON DIGITAL"}</div><div className="mt-2 text-xs text-white/55">{isJamaica ? "KINGSTON · JAMAICA" : "UNITED STATES · JAMAICA"}</div></div></div>
      <div className="adx-container relative"><nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[11px] text-white/55"><a href="/" onClick={(e) => {e.preventDefault();navigate("/")}}>Home</a><span>/</span><span className="text-white/85">{page.title}</span></nav><div className="max-w-[760px]"><Eyebrow light>{isJamaica ? "LOCAL COMPANY" : page.group.toUpperCase()} <span className="text-white/35">/</span> {isJamaica ? "JAMAICA" : "ARRINGTON DIGITAL"}</Eyebrow><div className="mt-8 flex items-center gap-4"><span className="grid h-12 w-12 place-items-center border border-white/25 text-[#E8621A]"><Icon size={20} /></span><span className="adx-mono text-[9px] tracking-[.14em] text-white/45">{isJamaica ? "KINGSTON · ISLAND-WIDE" : "UNITED STATES & JAMAICA"}</span></div><h1 className="mt-6 text-[clamp(2.7rem,7vw,5.6rem)] font-medium leading-[.96] tracking-[-.07em]">{isJamaica ? "Rooted in Jamaica." : page.intro || page.title}</h1>{isJamaica && <p className="mt-4 text-xl text-white/80">Arrington Digital Limited</p>}{page.intro && page.title !== page.intro && !isJamaica && <p className="mt-4 text-xl text-white/80">{page.title}</p>}<p className="mt-6 max-w-[650px] text-[15px] leading-7 text-white/75">{page.description}</p><div className="mt-8 flex flex-wrap gap-3"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary">Book a free call <ArrowUpRight size={15} /></a><a href="#details" className="adx-action adx-action-ghost">Explore this page <ArrowDown size={15} /></a></div></div></div></section>
    {isJamaica && <section className="bg-[#E8621A] px-5 py-12 text-white sm:py-16"><div className="adx-container grid gap-9 md:grid-cols-[.8fr_1.2fr] md:items-start"><div><Eyebrow light>ARRINGTON DIGITAL LIMITED</Eyebrow><h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-5xl">Local context.<br />Connected capability.</h2><p className="mt-5 max-w-[380px] text-sm leading-6 text-white/85">A Jamaica-specific home for local service details, locations and offers—distinct from the broader Arrington Digital story.</p><div className="mt-7 border-t border-white/35 pt-4"><div className="adx-mono text-[9px] tracking-[.14em] text-white/70">KINGSTON OFFICE</div><p className="mt-2 text-sm">Level 9, 60 Knutsford Blvd<br />Kingston, Jamaica</p><p className="mt-3 text-sm">Island-wide work</p></div></div><div className="grid gap-0 border-t border-white/35 sm:grid-cols-2">{[
      ["01","Property networks & engineering","Wifi, cabling, gate access, cameras and smart locks for developments and renovations.","/adx-propertyengineering"],
      ["02","Hospitality operations","ADx Surge for payroll, scheduling, hiring and property operations.","/adx-surge"],
      ["03","Guest experience","Vicki Ann, a 24/7 front desk assistant for phone, text, WhatsApp and web chat.","/vicki-ann"],
      ["04","Brand & digital growth","Websites, identity, social media, email, ads and search.","/what-we-do"],
    ].map(([number,title,copy,path])=><SiteLink key={path} to={path} onNavigate={navigate} className="group border-b border-white/35 py-5 sm:px-5"><span className="adx-mono text-[9px] tracking-[.13em] text-white/70">{number} / JAMAICA OFFER</span><h3 className="mt-3 text-xl font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-white/80">{copy}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold">Explore <ArrowRight size={13} /></span></SiteLink>)}</div></div></section>}
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
    document.title = page.title === "Home" ? "Arrington Digital | Technology & Digital Experience" : page.path === "/adx-jamaica" ? "Arrington Digital Limited | Jamaica" : `${page.title} | Arrington Digital`;
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
