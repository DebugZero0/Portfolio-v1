import React from 'react'
import MacWindow from './MacWindow'
import './info.scss'

const About = ({
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
                    <h1>About This Project</h1>
                    <p className="info-subtitle">A macOS-inspired personal portfolio built with React and Vite.</p>
                </div>
                <p>
                    This experience recreates a familiar desktop feel in the browser with draggable windows,
                    theme switching, and quick-launch dock actions. Each window highlights a different part of my work,
                    from code to music to a live terminal emulator.
                </p>
                <div className="info-grid">
                    <div>
                        <h2>What&apos;s inside</h2>
                        <ul className="info-list">
                            <li>React + Vite single-page app</li>
                            <li>Custom window manager built on react-rnd</li>
                            <li>Light/Dark theme toggles via context</li>
                            <li>Terminal emulator with portfolio commands</li>
                        </ul>
                    </div>
                    <div>
                        <h2>Why I built it</h2>
                        <ul className="info-list">
                            <li>Showcase UI polish with desktop metaphors</li>
                            <li>Demonstrate stateful window orchestration</li>
                            <li>Offer an interactive way to explore my work</li>
                        </ul>
                    </div>
                </div>
                <p className="info-footer">Feel free to explore the dock, run commands in the terminal, or switch themes.</p>
            </div>
        </MacWindow>
    )
}

export default About
