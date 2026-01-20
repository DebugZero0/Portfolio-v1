import React from 'react'
import MacWindow from './MacWindow'
import githubData from '../../assets/github.json'
import './github.scss'

const GitCard=({data={id:"", title:"", description:"", repoLink:"",demoLink:"",tags:[]}})=>{
    return(
        <div className="card" key={data.id}>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <div className="links">
                <a href={data.repoLink} target="_blank" rel="noopener noreferrer"><i class="ri-github-fill"></i>Repository</a>
                {data.demoLink && <a href={data.demoLink} target="_blank" rel="noopener noreferrer"><i class="ri-links-fill"></i>Live Demo</a>}
            </div>
            <div className="tags">
                {data.tags.map((tag, index) => (
                    <span className="tag" key={index}>{tag}</span>
                ))}
            </div>
        </div>
    )
}
 

const Github = ({windowName, windowState, setwindowState, minimized, layout, onLayoutChange, zIndex, onFocus}) => {
  return (
                <MacWindow windowName={windowName} windowState={windowState} setwindowState={setwindowState} minimized={minimized} layout={layout} onLayoutChange={onLayoutChange} zIndex={zIndex} onFocus={onFocus}>
        <div className="cards">
        {githubData.map((project) => (
            <GitCard key={project.id} data={project} />
        ))}
        </div>

    </MacWindow>
  )
}

export default Github
