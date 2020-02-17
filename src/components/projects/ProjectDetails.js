import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'; 
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { deleteProject} from '../../store/actions/projectActions';

const ProjectDetails = (props) => {

    const onDeleteProject = (id) => {
        //delete post
        props.deleteProject(id)
        .then(() => {
         return <Redirect to="/"/>;
        }).catch(err => {
            console.log(err);
        });
    }

    

    const { project, auth} = props;
    if (!auth.uid) return <Redirect to='/signin' />
    if (project) {
        return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Start Time: { project.startTime }</span>
                    <span className="card-title">End Time: { project.endTime }</span>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by {project.authorFirstName} {project.authorLastName} </div>
                    <div>{moment(project.createdAt.toDate().toString()).calendar()}</div>
                </div>
                <Link to='/update/:id'><button>update</button></Link>
                <button className="delete" onClick={(e) => onDeleteProject()}>Delete Post</button>
            </div>
        </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading timesheet...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.timesheets;
    const project = projects ? projects[id] : null
    return {
        project: project,
        auth: state.firebase.auth
    }
}

//const mapDispatchToProps = (dispatch) => {
//   return {
//        deleteProject: (project) => dispatch(deleteProject(project))
//    }
//}

export default compose(
    connect(mapStateToProps,{ deleteProject}),
    firestoreConnect([
        { collection: 'timesheets'}
    ])
)(ProjectDetails);


{/*
        renderButtons(project) {
    if (this.props.auth.uid === project.authorId) {
      return (
        <div id="update-buttons">
          <button className="btn orange lighten-2 z-depth-o">
            <Link id="update-button" to={"/update/" + this.props.projectId} className="white-text">
              Update
            </Link>
          </button>
          <button
            onClick={this.onDeleteProject.bind(this)}
            className="btn orange lighten-2 z-depth-o"
          >
            Delete
          </button>
        </div>
      );
    }
  }

  onDeletePost() {
    this.props.deleteProject(this.props.projectId, () => {});
    this.props.history.push("/");
  }
 */}


{/*
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'; 
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { deleteProject} from '../../store/actions/projectActions';

    class ProjectDetails extends Component {
    

  

  render() {
    const { project, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (project) {
      return (
        <div className="container section project-details">
        <div className="card z-depth-0" >
            <div className="card-content">
                <span className="card-title">Start Time: {project.startTime }</span>
                <span className="card-title">End Time: {project.endTime }</span>
            </div>
            <div className="card-action grey lighten-4 grey-text">
                <div>Posted by {project.authorFirstName} {project.authorLastName} </div>
                <div>{moment(project.createdAt.toDate().toString()).calendar()}</div>
            </div>
            <button className="btn btn-danger float-right">Delete</button>
            </div>
            </div>
            );
          } else {
            return (
              <div className="container center">
              <p>Loading timesheet...</p>
          </div>
            );
          }
        }
      }
      
      const mapStateToProps = (state, ownProps) => {
        const id = ownProps.match.params.id;
        const projects = state.firestore.data.projects;
        const project = projects ? projects[id] : null;
        return {
          project: project,
          auth: state.firebase.auth,
          projectId: id
        };
      };
      
      export default compose(
        connect(
          mapStateToProps,
          { deleteProject}
        ),
        firestoreConnect([{ collection: "timesheets" }])
      )(ProjectDetails);

      */}
