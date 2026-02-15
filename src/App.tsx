import { useState, useEffect } from 'react'
import { blink } from './lib/blink'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDashboard, setIsDashboard] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setIsLoading(false)
      
      // Simple routing logic based on URL or auth state
      if (window.location.pathname === '/dashboard' && state.isAuthenticated) {
        setIsDashboard(true)
      } else {
        setIsDashboard(false)
      }
    })
    return unsubscribe
  }, [])

  // Handle URL changes manually for simple routing
  useEffect(() => {
    const handlePopState = () => {
      setIsDashboard(window.location.pathname === '/dashboard' && !!user)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [user])

  async function handleLogin() {
    try {
      await blink.auth.login(window.location.origin + '/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {!isDashboard && <Navbar onLogin={handleLogin} isAuthenticated={!!user} />}
      
      <main>
        {isDashboard ? (
          <Dashboard />
        ) : (
          <LandingPage onLogin={handleLogin} />
        )}
      </main>

      {!isDashboard && <Footer />}
      <Toaster position="top-center" expand={true} richColors />
    </div>
  )
}

export default App
