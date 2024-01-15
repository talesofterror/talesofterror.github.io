## Odin Project ETCHASKETCH

`
let string = "markdown testing"
`

# Things that need to happen: 

<!-- * resolution dial
	* limit to values between 50 and 100 -->
<!-- * rolling smiley dials -->
<!-- * color picker & icon
	* fix color of randomizer button toggle -->
<!-- * grid visibility
	* functionality
	* closed eye toggle -->
<!-- * device texture -->
<!-- * Logo / title -->
* Info copy
<!-- * Tooltip copy -->
  <!-- * eraser function advisory -->

# experimental shape functions
`
function distance(x1, y1, x2, y2) {
	return Math.ceil(Math.sqrt(Math.pow(x2 - x1, 2) +
		Math.pow(y2 - y1, 2) * 1.0))
}

function drawLine(x1, y1, x2, y2) {
	let dotX
	let dotY
	for (i = 0; i < distance(x1, y1, x2, y2); i++) {
		/*
		For longer lines either x2 or y2 is reached too early, resulting
		in curved lines. 
		// Maybe: 
			if (dotX < x2 / 3) { etc }
			else if ()
		*/
		if (x1 < x2 && dotX != x2) {
			//increment x
			dotX = x1 + i
		} else if (x1 == x2) {
			dotX = x2
		} else if (x1 > x2 && dotX != x2) {
			//decrement x
			dotX = x1 - i
		}
		if (y1 < y2 && dotY != y2) {
			//increment x
			dotY = y1 + i
		} else if (y1 == y2 || dotY == y2) {
			dotY = y2
		} else if (y1 > y2 && dotY != y2) {
			//decrement x
			dotY = y1 - i
		}

		colorCell(dotX, dotY)
	}
}

`

NOTES: 

`
x = pixelContainer.children[x]
y = pixelContainer.children[x].children[y]
[x, y] = pixelContainer.children[x].children[y]

function (x, y) {
	return [x,y]
}

// what??

pointA = [x1,y1]
pointB = [x2,y2]

distance = (x2 - y2) * 2 + (y2-y1) * 2

// to draw a rectangle: 
	[x1, y1] = corner1
	[x2, y2] = corner2

	function rect (x1, y1, x2, y2) {
		ghostpoint1 = [x1, y2]
		ghostpoint2 = [x2, y1]

	draw side1
		for (i < distance(corner1, ghostpoint1)) {
			pixelContainer.children[ (x1 + i].children[y].bgcolor = $color
		}
	} 
	`

	`#231000`