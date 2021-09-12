import { createAnimation } from '@ionic/react'

export const SlideOutLeft = (baseEl, opts) => {
  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo('transform', 'translateX(0)', 'translateX(100px)')
    .fromTo('opacity', 1, 0)

  const enteringAnimation = createAnimation().addElement(opts.enteringEl).fromTo('opacity', 0, 1)

  return createAnimation().duration(250).addAnimation([leavingAnimation, enteringAnimation])
}
