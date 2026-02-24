import { formatDateAndHour } from '@/common/utils/date'

function MakeupInfoSection({ title, makeups }) {
  if (!makeups.length) return null

  const baseClasses = `
    p-4 mb-4 rounded-lg shadow-sm
    bg-orange-50 text-orange-800
    dark:bg-gray-800 dark:text-orange-300
  `

  const listItemClasses = "ml-4 list-disc"

  return (
    <div className={baseClasses}>
      <div className="mb-2 font-semibold">
        {title}
      </div>

      <ul className={listItemClasses}>
        {makeups.map((makeup, index) => (
          <li key={index}>
            {makeup.studentName} - {formatDateAndHour(makeup.dateReplacement)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MakeupInfoSection