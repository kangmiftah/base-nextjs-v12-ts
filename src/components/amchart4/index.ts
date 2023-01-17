import dynamic from 'next/dynamic';

export const Doughnut = dynamic(() => import('./doughnat'), { ssr: false });
export const Bar = dynamic(() => import('./bar'), { ssr: false });