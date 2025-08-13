import { inputClass, inputLabelClass } from '../../utils/classes'

function TextInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  maxLength,
  required = false,
  pattern
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={inputLabelClass}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        maxLength={maxLength}
        className={inputClass}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        required={required}
        pattern={pattern}
      />
    </div>
  )
}

export default TextInput
