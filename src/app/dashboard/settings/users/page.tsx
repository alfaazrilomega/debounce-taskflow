import { getWorkspaceData } from '@/actions/workspace'
import { Card } from '@/components/tremor/Card'
import { Badge } from '@/components/tremor/Badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/tremor/Table'
import Link from 'next/link'
import { InviteUserDialog } from './invite-user-dialog'

export const dynamic = 'force-dynamic'

export default async function SettingsUsersPage() {
  const workspace = await getWorkspaceData()

  return (
    <div className="space-y-6 font-satoshi">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl font-satoshi">
          Kelola Anggota Tim
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-outfit">
          Undang dan atur hak akses kolaborator di ruang kerja ini.
        </p>
      </div>

      {/* Navigation Sub-Menu */}
      <div className="flex gap-4 border-b border-gray-200 pb-3 text-xs font-semibold">
        <Link href="/dashboard/settings" className="text-gray-500 hover:text-gray-900 font-outfit transition">
          General
        </Link>
        <Link href="/dashboard/settings/users" className="text-indigo-600 border-b-2 border-indigo-600 pb-3 -mb-3 font-outfit">
          Anggota Tim
        </Link>
        <Link href="/dashboard/settings/billing" className="text-gray-500 hover:text-gray-900 font-outfit transition">
          Billing & Usage
        </Link>
      </div>

      {/* Team Header & Invite Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 font-satoshi">Daftar Kolaborator</h3>
          <p className="text-xs text-gray-500 font-outfit">{workspace.members.length} Anggota Terdaftar</p>
        </div>
        <InviteUserDialog />
      </div>

      {/* Members Table */}
      <Card className="p-0 overflow-hidden border-gray-200 bg-white">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Anggota</TableHeaderCell>
              <TableHeaderCell>Peran (Role)</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Tanggal Bergabung</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workspace.members.map(member => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="font-semibold text-gray-900">
                    {member.user.full_name || member.invited_email || 'Kolaborator'}
                  </div>
                  <div className="text-[11px] text-gray-500 font-outfit">
                    {member.invited_email || 'Aktif via Supabase Auth'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={member.role === 'owner' ? 'default' : 'neutral'}>
                    {member.role.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={member.status === 'active' ? 'success' : 'warning'}>
                    {member.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500 font-outfit text-xs">
                  {new Date(member.joined_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
