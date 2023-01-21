import kaboom from 'kaboom'

kaboom()

const player = add([
  pos(0, 0),
  circle(16),
])

const obstacle = add([
  pos(50, 50),
  circle(10),
  color(rgb(255, 0, 0))
])

player.onUpdate(() => {
  camPos(player.pos)
})

onKeyDown('a', () => {
  player.pos.x -= 1
})

onKeyDown('w', () => {
  player.pos.y -= 1
})

onKeyDown('s', () => {
  player.pos.y += 1
})

onKeyDown('d', () => {
  player.pos.x += 1
})
