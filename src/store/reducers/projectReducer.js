import { UPDATE_PROJECT } from '../actions/projectActions';

const initState = {
    projects: [
        {id: '1', start: '8am help find peach', end: 'blah 10'},
        {id: '2', start: '9am collect all the stars', end: 'blah 20'},
        {id: '3', start: '10am egg hunt with yoshi', end: 'blah 30'}
    ]
}

const projectReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_PROJECT':
            console.log('created project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;  
        case UPDATE_PROJECT:
             console.log("project updated");
            return state;       
        default:
            return state;
    }
}

export default projectReducer;