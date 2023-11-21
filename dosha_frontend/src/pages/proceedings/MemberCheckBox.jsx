import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { message, Tour } from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';

import Loading from '../../components/Loading';

import '../../styles/MemberCheckBox.scss';

function MemberCheckBox({ proceedingsId, member }) {
  const { id, accessToken } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [checked, setChecked] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const ref1 = useRef(null);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '결제가 완료되었습니다',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '결제를 실패하였습니다',
    });
  };

  const steps = [
    {
      title: '결제를 진행하여 주세요',
      description: '참석한 것이 맞으시다면 클릭해주시기 바랍니다.',
      target: () => ref1.current,
      nextButtonProps: { children: '확인' },
    },
  ];

  useEffect(() => {
    setChecked(member.checked);
  }, []);

  useEffect(() => {
    if (member.employeeId === id && !member.checked) {
      tourOpen(true);
    }
  }, [checked]);

  const checkHandler = async () => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_DB_HOST + '/api/proceedings/check';
      const headers = {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(
        url,
        { proceedingsId, memberId: id },
        {
          headers,
        },
      );
      setChecked(true);
      success();
    } catch (e) {
      error();
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="MemberCheckBox"
      onClick={member.employeeId === id && !checked ? checkHandler : null}
      style={
        member.employeeId === id && !checked ? { cursor: 'pointer' } : null
      }
    >
      {loading && <Loading />}
      {contextHolder}
      {member.name}
      <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} />
      <motion.div
        whileHover={member.employeeId === id && !checked ? { scale: 2 } : null}
      >
        {checked ? (
          <CheckSquareOutlined
            className="MemberCheckBoxIcon"
            style={{ color: 'green' }}
          />
        ) : (
          <CloseSquareOutlined
            className="MemberCheckBoxIcon"
            style={{ color: 'red' }}
            ref={ref1}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default MemberCheckBox;
