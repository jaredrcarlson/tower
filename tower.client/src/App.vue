<template>
  <header>
  </header>
  <main class="container-fluid">
    <div class="row bg-dark">
      <div class="col-10">
        <div class="row">
          <div class="col-12">
            <div class="my-3">
              <img src="./assets/img/Logo.png" class="logo img-fluid">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <router-view />
          </div>
        </div>
      </div>
      <div class="col-2 nav-col">
        <NavBar />
      </div>
    </div>
  </main>
   <footer>
   </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import NavBar from './components/Navbar.vue';

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { NavBar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  //--main-height: calc(100vh - 32px - 64px);
  --tw-dark: #2A2D3A;
  --tw-secondary: #474c61;
  --tw-light: #CCF3FD;
  --tw-light-blue: #56C7FB;
  --tw-green: #79E7AB;
  --tw-red: #FF5977;
  --tw-yellow: #FFD464;
}

// footer {
//   display: grid;
//   place-content: center;
//   height: 32px;
// }

main {
  height: 100vh;
  background: linear-gradient(#2A2D3A, #474c617a);
}

.logo {
  height: 6vh;
}

.nav-col {
  background: linear-gradient(#474c61c4 45%, #2a2d3a88);  
}

.text-tw-green {
  color: var(--tw-green);
}

.text-tw-secondary {
  color: var(--tw-secondary);
}

.text-tw-light-blue {
  color: var(--tw-light-blue);
}

.bg-tw-light {
  background-color: var(--tw-light);
}

.bg-tw-red {
  background-color: var(--tw-red);
}

.bg-tw-green {
  background-color: var(--tw-green);
}

.bg-tw-yellow {
  background-color: var(--tw-yellow);
}

.bg-tw-secondary {
  background-color: var(--tw-secondary);
}
</style>
