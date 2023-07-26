<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-white rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
        class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div> -->
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-center">
        <img src="../assets/img/concert.png" class="hero img-fluid">
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12">
      <div class="category d-flex justify-content-around">
          <div v-for="category in categories" :key="category" @click="selectCategory(category)"
          class="py-2 text-center btn-category" v-bind:class="{'text-category-select': category == selected}">
            {{ category }}
          </div>
      </div>
    </div>
  </div>
  <!-- <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between">
        <div v-for="category in categories" :key="category"
        class="py-2 text-center" v-bind:class="{'category-select': category == selected, 'category-unselect': category != selected}">x
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { ref } from 'vue';

  const selected = ref('All')
  function selectCategory(category) {
    selected.value = category
  }
  export default {
  setup() {
    return {
      categories: ['All', 'Concert', 'Convention', 'Sport', 'Digital'],
      selected,
      selectCategory
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.hero {
  border-radius: 0.2rem;
  border: 1px solid #56C7FB;
  width: 88vw;
  height: 20vh;
}

.category {
  background-color: #474c61;
}

.btn-category:hover {
  cursor: pointer;
}

.text-category-select {
  color: #79E7AB;
}
.category-select {
  height: 5px;
  color: #2A2D3A;
  background-color: #79E7AB;
  width: 15vw;
}
.category-unselect {
  color: #2A2D3A;
}
</style>
