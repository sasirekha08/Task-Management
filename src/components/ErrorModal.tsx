import { motion } from 'framer-motion'
import React from 'react'
import { AiFillWarning, AiOutlineClose } from 'react-icons/ai'

interface Props {
    titleError: string
    hoursError: string
    handleCloseErrorModal: () => void
}

const ErrorModal: React.FC<Props> = ({ titleError, hoursError, handleCloseErrorModal }) => {
    return (
        <section
            id='modal-background'
            className=' fixed bottom-0 left-0 top-0 z-[1000] flex w-full items-center justify-center overflow-y-hidden bg-gray-500 bg-opacity-75 backdrop-blur '>
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                exit={{ opacity: 0, y: 16 }}
                className=' relative mx-auto w-[90%] max-w-[25rem] rounded-lg bg-[#f7f7f7] p-4 lg:w-full lg:p-6 '>
                <div className='absolute top-0 right-0 p-3 '>
                    <AiOutlineClose
                        onClick={handleCloseErrorModal}
                        className='text-lg cursor-pointer text-newBrandRed'
                    />
                </div>
                <div className='my-8 '>
                    <p className='flex items-center justify-center w-full font-bold'>
                        <span className='mr-2 text-2xl text-red-600'>
                            <AiFillWarning />
                        </span>
                        <span>
                            {titleError}
                            {hoursError}
                        </span>
                    </p>
                </div>
            </motion.div>
        </section>
    )
}

export default ErrorModal
