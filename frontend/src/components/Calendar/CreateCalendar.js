import DateRangePicker from './DateRangePickerComp'
import './Calendar.css'

function CreateCalendar() {
  return (
    <div className="Calendar">
      <h3>Survey Period</h3>
      <DateRangePicker />

    </div>
  );
}

export default CreateCalendar;