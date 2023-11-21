import { Input, Button, Modal, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import '../styles/Login.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../services/Auth';
import { authActions } from '../store/slices/authReducer';
import { setRefreshToken } from '../cookie/Cookie';
import Loading from '../components/Loading';
import { timeActions } from '../store/slices/timeReducer';

const error = () => {
  Modal.error({
    title: '로그인에 실패하였습니다',
    content: '아이디와 비밀번호를 다시 확인해주세요',
    centered: true,
  });
};

function Login() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [idContent, setIdContent] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '임시 비밀번호가 입력되었습니다',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '아이디와 비밀번호를 다시 확인해주세요',
    });
  };

  const resetError = () => {
    messageApi.open({
      type: 'error',
      content: '행번과 주민등록번호를 다시 확인해주세요',
    });
  };

  const loginHandler = async () => {
    setLoading(true);
    const response = await requestLogin({ id, password });
    if (response.status) {
      dispatch(authActions.setAccessToken(response));
      setRefreshToken(response.refreshToken);
      dispatch(timeActions.setTime(300));
      navigate('/');
    } else {
      error();
    }

    setLoading(false);
  };

  const idHandler = (e) => {
    setId(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const downHandler = async (e) => {
    if (e.key === 'Enter') {
      await loginHandler();
    }
  };

  const resetPasswordHandler = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_DB_HOST + '/auth/reset',
        {
          id: idContent,
          registrationNumber,
        },
      );

      if (response.data.password === null) {
        throw error;
      }

      setIdContent('');
      setRegistrationNumber('');
      setPassword(response.data.password);
      success();
    } catch (e) {
      resetError();
    }

    setLoading(false);
  };

  return (
    <div className="LoginForm">
      {loading ? <Loading /> : null}
      <h1 className="LoginH1" style={{ userSelect: 'none' }}>
        DGB 산업안전보건 관리체계
      </h1>
      {contextHolder}
      <Modal
        title="비밀번호 초기화"
        centered
        open={resetModalOpen}
        okText="초기화"
        cancelText="취소"
        onOk={() => {
          resetPasswordHandler();
          setResetModalOpen(false);
        }}
        onCancel={() => {
          setIdContent('');
          setRegistrationNumber('');
          setResetModalOpen(false);
        }}
      >
        <h3>행번</h3>
        <Input
          value={idContent}
          onChange={(e) => setIdContent(e.target.value)}
        />
        <h3>주민번호</h3>
        <Input
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </Modal>
      <div className="LoginInputDiv" style={{ userSelect: 'none' }}>
        아이디
        <Input
          className="LoginInput"
          placeholder="아이디를 입력해주세요"
          onChange={idHandler}
          onKeyDown={downHandler}
        />
      </div>
      <div className="LoginInputDiv" style={{ userSelect: 'none' }}>
        비밀번호
        <Input.Password
          className="LoginInput"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={passwordHandler}
          onKeyDown={downHandler}
        />
      </div>
      <div className="LoginButtonDiv">
        <Button type="primary" onClick={loginHandler}>
          로그인
        </Button>
        {/* <Button type="link">계정이 없으신가요?</Button> */}
        <Button type="link" onClick={(e) => setResetModalOpen(true)}>
          비밀번호를 잊어버리셨나요?
        </Button>
      </div>
    </div>
  );
}

export default Login;
