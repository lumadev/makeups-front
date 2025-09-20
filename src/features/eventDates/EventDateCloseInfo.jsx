import dayjs from "dayjs"

function EventDateCloseInfo({ eventDates }) {
  if (!eventDates || eventDates.length === 0) return null

  const now = dayjs()
  const startOfMonth = now.startOf("month")
  const endOfMonth = now.endOf("month")

  const futureEventsThisMonth = eventDates
    .filter((event) => {
      const eventDateAndHour = dayjs(event.eventDate)

      const notFinished = eventDateAndHour.isAfter(now) || eventDateAndHour.isSame(now, "day")

      const overlapsMonth =
        (eventDateAndHour.isBefore(endOfMonth) || eventDateAndHour.isSame(endOfMonth, "day")) &&
        (eventDateAndHour.isAfter(startOfMonth) || eventDateAndHour.isSame(startOfMonth, "day"))

      return notFinished && overlapsMonth
    })
    .sort((a, b) => dayjs(a.initialDate).diff(dayjs(b.initialDate)))

  const closestEvent = futureEventsThisMonth[0]
  if (!closestEvent) return null

  return (
    <div className="my-2 text-sm text-gray-700 dark:text-gray-300">
      <strong>Evento próximo:</strong> {closestEvent.description} (
      {dayjs(closestEvent.eventDate).format("DD/MM")} -{" "}
    </div>
  )
}

export default EventDateCloseInfo
