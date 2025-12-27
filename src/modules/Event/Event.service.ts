import { CreateEventDTO } from "./dto/CreateEventDTO";
import { UpdateEventDTO } from "./dto/UpdateEventDTO";
import prisma from "../../config/database";
import createError from "http-errors";

const EVENT_SELECT = {
  id: true,
  title: true,
  description: true,
  themeColor: true,
  date: true,
  hour: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
} as const;

import { DateFormatter } from "../../Utils/DateFormatter";

export const formatEvent = (event: any) => ({
  ...event,
  date: DateFormatter.toYYYYMMDD(event.date),
});

class EventService {
  constructor(private db = prisma) {}

  async create(userId: string, data: CreateEventDTO) {
    const event = await this.db.event.create({
      data: {
        ...data,
        userId,
      },
      select: EVENT_SELECT,
    });

    return formatEvent(event);
  }

  async findAllByUser(userId: string) {
    const events = await this.db.event.findMany({
      where: { userId },
      select: EVENT_SELECT,
      orderBy: [{ date: "asc" }, { hour: "asc" }],
    });

    return events.map(formatEvent);
  }

  async findById(id: string, userId: string) {
    const event = await this.db.event.findUnique({
      where: { id },
      select: EVENT_SELECT,
    });

    if (!event) throw createError(404, "Event not found");

    if (event.userId !== userId) {
      throw createError(403, "You can only access your own events");
    }

    return formatEvent(event);
  }

  async update(id: string, userId: string, data: UpdateEventDTO) {
    const event = await this.db.event.findUnique({ where: { id } });

    if (!event) throw createError(404, "Event not found");

    if (event.userId !== userId) {
      throw createError(403, "You can only update your own events");
    }

    const updated = await this.db.event.update({
      where: { id },
      data,
      select: EVENT_SELECT,
    });

    return formatEvent(updated);
  }

  async delete(id: string, userId: string) {
    const event = await this.db.event.findUnique({ where: { id } });

    if (!event) throw createError(404, "Event not found");

    if (event.userId !== userId) {
      throw createError(403, "You can only delete your own events");
    }

    await this.db.event.delete({ where: { id } });
  }
}

export default new EventService();
