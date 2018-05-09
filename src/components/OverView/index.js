import React, {Component} from 'react'
import { getOverviewText } from "../../utils/_data";
import './OverView.css'

class OverView extends Component {
  state = {
    overviewText: ''
  }

  componentWillMount() {
    getOverviewText().then(res => {
      this.setState({
        overviewText: res.text,
      })
    }).catch(err => console.log(err))
  }

  render() {
    const { overviewText } = this.state;
    return (
      <div className="overview">
        <div className="text-left mt-3">
          <h5>Overview</h5>
        </div>
        <hr/>
        <div className='text-center'>
          <h4>{overviewText}</h4>
        </div>
      </div>
    );
  }
}

export default OverView;
