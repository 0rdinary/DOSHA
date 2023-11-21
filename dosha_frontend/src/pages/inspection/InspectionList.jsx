import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { message } from 'antd';
import { useLocation } from 'react-router-dom';

import InspectionItem from './InspectionItem';
import AccessDenied from '../../components/AccessDenied';

import '../../styles/InspectionList.scss';

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

function InspectionList() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const [inspections, setInspections] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { state } = useLocation();

  if (role !== 'ROLE_MANAGER') {
    return <AccessDenied />;
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '결제가 완료되었습니다',
    });
  };

  useEffect(() => {
    if (state) {
      success();
    }
    const url = process.env.REACT_APP_DB_HOST + '/api/inspection/getlist';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };
    const request = async () => {
      const response = await axios.get(url, {
        params: { id },
        headers,
      });
      setInspections(response.data);
    };
    request();
  }, []);

  return (
    <div className="HomeBox">
      <motion.div
        className="InspectionListBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {contextHolder}
        <h1 style={{ marginLeft: '2vh' }}>순회점검표 결제</h1>
        <div className="InspectionListTextBottom" />
        {inspections &&
          inspections.map((data) => (
            <InspectionItem key={data.id} inspection={data} />
          ))}
      </motion.div>
    </div>
  );
}

export default InspectionList;
