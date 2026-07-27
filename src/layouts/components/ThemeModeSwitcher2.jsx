import  { useCallback, useEffect, useState } from 'react'
import {  BsMoonFill, BsSun } from 'react-icons/bs'
import { HiDesktopComputer } from 'react-icons/hi'

const options = [
    {
        Icon: BsSun,
        text: 'light'
    },
    {
        Icon: BsMoonFill,
        text: 'dark'
    },
    {
        Icon: HiDesktopComputer,
        text: 'system'
    },
]

const ThemeModeSwitcher2 = () => {
const [theme, setTheme] = useState(
    localStorage.getItem('theme2') ? localStorage.getItem('theme2') : 'system'
)
const element = document.documentElement // <html/> tag
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)") // will return match object of boolean confirming the current theme mode of the system/device/window
// console.log(darkQuery, 'darkQuery')

const onWindowMatch = useCallback(()=>{
    // if key theme2 in localstorage has value 'dark' or if theres no key bearing 'theme2' in localstorage but the current device theme mode is 'dark'
    if (localStorage.theme2 === 'dark' || (!('theme2' in localStorage ) && darkQuery.matches)) {
        element.classList.add('dark')
    }else{
        element.classList.remove('dark')
    }
}, [darkQuery, element.classList])

onWindowMatch()

useEffect(() => {
  switch (theme) {
    case 'dark':
        element.classList.add('dark')
        localStorage.setItem('theme2', 'dark')
    break;
    case 'light':
        element.classList.remove('dark')
        localStorage.setItem('theme2', 'light')
        break;
    default:
        localStorage.removeItem('theme2')
        onWindowMatch()
        break;
  }

}, [theme, element.classList, onWindowMatch])


useEffect(() => {
    // by default theme is set to system, but incase user change system/device theme mode this code will respond accordingly provided that previous change to app theme was not system
    const themeListener = (e)=>{
        if (!("theme2" in localStorage)) {
            if (e.matches) {
                element.classList.add("dark")
            }else{
                element.classList.remove("dark")
            }
        }
    }

   darkQuery.addEventListener('change', themeListener)

  return () => {
    darkQuery.removeEventListener('change', themeListener)
  }
}, [])

  return (
    <div className='duration-100 dark:bg-slate-200 dark:text-gray-800 bg-slate-200 rounded-lg flex items-center justify-between'>
       {
        options?.map(({text, Icon})=>(
            <button key={text} onClick={()=> setTheme(text)} className={`w-6 h-6 leading-9 rounded-full m-1 ${theme === text && 'text-sky-600' }`}>
                <Icon className='mx-auto'/>
            </button>
        )) 
       }
    </div>
  )
}

export default ThemeModeSwitcher2
