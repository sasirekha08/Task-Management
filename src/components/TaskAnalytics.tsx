import { motion } from 'framer-motion'
import React from 'react'

import { Todo } from '../models/model'

interface Props {
    todoList: Todo[]
    isDark: boolean
}

const TaskAnalytics: React.FC<Props> = ({ todoList, isDark }) => {
    const getTotalDays = () =>
        (todoList?.map((i) => i.hours).reduce((a, b) => a + b) / 8).toFixed(2).replace(/\.00$/, '')

    const getTotalHours = () =>
        todoList?.length > 0 ? todoList?.map((i) => i.hours).reduce((a, b) => a + b) : 0

    return (
        <>
            <div className='flex-row justify-between hidden space-x-10 xs:flex'>
                <div className='flex flex-col items-center w-full p-4 border rounded-md shadow-sm dark:bg-black'>
                    <label className='font-medium dark:text-white '>Total Tasks</label>
                    <motion.p
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.25 }}
                        exit={{ opacity: 0, y: 16 }}
                        key={todoList?.length + 1}
                        className='mt-1 text-3xl font-bold dark:text-white'>
                        {todoList?.length}
                    </motion.p>
                </div>
                <div className='flex flex-col items-center w-full p-4 border rounded-md shadow-sm dark:bg-black'>
                    <label className='font-medium dark:text-white '>Total Days</label>
                    <motion.p
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.25 }}
                        exit={{ opacity: 0, y: 16 }}
                        key={todoList?.length + 2}
                        className='mt-1 text-3xl font-bold dark:text-white '>
                        {todoList?.length > 0 ? getTotalDays() : 0}
                    </motion.p>
                </div>
                <div className='flex flex-col items-center w-full p-4 border rounded-md shadow-sm dark:bg-black'>
                    <label className='font-medium dark:text-white'>Total Hours</label>
                    <motion.p
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.25 }}
                        exit={{ opacity: 0, y: 16 }}
                        key={todoList?.length + 3}
                        className='mt-1 text-3xl font-bold dark:text-white '>
                        {getTotalHours()}
                    </motion.p>
                </div>
            </div>
            <div className='flex flex-wrap justify-evenly xs:hidden'>
                <span className='mb-3 flex w-[10rem] items-center justify-center rounded-md border border-secondary bg-primary dark:bg-black dark:text-white dark:border-white py-2 font-medium tracking-wide'>
                    <span>Total Tasks:</span>
                    <span className='ml-1 text-xl font-bold'> {todoList?.length}</span>
                </span>
                <span className='mb-3 flex w-[10rem] items-center justify-center rounded-md border border-secondary bg-primary dark:bg-black dark:text-white dark:border-white py-2 font-medium tracking-wide'>
                    <span>Total Days:</span>
                    <span className='ml-1 text-xl font-bold'>
                        {todoList?.length > 0 ? getTotalDays() : 0}
                    </span>
                </span>
                <span className='mb-3 flex w-[10rem] items-center justify-center rounded-md border border-secondary bg-primary dark:bg-black dark:text-white dark:border-white py-2 font-medium tracking-wide'>
                    <span>Total Hours:</span>
                    <span className='ml-1 text-xl font-bold'> {getTotalHours()}</span>
                </span>
            </div>
        </>
    )
}

export default TaskAnalytics
