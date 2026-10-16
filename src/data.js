// ---------------------------------------------------------------
//  ALL PORTFOLIO CONTENT LIVES HERE - edit this file to update the site
// ---------------------------------------------------------------
import {
  FaReact, FaHtml5, FaCss3Alt, FaGithub, FaLinkedinIn, FaEnvelope,
  FaShoppingCart, FaGraduationCap, FaBuilding, FaEnvelopeOpenText, FaTasks,
} from 'react-icons/fa';
import {
  SiJavascript, SiPhp, SiLaravel, SiNodedotjs, SiMongodb,
  SiTailwindcss, SiBootstrap, SiGit, SiGitlab, SiPostman,
} from 'react-icons/si';

import skillIcon1 from './images/Coding-Enthusiasist.png';
import skillIcon2 from './images/Infrastructure-Expert.png';
import skillIcon3 from './images/web-Master.png';

import gokwikImg from './images/projects/gokwik.png';
import questpixImg from './images/projects/questpix.png';
import matrixImg from './images/projects/matrix.png';
import wunderkindImg from './images/projects/wunderkind.png';
import jobtrackerImg from './images/projects/jobtracker.png';

export const profile = {
  firstName: 'Satish',
  lastName: 'Yadav',
  role: 'Web Developer',
  location: 'Thane, Maharashtra, India',
  email: 'tion3256@gmail.com',
  github: 'https://github.com/Yadav669',
  linkedin: 'https://www.linkedin.com/in/satishyadav18/',
  heroText:
    "I'm a Web Developer with 2+ years of experience building responsive, high-performance websites and web apps with React.js, PHP, Laravel, and Node.js.",
  aboutText:
    "I turn business requirements into clean, responsive web applications - from pixel-perfect interfaces to the backend APIs behind them. I hold a B.Sc. in Computer Science from the University of Mumbai and graduated among the top 5% of my batch.",
};

export const navLinks = [
  { id: 'home', label: 'Home.' },
  { id: 'about', label: 'About.' },
  { id: 'experience', label: 'Experience.' },
  { id: 'projects', label: 'Projects.' },
  { id: 'contacts', label: 'Contacts.' },
];

export const stats = [
  { value: '2+', label: 'Years of Experience' },
  { value: '4', label: 'Client Projects Delivered' },
  { value: '10+', label: 'Technologies Used', href: '#experience' },
];

export const skills = [
  {
    icon: skillIcon1,
    title: 'Frontend Development',
    text: 'Responsive, reusable interfaces built with React.js, JavaScript, Tailwind CSS, and Bootstrap.',
  },
  {
    icon: skillIcon2,
    title: 'Backend & APIs',
    text: 'Server-side features with PHP, Laravel, and Node.js, plus REST API integration and MongoDB.',
  },
  {
    icon: skillIcon3,
    title: 'Responsive Design',
    text: 'Pixel-perfect layouts that work across desktop, tablet, and mobile - from emails to full websites.',
  },
];

export const experience = [
  {
    role: 'Web Developer',
    company: 'Androapps Technology',
    place: 'CBD Belapur, Navi Mumbai',
    type: 'Full-time',
    dates: 'Oct 2024 - Aug 2026',
    summary:
      'Leading frontend and backend feature development for client websites, aligned with business requirements.',
    points: [
      'Develop web features based on business requirements using React.js, PHP, and Laravel across frontend and backend components.',
      'Build responsive interfaces with React.js, Tailwind CSS, and Bootstrap for consistent experiences on desktop, tablet, and mobile.',
      'Create reusable React components to improve code organization, maintainability, and UI consistency.',
      'Integrate REST APIs with frontend applications and troubleshoot frontend and backend issues.',
      'Collaborate with stakeholders and teams using Git, GitHub, and GitLab.',
    ],
    projects: ['GoKwik', 'Questpix', 'Matrix Land & Developers'],
  },
  {
    role: 'Software Developer Intern',
    company: 'Tech Sierra',
    place: 'Thane',
    type: 'Internship',
    dates: 'Dec 2023 - May 2024',
    summary: 'Focused on pixel-perfect email templates and responsive frontend styling.',
    points: [
      'Built pixel-perfect, responsive email templates for the Wunderkind project using HTML, CSS, and JavaScript.',
      "Converted design mockups into dynamic, client-ready layouts using JavaScript within the client's templating tools.",
    ],
    projects: ['Wunderkind'],
  },
  {
    role: 'B.Sc. in Computer Science',
    company: 'University of Mumbai',
    place: 'Thane',
    type: 'Education',
    dates: '2021 - 2023',
    summary: 'Graduated among the top 5% of the batch.',
    points: [],
    projects: [],
  },
];

