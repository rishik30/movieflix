import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchMovie } from '../redux/modules/action.js'

const mapDispatchToProps = dispatch => {
    return {
        searchMovie: text => dispatch(searchMovie(text))
    }
}

class SearchComponent extends Component {

    state = {
        text: '',
        active: false
    }

    componentDidMount () {
        setTimeout(() => {
            this.setState({ active: true })
        }, 2500)
    }

    _handleSubmit = e => {
        e.preventDefault()
        this.props.searchMovie(this.state.text)
    }

    render () {
        const activeClass = this.state.active ? 'enter' : ''
        return (
            <div className={`search-component ${activeClass}`}>
                <form onSubmit={this._handleSubmit}>
                    <input type='text' placeholder='Search for a movie...' value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />
                </form>
                <div className='search-icon' onClick={this._handleSubmit}>
                    <img src='images/search.svg' />
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(SearchComponent)
