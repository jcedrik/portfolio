export interface Project {
  title: string;
  description: string;
  challenge?: string;
  tags: string;
  src: string;
  link: string;
  color: string;
  imagePosition?: string;
  scaleRange?: [number, number];
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const projects: Project[] = [
  {
    title: "SOC-in-a-Box — Purple Team Lab",
    description: "Designed and deployed an end-to-end SOC lab environment, combining network, endpoint, and SIEM telemetry. Focused on real-world detection, incident response, and adversary emulation.",
    challenge: "Designing realistic detections while minimizing false positives across network and endpoint telemetry.",
    tags: "Elastic SIEM · Suricata · Zeek · MITRE ATT&CK",
    src: "project1.jpg",
    link: "https://github.com/yourusername/soc-in-a-box",
    color: "#BBACAF",
    imagePosition: "center",
    scaleRange: [2, 1],
    objectFit: "cover"
  },
  {
    title: "Occupancy Tracking System (FPGA)",
    description: "Designed and implemented a VHDL-based room occupancy tracking system, handling edge cases and validated through simulation and synthesis on FPGA.",
    challenge: "Handling edge cases and signal synchronization in a finite state machine implemented on FPGA.",
    tags: "VHDL · FPGA · FSM · ModelSim",
    src: "project2.jpg",
    link: "https://github.com/yourusername/fpga-occupancy",
    color: "#977F6D",
    imagePosition: "center",
    scaleRange: [2, 1],
    objectFit: "cover"
  },
  {
    title: "Personal Portfolio Website",
    description: "Built a modern, performance-focused personal website with a strong emphasis on clarity, UI, and recruiter experience. Developed collaboratively with advanced animations and interactive components.",
    challenge: "Balancing advanced animations with performance, accessibility, and recruiter-focused usability.",
    tags: "React · Framer Motion · TypeScript · CSS",
    src: "project3.png",
    link: "#",
    color: "#C2491D",
    imagePosition: "center",
    scaleRange: [2, 1],
    objectFit: "cover"
  },
  {
    title: "House Music & DJ Projects",
    description: "Creative exploration of house music through DJing and music production, blending structure, timing, and sound design.",
    challenge: "Translating musical structure and timing into cohesive DJ sets and original productions.",
    tags: "House · DJ · Music Production · Creative",
    src: "project4.jpg",
    link: "https://soundcloud.com/yourusername",
    color: "#B62429",
    imagePosition: "center",
    scaleRange: [2, 1],
    objectFit: "cover"
  }
];