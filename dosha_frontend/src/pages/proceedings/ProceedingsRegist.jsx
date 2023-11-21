import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, DatePicker, Input, Switch, Select, message } from 'antd';

import AccessDenied from '../../components/AccessDenied';

import '../../styles/ProceedingsEdit.scss';
import Loading from '../../components/Loading';

function ProceedingsRegist() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [employerOptions, setEmployerOptions] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [types, setTypes] = useState('');
  const [contents, setContents] = useState('');
  const [others, setOthers] = useState('');
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();

  if (role !== 'ROLE_ADMIN') {
    return <AccessDenied />;
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '등록을 성공하였습니다',
    });
  };

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
        response.data.forEach((element) => {
          setEmployerOptions((employerOptions) => [
            ...employerOptions,
            {
              label: `${element.employeeName}(${element.employeeId})`,
              value: element.employeeId,
            },
          ]);
        });
      } else {
        response.data.forEach((element) => {
          setEmployeeOptions((employeeOptions) => [
            ...employeeOptions,
            {
              label: `${element.employeeName}(${element.employeeId})`,
              value: element.employeeId,
            },
          ]);
        });
      }
    };
    request('EMPLOYER');
    request('EMPLOYEE');
    setLoading(false);
  }, []);

  const dateHandler = (date, dateString) => {
    setDate(dateString);
  };

  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  const typesHandler = (e) => {
    setTypes(e.target.value);
  };

  const employerHandler = (e) => {
    setEmployers(e);
  };

  const employeeHandler = (e) => {
    setEmployees(e);
  };

  const contentsHandler = (e) => {
    setContents(e.target.value);
  };

  const othersHandler = (e) => {
    setOthers(e.target.value);
  };

  const notesHandler = (e) => {
    setNotes(e.target.value);
  };

  const checkHandler = (e) => {
    setCompleted(e);
    console.log(e);
  };

  const registHandler = async () => {
    setLoading(true);

    try {
      const url = process.env.REACT_APP_DB_HOST + '/api/proceedings/regist';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const dto = {
        date,
        location,
        type: types,
        completed,
        contents,
        others,
        notes,
        memberIds: employees.concat(employers),
      };
      const response = await axios.post(url, dto, { headers });
      navigate('/proceedings', { state: true });
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  return (
    <div className="ProceedingsEditBox">
      <motion.div
        className="ProceedingsEditForm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {loading && <Loading />}
        {contextHolder}
        <h1 style={{ marginLeft: '2vh' }}>산업안전보건위원회 회의록 등록</h1>
        <div className="CompanyTextBottom" />
        <div className="ProceedingsEditTopBox">
          <div className="ProceedingsEditTopMemberBox">
            <h2>일시</h2>
            <DatePicker onChange={dateHandler} />
          </div>
          <div className="ProceedingsEditTopMemberBox">
            <h2>장소</h2>
            <Input
              style={{ width: '90%' }}
              value={location}
              onChange={locationHandler}
            />
          </div>
          <div className="ProceedingsEditTopMemberBox">
            <h2>회의종류</h2>
            <Input
              style={{ width: '90%' }}
              value={types}
              onChange={typesHandler}
            />
          </div>
        </div>

        <div className="ProceedingsEditMemberBox">
          <div className="ProceedingsMembers">
            <h2>사측 위원</h2>
            <Select
              style={{ width: '90%' }}
              mode="multiple"
              allowClear
              options={employerOptions}
              onChange={employerHandler}
            />
          </div>
          <div className="ProceedingsMembers">
            <h2>근로자측 위원</h2>
            <Select
              style={{ width: '90%' }}
              mode="multiple"
              allowClear
              options={employeeOptions}
              onChange={employeeHandler}
            />
          </div>
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>심의 및 의결사항</h2>
          <TextArea
            value={contents}
            autoSize={{ minRows: 4 }}
            onChange={contentsHandler}
          />
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>기타토의사항</h2>
          <TextArea
            value={others}
            autoSize={{ minRows: 3 }}
            onChange={othersHandler}
          />
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>비고</h2>
          <TextArea
            value={notes}
            autoSize={{ minRows: 3 }}
            onChange={notesHandler}
          />
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>진행상태</h2>
        </div>
        <div
          style={{
            display: 'flex',
            width: '90%',
            marginLeft: '5%',
            justifyContent: 'space-between',
          }}
        >
          <Switch
            checkedChildren="진행완료"
            unCheckedChildren="진행중"
            checked={completed}
            onChange={checkHandler}
          />
          <Button type="primary" onClick={registHandler}>
            등록
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default ProceedingsRegist;
