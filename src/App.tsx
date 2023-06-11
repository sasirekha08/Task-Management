import React, { useState } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import ErrorModal from './components/ErrorModal'
import InputField from './components/InputField'
import TaskDashboard from './components/TaskDashboard'
import { setTasks } from './handlers/storageHandlers'
import { Todo } from './models/model'

const App: React.FC = () => {
    const [todoTitle, setTodoTitle] = useState<string>('')
    const [todoHours, setTodoHours] = useState<number | null>(null)
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [titleError, setTitleError] = useState<string>('')
    const [hoursError, setHoursError] = useState<string>('')
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false)
    const [isDark, setIsDark] = useState<boolean>(false)

    const handleCloseErrorModal = (): void => {
        setTitleError('')
        setHoursError('')
        setIsErrorModalOpen(false)
    }
    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault()

        if (todoTitle && todoHours) {
            if (!(todoTitle.trim().length <= 128)) {
                setTitleError("Task title's character length should not exceed 128 characters")
                setIsErrorModalOpen(true)
            } else if (!(todoHours > 0 && todoHours <= 24)) {
                setHoursError('Time required should range between 0-24 hours')
                setIsErrorModalOpen(true)
            } else {
                let newTaskList = [
                    { id: uuidv4(), title: todoTitle, hours: todoHours, isDone: false },
                    ...todoList,
                ]
                setTodoList(newTaskList)
                setTasks(newTaskList)
                setTodoTitle('')
                setTodoHours(null)
            }
        } else {
            if (!todoTitle) {
                setTitleError('Please fill the task title field')
                setIsErrorModalOpen(true)
            } else if (!todoHours) {
                setHoursError('Please fill the time required field')
                setIsErrorModalOpen(true)
            }
        }
    }

    return (
        <section className={`${isDark && 'dark'}`}>
            <div className='flex min-h-[100vh] w-full flex-col items-center overflow-hidden bg-primary dark:bg-black pt-6'>
                <div className='relative flex justify-center w-11/12 sm:w-full sm:max-w-[45rem]'>
                    <h1 className='z-10 text-2xl font-bold text-secondary dark:text-dark-secondary sm:text-3xl'>
                        Task Management App
                    </h1>
                    <span className='absolute right-0 mt-1.5 text-2xl sm:text-3xl'>
                        {isDark ? (
                            <MdLightMode
                                title='Click to enable light mode'
                                className='text-white cursor-pointer'
                                onClick={() => setIsDark(!isDark)}
                            />
                        ) : (
                            <MdDarkMode
                                title='Click to enable dark mode'
                                className='text-black cursor-pointer'
                                onClick={() => setIsDark(!isDark)}
                            />
                        )}
                    </span>
                </div>
                <div className='mx-auto mt-10 w-11/12 rounded-md bg-white dark:bg-dark-primary p-6 shadow-md sm:w-full sm:max-w-[45rem] '>
                    <InputField
                        todoTitle={todoTitle}
                        todoHours={todoHours}
                        setTodoTitle={setTodoTitle}
                        setTodoHours={setTodoHours}
                        handleAdd={handleAdd}
                    />
                </div>
                <div className='relative mx-auto my-6 min-h-[35rem] w-11/12 max-w-[45rem] rounded-md bg-white dark:bg-dark-primary p-6 shadow-md sm:w-full'>
                    <TaskDashboard todoList={todoList} isDark={isDark} setTodoList={setTodoList} />
                </div>

                {isErrorModalOpen && (
                    <ErrorModal
                        titleError={titleError}
                        hoursError={hoursError}
                        handleCloseErrorModal={handleCloseErrorModal}
                    />
                )}
            </div>
        </section>
    )
}

export default App
