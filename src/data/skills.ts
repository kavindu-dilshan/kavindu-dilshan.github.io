export interface SkillItem {
  name: string;
  image: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", image: "https://skillicons.dev/icons?i=js" },
      { name: "Python", image: "https://skillicons.dev/icons?i=python" },
      { name: "Java", image: "https://skillicons.dev/icons?i=java" },
      { name: "C", image: "https://skillicons.dev/icons?i=c" },
      { name: "C++", image: "https://skillicons.dev/icons?i=cpp" },
      { name: "Kotlin", image: "https://skillicons.dev/icons?i=kotlin" },
      { name: "PHP", image: "https://skillicons.dev/icons?i=php" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", image: "https://skillicons.dev/icons?i=react" },
      { name: "HTML", image: "https://skillicons.dev/icons?i=html" },
      { name: "CSS", image: "https://skillicons.dev/icons?i=css" },
      { name: "Tailwind CSS", image: "https://skillicons.dev/icons?i=tailwind" },
      { name: "Bootstrap", image: "https://skillicons.dev/icons?i=bootstrap" },
    ],
  },
  {
    title: "Backend & Cloud",
    skills: [
      { name: "Node.js", image: "https://skillicons.dev/icons?i=nodejs" },
      { name: "Express.js", image: "https://skillicons.dev/icons?i=express" },
      { name: "MySQL", image: "https://skillicons.dev/icons?i=mysql" },
      { name: "MongoDB", image: "https://skillicons.dev/icons?i=mongodb" },
      { name: "Firebase", image: "https://skillicons.dev/icons?i=firebase" },
    ],
  },
  {
    title: "Tools & Design",
    skills: [
      { name: "Git", image: "https://skillicons.dev/icons?i=git" },
      { name: "GitHub", image: "https://skillicons.dev/icons?i=github" },
      { name: "VS Code", image: "https://skillicons.dev/icons?i=vscode" },
      { name: "Android Studio", image: "https://skillicons.dev/icons?i=androidstudio" },
      { name: "Postman", image: "https://skillicons.dev/icons?i=postman" },
      { name: "Figma", image: "https://skillicons.dev/icons?i=figma" },
    ],
  },
];
