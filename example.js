"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState([
    {
      id: 1,
      title: "Weekly Team Meeting",
      type: "Event",
      date: "2024-11-01",
      recurring: "weekly",
      description: "Team sync-up meeting.",
      time: "10:00 AM",
      location: "Conference Room A",
      attendees: 8,
    },
    {
      id: 2,
      title: "Appointment with client",
      type: "Appointment",
      date: "2024-11-02",
      recurring: null,
      description: "Discuss project requirements.",
      time: "2:00 PM",
      location: "Virtual Meeting",
      attendees: 3,
    },
    {
      id: 3,
      title: "Webinar on React",
      type: "Event",
      date: "2024-11-02",
      recurring: null,
      description: "Online webinar on React best practices.",
      time: "4:00 PM",
      location: "Online",
      attendees: 150,
    },
  ]);

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => {
      const isDirectMatch = event.date === dateStr;
      if (event.recurring === "weekly") {
        const eventDate = new Date(event.date);
        const dayDifference = Math.floor(
          (date.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        return dayDifference % 7 === 0;
      }
      return isDirectMatch;
    });
  };

  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 bg-background">
      {/* Left sidebar with improved calendar */}
      <div className="w-full lg:w-80">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              classNames={{
                months: "space-y-4",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
              }}
            />
          </CardContent>
        </Card>

        {/* Upcoming events section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {selectedEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "p-3 rounded-lg",
                        event.type === "Event" ? "bg-[#FFE4C8]" : "bg-[#E4F6ED]"
                      )}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No events for this date
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main content area */}
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Event Details</CardTitle>
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="bg-[#FFE4C8] text-[#0F4C81] hover:bg-[#F9BE81]"
              >
                Events
              </Badge>
              <Badge
                variant="secondary"
                className="bg-[#E4F6ED] text-[#0F4C81] hover:bg-[#5684AE]/20"
              >
                Appointments
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedEvents.length > 0 ? (
            <div className="space-y-6">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "p-6 rounded-lg space-y-4",
                    event.type === "Event" ? "bg-[#FFE4C8]" : "bg-[#E4F6ED]"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <p className="text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {event.recurring === "weekly" ? "Weekly" : "One-time"}
                    </Badge>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        {event.attendees} attendees
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No events scheduled</h3>
              <p className="text-muted-foreground">
                Select a date to view or create events
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Calendar({ selected, onSelect, className, classNames, components }) {
  return (
    <div className={cn("p-3", className)}>
      <div className={classNames.months}>
        <div className={classNames.month}>
          <div className={classNames.caption}>
            <div className={classNames.caption_label}>
              {selected.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className={classNames.nav}>
              <button
                className={cn(
                  classNames.nav_button,
                  classNames.nav_button_previous
                )}
              >
                <components.IconLeft />
              </button>
              <button
                className={cn(
                  classNames.nav_button,
                  classNames.nav_button_next
                )}
              >
                <components.IconRight />
              </button>
            </div>
          </div>
          <table className={classNames.table}>
            <thead className={classNames.head_row}>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <th key={day} className={classNames.head_cell}>
                  {day}
                </th>
              ))}
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4].map((week) => (
                <tr key={week} className={classNames.row}>
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                    const date = new Date(
                      selected.getFullYear(),
                      selected.getMonth(),
                      week * 7 + day - selected.getDay() + 1
                    );
                    const isSelected =
                      date.toDateString() === selected.toDateString();
                    const isToday =
                      date.toDateString() === new Date().toDateString();
                    return (
                      <td key={day} className={classNames.cell}>
                        <button
                          onClick={() => onSelect(date)}
                          className={cn(
                            classNames.day,
                            isSelected && classNames.day_selected,
                            isToday && classNames.day_today,
                            date.getMonth() !== selected.getMonth() &&
                              classNames.day_outside
                          )}
                        >
                          {date.getDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
