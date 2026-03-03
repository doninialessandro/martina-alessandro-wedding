interface StoryPhotoProps {
  src?: string
  alt: string
  photoColor: string
  photoLabel?: string
  className?: string
}

export function StoryPhoto({ src, alt, photoColor, photoLabel, className = '' }: StoryPhotoProps) {
  return (
    <div className={`relative overflow-hidden rounded-[16px] shadow-subtle ${className}`}>
      {src ? (
        // biome-ignore lint/performance/noImgElement: decorative wedding photo
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: photoColor }}
        >
          <span className="text-sm tracking-[0.2em] uppercase text-accent font-serif">
            {photoLabel}
          </span>
        </div>
      )}
    </div>
  )
}
