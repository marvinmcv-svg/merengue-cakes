'use client'

import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cakeType: '',
    eventDate: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', cakeType: '', eventDate: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <main className="min-h-screen bg-[#FDF8F3]">
      <header className="bg-[#E8B4B8] py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide">Merengue Cakes</h1>
        <p className="text-white/90 mt-2 text-lg">by Joselyn</p>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-[#C98B8E] text-lg">Custom merengue cakes crafted with love for your special moments</p>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">🎂</div>
            <h2 className="text-2xl font-serif text-[#C98B8E] mb-2">Thank You!</h2>
            <p className="text-gray-600">Your order request has been sent. Joselyn will contact you soon!</p>
            <button onClick={() => setStatus('idle')} className="mt-6 text-[#E8B4B8] underline">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input required name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8B4B8] focus:border-transparent outline-none transition" placeholder="Maria Garcia" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8B4B8] focus:border-transparent outline-none transition" placeholder="maria@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8B4B8] focus:border-transparent outline-none transition" placeholder="(555) 123-4567" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cake Type</label>
                <select required name="cakeType" value={form.cakeType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8B4B8] focus:border-transparent outline-none transition bg-white">
                  <option value="">Select a cake</option>
                  <option value="birthday">Birthday Cake</option>
                  <option value="wedding">Wedding Cake</option>
                  <option value="babyshower">Baby Shower Cake</option>
                  <option value="graduation">Graduation Cake</option>
                  <option value="anniversary">Anniversary Cake</option>
                  <option value="custom">Custom Design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                <input required type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8B4B8] focus:border-transparent outline-none transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your vision</label>
              <textarea required name="message" value={form.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8B4B8] focus:border-transparent outline-none transition resize-none" placeholder="Describe your dream cake, flavors, colors, theme..." />
            </div>

            {status === 'error' && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <button disabled={status === 'loading'} type="submit" className="w-full bg-[#E8B4B8] hover:bg-[#C98B8E] disabled:bg-gray-300 text-white font-medium py-4 rounded-xl transition-colors text-lg">
              {status === 'loading' ? 'Sending...' : 'Send Order Request'}
            </button>
          </form>
        )}

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Merengue Cakes By Joselyn</p>
        </footer>
      </div>
    </main>
  )
}
