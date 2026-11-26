export const lenisRef = { current: null };
export const scrollState = { y: 0, v: 0, hidden: false };

export function scrollToTarget(target, opts = {}) {
  const lenis = lenisRef.current;
  if (lenis) return lenis.scrollTo(target, { duration: 1.15, offset: -16, ...opts });
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else el?.scrollIntoView({ behavior: "smooth" });
}

let locks = 0;
export function lockScroll() {
  if (++locks > 1) return;
  lenisRef.current?.stop();
  document.documentElement.style.overflow = "hidden";
}
export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks) return;
  lenisRef.current?.start();
  document.documentElement.style.overflow = "";
}

/* product card → quote form prefill */
export function enquire(product, size) {
  window.dispatchEvent(new CustomEvent("hn:enquire", { detail: { product, size } }));
  scrollToTarget("#contact");
}
