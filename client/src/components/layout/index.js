import React from 'react'
import { Avatar, Layout, Icon, Row, Col } from 'antd'
import { adopt } from 'react-adopt'
import { Toggle, Value, State } from 'react-powerplug'

import Nav from '../nav'
const { Header, Content, Sider } = Layout

const AdoptContainer = adopt({
  toggleMenuModal: <Toggle initial={false} />,
  token: <Value initial={''} />,
  loginInfo: <Value initial={''} />,
  loginState: <State initial={{ loginState: false }} />
})
export const GlobalBlock = React.createContext()

export default props => {
  return (
    <AdoptContainer>
      {({ toggleMenuModal, token, loginInfo, loginState }) => {
        let loginblock = {}
        let loginInfoData = ''
        console.log("JSON.parse( localStorage.getItem('loginIngo')")

        const handleLoginCheck = () => {
          //only front end check
          if (!process.browser) {
            return
          }
          if (localStorage.getItem('loginInfo')) {
            loginInfoData = JSON.parse(localStorage.getItem('loginInfo'))

            console.log('---check handleLoginCheck---')
            console.log(loginInfoData)
          }
          if (!loginInfoData) {
            loginState.setState({ loginState: true })
            loginInfo.setValue(loginInfoData)
          } else {
            loginState.setState({ loginState: false })
            loginInfo.setValue('')
          }
        }

        const handleLogout = resultX => {
          resultX.e.preventDefault()

          localStorage.removeItem('loginInfo')
          loginState.setState({ loginState: false })
          loginInfo.setValue('')
        }
        const handleLogin = resultX => {
          resultX.e.preventDefault()
          resultX.form.validateFields(async (err, values) => {
            if (!err) {
              fetch('http://localhost:8080/auth/login', {
                method: 'post',
                body: JSON.stringify(values),
                mode: 'cors',
                headers: {
                  Accept:
                    'application/json, application/xml, text/plain, text/html, *.*',
                  'Content-Type': 'application/json'
                }
              })
                .then(Response => {
                  return Response.json()
                })
                .then(result => {
                  if (result.success) {
                    localStorage.setItem('loginInfo', JSON.stringify(result))
                    loginState.setState({ loginState: true })
                  } else {
                    alert('account& password not match ')
                  }
                })
            }
          })
        }
        const handleLoginEvent = { handleLoginCheck, handleLogout, handleLogin }

        loginblock = { loginState, loginInfo, handleLoginEvent }
        return (
          <GlobalBlock.Provider value={loginblock}>
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
                        <Avatar
                          style={{ backgroundColor: '#87d068' }}
                          icon="user"
                        />
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
                  {props.children}
                </Content>
              </Layout>
            </Layout>
          </GlobalBlock.Provider>
        )
      }}
    </AdoptContainer>
  )
}
