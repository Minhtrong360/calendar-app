import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Link as LinkIcon } from "lucide-react";
import { events } from "./data/events";
import { EventModal } from "./EventModal";
import { generateRecurringEvents } from "../lib/utils";

export default function DesktopView() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Hàm điều hướng tháng
  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  // Hàm lấy ngày đầu tiên của tháng
  const getFirstDayOfMonth = () => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
  };

  // Hàm lấy số ngày trong tháng
  const getDaysInMonth = () => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
  };

  // Tạo mảng các ngày trong tháng
  const generateCalendarDays = () => {
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();
    const daysInPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    const days = [];
    const weeks = [];

    // Ngày của tháng trước
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }

    // Ngày của tháng hiện tại
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    // Ngày của tháng sau
    const remainingDays = 42 - days.length; // 6 weeks * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    // Chia thành các tuần
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarDays = generateCalendarDays();

  // Add this function to handle recurring events
  const getAllEvents = () => {
    const allEvents = [];
    events.forEach((event) => {
      if (event.recurring) {
        const recurringEvents = generateRecurringEvents(event);
        allEvents.push(...recurringEvents);
      } else {
        allEvents.push(event);
      }
    });
    return allEvents;
  };

  // Update the getEventsForDate function
  const getEventsForDate = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return [];

    // Sửa lại format của dateStr để khớp với format trong events.js
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const allEvents = getAllEvents();

    return allEvents.filter((event) => {
      return event.date === dateStr;
    });
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation(); // Prevent calendar cell click event
    if (event.link) {
      window.open(event.link, "_blank", "noopener,noreferrer");
    }
  };

  // Thêm keyboard navigation
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        navigateMonth(-1);
        break;
      case "ArrowRight":
        navigateMonth(1);
        break;
    }
  };

  return (
    <div
      role="grid"
      aria-label="Calendar"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="md:w-[60vw] w-[100vw] mx-auto px-8 py-12 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8"
              onClick={() => {
                const today = new Date();
                setSelectedDate(today);
                setCurrentDate(new Date(today.getFullYear(), today.getMonth()));
              }}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigateMonth(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigateMonth(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <span className="font-bold text-[#0F4C81] text-2xl">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <Select defaultValue="month">
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 border-b">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="px-4 py-3 text-sm text-center text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((week, weekIndex) =>
              week.map(({ day, isCurrentMonth }, dayIndex) => {
                const dayEvents = getEventsForDate(day, isCurrentMonth);
                const isSelected =
                  isCurrentMonth &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentDate.getMonth() &&
                  selectedDate.getFullYear() === currentDate.getFullYear();

                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`min-h-[150px] p-2 border relative cursor-pointer flex flex-col items-center
                      ${!isCurrentMonth ? "bg-gray-50 text-gray-400" : ""}
                      ${dayEvents.length > 0 ? "bg-[#E4F6ED]" : ""}`}
                    onClick={() => {
                      // Tính toán tháng mới dựa trên ngày được chọn
                      let newMonth = currentDate.getMonth();
                      let newYear = currentDate.getFullYear();

                      if (!isCurrentMonth) {
                        // Nếu click vào ngày của tháng trước
                        if (day > 20) {
                          // Giả sử ngày của tháng trước
                          newMonth = newMonth - 1;
                          if (newMonth < 0) {
                            newMonth = 11;
                            newYear--;
                          }
                        }
                        // Nếu click vào ngày của tháng sau
                        else {
                          newMonth = newMonth + 1;
                          if (newMonth > 11) {
                            newMonth = 0;
                            newYear++;
                          }
                        }
                      }

                      // Cập nhật currentDate và selectedDate
                      const newDate = new Date(newYear, newMonth, day);
                      setCurrentDate(new Date(newYear, newMonth, 1));
                      setSelectedDate(newDate);

                      // Kiểm tra và hiển thị events nếu có
                      const dayEvents = getEventsForDate(day, true);
                      if (dayEvents.length > 0) {
                        setSelectedEvents(dayEvents);
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    <span
                      className={`text-sm font-medium w-8 h-8 flex items-center justify-center ${
                        isSelected ? "bg-[#0F4C81] rounded-full text-white" : ""
                      }`}
                    >
                      {day}
                    </span>
                    <div className="w-full mt-2 space-y-1">
                      {dayEvents.map((event, eventIndex) => (
                        <div
                          key={event.id || eventIndex}
                          className="group relative cursor-pointer"
                          onClick={(e) => handleEventClick(event, e)}
                        >
                          <div
                            className={`h-6 px-2 rounded flex items-center space-x-2 hover:opacity-90 ${
                              event.eventType === "Event"
                                ? "bg-[#F9BE81]"
                                : "bg-[#FFE4C8]"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                event.eventType === "Event"
                                  ? "bg-orange-600"
                                  : "bg-blue-600"
                              }`}
                            />
                            <span className="text-xs truncate pr-1">
                              {event.title}
                            </span>
                          </div>
                          <div className="hidden group-hover:block absolute z-10 bg-white border rounded-lg p-2 shadow-lg mt-1 w-36">
                            <div className="text-sm font-medium flex items-center justify-between">
                              {event.title}
                              {event.link && (
                                <LinkIcon className="h-3 w-3 text-gray-500" />
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <div>
                                {event.startTime} - {event.endTime}
                              </div>
                              <div>{event.eventType}</div>
                              <div>{event.location}</div>
                              <div>Attendees: {event.attendees}</div>
                              {event.description && (
                                <div className="mt-1">{event.description}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          events={selectedEvents}
        />
      </div>
    </div>
  );
}
