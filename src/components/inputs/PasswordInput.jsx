import { useState } from "react"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import TextInput from "./TextInput"

function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false)

  const toggleButton = (
    <button
      type="button"
      onClick={() => setShowPassword((p) => !p)}
      className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-600"
      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
    >
      {showPassword ? (
        <IconEyeOff size={18} stroke={1.5} />
      ) : (
        <IconEye size={18} stroke={1.5} />
      )}
    </button>
  )

  return (
    <TextInput
      {...props}
      type={showPassword ? "text" : "password"}
      rightElement={toggleButton}
    />
  )
}

export default PasswordInput