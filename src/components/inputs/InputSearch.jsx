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
        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        rightElement={<IconSearch size={18} className="text-gray-400" />}
      />
    </div>
  )
}

export default InputSearch
