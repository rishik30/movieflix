import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import { connect } from 'react-redux'
import { setWatchedMoviesData, removeFromWatchedList, setVoteStatus } from '../redux/modules/action.js'

const mapStateToProps = ({ movies }) => {
    return {
        watchedMovies: movies.get('watchedMovies').toJS()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setWatchedMoviesData: data => dispatch(setWatchedMoviesData(data)),
        removeFromWatchedList: data => dispatch(removeFromWatchedList(data)),
        setVoteStatus: (movie, status) => dispatch(setVoteStatus(movie, status))
    }
}

class WatchedSection extends Component {

    componentDidMount () {
        if (window.localStorage) {
            const data = localStorage.watchedMoviesData ? JSON.parse(localStorage.watchedMoviesData) : null
            if (Array.isArray(data) && data.length > 0) {
                this.props.setWatchedMoviesData(data)
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.watchedMovies.length !== this.props.watchedMovies.length) {
            localStorage.watchedMoviesData = JSON.stringify(nextProps.watchedMovies)
        }
    }

    _handleRemove = movie => {
        this.props.removeFromWatchedList(movie)
    }

    _handleClick = (movie, status) => {
        this.props.setVoteStatus(movie, status)
    }

    render() {
        const { watchedMovies } = this.props
        return (
            <div className='watched-section'>
                <p>Watched Movies</p>
                <FlipMove duration={750} easing="ease-out" className='movies-container'>
                    {watchedMovies.length > 0 && watchedMovies.map(movie => (
                        <div className='movie'>
                            <img src={movie.Poster} alt={movie.Title} />
                            <h6>{movie.Title}</h6>
                            <p>{movie.Year}</p>
                            <div className='extra'>
                                <img src='images/remove.svg' onClick={() => this._handleRemove(movie)} />
                                <img src={movie.voteStatus === 1 ? 'images/like-green.svg' : 'images/like.svg'} className='likeIcon' onClick={() => this._handleClick(movie, 'like')} />
                                <img src={movie.voteStatus === 2 ? 'images/dislike-red.svg' : 'images/dislike.svg'} className='dislikeIcon' onClick={() => this._handleClick(movie, 'dislike')} />
                            </div>
                        </div>
                    ))}
                    {watchedMovies.length === 0 && <span className='no-movies'>No Movies watched yet..</span>}
                </FlipMove>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchedSection)
