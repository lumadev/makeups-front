import { useEffect, useState, useRef } from "react";

function DateInput({ 
  isEdit = false,
  onChange, 
  title,
  makeupEdit = null,
  fieldName
}) {
  const [day, setDay] = useState("");

  // for registration, select default current month 
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return isEdit ? "" : (now.getMonth() + 1).toString();
  });

  // for registration, select default current year
  const [year, setYear] = useState(() => {
    const now = new Date();
    return isEdit ? "" : now.getFullYear().toString();
  });

  const [time, setTime] = useState("");

  const didInitialize = useRef(false);

  useEffect(() => {
    // runs only one time
    if (!isEdit || !makeupEdit || didInitialize.current) return;

    const dateValue = makeupEdit?.[fieldName];

    if (isEdit && dateValue) {
      const date = new Date(dateValue);

      const d = date.getDate().toString();
      const m = (date.getMonth() + 1).toString();
      const y = date.getFullYear().toString();
      const hh = date.getHours().toString().padStart(2, "0");
      const mm = date.getMinutes().toString().padStart(2, "0");
      const t = `${hh}:${mm}`;

      setDay(d);
      setMonth(m);
      setYear(y);
      setTime(t);

      onChange(date);
      didInitialize.current = true;
      return;
    }
  }, [isEdit, makeupEdit, onChange, fieldName]);

  const handleChange = (newDay, newMonth, newYear, newTime) => {
    setDay(newDay);
    setMonth(newMonth);
    setYear(newYear);
    setTime(newTime);

    if (newDay && newMonth && newTime) {
      const [hours, minutes] = newTime.split(":");

      const date = new Date(newYear, newMonth - 1, newDay, hours, minutes);

      onChange(date);
    }
  };
  
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        { title }
      </label>

      <div className="flex items-center">
        {/* DIA */}
        <input
          type="number"
          min="1"
          max="31"
          value={day}
          onChange={(e) => handleChange(e.target.value, month, year, time)}
          placeholder="Dia"
          className="w-24 mr-2 border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* MÊS */}
        <select
          value={month}
          onChange={(e) => handleChange(day, e.target.value, year, time)}
          className="flex-grow border border-gray-300 rounded-lg px-3 mr-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Mês</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>

        {/* HORA */}
        <input
          type="time"
          value={time}
          onChange={(e) => handleChange(day, month, year, e.target.value)}
          className="border border-gray-300 rounded-lg py-2 mr-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* ANO */}
        <input
          type="number"
          value={year}
          onChange={(e) => handleChange(day, month, e.target.value, time)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-24 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default DateInput