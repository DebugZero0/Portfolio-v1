import React from 'react'
import MacWindow from './MacWindow'
import './spotify.scss'

const Spotify = ({windowName, windowState, setwindowState, minimized, layout, onLayoutChange, zIndex, onFocus}) => {
  return (
    <MacWindow width='25vw' windowName={windowName} windowState={windowState} setwindowState={setwindowState} minimized={minimized} layout={layout} onLayoutChange={onLayoutChange} zIndex={zIndex} onFocus={onFocus}>
        <div className="spotify-window">
            <iframe data-testid="embed-iframe" style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbVhgADFy3im?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    </MacWindow>
  )
}

export default Spotify
