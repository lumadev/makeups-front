
import { btnClass, btnCancelClass } from '../utils/classes'

import LoadingButton from '../components/LoadingButton'
import Modal from "../components/Modal";
import StudentForm from './StudentForm'

export default function StudentFormModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  formData,
  setFormData,
  isEdit = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Editar Aluno' : 'Adicionar Aluno'}
      actions={
        <>
          {loading ? (
            <LoadingButton />
          ) : (
            <button 
              onClick={onSubmit} 
              className={btnClass}
            >
              {isEdit ? 'Atualizar' : 'Salvar'}
            </button>
          )}
          <button 
            onClick={onClose}
            className={btnCancelClass}
          >
            Cancelar
          </button>
        </>
      }
    >
      <StudentForm formData={formData} setFormData={setFormData} />
    </Modal>
  )
}