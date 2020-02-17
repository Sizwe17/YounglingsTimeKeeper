export const UPDATE_PROJECT = 'UPDATE_PROJECT';

export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;

      firestore.collection('timesheets').add({
          ...project,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId: authorId,
          createdAt: new Date()
      }).then(() => {
          dispatch({ type: 'CREATE_PROJECT'});
      }).catch(err => {
          dispatch({ type: 'CREATE_PROJECT_ERROR' }, err );
      });        

  }
};

export const deleteProject = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("timesheets")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_PROJECT', id });
      });
  };
};


export const updateProject = (id, project) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("timesheets")
      .doc(id)
      .update(project)
      .then(() => {
        dispatch({ type: UPDATE_PROJECT });
      });
  };
};


