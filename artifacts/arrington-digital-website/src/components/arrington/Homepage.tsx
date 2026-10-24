import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
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
const legacyPaths: Record<string, string> = {
  "/legal/privacy": "/legal/privacy-policy",
  "/legal/terms": "/legal/terms-of-service",
  "/start-a-conversation": "/contact",
  "/who-we-help": "/404",
};
const resolveLegacyPath = (path: string) => legacyPaths[path] || path;

const industryDirectory = [
  { number: "01", title: "Pharmaceutical & Life Sciences", path: "/industries/pharmaceutical-life-sciences", blurb: "Bring secure systems, launch workstreams and critical decisions into one clearer operating view." },
  { number: "02", title: "Manufacturing", path: "/industries/manufacturing", blurb: "Connect sites, production information, security and customer-facing digital work." },
  { number: "03", title: "Retail & CPG", path: "/industries/retail-cpg", blurb: "Make product stories, customer journeys and marketing systems work together." },
  { number: "04", title: "Education", path: "/industries/education", blurb: "Support campus operations, communications and digital experiences across teams." },
  { number: "05", title: "Resorts, Hotels, Villas & Real Estate", path: "/who-we-help/resorts-hotels-villas-real-estate", blurb: "Connect property discovery, guest experience and day-to-day operations across places and portfolios." },
  { number: "06", title: "Restaurants & Bars", path: "/who-we-help/restaurants-bars", blurb: "Support the rhythm of service with useful digital experiences and connected operations." },
  { number: "07", title: "Attractions & Excursions", path: "/who-we-help/attractions-excursions", blurb: "Link discovery, booking details, guest communication and staff workflows." },
];

const pages: Page[] = [
  { title: "Home", path: "/", group: "Home", description: "Cloud, cybersecurity, data and AI, and digital experience for organizations in the U.S. and Jamaica.", intro: "Build Smarter. Market Better. Scale Further." },
  { title: "What We Do", path: "/what-we-do", group: "Services", description: "Four connected capabilities: cloud and infrastructure, cybersecurity and compliance, data and AI, and marketing and digital experience.", points: ["Cloud & Infrastructure — resilient foundations for the work ahead.", "Cybersecurity & Compliance — protect systems, people and information.", "Data & AI — make data more useful and put AI to work thoughtfully.", "Marketing & Digital Experience — create clear, useful experiences across channels."] },
  { title: "Property Network Engineering", path: "/adx-propertyengineering", group: "Connect", description: "Property-wide connectivity and security infrastructure, planned with owners, architects and contractors before installation.", intro: "From Building to Bandwidth.", points: ["Structured cabling and fiber backbone", "Guest, staff and operations Wi-Fi", "Resilient internet and network failover", "Access control, smart locks and gate entry", "CCTV, monitoring and centralized management", "UPS planning, testing and documented handoff"] },
  { title: "ADX Surge", path: "/adx-surge", group: "Products", description: "One multi-location platform for payroll, time, scheduling, hiring, compliance, property operations, CRM, journeys and finance—with point of sale on the roadmap.", intro: "One platform. Every location. Every country.", points: ["Payroll, time and timesheets across locations", "Scheduling, hiring and mobile onboarding", "Compliance and benefits by jurisdiction", "Multi-property operations and unit management", "Guest CRM, segments and automated journeys", "Finance and general ledger; point of sale is on the roadmap"] },
  { title: "Custom Software & Apps", path: "/custom-software", group: "Run", description: "Product strategy, architecture and custom software for customer-facing experiences and the internal work behind them.", points: ["Product discovery, requirements and technical specifications", "Architecture, prototypes and delivery roadmaps", "Booking portals with inventory, enquiries and payment flows", "Guest, owner and employee applications", "Integrations that connect existing systems and teams"] },
  { title: "ADX LaunchIQ", path: "/adx-launchiq", group: "Products", description: "Decision intelligence for pharmaceutical launches—connecting readiness, dependencies, risk and downstream business impact through Nimble’s cognitive digital twin.", intro: "Move from launch tracking to launch intelligence.", points: ["Continuous readiness across ten launch workstreams", "Dependency-aware risk and impact analysis", "Scenario simulation for launch decisions", "Executive command center, decision register and launch workspace", "Integrates with existing enterprise systems"] },
  { title: "Vicki Ann", path: "/vicki-ann", group: "Products", description: "An always-on hospitality AI front desk across phone, text, WhatsApp and web chat—handling reservations, FAQs and guest changes, with a contextual handoff to staff.", intro: "The front desk that never clocks out.", points: ["Books, confirms and reschedules reservations and waitlists", "Answers location-specific questions in the property’s brand voice", "Handles guest-requested changes and cancellations", "Creates or updates the guest’s Surge CRM record", "Escalates to staff with conversation history attached"] },
  { title: "Websites", path: "/websites", group: "Brand", description: "Fast, custom websites that make a brand easy to understand and make the next step easy to take.", points: ["Brand-led pages and flexible CMS structures", "Property, room, floor-plan and availability libraries", "Booking, enquiry, brochure and lead-capture flows", "360 tours, maps and useful location details", "Technical SEO, answer-engine readiness and CRM connections"] },
  { title: "Brand Identity & Brand Kits", path: "/brand-identity", group: "Brand", description: "A practical identity system that gives every customer touchpoint the same clear point of view.", points: ["Positioning and brand direction", "Logo, typography, color and image system", "Digital and campaign templates", "Practical usage files for internal teams and partners"] },
  { title: "Social Media & Content", path: "/social-media", group: "Grow", description: "A reliable content system that gives each channel a reason to exist and each campaign a clear audience.", points: ["Content pillars and channel planning", "Campaign concepts, photography and short-form video", "Publishing, community response and approvals", "Creative testing and performance reviews"] },
  { title: "Email Marketing & CRM", path: "/email-marketing", group: "Grow", description: "Turn first enquiries into well-timed, personal follow-up across buyer, guest and customer journeys.", points: ["CRM setup, fields, permissions and segmentation", "Lead qualification, assignment and follow-up", "Pre-arrival, post-visit and re-engagement journeys", "Campaign reporting tied to meaningful actions"] },
  { title: "Ads & Search", path: "/digital-marketing", group: "Grow", description: "Search, paid media and conversion work built around the people you need to reach and the action you want next.", points: ["Paid search and social campaign planning", "SEO, answer-engine optimization and local visibility", "Direct-booking and lead-generation campaigns", "Landing pages, conversion tracking and reporting"] },
  { title: "Arrington Digital, LLC - USA", path: "/adx-usa", group: "Company", description: "A U.S. home for connected technology and marketing, with a Pennsylvania presence and teams working across both markets.", intro: "Technology and growth, connected for U.S. organizations.", points: ["Pennsylvania, USA", "Pharmaceutical & Life Sciences, Manufacturing, Retail & CPG and Education", "Cloud, security, data, software and digital experience"] },
  { title: "Arrington Digital Limited - Jamaica", path: "/adx-jamaica", group: "Company", description: "The Jamaica-specific home for Arrington Digital Limited’s services, locations, industries and local context.", points: ["Kingston, Montego Bay, Ocho Rios, Negril, Mandeville and island-wide coverage", "Hospitality & Tourism, Financial Services and Government Modernization", "Local technology, security, data and marketing services"] },
  { title: "Pharmaceutical & Life Sciences", path: "/industries/pharmaceutical-life-sciences", group: "Industries", description: "Secure digital foundations and decision support for complex pharmaceutical and life sciences work.", points: ["Cloud infrastructure and security foundations", "Launch readiness, workstream dependencies and risk visibility", "Data platforms and applied AI with human decision-making in view", "Digital experiences and marketing operations"] },
  { title: "Manufacturing", path: "/industries/manufacturing", group: "Industries", description: "Practical technology and digital systems for production teams, operators and customers.", points: ["Connected infrastructure for distributed sites", "Security, identity and resilient access", "Data and software that make operating information more useful", "Digital presence and customer journeys for industrial brands"] },
  { title: "Hospitality & Tourism", path: "/industries/hospitality-tourism", group: "Industries", description: "Connected booking, property operations and guest experiences for hospitality teams in both markets.", points: ["Custom websites, booking flows and direct-booking campaigns", "Property networks, Wi-Fi, access control and security", "ADX Surge for staffing, operations and guest records", "Vicki Ann for guest questions, reservations and handoffs"] },
  { title: "Retail & CPG", path: "/industries/retail-cpg", group: "Industries", description: "Digital foundations and campaigns that connect products, customers and the people who serve them.", points: ["Product and brand experiences across channels", "Secure cloud, data and operational workflows", "Search, paid media and lifecycle marketing", "Customer relationship systems and performance measurement"] },
  { title: "Education", path: "/industries/education", group: "Industries", description: "Technology and digital experiences that help education teams connect campus operations, communications and people.", points: ["Cloud and network foundations for distributed teams", "Secure access to systems and information", "Digital experiences for students, families and staff", "Data and workflow improvements across departments"] },
  { title: "Contact", path: "/contact", group: "Company", description: "Talk through a new initiative, digital experience or systems challenge. Schedule a conversation or email the team.", points: ["Schedule a conversation", EMAIL, "Level 9, 60 Knutsford Blvd, Kingston, Jamaica", "Pennsylvania, USA"] },
  { title: "Resorts, Hotels, Villas & Real Estate", path: "/who-we-help/resorts-hotels-villas-real-estate", group: "Audiences", description: "Connect property discovery, booking, guest experience and ongoing operations in one connected view.", points: ["Property websites, room and unit pages, and enquiry or booking flows", "Guest Wi-Fi, network resilience, access and security", "ADX Surge for staffing, scheduling and property operations", "Vicki Ann for guest questions, reservations and staff handoff"] },
  { title: "Restaurants & Bars", path: "/who-we-help/restaurants-bars", group: "Audiences", description: "Support the pace of service with the operating tools, digital presence and follow-up that fit a hospitality team.", points: ["Menus, hours, events and reservation-ready websites", "Social campaigns and local search visibility", "ADX Surge for scheduling, payroll and team operations", "Guest Wi-Fi and connected property infrastructure"] },
  { title: "Attractions & Excursions", path: "/who-we-help/attractions-excursions", group: "Audiences", description: "Move visitors from discovery to confirmed experience while giving staff a clearer view of each day’s operation.", points: ["Mobile-first tour pages, availability and booking enquiries", "Online payment flows and clear trip information", "Guest CRM, confirmations and useful follow-up", "Staff scheduling and operational tools"] },
  { title: "Enterprise: Cloud, Security & Data", path: "/enterprise", group: "Enterprise", description: "Cloud, security, data, AI and software services for complex organizations across industries in the U.S. and Jamaica.", points: ["Cloud strategy, infrastructure and modernization", "Cybersecurity, identity and compliance support", "Data platforms, analytics and applied AI", "Product engineering and enterprise integrations", "SOC 2, HIPAA, GDPR, FDIC and FedRAMP are addressed only in this enterprise context."] },
  { title: "Our Work", path: "/our-work", group: "Company", description: "Case studies will be shared here once client permission and approved project details are available.", points: ["No case studies are published in this concept until approved."] },
  { title: "Case study template", path: "/our-work/client-slug", group: "Company", description: "A case-study structure reserved for future approved project details.", points: ["Client, location and project details are not published.", "This template is intentionally hidden from proof claims until approved."] },
  { title: "Tools We Work With", path: "/tools", group: "Company", description: "A connected toolkit, chosen for the job—not another stack to manage.", points: ["Framer", "HubSpot", "Salesforce", "AWS", "Microsoft Azure", "Google Cloud", "Snowflake", "Databricks"] },
  { title: "How We Work", path: "/how-we-work", group: "Company", description: "Clear steps from the first conversation to handover and ongoing care.", points: ["Understand the property and the people using it.", "Map the right scope and agree next steps.", "Build alongside your team and contractors.", "Test, hand over and continue to support what we build."] },
  { title: "About", path: "/about", group: "Company", description: "Meet the team behind ADX and the people bringing technology and marketing together.", points: ["One team to call across the work.", "Technology and marketing that connect.", "No unverified metrics or partner claims are included in this concept."] },
  { title: "Careers", path: "/careers", group: "Company", description: "Technology is moving fast, as are the expectations of the enterprises that depend on it. We build and manage the infrastructure, security, data and marketing systems that drive real business outcomes. To do it, we need people who are sharp, accountable and ready to do serious work.", intro: "Build something that actually matters.", points: ["Remote-first work built on autonomy, trust and performance.", "When a role opens, it is because the work demands it.", `Send your résumé to ${EMAIL}; strong candidates stay on file.`] },
  { title: "Privacy Policy", path: "/legal/privacy-policy", group: "Legal", description: "How Arrington Digital handles personal information across its website, software, services and communications." },
  { title: "Terms of Service", path: "/legal/terms-of-service", group: "Legal", description: "The business terms that apply when you use Arrington Digital’s website, software or services." },
  { title: "Insights", path: "/insights", group: "Company", description: "Ideas on hospitality, property technology and marketing from the ADX team.", points: ["Articles will appear here as they are published.", "No placeholder statistics or client claims are included."] },
  { title: "404", path: "/404", group: "Help", description: "That page could not be found. Explore the services, industries and tools available across the site.", points: ["Go to What We Do", "Browse industries", "Search the site"] },
];

