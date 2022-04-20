const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

const chop = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/chop.png'
})

const plyaer = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  }
})


const enemy = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  }
})

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
         
}

function retangularCollision({ rectangel1, rectangel2 }) {
  return (rectangel1.attackBox.position.x + rectangel1.attackBox.width >= rectangel2.position.x &&
    rectangel1.attackBox.position.x <= rectangel2.position.x + rectangel2.width &&
    rectangel1.attackBox.position.y + rectangel1.attackBox.height >= rectangel2.position.y &&
    rectangel1.attackBox.position.y <= rectangel2.position.y + rectangel2.height)
}

function determinWinner({ plyaer, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayTex').style.display = 'flex'
  if (plyaer.helth === enemy.helth) {
    document.querySelector('#displayTex').innerHTML = 'Tie'
  } else if (plyaer.helth > enemy.helth) {
    document.querySelector('#displayTex').innerHTML = 'Player 1 Wins'
  } else if (plyaer.helth < enemy.helth) {
    document.querySelector('#displayTex').innerHTML = 'Player 2 Wins'
  }
}

let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }
  if (timer === 0) {
    decreaseTimer({plyaer, enemy, timerId})
  }
}
decreaseTimer()

function animate() {
          window.requestAnimationFrame(animate)
          c.fillStyle = 'black'
          c.fillRect(0, 0, canvas.width, canvas.height)
          background.update()
          chop.update()
          plyaer.update()
          enemy.update()

          plyaer.velocity.x = 0
          enemy.velocity.x = 0

          //player movement
          if (keys.a.pressed && plyaer.lastKey === 'a') {
                    plyaer.velocity.x = -5
          } else if (keys.d.pressed && plyaer.lastKey === 'd') {
                    plyaer.velocity.x = 5
          }

            //enemy movement
            if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
                    enemy.velocity.x = -5
          } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
                    enemy.velocity.x = 5
            };
          
          //detect for collision
  if (
    retangularCollision({
      rectangel1: plyaer,
      rectangel2: enemy
    }) &&
    plyaer.isAttaking) {
    plyaer.isAttaking = false
    enemy.helth -= 20
    document.querySelector('#enemyHelth').style.width = enemy.helth + '%'
  }

  if (
    retangularCollision({
      rectangel1: enemy,
      rectangel2: plyaer
    }) &&
    enemy.isAttaking) {
    enemy.isAttaking = false
    plyaer.helth -= 20
    document.querySelector('#plyaerHelth').style.width = plyaer.helth + '%'
  }

  //end game bassed on health
  if (enemy.helth <= 0 || plyaer.helth <= 0) {
    determinWinner({plyaer, enemy, timerId})
  }
}

animate()

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        plyaer.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        plyaer.lastKey = 'a'
        break
      case 'w':
        plyaer.velocity.y = -20
        break
      case ' ':
        plyaer.attack()
        break
                    
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        enemy.velocity.y = -20
        break
      case 'ArrowDown':
        enemy.attack()
        enemy.isAttaking = true
        break
    }
  })

  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
    }

    //enemy keys

    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
  })
