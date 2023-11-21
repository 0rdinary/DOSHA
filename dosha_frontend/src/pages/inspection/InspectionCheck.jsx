import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button, message } from 'antd';

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

function InspectionCheck() {
  const { accessToken, role } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const [imgSrc, setImgSrc] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  if (role !== 'ROLE_MANAGER') {
    return <AccessDenied />;
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '결제가 완료되었습니다',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '결제를 실패하였습니다',
    });
  };

  useEffect(() => {
    const requestImage = async () => {
      const url = process.env.REACT_APP_DB_HOST + '/api/inspection/get/image';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      try {
        const response = await axios.get(url, {
          responseType: 'blob',
          params: { id: state.id },
          headers,
        });
        console.log(response.data);
        const newFile = new File([response.data], '순회점검표');
        const reader = new FileReader();
        reader.onload = (ev) => {
          const previewImage = String(ev.target?.result);
          setImgSrc(previewImage);
        };
        reader.readAsDataURL(newFile);
        setImgSrc(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    requestImage();
  }, []);

  const checkHandler = async () => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_DB_HOST + '/api/inspection/check';
      const headers = {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post(
        url,
        { id: state.id },
        {
          headers,
        },
      );
      console.log(response);
      success();
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  return (
    <div className="HomeBox">
      <motion.div
        className="CompanyBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {loading ? <Loading /> : null}
        {contextHolder}
        <h1 style={{ marginLeft: '2vh' }}>순회점검표 결제</h1>
        <div className="CompanyTextBottom" />
        <img className="PreviewBox" src={`${imgSrc}`} alt="순회점검표" />
        <Button
          type="primary"
          style={{ marginLeft: '1vw' }}
          onClick={checkHandler}
        >
          결제하기
        </Button>
      </motion.div>
    </div>
  );
}

export default InspectionCheck;
