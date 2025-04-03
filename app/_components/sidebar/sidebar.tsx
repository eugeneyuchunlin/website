'use client'
import Footer from './footer';
import React, { useState, useEffect, useRef } from 'react';


function MenuItem({url, name} : {url: string; name: string}) {
  return (
    <li><a href={url} className="text-center text-lg">{name}</a></li>
  )

}


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      // Check if the screen is small (typical mobile breakpoint)
      if (window.innerWidth < 768) {
        // Check if the sidebar is open and the click is outside the sidebar
        
        if (
          isOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node) && // if you click outside the sidebar
          btnRef.current &&
          !btnRef.current.contains(event.target as Node) // if you click the button, the open/close is handled by the button click.
        ) {
          setIsOpen(false);
        }
      }
    };

    // Add event listener when sidebar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClose);
    }

    // Cleanup listener
    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, [isOpen]);

  return (
    <div className="relative h-full">
      {/* Mobile Menu Toggle */}
      <button 
        ref={btnRef}
        className="md:hidden z-50 fixed top-4 left-2"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>}
      </button>

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full text-black bg-gray-100
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative z-40
        `}
      >
        <div className="p-4 pt-20 flex flex-col items-center">
          <div className="flex flex-col justify-center mb-4">
            <div className="avatar justify-center mb-4">
              <div className="w-32 rounded-full brightness-80">
                <img src="/avatar.jpeg" />
              </div> 
            </div>
            <div className="text-center justify-center">
                <h1 className="text-2xl font-mono mt-2">Eugene Lin</h1>
                <h1 className="text-2xl font-mono mt-2">林友鈞</h1>
            </div>
          </div>
          
          <ul className="menu rounded-box w-56">
            <MenuItem url='/' name='Home' />
            <MenuItem url='/CV' name='CV' />
            <MenuItem url='/Blog' name='Blog' />
            <MenuItem url='/Projects' name='Projects' />
          </ul>
        </div>

        <div className="absolute bottom-20 w-full flex justify-center">
          <Footer />
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {/* {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )} */}
    </div>
  );
}