export interface Project {
  titleKey: string;
  descriptionKey: string;
  challengeKey?: string;
  tags?: string;
  tagsKey?: string;
  src: string;
  link: string;
  color: string;
  imagePosition?: string;
  scaleRange?: [number, number];
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const projects: Project[] = [
  {
    titleKey: "projects.cards.soc.title",
    descriptionKey: "projects.cards.soc.description",
    challengeKey: "projects.cards.soc.challenge",
    tags: "Elastic SIEM · Suricata · Zeek · MITRE ATT&CK",
    src: "project1.jpg",
    link: "https://github.com/yourusername/soc-in-a-box",
    color: "#BBACAF",
    imagePosition: "center",
    scaleRange: [2, 1],
    objectFit: "cover"
  },
  {
    titleKey: "projects.cards.fpga.title",
    descriptionKey: "projects.cards.fpga.description",
    challengeKey: "projects.cards.fpga.challenge",
    tags: "VHDL · FPGA · FSM · ModelSim",
    src: "project2.jpg",
    link: "https://github.com/yourusername/fpga-occupancy",
    color: "#977F6D",
    imagePosition: "center",
    scaleRange: [2, 1],
    objectFit: "cover"
  },
  {
    titleKey: "projects.cards.portfolio.title",
    descriptionKey: "projects.cards.portfolio.description",
    challengeKey: "projects.cards.portfolio.challenge",
    tags: "React · Framer Motion · TypeScript · CSS",
    src: "project3.png",
    link: "#",
    color: "#C2491D",
    imagePosition: "center",
    scaleRange: [2, 1],
    objectFit: "cover"
  },
  {
    titleKey: "projects.cards.music.title",
    descriptionKey: "projects.cards.music.description",
    challengeKey: "projects.cards.music.challenge",
    tagsKey: "projects.cards.music.tags",
    src: "project4.jpg",
    link: "https://soundcloud.com/yourusername",
    color: "#B62429",
    imagePosition: "center",
    scaleRange: [2, 1],
    objectFit: "cover"
  }
];