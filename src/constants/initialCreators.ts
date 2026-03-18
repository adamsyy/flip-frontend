export interface Creator {
  id: number;
  name: string;
  avatar_url: string;
  skills: string[];
  primary_skill: string;
  bio: string;
  age?: number;
  highlights: string[];
  insta_link?: string;
  is_public?: boolean;
}

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 15,
    name: "Layla",
    age: 22,
    bio: "I create lifestyle content on Instagram—mostly visual and aesthetic-focused. Still experimenting and figuring out what actually works. Looking to learn editing, design, or any hands-on creative skill.",
    avatar_url: "https://otakfsymqqbqlbahjldp.supabase.co/storage/v1/object/public/images/apply_1773811584841.jpeg",
    skills: [],
    primary_skill: "Content creation",
    highlights: [],
    insta_link: "https://www.instagram.com/its.laylalaland?igsh=cG1vZWZkOHVuNzFj&utm_source=qr",
    is_public: true
  },
  {
    id: 16,
    name: "Devi",
    age: 21,
    bio: "Classical dancer and singer who loves experimenting with fusion dishes.",
    avatar_url: "https://otakfsymqqbqlbahjldp.supabase.co/storage/v1/object/public/images/apply_1773821672497.jpeg",
    skills: ["singer", "chef", "Makeup artist", "yapper"],
    primary_skill: "Dancing",
    highlights: [],
    insta_link: "https://www.instagram.com/omgdevyy?igsh=MXJ5a2s1eG1xNnFpcw==",
    is_public: true
  }
];
