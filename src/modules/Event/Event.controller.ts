import { Request, Response } from "express";
import eventService from "./Event.service";
import { getUserId } from "../../Utils/GetUserId";

class EventController {
  async create(req: Request, res: Response) {
    const { title, description, themeColor, date, hour } = req.body;
    const userId = getUserId(req);

    const event = await eventService.create(userId, {
      title,
      description,
      themeColor,
      date: new Date(date),
      hour,
    });

    return res.status(201).json(event);
  }

  async findAllByUser(req: Request, res: Response) {
    const userId = getUserId(req);
    const events = await eventService.findAllByUser(userId);
    return res.status(200).json(events);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const userId = getUserId(req);

    const event = await eventService.findById(id, userId);
    return res.status(200).json(event);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, themeColor, date, hour } = req.body;
    const userId = getUserId(req);

    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (themeColor) updateData.themeColor = themeColor;
    if (date) updateData.date = new Date(date);
    if (hour) updateData.hour = hour;

    const event = await eventService.update(id, userId, updateData);
    return res.status(200).json(event);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = getUserId(req);

    await eventService.delete(id, userId);
    return res.status(204).send();
  }
}

export default new EventController();
