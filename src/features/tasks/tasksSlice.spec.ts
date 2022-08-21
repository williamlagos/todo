import counterReducer, {
  TasksState,
} from './tasksSlice';

describe('counter reducer', () => {
  const initialState: TasksState = {
    tasks: [
      { id: 1, name: 'Task 1', done: false },
      { id: 2, name: 'Task 2', done: false },
      { id: 3, name: 'Task 3', done: false },
      { id: 4, name: 'Task 4', done: true },
      { id: 5, name: 'Task 5', done: true } 
    ],
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      tasks: [],
      status: 'idle',
    });
  });
});
