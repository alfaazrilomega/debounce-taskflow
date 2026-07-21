import { ReactNode } from 'react'
import Link from 'next/link'
import { logout } from '@/actions/auth'
import { getWorkspaceData } from '@/actions/workspace'
import {
  RiHome2Line,
  RiPieChartLine,
  RiListCheck,
  RiSettings5Line,
  RiShieldCheckLine,
  RiLogoutBoxRLine,
  RiCheckDoubleLine,
  RiUser3Line
} from '@remixicon/react'

export const dynamic = 'force-dynamic'

async function SidebarContent() {
  const workspace = await getWorkspaceData()

  return (
    <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 font-satoshi">
      {/* Brand & Workspace Header */}
      <div className="flex items-center justify-between px-2 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-7 w-7 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0">
            {workspace.name.charAt(0).toLowerCase() || 'd'}
          </div>
          <div className="min-w-0">
            <span className="text-sm font-bold tracking-tight text-gray-900 font-satoshi block leading-none truncate">
              {workspace.name}
            </span>
            <span className="text-[10px] text-indigo-600 font-mono mt-1 block truncate">
              /{workspace.slug}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20 uppercase tracking-wider font-outfit flex-shrink-0">
          PRO
        </span>
      </div>

      {/* Main Navigation Links */}
      <nav aria-label="core navigation" className="flex flex-1 flex-col space-y-6">
        <div>
          <span className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider font-outfit">
            Menu Utama
          </span>
          <ul role="list" className="mt-2 space-y-1">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-x-2.5 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
              >
                <RiHome2Line className="size-4 shrink-0 text-indigo-600" />
                <span>Task Workspace</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/overview"
                className="flex items-center gap-x-2.5 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
              >
                <RiPieChartLine className="size-4 shrink-0 text-gray-500" />
                <span>Overview & Chart</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/details"
                className="flex items-center gap-x-2.5 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
              >
                <RiListCheck className="size-4 shrink-0 text-gray-500" />
                <span>Audit Details</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-x-2.5 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
              >
                <RiSettings5Line className="size-4 shrink-0 text-gray-500" />
                <span>Settings & Team</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Security & System Features */}
        <div>
          <span className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider font-outfit">
            Keamanan Sistem
          </span>
          <ul role="list" className="mt-2 space-y-1">
            <li>
              <div className="flex items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-x-2">
                  <RiShieldCheckLine className="size-4 shrink-0 text-emerald-600" />
                  <span>Zero Trust RLS</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* User Profile & Sign Out Footer */}
      <div className="mt-auto border-t border-gray-100 pt-4 space-y-2">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold font-outfit">
            <RiUser3Line className="size-4 text-gray-600" />
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-semibold text-gray-900 truncate">{workspace.name}</p>
            <p className="text-[10px] text-gray-500 truncate font-mono">/{workspace.slug}</p>
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-x-2 rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <RiLogoutBoxRLine className="size-4 shrink-0" />
            <span>Keluar Akun</span>
          </button>
        </form>
      </div>
    </aside>
  )
}

async function TopNavHeader() {
  const workspace = await getWorkspaceData()

  return (
    <div className="flex h-14 items-center justify-between px-6 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 font-outfit">
        <span>Workspace</span>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900">{workspace.name}</span>
        <span className="text-gray-300">/</span>
        <span className="font-mono text-indigo-600 text-[11px]">[{workspace.slug}]</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 font-outfit">
          <RiCheckDoubleLine className="size-3.5 text-emerald-600" />
          Database RLS Protected
        </span>
      </div>
    </div>
  )
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-screen w-full md:grid-cols-[260px_1fr] overflow-hidden bg-gray-50 text-gray-900 font-satoshi">
      <div className="hidden md:flex flex-col">
        <SidebarContent />
      </div>

      <main className="flex flex-col h-full overflow-y-auto relative bg-gray-50">
        <header className="sticky top-0 z-10">
          <TopNavHeader />
        </header>
        <div className="flex-1 px-8 py-8 mx-auto w-full max-w-[1050px]">
          {children}
        </div>
      </main>
    </div>
  )
}
