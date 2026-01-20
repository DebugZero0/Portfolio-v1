import React from 'react'
import '../doc.scss'


const Doc = ({ windowState, setwindowState }) => {

  const toggleWindow = (key) => {
    setwindowState((prev) => {
      const current = prev[key] || { open: false, minimized: false }

      // If closed, open it. If minimized, restore it. If open, minimize it.
      if (!current.open) {
        return { ...prev, [key]: { open: true, minimized: false } }
      }

      if (current.minimized) {
        return { ...prev, [key]: { ...current, minimized: false } }
      }

      return { ...prev, [key]: { ...current, minimized: true } }
    })
  }
  return (
    <footer className="dock">
        <div onClick={()=> toggleWindow('github')}
        className={`icon github ${windowState.github?.minimized ? 'minimized' : ''}`}>
          <img src="./doc-icon/github.png" alt="GitHub" />
        </div>

        <div onClick={() => window.open('https://www.linkedin.com/in/ankan-nandi-57417a31a/', '_blank')} 
        className="icon link"><img src="./doc-icon/link.png" alt="Link" /></div>

        <div onClick={()=> toggleWindow('resume')} 
        className={`icon pdf ${windowState.resume?.minimized ? 'minimized' : ''}`}>
          <img src="./doc-icon/pdf.png" alt="PDF" />
        </div>

        <div onClick={()=>window.open("mailto:ankannew2024@gmail.com", "_blank")}
        className="icon mail"><img src="./doc-icon/mail.png" alt="Mail" /></div>

        <div onClick={()=> toggleWindow('cli')}
         className={`icon terminal ${windowState.cli?.minimized ? 'minimized' : ''}`}>
           <img src="./doc-icon/terminal.png" alt="Terminal" />
         </div>

        <div onClick={()=> toggleWindow('spotify')}
        className={`icon spotify ${windowState.spotify?.minimized ? 'minimized' : ''}`}>
          <img src="./doc-icon/spotify.png" alt="Spotify" />
        </div>

        <div onClick={()=> toggleWindow('note')}
        className={`icon notes ${windowState.note?.minimized ? 'minimized' : ''}`}>
          <img src="./doc-icon/notes.png" alt="Notes" />
        </div>

        <div onClick={()=>window.open('https://calendar.google.com/calendar/u/0/r', '_blank')}
         className="icon calendar"><img src="./doc-icon/calendar.png" alt="Calendar" /></div>

    </footer>
  )
}

export default Doc
