import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../store/actions/postActions";
import { Redirect } from "react-router-dom";

class CreatePost extends Component {
  state = {
    startTime: "",
    endTime: ""
  };
  

  createValidation() {
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
    console.log(this.state);
    this.props.createPost(this.state);
    this.props.history.push("/");
  };

  handleChange = e => {
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
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create/Update Timesheet</h5>
                    <div className="input-field">
                        <label htmlFor="startTime">Start Time</label>
                        <input type="text" id="startTime" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="endTime">End Time</label>
                        <input type="text" id="endTime" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                   <button
                     className="btn pink lighten-1 z-depth-0"
                     disabled={!enabled}
                      >
                       Create
                     </button>
                     {this.createValidation()}
                   </div>
                </form>
            </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { createPost }
)(CreatePost);
