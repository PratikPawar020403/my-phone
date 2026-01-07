
export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    imageUrl: string;
}

export const TIMELINE: TimelineEvent[] = [
    {
        year: "School (I-X) (2008-2018)",
        title: "The Beginning",
        description: "Where curiosity quietly took shape. These early years built my habit of asking questions, learning deeply, and finding joy in understanding how things work.",
        imageUrl: "/assets/identity/school.jpg"
    },
    {
        year: "Jr.College (XI-XII) (2018-2020)",
        title: "Exploration",
        description: "A phase of self-discovery and reflection. Discovering what interested me, how I thought, and the direction I wanted to take. This period helped shape my perspective and sense of self.",
        imageUrl: "/assets/identity/clg1.jpg"
    },
    {
        year: "Bachelor's College (Bsc-Cs) (2020-2023)",
        title: "Growth",
        description: "A time of focused growth and consistency. Working through concepts, challenges, and projects that strengthened my understanding and approach to problem-solving.",
        imageUrl: "/assets/identity/clg2.jpg"
    },
    {
        year: "Post Graduation (Msc-It) (2024-2026)",
        title: "Launchpad",
        description: "A point of readiness. Clear direction, applied thinking, and confidence to move forward. Prepared to build thoughtfully and with intent.",
        imageUrl: "/assets/identity/clg3.jpg"
    }
];
