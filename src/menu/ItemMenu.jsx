
function ItemMenu({ title, svg, evenodd = false, active = false }) {
  return (
    <div
      className={`
        flex items-center text-sm font-medium py-2 px-2 rounded-md transition duration-150 ease-in-out
        ${active ? 'bg-teal-600 text-white scale-105' : 'text-white hover:bg-teal-500 hover:text-white hover:scale-105'}
      `}
    >
      <svg
        className="w-6 h-6 fill-current inline-block"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={svg}
          {...(evenodd && { fillRule: "evenodd", clipRule: "evenodd" })}
        ></path>
      </svg>
      <span className="ml-1">{title}</span>
    </div>
  )
}

export default ItemMenu