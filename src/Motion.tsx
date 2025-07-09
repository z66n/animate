"use client"

import { useState, useEffect, useRef } from "react"
import { animate, stagger, spring, delay } from "motion"
import { motion } from "motion/react"
import type { Variants } from "motion/react"
import * as motionPlus from "motion/react-client"
import { splitText } from "motion-plus"

export default function MotionExamples() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="motion-container">
      <div className="tabs">
        {["Spring", "Layout", "Wavy Text", "Path Drawing"].map((label, index) => (
          <button
            key={index}
            className={activeTab === index ? "active" : ""}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="example-container">
        {activeTab === 0 && <SpringExample />}
        {activeTab === 1 && <LayoutExample />}
        {activeTab === 2 && <WavyText />}
        {activeTab === 3 && <PathDrawing />}
      </div>

      <style>{`
        .motion-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .tabs button {
          padding: 8px 16px;
          background: #1d2628;
          border: none;
          border-radius: 4px;
          color: #8df0cc;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .tabs button.active {
          background: #8df0cc;
          color: #0f1115;
        }
        
        .tabs button:hover {
          background: #2a3739;
        }
        
        .example-container {
          width: 100%;
          min-height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

function SpringExample() {
  const [state, setState] = useState(false)

  return (
    <div className="spring-example">
      <div className="box" data-state={state} />
      <button onClick={() => setState(!state)}>Toggle position</button>

      <style>{`
        .spring-example {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .spring-example .box {
          width: 100px;
          height: 100px;
          background-color: #8df0cc;
          border-radius: 10px;
          transition: transform ${spring(0.5, 0.8)};
          transform: translateX(-100%);
        }

        .spring-example .box[data-state="true"] {
          transform: translateX(100%) rotate(180deg);
        }

        .spring-example button {
          background-color: #8df0cc;
          color: #0f1115;
          border-radius: 5px;
          padding: 10px;
          margin: 10px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

function LayoutExample() {
  const [aspectRatio, setAspectRatio] = useState(1)
  const [width, setWidth] = useState(100)

  const debouncedAspectRatio = useDebouncedState(aspectRatio)
  const debouncedWidth = useDebouncedState(width)

  return (
    <div id="layout-example">
      <div className="container">
        <motionPlus.div
          layout
          className="box"
          style={{
            aspectRatio: debouncedAspectRatio,
            width: debouncedWidth,
            borderRadius: 20,
          }}
        ></motionPlus.div>
      </div>
      <div className="inputContainer">
        <div>
          <Input
            value={aspectRatio}
            set={(newValue) => setAspectRatio(newValue)}
            min={0.1}
            max={5}
            step={0.1}
          >
            Aspect ratio
          </Input>
          <Input
            value={width}
            set={(newValue) => setWidth(newValue)}
            min={10}
            max={1000}
            step={5}
          >
            Width
          </Input>
        </div>
      </div>

      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 300px;
          height: 300px;
          gap: 20px;
        }

        .box {
          background-color: #8df0cc;
          position: relative;
          z-index: 1;
        }

        .inputContainer {
          display: flex;
          flex-direction: row;
          gap: 20px;
          background-color: #0b1011;
          padding: 20px 40px;
          border-radius: 10px;
          position: relative;
          z-index: 2;
        }

        #layout-example {
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        #layout-example input {
          accent-color: #8df0cc;
          font-family: "Azeret Mono", monospace;
          font-size: 12px;
        }

        #layout-example label {
          display: flex;
          align-items: center;
          margin: 10px 0;
          font-size: 12px;
        }

        #layout-example label code {
          width: 100px;
        }

        #layout-example input[type="number"] {
          border: 0;
          border-bottom: 1px dotted #8df0cc;
          color: #8df0cc;
          margin-left: 10px;
          background: transparent;
        }

        #layout-example input[type="number"]:focus {
          outline: none;
          border-bottom: 2px solid #8df0cc;
        }

        #layout-example input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }

        input[type='range']::-webkit-slider-runnable-track {
          height: 10px;
          -webkit-appearance: none;
          background: #0b1011;
          border: 1px solid #1d2628;
          border-radius: 10px;
          margin-top: -1px;
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8df0cc;
          top: -4px;
          position: relative;
        }
      `}</style>
    </div>
  )
}

function WavyText() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return

      const { chars } = splitText(
        containerRef.current.querySelector(".wavy")!
      )
      containerRef.current.style.visibility = "visible"

      const staggerDelay = 0.15

      animate(
        chars,
        { y: [-20, 20] },
        {
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 2,
          delay: stagger(
            staggerDelay,
            { startDelay: -staggerDelay * chars.length }
          ),
        }
      )
    })
  }, [])

  return (
    <div className="wavy-container" ref={containerRef}>
      <h1 className="h1">
        That&rsquo;s <span className="wavy">waaaavy</span>.
      </h1>

      <style>{`
        .wavy-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          visibility: hidden;
        }

        .split-char {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  )
}

