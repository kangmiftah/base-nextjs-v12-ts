import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { layoutStateType } from '../../@types/redux';
import { layoutActions, layoutSelector } from '../../redux/slices/layouts/layoutSlice';
import Navbar from './nav';
import Sidebar from './side';
export default function Layout<FC>(page : React.ReactElement) {
    const layoutState : layoutStateType = useSelector(layoutSelector)
    const dispatch = useDispatch();
    let cn = classNames({
        "md:ml-[250px]" : layoutState.sidebarOpen,
        "md:ml-[0px]" : !layoutState.sidebarOpen,
        // "ml-[250px]" : !layoutState.sidebarOpen,
        // "ml-0" : layoutState.sidebarOpen,
        "max-md:blur-sm": !layoutState.sidebarOpen
    })
    return <>
        <div className='relative min-h-full max-h-full w-height overflow-hidden'>
            <Navbar />
            <Sidebar />
            <div className={`
                    ${cn}
                    bg-[#f4f6f9] 
                    relative 
                    block  
                    ease-in-out duration-300
                    mt-[50px]
                    overflow-y-auto
                    overflow-x-hidden
                    height-root-content
                `}>
                {/* <div className='mt-20 w-full  p-4 overflow-y-auto bg-gray-300  ease-in-out duration-300'> */}
                {/* <div className='flex items-center justify-center p-40 border-4 border-dotted'> */}
                <div className='pt-10 px-5 container block flex-1 overflow-y-auto'>
                    {page}
                </div>
                {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    </>
}