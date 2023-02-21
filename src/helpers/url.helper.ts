export const ensureSlashEnds = (url: string) => url.endsWith("/") ? url : `${url}/`;
