import React from 'react'
import { Rnd } from 'react-rnd'
import '../window.scss'

const MacWindow = ({
    children,
    width = "70vw",
    height = "70vh",
    windowName,
    windowState,
    setwindowState,
    minimized,
    layout,
    onLayoutChange,
    zIndex = 1,
    onFocus,
}) => {
    const [isMaximized, setIsMaximized] = React.useState(false)
    const [restoreLayout, setRestoreLayout] = React.useState(null)
    const [animationClass, setAnimationClass] = React.useState('')

    const baseLayout = React.useMemo(
        () => layout ?? { x: 2, y: 40, width, height },
        [layout, width, height]
    )

    const currentSize = isMaximized
        ? { width: '100vw', height: '100vh' }
        : { width: baseLayout.width ?? width, height: baseLayout.height ?? height }

    const currentPosition = isMaximized
        ? { x: 0, y: 0 }
        : { x: baseLayout.x ?? 2, y: baseLayout.y ?? 40 }

    const handleDragStop = (_, data) => { 
        if (isMaximized) return
        onLayoutChange?.(windowName, { ...baseLayout, x: data.x, y: data.y })
    }

    const handleResizeStop = (_, __, ref, ___, position) => {
        if (isMaximized) return
        const newWidth = parseFloat(ref.style.width)
        const newHeight = parseFloat(ref.style.height)

        onLayoutChange?.(windowName, {
            x: position.x,
            y: position.y,
            width: Number.isNaN(newWidth) ? baseLayout.width : newWidth,
            height: Number.isNaN(newHeight) ? baseLayout.height : newHeight,
        })
    }

    const toggleMaximize = () => {
        if (!isMaximized) {
            setRestoreLayout({
                x: currentPosition.x,
                y: currentPosition.y,
                width: currentSize.width,
                height: currentSize.height,
            })
            setAnimationClass('maximizing')
            setIsMaximized(true)
            setTimeout(() => setAnimationClass(''), 300)
            return
        }

        setAnimationClass('maximizing')
        setIsMaximized(false)
        if (restoreLayout) {
            onLayoutChange?.(windowName, restoreLayout)
        }
        setTimeout(() => setAnimationClass(''), 300)
    }

    React.useEffect(() => {
        // Bring newly opened window to front
        onFocus?.(windowName)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const rndStyle = minimized ? { display: 'none', zIndex } : { zIndex }

    return (
        <Rnd
            size={currentSize}
            position={currentPosition}
                minWidth={400}
                minHeight={300}
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            onDragStart={() => onFocus?.(windowName)}
            onResizeStart={() => onFocus?.(windowName)}
            dragHandleClassName="drag-handle"
            style={rndStyle}
            onMouseDown={() => onFocus?.(windowName)}
        >
            <div className={`window ${animationClass}`}>
                <div className="nav drag-handle">
                    <div className="dots">
                        <div onClick={()=>setwindowState(state=>({...state,[windowName]:{ open:false, minimized:false }}))} 
                        className="dot red"></div>
                        <div onClick={()=>{
                            setAnimationClass('minimizing')
                            setTimeout(() => {
                                setwindowState(state=>({...state,[windowName]:{ ...(state[windowName]||{}), minimized:true, open:true }}))
                                setAnimationClass('')
                            }, 300)
                        }} className="dot yellow"></div>
                        <div onClick={toggleMaximize} className="dot green"></div>
                    </div>
                    <div className="title-bar">ankannandi -zsh </div>
                </div>
                <div className="main-content">
                    {children}
                </div>

            </div>
        </Rnd>
    )
}

export default MacWindow
