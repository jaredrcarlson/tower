<template>
  <div class="event-card selectable" @click="selectEvent">
    <img class="img-fluid event-img" :src="event.coverImg" alt="Event Photo" :title="event.name">
    <div class="p-2 bg-tw-secondary">
      <div class="fw-bold">{{ event.name }}</div>
      <div class=""><small>{{ event.location }}</small></div>
      <div class=""><small>{{ event.startDate.toLocaleDateString() }}</small></div>
      <div v-if="event.isCanceled" class="canceled bg-tw-red">Canceled</div>
      <div v-else class="text-end"><span class="text-tw-light-blue">{{ event.capacity }}</span> spots left</div>
    </div>
  </div>
</template>


<script>
import { TEvent } from '../models/TEvent.js';

export default {
  props: {
    event: {type: TEvent, required: true}
  },
   
  setup(){
    return {}
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