import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';

import AccessDenied from '../../components/AccessDenied';

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

function Inspection() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [inspection, setInspection] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  if (role !== 'ROLE_SUBMANAGER') {
    return <AccessDenied />;
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '등록에 성공하였습니다',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '등록에 실패하였습니다',
    });
  };

  const registHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('inspection', inspection);
    formData.append('id', id);
    try {
      const response = await axios.post('/api/inspection/regist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      success();
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  const loadHandler = (e) => {
    setInspection(e);
    return false;
  };

  useEffect(() => {}, []);

  return (
    <div className="HomeBox">
      <motion.div
        className="EducationsBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {loading && <Loading />}
        {contextHolder}
        <h1 style={{ marginLeft: '2vh' }}>순회점검표 제출</h1>
        <div className="EducationsTextBottom" />
        <Upload
          multiple={false}
          maxCount={1}
          disabled={null}
          listType="picture"
          beforeUpload={loadHandler}
          onRemove={null}
        >
          <Button style={{ marginLeft: '1vw' }} icon={<UploadOutlined />}>
            순회점검 표 제출
          </Button>
        </Upload>
        <Button
          style={{ marginLeft: '1vw', marginTop: '1vh' }}
          type="primary"
          onClick={registHandler}
          disabled={null}
        >
          저장
        </Button>
      </motion.div>
    </div>
  );
}

export default Inspection;
