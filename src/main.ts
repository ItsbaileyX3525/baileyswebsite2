import { getRandomInt, lerpTo } from "./helpers"

const loadConatiner: HTMLElement = document.getElementById("load-container") as HTMLDivElement
const loadText: HTMLElement = document.getElementById("load-text") as HTMLParagraphElement

const doorsMusic: HTMLAudioElement = new Audio("/audio/doors.mp3")

const randomQuotes: Array<string> = ["Does anyone even read these?", "Josh is a PP head", "Did you know that you can play with an emulated\n source console here?", "Beware the penar snipper device"]


document.addEventListener("DOMContentLoaded", async () => {
    const quote: string = randomQuotes[getRandomInt(0, randomQuotes.length - 1)]
    loadText.innerText = quote 

    //Try to autoplay cause you never know
    doorsMusic.play()

    //TODO: this
    setTimeout(() => {
        pass//await lerpTo(loadConatiner, "opacity")
    }, 2500); //Fake loading time or whatnot
})

document.addEventListener("click", () => {
    if (!doorsMusic.paused) {
        return
    }
    doorsMusic.play()
})

doorsMusic.addEventListener("ended", () => {
    doorsMusic.play()
})