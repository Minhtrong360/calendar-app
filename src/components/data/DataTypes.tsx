// Types
interface Event {
  id: string;
  title: string;
  event_type: "Appointment" | "Event";
  startDate: string; // ISO string
  endDate: string; // ISO string
  startTime: string;
  endTime: string;
  description?: string;
  location?: string;
  attendees?: number;
  color: string;
  recurring?: {
    type: "daily" | "weekly" | "monthly" | "yearly";
    interval: number; // e.g., every 2 weeks
    endDate?: string; // ISO string
    daysOfWeek?: number[]; // for weekly recurring [0-6]
    excludeDates?: string[]; // ISO strings for excluded dates
  };
  metadata?: Record<string, any>;
}

// API Response Structure
interface CalendarResponse {
  events: Event[];
  meta: {
    totalCount: number;
    startDate: string;
    endDate: string;
  };
}
