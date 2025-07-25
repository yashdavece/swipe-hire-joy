export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  experience: string;
  location: string;
  skills: string[];
  resumeUrl: string;
  coverLetter: string;
  profileImage: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'interviewed' | 'hired';
}

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    role: "Frontend Developer",
    experience: "3 years",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    resumeUrl: "/resumes/alex-johnson.pdf",
    coverLetter: "I am passionate about creating beautiful, user-friendly interfaces...",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    appliedDate: "2024-01-15",
    status: "pending"
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    role: "Frontend Developer",
    experience: "5 years",
    location: "New York, NY",
    skills: ["Vue.js", "JavaScript", "SCSS", "Webpack"],
    resumeUrl: "/resumes/sarah-chen.pdf",
    coverLetter: "With 5 years of experience in frontend development, I have worked on various projects...",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    appliedDate: "2024-01-14",
    status: "pending"
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@email.com",
    role: "Frontend Developer",
    experience: "2 years",
    location: "Austin, TX",
    skills: ["React", "Next.js", "GraphQL", "CSS-in-JS"],
    resumeUrl: "/resumes/michael-rodriguez.pdf",
    coverLetter: "I am excited about the opportunity to work with your team...",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    appliedDate: "2024-01-13",
    status: "pending"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    role: "Frontend Developer",
    experience: "4 years",
    location: "Seattle, WA",
    skills: ["Angular", "TypeScript", "RxJS", "Material UI"],
    resumeUrl: "/resumes/emily-davis.pdf",
    coverLetter: "As a frontend developer with expertise in Angular...",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    appliedDate: "2024-01-12",
    status: "pending"
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@email.com",
    role: "Frontend Developer",
    experience: "6 years",
    location: "Los Angeles, CA",
    skills: ["React", "Redux", "Jest", "Cypress"],
    resumeUrl: "/resumes/david-kim.pdf",
    coverLetter: "I bring 6 years of experience in building scalable web applications...",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    appliedDate: "2024-01-11",
    status: "pending"
  },
  {
    id: "6",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    role: "Frontend Developer",
    experience: "3 years",
    location: "Chicago, IL",
    skills: ["Svelte", "JavaScript", "CSS Grid", "Figma"],
    resumeUrl: "/resumes/lisa-thompson.pdf",
    coverLetter: "I am passionate about modern web technologies and user experience...",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    appliedDate: "2024-01-10",
    status: "pending"
  }
];