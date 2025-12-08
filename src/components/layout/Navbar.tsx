import Header from './Header'
import Sidebar from './Sidebar'
import Backdrop from './Backdrop'
import React, { useEffect, useState } from 'react'

interface NavbarProps {
  toggle: boolean
  menuOpen: number | null
  setMenuOpen: (id: number | null) => void
  toggleNav: () => void
  closeNav: () => void
  title: string
  text: string
  text1: string
  link: string
  showBack?: boolean
  showHeader?: boolean
  showAside?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ toggle, menuOpen, setMenuOpen, toggleNav, closeNav, title, text, text1, link, showBack, showHeader, showAside }) => {
  
  const handleSetMenuOpen = (id: number | null) => {
    setMenuOpen(id)
    if (id !== null && !toggle) {
      toggleNav()
    }
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && toggle) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [toggle]);

  return (
    <header className="w-full bg-[#F7F7F7]">
      
      <Header onToggle={toggleNav} toggle={toggle} title={title} text={text} text1={text1} link={link} showBack={showBack} />

      {showAside && (
        <Sidebar toggle={toggle} menuOpen={menuOpen} setMenuOpen={handleSetMenuOpen} onClose={closeNav} onToggle={toggleNav} />
      )}

      {toggle && (
        <Backdrop onClick={closeNav} />
      )}
    </header>
  )
}

export default Navbar