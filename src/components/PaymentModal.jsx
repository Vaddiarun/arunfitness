import { useState, useEffect } from 'react';
import { initiateRazorpayPayment } from '../lib/razorpay';
import { wa, CONSULTATION_FEE } from '../lib/config';

export default function PaymentModal({ isOpen, onClose, topic = 'Transformation Consultation', defaultDetails = {} }) {
  const [name, setName] = useState(defaultDetails.name || '');
  const [phone, setPhone] = useState(defaultDetails.phone || defaultDetails.whatsapp || '');
  const [email, setEmail] = useState(defaultDetails.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [countdown, setCountdown] = useState(5);

  // Sync incoming details if modal is reopened with new context
  useEffect(() => {
    if (isOpen) {
      if (defaultDetails.name) setName(defaultDetails.name);
      if (defaultDetails.phone || defaultDetails.whatsapp) setPhone(defaultDetails.phone || defaultDetails.whatsapp);
      if (defaultDetails.email) setEmail(defaultDetails.email);
      setPaymentSuccess(null);
      setErrorMsg('');
      setIsLoading(false);
      setCountdown(5);
    }
  }, [isOpen, defaultDetails]);

  // Handle auto-redirect countdown after successful payment
  useEffect(() => {
    if (!paymentSuccess) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Trigger redirect
          window.open(paymentSuccess.whatsappUrl, '_blank');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentSuccess]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    setIsLoading(true);

    initiateRazorpayPayment({
      amount: CONSULTATION_FEE,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
      },
      title: 'Arun Kumar Coaching',
      description: `WhatsApp Consultation - ${topic}`,
      notes: {
        topic: topic,
        whatsapp: phone.trim(),
      },
      onSuccess: (response) => {
        setIsLoading(false);
        const paymentId = response.razorpay_payment_id;
        const msg = `Hi Arun, I've paid the ₹${CONSULTATION_FEE} consultation fee.\n\n• Payment ID: ${paymentId}\n• Name: ${name.trim()}\n• Topic / Goal: ${topic}\n\nI'm ready for my 1-on-1 assessment!`;
        const whatsappUrl = wa(msg);

        setPaymentSuccess({
          paymentId,
          amount: CONSULTATION_FEE,
          date: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          whatsappUrl,
        });
      },
      onFailure: (err) => {
        setIsLoading(false);
        console.error('Razorpay payment error:', err);
        setErrorMsg(err?.description || err?.message || 'Payment could not be completed. Please try again.');
      },
      onDismiss: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md transition-all animate-akrise">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-[540px] max-h-[92vh] overflow-y-auto bg-surface border border-neutral-700 rounded-lg shadow-2xl p-6 sm:p-8 flex flex-col gap-6 text-ink">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
        >
          ✕
        </button>

        {paymentSuccess ? (
          /* SUCCESS STATE */
          <div className="flex flex-col items-center text-center gap-5 py-2">
            <div className="w-16 h-16 rounded-full bg-accent-900 border border-accent flex items-center justify-center text-accent-200 text-2xl shadow-lg">
              ✓
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] tracking-[0.25em] text-accent-300 uppercase font-medium">Payment Verified</span>
              <h3 className="font-heading font-medium text-2xl sm:text-3xl m-0 tracking-tight text-white">
                YOU'RE CONNECTED!
              </h3>
              <p className="text-neutral-300 text-sm max-w-[38ch] mx-auto mt-1">
                Your ₹{paymentSuccess.amount} consultation fee is confirmed. Tap below to start your 1-on-1 WhatsApp chat with Arun.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="w-full bg-bg/70 border border-neutral-800 rounded-md p-4 flex flex-col gap-2.5 text-left text-xs">
              <div className="flex justify-between items-center text-neutral-400">
                <span>Payment ID</span>
                <span className="font-mono text-accent-200 font-semibold">{paymentSuccess.paymentId}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Amount Paid</span>
                <span className="text-white font-medium">₹{paymentSuccess.amount} INR</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Topic</span>
                <span className="text-neutral-200">{topic}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Date</span>
                <span className="text-neutral-200">{paymentSuccess.date}</span>
              </div>
            </div>

            {/* Countdown / Direct WhatsApp Button */}
            <div className="w-full flex flex-col gap-3 pt-2">
              <a
                href={paymentSuccess.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-md bg-accent-900 border border-accent text-accent-100 font-medium tracking-[0.12em] uppercase text-xs sm:text-sm flex items-center justify-center gap-2.5 hover:bg-accent-800 transition-colors shadow-md"
              >
                <span>Open WhatsApp Chat Now</span>
                <span className="text-base">→</span>
              </a>

              {countdown > 0 ? (
                <p className="text-xs text-neutral-400 m-0">
                  Redirecting automatically in <span className="text-accent-300 font-semibold">{countdown}s</span>...
                </p>
              ) : (
                <p className="text-xs text-neutral-400 m-0">
                  If WhatsApp didn't open automatically, click the button above.
                </p>
              )}
            </div>
          </div>
        ) : (
          /* CHECKOUT STATE */
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 pr-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
                <span className="text-[11px] tracking-[0.25em] text-accent-300 uppercase font-semibold">
                  VIP WhatsApp Consultation
                </span>
              </div>
              <h3 className="font-heading font-medium text-2xl sm:text-3xl m-0 tracking-tight text-white leading-tight">
                CONNECT WITH ARUN
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm m-0 leading-relaxed">
                Direct 1-on-1 access to Arun Kumar on WhatsApp. Initial fitness assessment, roadmap &amp; program guidance.
              </p>
            </div>

            {/* Pricing Banner */}
            <div className="flex items-center justify-between p-3.5 bg-bg/90 border border-accent/40 rounded-md">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">Consultation Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-heading text-white">₹{CONSULTATION_FEE}</span>
                  <span className="text-[11px] text-neutral-400 line-through">₹1,500</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded bg-accent-900/80 border border-accent/60 text-[10px] text-accent-200 tracking-wider uppercase font-medium">
                  100% Refundable Guarantee
                </span>
                <div className="text-[10px] text-neutral-400 mt-1">Adjusted against full coaching</div>
              </div>
            </div>

            {/* Inquiring For Badge */}
            {topic && (
              <div className="text-xs text-neutral-300 bg-surface/50 border border-neutral-800 rounded px-3 py-2 flex items-center gap-2">
                <span className="text-neutral-500">Inquiring for:</span>
                <span className="text-accent-200 font-medium truncate">{topic}</span>
              </div>
            )}

            {/* Details Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
                  Your Full Name <span className="text-accent-300">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
                  WhatsApp Number <span className="text-accent-300">*</span>
                </label>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  placeholder="e.g. 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="field w-full"
                />
                <span className="text-[10px] text-neutral-500">
                  Arun will connect with you on this WhatsApp number.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
                  Email Address <span className="text-neutral-500">(for payment receipt)</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field w-full"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded p-2.5">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-4 px-6 rounded-md bg-accent-900 border border-accent text-accent-100 font-medium tracking-[0.16em] uppercase text-xs sm:text-sm hover:bg-accent-800 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
              >
                {isLoading ? (
                  <span>Opening Razorpay Secure Checkout...</span>
                ) : (
                  <>
                    <span>Pay ₹{CONSULTATION_FEE} &amp; Open WhatsApp</span>
                    <span className="text-base">→</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500 uppercase tracking-wider pt-1">
                <span>🔒 Razorpay Secured</span>
                <span>•</span>
                <span>UPI · Cards · Netbanking</span>
                <span>•</span>
                <span>Instant Access</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
