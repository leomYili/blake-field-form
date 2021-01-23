import React from 'react';
import Form, { FormInstance } from '../src';

import { Input, Button, Checkbox } from 'antd';

import 'antd/dist/antd.css';
import { useForm } from '../src/Form';

const list = new Array(1111).fill(() => null);

interface FormValues {
  username?: string;
  password?: string;
  path1?: {
    path2?: string;
  };
}

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values, form.getFieldsValue());
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleClick = () => {
    form
      .validateFieldsAndScroll()
      .then(values => {
        console.log('121212', values);
      })
      .catch(error => {
        console.info('error', error);
      });
  };

  return (
    <Form
      {...layout}
      form={form}
      size="large"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username1"
        rules={[{ required: true, message: 'Please input your username!' }]}
        extra="We must make sure that your are a human."
      >
        <Input />
      </Form.Item>

      <Form.Item label="Username" name="username2" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Username" name="username3" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username12"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              const password = getFieldValue('password');
              if (password === '123' && value === '123') {
                return Promise.reject('123');
              }
              if (password === '12' && value === '123') {
                return Promise.reject('321');
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={handleClick}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
