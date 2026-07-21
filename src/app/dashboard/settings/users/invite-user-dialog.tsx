'use client'

import { useState } from 'react'
import { inviteWorkspaceMember } from '@/actions/workspace'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RiUserAddLine, RiLoader4Line } from '@remixicon/react'

export function InviteUserDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    try {
      setIsSubmitting(true)
      await inviteWorkspaceMember(email, role)
      setEmail('')
      setIsOpen(false)
    } catch (error) {
      console.error('Error inviting member:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 text-xs font-semibold gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
          <RiUserAddLine className="size-4" />
          <span>Undang Anggota Tim</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-gray-900 font-satoshi">Undang Kolaborator</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2 font-satoshi">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 font-outfit">Email Pengguna (Google Account)</label>
            <Input
              type="email"
              required
              placeholder="nama@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xs border-gray-200"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 font-outfit">Peran (Role)</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-9 px-3 text-xs rounded-md border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)} className="text-xs border-gray-200">
              Batal
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitting} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
              {isSubmitting ? <RiLoader4Line className="size-3.5 animate-spin" /> : 'Kirim Undangan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
