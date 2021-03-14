<template>
  <v-container>
    <v-list rounded>
      <v-subheader>Open TimeSlots</v-subheader>
      <v-list-item-group
        v-model="selectedTimeSlot"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in openTimeSlots"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'HelloWorld',
    computed: {
      ...mapState('appointmentsModule', {
        weeklyAppointments: 'weeklyAppointments',
        openTimeSlots: 'openTimeSlots'
      })
    },
    data: () => ({
      selectedTimeSlot: null

    }),
    methods: {
      ...mapActions('appointmentsModule', {
        findFreeTimeslots: 'findFreeTimeslots'
      })
    },
    created () {
      this.findFreeTimeslots()
    }
  }
</script>
