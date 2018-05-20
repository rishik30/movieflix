import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMovieToList, setStatusToWatched } from '../redux/modules/action.js'

const mapStateToProps = ({ movies }) => {
    return {
        data: movies.get('data')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMovieToList: data => dispatch(addMovieToList(data)),
        setStatusToWatched: () => dispatch(setStatusToWatched())
    }
}

class Movie extends Component {

    _handleImageClick = e => {
        e.preventDefault()
        this.props.addMovieToList(this.props.data)
        this.props.setStatusToWatched()
    }

    render () {
        const { data } = this.props
        if (!data) return null
        return (
            <div className='movie-wrapper'>
                <img src={data.Poster} alt={data.Title} className='moviePoster' onClick={this._handleImageClick} />
                <div className='details'>
                    <h3>{data.Title}</h3>
                    <p>{data.Year}</p>
                    <p>{data.Genre.replace(',', ' /')}</p>
                    {data.Ratings.length > 0 && <div className='ratings'>
                        {data.Ratings.map(rating => (
                            <div className='rate'>
                                <span className='source'>{rating.Source === 'Internet Movie Database' ? 'IMDB': rating.Source} : </span>
                                <span className='value'>{rating.Value}</span>
                            </div>
                        ))}
                    </div>}
                    <p className='plot'>{data.Plot}</p>
                    {data.isWatched && <button className='watch'> already watched</button>}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
