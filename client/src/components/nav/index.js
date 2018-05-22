import React from 'react'
import { Menu, Icon } from 'antd'
import Link from 'next/link'

const { SubMenu } = Menu

export default () => (
  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    <Menu.Item key="home">
      <Icon type="home" />
      <span>
        <Link href={'/'}>
          <a>
            <span> CRM System Demo</span>
          </a>
        </Link>
      </span>
    </Menu.Item>

    <SubMenu
      key="personal"
      title={
        <span>
          <Icon type="team" />
          <span>MyAccount</span>
        </span>
      }
    >
      <Menu.Item key="aa1">
        <Icon type="user" />
        <span>
          <Link href={'/presonal/'}>
            <a>
              <span>MyProfile</span>
            </a>
          </Link>
        </span>
      </Menu.Item>
      <Menu.Item key="aa2">
        <Icon type="user" />
        <span>
          <Link href={'/presonal/login'}>
            <a>
              <span>Login</span>
            </a>
          </Link>
        </span>
      </Menu.Item>
    </SubMenu>

    <Menu.Item key="a1">
      <span>
        <Icon type="team" />
        <span>Customer</span>
      </span>
      <Link href="/customer">
        <a>Customer</a>
      </Link>
    </Menu.Item>

    <SubMenu
      key="product"
      title={
        <span>
          <Icon type="solution" />
          <span>Product</span>
        </span>
      }
    >
      <Menu.Item key="b1">
        <Link href="/product">
          <a>Product </a>
        </Link>
      </Menu.Item>
    </SubMenu>

    <SubMenu
      key="report"
      title={
        <span>
          <Icon type="area-chart" />
          <span>Report</span>
        </span>
      }
    >
      <Menu.Item key="e1">
        {' '}
        <span>
          <Link href="/report/demo1">
            <a>Report Demo1</a>
          </Link>{' '}
        </span>
      </Menu.Item>
      <Menu.Item key="e2">
        {' '}
        <span>
          <Link href="/report/demo2">
            <a>Report Demo2</a>
          </Link>{' '}
        </span>
      </Menu.Item>
      <Menu.Item key="e3">
        {' '}
        <span>
          <Link href="/report/demo3">
            <a>Report Demo3</a>
          </Link>{' '}
        </span>
      </Menu.Item>
    </SubMenu>

    <SubMenu
      key="sub7"
      title={
        <span>
          <Icon type="profile" />
          <span>admin</span>
        </span>
      }
    >
      <Menu.Item key="f1">
        <Icon type="user" />
        <span>
          <Link href={'/admin/user'}>
            <a>
              <span>UserList</span>
            </a>
          </Link>
        </span>
      </Menu.Item>
      <Menu.Item key="f2">
        <Link href="#">
          <a>permission-Template</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="f3">
        <Link href="#">
          <a>permission</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="f4">Board</Menu.Item>
      <Menu.Item key="f5">
        <Link href="#">
          <a>BoardManage</a>
        </Link>{' '}
      </Menu.Item>
    </SubMenu>
    <SubMenu
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
    </SubMenu>
  </Menu>
)
