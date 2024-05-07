'use client'
import { useState } from 'react'
import dayjs from 'dayjs'
import BabyFoodRegistrationModal from "components/calendar/BabyFoodRegistrationModal"

type Props = {
  day: string
  date: string
}

export const CalendarCol = ({ day, date }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = dayjs().format('YYYY-MM-DD')

  return (
    <>
      <BabyFoodRegistrationModal
        open={isOpen}
        closeTheModal={() => setIsOpen(false)}
      />

      <div
        className="grid grid-cols-1 grid-rows-1 cursor-pointer"
      >
        <button
          onClick={() => setIsOpen(true)}
        >
          <span
            className="text-lg text-gray-500"
          >
            {day}
            </span>
        </button>
      </div>
    </>
  )
}