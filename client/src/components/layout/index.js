import React from 'react'
import PropTypes from 'prop-types'
import { adopt } from 'react-adopt'
import { Toggle, State } from 'react-powerplug'
import { Avatar, Layout, Icon, Row, Col } from 'antd'

import Nav from '../nav'

const { Header, Content, Sider } = Layout

const AdoptContainer = adopt({
  toggleMenuModal: <Toggle initial={false} />,
  loginState: ({ loginUser, render }) => (
    <State initial={{ loginUser }}>{render}</State>
  )
})

export const GlobalBlock = React.createContext()

const MyLayout = ({ children, loginUser }) => (
  <AdoptContainer loginUser={loginUser}>
    {({ toggleMenuModal, loginState }) => {
      const {
        state: { loginUser }
      } = loginState

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
                        top: '-5px',
                        right: '20px'
                      }}
                    >
                      <span style={{ marginRight: '20px;' }}>Main</span>
                      <Icon type="bell" style={{ marginRight: '20px' }} />
                      {loginUser ? (
                        <Avatar
                          style={{ backgroundColor: '#87d068' }}
                          src={loginUser.picture}
                        />
                      ) : (
                        <Avatar
                          style={{ backgroundColor: '#87d068' }}
                          icon="user"
                        />
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
