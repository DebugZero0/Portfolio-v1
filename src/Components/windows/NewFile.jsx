import React, { useState, useEffect } from 'react'
import MacWindow from './MacWindow'
import './newfile.scss'

const NewFile = ({
    windowName,
    windowState,
    setwindowState,
    minimized,
    layout,
    onLayoutChange,
    zIndex,
    onFocus,
    onCreate,
    canCreateMore,
}) => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setError(canCreateMore ? '' : 'File limit reached (max 5).')
    }, [canCreateMore])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!canCreateMore) return
        const success = onCreate?.(name)
        if (success) {
            setName('')
        } else {
            setError('Enter a file name to continue.')
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
            <div className="newfile-window">
                <h2>Create New File</h2>
                <p className="hint">Enter a name and press Enter or OK. Max 5 files.</p>
                <form onSubmit={handleSubmit} className="newfile-form">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setError('')
                        }}
                        placeholder="Untitled"
                        aria-label="File name"
                        disabled={!canCreateMore}
                    />
                    <button type="submit" disabled={!canCreateMore}>OK</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </MacWindow>
    )
}

export default NewFile
