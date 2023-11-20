import { Button, Result, Typography } from 'antd';

import '../styles/AccessDenied.scss';
import { useNavigate } from 'react-router-dom';

function NoUrl() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="AccessDeniedBackground">
      <Result
        status="404"
        title="잘못된 경로입니다"
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
export default NoUrl;
