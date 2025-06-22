import { useState } from "react";
import { useEffect } from 'react';

function DateInput({ onChange, title }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");

  const handleChange = (newDay, newMonth, newYear, newTime) => {
    setDay(newDay);
    setMonth(newMonth);
    setYear(newYear);
    setTime(newTime);

    if (newDay && newMonth && newTime) {
      const [hours, minutes] = newTime.split(":");

      const date = new Date(newYear, newMonth - 1, newDay, hours, minutes);

      onChange && onChange(date);
    }
  };

  useEffect(() => {
    // select current year
    const currentYear = new Date().getFullYear();
    setYear(currentYear)

    // select current month
    const currentMonth = new Date().getMonth() + 1;
    setMonth(currentMonth.toString());
  }, []);

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