const MAP_URL =
  'https://maps.google.com/maps?q=Via+Cesare+Cantu+21%2C+23898+Imbersago+LC%2C+Italy&output=embed&z=16'

export function VenueMap({ venueName }: { venueName: string }) {
  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] bg-[#F2F0EB]">
      <iframe
        title={venueName}
        src={MAP_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
      />
    </div>
  )
}
