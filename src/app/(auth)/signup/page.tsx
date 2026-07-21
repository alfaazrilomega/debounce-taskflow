import { SignupForm } from '@/components/auth/signup-form'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
