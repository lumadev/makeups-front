function ItemMenu({ title, active, icon: Icon }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
        active
          ? 'text-white'
          : 'text-white hover:bg-white/5'
      }`}
      style={active ? { backgroundColor: '#FF8C00' } : undefined}
    >
      {Icon && <Icon size={20} strokeWidth={2} />}
      <span className="text-sm font-medium">{title}</span>
    </div>
  )
}

export default ItemMenu
