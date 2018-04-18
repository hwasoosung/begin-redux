// 리덕스와 연동된 컨테이너 컴포넌트 작성
import React from 'react';
import Counter from '../components/Counter'
import * as counterActions from 'store/modules/counter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CounterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }
  handleIncrement = () => {
    const { CounterActions } = this.props;
    CounterActions.increment();
  }
  handleDecrement = () => {
    const { CounterActions } = this.props;
    CounterActions.decrement();
  }

  render() {
    const { handleIncrement, handleDecrement } = this;
    const { number } = this.props;
    return (
      <Counter 
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        number={number} />
    );
  }
}

// Turns an object whose values are action creators, 
// into an object with the same keys,
export default connect(
  (state) => ({
    number: state.counter.number
  }),
  (dispatch) => ({
    CounterActions: bindActionCreators(counterActions, dispatch)
  })
)(CounterContainer);

// export default connect(
//   (state) => ({
//     number: state.counter.number
//   }),
//   (dispatch) => bindActionCreators(counterActions, dispatch)
// )(CounterContainer);



/* mapStateToProps()
스토어의 상태를 파라미터로 받아오는 함수로서, 컴포넌트에 상태로 넣어줄 props 를 반환합니다. */
/* mapDispatchToProps()
dispatch 를 파라미터로 받아오는 함수로서, 컴포넌트에 넣어줄 액션 함수들을 반환합니다. */
/* connect()
Connects a React component to a Redux store. */

// const mapStateToProps = (state) => ({
//   number: state.counter.number
// })

// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(counterActions.increment()),
//   decrement: () => dispatch(counterActions.decrement())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);