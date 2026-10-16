const pathElement: HTMLElement | null = document.getElementById('path')
const currentDir: HTMLElement | null = document.getElementById('currentDir')
const consoleContents: HTMLElement | null = document.getElementById('consoleContents')

//Holy shit this finna be confusing but idk a better way.

//Correction, looks confusing but once you understand it, nah

//Key: path
//Object: Array [Text display, onclick code]

const pathToElements: Record<string, [string, string | (() => void)][]> = {
    "./" : [
        [
            "home/", () => {changeDir('home')}
        ],
        [
            "etc/", () => {changeDir('etc')}
        ],
        [
            "tmp/", () => {changeDir('tmp')}
        ],
        [
            "usr/", () => {changeDir('usr')}
        ],
        [
            "var/", () => {changeDir('var')}
        ],
    ],
    "./home" : [
        [
            "baile/", () => {changeDir("baile")}
        ],
        [
            "public/", () => {changeDir("public")}
        ]
    ],
    "./home/baile" : [
        [
            "downloads/", () => {changeDir("downloads")}
        ],
        [
            "images/", () => {changeDir("images")}
        ]
    ],
    "./home/public" : [
        ["well.txt", () => {changeConsole("<p>Well I don't really know why you are here... No-one ever checks the public folder... Freak</p>")}]
    ],
    "./home/baile/downloads" : [
        ["Maxwell.png", () => {changeConsole("<p>Maxwell.png</p><img src='/assets/portfolio/Maxwell.jpg'>", true)}],
        ["Placeholder.png", () => {changeConsole("<p>File not found.png</p><img class='max-h-1/2' src='/assets/portfolio/missing.jpg'><p>Get it?</p>", true)}],
        ["Nuclear launch codes.txt", () => {changeConsole("<p class='text-center'>You will never get the nuclear launch codes!</p>")}]
    ],
    "./home/baile/images" : [
        ["Bailey fun.png", () => {changeConsole("<p>Bailey fun.png</p><img class='max-h-1/2' src='/assets/portfolio/Blil fears for his life.jpg'><p>I think Phil in the seat behind me wants me dead...</p>", true)}],
        ["Salt.png", () => {changeConsole("<p>Salt.png</p><img class='max-h-1/2' src='/assets/portfolio/Salt.jpg'>", true)}]
    ],
    "./Videos" : [
        ["FurnessCollege.webm", () => {changeConsole('<p>FurnessCollege.webm</p><video src="/assets/portfolio/FurnessCollege.webm" controls>', true)}],
    ]
}

function removeConsoleContents(): void {
    if (!consoleContents){
        return;
    }

    var items: Element[] = Array.from(consoleContents.children)
    for (let item of items){
        item.remove()
    }
}

function appendConsoleContents(items: string, useFlexCol: boolean): void{
    if (!consoleContents){
        return;
    }

    if (useFlexCol){
        if (!consoleContents.classList.contains('flex-col')){
            consoleContents.classList.remove("justify-start")
            consoleContents.classList.add("justify-center")
            consoleContents.classList.add("flex-col")
        }
    }
    else{
        if (consoleContents.classList.contains('flex-col')){
            consoleContents.classList.add("justify-start")
            consoleContents.classList.remove("justify-center")
            consoleContents.classList.remove('flex-col')
        }
    }
    consoleContents.innerHTML += items
}

function removeDirContents(): void {
    if (!currentDir){
        return
    }

    var items: Element[] = Array.from(currentDir.children)
    for (let item of items){
        item.remove()
    }
}

function appendDirContents(newPath: string): void {
    if (!currentDir){
        return
    }

    var itemsToAdd = pathToElements[newPath]
    if (!itemsToAdd) {
        return
    }

    itemsToAdd.forEach(function (item){
        var pChild: HTMLParagraphElement = document.createElement('p')
        pChild.classList.add('cursor-pointer')
        pChild.innerText = item[0]
        pChild.onclick = function() {
            const command = item[1];
            if (typeof command === "function") {
                command();
            }
        }
        var spanChild: HTMLSpanElement = document.createElement('span')
        spanChild.classList.add("pl-12", "mt-3", "text-3xl")
        spanChild.appendChild(pChild)
        currentDir.appendChild(spanChild)
    })
}

function changeDir(path: string, shouldReturn: boolean = false): void {
    if (!pathElement){
        return
    }

    let currentPath: string = pathElement.innerText

    if (shouldReturn){
        if (currentPath.trim() !== "./"){
            removeDirContents()
            let parts = currentPath.split("/").filter(Boolean) //Ngl love truthy falsy
            parts.pop()
            let newPath: string = parts.length > 0 ? `./${parts.join("/")}` : "./"
            pathElement.innerText = newPath

            appendDirContents(newPath)

        }
        //Means we are at root
        //changeConsole('<img class="h-[35%]" src="/assets/portfolio/Arch.png"><div class="flex-col"><p class="text-[#0dcdcd]">baile@baile</p><p>- - - - - -</p><p><data class="text-[#0dcdcd]">OS</data>: Arch Linux x86_64</p><p><data class="text-[rgb(13,205,205)]">HOST</data>: B760 Pro RS/D4</p><p><data class="text-[rgb(13,205,205)]">KRNL</data>: Linux 6.15.7-arch1-1</p><p><data class="text-[#0dcdcd]">CPU</data>: i5-12400F (12) @ 5.60 GHz</p><p><data class="text-[#0dcdcd]">GPU</data>: NVIDIA GeForce RTX 3060</p><p><data class="text-[#0dcdcd]">Disk</data>: (/): 916 GiB</p><p><data class="text-[#0dcdcd]">Disk</data>: (/mnt/games): 3.1 TiB</p><p><data class="text-[#0dcdcd]">Memory</data>: 31.06 GiB</p></div>')
        return;
    }
    removeDirContents()
    let directory = path.replace(/^\/+|\/+$/g, "")
    let newPath: string = directory
        ? currentPath === "./" ? `./${directory}` : `${currentPath}/${directory}`
        : currentPath
    pathElement.innerText = newPath
    appendDirContents(newPath)

    return;
}

function changeConsole(item: string, useFlexCol: boolean = false): void {
    removeConsoleContents()

    appendConsoleContents(item, useFlexCol)
}

document.addEventListener("DOMContentLoaded", () => {
    changeDir("", false)
});

(window as any).changeDir = changeDir;

for (const e of document.querySelectorAll('img')) {
	e.addEventListener('error', function(event) {
		const target = event.target as HTMLImageElement;
		target.src = 'NoImage.jpg';
		target.onerror = null;
	});

	if (e.complete && e.naturalWidth === 0) {
		e.dispatchEvent(new Event('error'));
	}
}