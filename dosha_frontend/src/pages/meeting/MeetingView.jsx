import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

import AccessDenied from '../../components/AccessDenied';

import '../../styles/Educations.scss';

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

function MeetingView() {
  const [meeting, setMeeting] = useState(null);
  const [name, setName] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { accessToken, role } = useSelector((state) => state.authReducer);

  if (role !== 'ROLE_ADMIN') {
    return <AccessDenied />;
  }

  useEffect(() => {
    setLoading(true);
    const request = async () => {
      const url = '/api/meeting/load';
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
        const newFile = new File([response.data], '회의록');
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
    request();
    setLoading(false);
  }, []);

  return (
    <div className="HomeBox">
      <motion.div
        className="EducationsBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {loading ? <Loading /> : null}
        <h1 style={{ marginLeft: '2vh' }}>회의록 정보 조회</h1>
        <div className="EducationsTextBottom" />
        <h2 style={{ marginLeft: '1vw' }}>{state.name}</h2>
        <div>
          <img
            style={{ height: '65vh' }}
            className="PreviewBox"
            src={`${imgSrc}`}
            alt="회의록"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default MeetingView;
