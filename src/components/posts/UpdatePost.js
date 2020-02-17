import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { updatePost } from "../../store/actions/postActions";

class UpdatePost extends Component {
  componentWillMount() {
    console.log(this.props);
    this.setState({
      startTime: this.props.post.startTime,
      endTime: this.props.post.endTime
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.updatePost(this.props.postId, this.state);
    this.props.history.push('/');

  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
      })
  };

  render() {
    //  console.log(this.state);
    const { auth } = this.props;
    const { startTime, endTime } = this.state;
    const enabled = startTime.length > 0 && endTime.length > 0;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.HandleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Timesheet</h5>
            <div className="input-field">
                <label htmlFor="startTime">Start Time</label>
                <input type="text" id="startTime" defaultValue={startTime} onChange={this.HandleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="endTime">End Time</label>
                <input type="text" id="endTime" defaultValue={endTime} onChange={this.HandleChange} />
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
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  //  console.log(post);
  return {
    auth: state.firebase.auth,
    post: post,
    postId: id
  };
};

export default compose(
  connect(
    mapStateToProps,
    { updatePost }
  ),
  firestoreConnect([{ collection: "posts" }])
)(UpdatePost);
