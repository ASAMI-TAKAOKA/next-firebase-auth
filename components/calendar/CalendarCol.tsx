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
          <div
            className="row-start-1 row-end-5 col-start-1 col-end-5 self-center justify-self-center w-10 h-10 flex justify-center items-center"
          >
            <span
              className="text-lg text-gray-500 row-start-1 row-end-2 col-start-1 col-end-2 self-center justify-self-center"
            >
              {day}
            </span>
          </div>
        </button>
      </div>
    </>
  )
}