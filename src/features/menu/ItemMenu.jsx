function ItemMenu({ title, active, evenodd, icon }) {
  return (
    <div
      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 
        ${active ? 'bg-teal-500 text-white' : evenodd ? 'bg-gray-800 text-gray-300' : 'text-gray-400 hover:bg-gray-700'}`}
    >
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </div>
  )
}

export default ItemMenu