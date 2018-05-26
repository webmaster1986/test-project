import React, {Component} from 'react'
import swal from "sweetalert";
import {deleteInvitedCandidateById, getAllCandidateAnswer, getAllInvitedCandidates, getTests} from "../../utils/_data";
import CandidatesList from "../Common/CandidatesList";

class Evaluations extends Component{
  state = {
    candidates: [],
    user: {},
  }

  componentWillMount() {
    this.getAllCandidates();
    const user =  localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    this.setState({
      user
    })
  }

  getAllCandidates = async () => {
    /*let candidates = await getAllCandidateAnswer()
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
    }*/
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
        return {}
      })
      candidates = candidates.filter((item) => Object.keys(item).length);
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
    const {candidates, user} = this.state;
    return (
      <CandidatesList candidates={candidates} user={user} title={"Evaluation Candidates"} onDelCandidate={this.onDelCandidate} isEvaluation={true}/>
    )
  }
}

export default Evaluations
