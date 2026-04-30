export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  githubUrl?: string;
  gradient: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0–100
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  type: 'work' | 'education';
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface NavItem {
  label: string;
  anchor: string;
}
