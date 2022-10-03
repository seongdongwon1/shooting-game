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
let gameOver = false
let score = 0
/**
 * space ship  좌표
 */
let spaceShipX = canvas.width / 2 - 32
let spaceShipY = canvas.height - 64

let bulletList = [] //총알 저장 리스트

function Bullet() {
    this.x = 0
    this.y = 0
    this.init = function () {
        this.x = spaceShipX + 20
        this.y = spaceShipY
        this.alive = true

        bulletList.push(this)
    }
    this.update = () => {
        this.y -= 7
    }
    this.checkHit = () => {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 50) {
                score++
                this.alive = false
                enemyList.splice(i, 1)
            }
        }
    }
}

function generateRandomValue(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNumber
}

let enemyList = []
function enemy() {
    this.x = 0
    this.y = 0
    this.init = function () {
        this.x = generateRandomValue(0, canvas.width - 48)
        this.y = 0

        enemyList.push(this)
    }
    this.update = () => {
        this.y += 1

        if (this.y >= canvas.height - 48) {
            gameOver = true
        }
    }
}

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
    })
    document.addEventListener('keyup', (e) => {
        delete keysDown[e.keyCode]
        if (e.keyCode == 32) {
            createBullet() // 총알생성함수
        }
    })
}

function createBullet() {
    let b = new Bullet()
    b.init()
}

function createEnemy() {
    const interval = setInterval(() => {
        let e = new enemy()
        e.init()
    }, 500)
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

    //총알의 y좌표 업데이트 하는 함수 호출
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update()
            bulletList[i].checkHit()
        }
    }

    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update()
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(spaceShipImage, spaceShipX, spaceShipY)
    ctx.fillText(`Score: ${score}`, 20, 20)
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
        }
    }

    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
    }
}

function main() {
    if (!gameOver) {
        update()
        render()
        requestAnimationFrame(main)
    } else {
        ctx.drawImage(gaveOverImage, 10, 100, 380, 380)
    }
}

getImages()
setupKeyboardListener()
createEnemy()
main()

