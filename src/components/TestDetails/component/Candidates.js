import React from 'react';

const Candidates = props => {
  const { candidates } = props;
  return (
    <div className='col-sm-12 col-md-12 col-xs-12 mt-3'>
      <div className='row candidates mt-2'>
      <div className='col-sm-12 col-md-12 col-xs-12'>
        <h6 className='heading text-secondary font-weight-bold'>Candidates({candidates.length})</h6>
      </div>
      <div className='col-sm-12 col-md-12 col-xs-12'>
        <table className="table table-row-header text-secondary">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Candidate Name</th>
              <th scope="col">Candidate Email</th>
              <th scope="col">Test Name</th>
              <th scope="col">Assign Date</th>
              <th scope="col">Completion Date</th>
            </tr>
          </thead>
          <tbody>
          {
            candidates.length > 0 ? candidates.map(candidate => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td>{`${candidate.firstName} ${candidate.lastName}`}</td>
                <td>{candidate.email}</td>
                <td>{candidate.testName}</td>
                <td>{candidate.assignDate}</td>
                <td>{candidate.completionDate}</td>
              </tr>
            )) : null
          }
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}
export default Candidates