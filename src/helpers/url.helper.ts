export const ensureSlashEnds = (url: string) => url.endsWith("/") ? url : `${url}/`;
export const ensureNotSlashStarts = (url: string) => url.startsWith("/") ? url.slice(1) : url;
export const ensureNotSlashEnds = (url: string) => url.endsWith("/") ? url.slice(0, -1) : url;
