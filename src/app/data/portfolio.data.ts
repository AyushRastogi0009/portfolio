/**
 * All portfolio content lives in this file.
 * Edit the text here and the page updates; no template changes needed.
 */

export interface NavItem {
  id: string;
  label: string;
}

export interface HeroField {
  key: string;
  value: string | number | string[];
}

export interface Experience {
  company: string;
  period: string;
  role: string;
  points: string[];
  modules: string[];
}

export interface FlowStep {
  title: string;
  text: string;
}

export interface ProjectModule {
  title: string;
  text: string;
}

export interface Project {
  name: string;
  meta?: string;
  stack: string[];
  intro?: string;
  flow?: { label: string; steps: FlowStep[] };
  modules: ProjectModule[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Achievement {
  tag: string;
  title: string;
  detail: string;
}

export interface ContactLink {
  label: string;
  text: string;
  href: string;
}

export const NAV: NavItem[] = [
  { id: 'top', label: 'ayush' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'stack', label: 'stack' },
  { id: 'wins', label: 'wins' },
  { id: 'contact', label: 'contact' },
];
export interface EducationItem {
  degree: string;
  college: string;
  location: string;
  affiliation: string;
  period: string;
  score?: string; 
}
export const PROFILE = {
  firstName: 'Ayush',
  lastName: 'Rastogi',
  intro:
    'I’m a Software Developer who enjoys turning complex problems into simple, scalable solutions. From building robust backend systems with Node.js and Express.js to crafting modern web experiences with Angular And React, I love working across the stack. Always curious about how systems work under the hood and passionate about building software that makes a real difference.',
};



export const HERO_RESPONSE: HeroField[] = [
  { key: 'name', value: 'Ayush Rastogi' },
  { key: 'role', value: 'Software Engineer' },
  { key: 'company', value: 'Cube Software Pvt. Ltd.' },
  { key: 'since', value: 'Dec 2025' },
  { key: 'location', value: 'Meerut, India' },
  { key: 'backend', value: ['Node.js', 'Express.js', 'MSSQL'] },
  { key: 'frontend', value: ['Angular', 'React.js', 'TypeScript'] },
  {key: 'cloud', value: ['AWS']},
  { key: 'hackathon_wins', value: 3 },
  { key: 'leetcode_solved', value: '400+' },
];

export const EXPERIENCE: Experience = {
  company: 'Cube Software Pvt. Ltd.',
  period: 'Dec 2025 – Present · Full-time',
  role: 'Software Engineer',
  points: [
    'Build and maintain enterprise CRMS, SaaS and telephonic billing applications, covering scalable backends, workflow automation, reporting dashboards and responsive interfaces.',
    'Shipped business modules for attendance management, role-based access control, audit logging, utilization reporting and approval workflows.',
    'Write REST APIs, cron-based automations, email and WhatsApp notifications and operational dashboards with Node.js, Express.js, MSSQL, JavaScript, Angular.js and EJS.',
    'Work with cross-functional teams on reporting accuracy, operational efficiency and business process automation.',
  ],
  modules: [
    // 'Attendance',
    // 'RBAC',
    // 'Audit logging',
    // 'Utilization reports',
    // 'Approval workflows',
    // 'Cron jobs',
    // 'Email alerts',
    // 'WhatsApp alerts',
  ],
};

export const PROJECTS: Project[] = [
  {
    name: 'Cube Telephonic Billing System (CubeTBS)',
    meta: 'Team of 5 · Frontend and backend',
    stack: ['Angular', 'Node.js', 'Express.js', 'MSSQL'],
    intro:
      'A multi-tenant billing and reporting platform for telephony sites. I was one of five engineers and worked on both the Angular frontend and the Node.js backend.',
    flow: {
      label: 'How a login reaches the right site database',
      steps: [
        { title: 'Login', text: 'The user signs in  belongs to a Particular site.' },
        { title: 'Central database', text: 'Stores the connection details of every site.' },
        { title: 'Site database', text: "The backend connects to that site's own MSSQL database." },
      ],
    },
    modules: [
      {
        title: 'Reports module',
        text: 'Built the complete frontend for the Reports module: multiple call detail and summary reports across authorization, account, department and company views.',
      },
      {
        title: 'Dashboard and login',
        text: 'Built the dashboard and the login and logout modules in Angular.',
      },
      {
        title: 'Multi-tenant architecture',
        text: 'Each site keeps its data in a separate database. A central database holds the connection details per site, and the backend connects each user to the correct site database at runtime.',
      },
      {
        title: 'Backend APIs',
        text: 'Designed the Node.js and Express APIs behind reports, login and the dashboard, reading large datasets through MSSQL stored procedures.',
      },
      {
        title: 'Large PDF reports',
        text: 'Moved PDF generation from the browser to a PDFKit backend that streams MSSQL rows straight to disk, so reports with hundreds of thousands of rows no longer crash.',
      },
      {
        title: 'Faster reports',
        text: 'Cut report time from 5 to 10 minutes down to about 2 minutes on datasets of up to 2 million records, using streaming, incremental rendering and a queue that limits concurrent jobs.',
      },
      {
        title: 'Excel exports',
        text: 'ExcelJS exports that match the PDF reports in structure and totals.',
      },
    ],
  },
 {
    name: 'AI-Powered Call Auditing & Agent Performance Platform',
    stack: ['Node.js', 'Express.js', 'Angular', 'TypeScript', 'MSSQL', 'REST APIs', 'OpenAI', 'Gemini', 'Sarvam AI', 'Deepgram'],
    intro: 'Designed and built end to end. Audits 10-15K call recordings every day for 2 clients.',
    modules: [
      {
        title: 'Audit dashboards',
        text: 'Angular dashboards to track audits, review results and play call recordings in one place.',
      },
      {
        title: 'Custom questionnaires',
        text: 'Admins define their own criteria and weightage, so every call is scored the way the business wants.',
      },
      {
        title: 'Automated scoring',
        text: 'OpenAI checks each transcript against the questionnaire and returns Yes/No answers with weighted scores.',
      },
      {
        title: 'Human-in-the-loop review',
        text: 'Admins can listen to any call, evaluate it themselves, and override or assign the final score.',
      },
      {
        title: 'Resilient transcription',
        text: 'Sarvam AI handles speech-to-text, translation and text-to-speech, with Deepgram taking over automatically if it fails.',
      },
      {
        title: 'Conversation insights',
        text: 'Gemini adds speaker separation, call summaries, profanity detection and improvement suggestions for agents.',
      },
    ],
  },
  {
    name: 'Enterprise Workforce & Task Management System',
    stack: ['Node.js', 'Express.js', 'MSSQL', 'REST APIs'],
    modules: [
      {
        title: 'Task management',
        text: 'APIs to create, assign and track tasks with priorities, due dates, attachments and activity history.',
      },
      {
        title: 'Attendance and leave',
        text: 'Check-in and check-out, leave requests, approval workflows and downloadable attendance reports.',
      },
      {
        title: 'Auth and RBAC',
        text: 'JWT authentication and role-based authorization that follows the organizational hierarchy.',
      },
      {
        title: 'Hierarchical dashboards',
        text: 'Pending, in-progress, completed and overdue task counts, with managers seeing their reporting teams.',
      },
      {
        title: 'Search and speed',
        text: 'Filtering, pagination and sorting across the task and attendance modules.',
      },
      {
        title: 'Reports and export',
        text: 'Reporting APIs with advanced search, pagination and export.',
      },
      {
        title: 'Docs and automation',
        text: 'Swagger documentation, plus a cron job that processes daily attendance and updates status by business rules.',
      },
    ],
  },
  {
    name: 'SaaS Subscription Management Platform',
    stack: ['Node.js', 'Express.js', 'MSSQL', 'REST APIs', 'JWT', 'React.js'],
    intro: 'Built with a cross-functional team, across both frontend and backend.',
    modules: [
      {
        title: 'Registration and login',
        text: 'Frontend screens and REST APIs with JWT, refresh tokens and middleware authorization on protected routes.',
      },
      {
        title: 'Password recovery',
        text: 'Reset flow through the enterprise OTP service, with validation.',
      },
      {
        title: 'Profile management',
        text: 'Users view and update their account details over REST APIs.',
      },
      {
        title: 'Plans and coupons',
        text: 'APIs to create, validate, apply and manage coupons, plus plan selection in the subscription flow.',
      },
      {
        title: 'Email notifications',
        text: 'Onboarding emails and subscription expiry reminders through existing notification services.',
      },
    ],
  },
];
export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    college: 'IIMT Engineering College',
    location: 'Meerut',
    affiliation: 'AKTU',
    period: '2021 – 2025',
    score: 'CGPA 7.75 / 10',
  },
];
export const SKILLS: SkillGroup[] = [
  { label: 'Languages', items: ['C++', 'JavaScript'] },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Cron jobs', 'Workflow automation'],
  },
  {
    label: 'Frontend',
    items: ['Angular', 'React.js', 'Ionic', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  { label: 'Databases', items: ['MSSQL', 'SQL', 'MongoDB'] },
  { label: 'Architectures', items: ['MERN', 'MEAN', 'MVC', 'REST API'] },
  { label: 'Cloud and tools', items: ['AWS', 'Git', 'GitHub', 'Postman', 'VS Code'] },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    tag: 'Winner',
    title: 'IdeaHub 2.0, The Space Edition',
    detail: 'Organized by TechCider Club, NMIMS Navi Mumbai, at IGNITE 7.0 TechFest.',
  },
  {
    tag: 'Winner ×2',
    title: 'Smart India Hackathon, Internal Rounds',
    detail: 'IIMT Engineering College, 2023 and 2024.',
  },
  {
    tag: 'Waiting list',
    title: 'Smart India Hackathon 2024',
    detail: "A spot on the waiting list in one of India's most competitive national hackathons.",
  },
  {
    tag: 'Silver',
    title: 'AKTU TechFeast, zonal level',
    detail: 'Second place in the Innoshow competition.',
  },
    {
    tag:'Silver',
    title:'Investor Meet, IIMT Engineering College',
    detail: 'Secured a Sendspot in the investor meet organized by IIMT Engineering College.',
  },
  {
    tag: '400+',
    title: 'LeetCode problems solved',
    detail: 'Practice that carries over into how I write and review backend logic.',
  },
];

export const ALSO_PARTICIPATED =
  'Also took part in Prod-G, Luminous Techno-X and Flipkart Grid 6.0.';

export const CONTACT = {
  email: 'ayushrastogi2222@gmail.com',
  phone: '+91-8279801152',
  links: [
    {
      label: 'GitHub',
      text: 'github.com/AyushRastogi0009',
      href: 'https://github.com/AyushRastogi0009',
    },
    {
      label: 'LinkedIn',
      text: 'linkedin.com/in/ayush-rastogi-978025260',
      href: 'https://www.linkedin.com/in/ayush-rastogi-978025260/',
    },
    {
      label: 'LeetCode',
      text: 'leetcode.com/u/Ayush-Rastogi',
      href: 'https://leetcode.com/u/Ayush-Rastogi/',
    },
  ] as ContactLink[],
  education: {
    college: 'IIMT Engineering College, Meerut',
    detail:
      '(affiliated to AKTU). B.Tech in Computer Science and Engineering, 2021 to 2025. Based in Meerut, Uttar Pradesh.',
  },
};
