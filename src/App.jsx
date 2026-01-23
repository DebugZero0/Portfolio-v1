import { useState, useEffect } from 'react'
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
import NewFile from './Components/windows/NewFile.jsx'
import OpenFolder from './Components/windows/OpenFolder.jsx'
import TextEditor from './Components/windows/TextEditor.jsx'
import CreatedFiles from './Components/CreatedFiles.jsx'
import MobileWarning from './Components/MobileWarning.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'


function App() {

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })

  const [windowState, setwindowState] = useState(
    {
      github: { open: false, minimized: false },
      note: { open: false, minimized: false },
      resume: { open: false, minimized: false },
      spotify: { open: false, minimized: false },
      cli: { open: false, minimized: false },
      about: { open: false, minimized: false },
      contact: { open: false, minimized: false },
      newFile: { open: false, minimized: false },
      openFolder: { open: false, minimized: false },
    }
  )

  const [windowLayouts, setWindowLayouts] = useState({})
  const [createdFiles, setCreatedFiles] = useState(() => {
    try {
      const saved = localStorage.getItem('createdFiles')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Failed to load files from localStorage:', error)
      return []
    }
  })

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

  useEffect(() => {
    try {
      localStorage.setItem('createdFiles', JSON.stringify(createdFiles))
    } catch (error) {
      console.error('Failed to save files to localStorage:', error)
    }
  }, [createdFiles])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  const handleCreateFile = (name) => {
    const trimmed = name.trim()
    if (!trimmed) return false
    if (createdFiles.length >= 5) return false

    const baseX = 14
    const baseY = 60
    const spacingY = 88
    const nextIndex = createdFiles.length

    setCreatedFiles((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: trimmed,
        x: baseX,
        y: baseY + nextIndex * spacingY,
        text: '',
      },
    ])
    setwindowState((prev) => ({
      ...prev,
      newFile: { open: false, minimized: false },
    }))
    return true
  }

  const handleMoveFile = (id, x, y) => {
    setCreatedFiles((prev) => prev.map((file) => (file.id === id ? { ...file, x, y } : file)))
  }

  const handleOpenFile = (fileId) => {
    const windowName = `file_${fileId}`
    openWindowCentered(windowName, { width: 600, height: 450 })
  }

  const handleUpdateFileText = (fileId, text) => {
    setCreatedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, text } : file)))
  }

  const handleDeleteFile = (fileId) => {
    // Close the associated window if open
    const windowName = `file_${fileId}`
    setwindowState((prev) => ({
      ...prev,
      [windowName]: { open: false, minimized: false },
    }))
    
    // Remove file from state (localStorage will auto-update via useEffect)
    setCreatedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleSearchAndOpenFile = (folderName) => {
    const foundFile = createdFiles.find((file) => file.name.toLowerCase() === folderName.toLowerCase())
    
    if (foundFile) {
      handleOpenFile(foundFile.id)
      // Close the search dialog
      setwindowState((prev) => ({
        ...prev,
        openFolder: { open: false, minimized: false },
      }))
      return { success: true }
    }
    
    return { success: false, message: 'No folder found' }
  }

  const handleCloseAllFiles = () => {
    // Close all file text editor windows
    setwindowState((prev) => {
      const updates = {}
      createdFiles.forEach((file) => {
        const windowName = `file_${file.id}`
        updates[windowName] = { open: false, minimized: false }
      })
      return { ...prev, ...updates }
    })
  }

  return (
    <ThemeProvider>
      {isMobile ? (
        <MobileWarning />
      ) : (
       <main>
        <Nav
          windowState={windowState}
          setwindowState={setwindowState}
          openWindowCentered={openWindowCentered}
          onSearchAndOpenFile={handleSearchAndOpenFile}
          onCloseAllFiles={handleCloseAllFiles}
        />
        <CreatedFiles files={createdFiles} onMove={handleMoveFile} onOpen={handleOpenFile} onDelete={handleDeleteFile} />
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
        {windowState.newFile?.open && (
          <NewFile
            windowName="newFile"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.newFile?.minimized}
            layout={windowLayouts.newFile}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.newFile ?? 101}
            onFocus={bringToFront}
            onCreate={handleCreateFile}
            canCreateMore={createdFiles.length < 5}
          />
        )}
        {windowState.openFolder?.open && (
          <OpenFolder
            windowName="openFolder"
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={windowState.openFolder?.minimized}
            layout={windowLayouts.openFolder}
            onLayoutChange={handleLayoutChange}
            zIndex={zIndexMap.openFolder ?? 101}
            onFocus={bringToFront}
            onSearch={handleSearchAndOpenFile}
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
        {createdFiles.map((file) => {
          const windowName = `file_${file.id}`
          if (!windowState[windowName]?.open) return null
          return (
            <TextEditor
              key={file.id}
              windowName={windowName}
              fileName={file.name}
              fileId={file.id}
              text={file.text}
              onTextChange={handleUpdateFileText}
              windowState={windowState}
              setwindowState={setwindowState}
              minimized={windowState[windowName]?.minimized}
              layout={windowLayouts[windowName]}
              onLayoutChange={handleLayoutChange}
              zIndex={zIndexMap[windowName] ?? 101}
              onFocus={bringToFront}
            />
          )
        })}
        <Doc windowState={windowState} setwindowState={setwindowState} />
        </main>
      )}
    </ThemeProvider>
  )
}

export default App
