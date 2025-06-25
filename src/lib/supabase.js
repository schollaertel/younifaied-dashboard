import { createClient } from '@supabase/supabase-js'

// ✅ Pull from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ✅ Best practice: export a single client instance
const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase

// ✅ Other helper functions below
export const createContentRequest = async (requestData) => {
  try {
    const { data, error } = await supabase
      .from('content_requests')
      .insert([requestData])
      .select()
      .single()

    if (error) return { success: false, error }
    return { success: true, data }
  } catch (error) {
    console.error('Error creating content request in supabase.js:', error)
    return { success: false, error }
  }
}

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
        status: 'pending'
      }])
      .select()
      .single()

    if (error) return { success: false, error }
    return { success: true, data }
  } catch (error) {
    console.error('Error creating workflow execution:', error)
    return { success: false, error }
  }
}

export const getBlotatoAccountIds = async () => {
  try {
    const { data, error } = await supabase
      .from('blotato_accounts')
      .select('account_ids')
      .eq('id', 1)
      .single()

    if (error) return { success: false, error }
    return { success: true, data: data?.account_ids || {} }
  } catch (error) {
    console.error('Error fetching Blotato account IDs:', error)
    return { success: false, error }
  }
}

export const saveBlotatoResults = async (workflowExecutionId, blotatoResults) => {
  try {
    const { data, error } = await supabase
      .from('blotato_results')
      .insert([{
        workflow_execution_id: workflowExecutionId,
        platform_results: blotatoResults.results,
        summary: blotatoResults.summary,
        success: blotatoResults.success
      }])
      .select()
      .single()

    if (error) return { success: false, error }
    return { success: true, data }
  } catch (error) {
    console.error('Error saving Blotato results:', error)
    return { success: false, error }
  }
}
