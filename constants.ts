
import { TeamMember, BrickData, Product, Testimonial, ProcedureStep, Partner } from './types';

export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Amri Naziha",
    role: "Lead Materials Scientist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Ph.D. in Sustainable Engineering, specializing in bio-composite materials."
  },
  {
    id: 2,
    name: "Pr. Habachi Wafa",
    role: "Chief Architect",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Visionary designer focused on integrating organic textures into urban environments."
  },
  {
    id: 3,
    name: "Dr. Benzerara Mohammed",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Former logistics expert now driving the coffee-waste collection network across Annaba."
  },
  {
    id: 4,
    name: "Et. Mansouri Abderrahman",
    role: "Sustainability Auditor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Expert in LCA (Life Cycle Assessment) ensuring our carbon-negative footprint remains verified."
  },
  {
    id: 5,
    name: "Et. Boumzaoute Zineddine",
    role: "R&D Engineer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Focusing on thermal insulation optimization using nano-cellular coffee structures."
  },
  {
    id: 6,
    name: "Et. Lekouaght Abdelhamid",
    role: "Community Liaison",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Connecting Annaba's local café industry with our sustainable manufacturing chain."
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'eco-std-01',
    name: 'Espresso Core Standard',
    description: 'Our flagship brick made from 70% dark roast waste and palm fiber binding.',
    price: '', // Removed price
    image: 'https://images.unsplash.com/photo-1518112391480-98feec058ec3?q=80&w=800&h=600&auto=format&fit=crop',
    features: ['High Thermal Mass', 'Moisture Resistant', 'Carbon Negative']
  },
  {
    id: 'palm-lite-02',
    name: 'Sahara Palm Acoustic',
    description: 'Ultra-lightweight bricks designed for interior partitioning and sound dampening.',
    price: '', // Removed price
    image: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c1?q=80&w=800&h=600&auto=format&fit=crop',
    features: ['Sound Absorption', 'Lightweight', 'Natural Texture']
  },
  {
    id: 'vulcan-ext-03',
    name: 'Vulcan Exterior Bloom',
    description: 'Reinforced exterior bricks with a protective mineral glaze for extreme weather.',
    price: '', // Removed price
    image: 'https://images.unsplash.com/photo-1590059132212-f733cb588d07?q=80&w=800&h=600&auto=format&fit=crop',
    features: ['UV Resistant', 'Structural Load-Bearing', 'Self-Cleaning']
  }
];

export const BRICK_COMPARISON: BrickData[] = [
  { name: 'Traditional Clay', durability: 75, ecoScore: 20, thermalInsulation: 45, cost: 50 },
  { name: 'EcoloBrick', durability: 92, ecoScore: 98, thermalInsulation: 88, cost: 42 },
  { name: 'Concrete Block', durability: 85, ecoScore: 10, thermalInsulation: 30, cost: 55 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "The structural integrity of their palm-fiber binder sets a new standard for sustainable materials in North Africa. A breakthrough in bio-composite engineering.",
    author: "Dr. Ahmed Rahmani",
    affiliation: "Research Director, CRTI"
  },
  {
    id: 2,
    quote: "Integrating EcoloBrick into our latest eco-resort project in Annaba allowed us to achieve passive cooling goals that were previously impossible with traditional clay.",
    author: "Nadia Sellami",
    affiliation: "Principal Architect, GreenUrban Algiers"
  },
  {
    id: 3,
    quote: "A perfect synergy of ancestral materials and modern molecular science. Their commitment to zero-waste manufacturing is truly inspiring for the next generation of engineers.",
    author: "Prof. Malik Belkaïd",
    affiliation: "University of Annaba, Dept. of Civil Engineering"
  }
];

export const PROCEDURE_STEPS: ProcedureStep[] = [
  {
    id: 1,
    title: "Urban Harvest",
    description: "Daily collection of spent coffee grounds from Annaba's artisanal roasters and palm leaves from sustainable regional plantations.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop",
    technicalNote: "Raw material validation at 12.5% moisture content."
  },
  {
    id: 2,
    title: "Molecular Crushing",
    description: "The waste is dehydrated and pulverized into a micron-level substrate, increasing the surface area for optimal bonding.",
    image: "https://images.unsplash.com/photo-1555529731-118a5bb67af7?q=80&w=1200&auto=format&fit=crop",
    technicalNote: "Processed in low-energy mechanical mills."
  },
  {
    id: 3,
    title: "Bio-Fiber Integration",
    description: "Palm leaves are chemically stripped to extract long-chain cellulose fibers, which act as the 'rebar' within the coffee matrix.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=1200&auto=format&fit=crop",
    technicalNote: "Natural resin additives derived from vegetable oils."
  },
  {
    id: 4,
    title: "Hydraulic Forging",
    description: "The composite is injected into high-pressure molds where 250 tons of hydraulic force creates the primary molecular bond.",
    image: "https://images.unsplash.com/photo-1536831107507-67ad1332cb5f?q=80&w=1200&auto=format&fit=crop",
    technicalNote: "Zero-heat, high-pressure cold forging process."
  },
  {
    id: 5,
    title: "Atmospheric Curing",
    description: "Bricks are set in solar-passive chambers for 21 days, allowing the bio-polymers to harden into a stone-like density.",
    image: "https://images.unsplash.com/photo-1516594709413-e9395a4b665d?q=80&w=1200&auto=format&fit=crop",
    technicalNote: "Saves 95% energy vs. traditional kiln firing."
  }
];

export const PARTNERS: Partner[] = [
  {
    id: 1,
    name: "Université Badji Mokhtar Annaba",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3a/Badji_Mokhtar_Annaba_University_Logo.png",
    type: "Academic Partner"
  },
  {
    id: 2,
    name: "CRTI Algeria",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Logo_CRTI.png/220px-Logo_CRTI.png",
    type: "Industrial Research"
  },
  {
    id: 3,
    name: "GreenUrban Algiers",
    logo: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=100&h=100&auto=format&fit=crop",
    type: "Architectural Firm"
  },
  {
    id: 4,
    name: "Algerian Ministry of Environment",
    logo: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=100&h=100&auto=format&fit=crop",
    type: "Strategic Endorsement"
  },
  {
    id: 5,
    name: "Global Bio-Materials Council",
    logo: "https://images.unsplash.com/photo-1506452819137-0422416856b8?q=80&w=100&h=100&auto=format&fit=crop",
    type: "Certification Body"
  }
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://instagram.com/ecolobrick', icon: 'IG' },
  { name: 'Facebook', url: 'https://facebook.com/ecolobrick', icon: 'FB' },
  { name: 'X', url: 'https://x.com/ecolobrick', icon: 'X' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/ecolobrick', icon: 'LN' }
];
