import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BACKGROUND_IMAGE } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className="fixed -z-10">
        <img
          className="brightness-50 h-screen object-cover w-screen"
          src={BACKGROUND_IMAGE}
          alt="background-img"
        />
      </div>
    <div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
    </>
  )
}

export default GptSearch