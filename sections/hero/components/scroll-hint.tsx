interface ScrollHintProps {
  visible: boolean
}

export function ScrollHint({ visible }: ScrollHintProps) {
  return (
    <div
      data-animate
      data-nojs-hide
      aria-hidden="true"
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-[1200ms] ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        animation: visible ? 'scroll-hint-bounce 2s ease-in-out infinite' : 'none',
      }}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon, parent has aria-hidden */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8E9E8C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}
