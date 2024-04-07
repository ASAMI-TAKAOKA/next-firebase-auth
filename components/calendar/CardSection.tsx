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
    <div className="container mx-auto px-5 py-10 bg-blue-50 border border-gray-500 flex flex-col rounded-md">
      <CalendarHeaderRow />
      <CalendarBody calendarArray={calendarArray} month={month}/>
    </div>
  )
}