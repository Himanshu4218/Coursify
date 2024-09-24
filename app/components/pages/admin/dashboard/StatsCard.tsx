import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface StatsCardProps {
    label: string;
    count: string | number;
    icon: ReactNode;
    iconClass?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    label = "",
    count = "",
    iconClass = "",
    icon
}) => {
    return (
        <div className='rounded-xl grow shrink bg-white flex items-center gap-5 p-6 shadow-custom-light'>
            <div className={twMerge(' rounded-full w-14 h-14 grid place-items-center', iconClass)}>
                <div className='text-3xl'>
                    {icon}
                </div>
            </div>
            <div>
                <h4 className='text-sm text-greyPrimary'>{label}</h4>
                <h5 className='text-2xl text-blackPrimary font-semibold'>{count}</h5>
            </div>
        </div>
    )
}

export default StatsCard;