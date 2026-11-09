import type { AvatarProps } from "./interfaces/AvatarProps";
import { tones } from "./constants/avatarTones";

export default function Avatar({
  initials,
  tone,
  size = 22,
  textSize = 9,
}: AvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${tones[tone]}`}
      style={{ width: size, height: size, fontSize: textSize }}
    >
      {initials}
    </span>
  );
}
