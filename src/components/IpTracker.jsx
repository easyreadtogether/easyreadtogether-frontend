import { useEffect } from 'react'
import axios from 'axios'

const IPTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor's IP address
        const ipResponse = await axios.get('https://api.ipify.org?format=json')
        const { ip } = ipResponse.data

        // Send to your backend
        const response = await axios.post(
          'https://easyreadtogether-backend-app.com/api/analytics',
          { ip: ip },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

      } catch (error) {
        console.error('Tracking failed:', error)
      }
    }

    trackVisitor()
  }, [])

  return null
}

export default IPTracker
