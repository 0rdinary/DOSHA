import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import ProceedingsItem from './ProceedingsItem';
import Loading from '../../components/Loading';

import '../../styles/ProceedingsList.scss';

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.4,
    },
  },
};

function ProceedingsList() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [proceedings, setProceedings] = useState([]);
  const { location, state } = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '등록을 성공하였습니다',
    });
  };

  useEffect(() => {
    if (state) {
      success();
    }
    setLoading(true);

    if (role === 'ROLE_ADMIN') {
      const url = '/api/proceedings/get/all';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const request = async () => {
        const response = await axios.get(url, { headers });
        setProceedings(response.data);
      };
      request();
    } else {
      const url = '/api/proceedings/get';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const request = async () => {
        const response = await axios.get(url, { params: { id }, headers });
        setProceedings(response.data);
      };
      request();
    }
    setLoading(false);
  }, []);

  const navigateRegist = () => {
    navigate('/proceedings/regist');
  };

  return (
    <div className="HomeBox">
      <motion.div
        className="ProceedingsListBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {loading && <Loading />}
        {contextHolder}
        <h1 style={{ marginLeft: '2vh' }}>산업안전보건위원회 회의록 관리</h1>
        <div className="ProceedingsListTextBottom" />
        {proceedings &&
          proceedings.map((data) => (
            <ProceedingsItem key={data.id} proceedings={data} />
          ))}
        <div style={{ display: 'flex', marginLeft: '1%' }}>
          <motion.div whileHover={{ scale: 1.2 }}>
            <PlusCircleOutlined
              style={{
                color: 'green',
                fontSize: '3vh',
                marginLeft: '1vh',
                cursor: 'pointer',
              }}
              onClick={navigateRegist}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProceedingsList;
