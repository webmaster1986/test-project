import React, {Component} from 'react'
import swal from "sweetalert";
import {
  getAllCandidateAnswer,
  getAllInvitedCandidates,
  getTests,
  deleteInvitedCandidateById,
} from "../../utils/_data";
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
          return { ...candidate, ...answer[0], id: candidate.id}
        }
        return candidate
      })
      this.setState({
        candidates
      })
    }
  }

  onDelCandidate = (id) => {
    const _this = this;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this candidate details",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then( async (status) => {
      if(status) {
        await deleteInvitedCandidateById(id);
        _this.getAllCandidates();
        swal("Candidate has been deleted!", {
          icon: "success",
        });
      }
    });
  }

  render() {
    const {candidates} = this.state;
    return (
      <CandidatesList candidates={candidates} title={"Candidates"} onDelCandidate={this.onDelCandidate}/>
    )
  }
}

export default Candidates
