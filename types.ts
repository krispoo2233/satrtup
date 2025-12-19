
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface BrickData {
  name: string;
  durability: number;
  ecoScore: number;
  thermalInsulation: number;
  cost: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface CustomBrick {
  coffee: number;
  palm: number;
  pressure: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  affiliation: string;
}

export interface ProcedureStep {
  id: number;
  title: string;
  description: string;
  image: string;
  technicalNote: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  type: string;
}
