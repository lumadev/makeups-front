import { inputClass, inputLabelClass } from '../utils/classes';

function StudentForm({ formData, setFormData }) {
  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  return (
    <>
      <form>
        <div class="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label 
              for="name" 
              class={inputLabelClass}
            >
              Nome
            </label>
            <input 
              type="text" 
              id="name" 
              className={inputClass}
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label 
              for="phone" 
              class={inputLabelClass}
            >
              Telefone
            </label>
            <input 
              type="tel"
              id="phone"
              className={inputClass}
              placeholder="Telefone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div class="mb-6">
          <label 
            for="email" 
            class={inputLabelClass}
          >
            Email
          </label>
          <input
            type="email"
            id="email" 
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