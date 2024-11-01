import { Modal } from "antd";
import { CalendarIcon, MapPin, Users, Link as LinkIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

export const EventModal = ({ isOpen, onClose, events }) => {
  const handleEventClick = (event) => {
    if (event.link) {
      window.open(event.link, "_blank", "noopener,noreferrer");
    }
  };

  const formatEventDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, "EEEE, MMMM d, yyyy");
  };

  return (
    <Modal
      title="Event Details"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
    >
      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className={`p-6 rounded-lg space-y-4 cursor-pointer transition-all hover:opacity-90 ${
              event.eventType === "Event" ? "bg-[#F9BE81]" : "bg-[#FFE4C8]"
            }`}
            onClick={() => handleEventClick(event)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-muted-foreground mt-1">
                  {event.description}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {formatEventDate(event.date)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {event.recurring ? "Weekly" : "One-time"}
                </Badge>
                {event.link && <LinkIcon className="h-4 w-4 text-gray-500" />}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-sm">
                  {event.startTime} - {event.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{event.attendees} attendees</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
