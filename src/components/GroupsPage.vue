<script>
  import Calendar from './Calendar.vue';
  export default {
    components: {
      Calendar
    },
    props: ['year'],
    data() {
      return {
        groups: [],
        selectedGroup: null
      };
    },
    methods: {
      selectGroup(group) {
        this.selectedGroup = group;
      },
      async fetchGroups() {
        await fetch('https://innoschedule-api.onrender.com/admin/groups/' + this.year.id)
          .then(res => res.json())
          .then(data => {
            this.groups = data;
          });
      }
    },
    watch: {
      year: {
        immediate: true,
        handler(newYear) {
          this.fetchGroups();
          this.selectedGroup = null; // 'selectedGroup' обнуляется при изменении 'year'
        }
      }
    }
  };
</script>

<template>
  <div class="group-container">
    <div class="header">
      <h1 class="choose-group-title">Choose the group:</h1>
      <div class="dropdown">
        <button class="dropbtn">{{ selectedGroup ? selectedGroup.name : 'chosen group' }} &#9660;</button>
        <div class="dropdown-content">
          <a v-for="group in groups" :key="group" href="#" @click="selectGroup(group)">{{ group.name }}</a>
        </div>
      </div>
    </div>
    <div v-if="selectedGroup" class="schedule-title">
      <h1>Schedule of group {{ selectedGroup.name }}:</h1>
      <Calendar :group="selectedGroup" />
    </div>
  </div>
</template>

  
<style>
.group-container {
  margin-left: 10vh;
  margin-right: 10vh;
}

.header {
  display: flex;
  align-items: center;
}

.choose-group-title {
  margin-right: 20px;
}

.dropbtn {
  background-color: #383C8D;
  color: white;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 30px;
  border: 2px solid #ffffff;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #383C8D;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 20px;
  z-index: 9999; /* Высокое значение z-index */
  left: 50%;
  transform: translateX(-50%);
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #4e53b4;
  border-radius: 30px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #31357d;
}

.schedule-title {
  margin-right: 20px;
}
</style>
