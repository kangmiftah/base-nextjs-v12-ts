import { FC } from 'react';
// import { layoutActions } from '../../slices/layouts/layoutSlice';
import type { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { layoutStateType } from '../../../@types/redux/slices/layouts/layoutSlice';
import { layoutActions } from '../../../redux/slices/layouts/layoutSlice';
import classNames from 'classnames';

export default function Navbar<FC>() {
    // const toggleSidebar = 
    const layoutState : layoutStateType = useSelector((state: RootState) => state.layout)
    const dispatch = useDispatch();
    let cn = classNames({
        "md:ml-[250px]" : layoutState.sidebarOpen,
        "md:ml-[0px]" : !layoutState.sidebarOpen,
        "ml-[250px]" : !layoutState.sidebarOpen,
        "ml-0" : layoutState.sidebarOpen
    })
    return (
        <div className={`fixed bg-navbar z-10 top-0 ${cn} w-full bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.3)] h-[50px]  ease-in-out duration-300`}>
            <div className='flex justify-between items-center md:space-x-10'>
                <div className='flex justify-start mr-2 my-1 align-middle'>

                    <button id="sidebar" onClick={ ()=> {
                        dispatch(layoutActions.toggleSidebar()) 
                    }} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                        <span id="sidebar" className="sr-only">Open menu</span>

                        <svg id="sidebar" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    )
}