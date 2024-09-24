// import dynamic from "next/dynamic";
// import React from "react";
// import Image from "next/image";
// import course from "@/public/assets/Digital-Marketing-Course-Online.jpg";
// import { MdArrowOutward, MdDelete } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { CiHeart } from "react-icons/ci";
// import { FaRegHeart } from "react-icons/fa";

// const Heading = dynamic(() => import("@/app/components/typography/Heading"));
// const WithContentWrapper = dynamic(
//   () => import("@/app/components/wrappers/WithContentWrapper")
// );
// const Button = dynamic(() => import("@/app/components/buttons/Button"));

// const page = () => {
//   return (
//     <div className="bg-orangeLight pb-10">
//       <WithContentWrapper>
//         <div className="">
//           <Heading label="Shopping Cart" level={2} />
//           <div className="h-[5px] bg-orange-500 w-20 rounded-b-lg mt-2"></div>
//         </div>
//         <div className="grid  md:grid-cols-1 xl:grid-cols-[1fr,350px] gap-4 md:mx-4 mt-12">
//           <div>
//             <div className="grid sm:grid-cols-1 md:grid-cols-[200px,1fr] p-4 bg-white rounded-xl mb-4">
//               <div className="sm:min-h-10 sm:min-w-18 rounded-md min-w-44 min-h-32">
//                 <Image
//                   src={course}
//                   alt="course"
//                   className="object-contain rounded-md w-full h-full"
//                 />
//               </div>
//               <div className="bg-white rounded-md pl-3">
//                 <div className="flex justify-between items-center gap-x-5">
//                   <div className="mt-2">
//                     <h1 className="font-semibold text-[20px]">
//                       Digital Marketing Course
//                     </h1>
//                     <p className="font-normal text-[14px] text-greyPrimary">
//                       Amet minim mollit non deserunt ullamco est sit aliqua
//                       dolor do amet sint.
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-start gap-y-2 justify-center mt-3">
//                     <FaRegHeart
//                       size={30}
//                       className="bg-primaryDim text-purple-900 rounded-md p-1 cursor-pointer"
//                     />
//                     <RiDeleteBin6Line
//                       size={30}
//                       className="text-red-600 bg-gray-50 rounded-md  p-1 cursor-pointer"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-extrabold pt-2 text-[#FF9A08]">
//                     $20.00
//                   </h1>
//                 </div>
//               </div>
//             </div>
//             <div className="grid sm:grid-cols-1 md:grid-cols-[200px,1fr] p-4 bg-white rounded-xl mb-4">
//               <div className=" sm:min-h-10 sm:min-w-18 rounded-md min-w-44 min-h-32">
//                 <Image
//                   src={course}
//                   alt="course"
//                   className="object-contain rounded-md w-full h-full"
//                 />
//               </div>
//               <div className="bg-white rounded-md pl-3">
//                 <div className="flex justify-between items-center gap-x-5">
//                   <div className="mt-2">
//                     <h1 className="font-semibold text-[20px]">
//                       Digital Marketing Course
//                     </h1>
//                     <p className="font-normal text-[14px] text-greyPrimary">
//                       Amet minim mollit non deserunt ullamco est sit aliqua
//                       dolor do amet sint.
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-start gap-y-2 justify-center mt-3">
//                     <FaRegHeart
//                       size={30}
//                       className="bg-primaryDim text-purple-900 rounded-md p-1 cursor-pointer"
//                     />
//                     <RiDeleteBin6Line
//                       size={30}
//                       className="text-red-600 bg-gray-50 rounded-md  p-1 cursor-pointer"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-extrabold pt-2 text-[#FF9A08]">
//                     $20.00
//                   </h1>
//                 </div>
//               </div>
//             </div>
//             <div className="grid sm:grid-cols-1 md:grid-cols-[200px,1fr] p-4 bg-white rounded-xl mb-4">
//               <div className=" sm:min-h-10 sm:min-w-18 rounded-md min-w-44 min-h-32">
//                 <Image
//                   src={course}
//                   alt="course"
//                   className="object-contain rounded-md w-full h-full"
//                 />
//               </div>
//               <div className="bg-white rounded-md pl-3">
//                 <div className="flex justify-between items-center gap-x-5">
//                   <div className="mt-2">
//                     <h1 className="font-semibold text-[20px]">
//                       Digital Marketing Course
//                     </h1>
//                     <p className="font-normal text-[14px] text-greyPrimary">
//                       Amet minim mollit non deserunt ullamco est sit aliqua
//                       dolor do amet sint.
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-start gap-y-2 justify-center mt-3">
//                     <FaRegHeart
//                       size={30}
//                       className="bg-primaryDim text-purple-900 rounded-md p-1 cursor-pointer"
//                     />
//                     <RiDeleteBin6Line
//                       size={30}
//                       className="text-red-600 bg-gray-50 rounded-md  p-1 cursor-pointer"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-extrabold pt-2 text-[#FF9A08]">
//                     $20.00
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-2xl px-4 py-6   h-fit">
//             <h1 className="border-b-2 border-greyMedium pb-3 font-medium text-2xl">
//               Order Summary
//             </h1>
//             <div className="p-3 border-b-2 border-greyMedium space-y-3">
//               <div>
//                 <div className="flex justify-between items-center">
//                   <h1 className="font-normal text-[14px] text-greyPrimary">
//                     Digital Marketing Course
//                   </h1>
//                   <h1 className="font-extrabold text-[14px]">$22.00</h1>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center">
//                   <h1 className="font-normal text-[14px] text-greyPrimary">
//                     Affliate Marketing
//                   </h1>
//                   <h1 className="font-extrabold text-[14px]">$22.00</h1>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center">
//                   <h1 className="font-normal text-[14px] text-greyPrimary">
//                     Digital Marketing Course
//                   </h1>
//                   <h1 className="font-extrabold text-[14px]">$22.00</h1>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center">
//                   <h1 className="font-normal text-[14px] text-greyPrimary">
//                     Social Proof
//                   </h1>
//                   <h1 className="font-extrabold text-[14px]">$22.00</h1>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center">
//                   <h1 className="font-normal text-[14px] text-greyPrimary">
//                     Digital Marketing Course and Testimonials
//                   </h1>
//                   <h1 className="font-extrabold text-[14px]">$22.00</h1>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mt-4">
//                 <h1 className="font-medium text-[18px]">Total</h1>
//                 <h1 className="font-extrabold text-xl">$22.00</h1>
//               </div>
//               <div className="mt-4">
//                 <Button
//                   label="checkout"
//                   variant="basic"
//                   className="min-w-max w-fit xl:w-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </WithContentWrapper>
//     </div>
//   );
// };

// export default page;

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
