<template>
    <div id="event-page-container">
      <h1 class="event-page-heading">&bull; Create Event &bull;</h1>
      <div class="event-page-underline"></div>
      <form action="#" method="post" class="event-page-form" id="contact_form">
        <div class="event-page-full-space">
          <label for="title"></label>
          <input type="text" placeholder="Title of the event" name="title" id="title_input" required />
        </div>
        <div class="event-page-lecture-type">
          <label for="lecture type"></label>
          <input type="text" placeholder="Lecture type" name="lecture type" id="type_input" required />
        </div>
        <div class="event-page-name">
          <label for="professor name"></label>
          <input type="text" placeholder="Professor name" name="professor name" id="name_input" required />
        </div>
        <div class="event-page-auditorium">
          <label for="auditorium"></label>
          <input type="number" placeholder="Auditorium" name="auditorium" id="auditorium_input" required />
        </div>
        <div class="event-page-date-time">
          <div class="event-page-date">
            <label for="date"></label>
            <input type="date" name="date" id="date_input" required />
          </div>
          <div class="event-page-time">
            <label for="time"></label>
            <input type="time" name="time" id="time_input" required />
          </div>
        </div>
        <div class="event-page-subject">
          <label for="subject"></label>
          <div class="select-container">
            <select
              placeholder="Choose group"
              name="subject"
              id="subject_input"
              required
              v-model="selectedGroup"
            >
              <option disabled hidden value="">Choose group</option>
              <option v-for="group in groups" :value="group" :key="group">{{ group }}</option>
            </select>
          </div>
          <div class="selected-groups">
            <p>{{ selectedGroups.join(', ') }}</p>
          </div>
        </div>
        <button type="button-select" @click="addSelectedGroup" :disabled="!selectedGroup">Add Group</button>
        <button type="button-clear" @click="clearSelectedGroups">Clear Selection</button>
        <div class="event-page-submit">
          <input type="submit" value="Create event" id="form_button" />
        </div>
      </form><!-- // End form -->
    </div><!-- // End #event-page-container -->
  </template>
  
  
  <style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  
  html {
    font-family: 'Montserrat', Arial, sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  
  button {
    overflow: visible;
  }
  
  button,
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
  
  .event-page-date {
    margin-top: 20px;
  }
  
  .event-page-time {
    margin-top: 20px;
  }
  
  input[type='text'] {
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
  
  input[type='number'] {
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
  
  input[type='date'] {
    border-bottom: solid 2px #474544;
    color: #474544;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    /* width: 50%; */
    width: 100%;
    margin-right: 135px;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  
  input[type='time'] {
    border-bottom: solid 2px #474544;
    color: #474544;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    /* width: 50%; */
    width: 100%;
    margin-left: 165px;
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
  
  /* button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  } */
  
  button[type='button-select'] {
    background: none;
    border: solid 2px #15B014;
    border-radius: 30px;
    color: black;
    cursor: pointer;
    display: inline-block;
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
  
  button[type='button-select']:hover {
    background: #15B014;
    color: #f2f3eb;
  }
  
  button[type='button-clear'] {
    background: none;
    border: solid 2px #15B014;
    border-radius: 30px;
    color: black;
    cursor: pointer;
    display: inline-block;
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
    float: right;
  }
  
  button[type='button-clear']:hover {
    background: #15B014;
    color: #f2f3eb;
  }
  
  .event-page-submit {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 95%;
  }
  
  #form_button {
  background: #15B014;
  border: solid 2px #15B014;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-family: 'Helvetica', Arial, sans-serif;
  font-size: 0.875em;
  font-weight: bold;
  outline: none;
  padding: 20px 35px;
  text-transform: uppercase;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  width: 100%;
  box-sizing: border-box;
  }
  
  #form_button:hover {
    background: #40f540;
    border: solid 2px #40f540;
    
  }
  .event-page-date-time {
  display: flex;
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
  
    #form_button {
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
    textarea {
      font-size: 0.875em;
    }
  }
  
  
  </style>
  
  <script>
  export default {
    data() {
      return {
        groups: [
          'BS22-CS-01',
          'BS22-CS-02',
          'BS22-CS-03',
          'BS22-CS-04',
          'BS22-CS-05',
          'BS22-CS-06',
          'BS22-DSAI-01',
          'BS22-DSAI-02',
          'BS22-DSAI-03',
          'BS22-DSAI-04'
        ],
        selectedGroup: '',
        selectedGroups: []
      };
    },
    methods: {
      addSelectedGroup() {
        if (this.selectedGroup && !this.selectedGroups.includes(this.selectedGroup)) {
          this.selectedGroups.push(this.selectedGroup);
          this.selectedGroup = '';
        }
      },
      clearSelectedGroups() {
        this.selectedGroups = [];
      }
    }
  };
  </script>
  