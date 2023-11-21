import { AnimatePresence, motion } from 'framer-motion';
import { Modal, message } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import '../../styles/CommitteeItem.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';

function CommitteeItem({ employee, deleteFunction }) {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { confirm } = Modal;
  const [messageApi, contextHolder] = message.useMessage();
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '작업을 성공하였습니다',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '작업을 실패하였습니다',
    });
  };

  const deleteHandler = async () => {
    const url = process.env.REACT_APP_DB_HOST + '/api/committee/delete';
    const headers = {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await axios.post(
        url,
        { id: employee.employeeId },
        { headers },
      );
      deleteFunction(employee.employeeId);
      success();
    } catch (e) {
      error();
    }
  };

  const warnDelete = () => {
    confirm({
      title: '정말로 해당 항목을 삭제하시겠습니까?',
      content: '복구할 수 없습니다',
      okText: '삭제',
      okType: 'danger',
      cancleText: '취소',
      centered: true,
      onOk() {
        deleteHandler();
      },
    });
  };

  return (
    <motion.div
      className="CommitteeItemBox"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -500 }}
      variants={variants}
    >
      {contextHolder}
      <h3>
        {employee.employeeId} {employee.employeeName}{' '}
        {employee.employeePosition}
      </h3>
      <motion.div whileHover={{ scale: 1.2 }}>
        <MinusCircleOutlined
          style={{
            color: 'red',
            fontSize: '3.5vh',
            cursor: 'pointer',
          }}
          onClick={warnDelete}
        />
      </motion.div>
    </motion.div>
  );
}

export default CommitteeItem;
