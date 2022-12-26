import React, { useEffect } from 'react';

export const useOutside = (ref: any, refTrigger:any, callback : Function, typeListener = 'mousedown') => {
    return useEffect(() => {
        const handleOutside = (e: any) => {
            if (ref && !ref?.contains(e.target) && !refTrigger?.contains(e.target)) {
                callback();
            }
        };

        document.addEventListener(typeListener, handleOutside);

        return () => {
            document.removeEventListener(typeListener, handleOutside);
        };
    });
};
