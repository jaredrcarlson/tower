<template>
  <div class="col-2"></div>
  <div class="col-8">
    <div class="row g-0">
      <div class="col-4">
        <img class="img-fluid event-img" :src="events[0].coverImg" alt="Event Photo" :title="events[0].name">
      </div>
      <div class="col-8 px-3 py-2 bg-tw-secondary">
        <div class="fw-bold">{{ events[0].name }}</div>
        <div class=""><small>{{ events[0].location }}</small></div>
        <div class=""><small>{{ events[0].day }}</small></div>
        <div v-if="true" class="mx-5 mt-4 canceled bg-tw-red fw-bold text-dark rounded">not going</div>
      </div>
    </div>
  </div>
  <div class="col-2"></div>
</template>


<script>
import { computed } from 'vue';
import { Ticket } from '../models/Ticket.js';
import { AppState } from '../AppState.js';

export default {
  props: {
    ticket: {type: Ticket, required: true}
  },
  
  setup(){
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>


<style lang="scss" scoped>
.event-card {
  border-radius: 0.2rem;
  border: 3px solid var(--tw-secondary);
  // height: 25vh;
  // width: 22vw;
  
}

.event-img {
  object-fit: contain;
  object-position: center;
}

.canceled {
  text-align: center;
  color: black;
}
</style>