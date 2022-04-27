import { Row, Col } from "antd";
import { ReactElement } from "react";


export const DataRow = (
    { title, value, link, target, collapse }: 
    { 
        title?: ReactElement | string, 
        value?: ReactElement | string, 
        link?: string, 
        target?: string,
        collapse?: boolean
     }) =>
    !value ? <>no value</> :
        <Row  style={{ width: "100%", marginBottom: 24 }}>
            <Col push={0} span={collapse ? 24 : 8}>
                {title}
            </Col>
            <Col 
                push={collapse ? 0 : 2} 
                span={collapse ? 24 : 14} 
                style={{
                    textOverflow: "ellipsis",
                    textAlign: "right",
                    overflow: "hidden"
                }}>
                {
                    link ?
                        <a href={link} target={target === undefined ? "_new" : target}>
                            {value}
                        </a>
                        :
                        value
                }
            </Col>
        </Row>