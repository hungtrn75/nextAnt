import Head from 'next/head'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import Nav from '../nav'
const { Header, Content, Sider, Footer } = Layout;




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
        >
          <div className="logo" />
          <Nav />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 300 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}


