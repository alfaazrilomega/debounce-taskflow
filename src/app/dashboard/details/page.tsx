import { getTasks } from '@/actions/tasks'
import { AuditDetailsTable } from './audit-details-table'

export const dynamic = 'force-dynamic'

export default async function DetailsPage() {
  const tasks = await getTasks()

  return (
    <div className="space-y-6 font-satoshi">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl font-satoshi">
          Task Audit Details & Time-Travel History
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-outfit">
          Tabel rincian tugas komprehensif. Klik baris mana saja untuk membuka drawer sejarah waktu (*Time-Travel Audit*) PostgreSQL.
        </p>
      </div>

      {/* Interactive Audit Details Table & Time-Travel History Drawer */}
      <AuditDetailsTable tasks={tasks as any} />
    </div>
  )
}