const RESORT_VIDEO = "https://videos.pexels.com/video-files/33246936/14164738_1920_1080_30fps.mp4";
const RESTAURANT_VIDEO = "https://videos.pexels.com/video-files/19905887/19905887-uhd_2560_1440_24fps.mp4";
const JAMAICA_VIDEO = "https://videos.pexels.com/video-files/37177254/15748984_2560_1440_24fps.mp4";
type HeroScene = { number: string; title: string; tag: string; segment?: number; src?: string; poster?: string };
const pageVisuals: Record<string, { src: string; alt: string; label: string }> = {
  "/what-we-do": { src: "/__mockup/images/arrington-digital-what-we-do.jpg", alt: "Colleagues reviewing a project together around a table", label: "CONNECTED CAPABILITIES" },
  "/enterprise": { src: "/__mockup/images/arrington-digital-enterprise-cloud.jpg", alt: "Illuminated server infrastructure in a modern data center", label: "CLOUD + SECURITY" },
  "/adx-propertyengineering": { src: "/__mockup/images/arrington-digital-property-engineering.jpg", alt: "A network engineer working with structured cabling and infrastructure", label: "PROPERTY NETWORKS" },
  "/custom-software": { src: "/__mockup/images/arrington-digital-software-dev.jpg", alt: "Software developers collaborating at a laptop", label: "PRODUCT + SOFTWARE" },
  "/websites": { src: "/__mockup/images/arrington-digital-website-design.jpg", alt: "A laptop displaying a digital experience in a modern workspace", label: "WEB + DIGITAL EXPERIENCE" },
  "/brand-identity": { src: "/__mockup/images/arrington-digital-brand-design.jpg", alt: "A designer building a visual identity at a studio desk", label: "BRAND SYSTEMS" },
  "/social-media": { src: "/__mockup/images/arrington-digital-social-creator.jpg", alt: "A content creator recording a short-form video on a phone", label: "CONTENT + CAMPAIGN" },
  "/email-marketing": { src: "/__mockup/images/arrington-digital-email-analytics.jpg", alt: "A marketing analytics dashboard open on a laptop", label: "CRM + LIFECYCLE" },
  "/digital-marketing": { src: "/__mockup/images/arrington-digital-marketing-team.jpg", alt: "A marketing team planning a campaign with charts and laptops", label: "SEARCH + CAMPAIGN" },
  "/industries/pharmaceutical-life-sciences": { src: "/__mockup/images/arrington-digital-industry-pharma.jpg", alt: "A life sciences researcher working in a precise laboratory", label: "LIFE SCIENCES" },
  "/industries/manufacturing": { src: "/__mockup/images/arrington-digital-industry-manufacturing.jpg", alt: "A production operator working beside industrial equipment", label: "MANUFACTURING" },
  "/industries/hospitality-tourism": { src: "/__mockup/images/arrington-digital-industry-hospitality.jpg", alt: "A hospitality team preparing a thoughtful guest experience", label: "HOSPITALITY + TOURISM" },
  "/industries/retail-cpg": { src: "/__mockup/images/arrington-digital-industry-retail.jpg", alt: "Product shelves and customer experiences in a retail setting", label: "RETAIL + CPG" },
  "/industries/education": { src: "/__mockup/images/arrington-digital-education-campus.jpg", alt: "Students collaborating on a university campus", label: "EDUCATION" },
  "/who-we-help/resorts-hotels-villas-real-estate": { src: "/__mockup/images/arrington-digital-pool-villa.jpg", alt: "A contemporary villa overlooking the coast with an infinity pool", label: "PROPERTY + GUEST EXPERIENCE" },
  "/who-we-help/restaurants-bars": { src: "/__mockup/images/arrington-digital-restaurant-service.jpg", alt: "A restaurant team serving a customer at the counter", label: "RESTAURANTS + BARS" },
  "/who-we-help/attractions-excursions": { src: "/__mockup/images/arrington-digital-excursion-boat.jpg", alt: "Visitors setting out on a guided boat excursion", label: "ATTRACTIONS + EXCURSIONS" },
  "/our-work": { src: "/__mockup/images/arrington-digital-contact-team.jpg", alt: "Business partners reviewing a project together", label: "WORK IN PRACTICE" },
  "/tools": { src: "/__mockup/images/arrington-digital-tools-stack.jpg", alt: "Network infrastructure and technical equipment", label: "TOOLS + SYSTEMS" },
  "/how-we-work": { src: "/__mockup/images/arrington-digital-process-meeting.jpg", alt: "A team mapping a project plan in a working session", label: "HOW WE WORK" },
  "/careers": { src: "/__mockup/images/arrington-digital-team-collaboration.jpg", alt: "The Arrington Digital team working together", label: "JOIN THE TEAM" },
  "/insights": { src: "/__mockup/images/arrington-digital-insights-report.jpg", alt: "A professional reviewing a business report on a laptop", label: "IDEAS + PRACTICE" },
  "/contact": { src: "/__mockup/images/arrington-digital-careers-team.jpg", alt: "Arrington Digital colleagues collaborating around a table", label: "TALK WITH ADX" },
  "/legal/privacy-policy": { src: "/__mockup/images/arrington-digital-privacy-security.jpg", alt: "A laptop in a secure modern workspace", label: "PRIVACY + TRUST" },
  "/legal/terms-of-service": { src: "/__mockup/images/arrington-digital-terms-contract.jpg", alt: "A business professional reviewing an agreement", label: "TERMS OF SERVICE" },
};
const jamaicaPhotoStories = [
  { number: "01", title: "Resorts, Hotels, Villas & Real Estate", tag: "PROPERTY + GUEST EXPERIENCE", path: "/who-we-help/resorts-hotels-villas-real-estate", src: "/__mockup/images/jamaica-villa.jpg", alt: "A Jamaican villa framed by tropical landscaping", blurb: "Connect property discovery, guest communication and on-site operations." },
  { number: "02", title: "Restaurants & Bars", tag: "OPERATIONS + GROWTH", path: "/who-we-help/restaurants-bars", src: "/__mockup/images/jamaica-restaurant.jpg", alt: "A Jamaican restaurant ready for guests", blurb: "Give guests a clear path from discovery to a great service experience." },
  { number: "03", title: "Attractions & Excursions", tag: "BOOKING + OPERATIONS", path: "/who-we-help/attractions-excursions", src: "/__mockup/images/jamaica-excursion.jpg", alt: "Visitors exploring Jamaica on a guided excursion", blurb: "Make trip details, booking questions and staff coordination easier to find." },
];
const teamMembers = [
  { name: "Stephanie Betancourt, PMP®, LSSBB", role: "VP of Business Operations", src: "/__mockup/images/arrington-digital-team-stephanie.png" },
  { name: "Ian Payne", role: "VP of Business Dev. & Strategic Growth", src: "/__mockup/images/arrington-digital-team-ian.png" },
  { name: "Carlton Harris", role: "VP of Technological Innovation", src: "/__mockup/images/arrington-digital-team-carlton.jpg" },
  { name: "Micheaux Spencer", role: "VP of Digital Experience", src: "/__mockup/images/arrington-digital-team-micheaux.jpg" },
  { name: "Jamal Williams", role: "VP of Client Services", src: "/__mockup/images/arrington-digital-team-jamal.png" },
];
const employeeStories = [
  {
    name: "Vaisha R.",
    role: "Digital Marketing Coordinator",
    src: "/__mockup/images/arrington-digital-employee-vaisha.jpg",
    alt: "Vaisha R., Digital Marketing Coordinator",
    quote: "I came in as an intern with experience across content, research, and campaign execution — but I never expected to be trusted with real strategy this early. ADX pushed me to connect all of it into something bigger. Now as a Coordinator, I'm not just executing tasks — I'm building campaigns, digging into analytics, shaping brand positioning, and learning what it actually takes to grow a brand at scale. This is the kind of environment where your ambition is matched, not managed.",
  },
  {
    name: "Najee P.",
    role: "Digital Strategist",
    src: "/__mockup/images/arrington-digital-employee-najee.jpg",
    alt: "Najee P., Digital Strategist",
    quote: "My background sits at the intersection of graphic design, visual storytelling, and brand strategy — and for a long time, that breadth felt like it needed to be explained. Some environments want specialists; I was building visual identities one week and executing digital campaigns the next. ADX is the first place where that range isn't something to justify — it's a competitive advantage. The clients we serve need a consistent, strategic visual presence that holds up across every touchpoint, and building that kind of cohesion is exactly the challenge I came here to solve.",
  },
];

type LegalSection = { title: string; body: string[] };

const privacyPolicySections: LegalSection[] = [
  {
    title: "Who we are and what this policy covers",
    body: [
      "Arrington Digital protects the personal information it handles and never sells it. This Privacy Policy explains what we collect, why we collect it, who we share it with and the choices you have.",
        "“Arrington Digital,” “ADX,” “we,” “us” and “our” mean B.Arren, LLC. DBA/ Arrington Digital, headquartered in Pennsylvania, USA, and its affiliate Arrington Digital Ltd., 60 Knutsford Boulevard, Kingston, Jamaica.",
      "This policy applies to arringtondx.com; our software, including Surge (with the Vicki Ann AI agent), LaunchIQ and other applications, APIs and AI agents; our cloud, data, AI, cybersecurity, marketing, managed services and property network engineering; and communications by email, phone, SMS, web chat, WhatsApp and social media.",
      "When you visit our website, contact us or apply for a job, we are the controller of your information. When a business customer uses our Platform or services to process data about its own employees, applicants, guests or customers, that customer is the controller and we act as its processor or service provider under its documented instructions. If you are connected to a client, contact that business first to exercise your rights.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "We collect only what we need to run the website, deliver the Platform and services, and meet legal obligations.",
      "Contact and business details: name, job title, company, email, phone, country and messages you send when booking a call or contacting us.",
      "Account and user data: login email, username, role, permissions, SSO identifiers, MFA settings and preferences. Customer content: files, records, prompts, chat transcripts, reservations, schedules and project data uploaded or generated in the Platform.",
      "Workforce data in Surge may include employee and applicant names, contact details, TRN, NIS, SSN or other tax IDs, pay rates, hours, timesheets, bank details for payroll, benefits elections, résumés and onboarding documents. Our business customer provides this data and we process it as its processor.",
      "Location data may include geo-fenced clock-in location when an employer enables it, and approximate location from IP address. Communications data may include phone numbers, WhatsApp or social profile names and IDs, message content, call recordings and transcripts, and delivery or read status.",
      "Billing data includes billing contacts, invoices and payment history. Card details are handled by our payment processor; we do not store full card numbers. Technical and usage data includes IP address, browser, device, operating system, pages visited, referring URL, feature usage, error logs and security logs. Job applicant data may include CVs, work history, references and interview notes.",
      "Some Platform features may process sensitive data, such as government ID numbers, bank details or, for certain clients, health-related information. We process it only as our customer instructs and as the law allows, with added safeguards. Please do not send sensitive information through the website or general messaging channels unless we ask for it.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "We use personal information to provide, host, configure and support the Platform and services; run payroll, scheduling, hiring, reservations and other customer-enabled features; respond to enquiries and book demos; operate AI features; secure systems, detect fraud and keep audit logs; analyse usage to fix bugs and improve features; send marketing with the required consent or lawful basis; bill customers and keep financial records; comply with law; and assess job applicants.",
      "Where GDPR, UK GDPR or Jamaica’s Data Protection Act applies, our legal basis may be contract performance, our customer’s instructions, legitimate interests, consent or legal obligation, depending on the purpose.",
      "We do not sell personal information, share it for cross-context behavioural advertising, or use customer content or workforce data for our own marketing.",
    ],
  },
  {
    title: "Artificial intelligence and large language models",
    body: [
      "Our software uses AI, including large language models, and we tell you when you are talking to an AI agent rather than a person. Examples include Vicki Ann answering calls, texts, web chat and WhatsApp; AI-ranked job candidates in Surge; readiness scoring and insights in LaunchIQ; and content, campaign, search, summarisation and custom AI features.",
      "We build our own software and may combine our models with providers of hosted LLMs on AWS, Google Cloud or Microsoft Azure, or direct model APIs. Relevant inputs, such as a guest message or prompt, are sent to the model provider to generate a response. Current AI sub-processors are available on request and in our DPA.",
      "We do not use customer content, workforce data or end-user conversations to train general-purpose AI models. We choose providers that contractually agree not to train on data we send them. We fine-tune on customer data only when that customer asks us in writing, and that model is used only for that customer.",
      "AI agents hand conversations to a person when a guest asks or the agent cannot help. Candidate rankings and scores assist human judgment; our customers—not AI—make hiring, pay and employment decisions. AI output can be incomplete or wrong; check it before relying on it for legal, medical, financial or safety decisions.",
      "AI agent conversations and calls may be recorded, transcribed and stored so a business can review them, resolve disputes and improve service. Where notice or consent is required, we or our customer provide it at the start of the call or chat.",
    ],
  },
  {
    title: "WhatsApp, Meta and other messaging and social platforms",
    body: [
      "When you message us or a customer through WhatsApp, Facebook Messenger, Instagram or another social platform, that platform and our software both process your messages. We connect to the WhatsApp Business Platform (Cloud API) and other Meta and social APIs on behalf of ourselves or business customers.",
      "We may receive your phone number, profile name, platform user ID, message content (including text, images, voice notes, documents or location you choose to share), timestamps, and delivery or read status. We use it to reply, complete what you asked, keep a business conversation history and meet platform requirements—not for unrelated purposes, sale or data brokerage.",
      "Business-initiated WhatsApp messages, such as confirmations, reminders or offers, are sent only to people who have opted in. Reply STOP or tell the agent you want to stop to end non-essential messages.",
      "Meta and other platforms process your data under their own terms and policies, including WhatsApp’s Privacy Policy and Meta’s Privacy Policy. We do not control their practices. We follow applicable business messaging, platform and developer terms, and delete platform data when it is no longer needed, when a user asks or when the platform requires it.",
      "To request deletion of platform data, email privacy@arringtondx.com with the phone number or account you used. We will delete associated messages and data within 30 days unless the law requires retention or a business customer controls the data; in that case, we will forward your request.",
    ],
  },
  {
    title: "Third-party integrations and sub-processors",
    body: [
      "We share personal information with vetted service providers under contracts that limit use to our instructions. Providers may include AWS, Google Cloud and Microsoft Azure for hosting; Snowflake, Databricks and Google BigQuery for data platforms; hosted model services and model APIs for AI; WhatsApp Business Platform, SMS and voice carriers and email providers for messaging; Salesforce, including Marketing Cloud and Agentforce, for CRM and marketing; Noyo, QuickBooks Online, Sage Intacct, Unanet, banks and payment processors for benefits, finance and payments; Cal.com and Framer for scheduling and our website; and logging, error-tracking and support tools for security and support.",
      "When you or your organization connect another app—such as payroll, accounting, CRM, calendar or social account—data flows as configured. The other service’s own terms and privacy policy govern its handling, and we are not responsible for its practices.",
      "We may also share information with affiliates, professional advisers, a buyer or successor in a merger or asset sale, and courts, regulators or law enforcement when the law requires it or to protect rights, safety or property. Customers may request a current sub-processor list in our DPA.",
    ],
  },
  {
    title: "International transfers, retention and security",
    body: [
      "We operate in the United States, Jamaica, the Caribbean, Latin America and Europe. Providers may process data in other countries. For transfers from the EU, UK, Jamaica or another region with transfer rules, we use safeguards such as the European Commission’s Standard Contractual Clauses, the UK International Data Transfer Addendum or another legally recognised mechanism.",
      "We keep information only as long as needed: website enquiries and sales contacts up to 3 years after our last interaction; customer content and workforce data for the contract term, then deleted or returned within 90 days unless instructed otherwise or law requires more; payroll, tax and financial records as employment and tax laws require (often 6–7 years); AI agent conversations and call recordings as configured by the customer or 12 months by default; security and audit logs up to 2 years; and our job applicant data up to 2 years after the hiring decision unless you ask us to delete it sooner.",
      "Safeguards include AES-256 encryption at rest, TLS encryption in transit, role-based access control, SSO and MFA, tamper-evident audit logs, network monitoring, vulnerability management and staff confidentiality obligations. No system is completely secure. We notify affected people, customers and regulators about a breach as the law requires.",
    ],
  },
  {
    title: "Your rights and choices",
    body: [
      "Depending on where you live, you may have the right to access, correct, delete or port personal information, and to object to or restrict how it is used. These rights may arise under Jamaica’s Data Protection Act, 2020; EU and UK GDPR; the California Consumer Privacy Act as amended by the CPRA; and other US state privacy laws.",
      "Email privacy@arringtondx.com to make a request. We verify identity and respond within the time required by law, usually 30–45 days. You may withdraw consent without affecting earlier processing, opt out of marketing using an unsubscribe link, replying STOP or emailing us, and appeal our response or complain to your local data protection authority.",
      "We will not treat you differently for exercising your rights. If we process information for a business customer, we will pass your request to that customer and assist it in responding.",
    ],
  },
  {
    title: "Cookies and similar technologies",
    body: [
      "Our website uses cookies and similar technologies to make the site work, remember preferences and understand how visitors use it. Where required, we ask for consent before setting non-essential cookies. You can change your choices in our cookie banner or block cookies in your browser; some features may then not work. We honour Global Privacy Control signals where the law requires.",
    ],
  },
  {
    title: "Children",
    body: [
      "Our website and Platform are intended for businesses and are not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this policy as our services, technology or the law change. We will post the new version here with a new effective date and, for material changes, notify customers by email or in the Platform before the changes take effect.",
    ],
  },
  {
    title: "Contact us",
    body: [
      "B.Arren, LLC. DBA/ Arrington Digital, Pennsylvania, USA, and Arrington Digital Ltd., 60 Knutsford Boulevard, Kingston, Jamaica.",
      "Privacy questions and requests: privacy@arringtondx.com. General enquiries: info@arringtondx.com.",
    ],
  },
];

