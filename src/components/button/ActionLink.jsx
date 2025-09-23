import { btnClass } from '@/common/utils/classes'

function ActionLink({ children, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={btnClass}
    >
      {children}
    </a>
  )
}

export default ActionLink
