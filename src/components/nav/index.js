import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import Link from 'next/link'
const { SubMenu } = Menu;


export default (props) => {
  return (<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}     >


    <Menu.Item key="home">
      <Icon type="home" />
      <span><Link href={"/"}><a><span> Pos系統首頁</span></a></Link></span>
    </Menu.Item>

    <SubMenu key="customer" title={<span><Icon type="team" /><span>我的帳號</span></span>}>
      <Menu.Item key="aa1">
        <Icon type="user" />
        <span><Link href={'/presonal/presonal'}><a><span>我的帳號</span></a></Link></span>
      </Menu.Item>
      <Menu.Item key="aa2">
        <Icon type="user" />
        <span><Link href={'/presonal/login'}><a><span>登入</span></a></Link></span>
      </Menu.Item>
    </SubMenu>


    <SubMenu key="customer" title={<span><Icon type="team" /><span>客戶資料</span></span>}>
      <Menu.Item key="a1">
        <Link href="/customer/customerAll">
          <a>客戶資料(全)</a>
        </Link></Menu.Item>
      <Menu.Item key="a2">
        <Link href="/customer/customerLimit">
          <a>客戶資料(特定範圍)</a>
        </Link>

      </Menu.Item>
      <Menu.Item key="a3">
        <Link href="/customer/customerSelf">
          <a> 客戶資料(self)</a>
        </Link>
      </Menu.Item>
    </SubMenu>
    <SubMenu key="product" title={<span><Icon type="solution" /><span>產品資料</span></span>}>
      <Menu.Item key="b1">
        <Link href="/product/productAll">產品資料(全)</Link>
      </Menu.Item>
      <Menu.Item key="b2">
        <Link href="/product/productLimit">產品資料(特定範圍)</Link></Menu.Item>
      <Menu.Item key="b3">
        <Link href="/product/productSelf">產品資料(self)</Link></Menu.Item>
    </SubMenu>

    <SubMenu key="event" title={<span><Icon type="gift" /><span>活動</span></span>}>
      <Menu.Item key="c1">
        <Link href="/event/eventInfo"> 活動資訊</Link>
      </Menu.Item>
      <Menu.Item key="c2">
        <Link href="/event/eventTransfer"> 活動優惠</Link></Menu.Item>
      <Menu.Item key="c5">
        <Link href="/event/eventTransferRecord">
          活動紀錄</Link>
      </Menu.Item>
      <Menu.Item key="c6">活動貼紙列印</Menu.Item>
    </SubMenu>

    <SubMenu key="sub6" title={<span><Icon type="area-chart" /><span>報表管理</span></span>}>
      <Menu.Item key="e4">產品銷售日報表</Menu.Item>
      <Menu.Item key="e5">最佳產品銷售</Menu.Item>
      <Menu.Item key="e6">最佳人員銷售</Menu.Item>
    </SubMenu>

    <SubMenu key="sub7" title={<span><Icon type="profile" /><span>管裡者</span></span>}>
      <Menu.Item key="f1">
        <Link href="/admin/employee">員工管理</Link>
      </Menu.Item>
      <Menu.Item key="f2">
        <Link href="/admin/premissonTemplate">權限設定-模板</Link>
      </Menu.Item>
      <Menu.Item key="f3">
        <Link href="/admin/premisson">權限設定-帳號</Link>

      </Menu.Item>
      <Menu.Item key="f4">公告管理</Menu.Item>
      <Menu.Item key="f5">      <Link href="/admin/log">異動紀錄</Link>      </Menu.Item>
    </SubMenu>
    <SubMenu key="sub8" title={<span><Icon type="setting" /><span>環境設定</span></span>}>
      <Menu.Item key="z3">權屬別</Menu.Item>
      <Menu.Item key="z4">縣市別</Menu.Item>
      <Menu.Item key="z5">活動目的</Menu.Item>
      <Menu.Item key="z6">執行動作</Menu.Item>
      <Menu.Item key="z7">商品類別</Menu.Item>
      <Menu.Item key="z8">單位</Menu.Item>
      <Menu.Item key="z16">計算類別 </Menu.Item>
      <Menu.Item key="z17">表單操作動作</Menu.Item>
      <Menu.Item key="z18">員工類別</Menu.Item>
      <Menu.Item key="z19">業務代碼</Menu.Item>
      <Menu.Item key="z20">帳號狀態</Menu.Item>
      <Menu.Item key="z21">權限範圍(調整)</Menu.Item>
      <Menu.Item key="z22">權限動作(調整)</Menu.Item>
      <Menu.Item key="z23">查詢權限(調整)</Menu.Item>
      <Menu.Item key="z24">所有程式設定</Menu.Item>
    </SubMenu>
    <SubMenu key="sub9" title={<span><Icon type="setting" /><span>轉檔程式設定</span></span>}>
      <Menu.Item key="y1">員工資料 </Menu.Item>
      <Menu.Item key="y1">產品基本資料 </Menu.Item>
      <Menu.Item key="y1">產品銷售資料 </Menu.Item>
      <Menu.Item key="y1">員工資料 </Menu.Item>
    </SubMenu>
  </Menu >
  )
}
