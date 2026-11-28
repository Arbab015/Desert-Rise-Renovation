/** localStorage wrapper that never throws (private mode, blocked storage). */
export const storage = {
  get(key, fallback = null) {
    try {
      return localStorage.getItem(key) ?? fallback
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch {
      /* ignore */
    }
  },
}
