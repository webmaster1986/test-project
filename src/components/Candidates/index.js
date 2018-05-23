import React, {Component} from 'react'
import {getAllCandidateAnswer, getAllInvitedCandidates, getTests} from "../../utils/_data";
import CandidatesList from "../Common/CandidatesList";

class Candidates extends Component{
  state = {
    candidates: [],
  }

  componentWillMount() {
    this.getAllCandidates();
  }

  getAllCandidates = async () => {
    let candidates = await getAllInvitedCandidates();
    const candidatesAnswer = await getAllCandidateAnswer();
    const tests = await getTests()

    if(candidates && Array.isArray(candidates)) {
      candidates = candidates.map(candidate => {
        const answer = candidatesAnswer.filter(answer => answer.examId === candidate.examId)
        const test = tests.filter(test => test.id === candidate.testId)
        if(test.length) {
          candidate.testName = test[0].testName
        }
        if(answer.length) {

          return { ...candidate, ...answer[0]}
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
      <CandidatesList candidates={candidates} title={"Candidates"} />
    )
  }
}

export default Candidates
