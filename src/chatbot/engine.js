// ---------------------------------------------------------------
//  LOCAL ANSWER ENGINE
//  Answers visitor questions using the content in src/data.js, so it
//  stays in sync with the site. No API key, no server, no cost.
// ---------------------------------------------------------------
import { profile, experience, projects, techStack, stats } from '../data';

const CONTACT_LINKS = [
  { label: 'Email Satish', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
];

// lower-case, strip punctuation (keeps . + # inside words like node.js, c#), pad with spaces
const normalize = (s) =>
  ` ${s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .replace(/(^|\s)\./g, ' ')
    .replace(/\.(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;

const hasWord = (t, w) => t.includes(` ${w} `);
const hasPrefix = (t, p) => t.includes(` ${p}`);

// ---------- technologies ----------
const TECH_ALIASES = {
  'React.js': ['react', 'reactjs', 'react.js', 'react js'],
  JavaScript: ['javascript', 'js', 'es6', 'ecmascript'],
  PHP: ['php'],
  Laravel: ['laravel'],
  'Node.js': ['node', 'nodejs', 'node.js', 'node js'],
  MongoDB: ['mongodb', 'mongo'],
  HTML5: ['html', 'html5'],
  CSS3: ['css', 'css3'],
  'Tailwind CSS': ['tailwind', 'tailwindcss', 'tailwind css'],
  Bootstrap: ['bootstrap'],
  Git: ['git'],
  GitLab: ['gitlab'],
  Postman: ['postman'],
};

// popular tech that is NOT in the listed stack -> answer honestly
const OTHER_TECH = [
  'python', 'java', 'angular', 'vue', 'vuejs', 'django', 'flask', 'spring', 'typescript',
  'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'sql', 'mysql', 'postgres', 'postgresql',
  'nextjs', 'next.js', 'nestjs', 'expressjs', 'express.js', 'redux', 'kotlin', 'swift', 'flutter',
  'dart', 'ruby', 'rails', 'golang', 'c#', 'dotnet', 'figma', 'wordpress', 'firebase', 'graphql',
  'jenkins', 'linux', 'svelte', 'react native', 'android', 'ios',
];

function findTech(t) {
  let found = null;
  let longest = 0;
  techStack.forEach((item) => {
    (TECH_ALIASES[item.name] || [item.name.toLowerCase()]).forEach((a) => {
      if (hasWord(t, a) && a.length > longest) {
        found = item;
        longest = a.length;
      }
    });
  });
  return found;
}

// whole-word match, so "js" does not match inside "React.js"
function mentions(text, tech) {
  const t = normalize(text);
  return (TECH_ALIASES[tech.name] || [tech.name.toLowerCase()]).some((a) => hasWord(t, a));
}

function techAnswer(tech) {
  const usedProjects = projects
    .filter((p) => p.tags.some((tag) => mentions(tag, tech)))
    .map((p) => p.title);
  const roles = experience
    .filter((e) => e.type !== 'Education')
    .filter((e) => e.points.some((pt) => mentions(pt, tech)) || e.projects.some((pr) => usedProjects.includes(pr)))
    .map((e) => e.company);

  let text = `Yes - ${tech.name} is part of Satish's stack (${tech.group.toLowerCase()}).`;
  if (roles.length) text += `\nHe has used it at ${roles.join(' and ')}.`;
  if (usedProjects.length) text += `\nProjects: ${usedProjects.join(', ')}.`;
  return { text, links: [{ label: 'See full tech stack', href: '#experience' }] };
}

// ---------- projects ----------
const PROJECT_ALIASES = {
  GoKwik: ['gokwik', 'go kwik'],
  Questpix: ['questpix', 'quest pix', 'edtech'],
  'Matrix Land & Developers': ['matrix', 'real estate', 'realestate'],
  Wunderkind: ['wunderkind', 'email template', 'email design'],
  'Job Tracker Dashboard': ['job tracker', 'tracker', 'dashboard'],
};

function findProject(t) {
  return projects.find((p) => {
    const aliases = PROJECT_ALIASES[p.title] || [p.title.toLowerCase()];
    return aliases.some((a) => hasPrefix(t, a));
  });
}

