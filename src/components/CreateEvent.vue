<script>
export default {
  data() {
    return {
      years: [],
      selectedYear: '',
      groups: [],
      selectedGroup: '',
      selectedGroups: [],
      eventData: {
        title: '',
        lectureType: '',
        professorName: '',
        auditorium: '',
        date: '',
        time: '',
        year: '',
        groups: []
      },
      lecturers: [] // Add a new array to store the lecturer names
    };
  },
  created() {
    this.fetchYears();
    this.fetchLecturers(); // Call the method to fetch the lecturer data
    this.selectedYear = '';
  },
  methods: {
    async fetchYears() {
      try {
        const response = await fetch('https://innoschedule-api.onrender.com/admin/years');
        const data = await response.json();
        this.years = data;
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    },
    async fetchLecturers() {
      try {
        const response = await fetch('https://innoschedule-api.onrender.com/admin/lecturers');
        const data = await response.json();
        this.lecturers = data.map(lecturer => lecturer.name);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      }
    },
    async fetchGroups() {
      try {
        if (this.selectedYear) {
          const response = await fetch(`https://innoschedule-api.onrender.com/admin/groups/${this.selectedYear}`);
          const data = await response.json();
          this.groups = data.map(group => group.name);
          this.selectedGroup = '';
          this.selectedGroups = [];
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    addSelectedGroup() {
      if (this.selectedGroup && !this.selectedGroups.includes(this.selectedGroup)) {
        this.selectedGroups.push(this.selectedGroup);
        this.selectedGroup = '';
      }
    },
    clearSelectedGroups() {
      this.selectedYear = '';
      this.selectedGroups = [];
    },
    async createEvent() {
      try {
        const eventDataFormated = {
          title: this.eventData.title,
          type: this.eventData.lectureType,
          // room: this.eventData.auditorium,
          lecturer: this.eventData.professorName,
          date: `${this.eventData.date}T${this.eventData.time}:00.000Z`,
          groups: this.selectedGroups
        }
        console.log(JSON.stringify(eventDataFormated))
        const response = await fetch('https://innoschedule-api.onrender.com/admin/event/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(eventDataFormated)
        });

        if (response.ok) {
          console.log('Event created successfully!');
          this.eventData = {
            title: '',
            lectureType: '',
            professorName: '',
            auditorium: '',
            date: '',
            time: '',
            year: '',
            groups: []
          };
          this.selectedYear = '';
          this.selectedGroups = [];
        } else {
          console.error('Error creating event:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  }
};
</script>
<template>
  <div id="event-page-container">
    <h1 class="event-page-heading">&bull; Create Event &bull;</h1>
    <div class="event-page-underline"></div>
    <form @submit.prevent="createEvent" class="event-page-form" id="contact_form">
      <div class="event-page-full-space">
        <label for="lecture_title_input">Lecture Title:</label>
        <input type="text" id="lecture_title_input" placeholder="Title of the event" v-model="eventData.title" />
      </div>
      <div class="event-page-lecture-type">
        <label for="lecture_type_input">Lecture Type:</label>
        <div class="select-container">
          <select id="lecture_type_input" v-model="eventData.lectureType">
            <option disabled hidden value="">Choose Lecture Type</option>
            <option value="lec">Lecture</option>
            <option value="tut">Tutorial</option>
            <option value="lab">Lab</option>
          </select>
        </div>
      </div>
      <div class="event-page-name">
        <label for="professor_name_input">Professor Name:</label>
        <div class="select-container">
          <select id="professor_name_input" v-model="eventData.professorName">
            <option disabled hidden value="">Choose Professor</option>
            <option v-for="lecturer in lecturers" :value="lecturer" :key="lecturer">{{ lecturer }}</option>
          </select>
        </div>
      </div>
      <div class="event-page-auditorium">
        <label for="auditorium_input">Auditorium:</label>
        <input type="number" id="auditorium_input" placeholder="Auditorium" v-model="eventData.auditorium" />
      </div>
      <div class="event-page-date-time">
        <div class="event-page-date">
          <label for="date_input">Select Date:</label>
          <input type="date" id="date_input" v-model="eventData.date" />
        </div>
        <div class="event-page-space"></div>
        <div class="event-page-time">
          <label for="time_input">Select Time:</label>
          <input type="time" id="time_input" v-model="eventData.time" />
        </div>
      </div>
      <div class="event-page-year">
        <label for="year_input">Select Year:</label>
        <div class="select-container">
          <select v-model="selectedYear" @change="fetchGroups">
            <option disabled hidden value="">Choose year</option>
            <option v-for="year in years" :value="year.id" :key="year.id">{{ year.name }}</option>
          </select>
        </div>
      </div>
      <div class="event-page-subject">
        <label for="subject_input">Select Group:</label>
        <div class="select-container">
          <select v-model="selectedGroup">
            <option disabled hidden value="">Choose group</option>
            <option v-for="group in groups" :value="group" :key="group">{{ group }}</option>
          </select>
        </div>
        <div class="selected-groups">
          <p>{{ selectedGroups.join(', ') }}</p>
        </div>
      </div>
      <div class="button-container">
        <button type="button" class="button-clear" @click="clearSelectedGroups">Clear Selection</button>
        <button type="button" class="button-select" @click="addSelectedGroup" :disabled="!selectedGroup">Add Group</button>
      </div>
      <div class="event-page-submit">
        <input type="submit" value="Create event" id="form_button" />
      </div>
    </form>
  </div>
</template>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  label {
    color: black;
  }

  html {
    font-family: 'Montserrat', Arial, sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  button {
    overflow: visible;
  }

  button,
  input,
  select {
    text-transform: none;
  }

  button,
  input,
  select,
  textarea {
    color: #5a5a5a;
    font: inherit;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
  }

  #event-page-container {
    background-color: #fff5f5;
    border: solid 3px #fff5f5;
    max-width: 768px;
    margin: 60px auto;
    position: relative;
    border-radius: 30px;
  }

  .event-page-form {
    padding: 37.5px;
    margin: 50px 0;
  }

  .event-page-heading {
    color: black;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 7px;
    text-align: center;
    text-transform: uppercase;
  }

  .event-page-underline {
    border-bottom: solid 2px #474544;
    margin: -0.512em auto;
    width: 80px;
  }

  .event-page-name {
    margin-top: 20px;
  }

  .event-page-lecture-type {
    margin-top: 20px;
  }

  .event-page-auditorium {
    margin-top: 20px;
  }

  .event-page-date-time {
    display: flex;
    align-items: center;
  }

  .event-page-date {
    flex: 1;
  }

  .event-page-space {
    width: 20px;
  }

  .event-page-time {
    flex: 1;
  }

  input[type='text'],
  input[type='number'],
  input[type='date'],
  input[type='time'],
  select {
    border-bottom: solid 2px #474544;
    color: #474544;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  textarea {
    line-height: 150%;
    height: 150px;
    resize: none;
    width: 100%;
    border: solid 2px #474544;
    color: #474544;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 1px;
    margin: 0em 0 1.875em 0;
    padding: 0.875em 0;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  .event-page-subject {
    margin-top: 20px;
  }

  .select-container {
    position: relative;
  }

  .select-container::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    width: 18px;
    height: 18px;
    background: url('https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-down-32.png') no-repeat;
    background-size: 100% 100%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-right: 25px;
    border-bottom: solid 2px #474544;
    background-color: transparent;
    color: #474544;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 15px;
    text-transform: uppercase;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  .selected-groups {
    margin-top: 10px;
    color: black;
  }

  .selected-groups ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .selected-groups ul li {
    margin-bottom: 5px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
  }

  .button-select,
  .button-clear,
  input[type='submit'] {
    background: none;
    border: solid 2px #15b014;
    border-radius: 30px;
    color: black;
    cursor: pointer;
    font-family: 'Helvetica', Arial, sans-serif;
    font-size: 0.875em;
    font-weight: bold;
    outline: none;
    padding: 10px 15px;
    text-transform: uppercase;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  .button-select:hover,
  .button-clear:hover,
  input[type='submit']:hover {
    background: #15b014;
    color: #f2f3eb;
  }

  .event-page-submit {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 95%;
  }

  @media screen and (max-width: 768px) {
    #event-page-container {
      margin: 20px auto;
      width: 95%;
    }
  }

  @media screen and (max-width: 480px) {
    .event-page-heading {
      font-size: 26px;
    }

    .event-page-underline {
      width: 68px;
    }

    .button-select,
    .button-clear,
    input[type='submit'] {
      padding: 15px 25px;
    }
  }

  @media screen and (max-width: 420px) {
    .event-page-heading {
      font-size: 18px;
    }

    .icon {
      height: 35px;
      width: 35px;
    }

    .event-page-underline {
      width: 53px;
    }

    input[type='text'],
    input[type='number'],
    input[type='date'],
    input[type='time'],
    select {
      font-size: 0.875em;
    }
  }
</style>
