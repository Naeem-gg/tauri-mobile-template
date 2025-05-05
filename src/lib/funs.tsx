import { addMinutes, format } from "date-fns";

export function convertTime(inputTime: string): string {
  const [time] = inputTime.split(" "); // Extract the time part (e.g., "5:51:56")
  const [hours, minutes] = time.split(":").map(Number);

  const hours12 = hours % 12 || 12; // Convert to 12-hour format
  const formattedTime = `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return formattedTime;
}

export const addMinutesToTime = (n: number, time: string): string => {
  // Parse the input time string into a Date object
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0);

  // Add the specified minutes
  const updatedDate = addMinutes(date, n);

  // Format the result back to "HH:mm"
  return format(updatedDate, "HH:mm");
};

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
