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
    const currentYear = new Date().getFullYear();
    setYear(currentYear)
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        { title }
      </label>

      <div className="flex items-center">
        {/* DIA */}
        <div className="relative">
          <select
            value={day}
            onChange={(e) => handleChange(e.target.value, month, year, time)}
            className="appearance-none border border-gray-300 rounded-lg px-3 mr-2 py-2 pr-7 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Dia</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

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