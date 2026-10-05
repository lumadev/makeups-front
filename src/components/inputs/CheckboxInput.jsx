function CheckboxInput({ id, label, checked, onChange, name }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-gray-300 accent-orange-600 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-gray-500 dark:bg-gray-700 dark:accent-orange-400 dark:focus-visible:ring-orange-400"
      />
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  )
}

export default CheckboxInput