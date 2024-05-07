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
    <div className="container px-5 py-10 bg-blue-50 mx-10 border border-gray-500 rounded-md">
      <CalendarHeaderRow />
      <CalendarBody calendarArray={calendarArray} month={month}/>
    </div>
  )
}