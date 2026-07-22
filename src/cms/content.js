// Centralized content source for local development.
// Replace with real CMS fetching later.

import LogoCompany from '../assets/CompanyLogo.png';

export const header = {
  brand: {
    logoAccent: 'Q',
    logoText: 'Qoyy Global',
  },
  navLinks: [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Our Service' },
    { path: '/clients', label: 'Our Client' },
    { path: '/info', label: 'Quick Info' },
    { path: '/contact', label: 'Contact Us' },
  ],
};

export const footer = {
  companyName: 'Qoyy',
  tagline: 'Your trusted partner for innovative solutions and exceptional service.',
  contact: {
    address: '123 Business Street, City, State 12345',
    phone: '(555) 123-4567',
    email: 'info@qoyy.com',
  },
  quickLinks: [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Our Service' },
    { path: '/clients', label: 'Our Client' },
    { path: '/info', label: 'Quick Info' },
    { path: '/contact', label: 'Contact Us' },
  ],
  socials: [
    { name: 'facebook', href: '#' },
    { name: 'github', href: '#' },
    { name: 'twitter', href: '#' },
    { name: 'linkedin', href: '#' },
    { name: 'youtube', href: '#' },
  ],
  cta: {
    label: 'Get a Quote',
    href: '#',
  },
  copyright: 'COPYRIGHT Ⓒ 2025 QOYY GLOBAL (002857086-D)‍\nAll rights reserved.',
};

export const home = {
  seo: {
    title: 'Qoyy Global - Marketing Made Simple',
    description: 'Marketing made simple, all under one roof. Qoyy Global provides innovative solutions for your business.',
  },
  hero: {
    backgroundImage:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2074&q=80',
    title1: 'MARKETING MADE SIMPLE',
    title2: 'ALL UNDER ONE ROOF',
  },
};

export const about = {
  seo: {
    title: 'About Us - Qoyy Global',
    description:
      "Creative impact, measurable results. Learn about Qoyy Global's journey of growth built on shared successes.",
  },
  heading: 'CREATIVE IMPACT, MEASURABLE RESULTS',
  paragraphs: [
    'Established in 2018 and based in Kuala Lumpur, we are an integrated marketing agency delivering end-to-end solutions across digital, creative, media, events, and print. With a growing team of 15 passionate professionals, we proudly serve over 20 retained government clients and 10 corporate brands.',
  ],
  approach: {
    title: 'Our Approach',
    items: [
      { label: 'Strategic Planning', note: 'Data-driven insights and market analysis' },
      { label: 'Creative Excellence', note: 'Innovative design and compelling content' },
      { label: 'Measurable Results', note: 'ROI-focused campaigns and analytics' },
      { label: 'Client Partnership', note: 'Long-term relationships and collaboration' },
    ],
  },
  teamImage:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2071&q=80',
  quote:
    '"OUR JOURNEY OF GROWTH IS BUILT ON SHARED SUCCESSES WITH THOSE WE SERVE."',
};

export const services = {
  seo: {
    title: 'Our Service - Qoyy Global',
    description:
      'Solutions that drive brands forward. Media monitoring and public relations services that keep your brand informed, relevant, and strategically visible.',
  },
  heading: 'SOLUTIONS THAT DRIVE BRANDS FORWARD',
  focusTitle: 'MEDIA MONITORING & PUBLIC RELATIONS',
  focusLead:
    'We help brands stay informed, relevant, and strategically visible across all media platforms. Our comprehensive media monitoring and public relations services ensure your brand narrative is aligned, amplified, and protected.',
  cards: [
    {
      icon: '📊',
      title: 'Media Monitoring',
      description:
        'Real-time tracking of brand mentions, sentiment analysis, and competitive intelligence across all media channels.',
      features: ['24/7 brand monitoring', 'Sentiment analysis', 'Crisis detection', 'Competitive insights'],
    },
    {
      icon: '📰',
      title: 'Public Relations',
      description:
        'Strategic PR campaigns that build brand reputation, manage crises, and create positive media coverage.',
      features: ['Press release distribution', 'Media relations', 'Crisis management', 'Event PR'],
    },
    {
      icon: '🎯',
      title: 'Strategic Communication',
      description:
        'Comprehensive communication strategies that align with your business objectives and target audience.',
      features: ['Message development', 'Stakeholder engagement', 'Content strategy', 'Brand positioning'],
    },
    {
      icon: '📈',
      title: 'Digital PR',
      description:
        'Online reputation management and digital media strategies for the modern digital landscape.',
      features: ['Online reputation management', 'Social media PR', 'Influencer partnerships', 'Digital crisis management'],
    },
    {
      icon: '📋',
      title: 'Reporting & Analytics',
      description:
        'Comprehensive reporting and analytics to measure the impact and ROI of your PR campaigns.',
      features: ['Monthly reports', 'ROI measurement', 'Performance tracking', 'Strategic insights'],
    },
    {
      icon: '🤝',
      title: 'Government Relations',
      description:
        'Specialized PR services for government agencies and public sector organizations.',
      features: ['Public affairs', 'Policy communication', 'Stakeholder engagement', 'Crisis communication'],
    },
  ],
  cta: {
    title: 'Ready to Elevate Your Brand?',
    lead: "Let's discuss how our media monitoring and public relations services can drive your brand forward.",
    button: { label: 'Get Started Today', href: '/contact' },
  },
};

