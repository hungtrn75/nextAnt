import React, { Component } from 'react'
import GetData from './getData'
class Board extends Component {
  render() {
    return (
      <div>
        <GetData>
          {
            (result) => {
              return <div>BoardAllQuery</div>
            }
          }
        </GetData>
      </div>
    )
  }
}

export default Board