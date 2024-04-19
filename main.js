const readline = require('readline')

const map = {
	width: 40,
	height: 14
}

const playerLeft = [
	{ x: 2, y: 4 },
	{ x: 2, y: 5 },
	{ x: 2, y: 6 },
	{ x: 2, y: 7 },
	{ x: 2, y: 8 },
	{ x: 2, y: 9 },
]

const playerRight = [
	{ x: 38, y: 4 },
	{ x: 38, y: 5 },
	{ x: 38, y: 6 },
	{ x: 38, y: 7 },
	{ x: 38, y: 8 },
	{ x: 38, y: 9 },
]

const ball = {
	x: 20,
	y: 7,
	updateX: 1,
	updateY: 1,
}

const draw = () => {
	for(let y = 0; y <= map.height; y++) {
		let line = ""
		for(let x = 0; x <= map.width; x++) {
			let block = ''
			playerLeft.forEach(p => {
				if(p.x == x && p.y == y) {
					block += '🟥'
				}
			})
			playerRight.forEach(p => {
				if(p.x == x && p.y == y) {
					block += '🟩'
				}
			})

			if(block != '') {
				line += block
			}
			else if(ball.x == x && ball.y == y) {
				line += '⬜'
			}
			else {
				line += '⬛'
			}
		}
		console.log(line)
	}
}

const die = (winner) => {
	console.clear();
	console.log('WINNER: ' + winner)
	process.exit();
}

const ballMove = () => {

	if(ball.y >= map.height) {
		ball.updateY = -1
	}
	if(ball.y <= 0) {
		ball.updateY = 1
	}
	if(ball.x >= map.width) {
		die('Czerwony')
	}
	if(ball.x <= 0) {
		die('Zielony')
	}

	[...playerLeft, ...playerRight].forEach(p => {
		if(p.x == ball.x && p.y == ball.y) {
			ball.updateX *= -1
		}
	})

	ball.x += ball.updateX
	ball.y += ball.updateY
}

const update = () => {
	console.clear()
	draw()
	ballMove()
}

const main = () => {
	readline.emitKeypressEvents(process.stdin);

	if (process.stdin.isTTY)
			process.stdin.setRawMode(true);

	process.stdin.on('keypress', (chunk, key) => {
		if(key.name == 'q') {
			process.exit()
		}
		else if(key.name == 'up' && !playerRight.find(p => p.y == 0)) {
			playerRight.forEach(p => {
				p.y--
			})
		}
		else if(key.name == 'down' && !playerRight.find(p => p.y == map.height)) {
			playerRight.forEach(p => {
				p.y++
			})
		}
		else if(key.name == 'w' && !playerLeft.find(p => p.y == 0)) {
			playerLeft.forEach(p => {
				p.y--
			})
		}
		else if(key.name == 's' && !playerLeft.find(p => p.y == map.height)) {
			playerLeft.forEach(p => {
				p.y++
			})
		}
		
	});

	setInterval(update, 100)
}

main()