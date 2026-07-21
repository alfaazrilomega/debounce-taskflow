import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as any
  const next = searchParams.get('next') ?? '/dashboard'
  const error = searchParams.get('error')
  const error_code = searchParams.get('error_code')
  const error_description = searchParams.get('error_description')

  if (error || error_code) {
    console.error('Auth callback error:', error, error_description)
    const errorMsg = encodeURIComponent(error_description || 'Email confirmation link expired or invalid.')
    return NextResponse.redirect(`${origin}/login?error=${errorMsg}`)
  }

  const supabase = await createClient()

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error('Exchange code error:', exchangeError.message)
      const errorMsg = encodeURIComponent(exchangeError.message)
      return NextResponse.redirect(`${origin}/login?error=${errorMsg}`)
    }
  }

  if (token_hash && type) {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type
    })
    if (!verifyError) {
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error('Verify OTP error:', verifyError.message)
      const errorMsg = encodeURIComponent(verifyError.message)
      return NextResponse.redirect(`${origin}/login?error=${errorMsg}`)
    }
  }

  // Fallback redirect if no code or token_hash was provided
  return NextResponse.redirect(`${origin}/login?confirmed=true`)
}
