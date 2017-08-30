import React from 'react';
import {observable} from "mobx";
import {observer} from 'mobx-react';

@observer class Counter extends React.Component {
  @observable counter= 0;

  increment() {
    this.counter++
  }

  decrement() {
    this.counter--
  }

  render() {
    return (
      <div>
        <div>
          <p className="mb2 tc">Test MOBX Counter</p>
          <p className="mb4 tc f1 fw3">{this.counter}</p>
        </div>
        <div className="flex w-100">
          <button className="w-50" onClick={this.decrement.bind(this)}>-</button>
          <button className="w-50" onClick={this.increment.bind(this)}>+</button>
        </div>
      </div>
    );
  }
}

export default Counter;
