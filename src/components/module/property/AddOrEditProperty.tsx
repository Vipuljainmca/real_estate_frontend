import {
    Button,
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Spin,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
// import { roleDropdown, statusDropdown } from "../../Comman/hardData";
// import { createUser, postApi, putApi } from "../../Comman/apiRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { postApi, putApi } from "../../comman/apiRequest.ts";
import { availability, categories } from "../../../constant/hardData.ts";


const AddOrEditProperty = ({ allowedPermission }) => {
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
        const data = {
            ...value,
            id : editRecord?._id
        }
        setLoading(true);
        console.log(value);
        const successFn = data => {
            setLoading(true);
            console.log(data);
            navigate("/property/view");
        };
        const errorFn = error => {
            setLoading(false);
            console.log(error);
        };
        if (editRecord) {
            putApi("property", editRecord.id, data, successFn, errorFn);
            
        } else {
            postApi("property",value,successFn,errorFn);
            
            
        }
    };

    return (
        <>
            <Row>
                <Typography.Text
                    style={{ fontSize: "16px", fontWeight: "600" }}>
                    Add Property
                </Typography.Text>
            </Row>

            {/* <Card> */}
                <Spin spinning={loading}>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                    <Row gutter={[12, 12]}>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Property Name" name={"name"} rules={[{required : true}]}>
                                    <Input placeholder="Property Name" />
                                </Form.Item>
                            </Col>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Size" name={"size"} rules={[{required : true}]}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        placeholder="Sq. ft."
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[12, 12]} rules={[{required : true}]}>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="categories" name={"type"} rules={[{required : true}]}>
                                    <Select>
                                        {
                                            categories.map((item)=>
                                                <Select.Option key={item.id} label={item?.name} value={item?.value}>
                                                    {item.name}
                                                </Select.Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={isMobileView ? 24 : 12}>
                            <Form.Item label="availability" name={"availability"} rules={[{required : true}]}>
                            <Select>
                                        {
                                            availability.map((item)=>
                                                <Select.Option key={item.id} label={item?.name} value={item?.value}>
                                                    {item.name}
                                                </Select.Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[12, 12]}>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="location" name={"location"} rules={[{required : true}]}>
                                    <Input placeholder="loction" />
                                </Form.Item>
                            </Col>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Budget" name={"budget"} rules={[{required : true}]}>
                                    <InputNumber
                                        style={{width:"100%"}}
                                        placeholder="Rupees"
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

export default AddOrEditProperty;
