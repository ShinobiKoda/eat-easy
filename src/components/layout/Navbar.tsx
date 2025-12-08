import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Backdrop from './Backdrop'

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