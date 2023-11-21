import { useState } from 'react';
import { useSelector } from 'react-redux';
import { message, Button, Modal, Input } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import styled from 'styled-components';
import { DownloadOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';
import AccessDenied from '../../components/AccessDenied';
import { downloadMyXlsx } from '../../services/xlsx';

import '../../styles/SubmanagerList.scss';

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const Styledh3 = styled.h3`
  width: 100%;
`;

function SubmanagerList() {
  const { confirm } = Modal;
  const [loading, setLoading] = useState(false);
  const [submanagers, setSubmanagers] = useState([]);
  const [reason, setReason] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const [modalOpen, setModalOpen] = useState(false);
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '조회에 성공하였습니다',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '조회에 실패하였습니다',
    });
  };

  if (role !== 'ROLE_MANAGER') {
    return <AccessDenied />;
  }

  const loadSubmanagers = async () => {
    setLoading(true);
    try {
      const url1 = process.env.REACT_APP_DB_HOST + '/api/reason/';
      const bearerAccessToken = `Bearer ${accessToken}`;
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: bearerAccessToken,
      };
      if (reason === '') {
        throw error;
      }
      const dto = {
        employeeId: id,
        content: reason,
      };
      const response1 = await axios.post(url1, dto, {
        headers,
      });

      const url2 =
        process.env.REACT_APP_DB_HOST + '/api/employee/submanager/get';
      const response = await axios.get(url2, {
        params: { id },
        headers,
      });
      setSubmanagers(response.data);
      success();
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  const downloadHandler = () => {
    downloadMyXlsx(submanagers);
  };

  return (
    <div className="HomeBox">
      <motion.div
        className="SubmanagerListBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {contextHolder}
        <Modal
          title="조회 사유를 입력해주셔야 합니다."
          okText="조회"
          cancelText="취소"
          open={modalOpen}
          onOk={() => {
            setModalOpen(false);
            loadSubmanagers();
          }}
          onCancel={() => setModalOpen(false)}
        >
          <Input value={reason} onChange={(e) => setReason(e.target.value)} />
        </Modal>
        {loading ? <Loading /> : null}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ marginLeft: '2vh' }}>관리감독자 조회</h1>
          <Button
            style={{ marginLeft: '1vh' }}
            onClick={() => setModalOpen(true)}
          >
            조회
          </Button>
        </div>

        <div className="EducationsTextBottom" />

        <h2 style={{ marginLeft: '1vw' }}>관리감독자 목록</h2>
        <div style={{ display: 'flex', marginLeft: '2vw', width: '95%' }}>
          <Styledh3>직원명</Styledh3>
          <Styledh3>전화번호</Styledh3>
          <Styledh3>본부점</Styledh3>
          <Styledh3>소속부점</Styledh3>
          <Styledh3>담당</Styledh3>
        </div>
        {submanagers &&
          submanagers.map((data) => (
            <div
              key={data.id}
              style={{ display: 'flex', marginLeft: '2vw', width: '95%' }}
            >
              <Styledh3>{data.name}</Styledh3>
              <Styledh3>{data.phoneNumber}</Styledh3>
              <Styledh3>{data.branchName}</Styledh3>
              <Styledh3>{data.subbranchName}</Styledh3>
              <Styledh3>{data.position}</Styledh3>
            </div>
          ))}
        <div
          style={{
            height: '100%',
            width: '99%',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
            marginBottom: '1vh',
          }}
        >
          {submanagers.length !== 0 && (
            <Button icon={<DownloadOutlined />} onClick={downloadHandler}>
              엑셀로 다운하기
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default SubmanagerList;
