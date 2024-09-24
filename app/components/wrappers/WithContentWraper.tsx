import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface WithContentWrapperProps {
    children: ReactNode;
    className?: string;
}

const WithContentWrapper = ({ children, className }: WithContentWrapperProps) => {
    return (
        <div className={twMerge('md:p-14 sm:p-8 p-6', className)}>{children}</div>
    );
};

export default WithContentWrapper;
