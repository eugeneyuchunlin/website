'use client';

import { useState, useEffect } from 'react';

export default function BubbleAnimation() {
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  // Function to generate random bubble sizes and animation delays
  const generateBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < 3; i++) {
      const size = Math.random() * 500 + 20; // random size between 20 and 70
      const delay = Math.random() * 3; // random delay between 0 and 3 seconds
      const xOffset = Math.random() * 500; // random x offset
      const yOffset = Math.random() * 500; // random y offset
      const bubble = {
        size,
        delay,
        xOffset,
        yOffset,
      };
      bubbles.push(bubble);
    }
    return bubbles;
  };

  const bubbles = generateBubbles();

  return (
    <div
      className="relative w-full h-screen bg-gray-100 bg-im"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #e0f7fa, #f8bbd0)',
        overflow: 'hidden',
      }}
    >
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            backgroundColor: index % 2 === 0 ? 'lightblue' : 'lightpink',
            top: bubble.yOffset - bubble.size / 2 + 'px',
            left:  bubble.xOffset - bubble.size / 2 + 'px',
            animation: `moveBubble ${10 + bubble.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Add the CSS animations */}
      <style jsx>{`
        @keyframes moveBubble {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          50% {
            transform: translate(20px, 20px);
            opacity: 0.7;
          }
          100% {
            transform: translate(0, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}