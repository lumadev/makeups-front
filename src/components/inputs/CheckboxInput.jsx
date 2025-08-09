function CheckboxInput({ label, checked, onChange, name }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-gray-300 accent-blue-600 transition duration-200 focus:outline-none"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  )
}

export default CheckboxInput