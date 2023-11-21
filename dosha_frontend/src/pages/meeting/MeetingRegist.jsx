import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button, Input, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';

import AccessDenied from '../../components/AccessDenied';
import { authReducer } from '../../store/slices/authReducer';

import '../../styles/Educations.scss';

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

function MeetingRegist() {
  const [meeting, setMeeting] = useState(null);
  const [name, setName] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const { id, accessToken, role } = useSelector((state) => state.authReducer);
  const [messageApi, contextHolder] = message.useMessage();

  if (role !== 'ROLE_ADMIN') {
    return <AccessDenied />;
  }

  useEffect(() => {
    setLoading(true);
    const request = async () => {
      const url = process.env.REACT_APP_DB_HOST + '/api/meeting/get';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      try {
        const response = await axios.get(url, {
          responseType: 'blob',
          params: { id },
          headers,
        });
        console.log(response.data);
        const newFile = new File([response.data], '회의록');
        const reader = new FileReader();
        reader.onload = (ev) => {
          const previewImage = String(ev.target?.result);
          setImgSrc(previewImage);
        };
        reader.readAsDataURL(newFile);
        setImgSrc(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    request();
    setLoading(false);
  }, []);

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

  const uploadMeeting = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append('meeting', meeting);
    formData.append('name', name);
    try {
      const response = await axios.post(
        process.env.REACT_APP_DB_HOST + '/api/meeting/regist',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      success();
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  const meetingHandler = (e) => {
    setMeeting(e);
    return false;
  };

  const meetingRemover = () => {
    setMeeting(null);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="HomeBox">
      <motion.div
        className="EducationsBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {loading ? <Loading /> : null}
        {contextHolder}
        <h1 style={{ marginLeft: '2vh' }}>회의록 관리</h1>
        <div className="EducationsTextBottom" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '1vw',
          }}
        >
          <h2>회의 이름</h2>
          <Input
            style={{ width: '30%', marginBottom: '1vh' }}
            value={name}
            onChange={nameHandler}
          />
          <div>
            {!imgSrc && (
              <Upload
                multiple={false}
                maxCount={1}
                disabled={imgSrc && true}
                listType="picture"
                beforeUpload={meetingHandler}
                onRemove={meetingRemover}
              >
                <Button icon={<UploadOutlined />}>회의록 업로드</Button>
              </Upload>
            )}
            {!imgSrc && (
              <Button
                style={{ marginTop: '1vh' }}
                type="primary"
                onClick={uploadMeeting}
                disabled={(meeting === null && true) || (imgSrc && true)}
              >
                저장
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MeetingRegist;
