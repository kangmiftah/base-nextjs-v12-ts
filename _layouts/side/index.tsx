import React, {FC} from 'react';

export default function Sidebar<FC>(){
    return(
            <div className='fixed shadow-md -translate-x-full md:translate-x-0 bg-blue-500 top-0 w-[250px] h-screen py-1 px-3 overflow-y-auto border-r ease-in-out duration-300'>
                <div className=' text-center font-mono border-b-2 pb-3 mb-1'>
                    <h1 className='text-2xl font-semibold text-white'>AranUI</h1>
                </div>
               
            </div>
    )
}