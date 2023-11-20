import { Button, Result } from 'antd';

import '../styles/AccessDenied.scss';
import { useNavigate } from 'react-router-dom';

function AccessDenied() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="AccessDeniedBackground">
      <Result
        status="error"
        title="잘못된 접근입니다"
        subTitle="메인 페이지로 돌아갑니다"
        className="AccessDeniedBox"
        extra={[
          <Button type="primary" key="console" onClick={goHome}>
            돌아가기
          </Button>,
        ]}
      />
    </div>
  );
}
export default AccessDenied;
