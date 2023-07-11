<template>
  <header v-if="!hideHeader">
    <div class="wrap-logo">
        <img src="./icons/innopolis_logo.png" alt="Innopolis Logo">
    </div>
    <nav>
      <h2 @click="selectItem('create_event_page')"><a href="#addevent">Add event</a></h2>
      <h2 @click="selectItem('home_page')"><a href="#home" class="white-underline">Home</a></h2>
      <h2><a href="#language" class="white-underline">En</a></h2>
      <h2 @click="selectItem('login_page')"><a href="#logout" class="black-text">Log out</a></h2>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      hideHeader: false // Флаг для скрытия заголовка
    };
  },
  methods: {
    selectItem(item) {
      this.$emit('item-selected', item);
      // Проверяем выбранный элемент и скрываем заголовок при выборе "login_page"
      if (item === 'login_page') {
        this.hideHeader = true;
      } else {
        this.hideHeader = false;
      }
    }
  }
};
</script>


<style scoped>
* {box-sizing: border-box;}

body {
  margin: 0;
  padding: 0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #15B014;
  padding: 3px;
  border-radius: 10px;
}

.wrap-logo {
  display: flex;
  align-items: center;
  margin-left: 20px; /* Add the desired left margin value */
}

header a {
  color: #FFFFFF;
  padding: 8px 12px;
  text-decoration: none;
  font-size: 20px;
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out;
}

header a.logo {
  font-weight: bold;
}

header a.white-underline {
  text-decoration: underline;
  text-decoration-color: white;
  text-decoration-thickness: 2px;
}

header a.black-text {
  color: black;
}

header a:hover {
  background-color: #FED93D;
}

nav {
  display: flex;
  align-items: center;
  margin-top: 0;
}

header a.logo:hover {
  background-color: transparent;
  text-decoration: none;
}

img {
  width: 35%;
  height: auto;
}
</style>
