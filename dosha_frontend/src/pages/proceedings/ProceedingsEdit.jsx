import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Switch, message } from 'antd';

import AccessDenied from '../../components/AccessDenied';

import '../../styles/ProceedingsEdit.scss';
import Loading from '../../components/Loading';
import MemberCheckBox from './MemberCheckBox';

function ProceedingsEdit() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [employers, setEmployers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [curEmployers, setCurEmployers] = useState([]);
  const [curEmployees, setCurEmployees] = useState([]);
  const [types, setTypes] = useState('');
  const [contents, setContents] = useState('');
  const [others, setOthers] = useState('');
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '등록을 실패하였습니다',
    });
  };

  useEffect(() => {
    setLoading(true);
    const request = async (committeeRole) => {
      const url = process.env.REACT_APP_DB_HOST + '/api/committee/get';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(url, {
        params: { role: committeeRole },
        headers,
      });

      if (committeeRole === 'EMPLOYER') {
        setEmployers(response.data);
      } else {
        setEmployees(response.data);
      }
    };
    request('EMPLOYER');
    request('EMPLOYEE');

    setDate(state.date);
    setLocation(state.location);
    setTypes(state.type);
    setContents(state.contents);
    setOthers(state.others);
    setNotes(state.notes);
    setCompleted(state.completed);
    setLoading(false);
  }, []);

  useEffect(() => {
    const employeesId = employees.map(({ employeeId, ...rest }) => employeeId);
    state.memberDtos.map((element) => {
      if (employeesId.includes(element.employeeId)) {
        setCurEmployees((curEmployees) => [...curEmployees, element]);
      }
    });
  }, [employees]);
  useEffect(() => {
    const employersId = employers.map(({ employeeId, ...rest }) => employeeId);
    state.memberDtos.map((element) => {
      if (employersId.includes(element.employeeId)) {
        setCurEmployers((curEmployees) => [...curEmployees, element]);
      }
    });
  }, [employers]);

  const checkHandler = (e) => {
    setCompleted(e);
  };

  const registHandler = async () => {
    setLoading(true);

    try {
      const url = process.env.REACT_APP_DB_HOST + '/api/proceedings/edit';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const dto = {
        id: state.id,
        date,
        location,
        type: types,
        completed,
        contents,
        others,
        notes,
        memberdto: employees.concat(employers),
      };
      const response = await axios.post(url, dto, { headers });
      navigate('/proceedings', { state: true });
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  const cancleHandler = () => {
    navigate('/proceedings');
  };

  return (
    <div className="ProceedingsEditBox" style={{ userSelect: 'none' }}>
      <motion.div
        className="ProceedingsEditForm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {loading && <Loading />}
        {contextHolder}
        <h1 style={{ marginLeft: '2vh' }}>산업안전보건위원회 회의록 조회</h1>
        <div className="ProceedingEditTextBottom" />
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            height: '70vh',
          }}
        >
          <div className="ProceedingsEditTopBox">
            <div className="ProceedingsEditTopMemberBox">
              <h2>일시</h2>
              <h3>{date}</h3>
            </div>
            <div className="ProceedingsEditTopMemberBox">
              <h2>장소</h2>
              <h3>{location}</h3>
            </div>
            <div className="ProceedingsEditTopMemberBox">
              <h2>회의종류</h2>
              <h3>{types}</h3>
            </div>
          </div>

          <div className="ProceedingsEditMemberBox">
            <div className="ProceedingsMembers">
              <h2>사측 위원 서명</h2>
              <h3>
                {curEmployers &&
                  curEmployers.map((data) => (
                    <MemberCheckBox proceedingsId={state.id} member={data} />
                  ))}
              </h3>
            </div>
            <div className="ProceedingsMembers">
              <h2>근로자측 위원 서명</h2>
              <h3>
                {curEmployees &&
                  curEmployees.map((data) => (
                    <MemberCheckBox proceedingsId={state.id} member={data} />
                  ))}
              </h3>
            </div>
          </div>
          <div style={{ width: '90%', marginLeft: '5%' }}>
            <h2>심의 및 의결사항</h2>
            <h3>{contents}</h3>
            <h2>기타토의사항</h2>
            <h3>{others}</h3>
            <h2>비고</h2>
            <h3>{notes}</h3>
          </div>
          <div className="ProceedingsEditDiv">
            <h2>진행상태</h2>
            <Switch
              style={{ marginLeft: '5%' }}
              checkedChildren="진행완료"
              unCheckedChildren="진행중"
              checked={completed}
              onChange={checkHandler}
              disabled={role !== 'ROLE_ADMIN' && true}
            />
          </div>
          <div
            className="ProceedingsEditDiv"
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'end',
            }}
          >
            <Button style={{ marginRight: '3%' }} onClick={cancleHandler}>
              뒤로가기
            </Button>
            {role === 'ROLE_ADMIN' && (
              <Button type="primary" onClick={registHandler}>
                등록
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProceedingsEdit;
