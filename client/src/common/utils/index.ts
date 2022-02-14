export const isProd = /^prod(?:uction)?$/.test(process.env.NODE_ENV ?? '');
