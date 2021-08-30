import { createAnimation } from '@ionic/react'

export const SlideInLeft = (baseEl, opts) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo('transform', 'translateX(100px)', 'translateX(0px)')
    .fromTo('opacity', 0, 1)
    .duration(250)

  const animation = createAnimation().addAnimation(enteringAnimation)

  return animation
}
