import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile event')
    return ticket
  }

  async getTicketById(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) {
      throw new BadRequest('The specified resource does not exist.')
    }
    return ticket
  }

  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('profile event')
    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile event')
    return tickets
  }

  async deleteTicket(ticketId) {
    const ticket = await this.getTicketById(ticketId)
    ticket.remove()
    return `Ticket with id: ${ticketId} was deleted successfully.`
  }
}

export const ticketsService = new TicketsService()