<script>
import GroupsPage from './GroupsPage.vue';
import axios from 'axios';
export default {
  components: {
    GroupsPage
  },
  data() {
    return {
      years: [],
      selectedYear: null
    };
  },
  methods: {
    showComponent(year) {
      this.selectedYear = year;
    }
  },
  async mounted() {
    await fetch('https://innoschedule-api.onrender.com/admin/years')
      .then(res => res.json())
      .then((data) => {
        this.years = data
      });
  }
};
</script>

<template>
  <div class="course-container">
    <!-- <p v-if="!selectedYear">Check if the schedule is updated (the notification will appear in the telegram): <a href="" class="gradient-button-1">Download file</a></p> -->
    <div class="choose-course-container" :style="{ marginTop: selectedYear ? '20px' : '0' }">
      <h1 v-if="!selectedYear" class="choose-course-title">Choose a course:</h1>
      <div v-for="year in years" :key="year" class="course-option" @click="showComponent(year)">
        <button class="gradient-button-2" :class="{ active: selectedYear === year }">
          {{ year.name }}
        </button>
        <span v-if="selectedYear === year" class="arrow">&#9650;</span>
      </div>
    </div>
  </div>

  <div v-if="selectedYear">
    <GroupsPage :year="selectedYear" />
  </div>
</template>

<style>
.course-option {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow {
  margin-top: 5px;
}

.course-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  text-align: center;
  font-size: 20px;
}

.gradient-button-1 {
  text-decoration: none;
  display: inline-block;
  color: black;
  padding: 10px 20px;
  margin: 10px 20px;
  border-radius: 15px;
  border: 2px solid #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  text-transform: uppercase;
  background-image: linear-gradient(to right, #138613, #14b014, #138613);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
}

.gradient-button-1:hover {
  background-position: right center;
}

.gradient-button-2 {
  text-decoration: none;
  display: inline-block;
  color: white;
  padding: 10px 20px;
  margin: 10px 20px;
  border-radius: 15px;
  border: 2px solid #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  text-transform: uppercase;
  background-image: radial-gradient(at top left, #1e2493, #358a35);
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
}

.gradient-button-2:hover {
  background-position: right center;
}

.choose-course-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.choose-course-title {
  margin-right: 20px;
}
</style>


