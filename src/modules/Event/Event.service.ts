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

    return event;
  }

  async findAllByUser(userId: string) {
    return this.db.event.findMany({
      where: { userId },
      select: EVENT_SELECT,
      orderBy: { date: "asc" },
    });
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

    return event;
  }

  async update(id: string, userId: string, data: UpdateEventDTO) {
    const event = await this.db.event.findUnique({ where: { id } });

    if (!event) throw createError(404, "Event not found");

    if (event.userId !== userId) {
      throw createError(403, "You can only update your own events");
    }

    return this.db.event.update({
      where: { id },
      data,
      select: EVENT_SELECT,
    });
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
