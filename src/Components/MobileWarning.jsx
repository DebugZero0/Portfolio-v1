import React, { useEffect, useRef } from 'react'
import './mobile-warning.scss'

const MobileWarning = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            drawGrid()
        }

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
            ctx.lineWidth = 0.5

            const gridSize = 30

            // Draw vertical lines
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, canvas.height)
                ctx.stroke()
            }

            // Draw horizontal lines
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(canvas.width, y)
                ctx.stroke()
            }
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <div className="mobile-warning">
            <canvas ref={canvasRef} className="grid-canvas" />
            <div className="warning-content">
                <div className="message-box">
                    <div className="blink-caret"></div>
                    <h1>Designed for desktop screens</h1>
                    <p className="main-message">
                        This portfolio is optimized for desktop viewing.
                    </p>
                    <p className="sub-message">
                        Please visit this site on a laptop or desktop computer for the best experience.
                    </p>
                    <div className="switch-message">
                        Please switch to a larger display
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileWarning
