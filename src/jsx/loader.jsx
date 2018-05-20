import React, { Component } from 'react'

export default class Loader extends Component {

    state = {
        active: false
    }

    componentDidMount () {
        this._activate()
    }

    _activate = ()=> {
		requestAnimationFrame(()=>{
			this.setState({ active: true })
			this._timeout = setTimeout(this._deactivate, 1500)
			this._timestamp = new Date()
		})
	}

	_deactivate = ()=> {
		let timeDifference = new Date() - this._timestamp
		setTimeout(()=>{
			requestAnimationFrame(()=>{
				this.setState({ active: false })
				if (this._timeout) clearTimeout(this._timeout)
			})
		}, 2500-timeDifference)
	}

    render () {
        const activeClass = this.state.active ? 'active' : ''
        return (
            <div className={`loader ${activeClass}`}>
                <div className="dots"><span></span><span></span><span></span><span></span><span></span></div>
            </div>
        )
    }
}
