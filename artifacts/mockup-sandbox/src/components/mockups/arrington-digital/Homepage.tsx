import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Wifi, Cpu, PanelsTopLeft,
  Megaphone, Sparkles, CalendarDays, Mail, MapPin, ArrowUp, MessageCircle,
} from "lucide-react";
import "./_group.css";

const CAL = "https://cal.com/arringtondx-info/introduction-call";
const steps = [
  { n: "01", name: "CONNECT", title: "Get your property online.", body: "The dependable network behind every room, gate and guest experience.", icon: Wifi, links: ["Property wifi & networks", "Gate access & cameras", "Smart locks"] },
  { n: "02", name: "RUN", title: "Run it with less effort.", body: "Practical software that takes admin off your team’s plate.", icon: Cpu, links: ["ADx Surge", "Vicki Ann, your 24/7 front desk", "Custom software & apps"] },
  { n: "03", name: "BRAND", title: "Look the part.", body: "A distinct identity and a website made to turn a look into an enquiry.", icon: PanelsTopLeft, links: ["Brand kits & identity", "Custom websites", "Photo, video & 360 tours"] },
  { n: "04", name: "GROW", title: "Fill rooms, tables and units.", body: "Stay visible, follow up and give the right people a reason to book.", icon: Megaphone, links: ["Social media", "Email marketing", "Ads & search"] },
];
const audiences = [
  { no: "01", name: "Resorts & hotels", line: "Keep the guest experience connected from arrival to checkout.", tag: "HOSPITALITY", image: "/__mockup/images/jamaica-hospitality-hero.jpg", imagePos: "center 43%" },
  { no: "02", name: "Villas & real estate", line: "Turn overseas enquiries into owners, even while you sleep.", tag: "PROPERTY", image: "/__mockup/images/jamaica-villa.jpg", imagePos: "center 55%" },
  { no: "03", name: "Restaurants & bars", line: "Make every service run smoother, from the first shift to the last.", tag: "FOOD & DRINK", image: "/__mockup/images/jamaica-restaurant.jpg", imagePos: "center 60%" },
  { no: "04", name: "Attractions & excursions", line: "Bring the right guests to the experience they came for.", tag: "EXPERIENCES", image: "/__mockup/images/jamaica-excursion.jpg", imagePos: "center 40%" },
];
const packages = [
  { id: "01", title: "Launch", copy: "A clear identity, a custom website and the social set-up to open well.", label: "BRAND + WEBSITE" },
  { id: "02", title: "Grow", copy: "A steady rhythm of social, email, ads and reporting.", label: "ONGOING MARKETING" },
  { id: "03", title: "Property tech", copy: "A considered network plan, designed around the building and the people in it.", label: "NETWORK + ACCESS" },
];

function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <div className={`adx-mono flex items-center gap-3 text-[10px] font-medium tracking-[.16em] ${inverse ? "text-white/55" : "text-[#1552C2]"}`}><span className={`h-px w-6 ${inverse ? "bg-[#E8621A]" : "bg-[#E8621A]"}`} />{children}</div>;
}

