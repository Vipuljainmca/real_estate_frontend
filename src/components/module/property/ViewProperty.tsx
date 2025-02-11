import { Button, Col, Collapse, Divider, Form, Popconfirm, Popover, Row, Select, Space, Spin, Table, Tooltip, Typography } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import {FilterOutlined, PlusOutlined} from "@ant-design/icons";
import { useNavigate,  } from 'react-router-dom';
import { deleteApi, getApi } from '../../comman/apiRequest.ts';
// import Panel from 'antd/es/splitter/Panel';
import { availability, categories, Option } from '../../../constant/hardData.ts';
import Filter from '../../comman/Filter.tsx';
// import { deleteApi,  getApi } from '../../Comman/apiRequest';

const { Panel } = Collapse;

const ViewProperty = () => {
    const navigate = useNavigate();

    // const formRef = useRef()
    const formRef = useRef();
    const [rawData, setRawData] = useState({});
    const [filterKeys, setFilterKeys] = useState({});
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [closeFilter, setCloseFilter] = useState(false);
    const columns = [
        {
            title : "#",
            key : "1",
            render : (item,record, index)=>  index+1,
        },
        {
            title :"Name",
            key :"2",
            render : (item)=> item?.name,
        },
        {
            title : "Type",
            key : 3,
            render : (item)=> item?.type,
        },
        {
            title : "Location",
            key : 4,
            render : (item)=> item?.location,
        },
        {
            title : "Size (Sq.ft)",
            key : 5,
            render : (item)=> item?.size,
        },
        {
            title : "Budget",
            key : 6,
            render : (item)=> item?.budget,
        },
        {
            title : "Availability",
            key : 7,
            render : (item)=> item?.availability,
        },
        {
            title : "Action",
            key : 8,
            render : (item,record) => <>
         <a onClick={() => editObject(record)}> Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={() => deleteObject(record)}
                        okText="Yes"
                        cancelText="No">
                        <a>Delete</a>
                    </Popconfirm>
            </>
        }
    ]
    useEffect(()=>{
        loadUserData();
    },[filterKeys])
    const loadUserData = () => {
        setLoading(true);
        const params = filterKeys;
        const successFn = (data) => {
            setLoading(false);
            setTableData(data);
        }
        const errorFn = (error) => {
            setLoading(false);
            console.log(error);
        }
        getApi("property",params,successFn,errorFn);
    }
    const editObject = (record) => {
    console.log(record)
    navigate("/property/add",{
        state : {data : record}
    })
    }
    const filterData =  (type, value) => {
         setFilterKeys({ ...filterKeys, [type]: value ? value : undefined });
    };
    const deleteObject = (record) => {
        setLoading(true);
        console.log(record)
        const successFn = (data) => {
            setLoading(false);
            console.log(data);
            loadUserData();
        };
        const errorFn = (error) => {
            setLoading(false);
            console.log(error);
        }
        deleteApi("property",record?._id,successFn,errorFn);
        
    }
    const FilterBox = (
        <>
            <Form ref={formRef}>
                <Collapse defaultActiveKey={["categories"]} style={{ width: "300px", padding: 0 }}>
                    <Panel header="Categories" key="categories">
                        <Form.Item name="type">
                            <Select
                                showSearch
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="Categories"
                                optionFilterProp="children"
                                onChange={(value: string | undefined) => filterData("type", value)}
                            >
                                {categories.map((option: Option) => (
                                    <Select.Option key={option.id} value={option.value}>
                                        {option.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Panel>
        
                    <Panel header="Availability" key="availability">
                        <Form.Item name="availability">
                            <Select
                                showSearch
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="Availability"
                                optionFilterProp="children"
                                onChange={(value: string | undefined) => filterData("availability", value)}
                            >
                                {availability.map((option: Option) => (
                                    <Select.Option key={option.id} value={option.value}>
                                        {option.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Panel>
                </Collapse>
            </Form>
        </>
    );
    const resetFilters = () => {
        setFilterKeys({});
        formRef.current.resetFields();
    };
  return (
    <div>
      <Row gutter={[12,12]} style={{display:"flex",justifyContent:"space-between", margin:"10px" }}>
            <Col >
            <Typography.Text style={{fontSize:"16px", fontWeight:"600"}}> View All Property</Typography.Text>
            </Col>
            
            <Col  style={{display:"flex",justifyContent:"space-between", margin:"10px" }} >
            
        <Button icon={<PlusOutlined />} onClick={()=> navigate("/property/add")} style={{backgroundColor:"#1677ff", color:"white"}}>
            Add Property
        </Button>
        <div style={{ marginLeft: "10px" }}>
                        <Filter resetFilters={resetFilters} closeFilter={closeFilter} setCloseFilter={setCloseFilter} FilterBox={FilterBox} />
                    </div>
            </Col>
      </Row>
      <Spin spinning={loading} >
      <Table
      dataSource={tableData}
      columns={columns}
      pagination={true}
      />
      </Spin>
    </div>
  )
}

export default ViewProperty;
