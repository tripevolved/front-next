import { IconSvg } from '../IconSvg';

/** Bem-estar — beach lounger (side view). */
export function IconWellness({ className }: { className?: string }) {
  return (
    <IconSvg className={className}>
      <path d="M3 19h18" />
      <path d="M5 19 8.5 9.2a1.4 1.4 0 0 1 1.3-1h4.4a1.4 1.4 0 0 1 1.3 1l3.5 9.8" />
      <path d="M8.5 9.2 10 6.5a2 2 0 0 1 4 0l1.5 2.7" />
      <path d="M11 13.5h6.5" />
      <path d="M18.5 18.8V19" />
      <path d="M7.2 18.8V19" />
    </IconSvg>
  );
}
