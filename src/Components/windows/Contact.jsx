import React from 'react'
import MacWindow from './MacWindow'
import './info.scss'

const Contact = ({
    windowName,
    windowState,
    setwindowState,
    minimized,
    layout,
    onLayoutChange,
    zIndex,
    onFocus,
}) => {
    return (
        <MacWindow
            windowName={windowName}
            windowState={windowState}
            setwindowState={setwindowState}
            minimized={minimized}
            layout={layout}
            onLayoutChange={onLayoutChange}
            zIndex={zIndex}
            onFocus={onFocus}
        >
            <div className="info-window">
                <div className="info-header">
                    <h1>Contact</h1>
                    <p className="info-subtitle">Let&apos;s collaborate or chat about your project.</p>
                </div>
                <div className="info-grid">
                    <div>
                        <h2>Direct</h2>
                        <ul className="info-list">
                            <li>Email: <a href="mailto:ankannew2024@gmail.com">ankannew2024@gmail.com</a></li>
                            <li>Phone: <a href="tel:+919007321338">+91 9007321338</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2>Profiles</h2>
                        <ul className="info-list">
                            <li><a href="https://github.com/DebugZero0" target="_blank" rel="noreferrer">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/ankan-nandi-57417a31a/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                            <li><a href="https://x.com/ankan_nandi2024" target="_blank" rel="noreferrer">X (Twitter)</a></li>
                            <li><a href="https://leetcode.com/u/Ankan_elite/" target="_blank" rel="noreferrer">Leetcode</a></li>
                        </ul>
                    </div>
                </div>
                <p className="info-footer">Reach out for freelance work, collaborations, or just to say hi.</p>
            </div>
        </MacWindow>
    )
}

export default Contact
