import {
  EventCardData,
  EventType,
} from "@/components/public/widgets/cards/EventCard";
import { PublicEventListItem, PublicEventType } from "@/types";

const eventTypeLabels: Record<PublicEventType, EventType> = {
  webinar: "Webinar",
  workshop: "Workshop",
  exam: "Exam",
  bounty: "Bounty",
  hackathon: "Hackathon",
  community: "Community",
};

export function formatEventDate(value: string | null) {
  if (!value) return "Date to be announced";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export function formatEventTime(value: string | null) {
  if (!value) return undefined;
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(new Date(value));
}

function payloadText(
  payload: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = payload[key];
  return typeof value === "string" && value.trim() ? value : undefined;
}

export function mapPublicEventToCard(
  event: PublicEventListItem,
): EventCardData {
  return {
    id: String(event.id),
    type: eventTypeLabels[event.event_type],
    title: event.title,
    date: formatEventDate(event.starts_at),
    time: formatEventTime(event.starts_at),
    mentor: event.mentor_name || undefined,
    description: event.short_description || undefined,
    href: `/events/${event.slug}`,
    ctaLabel: payloadText(event.payload, "cta_label") ?? "View Event",
    meta: payloadText(event.payload, "theme"),
    prize: event.prize_pool || undefined,
    teamSize: event.team_size || undefined,
    deadline: payloadText(event.payload, "deadline"),
    certification: payloadText(event.payload, "certification"),
    location: event.location_label || undefined,
  };
}
