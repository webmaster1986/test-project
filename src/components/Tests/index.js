import React, {Component} from 'react'
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import { getTests, addTest, deleteTest } from "../../utils/_data"
import './Tests.css'
import CreateTestModal from "./components/CreateTestModal";

class OverView extends Component {
  state = {
    fields: {
      testName: '',
      description: '',
    },
    errors: {
      testName: '',
      description: '',
    },
    tests: [],
    isModal: false,
    questions: [],
  }

  componentWillMount() {
    this.getAllTests();
  }

  getAllTests = () => {
    getTests().then(res => {
      this.setState({
        tests: res,
      })
    }).catch(err => console.log(err))
  }

  onChange = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: this.validate(e.target.name, e.target.value),
      },
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      }
    });
  }

  validate = (name, value) => {
    switch (name) {
      case 'testName':
        if (!value) {
          return 'Test name is Required';
        } else {
          return '';
        }
      case 'description':
        if (!value) {
          return 'Description is Required';
        } else {
          return '';
        }
      default: {
        return ''
      }
    }
  }

  onSave = (status) => {
    const { fields, tests} = this.state;
    let validationErrors = {};
    Object.keys(fields).forEach(name => {
      const error = this.validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      this.setState({errors: validationErrors});
      return;
    }

    addTest(fields).then((res) => {
      if(status === "save") {
        tests.push(res);
        this.setState({tests});
        this.handleModal();
      }
      if(status === "saveAndContinue") {
        this.props.history.push({
          pathname: `/testDetails/${res.id}`
        })
      }
    })
  }

  handleModal = () => {
    this.setState({
      isModal: !this.state.isModal,
      fields: {
        testName: '',
        description: '',
      }
    })
  }

  removeTest = (testId) => {
    const _this = this;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this test details",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((status) => {
      if(status) {
        deleteTest(testId).then(() => {
          _this.getAllTests();
        })
        swal("Your test details has been deleted!", {
          icon: "success",
        });
      }
    });
  }

  render() {
    const { tests, isModal } = this.state;
    return (
      <div className="tests">
        <CreateTestModal isModal={isModal} state={this.state} onChange={this.onChange} onSave={this.onSave} handleModal={this.handleModal}/>
        <div className='row'>
          <div className="col-md-4 col-sm-12 col-xs-12 mt-4">
            <h5 className="text-left">Tests({tests.length})</h5>
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12 mt-4 text-right">
            <button type="button" className='btn btn-success btn-sm btn-rounded' onClick={this.handleModal}>Create Custom Test</button>
          </div>
          {
            tests.map(test => (
              <div key={test.id} className="col-md-4 col-sm-12 col-xs-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{test.testName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">10 MCQ, 01 Tests, 01 Tasks </h6>
                    <p className="card-text text-muted">{test.description} Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="hover-active text-center text-white">
                      <Link  to={`/testDetails/${test.id}`} className="mr-3 text-white" title="View Details"><i className="fas fa-eye" /></Link>
                      <a className="mr-3" title="Add Details"><i className="fas fa-user-plus" /></a>
                      <a className="mr-3" title="Delete" onClick={() => this.removeTest(test.id)}><i className="fas fa-trash" /></a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default OverView;
