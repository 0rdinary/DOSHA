import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, message, Tour } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';
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

function ManagerAppointments() {
  const { name, role, id, accessToken, position } = useSelector(
    (state) => state.authReducer,
  );
  const [appointedDate, setAppointedDate] = useState('');
  const [tempDate, setTempDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [tourOpen, setTourOpen] = useState(false);
  const ref1 = useRef(null);

  const steps = [
    {
      title: '선임 날짜를 입력해주세요',
      description: '선임서 문서를 확인하시어 날짜를 입력해주세요',
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

  if (role !== 'ROLE_MANAGER') {
    return <AccessDenied />;
  }

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const url =
          process.env.REACT_APP_DB_HOST + '/api/manager/appointments/get';
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
      } catch (e) {
        console.log(e);
      }
    };
    getAppointments();
  }, []);

  const saveAppointments = async () => {
    setLoading(true);
    try {
      const url =
        process.env.REACT_APP_DB_HOST + '/api/manager/appointments/save';
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
      <motion.div
        style={{ width: '50vw', height: '90%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {contextHolder}
        {loading ? <Loading /> : null}
        <Appointments>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1>안전보건관리책임자 선임서</h1>
          </div>
          <h2>직책 : {position}</h2>
          <h2>성명 : {name}</h2>
          <h2>
            위 사람을 산업안전보건법 제 15조에 의거 사업장을 실질적으로 총괄하여
            관리하는 안전보건관리책임자로 선임합니다. 아래의 업무를 충실시
            수행하여 주시기 바랍니다.
          </h2>
          <h3>※ 안전보건관리책임자의 업무내용 </h3>
          <h3>
            1. 은행의 산업재해 예방계획의 수립에 관한 사항
            <br />
            2. 안전보건관리규정의 작성 및 변경에 관한 사항
            <br />
            3. 직원의 안전보건교육에 관한 사항
            <br />
            4. 작업환경측정 등 작업환경의 점검 및 개선에 관한 사항
            <br />
            5. 직원의 건강진단 등 건강관리에 관한 사항
            <br />
            6. 산업재해의 원인 조사 및 재발 방지대책 수립에 관한 사항
            <br />
            7. 산업재해에 관한 통계의 기록 및 유지에 관한 사항
            <br />
            8. 안전장치 및 보호구 구입 시 적격품 여부 확인에 관한 사항
            <br />
            9. 그 밖에 직원의 유해·위험 방지조치에 관한 사항으로서 위험성평가의
            실시에 관한 사항
            <br />
            10. 안전보건규칙에서 정하는 직원의 위험 또는 건강장해의 방지에 관한
            사항
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
      </motion.div>
      <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} />
    </BackDiv>
  );
}

export default ManagerAppointments;
