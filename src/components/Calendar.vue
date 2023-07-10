<template>
  <div class="calendarInfo">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

export default {
  components: {
    FullCalendar
  },
  props: ['group'],
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true, // Изменено на true
        events: []
      }
    };
  },
  methods: {
    async fetchEvents() {
      const groupId = this.group.id;
      const apiUrl = `https://innoschedule-api.onrender.com/admin/events/${groupId}`;

      try {
        const response = await axios.get(apiUrl);
        const eventData = response.data;

        const events = eventData.map(event => ({
          title: event.title,
          start: new Date(event.date),
          // extendedProps: {
          //   recurring: {
          //     daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
          //   }
          // }
        }));
        // console.log(events)

        this.calendarOptions.events = events;
      } catch (error) {
        console.error('Ошибка при получении данных с API:', error);
      }
    },
  },
  watch: {
    group: {
      immediate: true,
      handler(newGroup) {
        this.fetchEvents();
      }
    }
  }
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
  width: 80%;
}

.fc-event-title {
  color: white;
  font-size: 16px;
}
</style>
