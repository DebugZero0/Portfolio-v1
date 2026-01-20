import React from 'react'
import MacWindow from './MacWindow'
import Terminal from 'react-console-emulator'
import './cli.scss'

const Cli = ({windowName, windowState, setwindowState, minimized, layout, onLayoutChange, zIndex, onFocus}) => {
    return (
        <MacWindow windowName={windowName} windowState={windowState} setwindowState={setwindowState} minimized={minimized} layout={layout} onLayoutChange={onLayoutChange} zIndex={zIndex} onFocus={onFocus} >
            <div className="cli-window">
                <Terminal
                    commands={{
                        echo: {
                            description: 'Echoes input text',
                            usage: 'echo [text]',
                            fn: function (...args) {
                                return args.join(' ');
                            }
                        },
                        about: {
                            description: 'Information about me',
                            usage: 'about',
                            fn: function () {
                                return 'Hi! I\'m a Full Stack Developer passionate about creating beautiful and functional web applications. Currently exploring React, Node.js, and cloud technologies.';
                            }
                        },
                        projects: {
                            description: 'View my portfolio projects',
                            usage: 'projects',
                            fn: function () {
                                return 'MacOS Portfolio - A React-based portfolio site\nWeather App - Real-time weather updates with API integration\nTask Manager - Full stack application with MongoDB\nGithub Portfolio - Displaying my repositories and projects';
                            }
                        },
                        skills: {
                            description: 'Display my technical skills',
                            usage: 'skills',
                            fn: function () {
                                return 'Frontend: React, JavaScript, HTML, CSS, SCSS, tailwind, Vite\nBackend: Node.js, Express, MongoDB\nTools: Git, VS Code, npm, ESLint\nOther: REST APIs, Responsive Design, UI/UX Principles';
                            }
                        },
                        contact: {
                            description: 'Get contact information',
                            usage: 'contact',
                            fn: function () {
                                return 'Email: ankannew2024@gmail.com\nGithub: https://github.com/DebugZero0\nLinkedIn: https://www.linkedin.com/in/ankan-nandi-57417a31a/\nTwitter: https://x.com/ankan_nandi2024';
                            }
                        },
                        whoami: {
                            description: 'Shows current user',
                            usage: 'whoami',
                            fn: function () {
                                return 'Ankan Nandi';
                            }
                        },
                        date: {
                            description: 'Show current date and time',
                            usage: 'date',
                            fn: function () {
                                return new Date().toString();
                            }
                        },
                        pwd: {
                            description: 'Print working directory',
                            usage: 'pwd',
                            fn: function () {
                                return '/Users/ankan/portfolio';
                            }
                        }
                    }}
                    welcomeMessage={`Welcome to the Mac OS Terminal Emulator!

Available Commands:
  about      - Information about me
  projects   - View my portfolio projects
  skills     - Display my technical skills
  contact    - Get contact information
  whoami     - Shows current user
  date       - Show current date and time
  pwd        - Print working directory
  echo       - Echoes input text
  help       - Show this help message

Type a command to get started!`}
                    promptLabel={'ankan@macos:~$'}
                    promptLabelStyle={{
                        color: '#00ff00',
                        fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                        fontSize: '14px'
                    }}
                    style={{ height: '100%' }}
                />
            </div>
        </MacWindow>
    )
}

export default Cli
