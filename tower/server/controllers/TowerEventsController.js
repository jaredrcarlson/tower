import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
  }
  async createTowerEvent(req, res, next) {
    try {
      const data = req.body
      data.creatorId = req.userInfo.id
      const newTowerEvent = await towerEventsService.createTowerEvent(data)
      return res.send(newTowerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents()
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEventById(req, res, next) {
    try {
      const towerEventData = req.body
      towerEventData.id = req.params.eventId
      const userId = req.userInfo.id
      const updatedTowerEvent = await towerEventsService.updateTowerEvent(userId, towerEventData)
      return res.send(updatedTowerEvent)
    } catch (error) {
      next(error)
    }
  }
}