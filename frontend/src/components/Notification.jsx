import { useApp } from '../context/AppContext'

export default function Notification() {
  const { notification } = useApp()
  return (
    <div className={`notif${notification ? ' show' : ''}`}>
      {notification}
    </div>
  )
}
