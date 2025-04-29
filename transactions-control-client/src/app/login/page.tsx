'use client'

import { useRouter } from "next/navigation";
import {Mail, LockKeyhole} from 'lucide-react'
const Login = () => {
    const router = useRouter()
    const handleSubmit = () => {
         router.push('/transactions')
    }
    return(
        <div className='w-full h-screen flex items-center'>
            <div className='w-[50%] h-screen'>Imagem</div>
            <div className='w-[40%] h-screen flex items-center'>
            <form onSubmit={()=> handleSubmit()} className='flex justify-center h-[500] w-full p-20 flex-col gap-5 m-10'>
                <div className='border border-amber-50 flex items-center p-5 h-10 gap-2'>
                    <Mail />
                    <input id='email' placeholder='Digite seu email' className='w-full outline-0' type='email' required/>
                </div>
                <div className='border border-amber-50 flex items-center p-5 h-10 gap-2'>
                    <LockKeyhole />
                    <input id='email' placeholder='Digite sua senha' className='w-full outline-0' type='password' required/>
                </div>
                <button className='border border-amber-50 p-10'>Entrar</button>
            </form>
            </div>
        </div>
    )
}

export default Login