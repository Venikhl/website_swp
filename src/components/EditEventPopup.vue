<template>
  <div v-show="showPopup" class="eventPopup">
    <div class="editEventHeader">
      <h2>Event</h2>
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
        <select v-model="editedType" class="inputField">
          <option value="LECTURE">LECTURE</option>
          <option value="TUTORIAL">TUTORIAL</option>
          <option value="LAB">LAB</option>
        </select>
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
        <select v-model="editedProfessor" class="inputField">
          <option v-for="lecturer in lecturers" :key="lecturer.id" :value="lecturer.name">
            {{ lecturer.name }}
          </option>
        </select>
      </div>

      <!-- Add more event details here as needed -->

      <div class="buttonsContainer">
        <button class="button-select" @click="updateEvent">Update Event</button>
        <button class="button-delete" @click="deleteEvent">Delete Event</button>
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
      editedTitle: '', // Initialize form fields with empty values
      editedType: '',
      editedClassroom: '',
      editedProfessor: '',
      showPopup: true,
      lecturers: [], // To store the lecturer data from API
    };
  },
  methods: {
    async updateEvent() {
      try {
        const eventId = this.event.id; // Get the ID of the event to be updated

        const updatedEvent = {
          id: eventId, // Include the ID in the event data
          title: this.editedTitle,
          type: this.editedType,
          room: this.editedClassroom,
          lecturer: this.editedProfessor,
        };

        console.log(JSON.stringify(updatedEvent));

        const response = await fetch(`https://innoschedule-api.onrender.com/admin/event/update/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedEvent)
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Response:', responseData);
          this.$emit('event-updated', responseData); // Emit the updated event data to parent component

          // Reset the form fields to the initial event data when the update is successful
          this.editedTitle = this.event.title;
          this.editedType = this.event.type;
          this.editedClassroom = this.event.room;
          this.editedProfessor = this.event.lecturer ? this.event.lecturer.name : '';
        } else {
          console.error('Error updating event:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating event:', error);
      }
    },

    async deleteEvent() {
      try {
        const eventId = this.event.id; // Get the ID of the event to be deleted

        const response = await fetch(`https://innoschedule-api.onrender.com/admin/event/delete/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // You can optionally send a request body if required by the API
          body: JSON.stringify({'id': eventId}),
        });

        if (response.ok) {
          console.log('Event deleted successfully!');
          this.$emit('event-deleted', eventId); // Emit the deleted event ID to parent component
          this.closePopup(); // Close the popup after successful deletion
        } else {
          console.error('Error deleting event:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    },

    closePopup() {
      // Check if editedProfessor is defined before accessing its name property
      this.editedProfessor = this.event.lecturer ? this.event.lecturer.name : '';

      this.$emit('close-popup');
    },
    async fetchLecturers() {
      try {
        const response = await axios.get('https://innoschedule-api.onrender.com/admin/lecturers');
        this.lecturers = response.data;
      } catch (error) {
        console.error('Error fetching lecturers from API:', error);
      }
    },
  },
  watch: {
    event: {
      immediate: true,
      handler(newEvent) {
        if (newEvent) {
          // Check if newEvent is not null or undefined before accessing its properties
          this.editedTitle = newEvent.title;
          this.editedType = newEvent.type;
          this.editedClassroom = newEvent.room;
          this.editedProfessor = newEvent.lecturer ? newEvent.lecturer.name : '';
        }
      },
    },
  },

  async created() {
    await this.fetchLecturers();
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
.button-delete {
  width: 200px; /* Set a fixed width for both buttons */
  background: #b01414;
  border: solid 2px #b01414;
  border-radius: 30px;
  color: white;
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
