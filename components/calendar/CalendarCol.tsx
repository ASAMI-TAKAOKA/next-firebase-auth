'use client'
import { useState } from 'react'
import dayjs from 'dayjs'
import { Stamp } from 'components/calendar/Stamp'

type Props = {
  day: string
  date: string
}

export const CalendarCol = ({ day, date }: Props) => {
  const [stamped, setStamped] = useState(false)
  const today = dayjs().format('YYYY-MM-DD')

  const stampAction = () => {
    setStamped(true)
  }

  return (
    <div className="grid grid-cols-1 grid-rows-1 cursor-pointer" onClick={() => stampAction()}>
      <span className="text-lg text-gray-500 row-start-1 row-end-2 col-start-1 col-end-2 self-center justify-self-center">
        {day}
      </span>
      <div className="row-start-1 row-end-5 col-start-1 col-end-5 self-center justify-self-center">
        <Stamp stamped={stamped} />
      </div>
    </div>
  )
}