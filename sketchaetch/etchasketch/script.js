const pixelContainer = document.querySelector(".pixel-container")
const fgColorPicker = document.querySelector(".fg")
const bgColorPicker = document.querySelector(".bg")
let pixels = []
let mousePosition = [0, 0]
const xCoord = document.createAttribute("x")
const yCoord = document.createAttribute("y")

let initBG = getComputedStyle(document.documentElement).getPropertyValue("--screenBG")
let initColor = getComputedStyle(document.documentElement).getPropertyValue("--deviceBG")
let screenCursor = getComputedStyle(document.documentElement).getPropertyValue("--screenCursor")

let knobInterval

let controls = {
  color: {
    fgValue: fgColorPicker.value,
    bgValue: bgColorPicker.value
  },
  resolution: {
    value: 50,
    gridVisible: true,
    elementToggleGrid: document.getElementById("grid-toggle"),
    elementUp: document.getElementById("up-arrow"),
    elementDown: document.getElementById("down-arrow"),
    elementText: document.getElementById("resolution-text"),
  },
  drawing: false,
  eraser: false,
  randomizeColor: {
    element: document.querySelector(".randomize-toggle img"),
    value: false
  },
  clear: {
    element: document.getElementById("reset-button"),
    method: function (bgColor) {
      for (y = 0; y < pixels.length; y++) {
        for (x = 0; x < pixels[y].length; x++) {
          colorCell(pixels[y][x].getAttribute("x"), pixels[y][x].getAttribute("y"), bgColor)
          pixels[y][x].classList.remove("drawn")
        }
      }
    }
  },
  info: {
    button: document.getElementById("info-button"),
    element: document.getElementById("info-text"),
    value: false
  }
}

createScreen(controls.resolution.value)
activateControls()


// CONTROLS ACTIVATION

function activateControls() {

    // add color picker listeners

    fgColorPicker.addEventListener("input", () => {
      controls.color.fgValue = fgColorPicker.value
      document.documentElement.style.setProperty("--screenCursor", controls.color.fgValue)
    })
    bgColorPicker.addEventListener("input", () => {
      controls.color.bgValue = bgColorPicker.value
      pixelContainer.style.backgroundColor = bgColorPicker.value
      for (let y = 0; y < pixels.length; y++) {
        for (let x = 0; x < pixels[y].length; x++) {
          if (pixels[y][x].classList.contains("drawn")) {
            continue
          } else {
            pixels[y][x].style.backgroundColor = controls.color.bgValue
          }
        }
      }
    })

  // randomize element

  controls.randomizeColor.element.addEventListener("click", () => {
    if (!controls.randomizeColor.value) {
      controls.randomizeColor.value = true
      controls.randomizeColor.element.src = "assets/dice-color-icon.svg"
      document.documentElement.style.setProperty("--screenCursor", makeRandomColorString())
    } else {
      controls.randomizeColor.value = false
      controls.randomizeColor.element.src = "assets/dice-icon.svg"
      document.documentElement.style.setProperty("--screenCursor", controls.color.fgValue)
    }
  })

  // resolution elements

  controls.resolution.elementUp.addEventListener("click", () => {
    if (controls.resolution.value == 100) {
      return
    } else {
      controls.resolution.value += 10
      createScreen(controls.resolution.value)
    }
  })
  controls.resolution.elementDown.addEventListener("click", () => {
    if (controls.resolution.value == 50) {
      return
    } else {
      controls.resolution.value -= 10
      createScreen(controls.resolution.value)
    }
  })
  controls.resolution.elementToggleGrid.addEventListener("click", () => {
    if (controls.resolution.gridVisible) {
      for (y = 0; y < pixels.length; y++) {
        for (x = 0; x < pixels[y].length; x++) {
          pixels[y][x].style.borderWidth = "0px"
          controls.resolution.elementToggleGrid.classList.add("grid-off-icon-fade")
        }
      }
      controls.resolution.gridVisible = false
    } else {
      for (y = 0; y < pixels.length; y++) {
        for (x = 0; x < pixels[y].length; x++) {
          pixels[y][x].style.borderWidth = "1px"
          controls.resolution.elementToggleGrid.classList.remove("grid-off-icon-fade")
        }
      }
      controls.resolution.gridVisible = true
    }
  })

  // reset element

  controls.clear.element.addEventListener("click", () =>
    controls.clear.method(controls.color.bgValue))

  // info button

  controls.info.button.addEventListener("click", () => {
    if (controls.info.value == false) {
      controls.info.element.style.visibility = "visible"
      controls.info.value = true
    } else {
      controls.info.element.style.visibility = "hidden"
      controls.info.value = false
    }
  })

  document.body.addEventListener("keydown", (e)=> {
    if (e.key == "Escape") {
      if (controls.info.element.style.visibility == "visible") {
        controls.info.element.style.visibility = "hidden"
        controls.info.value = false
      }
    }
  })

  // add knob reactivity

  let i = 0
  let currentRotation = 0
  let tau = Math.PI * 2
  pixelContainer.addEventListener("mouseover", (e) => {
    if (e.currentTarget != pixelContainer){
      return
    }
    knobInterval = setInterval(() => {
      if (i < tau) {
        let knobs = [document.querySelector(".left-knob"), document.querySelector(".right-knob")]
        currentRotation += Math.sin(i) * 2
        i += 0.25
        knobs[0].style.transform = `rotate(${currentRotation}deg)` // string[7]
        knobs[1].style.transform = `rotate(${-currentRotation}deg)` // string[7]
      }
      if (i > tau) {
        i = 0
      }
    }, 30)
  })
  pixelContainer.addEventListener("mouseout", (e) => {
    if (e.currentTarget != pixelContainer){
      return
    }
    clearInterval(knobInterval)
  })
}


