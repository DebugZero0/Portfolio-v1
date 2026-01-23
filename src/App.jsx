import { useState } from 'react'
import './app.scss'
import Doc from './Components/Doc.jsx'
import Nav from './Components/Nav.jsx'
import Github from './Components/windows/Github.jsx'
import Note from './Components/windows/Note.jsx'
import Resume from './Components/windows/Resume.jsx'
import Spotify from './Components/windows/Spotify.jsx'
import Cli from './Components/windows/Cli.jsx'
import About from './Components/windows/About.jsx'
import Contact from './Components/windows/Contact.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'


function App() {

  const [windowState, setwindowState] = useState(
    {
      github: { open: false, minimized: false },
      note: { open: false, minimized: false },
      resume: { open: false, minimized: false },
      spotify: { open: false, minimized: false },
      cli: { open: false, minimized: false },
      about: { open: false, minimized: false },
      contact: { open: false, minimized: false },
    }
  )

  const [windowLayouts, setWindowLayouts] = useState({})

  // z-index management: last interacted window should be on top
  const [zIndexMap, setZIndexMap] = useState({})
  const [zCounter, setZCounter] = useState(100) // start above typical base layers

  const bringToFront = (name) => {
    setZCounter((prev) => {
      const next = prev + 1
      setZIndexMap((map) => ({ ...map, [name]: next }))
      return next
    })
  }

  const handleLayoutChange = (name, layout) => {
    setWindowLayouts((prev) => ({
      ...prev,
      [name]: layout,
    }))
  }

  const openWindowCentered = (name, size = { width: 520, height: 360 }) => {
    if (typeof window !== 'undefined') {
      const x = Math.max(0, (window.innerWidth - size.width) / 2)
      const y = Math.max(24, (window.innerHeight - size.height) / 2)
      setWindowLayouts((prev) => (
        prev[name]
          ? prev
          : {
              ...prev,
              [name]: {
                x,
                y,
                width: size.width,
                height: size.height,
              },
            }
      ))
    }

    setwindowState((prev) => ({
      ...prev,
      [name]: { open: true, minimized: false },
    }))

    bringToFront(name)
  }

  return (
    <ThemeProvider>
       <main>
        <Nav
          windowState={windowState}
          setwindowState={setwindowState}
          openWindowCentered={openWindowCentered}
        />
      {windowState.github?.open && (
          <Github
            windowName="github"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.github?.minimized}
            layout={windowLayouts.github}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.github ?? 101}
            onFocus={bringToFront}
          />
        )}
        {windowState.note?.open && (
          <Note
            windowName="note"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.note?.minimized}
            layout={windowLayouts.note}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.note ?? 101}
            onFocus={bringToFront}
          />
        )}
        {windowState.resume?.open && (
          <Resume
            windowName="resume"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.resume?.minimized}
            layout={windowLayouts.resume}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.resume ?? 101}
            onFocus={bringToFront}
          />
        )}
        {windowState.spotify?.open && (
          <Spotify
            windowName="spotify"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.spotify?.minimized}
            layout={windowLayouts.spotify}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.spotify ?? 101}
            onFocus={bringToFront}
          />
        )}
        {windowState.about?.open && (
          <About
            windowName="about"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.about?.minimized}
            layout={windowLayouts.about}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.about ?? 101}
            onFocus={bringToFront}
          />
        )}
        {windowState.contact?.open && (
          <Contact
            windowName="contact"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.contact?.minimized}
            layout={windowLayouts.contact}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.contact ?? 101}
            onFocus={bringToFront}
          />
        )}
        {windowState.cli?.open && (
          <Cli
            windowName="cli"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.cli?.minimized}
            layout={windowLayouts.cli}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.cli ?? 101}
            onFocus={bringToFront}
          />
        )} 
        <Doc windowState={windowState} setwindowState={setwindowState} />
        </main>
    </ThemeProvider>
  )
}

export default App
