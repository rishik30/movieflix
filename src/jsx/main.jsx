import React, { Component } from 'react'
import WebFont from 'webfontloader'
import SearchComponent from './search.jsx'
import Movie from './movie.jsx'
import WatchedSection from './watched-section.jsx'
import Loader from './loader.jsx'

export default class Main extends Component {

    componentDidMount () {
        WebFont.load({
            google: {
                families: ['Anton', 'Cabin:400,600', 'Lato: 400', 'sans-serif']
            }
        })
    }

	render () {
		return (
			<main>
                <header>
                    <div className='background'>
                        <img src='images/bg-3.jpg' />
                    </div>
                    <SearchComponent />
                </header>
                <div className='container'>
                    <Movie />
                    <WatchedSection />
                </div>
                <Loader />
			</main>
		)
	}
}
