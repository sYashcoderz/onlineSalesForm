import { useState } from "react";
import { Row, Col, Form, Input, Space, Checkbox,} from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomHeadTitle, StyledHr, SubmitButton, CustomButton } from "./styledComponent.jsx";
import FinalForm from "./Form/index.jsx";
const DynamicForm = () =>{
    const [form] = Form.useForm();
    const [ showFinalForm, setShowFinalForm ] = useState(false);
    const [ formData, setFormData ] = useState(false);

    const onFinish = async (values) => {
        if (values?.config_consent) {
            const data = await GenerateConfigData(values);
            saveFormConfig(data)
        }

        setShowFinalForm(true);
        setFormData(values);
    }

    const GenerateConfigData = (configData) => {
        console.log("Config ==>>", configData);

        const resultArray = Object.entries(configData)
            .filter(([fieldType, values]) => values !== undefined && Array.isArray(values))
            .map(([fieldType, values]) => values.map(label => ({ fieldType, label })))
            .flat();

            console.log(resultArray);
        return resultArray;
    } 

    const saveFormConfig = (formFields) => {
        if (formFields.length === 0) {
            alert("No form fields to save.");
            return;
        }

        try {
            const json = JSON.stringify(formFields);
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "formConfig.json";
            a.click();
            URL.revokeObjectURL(url);
            alert("Form configuration saved successfully!");
        } catch (error) {
            alert("Error saving form configuration.");
        }
    };

    return (
        <>
            <Row style={{ width:'100%', display:'flex', justifyContent:'center' }}>
                { !showFinalForm ?
                    <Col xl={6} lg={10} md={15} sm={20} xs={24}>
                        <CustomHeadTitle>Online Sales Demo From</CustomHeadTitle>
                        <Form name="register"
                            form={form}
                            onFinish={onFinish}
                            scrollToFirstError
                            style={{ width: '100%'}}
                        >
                            <div>Form Title</div>
                            <Form.Item name="title"
                                rules={[
                                    {
                                    required: true,
                                    message: "Please input title!",
                                    whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Enter title" />
                            </Form.Item>
                            
                            <span>Form Description</span>
                            <Form.Item name="description"
                                rules={[
                                    {
                                    required: true,
                                    message: "Please input yourdescription!",
                                    whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Enter Description" />
                            </Form.Item>

                            <StyledHr />

                            <Form.List name="text_fields"
                                rules={[
                                {
                                    validator: async (_, names) => {
                                    if (!names || names.length < 2) {
                                        return Promise.reject(new Error('At least 2 inputs'));
                                    }
                                    },
                                },
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                <>
                                    <Form.Item>
                                        <CustomButton
                                            onClick={() => add()}
                                            style={{
                                                width: '100%',
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Input Field
                                        </CustomButton>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>

                                    {fields.map((field, index) => (
                                    <Form.Item
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input something or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                        >
                                        <Input
                                            placeholder="Enter Input Field Label"
                                            style={{ width: '95%' }}
                                        />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                        ) : null}
                                    </Form.Item>
                                    ))}
                                </>
                                )}
                            </Form.List>

                            <StyledHr />

                            <Form.List name="Checkboxs">
                                {(fields, { add, remove }) => (
                                <>
                                    <Form.Item>
                                        <CustomButton style={{ width: '100%'}}  onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Checkbox Field
                                        </CustomButton>
                                    </Form.Item>
                    
                                    {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        align="baseline"
                                    >
                                        <Form.Item
                                        {...restField}
                                        name={[name, 'first']}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Missing checkbox attribute name',
                                            },
                                        ]}
                                        >
                                            <Input placeholder="Input field attribute name" />
                                        </Form.Item>

                                        <Form.Item
                                        {...restField}
                                        name={[name, 'last']}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Missing options for dropdown',
                                            },
                                        ]}
                                        >
                                            <Input placeholder="Enter options using , seprator" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                    ))}
                                </>
                                )}
                            </Form.List>

                            <StyledHr />

                            <Form.List name="dropdown">
                                {(fields, { add, remove }) => (
                                <>
                                    <Form.Item>
                                        <CustomButton style={{ width: '100%'}}  onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Drop-down
                                        </CustomButton>
                                    </Form.Item>

                                    {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        align="baseline"
                                    >
                                        <Form.Item
                                        {...restField}
                                        name={[name, 'first']}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Missing drop-down attribute name',
                                            },
                                        ]}
                                        >
                                            <Input placeholder="drop-down attribute name" />
                                        </Form.Item>

                                        <Form.Item
                                        {...restField}
                                        name={[name, 'last']}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Missing options for dropdown',
                                            },
                                        ]}
                                        >
                                            <Input placeholder="Enter options using , seprator" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                    ))}
                                </>
                                )}
                            </Form.List>

                            <StyledHr />

                            <Form.List name="radio_fields">
                                {(fields, { add, remove }) => (
                                <>
                                    <Form.Item>
                                        <CustomButton style={{ width: '100%'}}  onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Radio Field
                                        </CustomButton>
                                    </Form.Item>
                    
                                    {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        align="baseline"
                                    >
                                        <Form.Item
                                        {...restField}
                                        name={[name, 'first']}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Missing radio attribute name',
                                            },
                                        ]}
                                        >
                                            <Input placeholder="Input field attribute name" />
                                        </Form.Item>

                                        <Form.Item
                                        {...restField}
                                        name={[name, 'last']}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Missing options for dropdown',
                                            },
                                        ]}
                                        >
                                            <Input placeholder="Enter options using , seprator" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                    ))}
                                </>
                                )}
                            </Form.List>

                            <StyledHr />

                            <Form.List name="textarea_fields"
                                rules={[]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                <>
                                    <Form.Item>
                                        <CustomButton
                                            
                                            onClick={() => add()}
                                            style={{
                                            width: '100%',
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Textarea Field
                                        </CustomButton>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                
                                    {fields.map((field, index) => (
                                    <Form.Item
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input something or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                            >
                                            <Input
                                                placeholder="Enter Textarea Field Label"
                                                style={{ width: '95%' }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                        ) : null}
                                    </Form.Item>
                                    ))}
                                </>
                                )}
                            </Form.List>

                            <Form.Item name="config_consent"
                                valuePropName="checked"
                                >
                                <Checkbox>Agree to save form config...</Checkbox>
                            </Form.Item>

                            <Form.Item >
                                <SubmitButton type="primary" htmlType="submit" loading={false}>
                                    Proceed
                                </SubmitButton>
                            </Form.Item>
                        </Form>
                    </Col> :
                    <Col>
                        <FinalForm formData={formData} />
                    </Col>
                }
            </Row>
        </>
    )
}

export default DynamicForm;