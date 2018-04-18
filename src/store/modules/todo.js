import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

/*
reateAction 함수는 
세가지의 파라미터를 받는데요, 
첫번째는 액션이름, 
두번째는 payloadCreator, 
세번째는 metaCreator 입니다.

두번째와 세번째 파라미터는 payload 값과 meta 값을 지정해주는 함수
*/
export const changeInput = createAction(CHANGE_INPUT, value => value);
export const insert = createAction(INSERT, input => input);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

let id = 0;

/*
{
  input: '',
  todos: [
    {
      id: 0,
      text: '걷기',
      checked: false
    },
    {
      id: 1,
      text: '코딩하기',
      checked: true
    }
  ]
}
*/
const initialState = Map({
  input: '',
  todos: List()
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
  [INSERT]: (state, { payload: text }) => {
    // 위 코드는 action 객체를 비구조화 할당하고, payload 값을 text 라고 부르겠다는 의미입니다.
    const item = Map({ id: id++, checked: false, text }); // 하나 추가 할 때마다 id 값을 증가시킵니다.
    return state.update('todos', todos => todos.push(item));
  },
  [TOGGLE]: (state, { payload: id }) => {
    // id 값을 가진 index 를 찾아서 checked 값을 반전시킵니다
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.updateIn(['todos', index, 'checked'], checked => !checked);
  },
  [REMOVE]: (state, { payload: id }) => {
    // id 값을 가진 index 를 찾아서 지웁니다.
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.deleteIn(['todos', index]);
  }
}, initialState);


// export default handleAction({
//   [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
//   [INSERT]: (state, action) => state.update('todo', todos => todos.push(Map(action.payload)) ),
//   [TOGGLE]: (state, action) => state.updateIn(['todo', action.payload, 'checked'], checked => !checked),
//   [REMOVE]: (state, action) => state.update(['todo'], todos => todo.delete(action.payload))
// }, initialState);