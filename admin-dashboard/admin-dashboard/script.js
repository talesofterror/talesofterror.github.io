console.log("WangleLine - 'Farbkasten'")

let navMenu = document.getElementById("nav-menu")
let burger = document.getElementById("burger")

burger.addEventListener("touchstart", (e) => {
	console.log("touch ocurred")
	if (Array.from(navMenu.classList).includes("hide")) {
		navMenu.classList.remove("hide")
	} else {
		navMenu.classList.add("hide")
	}
})


