const {Engine, Render, World, Bodies, Composites, MouseConstraint} = Matter

Matter.use("matter-wrap")

// get the width/height of the window
const w = window.innerWidth
const h = window.innerHeight
const dpi = window.devicePixelRatio
const section = document.querySelector('section.area')

// create an matter.js engine
const engine = Engine.create()

// create a renderer
const renderer = Render.create({
  element: section,
  engine: engine,
  options: {
    width: w,
    height: h,
    pixelRatio: dpi,
    background: '#000000',
    wireframes: false
  }
})

const createShape = function (x, y) {
  //   return Bodies.circle(x, y, 15 + Math.random() * 15, {
//     render: {
//       fillStyle: '#ffffff',
//       strokeStyle: 'transparent'
//     }
//   })
  const images = ['cherri', 'hart']
  return Bodies.rectangle(x, y, 38, 50, {
    render: {
      sprite: {
        texture: `${images[Math.round(Math.random())]}.png`,
        xScale: 0.5,
        yScale: 0.5
      }
    },
    plugin: {
      wrap: {
        min: { x: 0, y: 0 },
        max: { x: w, y: h }
      }
    }
  })
}

const wallOptions = {
  isStatic: true,
  render: {
    visible: false
  }
}

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions)

const shapes = Composites.stack(50, 50, 10, 10, 40, 40, function (x, y) {
  return createShape(x, y)
})

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w / 4, h / 4), {
  isStatic: true,
  render: {
    fillStyle: '#ffffff',
    strokeStyle: 'transparent'
  }
})

// add mouse control
const mouse = MouseConstraint.create(engine, {
  element: section,
  constraint: {
    render: {
	    visible: false
    }
   }
 })

// add all of the bodies to the world
World.add(engine.world, [
  mouse, 
  shapes, 
  bigBall, 
  ground,
  ceiling,
  leftWall,
  rightWall
])

// run the engine
Engine.run(engine)
// run the renderer
Render.run(renderer)


document.addEventListener("click", function (event) {
  const shape = createShape(event.pageX, event.pageY)
  World.add(engine.world, shape)
})

document.addEventListener("touchstart", function (event) {
  const shape = createShape(event.pageX, event.pageY)
  World.add(engine.world, shape)
})

window.addEventListener('deviceorientation', function (event) {
  engine.world.gravity = {
    x: (event.gamma / 50),
    y: (event.beta / 25)
  }
  
  Engine.update(engine)
})
