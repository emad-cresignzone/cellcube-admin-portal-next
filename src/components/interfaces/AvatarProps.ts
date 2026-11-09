import type { AvatarTone } from "@/types/avatar";

export interface AvatarProps {
  initials: string;
  tone: AvatarTone;
  size?: number;
  textSize?: number;
}