function projectAnswer(p) {
  const status = p.status ? ` (${p.status.toLowerCase()})` : '';
  const links = [];
  if (p.link) links.push({ label: 'Visit site', href: p.link });
  links.push({ label: 'All projects', href: '#projects' });
  return {
    text: `${p.title}${status}\n${p.text}\nBuilt with: ${p.tags.join(', ')}.`,
    links,
  };
}

// ---------- canned answers ----------
const years = stats[0].value;
const jobs = experience.filter((e) => e.type !== 'Education');
const edu = experience.find((e) => e.type === 'Education');

const answers = {
  greeting: () => ({
    text: `Hi there! I'm ${profile.firstName}'s portfolio assistant. Ask me about his experience, skills, projects, education, or how to get in touch.`,
  }),
  thanks: () => ({ text: `You're welcome! Anything else you'd like to know about ${profile.firstName}'s work?` }),
  bye: () => ({ text: `Thanks for stopping by! Feel free to reach out to ${profile.firstName} anytime.`, links: CONTACT_LINKS.slice(0, 1) }),
  bot: () => ({
    text: `I'm an automated assistant on ${profile.firstName}'s portfolio. I answer questions using the information on this site - for anything else, please contact him directly.`,
    links: CONTACT_LINKS,
  }),
  about: () => ({
    text:
      `${profile.firstName} ${profile.lastName} is a ${profile.role} based in ${profile.location} with ${years} years of experience building responsive, high-performance websites and web apps with React.js, PHP, Laravel, and Node.js.` +
      (edu ? ` He holds a ${edu.role} from ${edu.company} (${edu.summary.toLowerCase().replace(/\.$/, '')}).` : ''),
    links: [{ label: 'About him', href: '#about' }],
  }),
  experience: () => ({
    text:
      `${profile.firstName} has ${years} years of professional experience:\n` +
      jobs
        .map((e) => `• ${e.role} at ${e.company} (${e.dates}) - ${e.summary}${e.projects.length ? ` Projects: ${e.projects.join(', ')}.` : ''}`)
        .join('\n'),
    links: [{ label: 'Full experience', href: '#experience' }],
  }),
  skills: () => {
    const groups = ['Frontend', 'Backend', 'Database', 'Tools'];
    return {
      text:
        `Here's what ${profile.firstName} works with:\n` +
        groups
          .map((g) => `• ${g}: ${techStack.filter((t) => t.group === g).map((t) => t.name).join(', ')}`)
          .join('\n'),
      links: [{ label: 'See tech stack', href: '#experience' }],
    };
  },
  projects: () => ({
    text:
      `Here are ${profile.firstName}'s projects:\n` +
      projects.map((p) => `• ${p.title} (${p.tags.join(', ')})`).join('\n') +
      '\nAsk me about any of them by name!',
    links: [{ label: 'See projects', href: '#projects' }],
  }),
  education: () => ({
    text: edu
      ? `${edu.role} - ${edu.company} (${edu.dates}). ${edu.summary}`
      : `${profile.firstName} holds a degree in Computer Science.`,
    links: [{ label: 'Experience & education', href: '#experience' }],
  }),
  contact: (t) => {
    const resume = hasPrefix(t, 'resume') || hasWord(t, 'cv');
    const hiring = hasPrefix(t, 'hir') || hasPrefix(t, 'recruit') || hasPrefix(t, 'opportunit') || hasPrefix(t, 'availab');
    let text = resume
      ? `For a copy of ${profile.firstName}'s resume, please email him or message him on LinkedIn.`
      : `The best way to reach ${profile.firstName} is by email or LinkedIn.`;
    if (hiring && !resume) text = `Thanks for your interest in ${profile.firstName}! ${text}`;
    return { text, links: [...CONTACT_LINKS, { label: 'Contact form', href: '#contacts' }] };
  },
  location: () => ({
    text: `${profile.firstName} is based in ${profile.location}. For anything about work arrangements, please contact him directly.`,
    links: CONTACT_LINKS.slice(0, 2),
  }),
  salary: () => ({
    text: `I can't share salary or compensation details - please contact ${profile.firstName} directly for anything like that.`,
    links: CONTACT_LINKS.slice(0, 2),
  }),
  fallback: () => ({
    text: `I'm not sure about that one. I can tell you about ${profile.firstName}'s experience, skills, projects, education, or how to contact him.`,
  }),
};

