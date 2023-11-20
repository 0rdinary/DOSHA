import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Steps } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import DangerView from './DangerView';
import Loading from '../../components/Loading';

import '../../styles/RiskRegist.scss';
import AccessDenied from '../../components/AccessDenied';

const steps = [
  {
    title: '작성정보',
  },
  {
    title: '일반사무(작업환경)',
  },
  {
    title: '일반사무(작업특성)',
  },
  {
    title: '일반사무(기계,물질적)',
  },
  {
    title: '문서작업',
  },
  {
    title: '식음료제조',
  },
  {
    title: '유선업무',
  },
  {
    title: '이동',
  },
  {
    title: '전력사용',
  },
  {
    title: '문서적재',
  },
  {
    title: '물품수납, 적치',
  },
  {
    title: '소방활동',
  },
];

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

function RiskView() {
  const { id, accessToken, role } = useSelector((state) => state.authReducer);
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [info, setInfo] = useState();

  if (role !== 'ROLE_MANAGER') {
    return <AccessDenied />;
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const stepHandler = (value) => {
    setCurrent(current + value);
  };

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="RiskRegistBox"
    >
      {loading && <Loading />}
      <motion.div
        variants={variants}
        style={{ display: 'flex', alignItems: 'initial', width: '90%' }}
      >
        <Steps
          style={{ width: '12vw', height: '60vh' }}
          current={current}
          items={items}
          direction="vertical"
        />
        <div style={{ display: 'flex', width: '90%' }}>
          <div className="RiskRegistContentsBox">
            <h1 style={{ marginLeft: '2vh' }}>위험성 평가표 결제</h1>
            <div className="CompanyTextBottom" />
            <DangerView step={current} stepHandler={stepHandler} info={state} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RiskView;
