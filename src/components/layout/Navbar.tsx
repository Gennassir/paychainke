import { blink } from '@/lib/blink'
import { Button } from '@/components/ui/button'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  onLogin: () => void
  isAuthenticated: boolean
}

export function Navbar({ onLogin, isAuthenticated }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0B]/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
            <Shield className="text-primary-foreground w-7 h-7" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold tracking-tight text-gradient-gold">
              PayChain<span className="text-white">KE</span>
            </span>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Gold Edition</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Protocol</a>
          <a href="#impact" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Impact</a>
          {isAuthenticated ? (
            <Button className="bg-primary hover:bg-primary/90 rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20" onClick={() => window.location.href = '/dashboard'}>
              Command Center
            </Button>
          ) : (
            <Button className="bg-primary hover:bg-primary/90 rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20" onClick={onLogin}>
              Merchant Login
            </Button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b animate-fade-in">
          <div className="flex flex-col p-4 gap-4">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Protocol</a>
            <a href="#impact" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Impact</a>
            {isAuthenticated ? (
              <Button variant="default" onClick={() => window.location.href = '/dashboard'}>
                Command Center
              </Button>
            ) : (
              <Button variant="default" onClick={onLogin}>
                Merchant Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
