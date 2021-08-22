import { createStore, combineReducers } from 'redux';

const tasks = {
    totalTasks: 0,
    toDoTasks: 0,
    doingTasks: 0,
    finishTasks: 0
};

const taskList = [];

function taskListReducer(state = taskList, action){
    const list = action.list;

    switch (action.type){
        case 'LIST_ALL_TASKS':
            state = [...state, list]
            return state;
        default:
            return state;
    }
}

function tasksReducer(state = tasks, action){

    const count = action.count;

    switch (action.type){

        case 'ADD_TASK':
            state = {...state, totalTasks: count};
            return state;
        case 'TODO_TASK':
            state = {...state, toDoTasks: count};
            return state;
        case 'DOING_TASK':
            state = {...state, totalTasks: count};
            return state;
        case 'FINISH_TASK':
            state = {...state, totalTasks: count};
            return state;
        default:
            return state;
    }
}

export default createStore(combineReducers({
    task: tasksReducer,
    taskList: taskListReducer
}));