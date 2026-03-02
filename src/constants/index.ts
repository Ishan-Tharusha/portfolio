export interface Skill {
  skill_name: string
  Image: string
  width: number
  height: number
  category?: string
}

export const skillCategories: { id: string; label: string; image: string; imageAlt: string }[] = [
  { id: 'languages', label: 'Programming Languages', image: '/js.png', imageAlt: 'Programming' },
  { id: 'databases', label: 'Databases', image: '/mongodb.svg', imageAlt: 'Databases' },
  { id: 'frontend', label: 'Front-End Technologies', image: '/html.png', imageAlt: 'Front-End' },
  { id: 'backend', label: 'Back-End Technologies', image: '/node-js.png', imageAlt: 'Back-End' },
  { id: 'tools', label: 'Tools & Technologies', image: '/git.svg', imageAlt: 'Tools' },
]

export const skills: Skill[] = [
  // Programming Languages
  { skill_name: 'C#', Image: '/%23%20logo.jpg', width: 70, height: 70, category: 'languages' },
  { skill_name: 'Java', Image: '/java%20logo.png', width: 70, height: 70, category: 'languages' },
  { skill_name: 'JavaScript', Image: '/js.png', width: 65, height: 65, category: 'languages' },
  { skill_name: 'TypeScript', Image: '/ts.png', width: 80, height: 80, category: 'languages' },
  { skill_name: 'Python', Image: '/python.svg', width: 70, height: 70, category: 'languages' },
  // Databases
  { skill_name: 'MongoDB', Image: '/mongodb.svg', width: 70, height: 70, category: 'databases' },
  { skill_name: 'MySQL', Image: '/mysql.png', width: 70, height: 70, category: 'databases' },

  // Front-End Technologies
  { skill_name: 'HTML', Image: '/html.png', width: 70, height: 70, category: 'frontend' },
  { skill_name: 'CSS', Image: '/CSS3_logo.svg.png', width: 70, height: 70, category: 'frontend' },
  { skill_name: 'Tailwind CSS', Image: '/tailwind.png', width: 70, height: 70, category: 'frontend' },

  // Back-End Technologies
  { skill_name: '.NET', Image: '/net-framework%20logo.jpg', width: 70, height: 70, category: 'backend' },
  { skill_name: 'Node.js', Image: '/node-js.png', width: 80, height: 80, category: 'backend' },
  { skill_name: 'Express.js', Image: 'https://expressjs.com/images/favicon.png', width: 70, height: 70, category: 'backend' },
  { skill_name: 'Spring Boot', Image: '/spring-boot.png', width: 70, height: 70, category: 'backend' },

  // Tools & Technologies
  { skill_name: 'Git', Image: '/git.svg', width: 70, height: 70, category: 'tools' },
  { skill_name: 'GitHub', Image: '/github.png', width: 70, height: 70, category: 'tools' },
  { skill_name: 'Postman', Image: '/postmon%20logo.jpg', width: 70, height: 70, category: 'tools' },
  { skill_name: 'Docker', Image: '/docker.webp', width: 70, height: 70, category: 'tools' },
]

export const Socials = [
  {
    name: 'Discord',
    src: '/instagram.svg',
    link: '',
  },
  {
    name: 'Facebook',
    src: '/facebook.svg',
    link: '',
  },
  {
    name: 'Instagram',
    src: '/discord.svg',
    link: '',
  },
]
