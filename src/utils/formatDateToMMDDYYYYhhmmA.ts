export const formatDateToMMDDYYYYhhmmA = (dateString: string): string => {
  if (!dateString) return "";

  // Normalize: replace space with "T", remove extra digits in milliseconds if any
  const normalized = dateString.replace(" ", "T").split(".")[0];
  const date = new Date(normalized);

  if (isNaN(date.getTime())) {
    return ""; // return empty if invalid
  }

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 => 12

  return `${mm}/${dd}/${yyyy} ${hours}:${minutes}:${seconds} ${ampm}`;
};
