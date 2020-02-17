import React, { Component } from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { updateProject} from '../../store/actions/projectActions'

class UpdateProject extends Component {
    componentWillMount() {
      console.log(this.props);
      this.setState({
        startTime: this.props.project.startTime,
        endTime: this.props.project.endTime
      });
    }
  
    updateValidation() {
      console.log("update validation");
      console.log(this.state.startTime);
      console.log(this.state.endTime);
  
      if (this.state.startTime && this.state.endTime) {
        return null;
      } else {
        return (
          <div className="red-text center">
            <p>Please fill out the field(s)</p>
          </div>
        );
      }
    }
  
    onHandleSubmit = e => {
      e.preventDefault();
      this.props.updateProject(this.props.projectid, this.state);
      this.props.history.push("/");
    };
  
    onHandleChange = e => {
      this.setState({
        [e.target.id]: e.target.value
      });
    };
  
    render() {
      const { auth } = this.props;
      const { startTime, endTime } = this.state;
      const enabled = startTime.length > 0 && endTime.length > 0;
      if (!auth.uid) return <Redirect to="/signin" />;
      return (
        <div className="container">
        <form onSubmit={this.onHandleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Create/Update Timesheet</h5>
            <div className="input-field">
                <label htmlFor="startTime">Start Time</label>
                <input type="text" id="startTime" value={project.startTime} onChange={this.onHandleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="endTime">End Time</label>
                <input type="text" id="endTime" value={project.endTime} onChange={this.onHandleChange} />
            </div>
            <div className="input-field">
              <button
                className="btn orange lighten-2 z-depth-o"
                disabled={!enabled}
              >
                Update
              </button>
              {this.updateValidation()}
            </div>
        </form>
    </div>
      );
    }
  }
  
  const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;

    return {
      auth: state.firebase.auth,
      project: project,
      projectId: id
    };
  };
  
  export default compose(
    connect(
      mapStateToProps,
      { updateProject }
    ),
    firestoreConnect([{ collection: "timesheets" }]))(
  UpdateProject);