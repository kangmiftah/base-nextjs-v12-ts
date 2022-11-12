import React, { FC } from 'react';
import Navbar from './nav';
import Sidebar from './side';
export default function Layout<FC>(page : React.ReactElement) {

    return <>
        <div className='relative min-h-full max-h-full w-height overflow-hidden'>
            <Navbar />
            <Sidebar />
            <div className='
                    md:ml-[250px] 
                    bg-[#f4f6f9] 
                    relative 
                    block  
                    ease-in-out duration-300
                    mt-[50px]
                    overflow-y-auto
                    overflow-x-hidden
                    height-root-content
                '>
                {/* <div className='mt-20 w-full  p-4 overflow-y-auto bg-gray-300  ease-in-out duration-300'> */}
                {/* <div className='flex items-center justify-center p-40 border-4 border-dotted'> */}
                <div className='pt-10 px-5 container block flex-1'>

                    {page}
                </div>
                {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    </>
}