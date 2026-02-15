import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Shield, Smartphone, RefreshCcw, CheckCircle2, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react'
import { blink } from '@/lib/blink'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface SmartScannerProps {
  onVerified: (verification: any) => void
}

export function SmartScanner({ onVerified }: SmartScannerProps) {
  const [smsInput, setSmsInput] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleVerify() {
    if (!smsInput.trim()) {
      toast.error('Please paste the payment message content')
      return
    }

    setIsVerifying(true)
    setResult(null)

    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Analyze this M-Pesa or mobile money transaction message for authenticity. 
        Determine if it follows the standard M-Pesa notification format or if it shows signs of fraud (e.g., reversal scams, fake sender, non-standard text).
        Message: "${smsInput}"`,
        schema: {
          type: 'object',
          properties: {
            transactionCode: { type: 'string' },
            amount: { type: 'number' },
            senderName: { type: 'string' },
            senderPhone: { type: 'string' },
            date: { type: 'string' },
            time: { type: 'string' },
            isScam: { type: 'boolean' },
            scamReason: { type: 'string' },
            isReversalLikely: { type: 'boolean' },
            confidenceScore: { type: 'number' },
            isStandardFormat: { type: 'boolean' }
          },
          required: ['isScam', 'confidenceScore']
        }
      })

      setResult(object)
      
      const status = object.isScam ? 'scam' : (object.confidenceScore < 0.7 ? 'suspicious' : 'legit')
      
      const verification = await blink.db.transactionVerifications.create({
        userId: (await blink.auth.me())?.id,
        transactionCode: object.transactionCode,
        amount: object.amount?.toString(),
        senderInfo: `${object.senderName} (${object.senderPhone})`,
        messageBody: smsInput,
        status: status,
        confidenceScore: object.confidenceScore,
        riskFactors: JSON.stringify({
          scamReason: object.scamReason,
          reversalLikely: object.isReversalLikely,
          nonStandard: !object.isStandardFormat
        })
      })

      onVerified(verification)
      
      if (object.isScam) {
        toast.error('Fraud Detected: This message appears to be a scam!')
      } else if (status === 'suspicious') {
        toast.warning('Suspicious Activity: Please verify manually before proceeding.')
      } else {
        toast.success('Transaction Verified: Payment is legitimate.')
      }
    } catch (error) {
      console.error('Verification error:', error)
      toast.error('AI Verification failed. Please check your internet connection.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Card className="p-6 border-primary/20 bg-background/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-serif font-bold flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-primary" />
          Smart <span className="text-gradient-gold">Scan</span>
        </h3>
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
      </div>

      <div className="space-y-6">
        <div className="relative group">
          <Textarea 
            placeholder="Paste M-Pesa / SMS notification here..."
            className="min-h-[160px] bg-secondary/10 border-primary/10 focus:border-primary/40 transition-all text-sm leading-relaxed"
            value={smsInput}
            onChange={(e) => setSmsInput(e.target.value)}
          />
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
        </div>

        <Button 
          className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 relative overflow-hidden group"
          onClick={handleVerify}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <div className="flex items-center gap-3">
              <RefreshCcw className="w-5 h-5 animate-spin" />
              <span>Deep Analyzing...</span>
            </div>
          ) : (
            <>
              <Shield className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Run Truth Verification
            </>
          )}
          {isVerifying && <div className="absolute inset-0 bg-gold-shimmer" />}
        </Button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-5 rounded-xl border-2 ${
                result.isScam 
                  ? 'bg-destructive/5 border-destructive/20 text-destructive' 
                  : (result.confidenceScore < 0.7 ? 'bg-orange-500/5 border-orange-500/20 text-orange-600' : 'bg-green-500/5 border-green-500/20 text-green-600')
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  result.isScam ? 'bg-destructive/20' : (result.confidenceScore < 0.7 ? 'bg-orange-500/20' : 'bg-green-500/20')
                }`}>
                  {result.isScam ? <AlertTriangle className="w-6 h-6" /> : (result.confidenceScore < 0.7 ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-lg uppercase tracking-wider">
                    {result.isScam ? 'Fraud Detected' : (result.confidenceScore < 0.7 ? 'Suspicious' : 'Authentic')}
                  </p>
                  <p className="text-sm opacity-90 leading-tight">
                    {result.isScam ? result.scamReason : (result.confidenceScore < 0.7 ? 'Verification score low. Proceed with extreme caution.' : 'Transaction details match standard provider patterns.')}
                  </p>
                  
                  {!result.isScam && result.transactionCode && (
                    <div className="pt-3 mt-3 border-t border-current/10 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] uppercase opacity-70">Transaction ID</p>
                        <p className="font-mono font-bold text-sm">{result.transactionCode}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase opacity-70">Amount</p>
                        <p className="font-bold text-sm">KES {result.amount?.toLocaleString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] uppercase opacity-70">Sender</p>
                        <p className="font-bold text-sm">{result.senderName || 'N/A'} {result.senderPhone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
