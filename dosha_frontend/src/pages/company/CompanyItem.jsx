import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

import '../../styles/CompanyItem.scss';

const progressText = {
  SELECTION: '업체 선정 완료',
  CLOSING_AMOUNT: '세부 계약금액 체결 완료',
  BOARD_REPORT: '이사회 보고',
  CONTRACT: '최종 계약',
};

function CompanyItem({ data }) {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const navigateEdit = () => {
    navigate('/company/edit', { state: data });
  };

  return (
    <motion.div
      className="CompanyItemBox"
      variants={variants}
      whileHover={{
        backgroundColor: '#95bdfd',
        color: 'white',
      }}
      onClick={navigateEdit}
    >
      <h3 style={{ marginLeft: '1vw' }}>{data.name}</h3>
      <h3 style={{ marginLeft: '1vw' }}>{progressText[data.progress]} 단계</h3>
    </motion.div>
  );
}

export default CompanyItem;
