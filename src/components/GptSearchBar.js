import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
  const dispatch=useDispatch()
    const langkey=useSelector(store=>store.config.lang)
    const searchText=useRef(null)
    const searcgMovieTMDB=async(movie)=>{
      const data=await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS)
      const json=await data.json()
      return json.results
    }
    const handleGptSearchClick=async()=>{console.log(searchText.current.value);
      const gptQuery="Act as a Movie Recommendation system and suggest some movies for the query : "+searchText.current.value+". only give me names of 5 movies, comma seperated like the example result given ahead. Example Results: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya"
      const gptResults=await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
      if(!gptResults.choices){
        // TODO: Write Error Handling
      }
      console.log(gptResults.choices?.[0]?.message?.content);
      const gptMovies=gptResults.choices?.[0]?.message?.content.split(",")
      const promiseArray=gptMovies.map((movie)=>searcgMovieTMDB(movie))
      const tmdbResults=await Promise.all(promiseArray)
      console.log(tmdbResults)
      dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}))
    }
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='bg-black p-4  w-1/2 grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} className='p-4 mr-4 outline-none rounded-md col-span-9' type='text' placeholder={lang[langkey].gptSearchPlaceholder}/>
            <button className='px-4 py-2 rounded-md col-span-3 text-white bg-red-700' onClick={handleGptSearchClick}>{lang[langkey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar