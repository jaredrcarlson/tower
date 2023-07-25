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
      throw new UnAuthorized('Insufficient permissions to modify this resource.')
    }
    const editableKeys = ['name', 'description']
    editableKeys.forEach(key => {
      if (eventData[key] && eventData[key] != '') {
        towerEvent[key] = eventData[key]
      }
    })


    towerEvent.save()
    return towerEvent
  }

}

export const towerEventsService = new TowerEventsService()