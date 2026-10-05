import { applyMaskPhone } from '@/common/utils/mask'
import TextInput from '@/components/inputs/TextInput'

function StudentForm({
  isEdit = false,
  formData,
  setFormData,
  validationErrors = {},
  setValidationErrors
}) {
  const handlePhoneChanged = (e) => {
    const input = e.target.value
    const rawValue = input.replace(/\D/g, '')

    setFormData(prev => ({ ...prev, phone: rawValue }))
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (id === 'name') {
      setValidationErrors((prev) => ({ ...prev, name: undefined }))
    }
  }

  const phoneMasked = formData.phone && isEdit
    ? applyMaskPhone('(99) 99999-9999', formData.phone)
    : ''

  return (
    <form>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <TextInput
            id="name"
            label="Nome"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            maxLength="200"
            required
            aria-invalid={Boolean(validationErrors.name)}
            aria-describedby={validationErrors.name ? "name-error" : undefined}
          />
          {validationErrors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-300" role="alert">
              {validationErrors.name}
            </p>
          )}
        </div>

        <TextInput
          id="phone"
          label="Telefone"
          type="tel"
          value={phoneMasked}
          onChange={handlePhoneChanged}
          placeholder="Telefone"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          required
        />
      </div>

      <div className="mb-6">
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@company.com"
          maxLength="200"
          required
        />
      </div>
    </form>
  )
}

export default StudentForm