export const info = {
  seo: {
    title: 'Quick Info - Qoyy Global',
    description:
      'Answers for every question. Explore our services, process, and support for your marketing and creative needs.',
  },
  heading: 'ANSWERS FOR EVERY QUESTION',
  lead: 'Explore our services, process, and support for your marketing and creative needs.',
  faqs: [
    {
      question: 'Which services are available?',
      answer:
        'We offer comprehensive media monitoring and public relations services including real-time brand monitoring, sentiment analysis, crisis management, press release distribution, media relations, strategic communication, digital PR, and government relations. Our services are tailored to meet the specific needs of government agencies and corporate brands across various industries.',
    },
    {
      question: 'Who do you usually work with?',
      answer:
        'Our client base includes government agencies, corporate brands, and organizations across various sectors. We have extensive experience working with both public and private sector clients, understanding the unique challenges and opportunities that each sector presents. Our team is equipped to handle projects of all sizes, from small businesses to large multinational corporations.',
    },
    {
      question: 'How fast is project delivery?',
      answer:
        'Project timelines vary depending on complexity and scope. Media monitoring services can be implemented within 24-48 hours, while comprehensive PR campaigns typically take 2-4 weeks to develop and launch. Crisis management responses are immediate, with 24/7 support available. We provide detailed timelines during our initial consultation and maintain regular communication throughout the project lifecycle.',
    },
    {
      question: 'How can I get a proposal?',
      answer:
        'Getting a proposal is simple. You can contact us via WhatsApp for quick responses or email for detailed discussions. We\'ll schedule a consultation to understand your specific needs, challenges, and objectives. Based on this discussion, we\'ll provide a comprehensive proposal including strategy, timeline, deliverables, and investment. Our proposals are detailed and transparent, with no hidden costs.',
    },
  ],
  process: {
    title: 'Our Process',
    steps: [
      { num: '1.', label: 'Discovery & Analysis', note: 'Understanding your needs and market position' },
      { num: '2.', label: 'Strategy Development', note: 'Creating tailored solutions and approaches' },
      { num: '3.', label: 'Implementation', note: 'Executing campaigns and monitoring results' },
      { num: '4.', label: 'Optimization', note: 'Continuous improvement and performance tracking' },
    ],
  },
  whyUs: {
    title: 'Why Choose Us',
    points: [
      { label: 'Proven Track Record', note: 'Success with government and corporate clients' },
      { label: '24/7 Support', note: 'Round-the-clock crisis management' },
      { label: 'Transparent Reporting', note: 'Clear metrics and ROI measurement' },
      { label: 'Custom Solutions', note: 'Tailored strategies for your specific needs' },
    ],
  },
};

export const contact = {
  seo: {
    title: 'Contact Us - Qoyy Global',
    description:
      "Reach out for projects or possibilities. Let's build something great together with Qoyy Global.",
  },
  heading: 'Reach Out For Projects Or Possibilities.',
  subheading: "LET'S Build Something Great Together",
  lead:
    "Whether you're looking for a trusted partner for your next campaign or exploring new career opportunities, we’d love to hear from you. Drop us a message for collaborations, marketing solutions, or to join our growing team.",
  buttons: {
    whatsapp: { label: '📱 CONTACT US VIA WHATSAPP', href: 'https://wa.me/15551234567' },
    email: { label: '✉️ CONTACT US VIA EMAIL', href: 'mailto:info@qoyy.com' },
  },
  info: {
    addressLines: ['123 Business Street', 'City, State 12345'],
    phone: '(555) 123-4567',
    email: 'info@qoyy.com',
    hours: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
  },
  offers: [
    { label: 'Partnerships', note: 'Collaborative opportunities for mutual growth' },
    { label: 'Career Opportunities', note: 'Join our dynamic team of professionals' },
    { label: 'Collaborations', note: 'Creative partnerships and joint ventures' },
    { label: 'Team Building', note: 'Become part of our growing family' },
  ],
  bottomCta: {
    title: 'Ready to Start Your Journey?',
    lead:
      "Don't wait to begin building something great. Contact us today and let's discuss how we can help you achieve your goals and create lasting impact.",
    buttons: [
      { label: 'Start a Conversation', href: 'https://wa.me/15551234567', primary: true },
      { label: 'Send us an Email', href: 'mailto:info@qoyy.com', primary: false },
    ],
  },
};

export const clients = {
  seo: {
    title: 'Our Client - Fource Technologies',
    description:
      'Partners and brands we serve across open government initiatives and private sector projects.',
  },
  heading: 'TRUSTED BY LEADING ORGANISATIONS',
  lead:
    'We are proud to collaborate with government agencies and corporate brands on campaigns that deliver measurable impact.',
  openProjects: {
    title: 'Open Projects',
    description:
      'Public-sector and openly published initiatives where our work supports transparency and community reach.',
    clients: [
      {
        clientName: 'Ministry of Digital',
        description: 'National digital outreach',
        logo: LogoCompany,
      },
      { clientName: 'City Council KL', description: 'Urban engagement campaign' },
      { clientName: 'Tourism Board', description: 'Destination branding' },
      { clientName: 'Education Agency', description: 'Awareness & enrollment' },
      { clientName: 'Health Department', description: 'Public health communications' },
      { clientName: 'Transport Authority', description: 'Service launch PR' },
    ],
  },
  privateProjects: {
    title: 'Private Projects',
    description:
      'Confidential brand and corporate engagements delivered under NDA with full strategic support.',
    clients: [
      { clientName: 'Retail Group', description: 'Seasonal brand activation' },
      { clientName: 'Fintech Startup', description: 'Product launch & media' },
      { clientName: 'Property Developer', description: 'Luxury residential launch' },
      { clientName: 'F&B Chain', description: 'Multi-outlet campaign' },
      {
        clientName: 'Tech Enterprise',
        description: 'B2B thought leadership',
        logo: LogoCompany,
      },
      { clientName: 'Automotive Brand', description: 'Showroom & digital PR' },
    ],
  },
};

export default { header, footer, home, about, services, info, contact, clients };


