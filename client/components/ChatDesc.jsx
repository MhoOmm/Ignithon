import React, { useRef, useEffect, useState } from 'react'
import DashboardChat from './DashboardChat'
import { gsap } from 'gsap'

const ChatDesc = () => {
  const containerRef = useRef(null)
  const circleRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const circle = circleRef.current

    // Mouse move -> position circle
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(circle, {
        x: x - circle.offsetWidth / 2,
        y: y - circle.offsetHeight / 2,
        duration: 0.25,
        ease: 'power2.out'
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Hover animation
  useEffect(() => {
    const circle = circleRef.current
    if (isHovering) {
      gsap.to(circle, {
        scale: 6,
        backgroundColor: '#6366F1', // indigo-ish
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(circle, {
        scale: 1,
        backgroundColor: 'rgba(255,255,255,0.1)', // light translucent
        duration: 0.4,
        ease: 'power2.inOut'
      })
    }
  }, [isHovering])

  return (
    <div className="flex justify-between items-center gap-8 p-6 relative ">
      {/* Left Side */}
      <div className="w-1/2 hover:drop-shadow-[0_6px_8px_#6366F1]">
        <DashboardChat />
      </div>

      {/* Right Side with cursor effect */}
      <div
        ref={containerRef}
        className="w-1/2 text-white bg-black text-lg leading-relaxed relative overflow-hidden rounded-3xl p-4 hover:drop-shadow-[0_4px_6px_#6366F1]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Circle follower */}
        <div
          ref={circleRef}
          className="absolute w-6 h-6 rounded-full pointer-events-none mix-blend-screen"
          style={{ top: 0, left: 0, backgroundColor: 'rgba(255,255,255,0.1)' }}
        />

        <p className='font-semibold'>
          I am your AI mental health assistant, here to provide empathetic
          guidance and support. You may share your thoughts, concerns, or
          experiences, and I will offer helpful advice, coping strategies,
          and encouragement.
        </p>
        <br />
        <p className='font-semibold'>
          Please note, I am not a substitute for professional therapy or
          medical care. For serious or urgent concerns, we strongly
          recommend consulting a licensed mental health professional.
        </p>
        <br />
        <p className='font-semibold'>
          Feel free to begin the conversation — I am here to assist you.
        </p>
      </div>
    </div>
  )
}

export default ChatDesc
