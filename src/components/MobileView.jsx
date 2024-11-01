import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useState } from "react";
import { events } from "./data/events";
import { generateRecurringEvents } from "../lib/utils";

export default function MobileView() {
  const [date, setDate] = useState(new Date());

  const handleDateSelect = (newDate) => {
    if (!newDate) return;

    if (
      date &&
      date.getDate() === newDate.getDate() &&
      date.getMonth() === newDate.getMonth() &&
      date.getFullYear() === newDate.getFullYear()
    ) {
      return;
    }

    setDate(newDate);
  };

  const getEventsForDate = (date) => {
    if (!date) return [];

    const dateStr = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const allEvents = [];
    events.forEach((event) => {
      if (event.recurring) {
        const recurringEvents = generateRecurringEvents(event);
        allEvents.push(...recurringEvents);
      } else {
        allEvents.push(event);
      }
    });

    return allEvents.filter((event) => event.date === dateStr);
  };

  const selectedEvents = getEventsForDate(date);

  const formatDisplayDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  const hasEvents = (day) => {
    if (!day) return false;

    const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(day.getDate()).padStart(2, "0")}`;

    const allEvents = [];
    events.forEach((event) => {
      if (event.recurring) {
        const recurringEvents = generateRecurringEvents(event);
        allEvents.push(...recurringEvents);
      } else {
        allEvents.push(event);
      }
    });

    return allEvents.some((event) => event.date === dateStr);
  };

  const handleEventClick = (event) => {
    if (event.link) {
      window.open(event.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white">
      <div className="p-4 space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-lg border w-full"
          modifiers={{
            selected: (day) =>
              date && day.toDateString() === date.toDateString(),
            today: (day) => day.toDateString() === new Date().toDateString(),
            hasEvents: (day) => hasEvents(day),
          }}
          modifiersStyles={{
            selected: {
              backgroundColor: "#0F4C81",
              color: "white",
            },
          }}
          modifiersClassNames={{
            hasEvents: "bg-[#E4F6ED]",
          }}
          classNames={{
            caption:
              "flex justify-center pt-1 relative items-center text-[#0F4C81] font-bold",
            nav_button_previous: "absolute left-1 text-[#0F4C81]",
            nav_button_next: "absolute right-1 text-[#0F4C81]",
          }}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-[#0F4C81]">Upcoming Events</h2>
            <Button variant="link" className="text-[#0F4C81] text-sm">
              View all
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {formatDisplayDate(date)}
          </div>

          <div className="space-y-3">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <Card
                  key={event.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all hover:opacity-90 hover:shadow-md ${
                    event.eventType === "Event"
                      ? "bg-[#F9BE81]"
                      : "bg-[#FFE4C8]"
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-medium flex items-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            event.eventType === "Event"
                              ? "bg-orange-600"
                              : "bg-blue-600"
                          }`}
                        />
                        {event.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.location} • {event.attendees} attendees
                      </div>
                    </div>
                    <Video className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No events scheduled for this day
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
