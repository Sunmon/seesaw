import { useEffect, useRef, useState } from 'react'
import {Engine, Render, Runner, Bodies, Composite} from 'matter-js'
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
        wireframes: false
      }
    });
  
    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  
    Composite.add(engine.world, [boxA, boxB, ground]);
  
    Render.run(render)
  
    const runner = Runner.create();
    Runner.run(runner, engine);
  
  }, [])

  return (
    <>
      <div ref={containerRef}>


       </div>
    </>
  )
}

export default App
