import { getRandomInt, fadeTo, swipeAway, slideIn } from "./helpers"

const instaLoad: boolean = false

const loadConatiner: HTMLElement = document.getElementById("load-container") as HTMLDivElement
const loadText: HTMLElement = document.getElementById("load-text") as HTMLParagraphElement
const mainContent: HTMLElement = document.getElementById("main-content") as HTMLDivElement
const settingsContent: HTMLElement = document.getElementById("settings-content") as HTMLDivElement

let sliding: boolean = false
let loaded: boolean = false

const doorsMusic: HTMLAudioElement = new Audio("/audio/doors.mp3")
const halloSound: HTMLAudioElement = new Audio("/audio/hallo.mp3")
const _tonytonychopperMusic: HTMLAudioElement = new Audio("/audio/BokuWaDoctor.mp3")

const randomQuotes: Array<string> = ["Does anyone even read these?", "Did you know that you can play with an emulated\nsource console here?", "Beware the penar snipper device",
    "Welcome to my website :3", "I don't know why I made this site like this", "\"Just don't breathe. Let the liquid into your lungs.\""
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
        <span class="relative block text-center text-4xl md:text-5xl font-bold tracking-wider text-white uppercase roblox-text-stroke"></span>
        </div>
    `;

    const labelSpan = styledBtn.querySelector("span");
    if (labelSpan) {
        labelSpan.innerHTML = labelContent;
    }

    el.replaceWith(styledBtn);
  }
}

async function loadOptions(exit: boolean = false) {
    if (sliding) return
    if (!exit) {
        sliding = true
        await swipeAway(mainContent, "left", -700, 2)
        await slideIn(settingsContent, -700, "left", 1)
        sliding = false
    } else {
        sliding = true
        await swipeAway(settingsContent, "left", -700, 2)
        await slideIn(mainContent, -700, "left", 1)
        sliding = false
    }
}

function loadButtons() {
    mainContent.classList.add("flex")
    upgradeRobloxButton();

    //register buttons to their actions
    const startGame: HTMLButtonElement = document.getElementsByClassName("start-game")[0] as HTMLButtonElement
    startGame.addEventListener("click", () => {
        console.log("started")
    })
    const options: HTMLButtonElement = document.getElementsByClassName("options")[0] as HTMLButtonElement
    options.addEventListener("click", () => {
        loadOptions()
    })
    const leave: HTMLButtonElement = document.getElementsByClassName("leave")[0] as HTMLButtonElement
    leave.addEventListener("click", () => {
        window.location.href = "https://roblox.com"
    })
    const leaveOptions: HTMLButtonElement = document.getElementsByClassName("leave-options")[0] as HTMLButtonElement
    leaveOptions.addEventListener("click", () => {
        loadOptions(true)
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    if (instaLoad) {
        fadeTo(loadConatiner, 0, 1)
        //fadeTo(mainContent, 1, 1)
        fadeTo(settingsContent, 1, 1)
        loadButtons()
    }

    halloSound.play()
    const quote: string = randomQuotes[getRandomInt(0, randomQuotes.length - 1)]
    loadText.innerText = quote 

    //Try to autoplay cause you never know
    doorsMusic.volume = .1
    doorsMusic.play()

    //TODO: this
    if (!instaLoad) {
        setTimeout(async () => {
            await fadeTo(loadConatiner, 0)
            loaded = true
            halloSound.pause()
            fadeTo(mainContent, 1, .02)
            loadButtons()
        }, 1250); //Fake loading time or whatnot        
    }

})

document.addEventListener("click", () => {
    if (!doorsMusic.paused) {
        return
    }
    if (!loaded) {
        halloSound.play()
    }
    doorsMusic.play()
})

doorsMusic.addEventListener("ended", () => {
    doorsMusic.play()
})

