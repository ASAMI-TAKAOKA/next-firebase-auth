import React from "react";
import { TitleHeaderSection } from 'components/calendar/TitleHeaderSection';
import { CardSection } from 'components/calendar/CardSection';
import { createCalendarArray } from "utils/createCalendarArray";
import dayjs from 'dayjs';

const MobileAndTabletCalendar = () => {
  const year = dayjs().format('YYYY');
  const month = dayjs().format('M');
  // createCalendarArray(year, month)により、
  // calendarArray というプロパティの要素の1つであるdateには、
  // "2022-04-15" のような形式で日付が格納される
  const calendarArray = createCalendarArray(year, month);

  return (
    <div className="container mx-auto px-5 py-10 rounded-lg flex flex-col items-center gap-4">
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