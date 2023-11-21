import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, message } from 'antd';

import DangerItemView from './DangerItemView';
import Loading from '../../components/Loading';

import '../../styles/Danger.scss';

function DangerView({ step, stepHandler, info }) {
  const { accessToken } = useSelector((state) => state.authReducer);
  const [inputs, setInputs] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '결제를 실패하였습니다',
    });
  };

  const nextHandler = () => {
    stepHandler(1);
  };

  const prevHandler = () => {
    stepHandler(-1);
  };

  const handleInputChange = (row, col, value) => {
    const newInputs = [...inputs];
    newInputs[row][col] = value;
    setInputs(newInputs);
  };

  const dangerImgChange = (row, value) => {
    const newInputs = [...inputs];
    newInputs[row][3] = value;
    setInputs(newInputs);

    return false;
  };

  const dangerImgRemover = (row) => {
    const newInputs = [...inputs];
    newInputs[row][3] = null;
    setInputs(newInputs);
  };

  const checkHandler = async () => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_DB_HOST + '/api/risk/check';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(url, null, {
        params: { id: info.id },
        headers,
      });
      navigate('/risk/list', { state: true });
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  useEffect(() => {
    const request = async () => {
      const url = process.env.REACT_APP_DB_HOST + '/api/risk/dangers';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(url, {
        params: { id: info.id },
        headers,
      });
      setInputs(response.data);
    };

    request();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {loading && <Loading />}
      {contextHolder}
      {step === 0 && (
        <div style={{ marginLeft: '1vw' }}>
          <h2>장소명</h2>
          <h3>{info.location}</h3>
          <h2>작성자</h2>
          <h3>{info.employeeName}</h3>
          <h2>작성부점</h2>
          <h3>{`${info.branchName} ${info.subbranchName}`}</h3>
          <h2>작성일자</h2>
          <h3>{info.date}</h3>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '70vh',
          flexDirection: 'column',
        }}
      >
        {step === 1 && (
          <DangerItemView
            start={0}
            end={2}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 2 && (
          <DangerItemView
            start={3}
            end={6}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 3 && (
          <DangerItemView
            start={7}
            end={12}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 4 && (
          <DangerItemView
            start={13}
            end={18}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 5 && (
          <DangerItemView
            start={19}
            end={20}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 6 && (
          <DangerItemView
            start={21}
            end={21}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 7 && (
          <DangerItemView
            start={22}
            end={25}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 8 && (
          <DangerItemView
            start={26}
            end={27}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 9 && (
          <DangerItemView
            start={28}
            end={29}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 10 && (
          <DangerItemView
            start={30}
            end={31}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 11 && (
          <DangerItemView
            start={32}
            end={33}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        <div
          style={{
            display: 'flex',
            width: '99%',
            height: '100%',
            justifyContent: 'end',
            alignItems: 'end',
          }}
        >
          {step !== 0 && (
            <Button style={{ marginRight: '1vh' }} onClick={prevHandler}>
              이전
            </Button>
          )}
          {step < 11 && (
            <Button type="primary" onClick={nextHandler}>
              다음
            </Button>
          )}
          {step === 11 && (
            <Button type="primary" onClick={checkHandler}>
              결제
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DangerView;
