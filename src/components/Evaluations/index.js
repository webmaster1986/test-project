import React, {Component} from 'react'
import {getAllCandidateAnswer} from "../../utils/_data";
import CandidatesList from "../Common/CandidatesList";

class Evaluations extends Component{
  state = {
    candidates: [],
  }

  componentWillMount() {
    this.getAllCandidates();
  }

  getAllCandidates = () => {

    getAllCandidateAnswer().then(candidates => {
      if(candidates && Array.isArray(candidates)) {
        candidates = candidates.filter(candidate => !!candidate.completionDate);
        this.setState({
          candidates
        })
      }
    }).catch(err => console.log(err));
  }

  render() {
    const {candidates} = this.state;
    return (
      <CandidatesList candidates={candidates} title={"Evaluation Candidates"} isEvaluation={true}/>
    )
  }
}

export default Evaluations
