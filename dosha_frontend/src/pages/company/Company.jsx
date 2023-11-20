import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import AccessDenied from '../../components/AccessDenied';
import CompanyItem from './CompanyItem';
import Loading from '../../components/Loading';

import '../../styles/Home.scss';
import '../../styles/Company.scss';

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

function Company() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (role !== 'ROLE_SUBMANAGER') {
    return <AccessDenied />;
  }

  useEffect(() => {
    setLoading(true);
    const url = '/api/company/get';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };

    const request = async () => {
      const response = await axios.get(url, {
        params: { id },
        headers,
      });

      setCompany(response.data);
      return response;
    };
    request();
    setLoading(false);
  }, []);

  const addCompanyHandler = () => {
    navigate('/company/edit');
  };

  return (
    <div className="HomeBox">
      {loading ? <Loading /> : null}
      <motion.div
        className="CompanyBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <h1 style={{ marginLeft: '2vh' }}>수급사 관리</h1>
        <div className="CompanyTextBottom" />
        {company &&
          company.map((data) => <CompanyItem key={data.name} data={data} />)}
        <div style={{ display: 'flex', marginLeft: '1%' }}>
          <motion.div whileHover={{ scale: 1.2 }}>
            <PlusCircleOutlined
              style={{
                color: 'green',
                fontSize: '3vh',
                marginLeft: '1vh',
                cursor: 'pointer',
              }}
              onClick={addCompanyHandler}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
export default Company;
