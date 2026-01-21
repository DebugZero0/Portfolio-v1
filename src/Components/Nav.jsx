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
            { label: 'Projects' },
            { label: 'Contact' },
            { label: 'Quit' }
        ]
    },
    {
        key: 'file',
        label: 'File',
        items: [
            { label: 'New Window', shortcut: 'Ctrl+N' },
            { label: 'New File', shortcut: 'Ctrl+Shift+N' },
            { label: 'Open…', shortcut: 'Ctrl+O' },
            { label: 'Save', shortcut: 'Ctrl+S' },
            { label: 'Close All', shortcut: 'Ctrl+W' }
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
        items: [
            { label: 'New Terminal', shortcut: 'Ctrl+`' },
            { label: 'Run Task', shortcut: 'Ctrl+Shift+B' },
            { label: 'Kill Terminal' }
        ]
    }
]

const Nav = () => {
    const [openMenu, setOpenMenu] = useState(null)
    const navRef = useRef(null)
    const { theme, toggleTheme } = useTheme()

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
        setOpenMenu((current) => (current === key ? null : key))
    }

    const handleMenuItemClick = (label) => {
        if (label === 'Dark Mode') {
            toggleTheme('dark')
            setOpenMenu(null)
        } else if (label === 'Light Mode') {
            toggleTheme('light')
            setOpenMenu(null)
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
                        {openMenu === item.key && (
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
