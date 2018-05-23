import React, {Component} from 'react'
import {getAllCandidateAnswer, getTests} from "../../utils/_data";
import CandidatesList from "../Common/CandidatesList";

class Evaluations extends Component{
  state = {
    candidates: [],
  }

  componentWillMount() {
    this.getAllCandidates();
  }

  getAllCandidates = async () => {
    let candidates = await getAllCandidateAnswer()
    const tests = await getTests()

    if(candidates && Array.isArray(candidates)) {
      candidates = candidates.filter(candidate => !!candidate.completionDate);
      candidates = candidates.map(candidate => {
        const test = tests.filter(test => test.id === candidate.testId)
        if(test.length) {
          candidate.testName = test[0].testName
        }
        return candidate
      })
      this.setState({
        candidates
      })
    }
  }

  render() {
    const {candidates} = this.state;
    return (
      <CandidatesList candidates={candidates} title={"Evaluation Candidates"} isEvaluation={true}/>
    )
  }
}

export default Evaluations
