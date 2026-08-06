import { useEffect, useRef, useState } from 'react';

/**
 * Returns a [ref, inView] pair.
 * Once the element referenced by `ref` enters the viewport,
 * `inView` becomes true and stays true (fire-once).
 *
 * @param {number} threshold - 0 to 1, how much of the element must be visible
 * @param {string} rootMargin - IntersectionObserver rootMargin
 */
export function useInView(threshold = 0.15, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // fire-once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
