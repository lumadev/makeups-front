function CheckboxInput({ id, label, checked, onChange, name }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-gray-300 accent-orange-600 transition duration-200 focus:outline-none"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  )
}

export default CheckboxInput