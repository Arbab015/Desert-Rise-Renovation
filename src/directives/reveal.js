/** v-reveal: fades an element in once it enters the viewport. Optional delay (ms): v-reveal="120" */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible')
        io.unobserve(e.target)
      }
    }),
  { threshold: 0.12 },
)
export const reveal = {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.transitionDelay = `${value}ms`
    io.observe(el)
  },
  unmounted(el) {
    io.unobserve(el)
  },
}
