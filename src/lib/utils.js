import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { events } from "../components/data/events";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export const getEventsForDate = (date) => {
  const dateStr = date.toISOString().split("T")[0];
  return events[dateStr] || [];
};

export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

export const generateRecurringEvents = (event) => {
  const events = [];
  const startDate = new Date(event.date);
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1); // Tạo events cho 1 năm

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (event.recurring) {
      switch (event.recurring) {
        case "daily":
          // Thêm event cho mỗi ngày
          events.push({
            ...event,
            date: currentDate.toISOString().split("T")[0],
          });
          currentDate.setDate(currentDate.getDate() + 1);
          break;

        case "weekly":
          // Thêm event cho mỗi tuần
          events.push({
            ...event,
            date: currentDate.toISOString().split("T")[0],
          });
          currentDate.setDate(currentDate.getDate() + 7);
          break;

        case "monthly":
          // Thêm event cho mỗi tháng
          events.push({
            ...event,
            date: currentDate.toISOString().split("T")[0],
          });
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;

        case "yearly":
          // Thêm event cho mỗi năm
          events.push({
            ...event,
            date: currentDate.toISOString().split("T")[0],
          });
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          break;

        default:
          return [event];
      }
    } else {
      // Nếu không phải recurring event, trả về event gốc
      return [event];
    }
  }

  return events;
};
