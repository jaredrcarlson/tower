import { AppState } from "../AppState.js"
import { TEvent } from "../models/TEvent.js"
import { api } from "./AxiosService.js"

class EventsService {
  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    const newEvent = new TEvent(res.data)
    AppState.events.unshift(newEvent)
    return newEvent
  }

  async getEvents() {
    const res = await api.get('api/events')
    // console.log('[GOT EVENTS]', res.data)
    AppState.events = res.data.map(data => new TEvent(data))
    this.filterByCategory('All')
  }

  filterByCategory(category) {
    if (category == 'All') {
      AppState.filteredEvents = AppState.events
    } else {
      AppState.filteredEvents = AppState.events.filter((event) => { return event.type == category.toLowerCase() })
    }
  }

  getEventById(eventId) {
    const event = AppState.events.find(e => e.id == eventId)
    return event
  }

  async setActiveEvent(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    const event = new TEvent(res.data)
    AppState.activeEvent = event
  }
}

export const eventsService = new EventsService()