/**
 *  canvas setting
 */
let canvas;
let ctx;

canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, spaceShipImage, bulletImage, enemyImage, gaveOverImage
/**
 * space ship  좌표
 */
let spaceShipX = canvas.width / 2 - 32
let spaceShipY = canvas.height - 64

function getImages() {
    backgroundImage = new Image()
    backgroundImage.src = 'images/background.jpeg'

    spaceShipImage = new Image()
    spaceShipImage.src = 'images/spaceship.png'

    bulletImage = new Image()
    bulletImage.src = 'images/bullet.png'

    enemyImage = new Image()
    enemyImage.src = 'images/enemy.png'

    gaveOverImage = new Image()
    gaveOverImage.src = 'images/gameover.jpeg'
}

let keysDown = {}
function setupKeyboardListener() {
    document.addEventListener('keydown', (e) => {
        keysDown[e.keyCode] = true
        console.log('z', keysDown)
    })
    document.addEventListener('keyup', (e) => {
        delete keysDown[e.keyCode]
    })
}

function update() {
    // 우주선의 속도
    if (39 in keysDown) { //right
        spaceShipX += 5
    }
    if (37 in keysDown) { //left
        spaceShipX -= 5
    }

    // 경기장 밖으로 안나가게.
    if (spaceShipX <= 0) {
        spaceShipX = 0
    }
    if (spaceShipX >= canvas.width - 64) {
        spaceShipX = canvas.width - 64
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(spaceShipImage, spaceShipX, spaceShipY)
}

function main() {
    update()
    render()
    requestAnimationFrame(main)
}

getImages()
setupKeyboardListener()
main()

