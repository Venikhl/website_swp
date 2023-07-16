<template>
  <div class="calendarInfo">
    <FullCalendar :options="calendarOptions" />
    <!-- Add the popup when an event is clicked -->
    <EditEventPopup v-if="clickedEvent" :event="clickedEvent" @close-popup="closePopup" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import EditEventPopup from './EditEventPopup.vue';

export default {
  components: {
    FullCalendar,
    EditEventPopup,
  },
  props: ['group'],
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        events: [],
        // Add eventClick handler here
        eventClick: this.showEditEventPopup,
      },
      clickedEvent: null,
    };
  },
  methods: {
    async fetchEvents() {
      const groupId = this.group.id;
      const apiUrl = `https://innoschedule-api.onrender.com/admin/events/${groupId}`;

      try {
        const response = await axios.get(apiUrl);
        const eventData = response.data;

        const events = eventData.map((event) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.date),
        }));

        this.calendarOptions.events = events;
      } catch (error) {
        console.error('Ошибка при получении данных с API:', error);
      }
    },
    showEditEventPopup(info) {
      const clickedEventId = info.event.id;
      this.clickedEvent = this.calendarOptions.events.find((event) => event.id === clickedEventId);
    },
    closePopup() {
      this.clickedEvent = null;
    },
  },
  watch: {
    group: {
      immediate: true,
      handler(newGroup) {
        this.fetchEvents();
      },
    },
  },
};
</script>

<style>
.calendarInfo {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  color: black;
}

.fc-daygrid-event {
  background-color: #F9B634 !important;
  border-color: #F9B634 !important;
  color: white;
}

.fc-event-title {
  color: white;
}
</style>
