import React from 'react'
import MacWindow from './MacWindow'
import './texteditor.scss'

const TextEditor = ({
    windowName,
    fileName,
    fileId,
    text,
    onTextChange,
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
            <div className="texteditor-window">
                <div className="texteditor-header">
                    <h3>{fileName}</h3>
                </div>
                <textarea
                    className="texteditor-content"
                    value={text}
                    onChange={(e) => onTextChange?.(fileId, e.target.value)}
                    placeholder="Start typing..."
                    spellCheck="false"
                />
            </div>
        </MacWindow>
    )
}

export default TextEditor
