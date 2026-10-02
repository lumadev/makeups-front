import { inputClass, inputLabelClass } from '@/common/utils/classes'

function TextArea({
  value,
  onChange,
  title,
  fieldName,
  placeholder = "",
  rows = 4,
  className = "",
  maxLength,
}) {
  return (
    <div className="w-full">
      {title && (
        <label htmlFor={fieldName} className={inputLabelClass}>
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
        maxLength={maxLength}
        className={`${inputClass} ${className}`}
      />
    </div>
  )
}

export default TextArea