// SCREEN CREATION

function createScreen(sizeX) {

  // Insert elements

  if (pixelContainer.firstElementChild) {
    Array.from(pixelContainer.children).forEach(element => element.remove())
    pixels.length = 0
    createScreen(sizeX)
  } else {
    for (let y = 0; y < sizeX / 2; y++) {
      pixelContainer.appendChild(document.createElement("div"))
      pixelContainer.lastChild.classList.add("pixel-row")
      for (let x = 0; x < sizeX; x++) {
        pixelContainer.lastChild.appendChild(document.createElement("div"))
        pixelContainer.lastChild.lastChild.classList.add("pixel")
        pixelContainer.lastChild.lastChild.setAttribute("x", x)
        pixelContainer.lastChild.lastChild.setAttribute("y", y)
      }
    }
  }

  // Create pixel array

  for (let i = 0; i < pixelContainer.children.length; i++) {
    let p = []
    for (let j = 0; j < pixelContainer.children[i].children.length; j++) {
      pixelContainer.children[i].children[j].style.backgroundColor = controls.color.bgValue
      p.push(pixelContainer.children[i].children[j])
    }
    pixels.push(p)
  }

  // Add screen listeners

  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[y].length; x++) {
      pixels[y][x].addEventListener("mousemove",
        (e) => {
          e.stopPropagation()
          if (controls.drawing) {
            e.preventDefault()
            if (controls.eraser) {
              colorCell(mousePosition[0], mousePosition[1], controls.color.bgValue)
            } else if (controls.randomizeColor.value) {
              e.target.classList.add("drawn")
              colorCell(mousePosition[0], mousePosition[1], makeRandomColorString())
            } else {
              e.target.classList.add("drawn")
              colorCell(mousePosition[0], mousePosition[1], controls.color.fgValue)
            }
          }
        })
      pixels[y][x].addEventListener("mouseover",
        (e) => {
          // e.stopPropagation()
          if (controls.randomizeColor.value) {
            document.documentElement.style.setProperty("--screenCursor", makeRandomColorString())
          }
          mousePosition[0] = e.target.getAttribute("x")
          mousePosition[1] = e.target.getAttribute("y")
        })
      pixels[y][x].addEventListener("mousedown",
        (e) => {
          controls.drawing = true
          if (e.button == 0) {
            e.preventDefault()
            if (controls.randomizeColor.value) {
              screenCursor = () => makeRandomColorString()
            }
            controls.eraser = false
            colorCell(mousePosition[0], mousePosition[1], controls.color.fgValue)
            e.target.classList.add("drawn")
          } else if (e.button == 2) {
            controls.eraser = true
            e.target.classList.remove("drawn")
            if (e.target.classList.contains("drawn")) {
              colorCell(mousePosition[0], mousePosition[1], controls.color.bgValue)
            }
          }
        })
    }
  }

  document.querySelector("body").addEventListener("mouseup",
    () => {
      controls.drawing = false
    })

  // resolution text value

  controls.resolution.elementText.textContent = sizeX
}


// UTILITY FUNCTIONS

function colorCell(x, y, color) {
  pixels[y][x].style.backgroundColor = color
}

function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function map16to256(color) { return map(color, 0, 15, 0, 255) }

function makeRandomNumber16() {
  let colorVal = Math.floor(Math.random() * 16)
  return colorVal
}

function makeRandomColorString() {
  let r = map16to256(makeRandomNumber16())
  let g = map16to256(makeRandomNumber16())
  let b = map16to256(makeRandomNumber16())
  return `rgb(${r}, ${g}, ${b})`
}

function tooltipHover(event, divid) {
  let left = event.clientX + 15 + "px";
  let right = event.clientY + "px";
  let div = document.getElementById(divid)
  div.style.left = left
  div.style.right = right
  div.style.visibility = "visible";
}

function tooltipOff(divid) {
  let div = document.getElementById(divid)
  div.style.visibility = "hidden"
}

window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function desktopOnly () {
  if (mobileAndTabletCheck() == true){
    document.getElementsByClassName("pixel-container").textContent = "Desktop only :("
  }
}

desktopOnly();
