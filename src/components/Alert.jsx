function Alert({ type = "info", children }) {
  let classes = "p-4 mb-4 rounded-lg flex items-center gap-2 shadow-sm"

  if (type === "info") {
    classes += " bg-blue-50 text-blue-800"
  } else if (type === "warning") {
    classes += " bg-amber-50 text-amber-800"
  } else if (type === "error") {
    classes += " bg-rose-50 text-rose-800"
  } else {
    classes += " bg-slate-50 text-slate-700"
  }

  return <div className={classes}>{children}</div>
}

export default Alert
