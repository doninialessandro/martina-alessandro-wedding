interface StoryPhotoProps {
  src?: string
  alt: string
  photoColor: string
  photoLabel?: string
  className?: string
}

export function StoryPhoto({ src, alt, photoColor, photoLabel, className = '' }: StoryPhotoProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${className}`}
    >
      {src ? (
        // biome-ignore lint/performance/noImgElement: decorative wedding photo
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: photoColor }}
        >
          <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
            {photoLabel}
          </span>
        </div>
      )}
    </div>
  )
}
