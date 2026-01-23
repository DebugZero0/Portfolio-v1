import React, { useEffect, useRef, useState } from 'react'
import '../nav.scss'
import DateTime from './DateTime'
import { useTheme } from '../context/ThemeContext'

const menuConfig = [
    {
        key: 'home',
        label: 'Home',
        items: [
            { label: 'About' },
            { label: 'Contact' },
            { label: 'Quit' }
        ]
    },
    {
        key: 'file',
        label: 'File',
        items: [
            { label: 'New File'},
            { label: 'Open…'},
            { label: 'Close All'}
        ]
    },
    {
        key: 'view',
        label: 'View',
        items: [
            { label: 'Dark Mode'},
            { label: 'Light Mode'}
        ]
    },
    {
        key: 'terminal',
        label: 'Terminal',
        items: []
    }
]

const Nav = ({ windowState, setwindowState, openWindowCentered, onSearchAndOpenFile, onCloseAllFiles }) => {
    const [openMenu, setOpenMenu] = useState(null)
    const navRef = useRef(null)
    const { toggleTheme } = useTheme()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenMenu(null)
            }
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpenMenu(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [])

    const handleToggle = (key) => {
        if (key === 'terminal') {
            // Toggle terminal window
            setwindowState((prev) => {
                const current = prev.cli || { open: false, minimized: false }
                if (!current.open) {
                    return { ...prev, cli: { open: true, minimized: false } }
                }
                if (current.minimized) {
                    return { ...prev, cli: { ...current, minimized: false } }
                }
                return { ...prev, cli: { ...current, minimized: true } }
            })
        } else {
            setOpenMenu((current) => (current === key ? null : key))
        }
    }

    const handleMenuItemClick = (label) => {
        if (label === 'Dark Mode') {
            toggleTheme('dark')
            setOpenMenu(null)
            return
        }

        if (label === 'Light Mode') {
            toggleTheme('light')
            setOpenMenu(null)
            return
        }

        if (label === 'New File') {
            openWindowCentered?.('newFile', { width: 420, height: 220 })
            setOpenMenu(null)
            return
        }

        if (label === 'Open…') {
            openWindowCentered?.('openFolder', { width: 420, height: 240 })
            setOpenMenu(null)
            return
        }

        if (label === 'Close All') {
            onCloseAllFiles?.()
            setOpenMenu(null)
            return
        }

        if (label === 'About') {
            openWindowCentered?.('about', { width: 520, height: 360 })
            setOpenMenu(null)
            return
        }

        if (label === 'Contact') {
            openWindowCentered?.('contact', { width: 480, height: 320 })
            setOpenMenu(null)
            return
        }

        if (label === 'Quit') {
            setOpenMenu(null)
            if (typeof window !== 'undefined') {
                window.close()
                setTimeout(() => {
                    window.location.href = 'about:blank'
                }, 150)
            }
        }
    }

    return (
        <nav ref={navRef}>
            <div className="left">
                <div className="apple-icon nav-item-wrapper">
                    <img src="./nav-logo/apple.png" alt="" />
                </div>
                {menuConfig.map((item) => (
                    <div className="nav-item-wrapper" key={item.key}>
                        <button
                            type="button"
                            className={`nav-item ${openMenu === item.key ? 'active' : ''}`}
                            onClick={() => handleToggle(item.key)}
                            aria-expanded={openMenu === item.key}
                            aria-haspopup="true"
                        >
                            <p>{item.label}</p>
                        </button>
                        {openMenu === item.key && item.items.length > 0 && (
                            <div className="nav-menu" role="menu">
                                {item.items.map((menuItem) => (
                                    <button
                                        type="button"
                                        className="nav-menu-item"
                                        key={menuItem.label}
                                        role="menuitem"
                                        onClick={() => handleMenuItemClick(menuItem.label)}
                                    >
                                        <span>{menuItem.label}</span>
                                        {menuItem.shortcut && (
                                            <span className="shortcut">{menuItem.shortcut}</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="right">
                <div className="nav-icon">
                    <img src="./nav-logo/wifi.png" alt="" />
                </div>
                <div className="nav-item">
                    <p><DateTime /></p>
                </div>
            </div>
        </nav>
    )
}

export default Nav
