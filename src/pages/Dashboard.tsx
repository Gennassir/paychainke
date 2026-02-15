import { blink } from '@/lib/blink'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Shield, Search, RefreshCcw, LogOut, CheckCircle2, AlertTriangle, Plus, Smartphone, Clock, LayoutDashboard, History, Settings, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { SmartScanner } from '@/components/SmartScanner'
import { motion } from 'framer-motion'

interface TransactionVerification {
  id: string
  transactionCode: string
  amount: string
  senderInfo: string
  status: 'legit' | 'scam' | 'suspicious'
  created_at: string
}

export function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [verifications, setVerifications] = useState<TransactionVerification[]>([])
  const [stats, setStats] = useState({ total: 0, today: 0, flagged: 0 })
  const [activeTab, setActiveTab] = useState<'overview' | 'scanner' | 'history'>('overview')

  useEffect(() => {
    blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
  }, [])

  useEffect(() => {
    if (user) {
      loadVerifications()
    }
  }, [user])

  async function loadVerifications() {
    try {
      const data = await blink.db.transactionVerifications.list({
        orderBy: { created_at: 'desc' }
      }) as any[]
      
      setVerifications(data)
      
      const today = new Date().toISOString().split('T')[0]
      setStats({
        total: data.length,
        today: data.filter(t => t.created_at.startsWith(today)).length,
        flagged: data.filter(t => t.status === 'scam' || t.status === 'suspicious').length
      })
    } catch (error) {
      console.error('Failed to load verifications:', error)
    }
  }

  function handleLogout() {
    blink.auth.signOut()
    window.location.href = '/'
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#121214] border-r border-white/5 p-8 flex flex-col gap-10 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 rotate-3 group hover:rotate-0 transition-transform">
            <ShieldCheck className="text-primary-foreground w-7 h-7" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold tracking-tight text-gradient-gold">
              PayChain<span className="text-white">KE</span>
            </span>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Trust Protocol</p>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          <Button 
            variant={activeTab === 'overview' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start h-12 gap-3 transition-all ${activeTab === 'overview' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'hover:bg-white/5'}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard className="w-5 h-5" /> 
            <span className="font-medium">Overview</span>
          </Button>
          <Button 
            variant={activeTab === 'scanner' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start h-12 gap-3 transition-all ${activeTab === 'scanner' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'hover:bg-white/5'}`}
            onClick={() => setActiveTab('scanner')}
          >
            <Smartphone className="w-5 h-5" /> 
            <span className="font-medium">Smart Scanner</span>
          </Button>
          <Button 
            variant={activeTab === 'history' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start h-12 gap-3 transition-all ${activeTab === 'history' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'hover:bg-white/5'}`}
            onClick={() => setActiveTab('history')}
          >
            <History className="w-5 h-5" /> 
            <span className="font-medium">Audit Log</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start h-12 gap-3 text-muted-foreground hover:bg-white/5">
            <Settings className="w-5 h-5" /> 
            <span className="font-medium">Configuration</span>
          </Button>
        </nav>

        <div className="pt-8 border-t border-white/5">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xl shadow-inner">
                {user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">{user.email}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Premium Merchant</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2 border-white/10 hover:bg-destructive/10 hover:text-destructive transition-colors rounded-xl" onClick={handleLogout}>
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-gradient-to-br from-[#0A0A0B] to-[#121214]">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-2">Protocol Live</p>
              <h1 className="text-4xl font-serif font-bold text-gradient-gold">Command Center</h1>
              <p className="text-muted-foreground mt-2">Manage your financial trust layer and audit logs.</p>
            </div>
            <div className="flex gap-4">
              <motion.div whileHover={{ y: -5 }} className="px-6 py-4 rounded-2xl bg-[#1A1A1E] border border-white/5 shadow-2xl flex items-center gap-5">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <CheckCircle2 className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Today's Scans</p>
                  <p className="text-2xl font-bold">{stats.today}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="px-6 py-4 rounded-2xl bg-[#1A1A1E] border border-white/5 shadow-2xl flex items-center gap-5">
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center border border-destructive/20">
                  <AlertTriangle className="text-destructive w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Threats Blocked</p>
                  <p className="text-2xl font-bold">{stats.flagged}</p>
                </div>
              </motion.div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {activeTab === 'overview' && (
              <>
                <div className="lg:col-span-1 space-y-8">
                  <SmartScanner onVerified={loadVerifications} />
                  
                  <Card className="p-8 border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-125 transition-transform duration-700" />
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Shield className="w-6 h-6" />
                      Security Advisory
                    </h4>
                    <p className="text-sm leading-relaxed opacity-90 mb-6">
                      The "MPesa Reversal" scam is increasing in your region. Always ensure you see the <strong>"Deep Analyze"</strong> success badge before releasing high-value assets.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                        <p className="text-2xl font-bold">99.8%</p>
                        <p className="text-[10px] uppercase font-bold opacity-70">Detection Rate</p>
                      </div>
                      <div className="p-3 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                        <p className="text-2xl font-bold">2.4s</p>
                        <p className="text-[10px] uppercase font-bold opacity-70">Avg Response</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <Card className="p-8 border border-white/5 bg-[#121214] shadow-2xl rounded-3xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div>
                        <h3 className="text-2xl font-serif font-bold">Audit Ledger</h3>
                        <p className="text-sm text-muted-foreground mt-1 text-gradient-gold font-bold uppercase tracking-widest">Truth Logs</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 transition-all rounded-xl" onClick={loadVerifications}>
                        <RefreshCcw className="w-4 h-4 mr-2" /> Sync Records
                      </Button>
                    </div>

                    <div className="rounded-2xl border border-white/5 overflow-hidden relative z-10 bg-black/20">
                      <Table>
                        <TableHeader className="bg-white/5">
                          <TableRow className="hover:bg-transparent border-white/5">
                            <TableHead className="font-bold py-5">Reference</TableHead>
                            <TableHead className="font-bold py-5">Value</TableHead>
                            <TableHead className="font-bold py-5">Entity</TableHead>
                            <TableHead className="font-bold py-5">Integrity</TableHead>
                            <TableHead className="font-bold py-5 text-right">Audit Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {verifications.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                                <div className="flex flex-col items-center gap-4 opacity-30">
                                  <History className="w-16 h-16" />
                                  <p className="text-lg font-serif">No audit logs available</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          ) : (
                            verifications.slice(0, 8).map((v) => (
                              <TableRow key={v.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                <TableCell className="font-mono text-sm text-primary py-5">{v.transactionCode || 'N/A'}</TableCell>
                                <TableCell className="font-bold py-5">
                                  {v.amount ? `KES ${Number(v.amount).toLocaleString()}` : '-'}
                                </TableCell>
                                <TableCell className="py-5">
                                  <p className="font-medium text-sm">{v.senderInfo}</p>
                                </TableCell>
                                <TableCell className="py-5">
                                  {v.status === 'legit' ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" /> AUTHENTIC
                                    </div>
                                  ) : v.status === 'scam' ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold border border-destructive/20">
                                      <div className="w-1.5 h-1.5 rounded-full bg-destructive" /> FRAUD
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold border border-orange-500/20">
                                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> SUSPICIOUS
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground py-5">
                                  {new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    {verifications.length > 8 && (
                      <div className="mt-6 text-center">
                        <Button variant="ghost" className="text-primary font-bold text-sm uppercase tracking-widest hover:bg-primary/5" onClick={() => setActiveTab('history')}>
                          View Full Audit Trail <Plus className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              </>
            )}

            {activeTab === 'scanner' && (
              <div className="lg:col-span-3 max-w-2xl mx-auto w-full">
                <SmartScanner onVerified={loadVerifications} />
              </div>
            )}

            {activeTab === 'history' && (
              <div className="lg:col-span-3">
                {/* Full Audit Log - simplified for space */}
                <Card className="p-8 border border-white/5 bg-[#121214] shadow-2xl rounded-3xl">
                   <h3 className="text-2xl font-serif font-bold mb-8">Full Audit History</h3>
                   {/* Table implementation same as above but with pagination or full list */}
                   <div className="rounded-2xl border border-white/5 overflow-hidden bg-black/20">
                      <Table>
                        <TableHeader className="bg-white/5">
                          <TableRow className="hover:bg-transparent border-white/5">
                            <TableHead className="font-bold py-5">Reference</TableHead>
                            <TableHead className="font-bold py-5">Value</TableHead>
                            <TableHead className="font-bold py-5">Entity</TableHead>
                            <TableHead className="font-bold py-5">Integrity</TableHead>
                            <TableHead className="font-bold py-5 text-right">Audit Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {verifications.map((v) => (
                            <TableRow key={v.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                              <TableCell className="font-mono text-sm text-primary py-5">{v.transactionCode || 'N/A'}</TableCell>
                              <TableCell className="font-bold py-5">{v.amount ? `KES ${Number(v.amount).toLocaleString()}` : '-'}</TableCell>
                              <TableCell className="py-5"><p className="font-medium text-sm">{v.senderInfo}</p></TableCell>
                              <TableCell className="py-5">
                                <Badge variant={v.status === 'legit' ? 'outline' : 'destructive'} className="rounded-full px-3 py-1 text-[10px] font-bold">
                                  {v.status.toUpperCase()}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right text-xs text-muted-foreground py-5">
                                {new Date(v.created_at).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                   </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
