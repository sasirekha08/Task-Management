import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import ReactPaginate from 'react-paginate'

import { getTasks } from '../handlers/storageHandlers'
import { Todo } from '../models/model'
import '../styles/styles.css'
import SingleTodo from './SingleTodo'

interface Props {
    todoList: Todo[]
    isDark: boolean
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList: React.FC<Props> = ({ todoList, isDark, setTodoList }) => {
    const [paginatedItems, setPaginatedItems] = useState<Todo[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [itemOffset, setItemOffset] = useState<number>(0)

    const itemsPerPage: number = 5

    useEffect(() => {
        let taskList = getTasks()
        if (taskList && taskList?.length > 0) {
            setTodoList(taskList)
        }
    }, [setTodoList])

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage

        setPaginatedItems(todoList.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(todoList.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, todoList, todoList.length])

    const handlePageClick = (selectedItem: { selected: number }): void => {
        let newOffset = (selectedItem?.selected * itemsPerPage) % todoList?.length
        setItemOffset(newOffset)
        setCurrentPage(selectedItem?.selected)
    }

    return (
        <>
            <div className='items-center hidden w-full grid-cols-3 px-4 py-2 mt-8 mb-3 text-white rounded-md gap-x-2 bg-secondary dark:bg-dark-secondary drop-shadow-lg xs:grid'>
                <span className='justify-self-start '>Task Title </span>
                <span className='justify-self-center'>Time Required (in hours)</span>
                <span className='justify-self-end'>Action</span>
            </div>
            <div className='mb-16'>
                {paginatedItems?.length > 0 ? (
                    <AnimatePresence>
                        {paginatedItems.map((data) => {
                            return (
                                <SingleTodo
                                    key={data?.id}
                                    task={data}
                                    todoList={todoList}
                                    paginatedItems={paginatedItems}
                                    itemOffset={itemOffset}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    setTodoList={setTodoList}
                                    setItemOffset={setItemOffset}
                                    setPaginatedItems={setPaginatedItems}
                                    setCurrentPage={setCurrentPage}
                                />
                            )
                        })}
                    </AnimatePresence>
                ) : (
                    <div className='pt-20 text-lg font-medium text-center xs:mt-0 dark:text-white'>
                        You've completed all your tasks!
                    </div>
                )}
            </div>
            {todoList?.length > itemsPerPage && (
                <ReactPaginate
                    previousLabel={<BiSkipPrevious className='inline' />}
                    nextLabel={<BiSkipNext className='inline' />}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    forcePage={currentPage}
                    pageClassName={`${isDark ? 'dark-page-item ' : 'page-item'}`}
                    pageLinkClassName={`${isDark ? 'dark-page-link ' : 'page-link'}`}
                    previousClassName={`${isDark ? 'dark-previous-item ' : 'previous-item'}`}
                    previousLinkClassName={`${isDark ? 'dark-previous-link ' : 'previous-link'}`}
                    nextClassName={`${isDark ? 'dark-next-item ' : 'next-item'}`}
                    nextLinkClassName={`${isDark ? 'dark-next-link ' : 'next-link'}`}
                    activeClassName='active'
                    breakLabel='...'
                    breakClassName={`${isDark ? 'dark-page-item ' : 'page-item'}`}
                    breakLinkClassName={`${isDark ? 'dark-page-link ' : 'page-link'}`}
                    containerClassName={'flex pagination justify-end absolute bottom-5 right-5 mt-10 '}
                />
            )}
        </>
    )
}

export default TodoList
