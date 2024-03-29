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
    <div className="bg-blue-50 border border-gray-500 flex flex-col p-8 rounded-md gap-4">
      <CalendarHeaderRow />
      <CalendarBody calendarArray={calendarArray} month={month}/>
    </div>
  )
}