export function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [top, setTop] = useState(true);
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY < 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const closeMenus = () => { setMenuOpen(false); setActiveMenu(""); };

  return (
    <main className="adx-home min-h-[100dvh] overflow-hidden">
      <header className={`sticky top-0 z-50 border-b border-[#081020]/[.07] transition-colors ${top ? "bg-[#FBFAF9]" : "bg-[#FBFAF9]/95 backdrop-blur-xl"}`}>
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#home" aria-label="Arrington Digital home" onClick={closeMenus} className="flex h-12 w-[74px] items-center sm:w-[103px]">
            <img src="/__mockup/images/adx-logo.png" alt="Arrington Digital" className="h-12 w-full object-contain" />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {["What we do", "Who we help", "Our software", "Company"].map((item) => (
              <button key={item} onClick={() => setActiveMenu(activeMenu === item ? "" : item)} className={`min-h-11 text-[13px] font-medium transition-colors hover:text-[#E8621A] ${activeMenu === item ? "text-[#E8621A]" : "text-[#081020]"}`} aria-expanded={activeMenu === item}>{item}<span className="ml-1 text-[10px]">⌄</span></button>
            ))}
            <a href="/our-work" className="flex min-h-11 items-center text-[13px] font-medium transition-colors hover:text-[#E8621A]">Our work</a>
            <a href="#packages" className="flex min-h-11 items-center text-[13px] font-medium transition-colors hover:text-[#E8621A]">Packages</a>
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button type="button" disabled title="WhatsApp contact: [WHATSAPP NUMBER]" aria-label="WhatsApp us [WHATSAPP NUMBER]" className="grid h-9 w-9 place-items-center rounded-full border border-[#081020]/15 text-[10px] font-medium text-[#081020]/60 sm:flex sm:h-11 sm:w-auto sm:items-center sm:gap-2 sm:px-4 sm:text-[12px]">
              <MessageCircle size={17} /><span className="hidden xl:inline">WhatsApp us <span className="text-[9px] text-[#081020]/45">[WHATSAPP NUMBER]</span></span>
            </button>
            <a href={CAL} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#E8621A] px-3 text-[11px] font-semibold text-white transition hover:bg-[#c94f11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8621A] sm:min-h-11 sm:gap-2 sm:px-5 sm:text-[12px]">Book a free call <ArrowUpRight size={14} /></a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border border-[#081020]/15 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {activeMenu && <div className="absolute left-0 right-0 top-full hidden border-y border-[#081020]/10 bg-[#FBFAF9] px-8 py-7 shadow-lg lg:block">
          <div className="mx-auto grid max-w-6xl grid-cols-4 gap-8">
            {(activeMenu === "What we do" ? steps : activeMenu === "Who we help" ? audiences.map((a, i) => ({ n: a.no, name: a.tag, title: a.name, body: a.line, links: [a.name] })) : activeMenu === "Our software" ? [
              { n: "01", name: "ADx SURGE", title: "Keep operations moving.", body: "Payroll, scheduling, hiring and property management.", links: ["ADx Surge"] },
              { n: "02", name: "VICKI ANN", title: "A front desk that never clocks out.", body: "Guest calls and questions answered around the clock.", links: ["Vicki Ann"] },
              { n: "03", name: "ADx LAUNCHIQ", title: "Bring complex launches together.", body: "A practical platform for large, multi-team launches.", links: ["ADx LaunchIQ"] },
              { n: "04", name: "ENTERPRISE", title: "Cloud, security & data.", body: "A dedicated route for larger organisations.", links: ["Enterprise"] },
            ] : [
              { n: "01", name: "OUR STORY", title: "Rooted in Jamaica.", body: "Meet the people and principles behind ADx.", links: ["About", "ADx Jamaica"] },
              { n: "02", name: "GET STARTED", title: "A good place to begin.", body: "Explore our packages or talk through your plans.", links: ["Packages", "Contact"] },
              { n: "03", name: "HOW WE WORK", title: "Clear steps. One team.", body: "See what happens from first call to handover.", links: ["How we work"] },
              { n: "04", name: "TOOLS", title: "The systems we work with.", body: "Explore the technology behind the work.", links: ["Tools we work with"] },
            ]).map((col) => <div key={col.n}><div className="adx-mono mb-3 text-[10px] tracking-[.15em] text-[#E8621A]">{col.name}</div><p className="mb-2 text-lg font-semibold">{col.title}</p><p className="mb-4 max-w-[220px] text-sm leading-6 text-[#081020]/65">{col.body}</p><a href="#steps" onClick={closeMenus} className="text-xs font-semibold text-[#1552C2]">Explore <ArrowRight className="ml-1 inline" size={13} /></a></div>)}
          </div>
          <div className="mx-auto mt-7 max-w-6xl border-t border-[#081020]/10 pt-4 text-xs text-[#081020]/60">Looking for a larger technology partner? <a href="#enterprise" onClick={closeMenus} className="font-semibold text-[#1552C2]">See enterprise services <ArrowRight className="inline" size={12} /></a></div>
        </div>}
        {menuOpen && <div className="absolute left-0 right-0 top-full max-h-[calc(100dvh-76px)] overflow-auto border-t border-[#081020]/10 bg-[#FBFAF9] p-5 shadow-xl lg:hidden">
          <div className="mb-4 flex items-center justify-between"><span className="text-xs text-[#081020]/50">Jamaica · Pennsylvania</span><a href={CAL} target="_blank" rel="noreferrer" className="flex min-h-11 items-center rounded-full bg-[#E8621A] px-4 text-sm font-semibold text-white">Book a free call</a></div>
          {["What we do", "Who we help", "Our software", "Company"].map((item) => <button onClick={() => setActiveMenu(activeMenu === item ? "" : item)} key={item} className="flex min-h-12 w-full items-center justify-between border-b border-[#081020]/10 text-left font-medium">{item}<span>{activeMenu === item ? "−" : "+"}</span></button>)}
          {activeMenu && <div className="grid grid-cols-2 gap-2 pt-3">{(activeMenu === "Who we help" ? audiences.map(x => x.name) : activeMenu === "Our software" ? ["ADx Surge", "Vicki Ann", "ADx LaunchIQ", "Enterprise"] : activeMenu === "Company" ? ["About", "ADx Jamaica", "Our work", "Packages", "How we work", "Contact"] : ["Connect", "Run", "Brand", "Grow", "Enterprise"]).map((item) => <a key={item} href="#steps" onClick={closeMenus} className="flex min-h-11 items-center rounded-xl bg-[#F2ECE8] px-3 text-sm">{item}<ArrowUpRight className="ml-auto" size={14} /></a>)}</div>}
        </div>}
      </header>

      <section id="home" className="mx-auto max-w-[1440px] px-4 pb-8 pt-5 sm:px-8 sm:pt-8 lg:px-12">
        <div className="relative min-h-[640px] overflow-hidden rounded-[24px] bg-[#081020] md:min-h-[680px]">
          <img src="/__mockup/images/jamaica-hospitality-hero.jpg" alt="Sunlit modern resort architecture on Jamaica's coast" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081020]/90 via-[#081020]/65 to-[#081020]/5 md:from-[#081020]/85 md:via-[#081020]/48 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081020]/45 via-transparent to-[#081020]/10" />
          <div className="relative flex min-h-[640px] flex-col justify-between px-6 py-8 text-white sm:px-10 sm:py-10 md:min-h-[680px] md:px-16 md:py-14 lg:px-[9%]">
            <div className="adx-reveal flex items-center justify-between">
              <Eyebrow inverse>TECHNOLOGY & MARKETING <span className="text-white/35">/</span> KINGSTON & PENNSYLVANIA</Eyebrow>
              <div className="adx-mono hidden text-[10px] tracking-[.12em] text-white/65 sm:block">JAMAICA, BUILT FOR WHAT’S NEXT <span className="ml-2 text-[#E8621A]">●</span></div>
            </div>
            <div className="max-w-[790px] pb-6 pt-14 md:pb-10">
              <p className="adx-mono mb-5 text-[10px] tracking-[.18em] text-white/65">ARRINGTON DIGITAL <span className="mx-2 text-[#E8621A]">—</span> YOUR ONE-TEAM PARTNER</p>
              <h1 className="adx-reveal adx-delay-1 max-w-[780px] text-[clamp(2.8rem,7.4vw,6.4rem)] font-medium leading-[.98] tracking-[-.065em]">Build Smarter.<br />Market Better.<br /><span className="text-[#F2ECE8]">Scale Further.</span></h1>
              <p className="adx-reveal adx-delay-2 mt-7 max-w-[600px] text-[15px] leading-[1.75] text-white/85 sm:text-[17px]">We build the technology and marketing behind Jamaica’s resorts, villas, restaurants and developments—from the wifi in the walls to the website, the brand, and the guests it brings in. One team, start to finish.</p>
              <div className="mt-8 flex flex-col gap-3 min-[430px]:flex-row">
                <a href={CAL} target="_blank" rel="noreferrer" className="group flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#E8621A] px-7 text-sm font-semibold text-white transition hover:bg-[#c94f11]">Book a free call <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
                <a href="#steps" className="flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/45 bg-white/[.08] px-7 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15">See what we do <ArrowDown size={15} /></a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-xs text-white/70"><MapPin size={14} className="text-[#E8621A]" /> Kingston, Jamaica <span className="text-white/30">·</span> Working island-wide</div>
            </div>
            <div className="flex items-end justify-between border-t border-white/25 pt-4">
              <div className="adx-mono text-[9px] tracking-[.16em] text-white/55">FROM THE WALLS TO THE BOOKINGS</div>
              <a href="#steps" className="grid h-10 w-10 place-items-center rounded-full border border-white/40 transition hover:bg-white/10" aria-label="Scroll to what we do"><ArrowDown size={16} /></a>
            </div>
          </div>
          <div className="absolute bottom-[20%] right-[5%] hidden max-w-[190px] rounded-2xl border border-white/30 bg-[#081020]/40 p-4 text-white backdrop-blur-md lg:block">
            <div className="adx-mono text-[9px] tracking-[.15em] text-[#F2ECE8]/65">ONE TEAM. START TO FINISH.</div><div className="mt-2 text-sm leading-5">Technology and marketing, connected.</div>
          </div>
        </div>
      </section>

      <section aria-label="The tools we work with" className="border-y border-[#081020]/10 bg-[#FBFAF9]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div><div className="adx-mono text-[9px] tracking-[.17em] text-[#081020]/45">BUILT WITH THE RIGHT TOOLS</div><p className="mt-1 text-sm text-[#081020]/70">A connected toolkit, chosen for the job—not another stack to manage.</p></div>
          <a href="/tools" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1552C2]">Tools we build on <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
        </div>
      </section>

      <section id="steps" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div><Eyebrow>WHAT WE DO <span className="text-[#222]/35">/</span> FOUR CONNECTED STEPS</Eyebrow><h2 className="mt-5 max-w-[590px] text-4xl font-medium leading-[1.05] tracking-[-.055em] sm:text-5xl">Everything your property needs, <span className="text-[#1552C2]">from the walls to the bookings.</span></h2></div>
          <p className="max-w-[440px] text-[15px] leading-7 text-[#222]/70 md:justify-self-end">No need to juggle a wifi company, a web designer and a marketing agency. Start with one step—or bring it all under one team.</p>
        </div>
        <div className="mt-12 grid border-t border-[#081020]/15 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, name, title, body, icon: Icon, links }, i) => <motion.article key={n} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: i * .08, duration: .5 }} className={`group min-h-[320px] border-b border-[#081020]/15 py-7 pr-5 md:border-r md:px-5 md:first:pl-0 lg:min-h-[350px] lg:py-8 ${i === 3 ? "md:border-r-0" : ""}`}>
            <div className="flex items-center justify-between"><span className="adx-mono text-[10px] tracking-[.16em] text-[#E8621A]">{n} <span className="text-[#081020]/25">/</span> {name}</span><span className="grid h-10 w-10 place-items-center rounded-full bg-[#F2ECE8] text-[#1552C2] transition duration-300 group-hover:-rotate-6 group-hover:bg-[#081020] group-hover:text-white"><Icon size={18} /></span></div>
            <h3 className="mt-8 text-[24px] font-medium leading-tight tracking-[-.04em]">{title}</h3><p className="mt-3 min-h-[50px] max-w-[260px] text-sm leading-6 text-[#222]/65">{body}</p>
            <ul className="mt-6 space-y-2.5">{links.map((link) => <li key={link}><a href={link.includes("Surge") ? "/adx-surge" : link.includes("Vicki") ? "/vicki-ann" : link.includes("software") ? "/custom-software" : "#what-we-do"} className="group/link inline-flex min-h-7 items-center gap-2 text-xs font-medium text-[#081020]/75 transition hover:text-[#E8621A]">{link}<ArrowUpRight className="opacity-0 transition group-hover/link:opacity-100" size={12} /></a></li>)}</ul>
          </motion.article>)}
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-[#222]/70">Start with one step or let us handle all four. Everything we build connects.</p><a href="/what-we-do" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1552C2]">See everything we do <ArrowRight size={15} /></a></div>
      </section>

      <section className="bg-[#F2ECE8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 md:grid-cols-[1fr_.6fr] md:items-end"><div><Eyebrow>WHO WE HELP <span className="text-[#222]/35">/</span> JAMAICA FIRST</Eyebrow><h2 className="mt-5 max-w-[680px] text-4xl font-medium leading-[1.05] tracking-[-.055em] sm:text-5xl">Built for the businesses that keep Jamaica moving.</h2></div><p className="max-w-[360px] text-sm leading-6 text-[#222]/70 md:justify-self-end">Hospitality and property first. Enterprise technology is here too, one click deeper.</p></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => <a href={["/who-we-help/resorts-hotels", "/who-we-help/villas-real-estate", "/who-we-help/restaurants-bars", "/who-we-help/attractions-excursions"][i]} key={a.no} className="group relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-[18px] bg-[#081020] p-5 text-white sm:min-h-[360px] sm:p-6">
              <div className="absolute inset-0 opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-80"><img src={a.image} alt="" loading="lazy" style={{ objectPosition: a.imagePos }} className="h-full w-full object-cover" /></div><div className={`absolute inset-0 ${i === 1 ? "bg-gradient-to-t from-[#081020]/95 via-[#081020]/25 to-[#1552C2]/15" : i === 2 ? "bg-gradient-to-t from-[#081020]/95 via-[#081020]/30 to-[#E8621A]/20" : "bg-gradient-to-t from-[#081020]/95 via-[#081020]/25 to-[#081020]/5"}`} />
              <div className="relative flex items-center justify-between"><span className="adx-mono text-[9px] tracking-[.16em] text-white/70">{a.tag}</span><span className="adx-mono text-[10px] text-white/55">{a.no}</span></div>
              <div className="relative"><h3 className="text-[23px] font-medium leading-tight tracking-[-.04em]">{a.name}</h3><p className="mt-2 max-w-[250px] text-sm leading-6 text-white/75">{a.line}</p><div className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 transition group-hover:border-[#E8621A] group-hover:bg-[#E8621A]"><ArrowUpRight size={16} /></div></div>
            </a>)}
          </div>
          <a href="/enterprise" className="group mt-6 flex min-h-[58px] flex-col justify-center gap-2 border-t border-[#081020]/15 pt-4 text-sm text-[#081020]/70 sm:flex-row sm:items-center sm:justify-between sm:pt-3">Larger organisation? We also work with pharma, manufacturing, retail and education.<span className="font-semibold text-[#1552C2]">See enterprise cloud, security & data <ArrowRight className="ml-1 inline transition-transform group-hover:translate-x-1" size={14} /></span></a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#081020] py-20 text-white sm:py-28">
        <div className="absolute -right-24 -top-28 h-[380px] w-[380px] rounded-full border border-white/[.07]" /><div className="absolute -right-6 -top-10 h-[250px] w-[250px] rounded-full border border-white/[.08]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[.8fr_1.2fr] md:items-center lg:px-12">
          <div><Eyebrow inverse>WHY ONE TEAM</Eyebrow><h2 className="mt-5 max-w-[460px] text-4xl font-medium leading-[1.04] tracking-[-.055em] sm:text-5xl">One team.<br />One contract.<br /><span className="text-[#E8621A]">One number to call.</span></h2><p className="mt-6 max-w-[360px] text-sm leading-7 text-white/65">Good work happens when the people building your technology and your marketing talk to each other.</p></div>
          <div className="grid sm:grid-cols-2">
            {[
              ["01", "One point of contact", "No chasing the wifi company, web designer and marketing agency separately."],
              ["02", "Local team, international standards", "Based in Kingston, working across Jamaica and with clients in the U.S."],
              ["03", "We stay after launch", "Ongoing care for the things we build, not a goodbye at handover."],
              ["04", "You own what we build", "Your website, your data and your accounts stay yours."],
            ].map(([n, title, copy]) => <div key={n} className="border-t border-white/20 py-5 sm:px-5 sm:first:pl-0 sm:nth-[2]:pr-0"><div className="adx-mono text-[10px] tracking-[.15em] text-[#E8621A]">{n}</div><h3 className="mt-3 text-lg font-medium">{title}</h3><p className="mt-2 max-w-[250px] text-sm leading-6 text-white/60">{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
        <div className="flex flex-col justify-between"><div><Eyebrow>MEET VICKI ANN <span className="text-[#222]/35">/</span> ALWAYS ON</Eyebrow><h2 className="mt-5 max-w-[470px] text-4xl font-medium leading-[1.04] tracking-[-.055em] sm:text-5xl">The front desk that never clocks out.</h2><p className="mt-5 max-w-[410px] text-[15px] leading-7 text-[#222]/70">Vicki Ann answers your phone, texts and website chat around the clock—taking reservations, answering guest questions and handing over when someone needs a person.</p><div className="mt-7 flex flex-wrap items-center gap-3"><button type="button" disabled title="Demo destination needed" className="inline-flex min-h-12 items-center rounded-full bg-[#081020] px-5 text-sm font-semibold text-white/80">Try Vicki Ann <span className="ml-2 text-[9px] font-medium text-white/55">[DEMO NUMBER / CHAT]</span></button><a href="/vicki-ann" className="inline-flex min-h-12 items-center gap-2 px-3 text-sm font-semibold text-[#1552C2]">Learn more <ArrowUpRight size={15} /></a></div></div><p className="adx-mono mt-8 text-[9px] tracking-[.16em] text-[#081020]/45">MADE FOR HOSPITALITY, NOT ANOTHER INBOX</p></div>
        <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[22px] bg-[#F2ECE8] p-6 sm:min-h-[470px]">
          <div className="absolute left-[-50px] top-[-90px] h-64 w-64 rounded-full bg-[#E8621A]/10 blur-2xl" /><div className="absolute bottom-[-110px] right-[-35px] h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-2xl" />
          <div className="relative w-full max-w-[440px] rounded-[22px] border border-[#081020]/10 bg-[#FBFAF9] p-5 shadow-[0_20px_60px_rgba(8,16,32,.10)] sm:p-7">
            <div className="flex items-center justify-between border-b border-[#081020]/10 pb-4"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#081020] text-white"><Sparkles size={17} /></div><div><div className="text-sm font-semibold">Vicki Ann</div><div className="mt-0.5 text-[11px] text-[#081020]/55">Guest experience assistant</div></div></div><span className="flex items-center gap-1.5 rounded-full bg-[#E9F3E9] px-2.5 py-1 text-[10px] font-medium text-[#245C37]"><span className="h-1.5 w-1.5 rounded-full bg-[#4C9B60]" /> Ready</span></div>
            <div className="mt-6 space-y-4"><div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[#F2ECE8] p-3.5 text-xs leading-5">Good afternoon. How can I help with your stay?</div><div className="ml-auto max-w-[76%] rounded-2xl rounded-tr-sm bg-[#1552C2] p-3.5 text-xs leading-5 text-white">Do you have a room with a sea view for Friday?</div><div className="max-w-[84%] rounded-2xl rounded-tl-sm bg-[#F2ECE8] p-3.5 text-xs leading-5">I can help with that. Let me check availability and connect you with the team.</div></div>
            <div className="adx-mono mt-6 border-t border-[#081020]/10 pt-4 text-[9px] tracking-[.12em] text-[#081020]/45">ILLUSTRATIVE CONVERSATION</div>
          </div>
          <div className="absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-[#081020]/10 bg-[#FBFAF9]/80 px-3 py-2 text-[10px] text-[#081020]/65 sm:flex"><CalendarDays size={13} className="text-[#E8621A]" /> Phone · text · web chat</div>
        </div>
      </section>

      <section id="packages" className="bg-[#FBFAF9] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><Eyebrow>START HERE <span className="text-[#222]/35">/</span> THREE WAYS IN</Eyebrow><h2 className="mt-5 text-4xl font-medium tracking-[-.055em] sm:text-5xl">A good place to begin.</h2></div><p className="max-w-[340px] text-sm leading-6 text-[#222]/65">A clear starting point. We’ll shape the scope and quote around your property.</p></div>
          <div className="mt-9 grid gap-3 md:grid-cols-3">
            {packages.map((p, i) => <a href="/packages" key={p.id} className={`group flex min-h-[250px] flex-col justify-between rounded-[18px] p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${i === 1 ? "bg-[#1552C2] text-white" : i === 2 ? "bg-[#F2ECE8] text-[#081020]" : "bg-[#081020] text-white"}`}>
              <div className="flex items-center justify-between"><span className="adx-mono text-[9px] tracking-[.17em] opacity-65">{p.label}</span><span className="adx-mono text-[10px] opacity-60">{p.id}</span></div>
              <div><h3 className="text-3xl font-medium tracking-[-.045em]">{p.title}</h3><p className="mt-2 max-w-[290px] text-sm leading-6 opacity-75">{p.copy}</p></div>
              <div className="flex items-center justify-between border-t border-current/20 pt-4 text-xs font-semibold"><span>Custom quote</span><span className="grid h-9 w-9 place-items-center rounded-full border border-current/35 transition group-hover:bg-[#E8621A] group-hover:text-white group-hover:border-[#E8621A]"><ArrowUpRight size={15} /></span></div>
            </a>)}
          </div>
          <p className="mt-4 text-xs text-[#081020]/50">Final scope and pricing are confirmed after a conversation. No surprises.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-9 px-5 py-20 sm:px-8 sm:py-24 md:grid-cols-[.7fr_1.3fr] md:items-center lg:px-12">
        <div className="relative mx-auto w-full max-w-[360px]"><div className="aspect-[4/5] overflow-hidden rounded-[18px] bg-[#F2ECE8]"><img src="/__mockup/images/jamaica-hospitality-hero.jpg" alt="Sunlight falls across a Jamaican resort veranda" loading="lazy" className="h-full w-full object-cover object-[65%_center]" /></div><div className="absolute -bottom-4 -right-3 max-w-[190px] rounded-xl bg-[#E8621A] p-4 text-white sm:-right-7"><div className="adx-mono text-[9px] tracking-[.16em] text-white/70">ROOTED HERE</div><p className="mt-2 text-sm font-medium leading-5">Building something to bring home.</p></div></div>
        <div className="md:pl-8"><Eyebrow>A NOTE FROM OUR FOUNDER</Eyebrow><h2 className="mt-5 max-w-[620px] text-4xl font-medium leading-[1.05] tracking-[-.055em] sm:text-5xl">Good technology should feel close to home.</h2><p className="mt-6 max-w-[600px] text-[15px] leading-7 text-[#222]/70">Jamaica is home. The people building its next chapter deserve technology and marketing partners who understand the place, the pace and the ambition. That’s why we’re building a team here—and creating room for young Jamaicans to do meaningful work.</p><p className="mt-6 text-sm font-semibold">Alexia Fulton <span className="ml-2 font-normal text-[#081020]/55">Founder, Arrington Digital</span></p><a href="/adx-jamaica" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1552C2]">Our story in Jamaica <ArrowRight size={15} /></a></div>
      </section>

      <section id="enterprise" className="border-y border-[#081020]/10 bg-[#F2ECE8]/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div><Eyebrow>ALSO SERVING ENTERPRISE</Eyebrow><p className="mt-2 text-base font-medium">Cloud, security, data and software for complex organisations.</p><p className="mt-1 text-sm text-[#081020]/60">A dedicated route for pharma, manufacturing, retail and education teams.</p></div><a href="/enterprise" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1552C2]">Explore enterprise services <ArrowUpRight size={15} /></a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#E8621A] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12">
        <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border border-white/20" /><div className="absolute -right-4 -top-12 h-56 w-56 rounded-full border border-white/20" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div><div className="adx-mono flex items-center gap-3 text-[10px] tracking-[.16em] text-white/75"><span className="h-px w-6 bg-white/75" /> YOUR NEXT CHAPTER STARTS HERE</div><h2 className="mt-5 max-w-[650px] text-4xl font-medium leading-[1.04] tracking-[-.055em] sm:text-6xl">Tell us what you’re building.</h2><p className="mt-4 max-w-[500px] text-sm leading-6 text-white/85">A new development, a resort refresh, a restaurant opening—we’ll map out what you need and what it costs on a free 20-minute call.</p></div>
          <div className="shrink-0"><a href={CAL} target="_blank" rel="noreferrer" className="group inline-flex min-h-[54px] items-center gap-4 rounded-full bg-[#081020] px-7 text-sm font-semibold text-white transition hover:bg-white hover:text-[#081020]">Book a free call <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80"><a className="inline-flex items-center gap-2 hover:text-white" href="mailto:info@arringtondx.com"><Mail size={13} /> info@arringtondx.com</a><span>[JAMAICA PHONE NUMBER]</span></div></div>
        </div>
      </section>

      <footer className="bg-[#081020] px-5 pb-8 pt-12 text-white sm:px-8 sm:pt-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
            <div><img src="/__mockup/images/adx-logo.png" alt="Arrington Digital" className="h-14 w-32 object-contain object-left" /><p className="mt-3 max-w-[260px] text-sm leading-6 text-white/65">Build Smarter. Market Better. Scale Further.</p><p className="mt-4 max-w-[280px] text-xs leading-5 text-white/45">Technology and marketing for Jamaica’s hospitality and property businesses. One team, start to finish.</p></div>
            <div><div className="adx-mono mb-4 text-[9px] tracking-[.16em] text-white/45">WHAT WE DO</div><div className="space-y-2 text-xs text-white/70"><a href="/adx-propertyengineering" className="block hover:text-white">Connect · Property networks</a><a href="/adx-surge" className="block hover:text-white">Run · ADx Surge</a><a href="/vicki-ann" className="block hover:text-white">Run · Vicki Ann</a><a href="/brand-identity" className="block hover:text-white">Brand identity</a><a href="/websites" className="block hover:text-white">Websites</a><a href="/digital-marketing" className="block hover:text-white">Grow · Marketing</a></div></div>
            <div><div className="adx-mono mb-4 text-[9px] tracking-[.16em] text-white/45">WHO WE HELP</div><div className="space-y-2 text-xs text-white/70">{audiences.map((a, i) => <a key={a.no} href={["/who-we-help/resorts-hotels", "/who-we-help/villas-real-estate", "/who-we-help/restaurants-bars", "/who-we-help/attractions-excursions"][i]} className="block hover:text-white">{a.name}</a>)}<a href="/enterprise" className="block hover:text-white">Enterprise</a></div></div>
            <div><div className="adx-mono mb-4 text-[9px] tracking-[.16em] text-white/45">SOFTWARE</div><div className="space-y-2 text-xs text-white/70"><a href="/adx-surge" className="block hover:text-white">ADx Surge</a><a href="/vicki-ann" className="block hover:text-white">Vicki Ann</a><a href="/adx-launchiq" className="block hover:text-white">ADx LaunchIQ</a><a href="/custom-software" className="block hover:text-white">Custom software</a></div></div>
            <div><div className="adx-mono mb-4 text-[9px] tracking-[.16em] text-white/45">COMPANY</div><div className="space-y-2 text-xs text-white/70"><a href="/about" className="block hover:text-white">About</a><a href="/adx-jamaica" className="block hover:text-white">ADx Jamaica</a><a href="/our-work" className="block hover:text-white">Our work</a><a href="/packages" className="block hover:text-white">Packages</a><a href="/how-we-work" className="block hover:text-white">How we work</a><a href="/tools" className="block hover:text-white">Tools we work with</a><a href="/careers" className="block hover:text-white">Careers</a><a href="/contact" className="block hover:text-white">Contact</a></div></div>
          </div>
          <div className="flex flex-col gap-5 py-7 text-xs text-white/55 sm:flex-row sm:items-start sm:justify-between"><div><p>Level 9, 60 Knutsford Blvd, Kingston, Jamaica <span className="mx-2 text-white/25">·</span> Pennsylvania, USA</p><a href="mailto:info@arringtondx.com" className="mt-2 inline-block text-white/75 hover:text-white">info@arringtondx.com</a><p className="mt-1 text-white/45">[JAMAICA PHONE NUMBER]</p></div><span className="text-white/45">LinkedIn · Instagram</span></div>
          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:flex-row sm:justify-between"><span>© 2026 Arrington Digital. All rights reserved.</span><span>Contracting entity is stated in your engagement agreement.</span><a href="/legal/privacy" className="w-fit hover:text-white/70">Privacy & terms</a></div>
        </div>
      </footer>
      {!top && <a href="#home" aria-label="Back to top" className="fixed bottom-4 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#081020] text-white shadow-lg transition hover:bg-[#1552C2] sm:bottom-6 sm:right-6"><ArrowUp size={17} /></a>}
    </main>
  );
}
