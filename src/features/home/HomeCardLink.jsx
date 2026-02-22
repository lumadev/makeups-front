function CardLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      className="
        group block w-full
        min-h-[72px] sm:h-[140px] md:h-[180px] lg:h-[200px]
        rounded-2xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        shadow-sm dark:shadow-gray-900/20
        hover:bg-gray-50 dark:hover:bg-gray-700
        hover:shadow-md dark:hover:shadow-gray-900/40
        transition-all duration-300 ease-out
        flex items-center justify-center
        gap-2
        px-2 sm:px-4 py-2 sm:py-0
      "
    >
      <span
        className="
          flex items-center gap-2
          text-sm sm:text-base md:text-lg font-medium
          text-gray-700 dark:text-gray-200
          group-hover:text-gray-900 dark:group-hover:text-white
          transition-colors duration-300
          text-center
        "
      >
        {Icon && (
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        )}
        {label}
      </span>
    </a>
  )
}

export default CardLink