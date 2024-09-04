
import LexicalEditor from "./components/TextEditor"
import { MainNav } from "@/components/main_nav"

export default function Home() {
    return (
        <div>
            <div className='flex justify-center gap-y-8'>
                <MainNav/>
            </div>
            <div className='flex justify-center m-4'>
                <div className='w-1/2'>
                    <h1 className='text-4xl text-center underline'>Lexical Editor</h1>
                </div>
                <div className='w-1/2'>
                    <LexicalEditor/>
                </div> 
            </div>
        </div>
    )
}