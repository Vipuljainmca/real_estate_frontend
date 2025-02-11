import { Button, Col, Popover, Row, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import React from "react";

interface FilterProps {
    resetFilters: () => void;
    closeFilter: boolean;
    setCloseFilter: (value: boolean) => void;
    FilterBox: React.ReactNode;
}

const Filter: React.FC<FilterProps> = ({ resetFilters, closeFilter, setCloseFilter, FilterBox }) => {
    return (
        <Tooltip title="Filters">
            <Popover
                style={{ marginRight: "10px" }}
                placement="bottomLeft"
                title={
                    <div>
                        <Row style={{ display: "flex" }}>
                            <Col span={10} style={{ marginTop: "4px" }}>
                                <FilterOutlined /> Filter
                            </Col>
                            <Col span={14} style={{ color: "#31A6C7", textAlign: "end" }}>
                                <Button type="link" onClick={resetFilters}>Reset</Button>
                            </Col>
                        </Row>
                    </div>
                }
                content={FilterBox}
                trigger="hover"
                onOpenChange={() => setCloseFilter(!closeFilter)}
                open={closeFilter}
            >
                <Button
                    style={{
                        textAlign: "center",
                        alignContent: "center",
                        border: 0,
                    }}
                >
                    <FilterOutlined />
                </Button>
            </Popover>
        </Tooltip>
    );
};

export default Filter;
