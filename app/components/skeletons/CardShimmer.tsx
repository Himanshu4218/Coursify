import React from "react";

const CardShimmer = ({ size }: { size: number }) => {
    return (
        <div>
            {[...Array(size)].map((_, i) => {
                return (
                    <div
                        className="border mb-1 border-gray-200 rounded-md grid grid-cols-[.9fr,3fr] p-3 w-11/12 gap-2"
                        key={i}
                    >
                        <div className="h-20 w-20 rounded-md border shimmer-anim"></div>
                        <div className="w-auto my-auto">
                            <div className="rounded-md h-3 w-full bg-greyMedium mb-2 shimmer-anim"></div>
                            <div className="rounded-md h-3 w-3/4 bg-greyMedium mb-2 shimmer-anim"></div>
                            <div className="rounded-md h-3 w-1/2 bg-greyMedium mb-2 shimmer-anim"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardShimmer;