const INTENTS = [
  { name: 'salary', prefix: ['salar', 'ctc', 'compensat', 'package', 'lpa'], exact: ['pay', 'paid', 'rate', 'rates'] },
  {
    name: 'bot',
    exact: ['bot', 'chatbot', 'chatgpt', 'ai'],
    phrases: ['are you a', 'are you real', 'are you human', 'who made you', 'who built you', 'who created you'],
  },
  { name: 'contact', prefix: ['contact', 'email', 'reach', 'hire', 'hiring', 'recruit', 'connect', 'linkedin', 'github', 'resume', 'opportunit', 'availab'], exact: ['mail', 'touch', 'cv', 'message', 'dm'], phrases: ['get in touch'] },
  { name: 'education', prefix: ['educat', 'degree', 'universit', 'colleg', 'studi', 'graduat', 'qualif'], exact: ['bsc', 'b.sc', 'study', 'school'] },
  { name: 'location', prefix: ['locat', 'based', 'relocat'], exact: ['where', 'city', 'live', 'lives'], phrases: ['where is'] },
  { name: 'projects', prefix: ['project', 'portfolio', 'built', 'case stud', 'sample', 'showcase'], exact: ['apps', 'websites'], phrases: ['what has he built'] },
  { name: 'skills', prefix: ['skill', 'technolog', 'framework', 'librar', 'proficien', 'expert'], exact: ['tech', 'stack', 'languages', 'language', 'tools'], phrases: ['what can he do', 'tech stack'] },
  { name: 'experience', prefix: ['experienc', 'career', 'employ', 'androapps', 'sierra', 'intern'], exact: ['work', 'worked', 'working', 'job', 'jobs', 'company', 'companies', 'role', 'roles', 'years', 'senior', 'junior'], phrases: ['work history'] },
];

// only used when nothing more specific matched ("tell me about his work" must still mean experience)
const ABOUT = { name: 'about', exact: ['who', 'about', 'yourself', 'introduce', 'intro', 'satish'], phrases: ['tell me about', 'who is satish'] };

const SOCIAL = [
  { name: 'greeting', exact: ['hi', 'hii', 'hello', 'hey', 'hola', 'namaste', 'yo', 'sup'], phrases: ['good morning', 'good afternoon', 'good evening'] },
  { name: 'thanks', exact: ['thanks', 'thank', 'thx', 'ty'], phrases: ['thank you'] },
  { name: 'bye', exact: ['bye', 'goodbye', 'cya'], phrases: ['see you'] },
];

function score(t, intent) {
  let s = 0;
  (intent.phrases || []).forEach((p) => t.includes(p) && (s += 3));
  (intent.exact || []).forEach((w) => hasWord(t, w) && (s += 2));
  (intent.prefix || []).forEach((p) => hasPrefix(t, p) && (s += 2));
  return s;
}

function best(t, list) {
  let top = null;
  let topScore = 0;
  list.forEach((intent) => {
    const s = score(t, intent);
    if (s > topScore) {
      top = intent;
      topScore = s;
    }
  });
  return top;
}

export function getLocalReply(message) {
  const t = normalize(message || '');
  if (t.trim() === '') return answers.fallback();

  // 1) sensitive / meta topics first
  const guard = best(t, INTENTS.filter((i) => i.name === 'salary' || i.name === 'bot'));
  if (guard) return answers[guard.name](t);

  // 2) a specific project, then a specific technology
  const project = findProject(t);
  if (project) return projectAnswer(project);

  const tech = findTech(t);
  if (tech) return techAnswer(tech);

  const other = OTHER_TECH.find((o) => hasWord(t, o));
  if (other) {
    return {
      text: `I don't have ${other} listed in ${profile.firstName}'s stack - his main tools are React.js, JavaScript, PHP, Laravel, Node.js and MongoDB. For anything beyond that, it's best to ask him directly.`,
      links: CONTACT_LINKS.slice(0, 2),
    };
  }

  // 3) general topics, then small talk
  const intent = best(t, INTENTS) || best(t, [ABOUT]);
  if (intent) return answers[intent.name](t);

  const social = best(t, SOCIAL);
  if (social) return answers[social.name](t);

  return answers.fallback();
}

export const GREETING_TEXT = answers.greeting().text;
