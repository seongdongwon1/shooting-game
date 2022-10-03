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
let spaceShipX = canvas.width / 2 -32
let spaceShipY = canvas.height - 64

function getImages () {
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
function setupKeyboardListener () {
    document.addEventListener('keydown', (e) => {
        keysDown[e.keyCode] = true
        console.log('z', keysDown)
    })
}

function render () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(spaceShipImage, spaceShipX, spaceShipY)
}

function main () {
    render()
    requestAnimationFrame(main)
}

getImages()
setupKeyboardListener()
main()

