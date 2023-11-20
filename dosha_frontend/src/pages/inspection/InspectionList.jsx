import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';

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

  if (role !== 'ROLE_MANAGER') {
    return <AccessDenied />;
  }

  useEffect(() => {
    const url = '/api/inspection/getlist';
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
