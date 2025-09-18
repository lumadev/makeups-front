import React from "react"

function CardLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      className="group block w-[300px] h-[300px] rounded-2xl border border-gray-200 bg-white shadow-sm
                 hover:bg-gray-50 hover:shadow-md transition-all duration-500 ease-out 
                 flex items-center justify-center"
    >
      <span className="flex items-center gap-2 text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-500">
        {Icon && <Icon className="w-6 h-6" />}
        {label}
      </span>
    </a>
  )
}

export default CardLink
