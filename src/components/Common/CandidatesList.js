import React from 'react'
import moment from "moment/moment";
import './CandidatesList.css'

const   CandidatesList = (props) => {
  const {candidates, title, isEvaluation, user} = props;
  return (
    <div className='row candidates mt-2'>
      <div className='col-sm-12 col-md-12 col-xs-12'>
        <h6 className='heading text-secondary font-weight-bold'>{title} ({candidates && candidates.length})</h6>
      </div>
      <div className='col-sm-12 col-md-12 col-xs-12 mt-4'>
        <table className="table table-row-header text-secondary">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Candidate Name</th>
            <th scope="col">Candidate Email</th>
            <th scope="col">Test Name</th>
            <th scope="col">Assign On</th>
            <th scope="col">Completion On</th>
            <th scope="col">Score</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          {
            candidates && candidates.length > 0 ? candidates.map((candidate, i) => (
              <tr key={i}>
                <td>{ isEvaluation ? <a href={`/evaluations/${candidate.examId}`} className="text-primary pointer font-weight-bold"><u>#{candidate.examId}</u></a> : `#${candidate.examId}`}</td>
                <td>{`${candidate.candidateName}`}</td>
                <td>{candidate.candidateEmail}</td>
                <td>{candidate.testName}</td>
                <td>{candidate.assignDate ? moment(candidate.assignDate).format('MM/DD/YYYY') : '---'}</td>
                <td>{candidate.completionDate ? moment(candidate.completionDate).format('MM/DD/YYYY') : <span className="text-success">In Progress</span>}</td>
                <td>Score</td>
                <td><a className="link" onClick={() => props.onDelCandidate(candidate.id)}>Delete</a></td>
              </tr>
            )) : <tr className="text-center"><td colSpan={8}> Candidate not found </td></tr>
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CandidatesList;