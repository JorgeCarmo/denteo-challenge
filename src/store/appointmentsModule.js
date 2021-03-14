
const compareDay = (original, toCompare) => {
    return toCompare.getDate() == original.getDate() &&
        toCompare.getMonth() == original.getMonth() &&
        toCompare.getFullYear() == original.getFullYear()
}

const checkOverlaps = (original, toCompare) => {
    return original.from < new Date(toCompare.to) && new Date(toCompare.from) < original.to 
}

export default {
    namespaced: true,
    state: {
        // This is the range where our patient wants to have an appointment
        searchRange: { from: "2021-01-04", to: "2021-01-07" },

        // The dentists' current appointments, these times are blocked.
        weeklyAppointments: [
            { from: "2021-01-04T10:15:00", to: "2021-01-04T10:30:00" },
            { from: "2021-01-05T11:00:00", to: "2021-01-05T11:30:00" },
            { from: "2021-01-05T15:30:00", to: "2021-01-05T16:30:00" },
            { from: "2021-01-06T10:00:00", to: "2021-01-06T10:30:00" },
            { from: "2021-01-06T11:00:00", to: "2021-01-06T12:30:00" },
            { from: "2021-01-06T17:30:00", to: "2021-01-06T18:00:00" },
        ],



        timeSlotSizeInMinutes: 30,
        DAY_START: {
            hours: 8,
            minutes: 0,
            seconds: 0
        },
        DAY_END: {
            hours: 18,
            minutes: 0,
            seconds: 0
        },
        LUNCH_START: {
            hours: 12,
            minutes: 0,
            seconds: 0
        },
        LUNCH_END: {
            hours: 13,
            minutes: 0,
            seconds: 0
        }
    },
    actions: {
        async findFreeTimeslots ({state}) {
            let currentDay = new Date(state.searchRange.from)
            const dayStart = currentDay.getDate()
            const dayEnd = new Date(state.searchRange.to).getDate()

            let openAppointments = []
            for (let i = dayStart; i <= dayEnd; i++) {
                currentDay.setDate(i)
                let currentDayAppointmentList = _.filter(state.weeklyAppointments, 
                    (appointment)  => {
                        return compareDay(currentDay, new Date(appointment.from))
                    })

                currentDay.setHours(state.DAY_START.hours, state.DAY_START.minutes, state.DAY_START.seconds);

                while(currentDay.getHours() < state.DAY_END.hours){

                    // Create possible timeslot
                    let auxAppointment = {
                        from: new Date(currentDay.getTime()),
                        to: new Date(currentDay.getTime() + state.timeSlotSizeInMinutes*60000)
                    }
                    
                    // Add lunch to the appointment list as an appointment
                    currentDayAppointmentList.push(
                        {
                            from: new Date(currentDay.getTime()).setHours(state.LUNCH_START.hours, state.LUNCH_START.minutes, state.LUNCH_START.seconds),
                            to: new Date(currentDay.getTime()).setHours(state.LUNCH_END.hours, state.LUNCH_END.minutes, state.LUNCH_END.seconds),
                        }
                    )

                    // Check if the possible timeslot overlaps with any of the appointments
                    if(!_.some(currentDayAppointmentList,  (aux) => checkOverlaps(auxAppointment, aux)))
                    {
                        openAppointments.push(auxAppointment)
                    }
                    currentDay = new Date(currentDay.getTime() + state.timeSlotSizeInMinutes*60000)
                }
            }
            return openAppointments
        }
    }
}