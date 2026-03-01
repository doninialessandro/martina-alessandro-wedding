interface CountdownProps {
  loaded: boolean
  days: number
  hours: number
  minutes: number
  dateLabel: string
  labels: { days: string; hours: string; minutes: string }
}

export function Countdown({ loaded, days, hours, minutes, dateLabel, labels }: CountdownProps) {
  return (
    <div
      data-animate
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-[1200ms] delay-500 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
    >
      <p className="text-base sm:text-lg md:text-xl tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3">
        {dateLabel}
      </p>
      <div className="flex items-end gap-4 sm:gap-5 font-serif text-[#4A4440]">
        <span className="flex flex-col items-center">
          <span className="text-xs sm:text-sm md:text-base tabular-nums leading-none">
            {String(days).padStart(2, '0')}
          </span>
          <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.1em] text-[#8E9E8C] mt-1">
            {labels.days}
          </span>
        </span>
        <span className="flex flex-col items-center">
          <span className="text-xs sm:text-sm md:text-base tabular-nums leading-none">
            {String(hours).padStart(2, '0')}
          </span>
          <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.1em] text-[#8E9E8C] mt-1">
            {labels.hours}
          </span>
        </span>
        <span className="flex flex-col items-center">
          <span className="text-xs sm:text-sm md:text-base tabular-nums leading-none">
            {String(minutes).padStart(2, '0')}
          </span>
          <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.1em] text-[#8E9E8C] mt-1">
            {labels.minutes}
          </span>
        </span>
      </div>
    </div>
  )
}
