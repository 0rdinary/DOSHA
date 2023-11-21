import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'antd';
import axios from 'axios';
import {
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
} from '../cookie/Cookie';
import { timeActions } from '../store/slices/timeReducer';
import { authActions } from '../store/slices/authReducer';
import '../styles/Timer.scss';
import { sideActions } from '../store/slices/sideReducer';

function Timer() {
  const { remainTime } = useSelector((state) => state.timeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const id = setInterval(() => {
      dispatch(timeActions.passTime());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (remainTime <= 0) {
      dispatch(authActions.delAccessToken());
      dispatch(sideActions.reset());
      removeRefreshToken();
      navigate('/login', { replace: true });
    }
  }, [remainTime]);

  const resetTimer = async () => {
    // 토큰 리셋하기
    const url = process.env.REACT_APP_DB_HOST + '/auth/refresh';
    const refreshToken = getRefreshToken();
    const bearerRefreshToken = `Bearer ${refreshToken}`;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-REFRESH-TOKEN': bearerRefreshToken,
    };
    const response = await axios.post(url, null, {
      headers,
    });
    dispatch(authActions.setAccessToken(response.data));
    setRefreshToken(response.data.refreshToken);
    dispatch(timeActions.resetTime());
  };

  return (
    <div>
      <Tooltip title="클릭해서 연장하기">
        <motion.div
          className="TimerText"
          style={{ color: remainTime <= 60 ? 'red' : 'black' }}
          whileHover={{
            scale: 1.2,
            borderRadius: '0.5vh',
            backgroundColor: '#bababa',
            cursor: 'pointer',
          }}
          onClick={resetTimer}
        >
          <h2>
            {`${Math.floor(remainTime / 60)}:${String(remainTime % 60).padStart(
              2,
              '0',
            )}`}
          </h2>
        </motion.div>
      </Tooltip>
    </div>
  );
}

export default Timer;
