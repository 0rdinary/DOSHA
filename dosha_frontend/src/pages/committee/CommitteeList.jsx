import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ConsoleSqlOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Upload, message } from 'antd';

import AccessDenied from '../../components/AccessDenied';
import Loading from '../../components/Loading';

import '../../styles/CommitteeList.scss';
import CommitteeTeam from './CommitteeTeam';

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

function CommitteeList() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (role !== 'ROLE_ADMIN') {
    return <AccessDenied />;
  }

  useEffect(() => {
    setLoading(true);

    const request = async () => {
      const url = '/api/employee/get/all';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(url, { headers });
      setEmployees(response.data);
    };
    request();

    setLoading(false);
  }, []);

  return (
    <div className="HomeBox">
      {loading ? <Loading /> : null}
      {contextHolder}
      <motion.div
        className="CommitteeListBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <h1 style={{ marginLeft: '2vh' }}>산업안전보건위원회 위원 명단 관리</h1>
        <div className="CommitteeListTextBottom" />
        <div className="CommitteeTeamBox">
          <CommitteeTeam team="사용자 위원" employees={employees} />
          <CommitteeTeam team="근로자 위원" employees={employees} />
        </div>
      </motion.div>
    </div>
  );
}

export default CommitteeList;
