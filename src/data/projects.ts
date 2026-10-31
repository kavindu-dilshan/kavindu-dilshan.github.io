import serendibEstatesImage from "../images/projects/SerendibEstates.webp";
import booklrImage from "../images/projects/Booklr.webp";
import musicmashImage from "../images/projects/Musicmash.webp";
import calculatorImage from "../images/projects/Calculator.webp";
import doTaskImage from "../images/projects/DoTask.webp";
import kmpImage from "../images/projects/KMP.webp";
import medaliImage from "../images/projects/Medali.webp";
import ceyGoImage from "../images/projects/CeyGo.webp";

export interface ProjectMember {
  name: string;
  img: string;
  linkedin: string;
  github: string;
}

export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github: string;
  webapp: string;
  member: ProjectMember[];
}

export const projects: Project[] = [
  {
    id: 0,
    title: "CeyGo",
    date: "Aug 2024 - Sep 2024",
    description: "CeyGo is a Kotlin-based Android application that serves as a digital travel companion for Sri Lanka. It combines attractions, interactive maps, accommodations, and offline guides to help tourists explore and navigate seamlessly.",
    image: ceyGoImage,
    tags: ["Kotlin", "Android Studio", "Google Maps", "Offline Guides"],
    category: "mobile app",
    github: "https://github.com/kavindu-dilshan/CeyGo.git",
    webapp: "https://github.com/kavindu-dilshan/CeyGo.git",
    member: [
      {
        name: "Kavindu Dilshan",
        img: "https://avatars.githubusercontent.com/u/125633025?v=4",
        linkedin: "https://www.linkedin.com/in/kavindudilshan84/",
        github: "https://github.com/kavindu-dilshan",
      },
    ],
  },
  {
    id: 1,
    title: "Serendib Estates",
    date: "Jan 2024 - Jan 2024",
    description: "Explore my Real Estate Marketplace web application, a dynamic project developed using the MERN stack (MongoDB, Express.js, React, Node.js) with Vite as the local development server. This feature-rich application includes user authentication, profile management, seamless Google OAuth integration, and responsive design.",
    image: serendibEstatesImage,
    tags: ["MERN", "React.js", "MongoDB", "Node.js", "Express.js", "Redux", "Vite", "Tailwind CSS"],
    category: "web app",
    github: "https://github.com/kavindu-dilshan/serendib-estates.git",
    webapp: "https://serendib-estates.onrender.com/",
    member: [
      {
        name: "Kavindu Dilshan",
        img: "https://avatars.githubusercontent.com/u/125633025?v=4",
        linkedin: "https://www.linkedin.com/in/kavindudilshan84/",
        github: "https://github.com/kavindu-dilshan",
      },
    ],
  },
  {
    id: 2,
    title: "Medali",
    date: "Jun 2024 - Jul 2024",
    description: "Medali is an iOS application that helps users track daily medications, receive timely reminders, and monitor adherence over time. The app integrates Core Data, Local Notifications, and HealthKit for a personalized tracking experience.",
    image: medaliImage,
    tags: ["iOS", "Swift", "Core Data", "HealthKit", "Local Notifications"],
    category: "mobile app",
    github: "https://github.com/kavindu-dilshan/Medali.git",
    webapp: "https://github.com/kavindu-dilshan/Medali.git",
    member: [
      {
        name: "Kavindu Dilshan",
        img: "https://avatars.githubusercontent.com/u/125633025?v=4",
        linkedin: "https://www.linkedin.com/in/kavindudilshan84/",
        github: "https://github.com/kavindu-dilshan",
      },
    ],
  },
  {
    id: 3,
    title: "KMP Pharmacy",
    date: "Feb 2024 - May 2024",
    description: "KMP Pharmacy is an advanced pharmacy management system built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) and features eight comprehensive modules. KMP Pharmacy is designed to automate and streamline pharmacy operations.",
    image: kmpImage,
    tags: ["MERN", "React.js", "MongoDB", "Node.js", "Express.js", "Vite", "Tailwind CSS"],
    category: "web app",
    github: "https://github.com/kavindu-dilshan/KMP-Pharmacy.git",
    webapp: "https://github.com/kavindu-dilshan/KMP-Pharmacy.git",
    member: [
      {
        name: "Kavindu Dasanayaka",
        img: "https://avatars.githubusercontent.com/u/127751216?v=4",
        linkedin: "https://www.linkedin.com/in/kavindu-dasanayaka-5b5642276/",
        github: "https://github.com/KavinduDasanayaka",
      },
      {
        name: "Dilmani Kiriella",
        img: "https://avatars.githubusercontent.com/u/120442263?v=4",
        linkedin: "https://www.linkedin.com/in/dilmani-kiriella-72b968260/",
        github: "https://github.com/DilmaniKiriella",
      },
      {
        name: "Shahaam Marzook",
        img: "https://avatars.githubusercontent.com/u/165793855?v=4",
        linkedin: "https://www.linkedin.com/in/shahaam-marzook-734b17296/",
        github: "https://github.com/ShahaamM",
      },
      {
        name: "Mohamed Shahmi",
        img: "https://avatars.githubusercontent.com/u/130960790?v=4",
        linkedin: "https://www.linkedin.com/in/mohamed-shahmi-7a9611290/",
        github: "https://github.com/MohamedShahmi",
      },
      {
        name: "Nipun Madutha",
        img: "https://avatars.githubusercontent.com/u/165867586?v=4",
        linkedin: "https://www.linkedin.com/in/nipun-madutha-4770aa2b9/",
        github: "https://github.com/Madutha123",
      },
      {
        name: "Ashen Thiwanka",
        img: "https://avatars.githubusercontent.com/u/96605596?v=4",
        linkedin: "https://www.linkedin.com/in/ashen-thiwanka-652820314/",
        github: "https://github.com/Ashen496",
      },
      {
        name: "Piumal Jayasekara",
        img: "https://avatars.githubusercontent.com/u/128359182?v=4",
        linkedin: "https://www.linkedin.com/in/piumal-jayasekara-29a512314/",
        github: "https://github.com/Piumal-jayasekara",
      },
      {
        name: "Kavindu Dilshan",
        img: "https://github.com/kavindu-dilshan/Booklr/blob/main/images/ReadMe/Members/kd-modified.png?raw=true",
        linkedin: "https://www.linkedin.com/in/kavindudilshan84/",
        github: "https://github.com/kavindu-dilshan",
      },
    ],
  },
  {
    id: 5,
    title: "Musicmash",
    date: "Jul 2023 - Oct 2023",
    description: "Musicmash is a Java web-based application for an online music store that brings a harmonious blend of user-friendly design with JSP (JavaServer Pages) and Servlet technologies. Developed using HTML, CSS, JS, Bootstrap, Java, and MySQL, this website offers a seamless and immersive experience for music enthusiasts.",
    image: musicmashImage,
    tags: ["Java", "JSP", "MySQL", "Bootstrap", "HTML", "CSS"],
    category: "web app",
    github: "https://github.com/kavindu-dilshan/Musicmash.git",
    webapp: "https://github.com/kavindu-dilshan/Musicmash.git",
    member: [
      {
        name: "Dishal Dasanayake",
        img: "https://avatars.githubusercontent.com/u/87950341?v=4",
        linkedin: "https://www.linkedin.com/in/dishal/",
        github: "https://github.com/DishaKD",
      },
      {
        name: "Sachith Nimendra",
        img: "https://avatars.githubusercontent.com/u/126912947?v=4",
        linkedin: "https://www.linkedin.com/in/sachith-nimendra-018828258/",
        github: "https://github.com/sachithnim",
      },
      {
        name: "Sandunika Nishadi",
        img: "https://raw.githubusercontent.com/kavindu-dilshan/Musicmash/main/src/main/webapp/images/ReadMe/Members/sa-modified.png?raw=true",
        linkedin: "https://www.linkedin.com/in/sandunika-nishadi-910410260",
        github: "https://github.com/Sandunika-29",
      },
      {
        name: "Kavindu Dilshan",
        img: "https://avatars.githubusercontent.com/u/125633025?v=4",
        linkedin: "https://www.linkedin.com/in/kavindudilshan84/",
        github: "https://github.com/kavindu-dilshan",
      },
    ],
  },
  {
    id: 6,
    title: "Booklr",
    date: "Feb 2023 - May 2023",
    description: "The website was developed using a combination of HTML and Bootstrap 5, seamlessly integrated into PHP files and enhanced with styles from external CSS files. For backend functionality, internal PHP scripts were employed, complemented by external JavaScript for dynamic interactions. The database management and local server hosting were facilitated through XAMPP.",
    image: booklrImage,
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"],
    category: "web app",
    github: "https://github.com/kavindu-dilshan/Booklr.git",
    webapp: "https://github.com/kavindu-dilshan/Booklr.git",
    member: [
      {
        name: "Dishal Dasanayake",
        img: "https://avatars.githubusercontent.com/u/87950341?v=4",
        linkedin: "https://www.linkedin.com/in/dishal/",
        github: "https://github.com/DishaKD",
      },
      {
        name: "Sachith Nimendra",
        img: "https://avatars.githubusercontent.com/u/126912947?v=4",
        linkedin: "https://www.linkedin.com/in/sachith-nimendra-018828258/",
        github: "https://github.com/sachithnim",
      },
      {
        name: "Mihiranga Fernando",
        img: "https://github.com/kavindu-dilshan/Booklr/blob/main/images/ReadMe/Members/mihi-modified.png?raw=true",
        linkedin: "https://www.linkedin.com/in/mihiranga-fernando-10608526a/",
        github: "https://github.com/mihirangaFDZ",
      },
      {
        name: "Raveen De Silva",
        img: "https://github.com/kavindu-dilshan/Booklr/blob/main/images/ReadMe/Members/rds-modified.png?raw=true",
        linkedin: "https://www.linkedin.com/in/raveen-de-silva-4a2804216/",
        github: "https://github.com/RaveenDE",
      },
      {
        name: "Kavindu Dilshan",
        img: "https://avatars.githubusercontent.com/u/125633025?v=4",
        linkedin: "https://www.linkedin.com/in/kavindudilshan84/",
        github: "https://github.com/kavindu-dilshan",
      },
    ],
  },
  {
    id: 7,
    title: "Kotlin Calculator",
    date: "Jan 2024 - Jan 2024",
    description: "This Kotlin-based application, developed in Android Studio, provides a user-friendly interface for seamless arithmetic calculations. The app embraces modern UI binding with View-Binding, enhancing code conciseness and maintainability.",
    image: calculatorImage,
    tags: ["Kotlin", "Android Studio"],
    category: "mobile app",
    github: "https://github.com/kavindu-dilshan/calculator-android-app.git",
    webapp: "https://github.com/kavindu-dilshan/calculator-android-app.git",
    member: [
      {
        name: "Kavindu Dilshan",
        img: "https://avatars.githubusercontent.com/u/125633025?v=4",
        linkedin: "https://www.linkedin.com/in/kavindudilshan84/",
        github: "https://github.com/kavindu-dilshan",
      },
    ],
  },
  {
    id: 8,
    title: "DoTask",
    date: "May 2024 - May 2024",
    description: "DoTask is a task management application developed to provide users with a streamlined way to organize and track their tasks effectively. It offers a user-friendly interface for managing tasks. The app utilizes various components of Android development, including SQLite databases with Room library.",
    image: doTaskImage,
    tags: ["Kotlin", "Android Studio"],
    category: "mobile app",
    github: "https://github.com/kavindu-dilshan/DoTask.git",
    webapp: "https://github.com/kavindu-dilshan/DoTask.git",
    member: [
      {
        name: "Kavindu Dilshan",
        img: "https://avatars.githubusercontent.com/u/125633025?v=4",
        linkedin: "https://www.linkedin.com/in/kavindudilshan84/",
        github: "https://github.com/kavindu-dilshan",
      },
    ],
  },
];
