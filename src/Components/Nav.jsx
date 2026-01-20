import React from 'react'
import '../nav.scss'
import DateTime from './DateTime'

const Nav = () => {
  return (
    <nav>
        <div className="left">
            <div className="apple-icon">
                <img src="./nav-logo/apple.png" alt="" />
            </div>
            <div className="nav-item">
                <p>Home</p>
            </div>
            <div className="nav-item">
                <p>File</p>
            </div>
            <div className="nav-item">
                <p>window</p>
            </div>
            <div className="nav-item">
                <p>Terminal</p>
            </div>
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
