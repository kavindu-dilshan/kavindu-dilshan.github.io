import ceymusicIcon from '../images/icons/ceymusic.jpg';
import arabiersIcon from '../images/icons/arabiers.jpg';

export interface Experience {
  id: number;
  img: string;
  role: string;
  company: string;
  date: string;
  desc: string;
  skills: string[];
  doc: string;
  link?: string;
}

export const experiences: Experience[] = [
  {
    id: 0,
    img: ceymusicIcon,
    role: "Multimedia Designer",
    company: "CeyMusic Pty Ltd",
    date: "November 2020 - Present",
    desc: "CeyMusic is an independent music publisher in Australia. As a Multimedia Designer, I design captivating artwork for songs by legendary Sri Lankan artists and musicians. My role involves creating dynamic lyric videos, YouTube thumbnails, jukeboxes, and a variety of music-related graphic designs, allowing me to creatively engage with the rich culture of Sri Lankan music.",
    skills: ["Graphic Design", "Motion Graphics", "Video Editing"],
    doc: "",
    link: "https://www.ceymusic.com.au/",
  },
  {
    id: 1,
    img: arabiersIcon,
    role: "UI Designer",
    company: "Arabiers",
    date: "July 2021 - July 2022",
    desc: "As a UI Designer at Arabiers, I designed visually stunning and user-friendly interfaces for the websites of a highly-rated tour operator in the UAE. I focused on creating captivating digital experiences that showcased an visas, and insider guides, connecting travelers with unforgettable journeys. Additionally, I delivered graphic design work to elevate the brand's visual identity.",
    skills: ["UI Design", "User Interface Design", "Adobe Xd", "Adobe Illustrator"],
    doc: "",
    link: "https://www.arabiers.lk/",
  },
];
