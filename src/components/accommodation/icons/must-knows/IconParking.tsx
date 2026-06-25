import { IconSvg } from '../IconSvg';

export function IconParking({ className }: { className?: string }) {
  return (
    <IconSvg className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 8v8M9 8h3a2 2 0 1 1 0 4H9" />
    </IconSvg>
  );
}
