import TextInput from '@/components/inputs/TextInput'
import { IconSearch } from '@tabler/icons-react'

function InputSearch({ 
  searchTerm, 
  label,
  onSearch, 
  placeholder = "Pesquisar...", 
}) {
  return (
    <div className="my-4">
      <TextInput
        id="search"
        type="text"
        label={label}
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="
          border border-gray-300 bg-white text-gray-900
          text-sm rounded-lg block w-full p-2
          focus:outline-none focus:ring-2 focus:ring-blue-500
          
          dark:bg-gray-800 
          dark:border-gray-700 
          dark:text-gray-100
          dark:placeholder-gray-400
          dark:focus:ring-blue-400
        "
        rightElement={
          <IconSearch 
            size={18} 
            className="text-gray-400 dark:text-gray-500" 
          />
        }
      />
    </div>
  )
}

export default InputSearch