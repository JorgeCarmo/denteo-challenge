<template>
    <v-dialog
      v-if="visible && timeSlot"
      v-model="visible"
      persistent
      max-width="490"
    >
      <v-card>
        <v-card-title class="headline">
            Reserve timeslot
        </v-card-title>
        <v-card-text>Are you sure you want to reserve the following timeslot:</v-card-text>
        <v-card-text><b>From: </b>{{timeSlot.from}}</v-card-text>
        <v-card-text><b>To: </b>{{timeSlot.to}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirm"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'ConfirmDialog',
    props: {
        visible: {
            required: true,
            default: false,
            type: Boolean
        },
        timeSlot: {
            required: true,
            default: null
        }
    },
    methods: {
        confirm(){
            this.$emit('confirmed')
            this.closeDialog()
        },
        closeDialog(){
            this.$emit('update:visible', false)
        }
    }
  }
</script>