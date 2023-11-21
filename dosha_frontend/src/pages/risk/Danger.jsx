import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Input, message, notification } from 'antd';

import DangerItem from './DangerItem';
import Loading from '../../components/Loading';

import '../../styles/Danger.scss';

function Danger({ step, stepHandler, info }) {
  const initialInputs = Array.from(
    { length: 35 },
    () => new Array('', 1, 1, null),
  );
  const { id, accessToken } = useSelector((state) => state.authReducer);
  const [inputs, setInputs] = useState(initialInputs);
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [notiApi, notiHolder] = notification.useNotification();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '제출에 성공하였습니다',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '제출에 실패하였습니다',
    });
  };

  const nextHandler = () => {
    stepHandler(1);
  };

  const prevHandler = () => {
    stepHandler(-1);
  };

  const warnUpload = () => {
    notiApi.info({
      message: '조치 내용을 제출해야 합니다',
      description: '이미지를 업로드 해주세요',
      placement: 'bottomRight',
    });
  };

  const handleInputChange = (row, col, value) => {
    const newInputs = [...inputs];
    newInputs[row][col] = value;
    setInputs(newInputs);

    if (inputs[row][1] * inputs[row][2] >= 4) {
      warnUpload();
    }
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

  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  const registHandler = async () => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_DB_HOST + '/api/risk/regist';
      const headers = {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };

      const formData = new FormData();

      const risk = {
        date,
        location,
        employeeId: id,
      };
      formData.append(
        'risk',
        new Blob([JSON.stringify(risk)], { type: 'application/json' }),
      );
      inputs.forEach((input, index) => {
        formData.append(`dangers[${index}].cur`, input[0]);
        formData.append(`dangers[${index}].frequency`, input[1]);
        formData.append(`dangers[${index}].intensity`, input[2]);
        formData.append('files', input[3]);
      });

      await axios.post(url, formData, { headers });

      success();
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  useEffect(() => {
    // 오늘 작성일자 구하기
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    setDate(year + '-' + month + '-' + day);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {loading && <Loading />}
      {contextHolder}
      {notiHolder}
      {step === 0 && (
        <div style={{ marginLeft: '1vw' }}>
          <h2>장소명</h2>
          <Input value={location} onChange={locationHandler} />
          <h2>작성자</h2>
          <h3>{info && info.name}</h3>
          <h2>작성부점</h2>
          <h3>{info && `${info.branchName} ${info.subbranchName}`}</h3>
          <h2>작성일자</h2>
          <h3>{date}</h3>
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
          <DangerItem
            start={0}
            end={2}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 2 && (
          <DangerItem
            start={3}
            end={6}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 3 && (
          <DangerItem
            start={7}
            end={12}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 4 && (
          <DangerItem
            start={13}
            end={18}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 5 && (
          <DangerItem
            start={19}
            end={20}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 6 && (
          <DangerItem
            start={21}
            end={21}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 7 && (
          <DangerItem
            start={22}
            end={25}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 8 && (
          <DangerItem
            start={26}
            end={27}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 9 && (
          <DangerItem
            start={28}
            end={29}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 10 && (
          <DangerItem
            start={30}
            end={31}
            inputs={inputs}
            handleInputChange={handleInputChange}
            dangerImgChange={dangerImgChange}
            dangerImgRemover={dangerImgRemover}
          />
        )}
        {step === 11 && (
          <DangerItem
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
            marginBottom: '1vh',
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
            <Button type="primary" onClick={registHandler}>
              등록
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Danger;
