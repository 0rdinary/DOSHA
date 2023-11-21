import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

import Loading from '../../components/Loading';

import '../../styles/NotificationItem.scss';
import { readNotification } from '../../services/Notification';
import { notificationActions } from '../../store/slices/notificationReducer';

const notifyText = {
  MANAGER_EDUCATIONS: '교육필증을 제출해야 합니다',
  MANAGER_APPOINTMENTS: '선임서를 등록해야 합니다',
  SUBMANAGER_APPOINTMENTS: '지정서를 제출해야 합니다',
  INSPECTION_REQUIRED: '순회점검표를 제출해야 합니다',
  INSPECTION_CHECKED: '순회점검표를 결제해야 합니다',
  PROCEEDINGS_CHECKED: '회의 참석 서명을 해야합니다',
  RISK_CHECKED: '위험성 평가표를 결제해야합니다',
};

const navigateSrc = {
  MANAGER_EDUCATIONS: '/manager/educations',
  MANAGER_APPOINTMENTS: '/manager/appointments',
  SUBMANAGER_APPOINTMENTS: '/submanager/appointments',
  INSPECTION_REQUIRED: '/inspection',
  INSPECTION_CHECKED: '/inspectionlist',
  PROCEEDINGS_CHECKED: '/proceedings',
  RISK_CHECKED: '/risk/list',
};

function NotificationItem({ notiId, notiType }) {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const navigateService = async () => {
    setLoading(true);
    const url = process.env.REACT_APP_DB_HOST + '/api/notification/read';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.post(url, { id: notiId }, { headers });
      dispatch(notificationActions.delNotifications(notiId));
      setLoading(false);
      navigate(navigateSrc[notiType]);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        backgroundColor: 'rgb(240, 240, 240)',
      }}
      className="NotificationItemBox"
      variants={variants}
      onClick={navigateService}
    >
      <ExclamationCircleOutlined
        style={{
          color: 'red',
          fontSize: '1.5em',
          marginLeft: '0.5vh',
          marginRight: '1vh',
        }}
      />
      <h2>{notifyText[notiType]}</h2>
    </motion.div>
  );
}

export default NotificationItem;
