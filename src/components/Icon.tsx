import { Clock3, Container, HardHat, Map, ShieldCheck, Truck, Users } from 'lucide-react'
import type { IconName } from '../types/content'

const icons = { container: Container, truck: Truck, 'hard-hat': HardHat, map: Map, clock: Clock3, shield: ShieldCheck, users: Users }

export function Icon({ name, size = 28, strokeWidth = 2.2 }: { name: IconName; size?: number; strokeWidth?: number }) {
  const Component = icons[name]
  return <Component aria-hidden="true" size={size} strokeWidth={strokeWidth} />
}

