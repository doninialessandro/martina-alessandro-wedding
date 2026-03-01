import { vi } from 'vitest'

type MockResult = { data: unknown; error: unknown }

function createChain(result: MockResult) {
  const chain: Record<string, ReturnType<typeof vi.fn>> = {}
  chain.select = vi.fn().mockReturnValue(chain)
  chain.insert = vi.fn().mockReturnValue(chain)
  chain.update = vi.fn().mockReturnValue(chain)
  chain.upsert = vi.fn().mockResolvedValue(result)
  chain.eq = vi.fn().mockReturnValue(chain)
  chain.ilike = vi.fn().mockReturnValue(chain)
  chain.maybeSingle = vi.fn().mockResolvedValue(result)

  // biome-ignore lint/suspicious/noThenProperty: intentional thenable for Supabase query chain mock
  chain.then = vi.fn().mockImplementation((resolve: (v: MockResult) => void) => {
    resolve(result)
    return Promise.resolve(result)
  })

  return chain
}

let currentResult: MockResult = { data: null, error: null }
let currentChain = createChain(currentResult)

export const mockFrom = vi.fn().mockImplementation(() => currentChain)

export const mockSupabase = { from: mockFrom }

export function setMockResult(result: MockResult) {
  currentResult = result
  currentChain = createChain(result)
  mockFrom.mockImplementation(() => currentChain)
  return currentChain
}

export function resetMocks() {
  currentResult = { data: null, error: null }
  currentChain = createChain(currentResult)
  mockFrom.mockImplementation(() => currentChain)
}

vi.mock('@/lib/supabase/client', () => ({
  supabase: mockSupabase,
}))
