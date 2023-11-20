import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';

import RiskItem from './RiskItem';
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

function RiskList() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const [risks, setRisks] = useState([]);
  const { state } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  if (role !== 'ROLE_MANAGER') {
    return <AccessDenied />;
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '결제를 성공하였습니다',
    });
  };

  useEffect(() => {
    if (state) {
      success();
    }

    const url = '/api/risk/get/list';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };
    const request = async () => {
      const response = await axios.get(url, {
        params: { id },
        headers,
      });
      setRisks(response.data);
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
        <h1 style={{ marginLeft: '2vh' }}>위험성 평가표 결제</h1>
        <div className="InspectionListTextBottom" />
        {risks && risks.map((data) => <RiskItem key={data.id} risk={data} />)}
      </motion.div>
    </div>
  );
}

export default RiskList;
