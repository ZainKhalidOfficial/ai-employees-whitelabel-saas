import { LucideIcon } from "lucide-react";

export type Testimonial = {
  id: number;
  name: string;
  designation: string;
  content: string;
  icon: LucideIcon; //string
  star: number;
};
