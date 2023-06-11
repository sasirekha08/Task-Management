import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

import { deleteTask, editTask } from '../handlers/storageHandlers'
import { Modal, Todo } from '../models/model'
import ActionModal from './ActionModal'

interface Props {
    task: Todo
    todoList: Todo[]
    paginatedItems: Todo[]
    itemOffset: number
    itemsPerPage: number
    currentPage: number
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
    setItemOffset: React.Dispatch<React.SetStateAction<number>>
    setPaginatedItems: React.Dispatch<React.SetStateAction<Todo[]>>
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const SingleTodo: React.FC<Props> = ({
    task,
    todoList,
    paginatedItems,
    itemOffset,
    itemsPerPage,
    currentPage,
    setTodoList,
    setItemOffset,
    setPaginatedItems,
    setCurrentPage,
}) => {
    const [actionModal, setActionModal] = useState<Modal>({
        isOpen: false,
        type: '',
    })
    const [editTodoTitle, setEditTodoTitle] = useState<string>('')
    const [editTodoHours, setEditTodoHours] = useState<number | null>(null)
    const [editTitleError, setEditTitleError] = useState<string>('')
    const [editHoursError, setEditHoursError] = useState<string>('')

    const handleDelete = (id: string) => {
        let filteredData = todoList.filter((data) => data.id !== id)
        let filteredPaginatedData = paginatedItems.filter((data) => data.id !== id)
        let newOffset =
            filteredPaginatedData?.length > 0
                ? itemOffset
                : itemOffset >= itemsPerPage
                ? itemOffset - itemsPerPage
                : 0
        let updatedPage =
            filteredPaginatedData?.length > 0 ? currentPage : itemOffset >= itemsPerPage ? currentPage - 1 : 0

        setItemOffset(newOffset)
        setCurrentPage(updatedPage)
        setTodoList(filteredData)
        setPaginatedItems(filteredPaginatedData)
        deleteTask(filteredData)
        setActionModal({ isOpen: false, type: '' })
    }

    const handleEdit = (task: Todo) => {
        if (editTodoTitle && editTodoHours) {
            if (!(editTodoTitle.trim().length <= 128)) {
                setEditTitleError("Updated title's character length should not exceed 128 characters")
            } else if (!(editTodoHours > 0 && editTodoHours <= 24)) {
                setEditHoursError('Updated time required should range between 0-24 hours')
            } else {
                let edit = todoList.map((data) =>
                    data.id === task?.id ? { ...data, title: editTodoTitle, hours: editTodoHours } : data,
                )
                editTask([...edit])
                setTodoList([...edit])
                setActionModal({ isOpen: false, type: '' })
            }
        } else {
            if (!editTodoTitle) {
                setEditTitleError('Please fill the updated title field')
            } else if (!editTodoHours) {
                setEditHoursError('Please fill the updated time required field')
            }
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                key={task?.id}
                className='items-center hidden w-full grid-cols-3 px-4 py-2 mb-3 bg-white rounded-md gap-x-2 drop-shadow-md xs:grid'>
                <span className='break-all justify-self-start'>{task?.title}</span>
                <span className='justify-self-center'>{task?.hours} hours</span>
                <span className='flex text-2xl justify-self-end '>
                    <span
                        title='Click to delete task'
                        className='mr-1 text-red-600 hover:cursor-pointer'
                        onClick={() => setActionModal({ isOpen: true, type: 'delete' })}>
                        <AiFillDelete />
                    </span>
                    <span
                        title='Click to edit task'
                        className='text-gray-500 hover:cursor-pointer'
                        onClick={() => setActionModal({ isOpen: true, type: 'edit' })}>
                        <AiFillEdit />
                    </span>
                </span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                key={task?.id}
                className='flex w-full mt-4 mb-2 xs:hidden'>
                <div className='w-full p-4 mb-1 bg-white border rounded-md drop-shadow-md'>
                    <div className='flex flex-col'>
                        <label className='text-sm font-semibold'>Task Title</label>
                        <span className='break-all'>{task?.title}</span>
                    </div>
                    <div className='flex flex-row justify-between mt-4 '>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Task Hours</label>
                            <span className='justify-flex-start'>{task?.hours} hours</span>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Task Action</label>
                            <span className='mt-0.5 flex justify-end text-2xl'>
                                <span
                                    className='mr-1 text-red-600 hover:cursor-pointer'
                                    onClick={() => setActionModal({ isOpen: true, type: 'delete' })}>
                                    <AiFillDelete />
                                </span>
                                <span
                                    className='text-gray-500 hover:cursor-pointer'
                                    onClick={() => setActionModal({ isOpen: true, type: 'edit' })}>
                                    <AiFillEdit />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {actionModal?.isOpen && (
                    <ActionModal
                        task={task}
                        actionModal={actionModal}
                        editTodoTitle={editTodoTitle}
                        editTodoHours={editTodoHours}
                        editTitleError={editTitleError}
                        editHoursError={editHoursError}
                        setEditTodoTitle={setEditTodoTitle}
                        setEditTodoHours={setEditTodoHours}
                        setEditTitleError={setEditTitleError}
                        setEditHoursError={setEditHoursError}
                        setActionModal={setActionModal}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default SingleTodo