function PathDrawing() {
    const draw: Variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: (i: number) => {
        const delay = i * 0.5
        return {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
            opacity: { delay, duration: 0.01 },
          },
        }
      },
    }
  
    const imageStyle: React.CSSProperties = {
      maxWidth: "80vw",
    }
  
    const shapeStyle: React.CSSProperties = {
      strokeWidth: 10,
      strokeLinecap: "round",
      fill: "transparent",
    }
  
    return (
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
        style={imageStyle}
      >
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#ff0088"
          variants={draw}
          custom={1}
          style={shapeStyle}
        />
        <motion.line
          x1="220"
          y1="30"
          x2="360"
          y2="170"
          stroke="#8df0cc"
          variants={draw}
          custom={2}
          style={shapeStyle}
        />
        <motion.line
          x1="220"
          y1="170"
          x2="360"
          y2="30"
          stroke="#8df0cc"
          variants={draw}
          custom={2.5}
          style={shapeStyle}
        />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="30"
          rx="20"
          stroke="#0d63f8"
          variants={draw}
          custom={3}
          style={shapeStyle}
        />
        <motion.circle
          cx="100"
          cy="300"
          r="80"
          stroke="#0d63f8"
          variants={draw}
          custom={2}
          style={shapeStyle}
        />
        <motion.line
          x1="220"
          y1="230"
          x2="360"
          y2="370"
          stroke="#ff0088"
          custom={3}
          variants={draw}
          style={shapeStyle}
        />
        <motion.line
          x1="220"
          y1="370"
          x2="360"
          y2="230"
          stroke="#ff0088"
          custom={3.5}
          variants={draw}
          style={shapeStyle}
        />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="230"
          rx="20"
          stroke="#8df0cc"
          custom={4}
          variants={draw}
          style={shapeStyle}
        />
        <motion.circle
          cx="100"
          cy="500"
          r="80"
          stroke="#8df0cc"
          variants={draw}
          custom={3}
          style={shapeStyle}
        />
        <motion.line
          x1="220"
          y1="430"
          x2="360"
          y2="570"
          stroke="#0d63f8"
          variants={draw}
          custom={4}
          style={shapeStyle}
        />
        <motion.line
          x1="220"
          y1="570"
          x2="360"
          y2="430"
          stroke="#0d63f8"
          variants={draw}
          custom={4.5}
          style={shapeStyle}
        />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="430"
          rx="20"
          stroke="#ff0088"
          variants={draw}
          custom={5}
          style={shapeStyle}
        />
      </motion.svg>
    )
  }

interface InputProps {
  children: string
  value: number
  set: (newValue: number) => void
  min?: number
  max?: number
  step?: number
}

function Input({ value, children, set, min = 0, max = 100, step }: InputProps) {
  return (
    <label>
      <code>{children}</code>
      <input
        value={value}
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={(e) => set(parseFloat(e.target.value))}
      />
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => set(parseFloat(e.target.value) || 0)}
      />
    </label>
  )
}

function useDebouncedState<T>(value: T, duration: number = 0.2): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    return delay(() => setDebouncedValue(value), duration)
  }, [value, duration])
  return debouncedValue
}