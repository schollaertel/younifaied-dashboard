import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kugyztiwixrsbtjpewrd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1Z3l6dGl3aXhyc2J0anBld3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTAxMDMsImV4cCI6MjA2NTgyNjEwM30.SgKuehmL7L_4ApdHU9aE786lDGYAZFYr-wk01MqK-Wc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey  )

export const createContentRequest = async (requestData) => {
  try {
    const { data, error } = await supabase
      .from('content_requests')
      .insert([requestData])
      .select()
      .single()

    if (error) {
      // Return the full error object for detailed debugging
      return { success: false, error: error }; 
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error creating content request in supabase.js:', error)
    // Return the full error object for detailed debugging
    return { success: false, error: error }
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

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creating workflow execution:', error)
    return { success: false, error: error.message }
  }
}

export const getBlotatoAccountIds = async () => {
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

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error saving Blotato results:', error)
    return { success: false, error: error.message }
  }
}
