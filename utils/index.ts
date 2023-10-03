export const formatDate = (date: Date) => date.toISOString().replace('T', ' ').replace(/\.[0-9]+Z/g, '');
