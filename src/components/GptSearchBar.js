import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
    const langkey=useSelector(store=>store.config.lang)
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='bg-black p-4  w-1/2 grid grid-cols-12'>
            <input className='p-4 mr-4 outline-none rounded-md col-span-9' type='text' placeholder={lang[langkey].gptSearchPlaceholder}/>
            <button className='px-4 py-2 rounded-md col-span-3 text-white bg-red-700'>{lang[langkey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar