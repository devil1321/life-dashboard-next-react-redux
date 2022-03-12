import React, {useState} from 'react'
import Calendar from 'react-calendar'
import moment from "moment";

const CalendarWrapper:React.FC = () => {
  const [date,setDate] = useState<Date>(new Date())

  return (
    <Calendar   
        onChange={setDate}
        formatLongDate={(locale, date) => moment(date).format()}
        value={date}
    />
  )
}

export default CalendarWrapper