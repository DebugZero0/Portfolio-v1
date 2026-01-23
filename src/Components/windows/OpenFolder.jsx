import React, { useState } from 'react'
import MacWindow from './MacWindow'
import './openfolder.scss'

const OpenFolder = ({
    windowName,
    windowState,
    setwindowState,
    minimized,
    layout,
    onLayoutChange,
    zIndex,
    onFocus,
    onSearch,
}) => {
    const [folderName, setFolderName] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!folderName.trim()) {
            setError('Please enter a folder name')
            return
        }

        const result = onSearch?.(folderName.trim())
        
        if (result?.success) {
            setFolderName('')
            setError('')
        } else {
            setError(result?.message || 'No folder found')
        }
    }

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
            <div className="openfolder-window">
                <h2>Open Folder</h2>
                <p className="hint">Enter the name of the folder you want to open</p>
                <form onSubmit={handleSubmit} className="openfolder-form">
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => {
                            setFolderName(e.target.value)
                            setError('')
                        }}
                        placeholder="Folder name..."
                        aria-label="Folder name"
                        autoFocus
                    />
                    <button type="submit">Open</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </MacWindow>
    )
}

export default OpenFolder
