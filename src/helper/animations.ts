export const animations = {
  show: {
    keyframes: [
      { height: '0', opacity: '0' },
      { height: 'auto', opacity: '1' },
    ],
    options: { duration: 150, easing: 'linear' },
  },
  hide: {
    keyframes: [
      { height: 'auto', opacity: '1' },
      { height: '0', opacity: '0' },
    ],
    options: { duration: 150, easing: 'linear' },
  },
}

// Animates an element using keyframes. Returns a promise that resolves after the animation completes or gets canceled.
//
export function animateTo(
  el: HTMLElement,
  keyframes: Keyframe[],
  options?: KeyframeAnimationOptions
) {
  return new Promise((resolve) => {
    if (options?.duration === Infinity) {
      throw new Error('Promise-based animations must be finite.')
    }

    const animation = el.animate(keyframes, {
      ...options,
      duration: prefersReducedMotion() ? 0 : options!.duration,
    })

    animation.addEventListener('cancel', resolve, { once: true })
    animation.addEventListener('finish', resolve, { once: true })
  })
}

//
// Tells if the user has enabled the "reduced motion" setting in their browser or OS.
//
export function prefersReducedMotion() {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  return query.matches
}

//
// Stops all active animations on the target element. Returns a promise that resolves after all animations are canceled.
//
export function stopAnimations(el: HTMLElement) {
  return Promise.all(
    el.getAnimations().map((animation) => {
      return new Promise((resolve) => {
        const handleAnimationEvent = requestAnimationFrame(resolve)

        animation.addEventListener('cancel', () => handleAnimationEvent, {
          once: true,
        })
        animation.addEventListener('finish', () => handleAnimationEvent, {
          once: true,
        })
        animation.cancel()
      })
    })
  )
}

// We can't animate `height: auto`, but we can calculate the height and shim keyframes by replacing it with the
// element's scrollHeight before the animation.
export function shimKeyframesHeightAuto(
  keyframes: Keyframe[],
  calculatedHeight: number
) {
  return keyframes.map((keyframe) => ({
    ...keyframe,
    height:
      keyframe.height === 'auto' ? `${calculatedHeight}px` : keyframe.height,
  }))
}
