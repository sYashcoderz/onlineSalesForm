import { useState } from "react";
import { Checkbox, Col, Form, Input, Radio, Row, Select, } from "antd";
import { SubmitButton } from "../styledComponent";

const FinalForm = ({formData}) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [selectedValue, setSelectedValue] = useState('');
    const [showFormValues, setShowFormValues] = useState(false);
    const [formResult, setFormResults] = useState({});

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        setFormResults(values);
        setShowFormValues(true);
    }

    const handleValueChange = (value) => {
        setSelectedValue(value);
    };

    console.log("From Data ==>>", formData);
    return(
        <>
            <Row style={{ width:'100%' }}>
                <Col span={24} style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
                    <h2>{formData?.title}</h2>
                    <p style={{ fontSize:'14px' }}>{formData?.description}</p>
                </Col>

                <Col xl={8} lg={10} md={15} sm={20} xs={24} >
                    <Form
                        form={form}
                        name="submit"
                        onFinish={onFinish}
                        scrollToFirstError
                    >
                        { formData && formData?.text_fields && formData?.text_fields?.map((item, index) => { 
                            const trimmedItem =  item.replace(/\s+/g, '')
                            return( 
                            <Form.Item
                                key={index}
                                name={trimmedItem}
                                label={item}
                                rules={[
                                    {
                                    required: true,
                                    message: `Please input your ${item}`,
                                    whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        ) }) }

                        { formData && formData?.Checkboxs && formData?.Checkboxs?.map((item, index) => {
                            let dynamicOpt = item?.last.split(',');
                            console.log("dynamicOpt ==>>", dynamicOpt); 
                            return( 
                                <Form.Item
                                    name={item?.first}
                                    label={item?.first}
                                    rules={[
                                        {
                                        required: true,
                                        message: `Please select ${item?.first}`,
                                        },
                                    ]}
                                    >
                                        <Checkbox.Group>
                                            <Row>
                                                {dynamicOpt.map((country) => (
                                                <Checkbox key={country} value={country}>
                                                    {country}
                                                </Checkbox>
                                                ))}
                                            </Row>
                                        </Checkbox.Group>
                                </Form.Item>
                        ) }) }

                        { formData && formData?.radio_fields && formData?.radio_fields?.map((item, index) => {
                            let dynamicOpt = item?.last.split(',');
                            console.log("dynamicOpt ==>>", dynamicOpt); 
                            return( 
                                <Form.Item
                                    name={item?.first}
                                    label={item?.first}
                                    rules={[
                                        {
                                        required: true,
                                        message: `Please select ${item?.first}`,
                                        },
                                    ]}
                                    >
                                        <Radio.Group>
                                            {dynamicOpt.map((country) => (
                                            <Radio key={country} value={country}>
                                                {country}
                                            </Radio>
                                            ))}
                                        </Radio.Group>
                                </Form.Item>
                        ) }) }

                        { formData && formData?.dropdown && formData?.dropdown?.map((item, index) => {
                            let dynamicOpt = item?.last.split(',');
                            console.log("dynamicOpt ==>>", dynamicOpt); 
                            return( 
                                <Form.Item
                                    name={item?.first}
                                    label={item?.first}
                                    rules={[
                                        {
                                        required: true,
                                        message: `Please select ${item?.first}`,
                                        },
                                    ]}
                                    >
                                        <Select value={selectedValue} onChange={handleValueChange} style={{ width: 200, marginRight:'500px' }}>
                                        <Option value="">Select a value</Option>
                                        {dynamicOpt.map((country) => (
                                        <Option key={country} value={country}>
                                            {country}
                                        </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                        ) }) }

                        { formData && formData?.textarea_fields && formData?.textarea_fields?.map((item, index) => { 
                            const trimmedItem =  item.replace(/\s+/g, '')
                            return( 
                            <Form.Item
                                key={index}
                                name={trimmedItem}
                                label={item}
                                rules={[
                                    {
                                    required: true,
                                    message: `Please input your ${item}`,
                                    whitespace: true,
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        ) }) }

                        <Form.Item >
                            <SubmitButton type="primary" htmlType="submit">
                                Submit
                            </SubmitButton>
                        </Form.Item>
                    </Form>
                </Col>

                { showFormValues && <Col xl={16} lg={14} md={20} sm={20} xs={24} 
                    style={{ display:'flex', justifyContent: 'space-evenly', alignItems: "center", flexDirection:'column' }}
                >
                    <Col>
                        <h1>Form Data</h1>
                    </Col>
                        {Object.entries(formResult).map(([key, value]) => (
                        <span key={key} style={{ padding:'8px, 0' }}>
                            <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                        ))}
                    </Col>
                }
            </Row>
        </>
    )
}

export default FinalForm;