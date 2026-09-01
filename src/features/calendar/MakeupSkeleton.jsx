function MakeupSkeleton({ isDark = false }) {
	const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
	const totalCells = 35

	return (
		<div
			className={`w-full min-h-screen p-4 transition-colors duration-300
				${isDark ? "bg-slate-900 text-slate-100" : "bg-gray-50 text-slate-900"}
			`}
		>
			<div className="w-full">
				<div className="flex justify-between items-center mb-6">
					<div
						className={`h-10 w-14 rounded-xl animate-pulse
							${isDark ? "bg-slate-800" : "bg-white shadow-sm"}
						`}
					/>

					<div
						className={`h-10 w-56 rounded-xl animate-pulse
							${isDark ? "bg-slate-800" : "bg-white shadow-sm"}
						`}
					/>

					<div
						className={`h-10 w-14 rounded-xl animate-pulse
							${isDark ? "bg-slate-800" : "bg-white shadow-sm"}
						`}
					/>
				</div>

				<div className={`grid grid-cols-7 text-center font-medium mb-3 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
					{weekDays.map(day => (
						<div key={day}>{day}</div>
					))}
				</div>

				<div className="grid grid-cols-7 gap-3">
					{Array.from({ length: totalCells }).map((_, index) => (
						<div
							key={index}
							className={`min-h-[110px] p-3 rounded-2xl border animate-pulse
								${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}
							`}
						>
							<div className={`h-4 w-6 rounded mb-3 ${isDark ? "bg-slate-700" : "bg-gray-200"}`} />
							<div className={`h-3 w-full rounded ${isDark ? "bg-slate-700" : "bg-gray-200"}`} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default MakeupSkeleton
