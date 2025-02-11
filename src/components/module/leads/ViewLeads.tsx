import { Button, Col, Collapse, Divider, Form, Modal, Popconfirm, Row, Select, Spin, Table, Typography } from 'antd'
import React, { useEffect, useState,useRef } from 'react'
import {PlusOutlined} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { deleteApi, downloadFile, getApi, getFileApi } from '../../comman/apiRequest.ts';
import Filter from '../../comman/Filter.tsx';
import UploadFiles from './UploadFiles.tsx';

const {Panel} = Collapse;

const ViewLeads = () => {
    const navigate = useNavigate();
    const formRef = useRef();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [closeFilter, setCloseFilter] = useState(false);
    const [filterKeys, setFilterKeys] = useState({});
    const [openAddFile, SetOpenAddFile] = useState({});
    const [openViewFile, SetopenViewFile] = useState({});
    const [ViewFileData, setViewFileData] = useState([]);

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
            title : "Phone Number",
            key : 3,
            render : (item)=> item?.phone,
        },
       
       
        // {
        //     title : "Add File",
        //     key : 7,
        //  render : (item,record)=> <a onClick={() => SetOpenAddFile(record)}> Add File</a>,
        // },
        // {
        //     title : "View File",
        //     key : 7,
        //  render : (item,record)=> <a onClick={() => SetopenViewFile(record)}> View File</a>,
        // },
        {
            title : "Action",
            key : 6,
            render : (item,record) => <>
         <a onClick={() => editObject(record)}> Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={() => deleteObject(record)}
                        okText="Yes"
                        cancelText="No">
                        <a  >Delete</a>
                    </Popconfirm>
            </>
        },
    ]
    useEffect(()=>{
        loadUserData();
    },[filterKeys])
    useEffect(()=> {
        if(openViewFile?._id){
            getFile();
        }
    },[openViewFile])
    const loadUserData = () => {
        setLoading(true);
        const params = filterKeys;
        const successFn = (data) => {
            console.log(data);
            setTableData(data);
            setLoading(false);
        }
        const errorFn = (error) => {
            setLoading(false);
            console.log(error);
        }
        getApi("leads",params,successFn,errorFn);
    }
    const editObject = (record) => {
    console.log(record)
    navigate("/leads/add",{
        state : {data : record}
    })
    }
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
        deleteApi("leads",record._id,successFn,errorFn);
        
    }
    const getFile = () => {
        
        const successFn = (data) => {
            setViewFileData(data);
        };
        const errorFn = (error) => {
            console.log(error)
        }
        getFileApi("documents",openViewFile?._id,successFn,errorFn)
    }
    const filterData =  (type, value) => {
        setFilterKeys({ ...filterKeys, [type]: value ? value : undefined });
   };
    const FilterBox = (
        <>
            <Form ref={formRef}>
                <Collapse defaultActiveKey={["categories"]} style={{ width: "300px", padding: 0 }}>
                    <Panel header="Name" key="name">
                        <Form.Item name="name">
                            <Select
                                showSearch
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="Name"
                                optionFilterProp="children"
                                onChange={(value: string | undefined) => filterData("name", value)}
                            >
                                {tableData.map((option: Option) => (
                                    <Select.Option key={option._id} value={option?.name}>
                                        {option?.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Panel>
        
                    <Panel header="phone" key="phone">
                        <Form.Item name="phone">
                            <Select
                                showSearch
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="phone"
                                optionFilterProp="children"
                                onChange={(value: string | undefined) => filterData("phone", value)}
                            >
                                {tableData.map((option: Option) => (
                                    <Select.Option key={option?._id} value={option?.phone}>
                                        {option?.phone}
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
    <>
    <div>
      <Row gutter={[12,12]} style={{display:"flex",justifyContent:"space-between", margin:"10px" }}>
            <Col >
            <Typography.Text style={{fontSize:"16px", fontWeight:"600"}}> View All Leads</Typography.Text>
            </Col>
            <Col style={{display:"flex",justifyContent:"space-between", margin:"10px" }}>
        <Button icon={<PlusOutlined />} onClick={()=> navigate("/leads/add")} style={{backgroundColor:"#1677ff", color:"white"}}>
            Add Leads
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
    //   pagination={false}
      />
      </Spin>
    </div>
    <Modal open={openAddFile?._id} onCancel={()=>SetOpenAddFile({})}
                title={<div >Add File</div>}
                destroyOnClose
                footer={false} width={800}>
               <UploadFiles openAddFile={openAddFile} SetOpenAddFile={SetOpenAddFile} />
    </Modal>
    <Modal open={openViewFile?._id} onCancel={()=>{SetopenViewFile({})
    setViewFileData([]);
}}
                title={<div >Edit File</div>}
                destroyOnClose
                footer={false} width={800}>
               this is Edit file modal
               <Table
               dataSource={ViewFileData} 
               columns ={[
                {
                    title : "#",
                    key : "1",
                    render : (item,record, index)=>  index+1,
                },
                {
                    title : "name",
                    key : "2",
                    render : (item)=>  item?.name,
                },
                {
                    title : "Action",
                    key : "2",
                    render : (item,record)=> <>
                    <a onClick={()=> {
                        // getFileApi("download",record?._id,(data)=>{console.log(data)},(err)=>{console.log(err)})
                        downloadFile(record?._id,record?.name)
                    }}> Download</a>
                               <Divider type="vertical" />
                               <Popconfirm
                                   title="Are you sure to delete this?"
                                   onConfirm={() => 
                                   {
                                    deleteApi("documents",record?._id,()=>{getFile()},()=>{})
                                   }
                                   }
                                   okText="Yes"
                                   cancelText="No">
                                   <a  >Delete</a>
                               </Popconfirm>
                       </>,
                }
            ]
            }
               />
    </Modal>
    </>
   
    
  )
}

export default ViewLeads;
