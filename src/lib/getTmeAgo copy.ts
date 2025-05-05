export const getTimeAgo = (date: string): string => {
  const now = new Date();
  const updatedDate = new Date(date);
  const diffTime = Math.abs(now.getTime() - updatedDate.getTime());

  const seconds = Math.floor(diffTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} day${days > 1 ? 's' : ''} ago`;
};
