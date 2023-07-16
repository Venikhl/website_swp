<template>
    <div class="popup-container">
      <h2>Edit Event</h2>
      <label for="eventName">Event Name:</label>
      <input v-model="eventName" type="text" id="eventName" />
      <label for="eventDate">Event Date:</label>
      <input v-model="eventDate" type="text" id="eventDate" />
      <button @click="saveEventChanges">Save Changes</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      event: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        eventName: this.event.name,
        eventDate: this.event.date,
      };
    },
    methods: {
      saveEventChanges() {
        // Emit the updated event data with the changes
        this.$emit('event-updated', {
          ...this.event,
          name: this.eventName,
          date: this.eventDate,
        });
  
        // Close the popup
        this.$emit('close-popup');
      },
    },
  };
  </script>
  
  <style>
  .popup-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  