const termsOfServiceSections: LegalSection[] = [
  {
    title: "Acceptance and who we are",
    body: [
      "By using arringtondx.com, our software or our services, you agree to these Terms. If you use them for an organization, you confirm you have authority to bind it; “you” then means that organization.",
      "These Terms are between you and B.Arren, LLC. DBA/ Arrington Digital (Pennsylvania, USA) or, where your order names it, Arrington Digital Ltd. (Kingston, Jamaica). They cover our website; our software, including Surge with Vicki Ann, LaunchIQ and other applications, APIs and AI agents (the Platform); and our professional and managed services (the Services).",
      "Most engagements are governed by a signed MSA, SOW, order form or DPA. If one conflicts with these Terms, the signed agreement controls. Our Privacy Policy explains how we handle personal information. The Platform and Services are for business use; you must be at least 18 and able to enter a binding contract.",
    ],
  },
  {
    title: "Accounts, acceptable use and your responsibilities",
    body: [
      "Keep login details confidential, use MFA where available, and tell security@arringtondx.com promptly if you suspect unauthorised access. You are responsible for activity under your accounts and for users you invite.",
      "You must not break the law or infringe privacy, intellectual property or other rights; send spam or messages to people who have not opted in, including WhatsApp, SMS or email; upload malware, probe or attack our systems, or bypass security or usage limits; reverse engineer, copy, resell or build a competing product from the Platform except where law allows; use Platform or AI features to harass, deceive, impersonate, unlawfully discriminate or create illegal, exploitative, violent or hateful content; make fully automated decisions with legal or similarly significant effects without legally required human review and notices; or process special-category or highly regulated information, such as HIPAA health records, unless we agree in writing and sign required documents.",
      "You are responsible for the data you put into the Platform, and for having a lawful basis, notices and consents to collect it and let us process it—including from employees, applicants, guests and customers. Where required, tell people they are interacting with an AI agent and that calls or chats may be recorded.",
      "Surge helps calculate pay, taxes, statutory contributions and compliance tasks using the data and settings you provide. You remain responsible for reviewing payroll before it runs, filings and payments to authorities such as TAJ, NIS or the IRS, and employment decisions. We may suspend access if we reasonably believe you are breaching this section or creating a security or legal risk; where possible, we will explain why.",
    ],
  },
  {
    title: "AI features and large language models",
    body: [
      "The Platform includes AI features powered by our own models and third-party LLMs. What you or your end users submit is Input; what the feature generates is Output. As between you and us, you own Input and, to the extent the law allows, Output generated for you. We may use them only to provide, secure and support the Platform for you.",
      "We do not use your Input, Output or customer data to train general-purpose models. We train or fine-tune custom models on your data only under a signed SOW, and those models are for your use.",
      "Some features send Input to third-party model providers under their terms and our agreements. You agree not to use AI features in ways that breach those providers’ policies.",
      "Output can be inaccurate, incomplete, biased or similar to content generated for others. Review it before relying on it, especially for legal, financial, medical, employment or safety decisions. Candidate rankings, readiness scores and similar outputs assist human judgment, not replace it.",
      "When you configure an agent such as Vicki Ann, it acts on the information, policies, prices and instructions you provide. Keep those details current and are responsible for commitments the agent makes within its configured limits. Do not present an AI agent as human, and keep required disclosures enabled. We may update, replace or retire models; output may change as a result.",
    ],
  },
  {
    title: "Third-party integrations, WhatsApp and social platforms",
    body: [
      "The Platform connects to services we do not own or control, including AWS, Google Cloud, Microsoft Azure, Snowflake, Databricks, Salesforce, QuickBooks Online, Sage Intacct, Unanet, Noyo, messaging and voice carriers, and social platforms. Your use is subject to each service’s terms, licences and privacy policy; you are responsible for holding required accounts and licences.",
      "If you use WhatsApp, follow the WhatsApp Business Terms, Messaging Policy and Commerce Policy. Get opt-in before business-initiated messages, promptly honour opt-outs, use approved templates where required, and do not send prohibited content. Meta may charge for some conversations; charges pass through as stated in your order.",
      "If you connect Facebook, Instagram or another social account, follow that platform’s terms and authorise us to access the account only as needed for the features you enable. We are independent of platform vendors and are not responsible for their availability, accuracy, security, pricing, API changes or account suspensions. If an integration changes or is withdrawn, we may change or discontinue the feature.",
      "By connecting an integration, you instruct us to exchange data as configured and confirm you have the rights needed to do so.",
    ],
  },
  {
    title: "Data, intellectual property, fees and confidentiality",
    body: [
      "You own the data you and your users put into the Platform (Customer Data). You grant us a limited licence to host, process, transmit and display it only to provide, secure and support the Platform and Services under our Privacy Policy and DPA. We may use aggregated, de-identified statistics that do not identify you or any person to operate and improve products.",
      "We own the Platform, software, AI agents, our own models, documentation, frameworks, templates, know-how and improvements. During a subscription, we grant you a non-exclusive, non-transferable right to use the Platform for your internal business purposes. Ownership of deliverables built specifically for you is set out in the SOW. We may use feedback without obligation.",
      "Fees, billing periods and payment terms are in your order form, MSA or SOW. Unless stated otherwise, fees are payable in advance, non-refundable and exclude taxes, which you are responsible for. Third-party pass-through charges, such as WhatsApp conversation, carrier, cloud consumption or AI usage above your plan, may be billed separately. We may suspend access for invoices more than 30 days overdue after notice.",
      "Each party keeps the other’s non-public business, technical and financial information confidential, uses it only to perform under these Terms and protects it with at least reasonable care. This does not cover public, already known or independently developed information, or information that must be disclosed by law (with notice where allowed).",
    ],
  },
  {
    title: "Warranties and disclaimers",
    body: [
      "We provide the Platform and Services with reasonable skill and care, consistent with industry standards. Any service levels are in your order or SOW.",
      "Except as stated in a signed agreement, the website, Platform, AI features and Services are provided “as is” and “as available.” We disclaim other express or implied warranties, including merchantability, fitness for a particular purpose, non-infringement and that the Platform will be error-free or uninterrupted. We do not guarantee business outcomes, timelines, cost savings, regulatory approval or audit results. We are not a law firm, accounting firm, financial institution or insurer, and nothing we provide is legal, tax, financial or regulatory advice.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "To the maximum extent the law allows, neither party is liable for indirect, incidental, special, consequential or punitive damages, or lost profits, revenue, data or goodwill. Each party’s total liability arising from these Terms is limited to the fees you paid us in the 12 months before the event giving rise to the claim. These limits do not apply to payment obligations, a party’s breach of confidentiality, indemnity obligations, or where the law does not allow them.",
    ],
  },
  {
    title: "Indemnity",
    body: [
      "You will defend and indemnify us against third-party claims arising from your Customer Data, use of the Platform in breach of these Terms or the law, messages sent through the Platform, or breach of a third-party platform’s terms. We will defend and indemnify you against third-party claims that the Platform, used as permitted, infringes their intellectual property rights.",
    ],
  },
  {
    title: "Term, suspension and termination",
    body: [
      "These Terms apply while you use the website, Platform or Services. Subscriptions run for the term in your order and renew as stated there. Either party may terminate for material breach not cured within 30 days of written notice.",
      "When use ends, your right to use the Platform ends. You may export Customer Data for 30 days; after that, we delete it within 90 days unless the law requires retention. Terms that by their nature should survive—including data, IP, fees owed, confidentiality, disclaimers, liability, indemnity and governing law—survive termination.",
    ],
  },
  {
    title: "Governing law and disputes",
    body: [
      "These Terms are governed by the laws of the Commonwealth of Pennsylvania, USA, and disputes go to the state or federal courts in Pennsylvania. Where Arrington Digital Ltd. is the contracting party, Jamaica law applies and disputes go to the courts of Jamaica.",
      "Before going to court, both parties will try in good faith to resolve a dispute by negotiation for 30 days. Either party may seek urgent injunctive relief.",
    ],
  },
  {
    title: "General",
    body: [
      "We may update these Terms by posting a new version. For material changes, we will notify customers at least 30 days in advance; continued use after the effective date means you accept them. You may not assign these Terms without our consent; we may assign them in a merger, acquisition or sale of assets.",
      "Neither party is liable for delays caused by events beyond its reasonable control. If a provision is unenforceable, the rest remains in effect. These Terms and any signed agreement are the entire agreement on their subject.",
    ],
  },
  {
    title: "Contact",
    body: [
      "B.Arren, LLC. DBA/Arrington Digital, Pennsylvania, USA, and Arrington Digital Ltd., 60 Knutsford Boulevard, Kingston, Jamaica.",
      "Email info@arringtondx.com for general and legal questions, or for privacy matters.",
    ],
  },
];

const steps = [
  { number: "01", title: "CLOUD", sub: "Cloud & infrastructure.", copy: "Build the infrastructure and foundations your organization can rely on.", icon: Wifi, links: [["Cloud & infrastructure", "/enterprise"], ["Property network engineering", "/adx-propertyengineering"], ["Tools we work with", "/tools"]] },
  { number: "02", title: "SECURITY", sub: "Cybersecurity & compliance.", copy: "Protect systems and information with a considered, practical approach.", icon: ShieldCheck, links: [["Cybersecurity & compliance", "/enterprise"], ["Enterprise services", "/enterprise"], ["How we work", "/how-we-work"]] },
    { number: "03", title: "DATA + AI", sub: "Make data work harder.", copy: "Connect data, clarify decisions and explore useful applications for AI.", icon: Cpu, links: [["Data platforms & AI", "/enterprise"], ["ADX LaunchIQ", "/adx-launchiq"], ["Custom software & apps", "/custom-software"]] },
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
    "What We Do": [
      ...["/what-we-do", "/adx-surge", "/vicki-ann", "/adx-launchiq"].map((path) => pages.find((p) => p.path === path)!).filter(Boolean),
      ...pages.filter((p) => ["Connect", "Run", "Brand", "Grow", "Enterprise"].includes(p.group) && p.group !== "Products"),
    ],
    "Who We Help": pages.filter((p) => p.group === "Industries").concat(pages.filter((p) => p.path === "/enterprise" || p.path.startsWith("/who-we-help/"))),
    "Our Software": ["/adx-surge", "/vicki-ann", "/adx-launchiq"].map((path) => pages.find((p) => p.path === path)!).filter(Boolean),
    "Company": [
      ...["/about", "/adx-usa", "/adx-jamaica"].map((path) => pages.find((p) => p.path === path)!).filter(Boolean),
      ...pages.filter((p) => (p.group === "Company" || p.group === "Legal") && !["/about", "/adx-usa", "/adx-jamaica"].includes(p.path)),
    ],
  };
  const menuGroups = ["What We Do", "Who We Help", "Our Software", "Company"];
  const close = () => { setOpen(""); setMobileOpen(false); };
  const go = (path: string) => { close(); navigate(path); };
  return <header className="sticky top-0 z-50 border-b border-[#081020]/10 bg-[#FBFAF9]/95 backdrop-blur-xl">
    <div className="adx-container flex h-[72px] items-center justify-between gap-3">
       <SiteLink to="/" onNavigate={go} aria-label="ADX Arrington Digital home" className="flex h-12 w-[108px] shrink-0 items-center sm:w-[150px]"><img src="/__mockup/images/arrington-digital-adx-logo.png" alt="ADX Arrington Digital" className="h-[44px] w-[108px] shrink-0 object-contain object-left sm:h-[56px] sm:w-[146px]" /></SiteLink>
      <nav className="hidden items-center gap-4 xl:flex" aria-label="Main navigation">
        {menuGroups.slice(0, 2).map((label) => <button key={label} className={`adx-nav-link ${open === label ? "text-[#E8621A]" : ""}`} aria-expanded={open === label} onClick={() => setOpen(open === label ? "" : label)}>{label}<ChevronDown size={13} /></button>)}
        <button className={`adx-nav-link ${open === "Our Software" ? "text-[#E8621A]" : ""}`} aria-expanded={open === "Our Software"} onClick={() => setOpen(open === "Our Software" ? "" : "Our Software")}>Our Software<ChevronDown size={13} /></button>
        <SiteLink to="/our-work" onNavigate={go} className="adx-nav-link">Our Work</SiteLink>
        <SiteLink to="/contact" onNavigate={go} className="adx-nav-link">Contact</SiteLink>
        <button className={`adx-nav-link ${open === "Company" ? "text-[#E8621A]" : ""}`} aria-expanded={open === "Company"} onClick={() => setOpen(open === "Company" ? "" : "Company")}>Company<ChevronDown size={13} /></button>
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <button onClick={onSearch} className="grid h-8 w-8 place-items-center border border-[#081020]/15 hover:border-[#E8621A] sm:h-10 sm:w-10" aria-label="Search the site"><Search size={16} /></button>
        <SiteLink to="/contact" onNavigate={go} aria-label="Contact Arrington Digital" title="Contact Arrington Digital" className="grid h-8 w-8 place-items-center border border-[#081020]/15 hover:border-[#E8621A] sm:h-10 sm:w-10"><MessageCircle size={16} /></SiteLink>
        <a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary min-h-8 px-2 text-[9px] sm:min-h-10 sm:px-3 sm:text-[11px]">Book a call <ArrowUpRight className="adx-header-arrow" size={12} /></a>
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
        <div className="mb-4 flex items-center justify-between gap-3 text-xs text-[#081020]/55"><span>United States · Jamaica<br /><span className="text-[10px] text-[#081020]/45">One connected team.</span></span><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary min-h-10 px-3">Book a call <ArrowUpRight size={13} /></a></div>
      {menuGroups.map((label) => <div key={label} className="border-t border-[#081020]/10"><button onClick={() => setOpen(open === label ? "" : label)} className="flex min-h-[50px] w-full items-center justify-between text-left text-sm font-semibold" aria-expanded={open === label}>{label}<ChevronDown size={15} /></button>{open === label && <div className="grid grid-cols-1 gap-x-5 pb-3 sm:grid-cols-2">{(groupLists[label] || []).map((p) => <SiteLink key={p.path} to={p.path} onNavigate={go} className="flex min-h-11 items-center justify-between border-t border-[#081020]/[.07] py-2 text-sm">{p.title}<ArrowUpRight size={13} className="text-[#1552C2]" /></SiteLink>)}</div>}</div>)}
      <div className="grid grid-cols-2 gap-x-4 border-t border-[#081020]/10 py-3 text-sm"><SiteLink to="/our-work" onNavigate={go} className="flex min-h-11 items-center">Our Work</SiteLink><SiteLink to="/contact" onNavigate={go} className="flex min-h-11 items-center">Contact</SiteLink><SiteLink to="/tools" onNavigate={go} className="flex min-h-11 items-center">Tools</SiteLink><SiteLink to="/how-we-work" onNavigate={go} className="flex min-h-11 items-center">How we work</SiteLink></div>
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
    if (!q) return pages.filter((p) => !["Home", "Case study template", "404", "Privacy Policy", "Terms of Service"].includes(p.title)).slice(0, 8);
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
      <div className="flex items-center justify-between border-b border-[#081020]/10 px-5 py-4"><div><div id="site-search-heading" className="adx-mono text-[10px] tracking-[.14em] text-[#1552C2]">SEARCH ADX</div><p className="mt-1 text-xs text-[#081020]/55">Find a service, product or page.</p></div><button onClick={onClose} className="grid h-10 w-10 place-items-center border border-[#081020]/15" aria-label="Close search"><X size={17} /></button></div>
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
  const companyLinks = [
    ...["/about", "/adx-usa", "/adx-jamaica"].map((path) => pages.find((p) => p.path === path)!).filter(Boolean),
    ...pages.filter((p) => ["Company", "Enterprise", "Legal"].includes(p.group) && p.path !== "/our-work/client-slug" && !["/about", "/adx-usa", "/adx-jamaica"].includes(p.path)),
  ];
  const groups = [
    { title: "PRODUCTS · CONNECT · RUN", links: pages.filter((p) => ["Products", "Connect", "Run"].includes(p.group)) },
    { title: "BRAND · GROW", links: pages.filter((p) => ["Brand", "Grow"].includes(p.group)) },
    { title: "INDUSTRIES", links: pages.filter((p) => p.group === "Industries") },
    { title: "COMPANY", links: companyLinks },
  ];
  return <footer className="bg-[#081020] px-5 pb-7 pt-12 text-white sm:px-8 sm:pt-16">
    <div className="adx-container">
      <div className="grid gap-9 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_repeat(4,1fr)]">
         <div><img src="/__mockup/images/arrington-digital-adx-logo.png" alt="ADX Arrington Digital" className="h-14 w-36 object-contain object-left" style={{ filter: "brightness(0) invert(1)" }} /><p className="mt-4 max-w-[260px] text-sm font-medium">Build Smarter. Market Better. Scale Further.</p><p className="mt-3 max-w-[260px] text-xs leading-5 text-white/55">Cloud, security, data and digital experience for organizations in the U.S. and Jamaica.</p></div>
        {groups.map((group) => <div key={group.title}><div className="adx-mono text-[9px] tracking-[.15em] text-white/45">{group.title}</div>{group.links.map((p) => <SiteLink key={p.path} to={p.path} onNavigate={navigate} className="adx-footer-link">{p.title}</SiteLink>)}</div>)}
      </div>
      <div className="grid gap-7 border-b border-white/10 py-7 text-xs text-white/60 md:grid-cols-[1.4fr_1fr]">
         <div><div className="adx-mono mb-3 text-[9px] tracking-[.14em] text-white/45">CONTACT</div><p>Level 9, 60 Knutsford Blvd, Kingston, Jamaica</p><p className="mt-1">Pennsylvania, USA</p><a href={`mailto:${EMAIL}`} className="mt-2 inline-flex min-h-8 items-center text-white/85 hover:text-white">{EMAIL}</a></div>
         <div><div className="adx-mono mb-3 text-[9px] tracking-[.14em] text-white/45">REGIONS</div><p>United States · Jamaica</p></div>
      </div>
        <div className="flex flex-col gap-3 pt-5 text-[10px] text-white/40 sm:flex-row sm:items-start sm:justify-between"><span>© 2026 Arrington Digital. All rights reserved.</span><span className="max-w-xl">Arrington Digital serves organizations across the United States and Jamaica.</span><div className="flex gap-4"><SiteLink to="/legal/privacy-policy" onNavigate={navigate}>Privacy</SiteLink><SiteLink to="/legal/terms-of-service" onNavigate={navigate}>Terms</SiteLink></div></div>
    </div>
  </footer>;
}

function CTA({ title = "Tell us what you’re building.", copy = "A new initiative, platform refresh or digital experience—we’ll map the right next step together." }: { title?: string; copy?: string }) {
  return <section className="bg-[#E8621A] px-5 py-14 text-white sm:px-8 sm:py-16"><div className="adx-container flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><Eyebrow light>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2 className="mt-5 max-w-[670px] text-4xl font-medium leading-[1.03] tracking-[-.055em] sm:text-6xl">{title}</h2><p className="mt-4 max-w-[550px] text-sm leading-6 text-white/85">{copy}</p></div><div className="shrink-0"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[54px] px-6">Book a call <ArrowUpRight size={16} /></a><div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/85"><a className="inline-flex items-center gap-2" href={`mailto:${EMAIL}`}><Mail size={13} />{EMAIL}</a></div></div></div></section>;
}

