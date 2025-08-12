import { applyMaskPhone } from '../../utils/mask'
import { inputClass, inputLabelClass } from '../../utils/classes'
import { useEffect, useState } from 'react'

function StudentForm({ isEdit = false, formData, setFormData }) {
  const [phoneMasked, setPhoneMasked] = useState('')

  const handlePhoneChanged = (e) => {
    const input = e.target.value

    const rawValue = input.replace(/\D/g, '')
    const masked = applyMaskPhone('(99) 99999-9999', rawValue)
    
    setPhoneMasked(masked)

    // Save raw phone to formData
    setFormData(prev => ({
      ...prev,
      phone: rawValue
    }))
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  useEffect(() => {
    if (isEdit && formData.phone) {
      const masked = applyMaskPhone('(99) 99999-9999', formData.phone)
      setPhoneMasked(masked)
    }
  }, [isEdit, formData.phone])

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label 
              htmlFor="name" 
              className={inputLabelClass}
            >
              Nome
            </label>
            <input 
              type="text"
              id="name"
              maxLength="200"
              className={inputClass}
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label 
              htmlFor="phone" 
              className={inputLabelClass}
            >
              Telefone
            </label>
            <input 
              type="tel"
              id="phone"
              className={inputClass}
              placeholder="Telefone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              value={phoneMasked}
              onChange={handlePhoneChanged}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label 
            htmlFor="email" 
            className={inputLabelClass}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            maxLength="200" 
            className={inputClass}
            placeholder="john.doe@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </>
  )
}

export default StudentForm