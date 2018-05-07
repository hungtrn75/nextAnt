import React, { Component } from 'react'
import GetData from './getData'
class Board extends Component {
  render() {
    return (
      <div>
        <GetData>
          {
            (result) => {
              if (result.data.loading == true) {
                return <div>Loding</div>
              }
              return <div>BoardAllQuery</div>
            }
          }
        </GetData>
      </div>
    )
  }
}

export default Board