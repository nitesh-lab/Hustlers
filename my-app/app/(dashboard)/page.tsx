import { auth } from '@/auth'
import LandingPage from '@/components/LandingPage';
import NavBar from '@/components/NavBar';
import { axiosInstance } from '@/lib/axiosInstance'
import { redirect } from 'next/navigation'


export default async function page() {
 
  const session = await auth();
  let user={};
 
if (session && session.user &&  session.user.email && session.user.email?.length>0) {


   const res=await axiosInstance.post("api/user/create",{email:session.user.email,name:session.user.name,image:session.user.image})
  if(res.status==200){
   redirect("/dashboard");
  }
  }
  
  return (
    <>
    <NavBar/>
    <LandingPage/>
    </>
  )
}
