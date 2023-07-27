import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { api } from "./AxiosService.js"

class TicketsService {
  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    const ticket = new Ticket(res.data)
    AppState.myTickets.push(ticket)
    return ticket
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data.map(data => new Ticket(data))
  }

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.activeEventTickets = res.data.map(data => new Ticket(data))
  }

  async deleteTicket(ticketId) {
    await api.delete(`api/tickets/${ticketId}`)
  }
}

export const ticketsService = new TicketsService()