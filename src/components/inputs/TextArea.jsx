function TextArea({
  value,
  onChange,
  title,
  fieldName,
  placeholder = "",
  rows = 4,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <label
          htmlFor={fieldName}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {title}
        </label>
      )}
      <textarea
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
      />
    </div>
  )
}

export default TextArea