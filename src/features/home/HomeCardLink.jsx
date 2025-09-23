function CardLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      className="group block w-full max-w-full 
                 h-[90px] sm:h-[140px] md:h-[180px] lg:h-[200px]
                 rounded-2xl border border-gray-200 bg-white shadow-sm
                 hover:bg-gray-50 hover:shadow-md transition-all duration-300 ease-out 
                 flex items-center justify-center px-4"
    >
      <span className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium 
                       text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-center">
        {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
        {label}
      </span>
    </a>
  )
}

export default CardLink