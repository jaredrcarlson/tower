<template>
  <div v-if="event">
    <div class="row px-3 justify-content-around">
      <div class="col-5 py-3 bg-tw-secondary d-flex align-items-center">
        <img class="img-fluid event-img" :src="event.coverImg" alt="Event Photo" :title="event.name">
      </div>  
      <div class="col-7 py-3 bg-tw-secondary">
        <div class="d-flex flex-column justify-content-center">
          <div class="d-flex align-items-center justify-content-between">
            <div class="fw-bold">{{ event.name }}</div>
            <div class=""><small>{{ event.day }}</small></div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class=""><small>{{ event.location }}</small></div>
            <div class=""><small>{{ event.time }}</small></div>
          </div>
          <div class="mt-3"><small>{{ event.description }}</small></div>
          <div class="mt-4 d-flex align-items-center justify-content-between">
            <div v-if="event.isCanceled" class="px-5 canceled bg-tw-red fw-bold text-dark">Canceled</div>
            <div v-else-if="!event.capacity" class="px-5 canceled bg-tw-red fw-bold text-dark">Sold Out</div>
            <div v-else class="text-end"><span class="text-tw-light-blue">{{ event.capacity }}</span> spots left</div>
            <div>
              <button v-if="showButtons.attend" class="btn btn-sm bg-tw-yellow btn-custom" @click="attend()">
                  Attend
              </button>
              <button v-if="showButtons.cancel" class="ms-2 btn btn-sm bg-tw-red btn-custom" @click="cancel()">
                  Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row px-3 mt-3">
      <div class="col-12">
        <div class="text-tw-light"><small>See who is attending</small></div>
      </div>
    </div>

    <div class="row px-3 mt-1">
      <div class="col-12 py-1 bg-tw-secondary">
        <img v-for="ticket in eventTickets" :key="ticket.id" class="attendee-img" :src="ticket.profile.picture" :title="ticket.profile.name">
      </div>
    </div>

    <div class="row px-1 mt-4">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="text-tw-light"><small>What are people saying</small></div>
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row px-1 mt-1">
      <div class="col-2"></div>
      <div class="col-8 bg-tw-secondary">
        <div class="my-1 text-end text-tw-green"><small>Join the conversation</small></div>
        <textarea class="text-box" name="body" rows="4" placeholder="share your thoughts..."></textarea>
        <div class="d-flex justify-content-end">
          <button class="my-1 btn btn-sm bg-tw-green btn-custom" @click="postComment">
            post comment
          </button>
        </div>

        <div class="row mt-2">
          <div v-for="comment in eventComments" :key="comment.id" class="col-12 mb-2 d-flex">
            <img class="me-2 comment-img" :src="comment.creator.picture" :title="comment.creator.name">
            <div class="text-box bg-light rounded px-3">
              <div class="fw-bold"><small>{{ comment.creator.name }}</small></div>
              <div class=""><small>This was so much fun!</small></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>

  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import { commentsService } from '../services/CommentsService.js';
import { computed, onBeforeMount, onMounted, onUpdated, ref, watchEffect } from 'vue';
import { AppState } from "../AppState.js";
import Pop from '../utils/Pop.js';


export default {
  setup(){
    const route = useRoute()
    const showButtons = ref({
      attend: false,
      cancel: false
    })
    async function setActiveEvent() {
      await eventsService.setActiveEvent(route.params.eventId)
    }

    async function getActiveEventTickets() {
      try {
        await ticketsService.getTicketsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    
    async function getActiveEventComments() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function attend() {
      try {
        const ticketData = { eventId: route.params.eventId }
        await ticketsService.createTicket(ticketData)
        await getActiveEventTickets()
        updateAttendButton()
        Pop.toast('Created Ticket Successfully', 'success')
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function cancel() {
      try {
        const confirmed = await Pop.confirm()
        if(!confirmed) {
          Pop.toast('Event remains active')
          return
        }
        await eventsService.cancelEvent(route.params.eventId)
        updateCancelButton()
        Pop.toast('Event Cancelled Successfully', 'success')
      } catch (error) {
        Pop.error(error.message)
      }
    }

    function updateAttendButton() {
      const event = AppState.activeEvent
      const haveTicket = AppState.myTickets.find(ticket => ticket.eventId == event.id)
      showButtons.value.attend = event.isCanceled || !event.capacity || haveTicket ? false : true
    }

    function updateCancelButton() {
      const event = AppState.activeEvent
      const isMyEvent = AppState.account.id == event.creatorId     
      showButtons.value.cancel = isMyEvent && !event.isCanceled
    }

    onBeforeMount(async() => {
      await setActiveEvent()
      await getActiveEventTickets(AppState.activeEventTickets)
      await getActiveEventComments(AppState.activeEventComments)
    })
    
    onMounted(async() => {
      // await ticketsService.getMyTickets()
    })
    
    onUpdated(async() => {
      // await getActiveEventTickets()
      // await getActiveEventComments()
    })

    watchEffect(async() => {
      if(AppState.account.id) {
        await ticketsService.getMyTickets()
        updateAttendButton()
        updateCancelButton()
      }
      // await getActiveEventComments(AppState.activeEventComments)
    })

    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),
      myEvents: computed(() => AppState.myEvents),
      myTickets: ref(AppState.myTickets),
      eventTickets: computed(() => AppState.activeEventTickets),
      eventComments: computed(() => AppState.activeEventComments),
      showButtons,
      attend,
      cancel,
    }
  }
}
</script>


<style lang="scss" scoped>
.btn-custom:hover {
  cursor: pointer;
  background-color: #746234;
}

.attendee-img {
  height: 6vh;
  width: 6vh;
  border-style: solid;
  border-width: 2px;
  border-color: var(--tw-secondary);
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
.attendee-img:hover {
  cursor: pointer;
}

.comment-img {
  height: 8vh;
  width: 8vh;
  border-style: solid;
  border-width: 2px;
  border-color: var(--tw-secondary);
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.text-box {
  border-radius: .2em;
  width: 100%;
  max-width: 100%;
}

textarea {
  outline: none;
}
</style>