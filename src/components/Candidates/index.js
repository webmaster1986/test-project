import React, {Component} from 'react'
import {getAllCandidateAnswer, getAllInvitedCandidates} from "../../utils/_data";
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

    if(candidates && Array.isArray(candidates)) {
      candidates = candidates.map(candidate => {
        const answer = candidatesAnswer.filter(answer => answer.examId === candidate.examId)
        if(answer.length) {
          return answer[0]
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
