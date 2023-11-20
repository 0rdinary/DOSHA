import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { DatePicker, message, Button, Tour } from 'antd';
import axios from 'axios';
import AccessDenied from '../../components/AccessDenied';
import Loading from '../../components/Loading';

const BackDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Appointments = styled.div`
  display: flex;
  padding: 2vh;
  flex-direction: column;
  width: 50vw;
  height: 90%;
  background-color: white;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`;

function SubmanagerAppointments() {
  const { position, name, role, id, accessToken } = useSelector(
    (state) => state.authReducer,
  );
  const [appointedDate, setAppointedDate] = useState(null);
  const [branchName, setBranchName] = useState();
  const [tempDate, setTempDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [tourOpen, setTourOpen] = useState(false);
  const ref1 = useRef(null);

  const steps = [
    {
      title: '지정 날짜를 입력해주세요',
      description: '지정서 문서를 확인하시어 날짜를 입력해주세요',
      target: () => ref1.current,
      nextButtonProps: { children: '확인' },
    },
  ];

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

  if (role !== 'ROLE_SUBMANAGER') {
    return <AccessDenied />;
  }

  useEffect(() => {
    // 선임·지정 날짜 불러오기
    const getAppointments = async () => {
      const url = '/api/submanager/appointments/get';
      const bearerAccessToken = `Bearer ${accessToken}`;
      const headers = {
        Authorization: bearerAccessToken,
      };
      const response = await axios.get(url, {
        params: { id },
        headers,
      });

      setAppointedDate(response.data.appointedDate);
      if (response.data.appointedDate === null) {
        setTourOpen(true);
      }
    };
    // 소속부점 불러오기
    const getMyInfo = async () => {
      const url = '/api/employee/myinfo';
      const bearerAccessToken = `Bearer ${accessToken}`;
      const headers = {
        Authorization: bearerAccessToken,
      };
      const response = await axios.get(url, {
        params: { id },
        headers,
      });

      setBranchName(response.data.branchName);
    };
    getAppointments();
    getMyInfo();
  }, []);

  const saveAppointments = async () => {
    setLoading(true);
    try {
      const url = '/api/submanager/appointments/save';
      const bearerAccessToken = `Bearer ${accessToken}`;
      const headers = {
        Authorization: bearerAccessToken,
      };
      const response = await axios.post(
        url,
        { id, appointedDate: tempDate },
        {
          headers,
        },
      );

      setAppointedDate(tempDate);
      setTourOpen(false);
      success();
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  const onChange = (date, dateString) => {
    setTempDate(dateString);
  };

  return (
    <BackDiv>
      {contextHolder}
      {loading ? <Loading /> : null}
      <Appointments>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>관리감독자 지정서</h1>
        </div>
        <h2>소속부점: {branchName}</h2>
        <h2>직책 : {position}</h2>
        <h2>성명 : {name}</h2>
        <h2>
          위 사람을 산업안전보건법 제16조에 의거 관리감독자로 지정합니다. 아래의
          업무를 충실히 수행하여 주시기 바랍니다.
        </h2>
        <h2>※ 관리감독자의 업무내용 </h2>
        <h3>
          1. 기계·기구 또는 설비의 안전·보건 점검 및 이상 유무의 확인
          <br />
          2. 직원의 근무복·보호구 및 방호장치의 점검과 그 착용·사용에 관한 교육
          지도
          <br />
          3. 해당작업에서 발생한 산업재해에 관한 보고 및 이에 대한 응급조치
          <br />
          4. 해당작업의 작업장 정리·정돈 및 통로 확보에 대한 확인·감독
          <br />
          5. 위험성평가에 관한 사항으로서 유해·위험요인의 파악에 대한 참여 및
          개선조치의 시행에 대한 참여
          <br />
          6. 그 밖에 해당작업의 안전 및 보건에 관한 사항으로서
          안전보건관리규정으로 정하는 사항
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h3 ref={ref1}>
            {appointedDate === null ? (
              <DatePicker onChange={onChange} />
            ) : (
              appointedDate
            )}
            {appointedDate === null ? (
              <Button
                type="primary"
                onClick={saveAppointments}
                disabled={tempDate === null && true}
              >
                제출
              </Button>
            ) : null}
          </h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2>대구은행(인)</h2>
        </div>
      </Appointments>
      <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} />
    </BackDiv>
  );
}

export default SubmanagerAppointments;
