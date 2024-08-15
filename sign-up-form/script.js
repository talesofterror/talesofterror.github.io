/*
 * 
 * */

let passwordInput = document.getElementById("password")
let passwordConfirmInput = document.getElementById("password-confirm")

document.addEventListener("input", (e) => {
	if (e.target == passwordInput) {
		passwordInput.classList.add("pw-check")

	}

	if (e.target == passwordConfirmInput || e.target == passwordInput) {
		if (passwordConfirmInput.value != passwordInput.value) {
			passwordConfirmInput.classList.add("pw-confirm-check")	
		} else {
			passwordConfirmInput.classList.remove("pw-confirm-check")
		}
	}
})

