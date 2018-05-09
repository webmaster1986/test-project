import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { getTests } from "../../utils/_data"
import './Tests.css'

class OverView extends Component {
  state = {
    tests: []
  }

  componentWillMount() {
    getTests().then(res => {
      this.setState({
        tests: res,
      })
    }).catch(err => console.log(err))
  }

  render() {
    const { tests } = this.state;
    return (
      <div className="tests">
        <div className="text-left mt-4">
          <h5>Tests({tests.length})</h5>
        </div>
        <div className='row'>
          {
            tests.map(test => (
              <div key={test.testid} className="col-md-4 col-sm-12 col-xs-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{test.testName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">10 MCQ, 01 Tests, 01 Tasks </h6>
                    <p className="card-text text-muted">{test.description} Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="hover-active text-center text-white">
                      <Link  to={`/testDetails/${test.testid}`} className="mr-3 text-white" title="View Details"><i className="fas fa-eye" /></Link>
                      <a className="mr-3" title="Add Details"><i className="fas fa-user-plus" /></a>
                      <a className="mr-3" title="Delete"><i className="fas fa-trash" /></a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default OverView;
