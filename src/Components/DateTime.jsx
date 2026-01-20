import React, { useState, useEffect } from 'react'

const DateTime = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
      
      const dayName = days[now.getDay()]
      const monthName = months[now.getMonth()]
      const date = now.getDate()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const period = hours >= 12 ? ' pm' : ' am'
      const displayHours = hours % 12 || 12
      
      const formatted = `${dayName} ${monthName} ${date} ${displayHours}:${minutes.toString().padStart(2, '0')}${period}`
      setTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {time}
    </div>
  )
}

export default DateTime
