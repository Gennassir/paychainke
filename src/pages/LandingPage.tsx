import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, ShieldAlert, Zap, Lock, ArrowRight, Smartphone, AlertTriangle, Sparkles, Globe, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

interface LandingPageProps {
  onLogin: () => void
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601039-460c1ea3a6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxOYWlyb2JpJTIwYnVzaW5lc3N8ZW58MHwwfHx8MTc3MTE1ODA2Mnww&ixlib=rb-4.1.0&q=80&w=1920" 
            alt="Premium Nairobi Business"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,185,49,0.05),transparent)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-[0.2em]"
            >
              <Sparkles className="w-4 h-4" />
              The Gold Standard of Financial Trust
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8 leading-[1.1]"
            >
              The Universal <br />
              <span className="text-gradient-gold">Truth Layer</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Powered by AI, PayChainKE detects M-Pesa fraud in real-time. 
              Our smart scanner automatically identifies scam patterns and verifies every transaction code instantly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button size="lg" onClick={onLogin} className="text-lg h-16 px-12 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 rounded-2xl group">
                Access Protocol <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-16 px-12 border-white/10 hover:bg-white/5 rounded-2xl backdrop-blur-sm">
                View Proof of Trust
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-20 pt-10 border-t border-white/5 flex flex-wrap items-center justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            >
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] w-full mb-4">Securing the Market</p>
              <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> Safaricom Ecosystem</div>
              <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck className="w-6 h-6" /> KBA Standards</div>
              <div className="flex items-center gap-2 font-bold text-xl text-gradient-gold font-serif italic">Universal Gold Certified</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Smartphone className="text-primary w-8 h-8" />,
                title: "Smart Scan Protocol",
                desc: "Our AI engine parses incoming messages instantly, identifying non-standard formatting used in SMS spoofing apps."
              },
              {
                icon: <Zap className="text-primary w-8 h-8" />,
                title: "Instant Verification",
                desc: "Real-time cross-referencing with payment provider logs to ensure funds have actually reached your account."
              },
              {
                icon: <ShieldAlert className="text-primary w-8 h-8" />,
                title: "Reversal Shield",
                desc: "Advanced algorithms detect high-risk reversal patterns, warning you before you release high-value inventory."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl bg-[#121214] border border-white/5 shadow-2xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The KES 810B Trust Crisis</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our digital economy moves at 5G speed, but our trust layer is stuck in the analog era.
          </p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-none bg-background shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
              <Smartphone className="text-red-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fake Payment SMS</h3>
            <p className="text-muted-foreground">Scammers use edited messages that look exactly like M-Pesa notifications to trick business owners.</p>
          </Card>
          <Card className="p-8 border-none bg-background shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
              <AlertTriangle className="text-orange-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Reversal Scams</h3>
            <p className="text-muted-foreground">Goods are handed over after a "success" message, only for the sender to reverse the funds immediately.</p>
          </Card>
          <Card className="p-8 border-none bg-background shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
              <ShieldAlert className="text-yellow-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Claims of "Delay"</h3>
            <p className="text-muted-foreground">Fraudsters claim network delays or message provider issues while showing a spoofed confirmation screen.</p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Built by Engineers, <br />Designed for Merchants</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Instant SMS Verification</h4>
                    <p className="text-muted-foreground">Copy-paste any payment SMS and verify its authenticity against provider logs in under 2 seconds.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Lock className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Secure Settlement Ledger</h4>
                    <p className="text-muted-foreground">A robust truth layer that keeps track of every verified transaction, preventing double-spending and reversals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Real-Time Fraud Alerts</h4>
                    <p className="text-muted-foreground">Get notified instantly if a sender is flagged for repeated reversal attempts across the network.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <Card className="relative overflow-hidden border-primary/20 bg-background/50 backdrop-blur-xl">
                <div className="p-6 bg-secondary/50 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-muted-foreground ml-2">Verification Engine v1.0</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    <div className="p-4 bg-background border rounded-lg animate-pulse">
                      <div className="h-4 w-3/4 bg-muted rounded mb-2" />
                      <div className="h-4 w-1/2 bg-muted rounded" />
                    </div>
                    <div className="flex justify-center py-4">
                      <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    </div>
                    <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
                      <CheckCircle2 className="mx-auto text-primary w-8 h-8 mb-2" />
                      <p className="font-bold text-primary">TRANSACTION VERIFIED</p>
                      <p className="text-xs text-primary/70">Ref: QRC7WJ3KL | KES 4,500.00</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Protect Your Bottom Line?</h2>
          <p className="text-primary-foreground/80 text-xl mb-10 max-w-2xl mx-auto">
            Join the 500+ merchants who have eliminated payment fraud from their business operations.
          </p>
          <Button size="lg" variant="secondary" onClick={onLogin} className="text-lg h-14 px-10">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  )
}