export const techStack = [
  { name: 'React.js', group: 'Frontend', Icon: FaReact, color: '#61DAFB' },
  { name: 'JavaScript', group: 'Frontend', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'PHP', group: 'Backend', Icon: SiPhp, color: '#8993BE' },
  { name: 'Laravel', group: 'Backend', Icon: SiLaravel, color: '#FF2D20' },
  { name: 'Node.js', group: 'Backend', Icon: SiNodedotjs, color: '#6CC24A' },
  { name: 'MongoDB', group: 'Database', Icon: SiMongodb, color: '#47A248' },
  { name: 'HTML5', group: 'Frontend', Icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', group: 'Frontend', Icon: FaCss3Alt, color: '#1572B6' },
  { name: 'Tailwind CSS', group: 'Frontend', Icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Bootstrap', group: 'Frontend', Icon: SiBootstrap, color: '#A56EFF' },
  { name: 'Git', group: 'Tools', Icon: SiGit, color: '#F05032' },
  { name: 'GitLab', group: 'Tools', Icon: SiGitlab, color: '#FC6D26' },
  { name: 'Postman', group: 'Tools', Icon: SiPostman, color: '#FF6C37' },
];

// Replace the generated cover images in src/images/projects/ with real
// screenshots (same file names) whenever you have them.
export const projects = [
  {
    title: 'GoKwik',
    text: "Responsive interfaces for GoKwik's e-commerce growth platform, helping D2C brands boost conversions and retention through checkout and WhatsApp marketing tools.",
    tags: ['React.js', 'Tailwind CSS', 'Bootstrap'],
    image: gokwikImg,
    Icon: FaShoppingCart,
    link: 'https://www.gokwik.co/',
  },
  {
    title: 'Questpix',
    text: 'Reusable frontend modules for an EdTech exam-prep platform with live classes, test series, and rank analytics for JEE, NEET, Olympiad, and Boards.',
    tags: ['React.js', 'EdTech'],
    image: questpixImg,
    Icon: FaGraduationCap,
    link: 'https://questpix.com/',
  },
  {
    title: 'Matrix Land & Developers',
    text: 'A real estate website with residential and commercial project showcase pages and a contact/inquiry feature.',
    tags: ['React.js', 'PHP', 'Laravel'],
    image: matrixImg,
    Icon: FaBuilding,
    link: 'https://www.matrixdevelopers.in/',
  },
  {
    title: 'Wunderkind',
    text: 'Pixel-perfect, responsive email templates converted from design mockups into dynamic, client-ready layouts.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: wunderkindImg,
    Icon: FaEnvelopeOpenText,
    link: null,
  },
  {
    title: 'Job Tracker Dashboard',
    text: 'A responsive dashboard to track job applications with add, edit, search, filter, and status tracking - data is saved in the browser.',
    tags: ['React.js', 'JavaScript', 'LocalStorage'],
    image: jobtrackerImg,
    Icon: FaTasks,
    link: null,
    status: 'In Progress',
  },
];

export const socials = [
  { label: 'GitHub', href: profile.github, Icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, Icon: FaLinkedinIn },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: FaEnvelope },
];
