import { IconSvg } from '../IconSvg';

export function IconHowToUse({ className }: { className?: string }) {
  return (
    <IconSvg className={className}>
      <path d="M9 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
      <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
      <path d="M9 14h6M9 18h4" />
    </IconSvg>
  );
}
