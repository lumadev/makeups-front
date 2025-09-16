import { inputClass, inputLabelClass } from '@/common/utils/classes'

function TextInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  maxLength,
  required = false,
  pattern,
  className = "",
  rightElement = null,
  ...rest
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={inputLabelClass}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={type}
          maxLength={maxLength}
          className={`${inputClass} ${className} ${rightElement ? 'pr-10' : ''}`}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          onMouseDown={(e) => e.stopPropagation()}
          required={required}
          pattern={pattern}
          {...rest}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-auto">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  )
}

export default TextInput
