const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function lerpTo(el: HTMLElement, value: string, speed: number = 0.15) {
    return new Promise( (resolve, reject) => {

    })
}

//TODO: All of this
/*
export async function fadeTo(el: HTMLElement, targetOpacity: number, speed = 0.15) {
  let current = parseFloat(getComputedStyle(el).opacity) || 0;

  if (targetOpacity > 0 && getComputedStyle(el).display === "none") {
    el.style.display = "block";
    current = 0;
  }

  let rafId: number = NaN;
  function step() {
    current = lerp(current, targetOpacity, speed);

    if (Math.abs(targetOpacity - current) < 0.005) {
      current = targetOpacity;
      el.style.opacity = current;
      if (current === 0) el.style.display = "none";
      cancelAnimationFrame(rafId);
      return;
    }

    el.style.opacity = current;
    rafId = requestAnimationFrame(step);
  }

  if (!isNaN(rafId)) {
    cancelAnimationFrame(rafId);
  }
  rafId = requestAnimationFrame(step);
}
  */