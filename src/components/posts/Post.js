import React from "react";
import moment from "moment";
import _ from "lodash";

const Post = ({ post }) => {
  return (   
          <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
              <span className="card-title">{post.startTime} {post.endTime}</span>
               <p>{post.authorFirstName} {post.authorLastName}</p>
             <p className="grey-text">{moment(post.createdAt).calendar()}</p>
           </div>  
        </div> 
  );
};


export default Post;
