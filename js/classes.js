class Sprite {
  constructor({
    position,
    imageSrc
  }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y
    )
  }

  update() {
    this.draw()
  }
}

class Fighter{
  constructor({ position, velocity, color = 'red', offset}) {
            this.position = position
            this.velocity = velocity
            this.height = 150
            this.width = 50
            this.lastKey 
            this.attackBox = {
                      position: {
                                x: this.position.x,
                                y: this.position.y
                      },
                      offset,
                      width: 100,
                      height: 50,
            }
            this.color = color
    this.isAttaking
    this.helth = 100
  }

  drow() {
            c.fillStyle = this.color
            c.fillRect(this.position.x, this.position.y, this.width, this.height)

            //attack box
            c.fillStyle = 'green'
             if (this.isAttaking) {
                      c.fillRect(
                                this.attackBox.position.x,
                                this.attackBox.position.y,
                                this.attackBox.width,
                                this.attackBox.height)
            }
  }

  update() {
            this.drow()
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x
            this.attackBox.position.y = this.position.y

            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            if (this.position.y + this.height + this.velocity.y >= canvas.height) {
                      this.velocity.y = 0
    } else this.velocity.y += gravity
}

  attack() {
            this.isAttaking = true
    setTimeout(() => {
      this.isAttaking = false
    }, 100)
}
}