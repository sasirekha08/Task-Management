import { Todo } from '../models/model'

export const setTasks = (todoList: Todo[]): void => {
    localStorage.setItem('taskList', JSON.stringify(todoList))
}

export const getTasks = (): Todo[] | null => {
    let tasks = localStorage.getItem('taskList')
    if (tasks && tasks?.length > 0) {
        return JSON.parse(tasks)
    }
    return null
}

export const editTask = (updatedList: Todo[]) => {
    localStorage.setItem('taskList', JSON.stringify([...updatedList]))
}

export const deleteTask = (filteredList: Todo[]) => {
    localStorage.setItem('taskList', JSON.stringify([...filteredList]))
}
