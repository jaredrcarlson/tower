import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.updateEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async createEvent(req, res, next) {
    try {
      const data = req.body
      data.creatorId = req.userInfo.id
      const newEvent = await eventsService.createEvent(data)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async getEvents(req, res, next) {
    try {
      const events = await eventsService.getEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await eventsService.getEventById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await ticketsService.getTicketsByEventId(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }


  async updateEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.id = req.params.eventId
      const userId = req.userInfo.id
      const updatedEvent = await eventsService.updateEvent(userId, eventData)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    }

  }
  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const cancelledEvent = await eventsService.cancelEvent(userId, eventId)
      return res.send(cancelledEvent)
    } catch (error) {
      next(error)
    }
  }
}