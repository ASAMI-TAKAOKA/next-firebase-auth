import { CalendarBody } from 'components/calendar/CalendarBody'
import { CalendarHeaderRow } from 'components/calendar/CalendarHeaderRow'

type Props = {
  calendarArray: {
    id: number
    date: string
  }[]
  month: string
}

export const CardSection = ({calendarArray, month}: Props) => {
  return (
    <div className="flex flex-col p-2 border border-gray-500 rounded-md gap-4">
      <CalendarHeaderRow />
      <CalendarBody calendarArray={calendarArray} month={month}/>
    </div>
  )
}