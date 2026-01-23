import React, { useState, useEffect, useCallback } from 'react'
import './created-files.scss'

const CreatedFiles = ({ files, onMove, onOpen, onDelete }) => {
    const [dragging, setDragging] = useState(null)
    const [clickTimer, setClickTimer] = useState(null)
    const [contextMenu, setContextMenu] = useState(null)

    const stopDragging = useCallback(() => {
        setDragging(null)
    }, [])

    const handleFileClick = useCallback((fileId) => {
        if (clickTimer) {
            // Double click detected
            clearTimeout(clickTimer)
            setClickTimer(null)
            onOpen?.(fileId)
        } else {
            // Start single click timer
            const timer = setTimeout(() => {
                setClickTimer(null)
            }, 300)
            setClickTimer(timer)
        }
    }, [clickTimer, onOpen])

    useEffect(() => {
        if (!dragging) return undefined

        const handleMove = (e) => {
            e.preventDefault()
            const nextX = e.clientX - dragging.offsetX
            const nextY = e.clientY - dragging.offsetY
            onMove?.(dragging.id, nextX, nextY)
        }

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', stopDragging)
        window.addEventListener('mouseleave', stopDragging)

        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseup', stopDragging)
            window.removeEventListener('mouseleave', stopDragging)
        }
    }, [dragging, onMove, stopDragging])

    useEffect(() => {
        const handleClick = () => setContextMenu(null)
        const handleEscape = (e) => {
            if (e.key === 'Escape') setContextMenu(null)
        }
        
        if (contextMenu) {
            window.addEventListener('click', handleClick)
            window.addEventListener('keydown', handleEscape)
            return () => {
                window.removeEventListener('click', handleClick)
                window.removeEventListener('keydown', handleEscape)
            }
        }
    }, [contextMenu])

    if (!files?.length) return null

    return (
        <div className="created-files" aria-label="Created files">
            {files.slice(0, 5).map((file) => (
                <div
                    className="created-file"
                    key={file.id}
                    style={{ transform: `translate(${file.x}px, ${file.y}px)` }}
                    onMouseDown={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setDragging({
                            id: file.id,
                            offsetX: e.clientX - rect.left,
                            offsetY: e.clientY - rect.top,
                        })
                    }}
                    onClick={() => handleFileClick(file.id)}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        setContextMenu({
                            fileId: file.id,
                            x: e.clientX,
                            y: e.clientY,
                        })
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <img src="/folder.svg" alt="Folder" draggable="false" />
                    <span>{file.name}</span>
                </div>
            ))}
            {contextMenu && (
                <div
                    className="file-context-menu"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => {
                            onDelete?.(contextMenu.fileId)
                            setContextMenu(null)
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default CreatedFiles
