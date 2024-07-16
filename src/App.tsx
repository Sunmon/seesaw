import { useEffect, useRef, useState } from 'react'
import {Engine, Render, Runner, Bodies, Composite, Composites, Constraint} from 'matter-js'
import './App.css'

function App() {

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => { 
    const engine = Engine.create();
    const render = Render.create({
      // element: document.body,
      element: containerRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: true,
        // showAngleIndicator: true,
        // showCollisions: true,
        // showVelocity: true,
      }
    });


    /////////////////////////////////////
  
    const boxComposite = Composite.create();
    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    // Composite.add(boxComposite, [boxA, boxB]) // this occurs error

    // // const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  
    // Composite.add(engine.world, [boxA, boxB, ground]);
    const ground = Bodies.rectangle(400, 500, 810, 60, { isStatic: true });
    // Composite: A composite is a collection of bodies, constraints and composites.
    // stack(x,y,columns,rows,columnGap,rowGap,callback)
    const frame = Composite.create();
    const bar = Bodies.rectangle(400, 100, 300, 20, {isStatic: true}); 
    const ropeL = Composites.stack(300, 100, 1, 5, 5, 5, function(x, y) {
      return Bodies.rectangle(x, y+10, 10, 30);
    });
    const ropeR = Composites.stack(500, 100, 1, 5, 5, 5, function(x, y) {
      return Bodies.rectangle(x, y+10, 10, 30);
    });
    // Composites.chain(rope, 1, 0, 1, 1, { stiffness: 0.5, length: 2, render: { type: 'line' } });
    Composites.chain(ropeL, 0, -0.3, 0, 0.3, {stiffness: 0, length:30,  render: {type: 'line'}});
    Composites.chain(ropeR, 0, -0.3, 0, 0.3, {stiffness: 0, length:30,  render: {type: 'line'}});
    Composite.add(frame, [bar, ropeL, ropeR]);
    Composite.add(frame, Constraint.create({ 
      bodyA: bar,
      bodyB: ropeL.bodies[0],
      length: (bar.bounds.max.y - bar.bounds.min.y)*2,
      type: 'pin',
      pointA: {x: -100, y: 0},
      pointB: {x: 0, y: 10},
      // pointB: { x: rope.bodies[0].position.x, y: rope.bodies[0].position.y },
      // pointA: { x: bar.bounds.min.x, y: bar.bounds.min.y },
      // pointB: { x: 0, y: 0},
      stiffness: 0
  }))
  Composite.add(frame, Constraint.create({ 
    bodyA: bar,
    bodyB: ropeR.bodies[0],
    length: (bar.bounds.max.y - bar.bounds.min.y)*2,
    type: 'pin',
    pointA: {x: 100, y: 0},
    pointB: {x: 0, y: 10},
    // pointB: { x: rope.bodies[0].position.x, y: rope.bodies[0].position.y },
    // pointA: { x: bar.bounds.min.x, y: bar.bounds.min.y },
    // pointB: { x: 0, y: 0},
    stiffness: 0
}))


    Composite.add(engine.world, [ground]);
    Composite.add(engine.world, [frame]);
    Composite.add(engine.world, [boxComposite])
  
    Render.run(render)
  
    const runner = Runner.create();
    Runner.run(runner, engine);
    // alert(21);
    // console.log(123)
  },[])

  return (
    <>
      <div ref={containerRef}>


       </div>
    </>
  )
}

export default App
