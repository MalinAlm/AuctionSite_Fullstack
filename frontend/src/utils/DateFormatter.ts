export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString("sv-SE", {
    dateStyle: "short",
    timeStyle: "short",
  });
};
