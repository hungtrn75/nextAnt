import React from 'react'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu

import goto from '../../lib/goto'

export default () => (
  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    <Menu.Item key="home" onClick={goto('/')}>
      <Icon type="home" />
      <span> CRM System Demo</span>
    </Menu.Item>

    <Menu.Item key="a1" onClick={goto('/customer')}>
      <span>
        <Icon type="team" />
        <span>Customer</span>
      </span>
    </Menu.Item>

    <Menu.Item key="b1" onClick={goto('/product')}>
      <span>
        <Icon type="solution" />
        <span>Product</span>
      </span>
    </Menu.Item>

    {/* <SubMenu
      key="product"
      title={
        <span>
          <Icon type="solution" />
          <span>Product</span>
        </span>
      }
    >
      <Menu.Item key="b1" onClick={goto('/product')}>
        Product(All)
      </Menu.Item>
    </SubMenu> */}

    <SubMenu
      key="sub6"
      title={
        <span>
          <Icon type="area-chart" />
          <span>Report</span>
        </span>
      }
    >
      <Menu.Item key="e4" onClick={goto('/report/demo1')}>
        Daily Report
      </Menu.Item>
      <Menu.Item key="e5" onClick={goto('/report/demo2')}>
        Top Products
      </Menu.Item>
      <Menu.Item key="e6" onClick={goto('/report/demo3')}>
        Top Sales
      </Menu.Item>
    </SubMenu>

    <SubMenu
      key="sub7"
      title={
        <span>
          <Icon type="profile" />
          <span>Admin</span>
        </span>
      }
    >
      <Menu.Item key="f1" onClick={goto('/admin/user')}>
        <Icon type="user" />
        <span>User List</span>
      </Menu.Item>
      {/* <Menu.Item key="f2">permission-Template</Menu.Item>
      <Menu.Item key="f3">permission</Menu.Item>
      <Menu.Item key="f4">Board</Menu.Item>
      <Menu.Item key="f5">BoardManage</Menu.Item> */}
    </SubMenu>
    {/* <SubMenu
      key="sub8"
      title={
        <span>
          <Icon type="setting" />
          <span>Environment</span>
        </span>
      }
    >
      <Menu.Item key="z3">permissionKind</Menu.Item>
      <Menu.Item key="z4">City</Menu.Item>
      <Menu.Item key="z5">EvnetKind</Menu.Item>
      <Menu.Item key="z6">Action</Menu.Item>
      <Menu.Item key="z7">ProductKind</Menu.Item>
      <Menu.Item key="z8">Unit</Menu.Item>
      <Menu.Item key="z18">employeeKind</Menu.Item>
      <Menu.Item key="z20">AccountState</Menu.Item>
    </SubMenu> */}
  </Menu>
)
