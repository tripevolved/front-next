import { IconSvg } from '../IconSvg';
export function IconDesign({ className }: { className?: string }) {
  return <IconSvg className={className}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 4v16" /></IconSvg>;
}
