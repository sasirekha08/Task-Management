import React from 'react'

interface Props {
    todoTitle: string
    todoHours: number | null
    setTodoTitle: React.Dispatch<React.SetStateAction<string>>
    setTodoHours: React.Dispatch<React.SetStateAction<number | null>>
    handleAdd: (e: React.FormEvent) => void
}
const InputField: React.FC<Props> = ({ todoTitle, todoHours, setTodoTitle, setTodoHours, handleAdd }) => {
    return (
        <section className='flex flex-col w-full '>
            <form
                className='flex flex-col justify-between sm:flex-row sm:space-x-3'
                onSubmit={(e) => handleAdd(e)}>
                <div className='flex flex-col w-full'>
                    <label className='font-medium dark:text-white'>
                        Task Title{' '}
                        <span className='text-sm font-normal'>({todoTitle.trim().length}/128)</span>
                    </label>
                    <input
                        className='w-full p-2 border border-gray-500 rounded outline-none'
                        type='text'
                        required
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full mt-4 sm:mt-0'>
                    <label className='font-medium dark:text-white'>
                        Time Required (in Hours) <span className='text-sm font-normal'>[0-24]</span>
                    </label>
                    <input
                        className='w-full p-2 border border-gray-500 rounded outline-none'
                        type='number'
                        required
                        value={todoHours ?? ''}
                        onChange={(e) => setTodoHours(parseInt(e.target.value))}
                    />
                </div>
                <button
                    type='submit'
                    title='Click to add task'
                    className='py-2 mt-6 font-bold text-white transition-all duration-150 rounded bg-secondary dark:bg-dark-secondary hover:shadow-md hover:shadow-primary dark:hover:shadow-dark-primary sm:px-4 sm:py-0'>
                    Add
                </button>
            </form>
        </section>
    )
}

export default InputField
