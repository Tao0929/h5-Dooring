import React, { memo, useEffect } from 'react';
import {
  Form,
  Select,
  Input,
  Modal
} from 'antd';
import Upload from '@/components/Upload';

// import styles from './index.less';
const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditorModal = (props) => {
  const { item, onSave, visible, onCancel } = props
  const onFinish = values => {
    onSave && onSave(values)
  }
  const handleOk = () => {
    form.validateFields().then(values => {
      console.log(values)
      values.id = item.id
      onSave && onSave(values)
    }).catch(err => {
      console.log(err)
    })
  }

  const [form] = Form.useForm()

  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [item])

  return !!item && (
    <Modal
      title="编辑数据源"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
    >
      <Form
        form={form}
        name={`form_editor_modal`}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={item}
      >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <Input />
        </Form.Item>
        <Form.Item label="链接地址" name="link">
          <Input />
        </Form.Item>
        {
          !!window['currentCates'] && 
          <Form.Item label="分类" name="type" rules={[{ required: true, message: '请选择分类!' }]}>
            <Select placeholder="请选择">
              {
                window['currentCates'].map((v, i) => {
                  return <Option value={i} key={i}>{ v }</Option>
                })
              }
            </Select>
          </Form.Item>
        }
        
        <Form.Item label="上传图片" name="imgUrl" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload />
        </Form.Item>
      </Form>
    
    </Modal>
  )
}

export default memo(EditorModal)