import { vi } from 'vitest'

vi.mock('motion/react', () => {
  const React = require('react')

  function createMotionProxy() {
    return new Proxy(
      {},
      {
        get(_target, prop: string) {
          return React.forwardRef((props: Record<string, unknown>, ref: unknown) => {
            const {
              initial: _initial,
              animate: _animate,
              exit: _exit,
              variants: _variants,
              transition: _transition,
              custom: _custom,
              whileHover: _whileHover,
              whileTap: _whileTap,
              layout: _layout,
              ...rest
            } = props
            return React.createElement(prop, { ...rest, ref })
          })
        },
      }
    )
  }

  function AnimatePresence({ children }: { children: unknown }) {
    return children
  }

  return {
    motion: createMotionProxy(),
    AnimatePresence,
    useAnimationFrame: vi.fn(),
  }
})
