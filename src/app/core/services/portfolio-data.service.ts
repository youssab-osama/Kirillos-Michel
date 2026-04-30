import { Injectable, signal, computed } from '@angular/core';
import type { Project, SkillGroup, Experience, Service, NavItem } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  readonly navItems: NavItem[] = [
    { label: 'Home', anchor: 'home' },
    { label: 'About', anchor: 'about' },
    { label: 'Services', anchor: 'services' },
    { label: 'Skills', anchor: 'skills' },
    { label: 'Experience', anchor: 'experience' },
    { label: 'Projects', anchor: 'projects' },
    { label: 'Contact', anchor: 'contact' },
  ];

  readonly projects: Project[] = [
    {
      id: 1,
      title: 'Penetration Testing & Vulnerability Assessment',
      description:
        'Comprehensive penetration testing engagement using Kali Linux. Conducted full-scope scanning, enumeration, and exploitation of target systems. Identified critical vulnerabilities and delivered detailed mitigation reports.',
      techStack: ['Kali Linux', 'Nmap', 'Metasploit', 'Burp Suite', 'OWASP'],
      category: 'Cybersecurity',
      githubUrl: 'https://github.com/darks0ul1337',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #ef4444 100%)',
      featured: true,
    },
    {
      id: 2,
      title: 'Full-Stack Transportation Management System',
      description:
        'A ride-booking platform similar to real-world apps. Built with Python backend and SQL Server. Features user & driver management, trip booking, ratings system, and payment processing.',
      techStack: ['Python', 'SQL Server', 'ERD Design', 'REST API'],
      category: 'Full-Stack',
      githubUrl: 'https://github.com/darks0ul1337',
      gradient: 'linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%)',
      featured: false,
    },
    {
      id: 3,
      title: 'CPU Scheduling Algorithms Simulator',
      description:
        'OS-level simulator demonstrating Shortest Job First, Round Robin, and Priority Scheduling algorithms. Visualizes algorithm efficiency and CPU resource allocation.',
      techStack: ['C++', 'Operating Systems', 'Algorithm Design'],
      category: 'Systems',
      githubUrl: 'https://github.com/darks0ul1337',
      gradient: 'linear-gradient(135deg, #22d3ee 0%, #0f172a 100%)',
      featured: false,
    },
    {
      id: 4,
      title: 'Java Financial Budgeting System',
      description:
        'Expense management application applying SOLID principles and modular OOP architecture. Implements user-friendly interfaces with full JavaDoc documentation for maintainability.',
      techStack: ['Java', 'OOP', 'SOLID', 'JavaDoc'],
      category: 'Software Engineering',
      githubUrl: 'https://github.com/darks0ul1337',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      featured: false,
    },
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      category: 'Programming',
      icon: 'code',
      skills: ['C++', 'Java', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS'],
    },
    {
      category: 'Cybersecurity',
      icon: 'shield',
      skills: [
        'Penetration Testing',
        'Vulnerability Assessment',
        'Kali Linux',
        'Burp Suite',
        'Nmap',
        'OWASP Top 10',
        'Network Security',
      ],
    },
    {
      category: 'Tools & Concepts',
      icon: 'tool',
      skills: [
        'OOP & SOLID',
        'Clean Architecture',
        'Agile',
        'SQL Server',
        'ERD Design',
        'OS Memory Mgmt',
        'Linux',
      ],
    },
  ];

  readonly experiences: Experience[] = [
    {
      company: 'Oathnet',
      role: 'Cyber Incident Responder',
      duration: 'July 2025 – September 2025',
      location: 'Cairo, Egypt',
      responsibilities: [
        'Conducted penetration testing on web domains and APIs',
        'Identified and exploited vulnerabilities in client systems',
        'Produced detailed technical security reports for clients',
        'Assisted in patching and fixing discovered security issues',
        'Participated in client acquisition and B2B contract negotiation',
      ],
      type: 'work',
    },
    {
      company: 'Faculty of Computers & AI – Cairo University',
      role: 'BSc Computer Science',
      duration: 'October 2023 – Present (Expected 2027)',
      location: 'Giza, Egypt',
      responsibilities: [
        'Specializing in Cybersecurity & Software Engineering',
        'Core subjects: OS, Algorithms, Computer Architecture, AI, Databases',
        'EQF Level 6 qualification',
      ],
      type: 'education',
    },
  ];

  readonly services: Service[] = [
    {
      title: 'Penetration Testing',
      description:
        'Full-scope offensive security testing of web applications, APIs, and network infrastructure. I find what attackers would find — before they do.',
      icon: 'target',
      features: [
        'Web App & API Testing',
        'Network Enumeration',
        'Exploitation & PoC',
        'Executive Security Reports',
      ],
    },
    {
      title: 'Vulnerability Assessment',
      description:
        'Systematic identification and classification of security weaknesses across your digital surface. Risk-rated findings with actionable remediation guidance.',
      icon: 'scan',
      features: [
        'OWASP Top 10 Coverage',
        'CVE Mapping',
        'Risk Prioritization',
        'Remediation Roadmap',
      ],
    },
    {
      title: 'Secure Development',
      description:
        'Bringing security into the development lifecycle. Code review, architecture hardening, and secure-by-design consulting to eliminate vulnerabilities at the source.',
      icon: 'lock-code',
      features: [
        'Secure Code Review',
        'SDLC Integration',
        'Security Architecture',
        'Developer Training',
      ],
    },
  ];

  // Reactive state for active project
  readonly activeProjectId = signal<number>(1);

  readonly activeProject = computed(
    () => this.projects.find((p) => p.id === this.activeProjectId()) ?? this.projects[0]
  );

  setActiveProject(id: number): void {
    this.activeProjectId.set(id);
  }
}
