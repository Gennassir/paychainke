import { Shield, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0A0A0B] border-t border-white/5 py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-primary w-8 h-8" />
              <span className="text-3xl font-serif font-bold tracking-tight text-gradient-gold">
                PayChain<span className="text-white">KE</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
              The universal gold standard for Kenya's digital economy. Protecting billions in commerce through AI-powered truth verification.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-8">Protocol</h4>
            <ul className="space-y-4 text-muted-foreground font-medium">
              <li><a href="#features" className="hover:text-primary transition-colors">Smart Scan</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Integration</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Whitepaper</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-8">Network</h4>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} PayChainKE Global. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}