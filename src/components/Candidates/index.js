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

  getAllCandidates = () => {
    getAllInvitedCandidates().then(candidates => {
      getAllCandidateAnswer().then(candidatesAnswer => {
        if(candidates && Array.isArray(candidates)) {
          candidates.forEach(candidate => {
            const answer = candidatesAnswer.filter(answer => answer.examId === candidate.examId)
            if(answer.length) {
              candidate = answer[0]
            }
          })
          this.setState({
            candidates
          })
        }
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  render() {
    const {candidates} = this.state;
    return (
      <CandidatesList candidates={candidates} title={"Candidates"} />
    )
  }
}

export default Candidates
