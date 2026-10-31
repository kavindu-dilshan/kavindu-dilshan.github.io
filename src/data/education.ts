import sliitIcon from '../images/icons/sliit.jpg';
import taxilaccIcon from '../images/icons/taxilacc.jpg';

export interface Education {
  id: number;
  img: string;
  school: string;
  date: string;
  grade: string;
  desc: string;
  degree: string;
  cardLabel?: string;
  startYear?: string;
  endYear?: string;
  tags?: string[];
  link?: string;
}

export const education: Education[] = [
  {
    id: 0,
    img: sliitIcon,
    school: "Sri Lanka Institute of Information Technology",
    date: "2022 - 2026",
    startYear: "2022",
    endYear: "2026",
    cardLabel: "01 | BACHELOR'S DEGREE",
    grade: "",
    desc: "I hold a BSc (Hons) in Information Technology specializing in Interactive Media from SLIIT. I have strong foundation at the intersection of technology and creative design, with a focus on multimedia systems, user experience (UX), and interactive media. Through hands-on problem-solving and digital media production, I have developed the technical and creative expertise needed to design engaging, user-centered digital experiences.",
    degree: "BSc (Hons) in Information Technology Specialising in Interactive Media",
    tags: ["Information Technology", "Interactive Media", "Multimedia"],
    link: "https://www.sliit.lk/",
  },
  {
    id: 1,
    img: taxilaccIcon,
    school: "Taxila Central College",
    date: "2012 - 2020",
    startYear: "2012",
    endYear: "2020",
    cardLabel: "02 | ADVANCED LEVEL",
    grade: "",
    desc: "During my time at Taxila Central College, I completed my G.C.E. Ordinary Levels and went on to complete my Advanced Levels in the Engineering Technology stream. Beyond academics, I was an active contributor to school life through the Western Brass Band and the Army Cadet Platoon. Serving in the cadet platoon was instrumental in cultivating my discipline, teamwork, and leadership abilities under rigorous training conditions.",
    degree: "Advanced Level (Engineering Technology)",
    tags: ["Engineering Technology", "Leadership", "Teamwork"],
    link: "https://www.facebook.com/Taxila/",
  },
];
