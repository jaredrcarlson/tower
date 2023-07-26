import { dbContext } from "../db/DbContext.js"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class TowerEventsService {
  async createTowerEvent(data) {
    const towerEvent = await dbContext.TowerEvents.create(data)
    await towerEvent.populate('creator ticketCount')
    return towerEvent
  }

  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator ticketCount')
    return towerEvents
  }

  async getTowerEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId).populate('creator ticketCount')
    if (!towerEvent) {
      throw new BadRequest(`Tower Event with id: ${eventId} does not exist.`)
    }
    return towerEvent
  }

  async updateTowerEvent(userId, eventData) {
    const towerEvent = await this.getTowerEventById(eventData.id)
    if (userId != towerEvent.creatorId) {
      throw new UnAuthorized('Insufficient permissions for this request.')
    }
    if (towerEvent.isCanceled) {
      throw new BadRequest('The specified resource cannot be modified.')
    }
    if ('name' in eventData && eventData.name != '') {
      towerEvent.name = eventData.name
    }
    if ('description' in eventData && eventData.description != '') {
      towerEvent.description = eventData.description
    }
    towerEvent.save()
    return towerEvent
  }

  async cancelTowerEvent(userId, eventId) {
    const towerEvent = await this.getTowerEventById(eventId)
    if (userId != towerEvent.creatorId) {
      throw new UnAuthorized('Insufficient permissions for this request.')
    }
    towerEvent.isCanceled = true
    towerEvent.save()
    return towerEvent
  }

}

export const towerEventsService = new TowerEventsService()