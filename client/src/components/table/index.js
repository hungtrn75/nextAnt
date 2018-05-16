import { Table, Icon, Divider } from 'antd'

import React, { Component } from 'react'

export default props => {
  return <Table columns={props.columns} dataSource={props.data} />
}