function LegalLandingPage({ page, navigate }: { page: Page; navigate: (path: string) => void }) {
  const isPrivacy = page.path === "/legal/privacy-policy";
  const sections = isPrivacy ? privacyPolicySections : termsOfServiceSections;
  const visual = pageVisuals[page.path];
  return <>
    <section className="bg-[#081020] px-5 pb-8 pt-8 text-white sm:px-6 sm:pb-12 sm:pt-10">
      <div className="adx-container">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[11px] text-white/50"><SiteLink to="/" onNavigate={navigate} className="hover:text-white">Home</SiteLink><span>/</span><span className="text-white/85">{page.title}</span></nav>
        <div className="grid overflow-hidden border border-white/15 lg:grid-cols-[.88fr_1.12fr]">
          <div className="flex min-h-[360px] flex-col justify-between bg-[#E8621A] px-6 py-7 text-[#081020] sm:px-10 sm:py-10 lg:min-h-[490px] lg:px-12 lg:py-12">
            <div className="flex items-center justify-between gap-3 border-b border-[#081020]/25 pb-4"><Eyebrow>LEGAL / ADX</Eyebrow><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/55">2026</span></div>
            <div className="py-8"><h1 className="max-w-[600px] text-[clamp(2.8rem,6vw,5.3rem)] font-medium leading-[.93] tracking-[-.075em]">{page.title}</h1><p className="mt-5 max-w-[540px] text-sm leading-7 text-[#081020]/75">{isPrivacy ? "Clear information about the personal data we handle, the safeguards we use and the choices you have." : "The business terms that support a clear working relationship with Arrington Digital."}</p><p className="adx-mono mt-7 text-[9px] tracking-[.14em] text-[#081020]/60">LAST UPDATED · OCTOBER 17, 2026</p></div>
            <div className="border-t border-[#081020]/25 pt-4"><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/60">UNITED STATES · JAMAICA</span></div>
          </div>
          <figure className="relative min-h-[280px] overflow-hidden bg-[#121926] sm:min-h-[380px] lg:min-h-[490px]">
            <img src={visual.src} alt={visual.alt} className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,32,.08),transparent_35%,rgba(8,16,32,.76))]" />
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8"><span className="adx-mono text-[9px] tracking-[.14em] text-white/85">{visual.label}</span><span className="adx-mono text-[9px] text-white/55">ADX / LEGAL</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section className="adx-container px-5 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-8 md:grid-cols-[.54fr_1.46fr]">
        <div className="md:sticky md:top-28 md:self-start"><Eyebrow>POLICY <span className="text-[#222]/35">/</span> CONTENTS</Eyebrow><h2 className="adx-heading mt-4">{isPrivacy ? "Personal information, clearly handled." : "Using ADX, clearly understood."}</h2><p className="adx-copy mt-4 max-w-[320px]">Open a section to read the full details. For a question about this policy, contact our team directly.</p><a href={`mailto:${isPrivacy ? "privacy@arringtondx.com" : EMAIL}`} className="adx-text-link mt-5">{isPrivacy ? "Email privacy" : "Email Arrington Digital"} <ArrowUpRight size={14} /></a></div>
        <div className="border-t border-[#081020]/15">
          {sections.map((section, index) => <details key={section.title} open={index === 0} className="group border-b border-[#081020]/15">
            <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <span className="adx-mono min-w-8 pt-1 text-[10px] tracking-[.12em] text-[#E8621A]">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex min-w-0 flex-1 items-start justify-between gap-4"><span className="text-lg font-medium leading-tight tracking-[-.025em] sm:text-xl">{section.title}</span><ChevronDown size={17} className="mt-1 shrink-0 text-[#1552C2] transition-transform group-open:rotate-180" /></span>
            </summary>
            <div className="space-y-4 pb-6 pl-12 pr-2 sm:pl-12">
              {section.body.map((paragraph, paragraphIndex) => <p key={`${section.title}-${paragraphIndex}`} className="max-w-[760px] text-sm leading-7 text-[#081020]/70">{paragraph}</p>)}
            </div>
          </details>)}
        </div>
      </div>
    </section>
    <section className="bg-[#F2ECE8] px-5 py-8 sm:px-8"><div className="adx-container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-[#081020]/70">{isPrivacy ? "Privacy questions and requests" : "General and legal questions"}</p><a href={`mailto:${isPrivacy ? "privacy@arringtondx.com" : EMAIL}`} className="adx-text-link">{isPrivacy ? "privacy@arringtondx.com" : EMAIL}<ArrowUpRight size={14} /></a></div></section>
  </>;
}

