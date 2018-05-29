import React from 'react'
import PropTypes from 'prop-types'

import { adopt } from 'react-adopt'
import { Toggle, State } from 'react-powerplug'
import { Avatar, Dropdown, Layout, Icon, Row, Col, Button, Menu } from 'antd'

import { logoutAction } from '../../features/auth/grapgql'
import goto from '../../lib/goto'

import Nav from '../nav'

const { Header, Content, Sider } = Layout

const AdoptContainer = adopt({
  logoutAction,
  toggleMenuModal: <Toggle initial={false} />,
  loginState: ({ loginUser, render }) => (
    <State initial={{ loginUser }}>{render}</State>
  )
})

export const GlobalBlock = React.createContext()

const MyLayout = ({ children, loginUser }) => (
  <AdoptContainer loginUser={loginUser}>
    {({ toggleMenuModal, logoutAction, loginState }) => {
      const {
        state: { loginUser }
      } = loginState

      const handleLogout = async () => {
        await logoutAction.mutation()
        loginState.setState({ loginUser: null })
      }

      const menu = (
        <Menu>
          <Menu.Item key="0">
            <div onClick={goto('/presonal')}>Profile</div>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={handleLogout}>
            Log out
          </Menu.Item>
        </Menu>
      )

      return (
        <GlobalBlock.Provider value={{ loginState }}>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={toggleMenuModal.on}
              style={{ minHeight: '100vh' }}
              breakpoint="lg"
              collapsedWidth="0"
            >
              <div className="logo" />
              <Nav />
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Row type="flex" justify="space-between">
                  <Col span={1}>
                    {' '}
                    <Icon
                      className="trigger"
                      type={toggleMenuModal.on ? 'menu-unfold' : 'menu-fold'}
                      onClick={toggleMenuModal.toggle}
                      style={{ marginLeft: '15px' }}
                    />
                  </Col>
                  <Col span={20}>
                    <div
                      style={{
                        position: 'absolute',
                        right: '20px'
                      }}
                    >
                      {loginUser ? (
                        <Dropdown overlay={menu} trigger={['click']}>
                          <Avatar
                            style={{
                              backgroundColor: '#87d068',
                              cursor: 'pointer'
                            }}
                            src={loginUser.picture}
                            size="large"
                          />
                        </Dropdown>
                      ) : (
                        <div>
                          <Button
                            style={{ marginRight: '10px' }}
                            onClick={goto('/presonal/signup')}
                          >
                            Sign Up
                          </Button>
                          <Button
                            type="primary"
                            onClick={goto('/presonal/login')}
                          >
                            Log in
                          </Button>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Header>
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: 300
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </GlobalBlock.Provider>
      )
    }}
  </AdoptContainer>
)

MyLayout.propTypes = {
  loginUser: PropTypes.object,
  children: PropTypes.object
}

export default MyLayout
