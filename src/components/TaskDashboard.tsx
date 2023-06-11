import React from 'react'

import { Todo } from '../models/model'
import TaskAnalytics from './TaskAnalytics'
import TodoList from './TodoList'

interface Props {
    todoList: Todo[]
    isDark: boolean
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TaskDashboard: React.FC<Props> = ({ todoList, isDark, setTodoList }) => {
    return (
        <>
            <TaskAnalytics todoList={todoList} isDark={isDark} />
            <TodoList todoList={todoList} isDark={isDark} setTodoList={setTodoList} />
        </>
    )
}

export default TaskDashboard