function SurgeLandingPage({ navigate }: { navigate: (path: string) => void }) {
  const modules = [
    ["01", "Payroll & time", "Multi-rate pay, tips and service charges flow into approved timesheets and local payroll."],
    ["02", "Scheduling & hiring", "Build schedules across properties, support shift changes and onboard seasonal teams."],
    ["03", "Compliance & benefits", "Apply local leave, filings and handbook rules by country, state and property."],
    ["04", "Property operations", "Manage entities, units, reservations, maintenance and multi-property records."],
    ["05", "Guest CRM", "Keep one guest profile across phone, web, messaging, bookings and staff activity."],
    ["06", "Journeys & growth", "Use segments, email journeys, SEO, AEO and attribution to connect discovery to return visits."],
    ["07", "Finance & GL", "Keep financial records connected across entities or sync with existing accounting systems."],
    ["08", "Point of sale", "POS is designed to feed payroll, scheduling, CRM and finance; it is on the roadmap."],
  ];
  return <>
    <section className="bg-[#081020] px-5 pb-10 pt-8 text-white sm:px-6 sm:pb-14 sm:pt-10">
      <div className="adx-container">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[11px] text-white/50"><a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a><span>/</span><span>What We Do</span><span>/</span><span className="text-white/85">ADX Surge</span></nav>
        <div className="grid overflow-hidden border border-white/15 lg:grid-cols-[.94fr_1.06fr]">
          <div className="relative flex min-h-[500px] flex-col justify-between bg-[#E8621A] px-6 py-7 text-[#081020] sm:px-10 sm:py-10 lg:min-h-[610px] lg:px-12 lg:py-12">
            <div className="flex items-center justify-between gap-4 border-b border-[#081020]/25 pb-4"><Eyebrow>PRODUCT / OPERATIONS PLATFORM</Eyebrow><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/55">01—08</span></div>
            <div className="py-9">
              <p className="adx-mono mb-4 text-[9px] tracking-[.15em] text-[#081020]/60">ADX SURGE · BY ARRINGTON DIGITAL</p>
              <h1 className="max-w-[640px] text-[clamp(2.8rem,5.8vw,5.5rem)] font-medium leading-[.93] tracking-[-.075em]">One platform.<br />Every location.<br /><span className="text-[#FBFAF9]">Every country.</span></h1>
              <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-[#081020]/80">Payroll, scheduling, hiring, compliance, property operations and guest relationships—connected in one system for hourly, multi-location teams.</p>
              <div className="mt-7 flex flex-wrap gap-3"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[50px] px-5">Talk through Surge <ArrowUpRight size={15} /></a><a href="#surge-modules" className="adx-action min-h-[50px] border border-[#081020]/40 px-5 text-[#081020]">Explore the platform <ArrowDown size={15} /></a></div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#081020]/25 pt-4"><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/65">MULTI-LOCATION · MULTI-PROPERTY</span><span className="text-[11px] text-[#081020]/65">One connected record.</span></div>
          </div>
          <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-[#101a2b] p-5 sm:p-8 lg:min-h-[610px] lg:p-10" style={{ backgroundImage: "linear-gradient(120deg, rgba(16,26,43,.76), rgba(16,26,43,.91)), url('/__mockup/images/arrington-digital-surge-operations.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="flex items-center justify-between border-b border-white/15 pb-4"><span className="adx-mono text-[9px] tracking-[.14em] text-white/70">SURGE / PORTFOLIO VIEW</span><span className="border border-[#E8621A]/50 px-2 py-1 text-[8px] tracking-[.12em] text-[#F0A24A]">ILLUSTRATIVE</span></div>
            <div className="my-8">
              <p className="adx-mono text-[9px] tracking-[.14em] text-white/45">CONNECTED OPERATIONS</p>
              <h2 className="mt-3 max-w-[480px] text-3xl font-medium leading-[1.02] tracking-[-.05em] text-white sm:text-4xl">One login. One role tree. One audit trail.</h2>
              <div className="mt-7 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                {[
                  ["TEAM", "Payroll · time · scheduling"],
                  ["PROPERTY", "Portfolio · units · maintenance"],
                  ["GUEST", "CRM · journeys · Vicki Ann"],
                  ["FINANCE", "Multi-entity · regional workflows"],
                ].map(([label, copy]) => <div key={label} className="min-h-[105px] bg-[#101a2b] p-4"><span className="adx-mono text-[9px] tracking-[.14em] text-[#F0A24A]">{label}</span><p className="mt-3 text-sm text-white/80">{copy}</p></div>)}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4 text-[10px] text-white/55"><span>Shared employee, property and guest records</span><span>POS · ROADMAP</span></div>
          </div>
        </div>
      </div>
    </section>
    <section id="surge-modules" className="adx-section adx-container">
      <div className="grid gap-6 md:grid-cols-[1fr_.65fr] md:items-end"><div><Eyebrow>ONE PLATFORM <span className="text-[#222]/35">/</span> CONNECTED MODULES</Eyebrow><h2 className="adx-heading mt-3 max-w-[700px]">People, properties and guests in the same picture.</h2></div><p className="adx-copy max-w-[400px] md:justify-self-end">Every module shares the records teams already use—so routine work moves across departments without re-keying.</p></div>
      <div className="mt-10 grid border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-4">{modules.map(([n, title, copy]) => <article key={n} className="min-h-[210px] border-b border-[#081020]/15 py-5 pr-5 sm:px-5 lg:border-r lg:first:pl-0 lg:[&:nth-child(4n)]:border-r-0"><span className="adx-mono text-[9px] tracking-[.14em] text-[#E8621A]">{n} / SURGE MODULE</span><h3 className="mt-6 text-xl font-medium tracking-[-.035em]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#081020]/65">{copy}</p></article>)}</div>
    </section>
    <section className="bg-[#081020] px-5 py-16 text-white sm:px-8 sm:py-20"><div className="adx-container"><div className="grid gap-7 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><Eyebrow light>LOCAL RULES <span className="text-white/35">/</span> SHARED PLATFORM</Eyebrow><h2 className="mt-4 max-w-[560px] text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-5xl">Built for the places you operate.</h2></div><p className="max-w-[440px] text-sm leading-7 text-white/60 md:justify-self-end">Apply regional rules, time zones and operating context while keeping an owner’s view across the portfolio.</p></div><div className="mt-10 grid gap-8 border-t border-white/15 pt-5 md:grid-cols-2"><article><span className="adx-mono text-[9px] tracking-[.14em] text-[#F0A24A]">UNITED STATES</span><h3 className="mt-3 text-2xl font-medium">Rules that follow the location.</h3><p className="mt-3 max-w-[460px] text-sm leading-6 text-white/60">The platform overview describes state wage-and-hour frameworks, fair-workweek rules where required, I-9, E-Verify and ACA tracking.</p></article><article><span className="adx-mono text-[9px] tracking-[.14em] text-[#F0A24A]">JAMAICA</span><h3 className="mt-3 text-2xl font-medium">A country-aware operating layer.</h3><p className="mt-3 max-w-[460px] text-sm leading-6 text-white/60">Payroll and local statutory workflows, including PAYE, NIS, NHT, Education Tax, HEART and TAJ filings, are designed around jurisdiction-specific requirements.</p></article></div><p className="mt-5 text-[10px] leading-5 text-white/40">Configuration and statutory obligations should be confirmed for each deployment and jurisdiction.</p></div></section>
    <section className="bg-[#F2ECE8] px-5 py-14 sm:px-8 sm:py-18"><div className="adx-container grid gap-8 md:grid-cols-[.72fr_1.28fr] md:items-center"><div><Eyebrow>BUILT INTO SURGE <span className="text-[#222]/35">/</span> VICKI ANN</Eyebrow><h2 className="mt-4 max-w-[470px] text-4xl font-medium leading-[1.02] tracking-[-.055em]">The guest conversation belongs in the same system.</h2><p className="mt-4 max-w-[430px] text-sm leading-6 text-[#081020]/65">Vicki Ann answers across phone, SMS, WhatsApp and web chat, then creates or updates the guest profile in Surge.</p><SiteLink to="/vicki-ann" onNavigate={navigate} className="adx-text-link mt-5">Meet Vicki Ann <ArrowRight size={14} /></SiteLink></div><div className="flex items-start gap-4 border border-[#081020]/12 bg-[#FBFAF9] p-5 sm:p-7"><img src="/__mockup/images/arrington-digital-vicki-ann-avatar.png" alt="Vicki Ann, the Surge AI front desk assistant" className="h-14 w-14 shrink-0 object-cover sm:h-16 sm:w-16" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#081020]/10 pb-3"><strong className="text-sm">Vicki Ann</strong><span className="adx-mono text-[9px] tracking-[.12em] text-[#081020]/45">CRM UPDATED · WHATSAPP</span></div><p className="mt-4 text-sm leading-6 text-[#081020]/75">“Friday has 6:45 or 7:30 for four. The pool bar is open until 11pm.”</p><p className="mt-4 text-[10px] text-[#081020]/45">Illustrative response from the Surge platform overview.</p></div></div></div></section>
    <CTA title="Bring the operation into one view." copy="Talk through your locations, teams and guest experience. We’ll map a practical starting scope." />
  </>;
}

function VickiAnnLandingPage({ navigate }: { navigate: (path: string) => void }) {
  const channels = [
    ["01", "Phone", "Answers calls in a natural voice, including after hours and during the rush."],
    ["02", "Text / SMS", "Sends confirmations, reminders and quick answers from the same number."],
    ["03", "WhatsApp", "Meets international and diaspora guests in a familiar channel."],
    ["04", "Web chat", "Lives on the website and creates or updates a guest CRM record."],
  ];
  const capabilities = [
    ["Reservations & waitlists", "Books, confirms and reschedules across locations."],
    ["FAQs in your voice", "Answers questions about rooms, hours, menus, amenities and policies."],
    ["Guest changes", "Handles supported changes and cancellations, with updates reflected in the connected workflow."],
    ["Contextual handoff", "Passes the conversation and guest context to a person—no cold transfer."],
  ];
  return <>
    <section className="bg-[#081020] px-5 pb-10 pt-8 text-white sm:px-6 sm:pb-14 sm:pt-10">
      <div className="adx-container">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[11px] text-white/50"><a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a><span>/</span><span>What We Do</span><span>/</span><span className="text-white/85">Vicki Ann</span></nav>
        <div className="grid overflow-hidden border border-white/15 lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex min-h-[490px] flex-col justify-between bg-[#E8621A] px-6 py-7 text-[#081020] sm:px-10 sm:py-10 lg:min-h-[590px] lg:px-12 lg:py-12">
            <div className="flex items-center justify-between gap-4 border-b border-[#081020]/25 pb-4"><Eyebrow>PRODUCT / AI FRONT DESK</Eyebrow><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/55">24 / 7</span></div>
            <div className="py-8"><p className="adx-mono mb-4 text-[9px] tracking-[.15em] text-[#081020]/60">VICKI ANN · BUILT INTO ADX SURGE</p><h1 className="max-w-[620px] text-[clamp(2.8rem,5.8vw,5.4rem)] font-medium leading-[.94] tracking-[-.075em]">The front desk that never clocks out.</h1><p className="mt-6 max-w-[500px] text-[15px] leading-7 text-[#081020]/80">One guest conversation across phone, SMS, WhatsApp and web chat—with reservations, answers and contextual handoffs connected to Surge.</p><div className="mt-7 flex flex-wrap gap-3"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[50px] px-5">Talk through Vicki Ann <ArrowUpRight size={15} /></a><SiteLink to="/adx-surge" onNavigate={navigate} className="adx-action min-h-[50px] border border-[#081020]/40 px-5 text-[#081020]">Explore ADX Surge <ArrowRight size={15} /></SiteLink></div></div>
            <div className="border-t border-[#081020]/25 pt-4"><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/65">PHONE · TEXT · WHATSAPP · WEB CHAT</span></div>
          </div>
          <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-[#111a2a] p-5 sm:p-8 lg:min-h-[590px]" style={{ backgroundImage: "linear-gradient(120deg, rgba(17,26,42,.64), rgba(17,26,42,.88)), url('/__mockup/images/arrington-digital-hotel-concierge.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div aria-hidden="true" className="absolute inset-6 border border-white/10 sm:inset-10" />
            <div className="relative z-10 w-full max-w-[450px] border border-white/15 bg-[#081020] p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4"><img src="/__mockup/images/arrington-digital-vicki-ann-avatar.png" alt="Vicki Ann, a hospitality AI front desk assistant" className="h-14 w-14 shrink-0 object-cover" /><div><h2 className="text-sm font-semibold">Vicki Ann</h2><p className="mt-1 text-[10px] text-white/50">Resort concierge · WhatsApp</p></div><span className="ml-auto border border-[#E8621A]/40 px-2 py-1 text-[8px] tracking-[.12em] text-[#F0A24A]">SAMPLE</span></div>
              <div className="mt-5 space-y-3 text-xs leading-5"><div className="ml-auto max-w-[86%] bg-[#1552C2] p-3 text-white">Can we move our 7pm dinner for four to Friday? Is the pool bar open late?</div><div className="flex items-start gap-2"><img src="/__mockup/images/arrington-digital-vicki-ann-avatar.png" alt="" className="h-7 w-7 shrink-0 object-cover" /><div className="max-w-[90%] bg-[#F2ECE8] p-3 text-[#081020]">Friday has 6:45 or 7:30 for four. The pool bar is open until 11pm.</div></div><div className="ml-auto max-w-[55%] bg-[#1552C2] p-3 text-white">7:30 please!</div><div className="flex items-start gap-2"><img src="/__mockup/images/arrington-digital-vicki-ann-avatar.png" alt="" className="h-7 w-7 shrink-0 object-cover" /><div className="max-w-[90%] bg-[#F2ECE8] p-3 text-[#081020]">You’re booked for Friday at 7:30. Confirmation is on its way.</div></div></div>
              <p className="adx-mono mt-5 border-t border-white/10 pt-3 text-[8px] tracking-[.12em] text-white/45">ILLUSTRATIVE CONVERSATION · CRM RECORD UPDATED</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="adx-section adx-container"><div className="grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end"><div><Eyebrow>ONE AGENT <span className="text-[#222]/35">/</span> EVERY CHANNEL</Eyebrow><h2 className="adx-heading mt-3 max-w-[700px]">Keep the conversation moving, wherever it starts.</h2></div><p className="adx-copy max-w-[420px] md:justify-self-end">Guests get a consistent answer. Your team gets the context and a clean handoff when a person needs to step in.</p></div><div className="mt-9 grid border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-4">{channels.map(([n, title, copy]) => <article key={title} className="min-h-[190px] border-b border-[#081020]/15 py-5 pr-5 sm:px-5 lg:border-r"><span className="adx-mono text-[9px] tracking-[.14em] text-[#E8621A]">{n} / CHANNEL</span><h3 className="mt-6 text-xl font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-[#081020]/65">{copy}</p></article>)}</div></section>
    <section className="bg-[#F2ECE8] px-5 py-16 sm:px-8 sm:py-20"><div className="adx-container"><div className="grid gap-6 md:grid-cols-[.75fr_1.25fr] md:items-end"><div><Eyebrow>WHAT VICKI ANN HANDLES</Eyebrow><h2 className="mt-4 max-w-[520px] text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-5xl">A helpful first response. A better handoff.</h2></div><p className="max-w-[430px] text-sm leading-6 text-[#081020]/65 md:justify-self-end">Vicki Ann uses each property’s own details and writes conversation activity back into the connected guest profile.</p></div><div className="mt-9 grid gap-px border-t border-[#081020]/15 bg-[#081020]/15 sm:grid-cols-2">{capabilities.map(([title, copy], index) => <article key={title} className="bg-[#F2ECE8] p-5 sm:p-7"><span className="adx-mono text-[9px] tracking-[.14em] text-[#E8621A]">0{index + 1} / CAPABILITY</span><h3 className="mt-5 text-2xl font-medium tracking-[-.04em]">{title}</h3><p className="mt-2 max-w-[430px] text-sm leading-6 text-[#081020]/65">{copy}</p></article>)}</div></div></section>
    <section className="bg-[#081020] px-5 py-14 text-white sm:px-8 sm:py-16"><div className="adx-container grid gap-7 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><Eyebrow light>CONNECTED TO SURGE</Eyebrow><h2 className="mt-4 max-w-[540px] text-4xl font-medium leading-[1.02] tracking-[-.055em]">Not another inbox to monitor.</h2></div><p className="max-w-[600px] text-sm leading-7 text-white/65">Known guests can be matched and updated; new guests can become a CRM record. Conversation source and channel stay attached, and staff receive the full history when Vicki Ann escalates.</p></div></section>
    <CTA title="Give every guest a clear next step." copy="Explore how Vicki Ann can connect to your channels, property information and guest operations." />
  </>;
}

function LaunchIQLandingPage({ navigate }: { navigate: (path: string) => void }) {
  const pillars = ["Regulatory", "Supply Chain", "Medical Affairs", "Commercial", "Market Access", "Marketing", "Sales", "Training", "Quality", "Manufacturing"];
  const capabilities = [
    ["Knowledge graph", "Model relationships between products, markets, milestones, owners, risks and dependencies."],
    ["Deterministic rules", "Evaluate readiness and risk with explainable business logic before AI summarizes the picture."],
    ["Scenario simulation", "Explore how delays, supply shifts or resource changes could affect launch outcomes."],
    ["Decision support", "Show downstream readiness, timeline, revenue and risk impacts before executives act."],
  ];
  return <>
    <section className="bg-[#081020] px-5 pb-10 pt-8 text-white sm:px-6 sm:pb-14 sm:pt-10">
      <div className="adx-container">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[11px] text-white/50"><a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a><span>/</span><span>What We Do</span><span>/</span><span className="text-white/85">Launch IQ</span></nav>
        <div className="grid overflow-hidden border border-white/15 lg:grid-cols-[.86fr_1.14fr]">
          <div className="flex min-h-[520px] flex-col justify-between bg-[#101a2b] px-6 py-7 sm:px-10 sm:py-10 lg:min-h-[620px] lg:px-12 lg:py-12">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4"><Eyebrow light>PRODUCT / LIFE SCIENCES</Eyebrow><span className="adx-mono text-[9px] tracking-[.13em] text-white/45">DECISION INTELLIGENCE</span></div>
            <div className="py-8"><div className="mb-8 h-[132px] w-[230px] max-w-full overflow-hidden sm:h-[166px] sm:w-[290px]"><img src="/__mockup/images/arrington-digital-launch-iq-logo.png" alt="LaunchIQ" className="h-full w-full object-cover object-top" /></div><h1 className="max-w-[620px] text-[clamp(2.7rem,5.4vw,5rem)] font-medium leading-[.94] tracking-[-.07em]">Know what moves a launch toward ready.</h1><p className="mt-6 max-w-[510px] text-sm leading-7 text-white/65">Launch IQ connects readiness, dependencies, risk and business impact—so leaders can see what a change means and decide what to do next.</p><div className="mt-7 flex flex-wrap gap-3"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary min-h-[50px] px-5">Talk about Launch IQ <ArrowUpRight size={15} /></a><a href="#launch-model" className="adx-action adx-action-ghost min-h-[50px] px-5">Explore the model <ArrowDown size={15} /></a></div></div>
            <div className="border-t border-white/15 pt-4"><span className="adx-mono text-[9px] tracking-[.13em] text-white/45">POWERED BY NIMBLE · COGNITIVE DIGITAL TWIN</span></div>
          </div>
          <figure className="relative grid min-h-[460px] grid-rows-[auto_1fr] overflow-hidden bg-[#081020] sm:min-h-[560px] lg:min-h-[620px]">
            <figcaption className="flex items-center justify-between gap-3 border-b border-white/15 px-4 py-3"><span className="adx-mono text-[9px] tracking-[.14em] text-white/60">LAUNCH WORKSPACE / LIVE READINESS</span><span className="adx-mono text-[9px] tracking-[.12em] text-[#F0A24A]">NIMBLE · 01</span></figcaption>
            <div className="flex min-h-0 items-center justify-center bg-[#F6F7F9] p-3 sm:p-5">
              <img src="/__mockup/images/arrington-digital-launchiq-live-surface-01.png" alt="Launch IQ launch workspace showing workstreams, readiness, and active risks" className="max-h-full w-full object-contain" />
            </div>
          </figure>
        </div>
      </div>
    </section>
    <section id="launch-model" className="adx-section adx-container"><div className="grid gap-6 md:grid-cols-[1fr_.68fr] md:items-end"><div><Eyebrow>LAUNCH IQ <span className="text-[#222]/35">/</span> THE DISTINCTION</Eyebrow><h2 className="adx-heading mt-3 max-w-[700px]">Most tools track activity. Launch IQ interprets impact.</h2></div><p className="adx-copy max-w-[430px] md:justify-self-end">Move from manually assembled status to a connected operating picture of launch readiness.</p></div><div className="mt-9 grid border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-4">{capabilities.map(([title, copy], index) => <article key={title} className="min-h-[220px] border-b border-[#081020]/15 py-5 pr-5 sm:px-5 lg:border-r"><span className="adx-mono text-[9px] tracking-[.14em] text-[#E8621A]">0{index + 1} / NIMBLE</span><h3 className="mt-6 text-xl font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-[#081020]/65">{copy}</p></article>)}</div></section>
    <section className="bg-[#F2ECE8] px-5 py-16 sm:px-8 sm:py-20"><div className="adx-container"><div className="grid gap-6 md:grid-cols-[.72fr_1.28fr] md:items-end"><div><Eyebrow>TEN-PILLAR READINESS MODEL</Eyebrow><h2 className="mt-4 max-w-[520px] text-4xl font-medium leading-[1.02] tracking-[-.055em]">One launch, seen across every workstream.</h2></div><p className="max-w-[430px] text-sm leading-6 text-[#081020]/65 md:justify-self-end">Each pillar is owned and evaluated independently, then connected through dependencies to show its effect on the whole launch.</p></div><div className="mt-9 grid gap-px border-t border-[#081020]/15 bg-[#081020]/15 sm:grid-cols-2 lg:grid-cols-5">{pillars.map((pillar, index) => <div key={pillar} className="min-h-[105px] bg-[#F2ECE8] p-4"><span className="adx-mono text-[9px] tracking-[.14em] text-[#E8621A]">0{index + 1}</span><h3 className="mt-4 text-sm font-medium">{pillar}</h3></div>)}</div></div></section>
    <section className="bg-[#081020] px-5 py-16 text-white sm:px-8 sm:py-20"><div className="adx-container grid gap-8 md:grid-cols-[.72fr_1.28fr] md:items-center"><div><Eyebrow light>NIMBLE <span className="text-white/35">/</span> THE DIGITAL TWIN</Eyebrow><h2 className="mt-4 max-w-[480px] text-4xl font-medium leading-[1.02] tracking-[-.055em]">A launch model that updates with the work.</h2><p className="mt-5 max-w-[440px] text-sm leading-7 text-white/60">Nimble connects products, markets, teams, milestones, risks, resources and decisions, then evaluates the downstream effect of change.</p></div><figure className="overflow-hidden border border-white/15 bg-[#F6F7F9] p-2 sm:p-3"><img src="/__mockup/images/arrington-digital-launchiq-live-surface-02.png" alt="Launch IQ architecture linking enterprise systems, the Nimble cognitive digital twin, and decision intelligence" className="h-auto w-full" /><figcaption className="flex flex-wrap items-center justify-between gap-2 bg-[#081020] px-3 py-3"><span className="adx-mono text-[9px] tracking-[.14em] text-white/55">SYSTEMS IN / NIMBLE / DECISIONS OUT</span><span className="adx-mono text-[9px] tracking-[.14em] text-[#F0A24A]">OPERATING MODEL</span></figcaption></figure></div></section>
    <section className="adx-section adx-container"><div className="grid gap-7 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><Eyebrow>DESIGNED TO FIT YOUR STACK</Eyebrow><h2 className="adx-heading mt-3 max-w-[550px]">Connect the systems teams already rely on.</h2></div><div><p className="adx-copy max-w-[580px]">The product brief describes Launch IQ as an independent decision environment that can integrate with existing enterprise investments rather than replace them.</p><div className="mt-5 flex flex-wrap gap-2">{["Salesforce", "Veeva", "SAP", "Oracle", "IQVIA", "Internal platforms"].map((name) => <span key={name} className="border border-[#081020]/15 px-3 py-2 text-xs text-[#081020]/70">{name}</span>)}</div><p className="mt-3 text-[10px] text-[#081020]/45">Integration availability and scope are confirmed during implementation planning.</p></div></div></section>
    <CTA title="Make the next launch decision with context." copy="Talk with ADX about your launch portfolio, existing systems and readiness questions." />
  </>;
}

function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const scenes: HeroScene[] = [
    { number: "01", title: "ADX in motion", tag: "TEAM", segment: 0 },
    { number: "02", title: "Restaurants & Bars", tag: "HOSPITALITY", src: RESTAURANT_VIDEO, poster: "/__mockup/images/arrington-digital-hospitality.jpg" },
    { number: "03", title: "Property & guest experience", tag: "HOSPITALITY", src: RESORT_VIDEO, poster: "/__mockup/images/arrington-digital-pexels-37569474.jpg" },
    { number: "04", title: "Pharmaceutical & Life Sciences", tag: "LIFE SCIENCES", segment: 2 },
    { number: "05", title: "Manufacturing", tag: "PRODUCTION", segment: 3 },
    { number: "06", title: "Cloud, Security & Data", tag: "TECHNOLOGY", segment: 4 },
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
    if (scenes[activeScene].src) return;
    if (video.paused && video.currentTime < 0.15) return;
    if (video.currentTime >= video.duration - 0.12) {
      video.currentTime = 0;
      setActiveScene(0);
      return;
    }
    const segment = Math.min(4, Math.floor((video.currentTime / video.duration) * 5));
    const next = scenes.findIndex((scene) => scene.segment === segment);
    if (next >= 0 && next !== activeScene) setActiveScene(next);
  };
  const selectScene = async (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    const scene = scenes[index];
    setActiveScene(index);
    if (scene.src) {
      video.pause();
      return;
    }
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 10;
    video.currentTime = Math.min(duration - 0.12, (duration / 5) * (scene.segment || 0));
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
            <h1 className="adx-reveal max-w-[650px] text-[clamp(2.9rem,6vw,5.8rem)] font-medium leading-[.95] tracking-[-.075em]"><span className="text-[#081020]">Build</span> Smarter.<br /><span className="text-[#081020]">Market</span> Better.<br /><span className="text-[#081020]">Scale</span> Further.</h1>
            <p className="adx-reveal adx-delay-1 mt-6 max-w-[500px] text-[15px] leading-7 text-white/85 sm:text-[16px]">Technology and marketing for organizations across the U.S. and Jamaica—from life sciences and manufacturing to hospitality, property and retail.</p>
            <div className="adx-reveal adx-delay-2 mt-7 flex flex-col gap-3 min-[430px]:flex-row">
              <a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[50px] px-5">Book a call <ArrowUpRight size={15} /></a>
              <a href="/what-we-do" onClick={(e) => { e.preventDefault(); navigate("/what-we-do"); }} className="adx-action min-h-[50px] border border-white/55 px-5 text-white hover:border-white hover:bg-white/10">Explore what we do <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/25 pt-4">
            <span className="adx-mono text-[9px] tracking-[.13em] text-white/75"><MapPin size={12} className="mr-2 inline text-[#F2ECE8]" />PENNSYLVANIA · KINGSTON</span>
            <span className="text-[11px] text-white/70">One connected team.</span>
          </div>
        </div>
        <div className="relative order-2 min-h-[420px] overflow-hidden bg-[#081020] sm:min-h-[460px] lg:order-2 lg:min-h-[690px]">
          <video key={scenes[activeScene].src || "adx-reel"} ref={videoRef} className="adx-video" src={scenes[activeScene].src || "/__mockup/videos/adx-hero-reel.mp4"} poster={scenes[activeScene].poster || "/__mockup/images/adx-hero-poster.jpg"} muted autoPlay={!reducedMotion} playsInline preload={scenes[activeScene].src ? "none" : "auto"} aria-label="Illustrative ADX montage with team, restaurants, resorts, life sciences, manufacturing, and technology footage" onLoadedMetadata={() => { const video = videoRef.current; if (!video) return; video.currentTime = scenes[activeScene].segment === undefined ? 0 : video.duration * (scenes[activeScene].segment / 5); }} onCanPlay={() => { if (!reducedMotion) videoRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }} onTimeUpdate={updateScene} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { if (scenes[activeScene].src) { setPlaying(false); setActiveScene(0); } else { if (videoRef.current) videoRef.current.currentTime = 0; setActiveScene(0); } }} />
          {!playing && <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-start justify-start px-4 pt-16 sm:items-center sm:justify-center sm:px-6 sm:pb-20 sm:pt-16">
            <div className="flex items-center gap-3 sm:gap-8">
              <div className="relative h-14 w-14 shrink-0 border border-white/20 sm:h-32 sm:w-32">
                <div className="absolute inset-2 border border-[#E8621A] sm:inset-5" />
                <div className="absolute inset-4 bg-[#1552C2] sm:inset-10" />
                <div className="absolute bottom-2 right-2 h-4 w-4 bg-[#E8621A] sm:bottom-5 sm:right-5 sm:h-8 sm:w-8" />
              </div>
              <div>
                <p className="adx-mono text-[7px] tracking-[.14em] text-white/55 sm:text-[9px] sm:tracking-[.16em]">THE WORK, IN SIX SCENES</p>
                <p className="mt-1 max-w-[220px] text-[15px] font-medium leading-[1.04] tracking-[-.045em] text-white sm:mt-2 sm:max-w-[260px] sm:text-3xl">Six frames.<br /><span className="text-[#F2ECE8]">One connected team.</span></p>
              </div>
            </div>
          </div>}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,32,.35),transparent_35%,rgba(8,16,32,.9))]" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3 sm:left-7 sm:right-7 sm:top-7">
            <span className="adx-mono text-[9px] tracking-[.15em] text-white/80">ADX, IN MOTION <span className="ml-2 text-[#E8621A]">/</span> {scenes[activeScene].tag}</span>
            <button onClick={toggleVideo} aria-label={playing ? "Pause hero video" : "Play hero video"} aria-pressed={playing} className="inline-flex min-h-10 shrink-0 items-center gap-2 border border-white/55 bg-[#081020]/70 px-3 text-[10px] font-medium !text-white backdrop-blur-sm transition hover:bg-white/10">{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? "Pause" : "Play reel"}</button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12 sm:px-7 sm:pb-7">
            <div className="mb-4 flex items-end justify-between gap-4 text-white"><div><div className="adx-mono text-[9px] tracking-[.13em] text-white/55">IN FOCUS</div><h2 className="mt-1 text-xl font-medium leading-tight tracking-[-.045em] sm:text-3xl">{scenes[activeScene].title}</h2></div><span className="adx-mono shrink-0 text-[10px] text-white/55">0{activeScene + 1} / 06</span></div>
            <div className="grid grid-cols-3 border-t border-white/30 sm:grid-cols-6">
              {scenes.map((scene, index) => <button key={scene.number} type="button" onClick={() => void selectScene(index)} aria-current={activeScene === index ? "step" : undefined} className="group min-h-[57px] border-r border-white/20 px-2 pt-3 text-left last:border-r-0 sm:px-3">
                 <span className={`adx-mono block text-[9px] tracking-[.1em] ${activeScene === index ? "text-[#E8621A]" : "text-white/45"}`}>{scene.number} <span className="text-white/30">/</span> 06</span>
                 <span className="mt-1 block text-[9px] font-medium leading-[1.25] text-white/80 transition group-hover:text-white sm:text-xs">{scene.title}</span>
              </button>)}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-x-5 gap-y-1 px-3 pt-2 text-[9px] leading-4 text-[#081020]/50 sm:px-6">
         <span>Six frames. One connected team.</span>
         <span className="shrink-0">Technology · growth · hospitality · industry</span>
      </div>
    </section>

    <section aria-label="Tools we work with" className="border-y border-[#081020]/10 bg-[#F2ECE8]"><div className="adx-container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="adx-mono text-[9px] tracking-[.15em] text-[#081020]/50">TOOLS WE BUILD ON</div><p className="mt-1 text-sm text-[#081020]/70">A connected toolkit, chosen for the job—not another stack to manage.</p></div><SiteLink to="/tools" onNavigate={navigate} className="adx-text-link">See every tool we use <ArrowUpRight size={14} /></SiteLink></div></section>

    <section id="steps" className="adx-section adx-container">
      <div className="grid gap-6 md:grid-cols-[1.05fr_.8fr] md:items-end"><div><Eyebrow>WHAT WE DO <span className="text-[#222]/35">/</span> FOUR CONNECTED CAPABILITIES</Eyebrow><h2 className="adx-heading">One partner across <span className="text-[#1552C2]">the systems and the story.</span></h2></div><p className="adx-copy max-w-[440px] md:justify-self-end">From secure infrastructure to useful digital experiences, ADX brings complementary teams of work together across U.S. and Jamaica markets.</p></div>
      <div className="mt-12 grid border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-4">{stepsFor.map(({ number, title, sub, copy, icon: Icon, links }) => <article key={number} className="group min-h-[306px] border-b border-[#081020]/15 py-6 pr-4 sm:px-4 lg:border-r lg:first:pl-0 lg:last:border-r-0"><div className="flex items-center justify-between"><span className="adx-mono text-[9px] tracking-[.13em] text-[#E8621A]">{number} <span className="text-[#081020]/30">/</span> {title}</span><span className="grid h-10 w-10 place-items-center border border-[#081020]/15 text-[#1552C2] transition group-hover:border-[#E8621A] group-hover:bg-[#E8621A] group-hover:text-white"><Icon size={17} /></span></div><h3 className="mt-7 text-[23px] font-medium leading-tight tracking-[-.04em]">{sub}</h3><p className="mt-3 min-h-[50px] max-w-[260px] text-sm leading-6 text-[#081020]/65">{copy}</p><div className="mt-5 space-y-1.5">{links.map(([link, path]) => <SiteLink key={link} to={path} onNavigate={navigate} className="flex min-h-7 w-fit items-center gap-2 text-xs font-medium text-[#081020]/75 hover:text-[#E8621A]">{link}<ArrowUpRight size={11} className="opacity-0 transition group-hover:opacity-100" /></SiteLink>)}</div></article>)}</div>
      <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-[#081020]/65">Start with one step or let us handle all four. Everything we build connects.</p><SiteLink to="/what-we-do" onNavigate={navigate} className="adx-text-link">See everything we do <ArrowRight size={14} /></SiteLink></div>
    </section>

      <section className="relative overflow-hidden bg-[#F2ECE8] py-16 sm:py-20"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 border border-[#1552C2]/15" /><div className="adx-container relative"><div className="grid gap-6 md:grid-cols-[1fr_.6fr] md:items-end"><div><Eyebrow>INDUSTRIES + AUDIENCES <span className="text-[#222]/35">/</span> U.S. + JAMAICA</Eyebrow><h2 className="adx-heading max-w-[700px]">Different worlds. Connected challenges.</h2></div><p className="adx-copy max-w-[370px] md:justify-self-end">Each numbered path includes a short view of the work, with deeper detail on its own page.</p></div>
      <div className="mt-10 grid gap-0 border-t border-[#081020]/15 sm:grid-cols-2 xl:grid-cols-3">{industryDirectory.map((item) => <SiteLink key={item.path} to={item.path} onNavigate={navigate} className="group grid min-h-[178px] grid-cols-[42px_1fr] gap-3 border-b border-[#081020]/15 py-5 sm:px-4"><span className="adx-mono pt-1 text-[10px] tracking-[.12em] text-[#E8621A]">{item.number}</span><span><span className="flex items-start justify-between gap-3 text-lg font-medium leading-tight tracking-[-.035em]"><span>{item.title}</span><ArrowUpRight size={15} className="mt-1 shrink-0 text-[#1552C2] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span><span className="mt-3 block max-w-[380px] text-sm leading-6 text-[#081020]/65">{item.blurb}</span></span></SiteLink>)}</div>
       <div className="mt-5 flex flex-col gap-2 border-t border-[#081020]/15 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between"><span className="text-[#081020]/65">ADX brings connected capabilities to each market.</span><SiteLink to="/contact" onNavigate={navigate} className="adx-text-link">Talk through your industry <ArrowRight size={14} /></SiteLink></div>
    </div></section>

      <section className="bg-[#081020] py-16 text-white sm:py-24"><div className="adx-container grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><Eyebrow light>HOW WE WORK</Eyebrow><h2 className="mt-5 max-w-[470px] text-4xl font-medium leading-[1.04] tracking-[-.055em] sm:text-5xl">One connected view.<br /><span className="text-[#E8621A]">Clear next steps.</span></h2><p className="mt-6 max-w-[360px] text-sm leading-7 text-white/65">Technology and digital experience work better when they are considered together, around the needs of your organization.</p></div><div className="grid sm:grid-cols-2">{[["01","Start with the context","Understand the organization, the people and what needs to happen next."],["02","Shape the right scope","Map a focused approach to the work and agree on next steps."],["03","Build alongside your team","Coordinate work with the people who will use and support it."],["04","Support the transition","Test, hand over and continue to support what we build."]].map(([n,title,body])=><div key={n} className="border-t border-white/20 py-5 sm:px-5"><div className="adx-mono text-[10px] tracking-[.14em] text-[#E8621A]">{n}</div><h3 className="mt-3 text-lg font-medium">{title}</h3><p className="mt-2 max-w-[270px] text-sm leading-6 text-white/60">{body}</p></div>)}</div></div></section>

     <section className="adx-section adx-container"><div className="grid gap-9 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><Eyebrow>MEET VICKI ANN <span className="text-[#222]/35">/</span> ALWAYS ON</Eyebrow><h2 className="adx-heading max-w-[480px]">The front desk that never clocks out.</h2><p className="adx-copy mt-5 max-w-[450px]">Vicki Ann answers your phone, texts and website chat around the clock—taking reservations, answering guest questions and handing over when someone needs a person.</p><div className="mt-7 flex flex-wrap gap-3"><SiteLink to="/vicki-ann" onNavigate={navigate} className="adx-action adx-action-dark px-5 text-white">Meet Vicki Ann <ArrowUpRight size={14} /></SiteLink><SiteLink to="/adx-surge" onNavigate={navigate} className="adx-text-link px-2">Explore ADX Surge <ArrowUpRight size={14} /></SiteLink></div><p className="adx-mono mt-7 text-[9px] tracking-[.14em] text-[#081020]/45">MADE FOR HOSPITALITY, NOT ANOTHER INBOX</p></div>
       <div className="relative border border-[#081020]/10 bg-[#F2ECE8] p-5 sm:p-8"><div className="mx-auto max-w-[470px] border border-[#081020]/10 bg-[#FBFAF9] p-5 sm:p-7"><div className="flex items-center justify-between gap-3 border-b border-[#081020]/10 pb-4"><div className="flex items-center gap-3"><img src="/__mockup/images/arrington-digital-vicki-ann-avatar.png" alt="Vicki Ann, the Surge AI front desk assistant" className="h-12 w-12 shrink-0 object-cover" /><div><div className="text-sm font-semibold">Vicki Ann</div><div className="text-[11px] text-[#081020]/55">Resort concierge · WhatsApp</div></div></div><span className="shrink-0 border border-[#E8621A]/35 px-2 py-1 text-[9px] text-[#081020]/55">SAMPLE CHAT</span></div><div className="mt-6 space-y-4 text-xs leading-5"><div className="ml-auto max-w-[82%] bg-[#1552C2] p-3.5 text-white">Can we move our 7pm dinner for four to Friday? Is the pool bar open late?</div><div className="flex max-w-[88%] items-start gap-2"><img src="/__mockup/images/arrington-digital-vicki-ann-avatar.png" alt="" className="h-7 w-7 shrink-0 object-cover" /><div className="border border-[#081020]/10 bg-[#F2ECE8] p-3.5">Of course — Friday has 6:45 or 7:30 for four. The pool bar is open until 11pm.</div></div><div className="ml-auto max-w-[70%] bg-[#1552C2] p-3.5 text-white">7:30 please!</div><div className="flex max-w-[88%] items-start gap-2"><img src="/__mockup/images/arrington-digital-vicki-ann-avatar.png" alt="" className="h-7 w-7 shrink-0 object-cover" /><div className="border border-[#081020]/10 bg-[#F2ECE8] p-3.5">You’re booked: Friday, 7:30pm, party of four. Confirmation is on its way.</div></div></div><div className="adx-mono mt-6 border-t border-[#081020]/10 pt-4 text-[9px] tracking-[.12em] text-[#081020]/45">ILLUSTRATIVE · CRM RECORD UPDATED BY VICKI ANN</div></div><div className="mt-4 flex items-center gap-2 text-[10px] text-[#081020]/55"><CalendarDays size={13} className="text-[#E8621A]" /> Phone · SMS · WhatsApp · web chat</div></div>
    </div></section>

    <section className="bg-[#F2ECE8] py-16 sm:py-20">
      <div className="adx-container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><Eyebrow>START HERE <span className="text-[#222]/35">/</span> CHOOSE A PATH</Eyebrow><h2 className="adx-heading">Where should we start?</h2></div>
          <p className="adx-copy max-w-[390px]">Bring us the question behind the work. We’ll help identify the right team and next move.</p>
        </div>
        <div className="mt-9 grid gap-0 border-t border-[#081020]/15 md:grid-cols-3">
          {[
            { id: "01", title: "Digital experience", label: "BRAND + WEB", copy: "Give your brand a clearer story and a more useful path from visit to enquiry.", path: "/websites" },
            { id: "02", title: "Growth systems", label: "MARKETING + CRM", copy: "Connect search, campaigns and follow-up around the people you need to reach.", path: "/digital-marketing" },
            { id: "03", title: "Connected operations", label: "PROPERTY + TEAM", copy: "Bring networks, operations tools and guest workflows into a more useful view.", path: "/adx-propertyengineering" },
          ].map((item) => <SiteLink to={item.path} onNavigate={navigate} key={item.id} className="group flex min-h-[225px] flex-col justify-between border-b border-[#081020]/15 py-5 pr-5 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
            <div className="flex justify-between"><span className="adx-mono text-[9px] tracking-[.14em] text-[#E8621A]">{item.label}</span><span className="adx-mono text-[10px] text-[#081020]/45">{item.id}</span></div>
            <div><h3 className="text-2xl font-medium tracking-[-.05em]">{item.title}</h3><p className="mt-2 max-w-[290px] text-sm leading-6 text-[#081020]/65">{item.copy}</p></div>
            <div className="flex items-center justify-between border-t border-[#081020]/15 pt-4 text-xs font-semibold"><span>Explore this capability</span><ArrowUpRight size={16} className="text-[#1552C2] transition group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
          </SiteLink>)}
        </div>
        <div className="mt-5 flex flex-col gap-2 border-t border-[#081020]/15 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between"><span className="text-[#081020]/65">Have a broader challenge in mind?</span><SiteLink to="/contact" onNavigate={navigate} className="adx-text-link">Talk with ADX <ArrowRight size={14} /></SiteLink></div>
      </div>
    </section>

       <section className="bg-[#F2ECE8] py-16 sm:py-20"><div className="adx-container"><Eyebrow>LOCAL CONTEXT, SHARED CAPABILITY</Eyebrow><div className="mt-5 grid gap-8 md:grid-cols-2"><article className="border-t-2 border-[#1552C2] pt-5"><div className="adx-mono text-[9px] tracking-[.15em] text-[#1552C2]">UNITED STATES</div><h2 className="mt-3 text-3xl font-medium tracking-[-.05em]">A U.S. home for connected work.</h2><p className="mt-3 max-w-[480px] text-sm leading-6 text-[#081020]/65">Meet Arrington Digital, LLC - USA: a Pennsylvania presence connecting engineering, data and digital experience.</p><SiteLink to="/adx-usa" onNavigate={navigate} className="adx-text-link mt-4">Explore Arrington Digital, LLC - USA <ArrowRight size={14} /></SiteLink></article><article className="border-t-2 border-[#E8621A] pt-5"><div className="adx-mono text-[9px] tracking-[.15em] text-[#E8621A]">JAMAICA</div><h2 className="mt-3 text-3xl font-medium tracking-[-.05em]">Local knowledge, island-wide.</h2><p className="mt-3 max-w-[480px] text-sm leading-6 text-[#081020]/65">Meet Arrington Digital Limited: Kingston roots, island-wide perspective, and local offers for hospitality, property and technology teams.</p><SiteLink to="/adx-jamaica" onNavigate={navigate} className="adx-text-link mt-4">Explore Arrington Digital Limited - Jamaica <ArrowRight size={14} /></SiteLink></article></div></div></section>
      <CTA />
  </>;
}

function USALandingPage({ navigate }: { navigate: (path: string) => void }) {
  const capabilities = [
    ["01", "Cloud & infrastructure", "Build dependable foundations for the systems your organization relies on.", "/enterprise"],
    ["02", "Cybersecurity & compliance", "Protect identities, information and access with a practical security approach.", "/enterprise"],
    ["03", "Data, AI & software", "Connect useful data, thoughtful AI and software shaped around real work.", "/enterprise"],
    ["04", "Marketing & digital experience", "Make every brand touchpoint easier to find, understand and act on.", "/what-we-do"],
  ];
  return <>
    <section className="px-3 pb-5 pt-3 sm:px-6 sm:pt-6">
      <div className="mx-auto max-w-[1520px]">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 px-1 text-[11px] text-[#081020]/55"><a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="hover:text-[#E8621A]">Home</a><span>/</span><span>Company</span><span>/</span><span className="text-[#081020]">Arrington Digital, LLC - USA</span></nav>
        <div className="grid overflow-hidden border border-[#081020]/15 bg-[#081020] lg:grid-cols-[.92fr_1.08fr]">
          <div className="relative flex min-h-[540px] flex-col justify-between overflow-hidden bg-[#E8621A] px-6 py-7 text-[#081020] sm:px-10 sm:py-10 lg:min-h-[660px] lg:px-12 lg:py-12">
            <div className="flex items-center justify-between gap-3 border-b border-[#081020]/25 pb-4"><Eyebrow>ARRINGTON DIGITAL, LLC <span className="text-[#081020]/40">/</span> USA</Eyebrow><span className="adx-mono shrink-0 whitespace-nowrap text-[9px] tracking-[.13em] text-[#081020]/55">01—04</span></div>
            <div className="relative py-9 lg:py-12">
              <p className="adx-mono mb-5 text-[9px] tracking-[.16em] text-[#081020]/60">PENNSYLVANIA · UNITED STATES · U.S. + JAMAICA</p>
              <h1 className="max-w-[700px] text-[clamp(2.8rem,5.2vw,5.1rem)] font-medium leading-[.94] tracking-[-.075em]">Technology and growth, <span className="text-[#FBFAF9]">connected for U.S. organizations.</span></h1>
              <p className="mt-6 max-w-[510px] text-[15px] leading-7 text-[#081020]/80">Arrington Digital, LLC brings cloud, security, data, software and marketing together for teams building, modernizing and growing across the United States.</p>
              <div className="mt-7 flex flex-col gap-3 min-[430px]:flex-row">
                <a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[50px] px-5">Talk with the U.S. team <ArrowUpRight size={15} /></a>
                <a href="#usa-industries" className="adx-action min-h-[50px] border border-[#081020]/45 px-5 text-[#081020] hover:border-[#081020] hover:bg-[#081020]/5">Explore U.S. industries <ArrowDown size={15} /></a>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#081020]/25 pt-4"><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/65"><MapPin size={12} className="mr-2 inline" />PENNSYLVANIA · USA</span><span className="text-[11px] text-[#081020]/65">One connected ADX team.</span></div>
          </div>
          <div className="relative min-h-[370px] overflow-hidden bg-[#101722] sm:min-h-[500px] lg:min-h-[660px]">
            <img src="/__mockup/images/arrington-digital-usa-hero-v2.png" alt="Illustrative U.S. team planning technology and marketing work together" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,32,.28),transparent_32%,rgba(8,16,32,.74))]" />
            <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3 sm:left-7 sm:right-7 sm:top-7"><span className="adx-mono text-[9px] tracking-[.15em] text-white/85">U.S. TEAM <span className="ml-2 text-[#E8621A]">/</span> CONNECTED CAPABILITIES</span><span className="adx-mono bg-[#081020]/65 px-2 py-1 text-[8px] tracking-[.12em] text-white/80">ILLUSTRATIVE</span></div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7"><p className="max-w-[320px] text-[13px] leading-5 text-white/85">Engineering, operations and digital experience in the same conversation.</p><span className="adx-mono text-[9px] text-white/65">ADX / USA</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className="adx-section adx-container">
      <div className="grid gap-6 md:grid-cols-[1.05fr_.8fr] md:items-end"><div><Eyebrow>U.S. DELIVERY <span className="text-[#222]/35">/</span> FOUR CONNECTED CAPABILITIES</Eyebrow><h2 className="adx-heading max-w-[680px]">Engineering, data and marketing—working in step.</h2></div><p className="adx-copy max-w-[440px] md:justify-self-end">Start with the need. Bring together the specialists and systems that can move it forward.</p></div>
      <div className="mt-10 grid border-t border-[#081020]/15 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map(([number, title, copy, path]) => <article key={number} className="flex min-h-[230px] flex-col justify-between border-b border-[#081020]/15 py-5 sm:px-5 lg:border-r lg:first:pl-0 lg:last:border-r-0"><div className="adx-mono text-[9px] tracking-[.13em] text-[#E8621A]">{number} / CAPABILITY</div><div><h3 className="text-xl font-medium leading-tight tracking-[-.035em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#081020]/65">{copy}</p></div><SiteLink to={path} onNavigate={navigate} className="adx-text-link mt-5">Explore capability <ArrowRight size={14} /></SiteLink></article>)}
      </div>
    </section>

    <section id="usa-industries" className="bg-[#F2ECE8] py-16 sm:py-20">
      <div className="adx-container">
        <div className="grid gap-6 md:grid-cols-[1fr_.6fr] md:items-end"><div><Eyebrow>U.S. INDUSTRIES <span className="text-[#222]/35">/</span> NUMBERED DIRECTORY</Eyebrow><h2 className="adx-heading mt-3 max-w-[700px]">Different work. One connected team.</h2></div><p className="adx-copy max-w-[390px] md:justify-self-end">The U.S. brief names life sciences, manufacturing, retail and CPG, and education as core areas of focus.</p></div>
        <div className="mt-9 grid gap-0 border-t border-[#081020]/15 sm:grid-cols-2">
          {industryDirectory.slice(0, 4).map((item) => <SiteLink key={item.path} to={item.path} onNavigate={navigate} className="group grid min-h-[190px] grid-cols-[52px_1fr] gap-4 border-b border-[#081020]/15 py-5 sm:px-5">
            <span className="adx-mono pt-1 text-[10px] tracking-[.12em] text-[#E8621A]">{item.number}</span>
            <span><span className="block text-xl font-medium leading-tight tracking-[-.035em]">{item.title}</span><span className="mt-3 block max-w-[520px] text-sm leading-6 text-[#081020]/65">{item.blurb}</span><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#1552C2]">Explore <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></span>
          </SiteLink>)}
        </div>
        <div className="mt-5 border-t border-[#081020]/15 pt-5 text-sm text-[#081020]/65">For property and hospitality teams, see <SiteLink to="/who-we-help/resorts-hotels-villas-real-estate" onNavigate={navigate} className="font-semibold text-[#1552C2] hover:text-[#E8621A]">Resorts, Hotels, Villas & Real Estate <ArrowRight size={13} className="inline" /></SiteLink>.</div>
      </div>
    </section>

    <section className="bg-[#081020] py-16 text-white sm:py-20">
      <div className="adx-container grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-start"><div><Eyebrow light>CONNECTED ACROSS MARKETS</Eyebrow><h2 className="mt-5 max-w-[500px] text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-5xl">One team. Local context.</h2><p className="mt-5 max-w-[420px] text-sm leading-7 text-white/60">The U.S. team works alongside colleagues in Jamaica, bringing shared technology and digital experience together with local knowledge.</p></div>
        <div className="grid border-t border-white/20 sm:grid-cols-2">
          <article className="border-b border-white/20 py-5 sm:pr-6"><span className="adx-mono text-[9px] tracking-[.14em] text-[#F0A24A]">UNITED STATES</span><h3 className="mt-3 text-xl font-medium">Arrington Digital, LLC - USA</h3><p className="mt-2 text-sm text-white/60">Pennsylvania, USA · technology, data and digital growth.</p></article>
          <article className="border-b border-white/20 py-5 sm:pl-6"><span className="adx-mono text-[9px] tracking-[.14em] text-[#F0A24A]">JAMAICA</span><h3 className="mt-3 text-xl font-medium">Arrington Digital Limited - Jamaica</h3><p className="mt-2 text-sm text-white/60">Kingston and island-wide context for hospitality, property and digital services.</p><SiteLink to="/adx-jamaica" onNavigate={navigate} className="adx-text-link mt-4 text-white">Explore Jamaica <ArrowRight size={14} /></SiteLink></article>
        </div>
      </div>
    </section>
    <CTA title="Start with your U.S. initiative." copy="Share the systems, customer experience or growth goal behind the work. We’ll help shape a practical next step." />
  </>;
}

function JamaicaLandingPage({ page, navigate }: { page: Page; navigate: (path: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const toggleFilm = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (videoError) {
      setVideoError(false);
      video.load();
    }
    if (video.paused) {
      setLoading(true);
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setLoading(false);
        setVideoError(true);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };
  return <>
    <section className="px-3 pb-5 pt-3 sm:px-6 sm:pt-6">
      <div className="mx-auto max-w-[1520px]">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 px-1 text-[11px] text-[#081020]/55"><a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="hover:text-[#E8621A]">Home</a><span>/</span><span className="text-[#081020]">Arrington Digital Limited - Jamaica</span></nav>
        <div className="grid overflow-hidden border border-[#081020]/15 bg-[#081020] lg:grid-cols-[.92fr_1.08fr]">
          <div className="relative flex min-h-[540px] flex-col justify-between overflow-hidden bg-[#E8621A] px-6 py-7 text-[#081020] sm:px-10 sm:py-10 lg:min-h-[660px] lg:px-12 lg:py-12">
            <div className="flex items-center justify-between gap-3 border-b border-[#081020]/25 pb-4"><Eyebrow>LOCAL COMPANY <span className="text-[#081020]/40">/</span> JAMAICA</Eyebrow><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/55">01—04</span></div>
            <div className="relative py-10 lg:py-12">
              <p className="adx-mono mb-5 text-[9px] tracking-[.16em] text-[#081020]/60">ARRINGTON DIGITAL LIMITED · KINGSTON · ISLAND-WIDE</p>
              <h1 className="max-w-[680px] text-[clamp(2.8rem,5vw,5.1rem)] font-medium leading-[.94] tracking-[-.075em]">Enterprise technology and growth, <span className="text-[#FBFAF9]">anchored in Jamaica.</span></h1>
              <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-[#081020]/80">Cloud infrastructure, cybersecurity, data & AI, and digital marketing—connected for business in Kingston, Montego Bay and across the island.</p>
              <div className="mt-7 flex flex-col gap-3 min-[430px]:flex-row">
                <a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-dark min-h-[50px] px-5">Talk to our Jamaica team <ArrowUpRight size={15} /></a>
                <a href="#jamaica-offers" className="adx-action min-h-[50px] border border-[#081020]/45 px-5 text-[#081020] hover:border-[#081020] hover:bg-[#081020]/5">Explore local services <ArrowDown size={15} /></a>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#081020]/25 pt-4"><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/65"><MapPin size={12} className="mr-2 inline" />KINGSTON · MONTEGO BAY · EVERY PARISH</span><span className="text-[11px] text-[#081020]/65">Local roots. Connected capability.</span></div>
          </div>
          <div className="relative min-h-[370px] overflow-hidden bg-[#101722] sm:min-h-[500px] lg:min-h-[660px]">
            <video ref={videoRef} src={JAMAICA_VIDEO} poster="/__mockup/images/arrington-digital-kingston-aerial.jpg" className="absolute inset-0 h-full w-full object-cover" muted playsInline preload="none" controls={playing} aria-label="Aerial video of Kingston, Jamaica" onPlaying={() => { setPlaying(true); setLoading(false); }} onPause={() => setPlaying(false)} onWaiting={() => setLoading(true)} onCanPlay={() => setLoading(false)} onEnded={() => setPlaying(false)} onError={() => { setVideoError(true); setLoading(false); setPlaying(false); }} />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,32,.48),transparent_35%,rgba(8,16,32,.72))]" />
            <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3 sm:left-7 sm:right-7 sm:top-7"><span className="adx-mono text-[9px] tracking-[.15em] text-white/85">KINGSTON, JAMAICA <span className="ml-2 text-[#E8621A]">/</span> ISLAND-WIDE</span><span className="adx-mono bg-[#081020]/65 px-2 py-1 text-[8px] tracking-[.12em] text-white/80">AERIAL FILM</span></div>
            {!playing && !videoError && <button type="button" onClick={() => void toggleFilm()} aria-label="Play the Kingston aerial video" className="absolute inset-0 grid place-items-center bg-[#081020]/10 !text-white transition hover:bg-[#081020]/20"><span className="flex min-h-14 items-center gap-3 border border-white/70 bg-[#081020]/70 px-5 text-xs font-semibold tracking-[.08em] !text-white backdrop-blur-sm">{loading ? <span className="h-4 w-4 animate-pulse border border-[#E8621A]" /> : <Play size={16} fill="currentColor" />}<span>{loading ? "LOADING JAMAICA FILM" : "PLAY JAMAICA IN MOTION"}</span></span></button>}
            {playing && <button type="button" onClick={() => void toggleFilm()} aria-label="Pause the Kingston aerial video" className="absolute right-5 top-16 inline-flex min-h-10 items-center gap-2 border border-white/60 bg-[#081020]/70 px-3 text-[10px] font-medium text-white backdrop-blur-sm sm:right-7 sm:top-20"><Pause size={13} />Pause film</button>}
            {videoError && <div role="status" className="absolute inset-x-5 bottom-16 border border-white/40 bg-[#081020]/85 p-4 text-white sm:inset-x-7"><p className="text-sm font-semibold">The Kingston film could not load.</p><button type="button" onClick={() => void toggleFilm()} className="mt-2 inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-[#F0A24A] hover:text-white">Try again <ArrowRight size={13} /></button></div>}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-[9px] text-white/70 sm:bottom-6 sm:left-7 sm:right-7"><span>Kingston aerial · Island-wide perspective</span><span className="adx-mono tracking-[.12em]">ADX / JAMAICA</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="jamaica-offers" className="bg-[#E8621A] px-5 py-14 text-[#081020] sm:py-16">
      <div className="adx-container grid gap-9 md:grid-cols-[.8fr_1.2fr] md:items-start">
        <div><Eyebrow>ARRINGTON DIGITAL LIMITED <span className="text-[#081020]/40">/</span> LOCAL DELIVERY</Eyebrow><h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-5xl">Local context.<br />Connected capability.</h2><p className="mt-5 max-w-[390px] text-sm leading-6 text-[#081020]/78">From Kingston and Montego Bay to every parish, Arrington Digital Limited connects local delivery with the wider ADX technology and marketing team.</p><div className="mt-7 border-t border-[#081020]/30 pt-4"><div className="adx-mono text-[9px] tracking-[.14em] text-[#081020]/60">KINGSTON OFFICE</div><p className="mt-2 text-sm">Level 9, 60 Knutsford Blvd<br />Kingston, Jamaica</p><p className="mt-3 text-sm">Island-wide work</p></div></div>
        <div className="grid gap-0 border-t border-[#081020]/30 sm:grid-cols-2">{[
          ["01","Property networks & engineering","Wifi, cabling, gate access, cameras and smart locks for developments and renovations.","/adx-propertyengineering"],
          ["02","Hospitality operations","ADX Surge for payroll, scheduling, hiring and property operations.","/adx-surge"],
          ["03","Guest experience","Vicki Ann, a 24/7 front desk assistant for phone, text, WhatsApp and web chat.","/vicki-ann"],
          ["04","Brand & digital growth","Websites, identity, social media, email, ads and search.","/what-we-do"],
        ].map(([number,title,copy,path])=><SiteLink key={path} to={path} onNavigate={navigate} className="group border-b border-[#081020]/30 py-5 sm:px-5"><span className="adx-mono text-[9px] tracking-[.13em] text-[#081020]/60">{number} / JAMAICA OFFER</span><h3 className="mt-3 text-xl font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-[#081020]/75">{copy}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold">Explore <ArrowRight size={13} /></span></SiteLink>)}</div>
      </div>
    </section>

     <section className="bg-[#F2ECE8] py-16 sm:py-20">
       <div className="adx-container">
         <div className="grid gap-5 md:grid-cols-[1fr_.6fr] md:items-end">
           <div><Eyebrow>JAMAICA <span className="text-[#222]/35">/</span> WHO WE SUPPORT</Eyebrow><h2 className="adx-heading mt-3 max-w-[720px]">Local businesses. Island-wide ambition.</h2></div>
            <p className="adx-copy max-w-[420px] md:justify-self-end">Property, hospitality and visitor experiences—each with a different operating rhythm, all supported by one connected team.</p>
         </div>
         <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {jamaicaPhotoStories.map((item) => <SiteLink key={item.path} to={item.path} onNavigate={navigate} className="group relative flex h-[320px] flex-col justify-between overflow-hidden bg-[#081020] !text-white sm:h-[360px]"><img src={item.src} alt={item.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,32,.38),rgba(8,16,32,.06)_40%,rgba(8,16,32,.88))]" /><div className="relative flex items-start justify-between p-5"><span className="adx-mono text-[9px] tracking-[.13em] text-white/80">{item.number} / JAMAICA MARKET</span><ArrowUpRight size={16} className="text-[#F0A24A] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div className="relative p-5"><span className="adx-mono text-[8px] tracking-[.12em] text-white/70">{item.tag}</span><span className="mt-2 block text-xl font-medium leading-tight tracking-[-.04em] text-white">{item.title}</span><span className="mt-2 block max-w-[330px] text-xs leading-5 text-white/80">{item.blurb}</span></div></SiteLink>)}
         </div>
       </div>
     </section>

    <section className="bg-[#081020] py-16 text-white sm:py-20"><div className="adx-container grid gap-8 md:grid-cols-[.64fr_1.36fr] md:items-center"><div className="relative mx-auto w-full max-w-[340px] overflow-hidden border border-white/15"><img src="/__mockup/images/arrington-digital-team-alexia.jpg" alt="Alexia Fulton, Founder and Managing Director" className="aspect-[4/5] w-full object-cover" /><div className="absolute bottom-0 inset-x-0 bg-[linear-gradient(transparent,rgba(8,16,32,.92))] p-5 pt-16"><span className="adx-mono text-[9px] tracking-[.14em] text-white/75">FOUNDER · JAMAICA</span><p className="mt-1 text-lg font-medium">Alexia Fulton</p></div></div><div><Eyebrow light>PERSONAL ROOTS <span className="text-white/35">/</span> JAMAICA</Eyebrow><blockquote className="mt-6 max-w-[760px] text-[clamp(1.8rem,4vw,3.7rem)] font-medium leading-[1.04] tracking-[-.055em]">“Jamaica isn’t a market we expanded into—it’s home.”</blockquote><p className="mt-5 max-w-[540px] text-sm leading-7 text-white/65">A personal connection sits behind the Jamaica practice: modernizing the systems local businesses rely on and opening doors for the next generation of Jamaican talent.</p><p className="adx-mono mt-6 text-[9px] tracking-[.14em] text-[#F0A24A]">ALEXIA FULTON · FOUNDER & MANAGING DIRECTOR</p></div></div></section>

    <section id="details" className="adx-section adx-container"><div className="grid gap-9 md:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>WHERE WE WORK <span className="text-[#222]/35">/</span> EVERY PARISH</Eyebrow><h2 className="adx-heading max-w-[500px]">Island-wide reach. Connected delivery.</h2><p className="adx-copy mt-5 max-w-[410px]">Local context shapes the work, while ADX capabilities connect technology, security, data and marketing across each location.</p></div><div className="border-t border-[#081020]/15">{(page.points || []).map((point, index) => <div key={point} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[#081020]/15 py-5"><span className="adx-mono pt-1 text-[10px] tracking-[.1em] text-[#E8621A]">0{index + 1}</span><p className="max-w-[660px] text-sm leading-6 text-[#081020]/75">{point}</p></div>)}</div></div></section>
    <CTA title="Build what Jamaica needs next." copy="Talk through the systems, customer experience or growth goals behind your next move." />
  </>;
}

function InteriorPage({ page, navigate }: { page: Page; navigate: (path: string) => void }) {
  const is404 = page.path === "/404";
  const isJamaica = page.path === "/adx-jamaica";
  const isUSA = page.path === "/adx-usa";
  if (page.path.startsWith("/legal/")) return <LegalLandingPage page={page} navigate={navigate} />;
  if (isUSA) return <USALandingPage navigate={navigate} />;
  if (isJamaica) return <JamaicaLandingPage page={page} navigate={navigate} />;
  if (page.path === "/adx-surge") return <SurgeLandingPage navigate={navigate} />;
  if (page.path === "/vicki-ann") return <VickiAnnLandingPage navigate={navigate} />;
  if (page.path === "/adx-launchiq") return <LaunchIQLandingPage navigate={navigate} />;
  const icon = page.group === "Connect" ? Wifi : page.group === "Run" || page.group === "Products" ? Cpu : page.group === "Brand" ? PanelsTopLeft : page.group === "Grow" ? Megaphone : page.group === "Audiences" ? Hotel : page.group === "Enterprise" ? ShieldCheck : Globe2;
  const Icon = icon;
  const visual = pageVisuals[page.path];
  const related = pages.filter((p) => p.group === page.group && p.path !== page.path && p.path !== "/our-work/client-slug").slice(0, 4);
  const detailHeading = is404
    ? "Find your next step."
    : page.path === "/our-work"
      ? "Proof comes after permission."
      : page.path === "/contact"
        ? "Talk directly with our team."
        : page.group === "Industries"
          ? `Technology for ${page.title.toLowerCase()}.`
          : page.group === "Audiences"
            ? "A better experience from first enquiry to next visit."
            : page.group === "Grow"
              ? "Make the right message easier to find."
              : page.group === "Company"
                ? "People and practice, connected."
                : page.group === "Enterprise"
                  ? "Foundations for complex organizations."
                  : "A practical next step, shaped around you.";
  return <>
    <section className="bg-[#081020] px-5 pb-8 pt-8 text-white sm:px-6 sm:pb-12 sm:pt-10">
      <div className="adx-container">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[11px] text-white/55"><a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="hover:text-white">Home</a><span>/</span><span className="text-white/85">{page.title}</span></nav>
        <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[.94fr_1.06fr]">
          <div className="relative flex min-h-[440px] flex-col justify-center px-5 py-10 sm:px-9 sm:py-12 lg:min-h-[580px]">
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 border-l border-white/[.04] lg:block" />
            <div className="relative z-10 max-w-[670px]">
              <Eyebrow light>{page.group.toUpperCase()} <span className="text-white/35">/</span> ARRINGTON DIGITAL</Eyebrow>
              <div className="mt-8 flex items-center gap-4"><span className="grid h-12 w-12 place-items-center border border-white/25 text-[#E8621A]"><Icon size={20} /></span><span className="adx-mono text-[9px] tracking-[.14em] text-white/45">UNITED STATES & JAMAICA</span></div>
              <h1 className="mt-6 text-[clamp(2.7rem,7vw,5.6rem)] font-medium leading-[.96] tracking-[-.07em]">{page.intro || page.title}</h1>
              {page.intro && page.title !== page.intro && <p className="mt-4 text-xl text-white/80">{page.title}</p>}
              <p className="mt-6 max-w-[620px] text-[15px] leading-7 text-white/75">{page.description}</p>
              <div className="mt-8 flex flex-wrap gap-3"><a href={CAL} target="_blank" rel="noreferrer" className="adx-action adx-action-primary">Book a call <ArrowUpRight size={15} /></a><a href="#details" className="adx-action adx-action-ghost">Explore this page <ArrowDown size={15} /></a></div>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden bg-[#121926] sm:min-h-[430px] lg:min-h-[580px]">
            {visual ? <img src={visual.src} alt={visual.alt} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(21,82,194,.28),transparent_55%,rgba(232,98,26,.16))]" />}
            {visual && <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,32,.18),transparent_36%,rgba(8,16,32,.76))]" />}
            {!visual && <div aria-hidden="true" className="absolute inset-8 border border-white/15 sm:inset-12"><div className="absolute inset-6 border border-[#E8621A]/55 sm:inset-10" /><div className="absolute right-0 top-0 h-16 w-16 translate-x-1/2 -translate-y-1/2 bg-[#1552C2] sm:h-24 sm:w-24" /></div>}
            <div className="absolute left-5 top-5 right-5 flex items-start justify-between gap-3 sm:left-7 sm:right-7 sm:top-7"><span className="adx-mono text-[9px] tracking-[.14em] text-white/80">{visual?.label || page.group.toUpperCase()}</span><span className="adx-mono text-[8px] tracking-[.12em] text-white/60">U.S. + JAMAICA</span></div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7"><p className="max-w-[280px] text-[13px] leading-5 text-white/85">Built around the systems and people behind the work.</p><span className="adx-mono text-[9px] text-white/55">ADX / 01</span></div>
          </div>
        </div>
      </div>
    </section>
    <section id="details" className="adx-section adx-container">
      <div className="grid gap-9 md:grid-cols-[.8fr_1.2fr]">
        <div>
          <Eyebrow>{page.group.toUpperCase()} <span className="text-[#222]/35">/</span> THE DETAILS</Eyebrow>
          <h2 className="adx-heading max-w-[500px]">{detailHeading}</h2>
          <p className="adx-copy mt-5 max-w-[410px]">{page.path === "/our-work" ? "Case studies stay hidden until the client, details and permission are confirmed. No results or client names are invented here." : page.path === "/contact" ? "No contact form. Choose a direct route to the team and keep your details with you." : page.group === "Industries" ? `Explore the connected capabilities that can support ${page.title.toLowerCase()} organizations.` : "Start with context, then choose the services and people that fit the work."}</p>
          {page.path === "/contact" && <div className="mt-7 flex flex-col items-start gap-2"><a className="adx-text-link" href={CAL} target="_blank" rel="noreferrer">Schedule an introduction <ArrowUpRight size={14} /></a><a className="adx-text-link" href={`mailto:${EMAIL}`}><Mail size={14} />{EMAIL}</a></div>}
        </div>
        <div className="border-t border-[#081020]/15">{(page.points || []).map((point, index) => <div key={point} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[#081020]/15 py-5"><span className="adx-mono pt-1 text-[10px] tracking-[.1em] text-[#E8621A]">0{index + 1}</span><p className="max-w-[660px] text-sm leading-6 text-[#081020]/75">{point}</p></div>)}</div>
      </div>
    </section>
    {page.path === "/about" && <section className="bg-[#081020] py-16 text-white sm:py-20"><div className="adx-container"><div className="grid gap-5 md:grid-cols-[1fr_.62fr] md:items-end"><div><Eyebrow light>MEET THE MINDS BEHIND ADX</Eyebrow><h2 className="mt-4 max-w-[700px] text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-5xl">People behind the systems.</h2></div><p className="max-w-[430px] text-sm leading-6 text-white/65 md:justify-self-end">Technology, operations, growth and digital experience come together through the people who deliver the work.</p></div><div className="mt-10 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">{teamMembers.map((member) => <article key={member.name} className="group bg-[#081020] p-3 sm:p-4"><div className="overflow-hidden bg-[#F2ECE8]"><img src={member.src} alt={member.name} loading="lazy" className="aspect-[4/4.7] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div><div className="pt-4"><h3 className="text-lg font-medium tracking-[-.025em]">{member.name}</h3><p className="mt-1 min-h-10 text-xs leading-5 text-white/55">{member.role}</p></div></article>)}</div></div></section>}
    {page.path === "/careers" && <>
      <section className="bg-[#F2ECE8] py-14 sm:py-16">
        <div className="adx-container grid gap-7 md:grid-cols-[.78fr_1.22fr] md:items-end">
          <div><Eyebrow>OPEN ROLES <span className="text-[#222]/35">/</span> WORK WORTH DOING</Eyebrow><h2 className="adx-heading mt-4 max-w-[500px]">We don’t hire to fill seats.</h2></div>
          <div className="max-w-[640px] md:justify-self-end"><p className="adx-copy">When we open a role, it’s because the work demands it. Check back or send your résumé—we keep strong candidates on file.</p><a href={`mailto:${EMAIL}?subject=Careers%20at%20Arrington%20Digital`} className="adx-text-link mt-5">Send your résumé <ArrowUpRight size={14} /></a></div>
        </div>
      </section>
      <section className="bg-[#F2ECE8] py-16 sm:py-20">
        <div className="adx-container">
          <div className="grid gap-6 md:grid-cols-[.82fr_1.18fr] md:items-end">
            <div><Eyebrow>TEAM STORIES <span className="text-[#222]/35">/</span> THE PEOPLE WHO BUILD IT</Eyebrow><h2 className="adx-heading mt-4 max-w-[570px]">Ambition, met with room to grow.</h2></div>
            <p className="adx-copy max-w-[470px] md:justify-self-end">From solving complex enterprise challenges to seeing client results in real time, hear from the people who make the work happen every day.</p>
          </div>
          <div className="mt-9 grid gap-x-7 gap-y-10 border-t border-[#081020]/15 pt-6 lg:grid-cols-2">
            {employeeStories.map((story) => <article key={story.name} className="grid grid-cols-[88px_1fr] gap-4 sm:grid-cols-[120px_1fr] sm:gap-5">
              <img src={story.src} alt={story.alt} loading="lazy" className="aspect-[4/4.5] w-full object-cover" />
              <div className="flex min-h-full flex-col">
                <span className="adx-mono text-[9px] tracking-[.14em] text-[#1552C2]">A NOTE FROM THE TEAM</span>
                <blockquote className="mt-3 flex-1 text-[13px] leading-6 text-[#081020]/75">“{story.quote}”</blockquote>
                <div className="mt-5 border-t border-[#081020]/15 pt-3"><p className="text-sm font-semibold">{story.name}</p><p className="mt-1 text-[11px] text-[#081020]/55">{story.role}</p></div>
              </div>
            </article>)}
          </div>
        </div>
      </section>
      <section className="bg-[#081020] py-16 text-white sm:py-20">
        <div className="adx-container">
          <div className="grid gap-8 md:grid-cols-[.72fr_1.28fr] md:items-start">
            <div><Eyebrow light>HOW WE WORK</Eyebrow><h2 className="mt-4 max-w-[440px] text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-5xl">We invest in the people who build this.</h2><p className="mt-5 max-w-[390px] text-sm leading-7 text-white/60">Arrington Digital is remote-first, built on autonomy, trust and performance. Our culture is the standard behind every decision, deliverable and interaction.</p></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Innovation", "We continuously evolve our capabilities to stay ahead of market demands—across every industry and market we serve."],
                ["Integration", "We believe in unified solutions over fragmented vendor relationships: one team across cloud, security, data, AI and marketing."],
                ["Excellence", "Every solution gets the time and consideration needed to be genuinely best in class and personal to the business."],
                ["Transparency", "We operate with clarity and honesty. Clients know where things stand and can trust every decision."],
                ["Partnership", "We measure success by client success, showing up on day one as we do in year three and across every border."],
              ].map(([title, copy]) => <article key={title} className="min-h-[145px] border border-white/15 p-5"><span className="adx-mono text-[9px] tracking-[.13em] text-[#F0A24A]">ADX VALUE</span><h3 className="mt-4 text-lg font-medium">{title}</h3><p className="mt-2 text-xs leading-5 text-white/55">{copy}</p></article>)}
            </div>
          </div>
          <div className="mt-12 border-t border-white/15 pt-6"><Eyebrow light>BENEFITS <span className="text-white/35">/</span> BUILT FOR GOOD WORK</Eyebrow><h3 className="mt-3 text-2xl font-medium tracking-[-.04em]">Room to do great work—and live well.</h3>
            <div className="mt-6 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["REWARD + RECOGNITION", ["Competitive salary", "Annual performance bonuses", "Referral bonus"]],
                ["FLEXIBILITY AT WORK", ["Flexible hours", "Work from anywhere in the world", "Flexible PTO", "Paid company holidays"]],
                ["HEALTH + WELLBEING", ["Health, dental + vision coverage", "Mental health programs and support", "Paid parental leave for every parent"]],
                ["LEARNING + GROWTH", ["Annual learning stipend", "Training and conferences", "Career development opportunities"]],
              ].map(([label, benefits]) => <article key={label as string} className="min-h-[180px] bg-[#081020] p-5"><span className="adx-mono text-[9px] tracking-[.13em] text-[#F0A24A]">{label as string}</span><ul className="mt-4 space-y-2 text-xs leading-5 text-white/65">{(benefits as string[]).map((benefit) => <li key={benefit} className="flex gap-2"><span className="text-[#E8621A]">—</span><span>{benefit}</span></li>)}</ul></article>)}
            </div>
          </div>
        </div>
      </section>
    </>}
    {related.length > 0 && <section className="bg-[#F2ECE8] py-14"><div className="adx-container"><Eyebrow>KEEP EXPLORING <span className="text-[#222]/35">/</span> {page.group.toUpperCase()}</Eyebrow><div className="mt-7 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <SiteLink key={r.path} to={r.path} onNavigate={navigate} className="adx-page-card"><span className="adx-mono text-[9px] tracking-[.12em] text-[#E8621A]">{r.group.toUpperCase()}</span><span><span className="block text-lg font-medium tracking-[-.03em]">{r.title}</span><span className="mt-2 block text-xs leading-5 text-[#081020]/60">{r.description}</span></span><span className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#1552C2]">Explore <ArrowRight size={13} /></span></SiteLink>)}</div></div></section>}
     <CTA title={page.path === "/contact" ? "Talk through what comes next." : page.path === "/careers" ? "Build something that actually matters." : undefined} copy={page.path === "/contact" ? "Schedule an introduction or email the team directly. No form, no pressure." : page.path === "/careers" ? "Interested in future opportunities? Send us your résumé and tell us what kind of work you want to do." : undefined} />
  </>;
}

export function Homepage() {
  const [location, setLocation] = useLocation();
  const path = resolveLegacyPath(location);
  const [searchOpen, setSearchOpen] = useState(false);
  const [top, setTop] = useState(true);
  const navigate = (nextPath: string) => {
    const resolvedPath = resolveLegacyPath(nextPath);
    const known = pages.some((p) => p.path === resolvedPath);
    const finalPath = known ? resolvedPath : "/404";
    setLocation(finalPath);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  useEffect(() => {
    if (location === "/start-a-conversation") setLocation("/contact", { replace: true });
  }, [location, setLocation]);
  useEffect(() => {
    const scroll = () => setTop(window.scrollY < 24);
    const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("keydown", key); };
  }, []);
  const page = pages.find((p) => p.path === path) || pages.find((p) => p.path === "/404")!;
  const home = path === "/";
  useEffect(() => {
    document.title = page.title === "Home" ? "Arrington Digital | Technology & Digital Experience" : page.path === "/adx-jamaica" ? "Arrington Digital Limited | Jamaica" : `${page.title} | Arrington Digital`;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement("meta"); description.setAttribute("name", "description"); document.head.appendChild(description); }
    description.setAttribute("content", page.description.slice(0, 155));
    const origin = (import.meta.env.VITE_CANONICAL_ORIGIN || "https://arringtondx.com").replace(/\/$/, "");
    const canonicalUrl = `${origin}${page.path === "/" ? "" : page.path}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
    const setMeta = (selector: string, attribute: string, value: string) => {
      let meta = document.querySelector<HTMLMetaElement>(selector);
      if (!meta) { meta = document.createElement("meta"); document.head.appendChild(meta); }
      meta.setAttribute(attribute, value);
    };
    setMeta('meta[property="og:title"]', "content", document.title);
    setMeta('meta[property="og:description"]', "content", page.description.slice(0, 155));
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "content", document.title);
    setMeta('meta[name="twitter:description"]', "content", page.description.slice(0, 155));
  }, [page]);
  return <main className="adx-home min-h-[100dvh] overflow-x-clip">
    <Header navigate={navigate} onSearch={() => setSearchOpen(true)} />
    {home ? <HomePage navigate={navigate} /> : <InteriorPage page={page} navigate={navigate} />}
    <Footer navigate={navigate} />
    {!top && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center border border-white/20 bg-[#081020] text-white shadow-lg transition hover:bg-[#1552C2]"><ArrowDown size={16} className="rotate-180" /></button>}
    {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} navigate={navigate} />}
  </main>;
}
