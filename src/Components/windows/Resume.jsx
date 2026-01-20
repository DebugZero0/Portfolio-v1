import React from 'react'
import MacWindow from './MacWindow'
import './resume.scss'

const Resume = ({windowName, windowState, setwindowState, minimized, layout, onLayoutChange, zIndex, onFocus}) => {
    return (
        <MacWindow windowName={windowName} windowState={windowState} setwindowState={setwindowState} minimized={minimized} layout={layout} onLayoutChange={onLayoutChange} zIndex={zIndex} onFocus={onFocus}>
            <div className="resume-window">
                <embed src="./Developer.pdf" frameborder="0"></embed>
            </div>
        </MacWindow>
    )
}

export default Resume
