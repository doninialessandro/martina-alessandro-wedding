import { MonolineFlower } from '@/components/monoline-flower'
import copy from './copy.json'

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-16 md:py-24 px-6">
      <div className="flex flex-col items-center gap-4">
        <MonolineFlower size={48} animate={false} />
        <span className="text-sm tracking-[0.3em] uppercase text-foreground font-serif">
          {copy.names}
        </span>
        <span className="text-xs tracking-[0.2em] uppercase text-accent font-serif">
          {copy.date}
        </span>
        <span className="text-xs tracking-[0.15em] text-muted-foreground font-serif text-center">
          {copy.venue}
        </span>
      </div>
    </footer>
  )
}
