import { IconSvg } from '../IconSvg';

export function IconNonIdealFor({ className }: { className?: string }) {
  return (
    <IconSvg className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 8 8 8M16 8l-8 8" />
    </IconSvg>
  );
}
