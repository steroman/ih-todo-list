import { supabase } from '@/lib/supabaseClient'

const TABLE_NAME = 'tasks'

export const fetchTasks = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*')
  if (error) {
    throw new Error(error.message)
  } else {
    // console.log(data)
    return data
  }
}

export const createTask = async (task) => {
  const { data, error } = await supabase.from(TABLE_NAME).insert(task).select()
  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

export const updateTask = async (task) => {
  const { data, error } = await supabase.from(TABLE_NAME).update(task).eq('id', task.id).select()
  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

export const deleteTask = async (task) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', task.id)
  if (error) {
    throw new Error(error.message)
  }
}
