import React from 'react'

import { Pagination } from 'antd'
import { LogicBlock } from './index'
export default () => {
  return (
    <LogicBlock.Consumer>
      {({ handleChangePage, pageSize, nowPage, pageTotal }) => {
        return typeof handleChangePage === 'function' ? (
          <div>
            {' '}
            <Pagination
              pageSize={pageSize.value}
              defaultCurrent={1}
              current={nowPage.value}
              total={pageTotal.value}
              onChange={handleChangePage}
            />
          </div>
        ) : (
          <div> </div>
        )
      }}
    </LogicBlock.Consumer>
  )
}
