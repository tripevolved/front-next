import { IconSvg } from '../IconSvg';
export function IconFun({ className }: { className?: string }) {
  return <IconSvg className={className}><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></IconSvg>;
}
