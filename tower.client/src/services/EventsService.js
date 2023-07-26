import { AppState } from "../AppState.js"
import { TEvent } from "../models/TEvent.js"
import { api } from "./AxiosService.js"

class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    // console.log('[GOT EVENTS]', res.data)
    AppState.events = res.data.map(data => new TEvent(data))
  }
}

export const eventsService = new EventsService()