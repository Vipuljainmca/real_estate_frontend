import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Spin,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
// import { roleDropdown, statusDropdown } from "../../Comman/hardData";
// import { createUser, postApi, putApi } from "../../Comman/apiRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { postApi, putApi } from "../../comman/apiRequest.ts";

const AddOrEditLeads = ({ allowedPermission }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [isMobileView, setIsMobileView] = useState(false);
    const navigate = useNavigate();

    const updateScreenSize = () => {
        setIsMobileView(window.innerWidth <= 768);
    };

    const location = useLocation();
    const editRecord = location.state?.data;

    console.log(editRecord);

    useEffect(() => {
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        if (editRecord) {
            form.setFieldsValue(editRecord);
        }
        return () => {
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    const onFinish = value => {
        setLoading(true);
        console.log(value);
        const data = {
            ...value,
            id : editRecord?._id
        }

        const successFn = data => {
            setLoading(true);
            console.log(data);
            navigate("/leads/view");
        };
        const errorFn = error => {
            setLoading(false);
            console.log(error);
        };
        console.log("above")

        if (editRecord) {
                putApi("leads", editRecord._id, data, successFn, errorFn);
        } else {
            console.log("call")
            postApi("leads",value,successFn,errorFn);
           
        }
    };

    return (
        <>
            <Row>
                <Typography.Text
                    style={{ fontSize: "16px", fontWeight: "600" }}>
                    Add Leads
                </Typography.Text>
            </Row>

            {/* <Card> */}
                <Spin spinning={loading}>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <Row gutter={[12, 12]}>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Name" name={"name"} rules={[{required : true}]}>
                                    <Input placeholder="Name" />
                                </Form.Item>
                            </Col>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Phone Number" name={"phone"} rules={[{required : true}]} >
                                    <InputNumber
                                        placeholder="Phone Number"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button
                                htmlType="summit"
                                style={{
                                    backgroundColor: "#1677ff",
                                    color: "white",
                                }}>
                                summit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            {/* </Card> */}
        </>
    );
};

export default AddOrEditLeads;
