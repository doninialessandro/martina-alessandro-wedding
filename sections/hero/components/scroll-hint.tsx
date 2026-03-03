interface ScrollHintProps {
  visible: boolean
  onClick?: () => void
}

export function ScrollHint({ visible, onClick }: ScrollHintProps) {
  return (
    <button
      type="button"
      data-animate
      data-nojs-hide
      aria-label="Scorri giù"
      onClick={onClick}
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-[1200ms] bg-transparent border-none p-0 cursor-pointer text-accent hover:text-foreground ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        animation: visible ? 'scroll-hint-bounce 2s ease-in-out infinite' : 'none',
      }}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon, button has aria-label */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="transition-colors duration-200"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  )
}
