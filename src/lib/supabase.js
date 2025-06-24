import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kugyztiwixrsbtjpewrd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1Z3l6dGl3aXhyc2J0anBld3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTAxMDMsImV4cCI6MjA2NTgyNjEwM30.SgKuehmL7L_4ApdHU9aE786lDGYAZFYr-wk01MqK-Wc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey )

// Content Request Functions
export const createContentRequest = async (requestData) => {
  try {
    const { data, error } = await supabase
      .from('content_requests')
      .insert([requestData])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creating content request:', error)
    return { success: false, error: error.message }
  }
}

export const updateContentRequestStatus = async (id, status, workflowData = null) => {
  try {
    const updateData = { status }
    if (workflowData) {
      updateData.workflow_data = workflowData
    }

    const { data, error } = await supabase
      .from('content_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error updating content request:', error)
    return { success: false, error: error.message }
  }
}

export const getContentRequests = async (filters = {}) => {
  try {
    let query = supabase
      .from('content_requests')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.content_type) {
      query = query.eq('content_type', filters.content_type)
    }
    if (filters.priority) {
      query = query.eq('priority', filters.priority)
    }

    const { data, error } = await query

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching content requests:', error)
    return { success: false, error: error.message }
  }
}

// Workflow Functions
export const createWorkflowExecution = async (workflowData) => {
  try {
    const { data, error } = await supabase
      .from('workflow_executions')
      .insert([{
        content_request_id: workflowData.content_request_id,
        workflow_id: workflowData.workflowId,
        workflow_type: workflowData.workflowType,
        platform_requirements: workflowData.platformRequirements,
        estimated_time: workflowData.estimatedTime,
        status: 'pending',
        blotato_config: workflowData.blotato
      }])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creating workflow execution:', error)
    return { success: false, error: error.message }
  }
}

export const updateWorkflowExecution = async (id, updateData) => {
  try {
    const { data, error } = await supabase
      .from('workflow_executions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error updating workflow execution:', error)
    return { success: false, error: error.message }
  }
}

// Blotato Integration Functions
export const saveBlotato Results = async (workflowExecutionId, blotato Results) => {
  try {
    const { data, error } = await supabase
      .from('blotato_results')
      .insert([{
        workflow_execution_id: workflowExecutionId,
        platform_results: blotato Results.results,
        summary: blotato Results.summary,
        success: blotato Results.success,
        error_message: blotato Results.error || null
      }])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving Blotato results:', error)
    return { success: false, error: error.message }
  }
}

export const getBlotato Results = async (workflowExecutionId) => {
  try {
    const { data, error } = await supabase
      .from('blotato_results')
      .select('*')
      .eq('workflow_execution_id', workflowExecutionId)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching Blotato results:', error)
    return { success: false, error: error.message }
  }
}

// Account Management Functions
export const saveBlotato AccountIds = async (accountIds) => {
  try {
    const { data, error } = await supabase
      .from('blotato_accounts')
      .upsert([{
        id: 1, // Single row for account IDs
        account_ids: accountIds,
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving Blotato account IDs:', error)
    return { success: false, error: error.message }
  }
}

export const getBlotato AccountIds = async () => {
  try {
    const { data, error } = await supabase
      .from('blotato_accounts')
      .select('account_ids')
      .eq('id', 1)
      .single()

    if (error) throw error
    return { success: true, data: data?.account_ids || {} }
  } catch (error) {
    console.error('Error fetching Blotato account IDs:', error)
    return { success: false, error: error.message }
  }
}

// Analytics Functions
export const getContentAnalytics = async (dateRange = 30) => {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - dateRange)

    const { data, error } = await supabase
      .from('content_requests')
      .select(`
        id,
        content_type,
        status,
        priority,
        created_at,
        platforms,
        workflow_executions (
          id,
          status,
          estimated_time,
          completed_at,
          blotato_results (
            success,
            summary
          )
        )
      `)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching content analytics:', error)
    return { success: false, error: error.message }
  }
}

// Utility Functions
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('content_requests')
      .select('count')
      .limit(1)

    if (error) throw error
    return { success: true, message: 'Supabase connection successful' }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return { success: false, error: error.message }
  }
}
