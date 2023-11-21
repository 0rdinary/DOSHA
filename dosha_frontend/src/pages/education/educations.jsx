import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button, Upload, message, Tour } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';

import AccessDenied from '../../components/AccessDenied';

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

function Educations() {
  const [educations, setEducations] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const { id, accessToken, role } = useSelector((state) => state.authReducer);
  const [messageApi, contextHolder] = message.useMessage();
  const [tourOpen, setTourOpen] = useState(false);
  const ref1 = useRef(null);

  if (role !== 'ROLE_MANAGER') {
    return <AccessDenied />;
  }

  const steps = [
    {
      title: '교육필증을 제출해주세요',
      description: '사진 파일을 업로드해주시기 바랍니다',
      target: () => ref1.current,
      nextButtonProps: { children: '확인' },
    },
  ];

  useEffect(() => {
    setLoading(true);
    const request = async () => {
      const url =
        process.env.REACT_APP_DB_HOST + '/api/manager/educations/load';
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
        const img = window.URL.createObjectURL(new Blob([response.data]));
        setImgSrc(img);
        // const newFile = new File([response.data], '교육필증');
        // const reader = new FileReader();
        // reader.onload = (ev) => {
        //   const previewImage = String(ev.target?.result);
        //   setImgSrc(previewImage);
        // };
        // reader.readAsDataURL(newFile);
        // setImgSrc(response.data);
      } catch (e) {
        setTourOpen(true);
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

  const uploadEducations = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append('educations', educations);
    formData.append('id', id);
    try {
      const response = await axios.post(
        process.env.REACT_APP_DB_HOST + '/api/manager/educations/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      success();
      window.location.reload();
    } catch (e) {
      error();
    }
    setLoading(false);
  };

  const educationsHandler = (e) => {
    setEducations(e);
    return false;
  };

  const educationsRemover = () => {
    setEducations(null);
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
        <h1 style={{ marginLeft: '2vh' }}>교육필증 관리</h1>
        <div className="EducationsTextBottom" />
        {!imgSrc && (
          <Upload
            multiple={false}
            maxCount={1}
            disabled={imgSrc && true}
            listType="picture"
            beforeUpload={educationsHandler}
            onRemove={educationsRemover}
          >
            <Button
              ref={ref1}
              style={{ marginLeft: '1vh' }}
              icon={<UploadOutlined />}
            >
              교육필증 업로드
            </Button>
          </Upload>
        )}
        {!imgSrc && (
          <Button
            style={{ marginLeft: '1vh', marginTop: '1vh' }}
            type="primary"
            onClick={uploadEducations}
            disabled={(educations === null && true) || (imgSrc && true)}
          >
            저장
          </Button>
        )}
        {imgSrc && <img className="PreviewBox" src={imgSrc} alt="교육필증" />}
      </motion.div>
      <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} />
    </div>
  );
}

export default Educations;
