import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Modal } from 'antd';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { sideActions } from '../store/slices/sideReducer';
import Timer from './Timer';
import { authActions } from '../store/slices/authReducer';
import { notificationActions } from '../store/slices/notificationReducer';
import { removeRefreshToken } from '../cookie/Cookie';
import { timeActions } from '../store/slices/timeReducer';

import dandi from '../assets/dandi.png';
import '../styles/Header.scss';

function Header() {
  const { confirm } = Modal;
  const { id, name, accessToken } = useSelector((state) => state.authReducer);
  const { count } = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const warnLogout = () => {
    confirm({
      title: '정말로 로그아웃 하시겠습니까?',
      content: '로그인 페이지로 돌아갑니다',
      okText: '로그아웃',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        dispatch(authActions.delAccessToken());
        dispatch(sideActions.reset());
        removeRefreshToken();
        navigate('/login');
      },
    });
  };

  const setToTen = () => {
    dispatch(timeActions.setTime(10));
  };

  const toHome = () => {
    dispatch(sideActions.move(0));
    navigate('/');
  };

  const profileMenuItem = [
    // {
    //   label: '비밀번호 변경',
    //   key: '1',
    // },
    {
      label: '시간 10초로 변경',
      key: '2',
      onClick: setToTen,
    },
    {
      label: '알림 확인',
      key: '3',
      onClick: toHome,
    },
    {
      danger: true,
      label: '로그아웃',
      onClick: warnLogout,
      key: '4',
    },
  ];

  const foldHandler = () => {
    dispatch(sideActions.fold());
  };

  useEffect(() => {
    // 로그인이 되어 있다면 => 알림 가져오기
    if (id) {
      const getNotification = async () => {
        const url = '/api/notification/get';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, {
          params: { id },
          headers,
        });
        dispatch(notificationActions.setNotifications(response.data));
      };
      getNotification();
    }
  }, []);

  return (
    <div className="headerBackground">
      <div className="hambergerBox">
        <motion.div
          className="hambergerCircle"
          whileHover={{
            scale: 1.1,
            backgroundColor: '#bababa',
            cursor: 'pointer',
          }}
          onClick={foldHandler}
        >
          <MenuOutlined className="hembergerIcon" />
        </motion.div>
      </div>
      <div className="ProfileDiv">
        <Timer />
        <h2 style={{ marginRight: '1vh' }}>{name}님</h2>
        <motion.div
          whileHover={{
            scale: 1.2,
            cursor: 'pointer',
          }}
        >
          <Dropdown menu={{ items: profileMenuItem }} trigger={['click']}>
            <Badge
              count={count}
              showZero
              style={{
                width: '2vh',
                height: '2vh',
                userSelect: 'none',
                fontSize: '1.5vh',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0.2vh',
              }}
            >
              <Avatar
                shape="square"
                style={{ width: '4vh', height: '4vh' }}
                size="4vh"
                src={dandi}
              />
            </Badge>
          </Dropdown>
        </motion.div>
      </div>
    </div>
  );
}

export default Header;
