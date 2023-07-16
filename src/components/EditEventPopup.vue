<template>
  <div v-show="showPopup" class="eventPopup">
    <div class="editEventHeader">
      <h2>Edit Event</h2>
    </div>
    <div class="formSection">
      <div class="formField">
        <label>
          <strong>Event Title:</strong>
        </label>
        <input v-model="editedTitle" class="inputField" />
      </div>

      <div class="formField">
        <label>
          <strong>Event Type:</strong>
        </label>
        <input v-model="editedType" class="inputField" />
      </div>

      <div class="formField">
        <label>
          <strong>Classroom:</strong>
        </label>
        <input v-model="editedClassroom" class="inputField" />
      </div>

      <div class="formField">
        <label>
          <strong>Professor:</strong>
        </label>
        <input v-model="editedProfessor" class="inputField" />
      </div>

      <!-- Add more event details here as needed -->

      <div class="buttonsContainer">
        <button class="button-select" @click="updateEvent">Update Event</button>
        <button class="button-clear" @click="closePopup">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  props: ['event'],
  data() {
    return {
      editedTitle: '',
      editedType: '',
      editedClassroom: '',
      editedProfessor: '',
      showPopup: true,
    };
  },
  methods: {
    async updateEvent() {
      const updatedEvent = {
        ...this.event,
        title: this.editedTitle,
        type: this.editedType,
        room: this.editedClassroom,
        lecturer: this.editedProfessor,
      };

      try {
        const response = await axios.put('https://innoschedule-api.onrender.com/admin/form', updatedEvent);
        // If the request is successful, you can handle the response here if needed
        console.log('Response:', response.data);
        this.$emit('event-updated', updatedEvent);
      } catch (error) {
        // If there's an error with the API request, handle it here
        console.error('Error:', error);
      }

      this.closePopup();
    },
    closePopup() {
      this.$emit('close-popup');
    },
  },
  watch: {
    event: {
      immediate: true,
      handler(newEvent) {
        this.editedTitle = newEvent.title;
        this.editedType = newEvent.type;
        this.editedClassroom = newEvent.room;
        this.editedProfessor = newEvent.lecturer;
      },
    },
  },
};
</script>


<style>
.eventPopup {
  background-color: #15B014;
  border: 3px solid black;
  border-radius: 10px;
  color: black;
  position: fixed; /* Use fixed positioning */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  /* Rest of the styles remain unchanged */
}

.editEventHeader {
  background-color: #15B014;
  color: white;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-bottom: 10px;
  position: relative;
}

.formSection {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}

.formField {
  margin-bottom: 10px;
}

.formField label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
}

.inputField {
  width: 200px; /* Set a fixed width for all inputs */
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure the input width includes padding and border */
}

.buttonsContainer {
  display: flex;
  flex-direction: column; /* Place buttons below each other */
  align-items: center; /* Center buttons horizontally */
  margin-top: 10px;
}

.button-select,
.button-clear,
input[type='submit'] {
  width: 200px; /* Set a fixed width for both buttons */
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
  margin-top: 10px;
}

/* Apply specific styles to the "Close" button */
.button-clear {
  background-color: #15b014;
  color: white;
  border-color: #15b014;
}
</style>
