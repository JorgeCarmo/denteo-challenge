<template>
  <v-container>
    <v-card>
      <v-card-title>
        Available Time Slots
      </v-card-title>
      <v-list rounded>
        <v-list-item-group
          v-model="timeSlotIndex"
          color="primary"
          @change="clickTimeSlot"
        >
          <v-list-item
            v-for="(timeSlot, index) in openTimeSlots"
            :key="index"
          >
            <v-list-item-avatar>
              <v-icon>mdi-clock-outline</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="timeSlot.from"></v-list-item-title>

              <v-list-item-subtitle v-text="timeSlot.to"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <confirm-dialog :time-slot="selectedTimeSlot"
                    :visible.sync="confirmDialogVisible"
                    @confirmed="confirmAddAppointment"/>
  </v-container>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import ConfirmDialog from './ConfirmDialog'
  export default {
    name: 'TimeSlotList',
    components: {
      ConfirmDialog
    },
    computed: {
      ...mapState('appointmentsModule', {
        weeklyAppointments: 'weeklyAppointments',
        openTimeSlots: 'openTimeSlots'
      })
    },
    data: () => ({
      selectedTimeSlot: null,
      timeSlotIndex: null,
      confirmDialogVisible: false

    }),
    methods: {
      ...mapMutations('appointmentsModule', {
        addAppointment: 'addAppointment'
      }),
      ...mapActions('appointmentsModule', {
        findFreeTimeslots: 'findFreeTimeslots'
      }),
      clickTimeSlot(timeSlotIndex){
        this.selectedTimeSlot = this.openTimeSlots[timeSlotIndex]
        this.confirmDialogVisible = true
      },
      confirmAddAppointment(){
        this.addAppointment(this.selectedTimeSlot)
      }
    },
    created () {
      this.findFreeTimeslots()
    }
  }
</script>
