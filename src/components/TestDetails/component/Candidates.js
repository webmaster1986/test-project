import React from 'react';
import moment from 'moment'

const Candidates = props => {
  const { candidates, testName } = props;
  return (
    <div className='col-sm-12 col-md-12 col-xs-12 mt-3'>
      <div className='row candidates mt-2'>
      <div className='col-sm-12 col-md-12 col-xs-12'>
        <h6 className='heading text-secondary font-weight-bold'>Candidates({candidates && candidates.length})</h6>
      </div>
      <div className='col-sm-12 col-md-12 col-xs-12'>
        <table className="table table-row-header text-secondary">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Candidate Name</th>
              <th scope="col">Candidate Email</th>
              <th scope="col">Link</th>
              <th scope="col">Assign Date</th>
              <th scope="col">Completion Date</th>
            </tr>
          </thead>
          <tbody>
          {
            candidates && candidates.length > 0 ? candidates.map(candidate => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td>{`${candidate.candidateName}`}</td>
                <td>{candidate.candidateEmail}</td>
                <td>test/{testName}/{candidate.examId}</td>
                <td>{candidate.assignDate ? moment(candidate.assignDate).format('MM/DD/YYYY') : '---'}</td>
                <td>{candidate.completionDate ? moment(candidate.completionDate).format('MM/DD/YYYY') : '---'}</td>
              </tr>
            )) : <tr className="text-center"><td colSpan={5}> Candidate not found </td></tr>
          }
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}
export default Candidates