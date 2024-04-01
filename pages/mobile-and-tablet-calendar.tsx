import React from "react";
import { TitleHeaderSection } from 'components/calendar/TitleHeaderSection';
import { CardSection } from 'components/calendar/CardSection';
import { createCalendarArray } from "utils/createCalendarArray";
import dayjs from 'dayjs';

const MobileAndTabletCalendar = () => {
  const year = dayjs().format('YYYY');
  const month = dayjs().format('M');
  const calendarArray = createCalendarArray(year, month);

  return (
    <div className="bg-green-50 py-8 px-20 my-6 rounded-lg">
      <h2>離乳食の献立を登録する</h2>
      <div>
        {/* カレンダー */}
        <TitleHeaderSection year={year} month={month}/>
        <CardSection calendarArray={calendarArray} month={month}/>
      </div>
    </div>
  );
};

export default MobileAndTabletCalendar;