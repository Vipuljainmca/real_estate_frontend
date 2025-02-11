import React from "react";
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import {  Button,  Menu, theme, } from "antd";
import { Header } from "antd/es/layout/layout";


const HeaderApp = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
      let userMenu = (
        <Menu
        //  onClick={onHandleLink}
        >
            <Menu.Item icon={<LogoutOutlined />} key={"logout"}>
                {/* <a onClick={()=>performLogout(dispatch)}>Log Out</a> */}
            </Menu.Item>
        </Menu>
    );
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <div style={{ margin : "0 20px",display : "flex", justifyContent : "space-between"}}>
                <div>
        <Button
          type="text"
          icon={true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        //   onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        Real Estate
        </div>
       
                                </div>
                           
      </Header>
    );
};

export default HeaderApp;
