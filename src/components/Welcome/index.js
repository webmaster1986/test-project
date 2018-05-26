import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Welcome extends Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xs-12 mt-5">
            <div className="form-group text-center">
              <Link to={'/'} className="btn btn-success btn-rounded">Continue to login</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
