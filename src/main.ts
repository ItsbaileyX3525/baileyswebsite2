import { getRandomInt, fadeTo } from "./helpers"

const instaLoad: boolean = true

const loadConatiner: HTMLElement = document.getElementById("load-container") as HTMLDivElement
const loadText: HTMLElement = document.getElementById("load-text") as HTMLParagraphElement
const mainContent: HTMLElement = document.getElementById("main-content") as HTMLDivElement

const doorsMusic: HTMLAudioElement = new Audio("/audio/doors.mp3")

const randomQuotes: Array<string> = ["Does anyone even read these?", "Josh is a PP head", "Did you know that you can play with an emulated\n source console here?", "Beware the penar snipper device",
    "Welcome to my website :3"
]

function upgradeRobloxButton(selector = "#roblox-btn") {
  const sourceBtn = document.querySelectorAll<HTMLElement>(selector);
  if (!sourceBtn) return;

  for (let el of sourceBtn) {
    console.log(el)
    const labelContent = el.innerHTML.trim();

    const preservedClassName: string = el.classList.value

    const styledBtn: HTMLButtonElement = document.createElement("button");
    const sourceType: string | null = el.getAttribute("type");
    styledBtn.type = sourceType === "submit" || sourceType === "reset" ? sourceType : "button";

    for (const { name, value } of Array.from(el.attributes)) {
        if (name !== "class") {
        styledBtn.setAttribute(name, value);
        }
    }

    styledBtn.className =
        "group relative block w-fit max-w-[calc(100vw-6rem)] cursor-pointer select-none transition-transform duration-150 ease-out hover:scale-105 active:translate-y-1.5 focus:outline-none" + " " + preservedClassName;

    styledBtn.innerHTML = `
        <div class="relative w-fit max-w-full skew-x-[-28deg] rounded-none bg-gradient-to-b from-amber-400 via-orange-500 to-orange-600 px-16 py-4 border-[4px] border-neutral-900 shadow-[0_8px_0_#171717,0_12px_20px_rgba(0,0,0,0.45)] group-hover:from-amber-300 group-hover:via-orange-400 group-hover:to-orange-500 group-active:shadow-[0_2px_0_#171717] transition-all duration-150 overflow-hidden">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent"></div>
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-orange-800/40"></div>
        <span class="relative block text-center skew-x-[-22deg] text-4xl md:text-5xl font-bold tracking-wider text-white uppercase roblox-text-stroke"></span>
        </div>
    `;

    const labelSpan = styledBtn.querySelector("span");
    if (labelSpan) {
        labelSpan.innerHTML = labelContent;
    }

    el.replaceWith(styledBtn);
  }
}

function loadButtons() {
    mainContent.style.display = "flex"
    upgradeRobloxButton(); 

    //register buttons to their actions
    //TODO: This
    //@ts-ignore
    const startGame: HTMLButtonElement = document.getElementsByClassName("start-game")[0]
    startGame.addEventListener("click", () => {
        console.log("started")
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    if (instaLoad) {
        fadeTo(loadConatiner, 0, 1)
        fadeTo(mainContent, 1, 1)
        loadButtons()
        return
    }
    const quote: string = randomQuotes[getRandomInt(0, randomQuotes.length - 1)]
    loadText.innerText = quote 

    //Try to autoplay cause you never know
    doorsMusic.volume = .25
    doorsMusic.play()

    //TODO: this
    setTimeout(async () => {
        await fadeTo(loadConatiner, 0)
        console.log("finished anim")
        fadeTo(mainContent, 1, .02)
        loadButtons()
    }, 1250); //Fake loading time or whatnot
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

