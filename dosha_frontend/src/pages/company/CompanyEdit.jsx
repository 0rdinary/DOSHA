import { useEffect, useState } from 'react';
import { Button, Input, Select, Upload, Modal, message } from 'antd';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccessDenied from '../../components/AccessDenied';

import '../../styles/CompanyEdit.scss';

const progressOption = [
  { value: 'SELECTION', label: '업체 선정 완료' },
  { value: 'CLOSING_AMOUNT', label: '세부 계약금액 체결 완료' },
  { value: 'BOARD_REPORT', label: '이사회 보고' },
  { value: 'CONTRACT', label: '최종 계약' },
];

function CompanyEdit() {
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const { state } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState('');
  const [masterName, setMasterName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [progress, setProgress] = useState('SELECTION');
  const [plan, setPlan] = useState(null);
  const [evall, setEvall] = useState(null);
  const { confirm } = Modal;
  const navigate = useNavigate();

  if (role !== 'ROLE_SUBMANAGER') {
    return <AccessDenied />;
  }

  useEffect(() => {
    if (state) {
      setName(state.name);
      setMasterName(state.masterName);
      setPhoneNumber(state.phoneNumber);
      setProgress(state.progress);
    }
  }, []);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const masterNameHandler = (e) => {
    setMasterName(e.target.value);
  };

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const progressHandler = (e) => {
    setProgress(e);
  };

  const planHandler = (e) => {
    setPlan(e);
    return false;
  };

  const evallHandler = (e) => {
    setEvall(e);
    return false;
  };

  const planRemover = () => {
    setPlan(null);
  };

  const evallRemover = () => {
    setEvall(null);
  };

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

  const saveHandler = async () => {
    let url;
    const formData = new FormData();
    let dto = {};
    if (state != null) {
      url = '/api/company/edit';
      dto = {
        id: state.id,
      };
    } else {
      url = '/api/company/regist';
    }

    formData.append('plan', plan);
    formData.append('eval', evall);
    dto = {
      ...dto,
      name,
      masterName,
      phoneNumber,
      progress,
      employeeId: id,
    };
    const blob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
    formData.append('dto', blob);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      success();
      navigate('/company');
    } catch (e) {
      error();
    }
  };

  const requestDelete = async () => {
    const response = await axios.post(
      '/api/company/delete',
      { id: state.id },
      {
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  };

  const warnDelete = () => {
    confirm({
      title: '정말로 수급사 정보를 삭제하시겠습니까?',
      content: '내용을 복구할 수 없습니다',
      okText: '삭제',
      okType: 'danger',
      cancleText: '취소',
      onOk() {
        requestDelete();
        navigate('/company');
      },
    });
  };

  return (
    <div className="CompanyEditBox">
      <motion.div
        className="CompanyEditForm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {contextHolder}
        <h1 style={{ marginLeft: '2vh' }}>수급사 정보 등록</h1>
        <div className="CompanyTextBottom" />
        <div className="ProceedingsEditFormBox">
          <h2>수급사 이름</h2>
          <Input value={name} onChange={nameHandler} />
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>수급사 대표 이름</h2>
          <Input value={masterName} onChange={masterNameHandler} />
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>수급사 전화번호</h2>
          <Input value={phoneNumber} onChange={phoneNumberHandler} />
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>진행상태</h2>
          <Select
            options={progressOption}
            value={progress}
            onChange={progressHandler}
          />
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>안전보건관리 계획서</h2>
          <Upload
            multiple={false}
            maxCount={1}
            beforeUpload={planHandler}
            onRemove={planRemover}
          >
            <Button icon={<UploadOutlined />}> 업로드</Button>
          </Upload>
        </div>
        <div className="ProceedingsEditFormBox">
          <h2>재해예방 조치능력 평가서</h2>
          <Upload
            multiple={false}
            maxCount={1}
            beforeUpload={evallHandler}
            onRemove={evallRemover}
          >
            <Button icon={<UploadOutlined />}> 업로드</Button>
          </Upload>
        </div>
        <div
          style={{
            display: 'flex',
            width: '90%',
            marginLeft: '5%',
            justifyContent: 'end',
          }}
        >
          <Button style={{ marginRight: '1vw' }} danger onClick={warnDelete}>
            삭제
          </Button>
          <Button type="primary" onClick={saveHandler}>
            저장
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default CompanyEdit;
