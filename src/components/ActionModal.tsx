import { motion } from 'framer-motion'
import React, { useEffect } from 'react'

import { Modal, Todo } from '../models/model'

interface Props {
    task: Todo
    actionModal: Modal
    editTodoTitle: string
    editTodoHours: number | null
    editTitleError: string
    editHoursError: string
    setEditTodoTitle: React.Dispatch<React.SetStateAction<string>>
    setEditTodoHours: React.Dispatch<React.SetStateAction<number | null>>
    setEditTitleError: React.Dispatch<React.SetStateAction<string>>
    setEditHoursError: React.Dispatch<React.SetStateAction<string>>
    setActionModal: React.Dispatch<React.SetStateAction<Modal>>
    handleDelete: (id: string) => void
    handleEdit: (task: Todo) => void
}

const ActionModal: React.FC<Props> = ({
    task,
    actionModal,
    editTodoTitle,
    editTodoHours,
    editTitleError,
    editHoursError,
    setEditTodoTitle,
    setEditTodoHours,
    setEditTitleError,
    setEditHoursError,
    setActionModal,
    handleDelete,
    handleEdit,
}) => {
    useEffect(() => {
        if (actionModal.type === 'edit') {
            setEditTodoTitle(task?.title)
            setEditTodoHours(task?.hours)
        }
    }, [actionModal.type, setEditTodoHours, setEditTodoTitle, task])
    return (
        <section
            id='modal-background'
            className=' fixed bottom-0 left-0 top-0 z-[1000] flex  w-full items-center justify-center overflow-y-hidden bg-gray-500 bg-opacity-75 backdrop-blur '>
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                exit={{ opacity: 0, y: 16 }}
                id='modal'
                className='relative mx-auto w-[90%] max-w-[25rem] rounded-lg border bg-white p-4 drop-shadow-md lg:w-full lg:p-6 '>
                {actionModal.type === 'delete' ? (
                    <div className='mt-8'>
                        <p className='font-medium '>
                            Are you sure you want to delete <span className='break-all'>"{task?.title}"</span>{' '}
                            task?
                        </p>
                    </div>
                ) : (
                    <div className='flex flex-col mt-8'>
                        <div className='w-full '>
                            <label className='font-medium'>
                                Updated Title
                                <span className='text-sm font-normal'>
                                    ({editTodoTitle.trim().length}/128)
                                </span>
                            </label>
                            <input
                                className='w-full p-2 border border-gray-500 rounded outline-none'
                                type='text'
                                value={editTodoTitle}
                                onChange={(e) => {
                                    setEditTodoTitle(e.target.value)
                                    setEditTitleError('')
                                }}
                            />
                        </div>
                        <div className='w-full mt-4'>
                            <label className='font-medium'>
                                Updated Time Required (in Hours)
                                <span className='text-sm font-normal'>[0-24]</span>
                            </label>
                            <input
                                className='w-full p-2 border border-gray-500 rounded outline-none'
                                type='number'
                                min={0}
                                max={24}
                                value={editTodoHours ?? ''}
                                onChange={(e) => {
                                    setEditTodoHours(parseInt(e.target.value))
                                    setEditHoursError('')
                                }}
                            />
                        </div>
                    </div>
                )}
                {actionModal.type === 'edit' && (
                    <p className='mt-4 text-sm text-red-600'>
                        {editTitleError} {editHoursError}
                    </p>
                )}
                <div className='flex justify-end mt-16 rounded-b-md '>
                    <button
                        type='button'
                        className='px-4 py-2 text-sm font-medium leading-normal uppercase transition duration-150 ease-in-out bg-white border rounded outline-none border-secondary text-secondary hover:shadow-md hover:shadow-secondary'
                        onClick={() => setActionModal({ isOpen: false, type: '' })}>
                        Cancel
                    </button>
                    <button
                        type='button'
                        className='px-4 py-2 ml-2 text-sm font-medium leading-normal text-white uppercase transition duration-150 ease-in-out bg-red-600 border border-transparent rounded outline-none hover:shadow-md'
                        onClick={() => {
                            actionModal.type === 'delete' ? handleDelete(task?.id) : handleEdit(task)
                        }}>
                        {actionModal.type === 'delete' ? 'Delete' : 'Save Changes'}
                    </button>
                </div>
            </motion.div>
        </section>
    )
}

export default ActionModal
