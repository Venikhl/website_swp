<template>
  <div>
    <Header @item-selected="handleItemSelected" />
    <component v-if="selectedItem === 'home_page'" :is="'HomePage'" />
    <component v-if="selectedItem === 'create_event_page'" :is="'CreateEvent'" />
    <component v-if="selectedItem === 'login_page'" :is="'LoginPage'" />
  </div>
</template>


<script>
import Header from './components/Header.vue';
import HomePage from './components/HomePage.vue';
import CreateEvent from './components/CreateEvent.vue';
import LoginPage from './components/LoginPage.vue'

export default {
  components: {
    Header,
    HomePage,
    CreateEvent,
    LoginPage
  },
  data() {
    return {
      selectedItem: 'home_page'
    };
  },
  methods: {
    handleItemSelected(item) {
      this.selectedItem = item;
    }
  }
};
</script>
