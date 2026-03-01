import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ADMIN_TOKEN = process.env.ANALYTICS_ADMIN_TOKEN || 'portfolio-analytics-2025-secure-token'

export async function DELETE(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Analytics storage is not configured' },
        { status: 503 }
      )
    }
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the event ID from the request body
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 })
    }

    // Delete the specific event from Supabase
    const { error } = await supabase
      .from('analytics_events')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Event deleted successfully' 
    })

  } catch (error) {
    console.error('Delete analytics event error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}