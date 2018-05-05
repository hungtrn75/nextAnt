import Head from 'next/head'
import { Avatar } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import Nav from '../nav'
const { Header, Content, Sider, Footer } = Layout;
import { Row, Col } from 'antd';




export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
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
              <Col span={1}>  <Icon
                className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              /></Col>
              <Col span={20}>
                <div style={{ position: 'absolute', top: '-5px', right: '20px' }}>
                  <span style={{ marginRight: '20px;' }} >首頁</span>
                  <Icon type="bell" style={{ marginRight: '20px' }} />
                  <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                </div>
              </Col>
            </Row>


          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 300 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout >
    );
  }
}


