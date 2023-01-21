import kaboom from 'kaboom'
import type { Vec2 } from 'kaboom'

kaboom()

const PLAYER_SPEED = 2
const BULLET_SPEED = 7
const DIR_LEN = 50

const player = add([
  pos(0, 0),
  circle(16),
  z(0),
  {
    shot: (dir: Vec2) => {
      const bullet = add([
        pos(player.pos),
        circle(4),
        z(1),
      ])
      bullet.onUpdate(() => {
        const speed = dir.scale(BULLET_SPEED)
        bullet.pos = bullet.pos.add(speed)
      })
    }
  }
])

player.onUpdate(() => {
  camPos(player.pos)
})

const getPointerDirection = () => {
  const mp = toWorld(mousePos())
  const diff = mp.sub(player.pos)
  return diff.unit()
}

onDraw(() => {
  const diff = getPointerDirection()
  const p1 = player.pos
  const p2 = p1.add(diff.scale(DIR_LEN))
  drawLine({
    p1,
    p2,
    width: 2,
    color: rgb(255, 0, 0),
  })
})


const obstacle = add([
  pos(50, 50),
  circle(10),
  color(rgb(255, 0, 0))
])

onKeyDown('a', () => {
  player.pos.x -= PLAYER_SPEED
})

onKeyDown('w', () => {
  player.pos.y -= PLAYER_SPEED
})

onKeyDown('s', () => {
  player.pos.y += PLAYER_SPEED
})

onKeyDown('d', () => {
  player.pos.x += PLAYER_SPEED
})

onClick(() => {
  player.shot(getPointerDirection())
})
