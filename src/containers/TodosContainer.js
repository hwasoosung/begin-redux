// 리덕스와 연동된 컨테이너 컴포넌트 작성
import React from 'react';
import Todos from '../components/Todos'
import * as todoActions from 'store/modules/todo'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.handleToggle = this.handleRemove.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChangeInput = (e) => {
    const { TodoActions } = this.props;
    TodoActions.changeInput(e.target.value);
  }
  handleInsert = () => {
    const { input, TodoActions } = this.props;
    TodoActions.insert(input);
    TodoActions.changeInput('');
  }
  handleToggle = (id) => {
    const { TodoActions } = this.props;
    TodoActions.toggle(id);
  }
  handleRemove = (id) => {
    const { TodoActions } = this.props;
    TodoActions.remove(id);
  }

  render() {

    const { handleChangeInput, handleInsert, handleRemove, handleToggle } = this;
    const { input, todos } = this.props;
    

    return (
      <Todos
        input={input} 
        todos={todos} 
        onChange={handleChangeInput} 
        onInsert={handleInsert} 
        onToggle={handleToggle} 
        onRemove={handleRemove}
      />
    );
  }
}

export default connect(
  ({ todo }) => ({
    // immutable 을 사용하니, 값을 조회 할 때엔느 .get 을 사용해주어야하죠.
    input: todo.get('input'),
    todos: todo.get('todos')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodosContainer);