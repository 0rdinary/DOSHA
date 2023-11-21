import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PlusCircleOutlined } from '@ant-design/icons';

import AccessDenied from '../../components/AccessDenied';
import Loading from '../../components/Loading';
import MeetingItem from './MeetingItem';

import '../../styles/MeetingList.scss';

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

function MeetingList() {
  const { role, accessToken } = useSelector((state) => state.authReducer);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (role !== 'ROLE_ADMIN') {
    return <AccessDenied />;
  }

  useEffect(() => {
    setLoading(true);
    const url = process.env.REACT_APP_DB_HOST + '/api/meeting/get/all';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };
    const request = async () => {
      const response = await axios.get(url, { headers });
      setMeetings(response.data);
    };
    request();
    setLoading(false);
  }, []);

  const navigateRegist = () => {
    navigate('/meeting/regist');
  };

  return (
    <div className="HomeBox">
      {loading ? <Loading /> : null}
      <motion.div
        className="MeetingListBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <h1 style={{ marginLeft: '2vh' }}>
          도급사업안전보건협의체 회의록 관리
        </h1>
        <div className="MeetingListTextBottom" />
        {meetings &&
          meetings.map((data) => <MeetingItem key={data.id} meeting={data} />)}
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

export default MeetingList;
