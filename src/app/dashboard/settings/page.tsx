import { getWorkspaceData } from '@/actions/workspace'
import { WorkspaceProfileForm } from './workspace-profile-form'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const workspace = await getWorkspaceData()

  return (
    <div className="space-y-6 font-satoshi">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl font-satoshi">
          Pengaturan Workspace
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-outfit">
          Kelola profil workspace, rincian anggota tim, dan kontrol keamanan Zero Trust RLS.
        </p>
      </div>

      {/* Navigation Sub-Menu */}
      <div className="flex gap-4 border-b border-gray-200 pb-3 text-xs font-semibold">
        <Link href="/dashboard/settings" className="text-indigo-600 border-b-2 border-indigo-600 pb-3 -mb-3 font-outfit">
          General
        </Link>
        <Link href="/dashboard/settings/users" className="text-gray-500 hover:text-gray-900 font-outfit transition">
          Anggota Tim
        </Link>
        <Link href="/dashboard/settings/billing" className="text-gray-500 hover:text-gray-900 font-outfit transition">
          Billing & Usage
        </Link>
      </div>

      {/* Interactive Workspace Profile Form */}
      <WorkspaceProfileForm
        initialWorkspace={{
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug
        }}
      />
    </div>
  )
}
