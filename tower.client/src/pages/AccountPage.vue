
<template>
  <div class="row">
    <div class="fs-4 mb-2 text-tw-green">My Events</div>
    <div v-for="event in events.slice(0,3)" :key="event.id" class="col-3 mb-3">
      <EventCard :event="event" />
    </div>
  </div>
  
  <div class="row mt-4">
    <div class="fs-4 mb-2 text-tw-green">Upcoming Events</div>
  </div>
  <div class="row mb-3" v-for="ticket in tickets" :key="ticket.id">
    <TicketCard :ticket="ticket" />
  </div>
  
    <!-- <div v-for="x in 3" :key="x" class="col-12 mb-2 d-flex">
      <img class="me-2 comment-img" :src="comment.picture" :title="comment.name">
      <div class="text-box bg-light rounded px-3">
        <div class="fw-bold"><small>{{ comment.name }}</small></div>
        <div class=""><small>This was so much fun!</small></div>
      </div>
    </div> -->

</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue';
import TicketCard from '../components/TicketCard.vue';

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      tickets: computed(() => AppState.events)
    }
  },
  components: { EventCard, TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
