import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";

const SiderApp: React.FC = () => {
    const navigate = useNavigate();


    return (
        <Sider style={{ height: "100vh", paddingTop: "80px" }} trigger={null} collapsible collapsed>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={
                 [ {
                    key: '1',
                    icon: <UserOutlined />,
                    label: "Leads",
                    onClick :  () => navigate("/leads/view")
                },
                {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label : "Property",
                    onClick :  () => navigate("/Property/view")
                }
            ]
            } />
        </Sider>
    );
};

export default SiderApp;
