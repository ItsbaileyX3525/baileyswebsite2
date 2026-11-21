const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const containerMoverSwipe: HTMLElement = document.getElementById("container-mover-swipe") as HTMLDListElement
const containerMoverSlide: HTMLElement = document.getElementById("container-mover-slide") as HTMLDListElement

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*export async function lerpTo(el: HTMLElement, value: string, speed: number = 0.15) {
    return new Promise( (resolve, reject) => {

    })
}*/

export async function slideIn(el: HTMLElement, start: number, direction: string = "left", speed: number = 1) {
  return new Promise<void>(( resolve, reject ) => {
    if (!el) reject()

    let rafId: number = NaN

    const previousParent: HTMLElement = el.parentElement as HTMLElement

    switch (direction) {
      case "left": //Comes in from the left
        containerMoverSlide.style.left = `${start}px`
        break
      case "right":
        containerMoverSlide.style.right = `${start}px`
        break
      case "top":
        containerMoverSlide.style.top = `${start}px`
        break
      case "bottom":
        containerMoverSlide.style.bottom = `${start}px`
        break
    }
    
    containerMoverSlide.appendChild(el)

    el.classList.add("flex")
    el.classList.remove("hidden")
    //Optionally transparency
    el.classList.remove("opacity-0")

    function step() {
      switch (direction) {
        case "left":
          containerMoverSlide.style.left = `${parseFloat(containerMoverSlide.style.left || "0") + 2 * speed}px`
          console.log(parseFloat(containerMoverSlide.style.left))
          if (parseFloat(containerMoverSlide.style.left) >= 0) {
            cancelAnimationFrame(rafId)
            console.log("on screen")
            previousParent.appendChild(el)
            resolve()
            return
          }
          break
        case "right":
          break
        case "top":
          break
        case "bottom":
          break
      }

      requestAnimationFrame(step)
    }

    if (!isNaN(rafId)) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(step)
  })
}

export async function swipeAway(el: HTMLElement, direction: string = "left", stop: number, speed: number = 1) {
  return new Promise<void>(( resolve, reject ) => {
    if (!el) reject()

    let rafId: number = NaN
    
    const previousParent: HTMLElement = el.parentElement as HTMLElement
    containerMoverSwipe.appendChild(el)

    function step() {
      switch (direction) {
        case "left":
          containerMoverSwipe.style.left = `${parseFloat(containerMoverSwipe.style.left || "0") - 2 * speed}px`
          if (parseFloat(containerMoverSwipe.style.left || "0") < stop) {
            cancelAnimationFrame(rafId)
            el.classList.remove("flex")
            el.classList.add("hidden")
            previousParent.appendChild(el)
            containerMoverSwipe.style.left = "0px"
            resolve()
            return
          }
          break
        case "right":
          containerMoverSwipe.style.left = `${parseFloat(containerMoverSwipe.style.left || "0") + 2 * speed}px`
          if (parseFloat(containerMoverSwipe.style.left || "0") > stop) {
            cancelAnimationFrame(rafId)
            el.classList.remove("flex")
            el.classList.add("hidden")
            previousParent.appendChild(el)
            resolve()
            return
          }
          break
        case "top":
          console.log("Going up out")
          break
        case "bottom":
          console.log("Going down out")
          if (true) return
          break
      }

      requestAnimationFrame(step)
    }

    if (!isNaN(rafId)) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(step)
  })
}

export async function fadeTo(el: HTMLElement, targetOpacity: number, speed = 0.15) {
  return new Promise<void>((resolve) => {
  let current = parseFloat(getComputedStyle(el).opacity) || 0;

  if (targetOpacity > 0 && getComputedStyle(el).display === "none") {
    el.classList.remove("hidden")
    el.classList.add("flex")
    current = 0;
  }

  let rafId: number = NaN;
  function step() {
    current = lerp(current, targetOpacity, speed);

    if (Math.abs(targetOpacity - current) < 0.005) {
      current = targetOpacity;
      el.style.opacity = current.toString();
      if (current === 0) el.style.display = "none";
      cancelAnimationFrame(rafId);
      resolve()
      return;
    }

    el.style.opacity = current.toString();
    rafId = requestAnimationFrame(step);
  }

  if (!isNaN(rafId)) {
    cancelAnimationFrame(rafId);
  }
  rafId = requestAnimationFrame(step);
  } )
}