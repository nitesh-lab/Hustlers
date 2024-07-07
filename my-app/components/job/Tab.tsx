"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { BiUser } from "react-icons/bi";
import { CgWorkAlt } from "react-icons/cg";

export default function Tab({state}:{state:number}){

    const [selectedTab,setSelectedTab]=useState(state);
    const router=useRouter();

    useEffect(()=>{
        if(selectedTab==1){
            router.push("/job/find");
        }
        else{
            router.push("/job/create")
        }
    },[selectedTab])
    return <>

    <div className="mx-[5%] flex w-[90%] justify-center">
  <ul className="font-medium flex flex-row space-x-3 rtl:space-x-reverse">

  <li className={`flex items-center hover:cursor-pointer ${selectedTab === 1 ? 'border-b-2 border-black' : ''}`} onClick={()=>setSelectedTab(1)}>
        <CgWorkAlt className="w-[1.5rem] h-[2rem]"/>
        <span className="block py-2 px-3  text-gray-700">Find</span>
      </li>
      <li className={`flex items-center hover:cursor-pointer ${selectedTab === 0 ? 'border-b-2 border-black' : ''}`} onClick={()=>setSelectedTab(0)}>
        <BiUser className="w-[1.5rem] h-[2rem]"/>
        <span className="block py-2 px-3 text-gray-700">Hire</span>
      </li>
      </ul>
      </div>
    </>
}