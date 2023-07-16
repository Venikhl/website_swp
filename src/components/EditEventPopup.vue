<template>
  <div class="eventPopup">
    <h2>Edit Event</h2>
    <p><strong>Event ID:</strong> {{ event.id }}</p>
    <p><strong>Event Title:</strong> {{ event.title }}</p>
    <!-- Add more event details here as needed -->

    <button @click="updateEvent">Update Event</button>
    <button @click="closePopup">Close</button>
  </div>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    updateEvent() {
      // Implement your logic to update the event here
      // You can emit an event to notify the parent component (Calendar.vue) that the event is updated
      // For example: this.$emit('event-updated', updatedEvent);
    },
    closePopup() {
      // Emit an event to notify the parent component (Calendar.vue) to close the popup
      this.$emit('close-popup');
    },
  },
};
</script>

<style>
.eventPopup {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
