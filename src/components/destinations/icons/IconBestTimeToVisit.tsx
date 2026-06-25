import { IconSvg } from './IconSvg';

export function IconBestTimeToVisit({ className }: { className?: string }) {
  return (
    <IconSvg className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </IconSvg>
  );
}
