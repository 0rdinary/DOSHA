import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Select, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../../components/Loading';
import CommitteeItem from './CommitteeItem';

const filterOption = function (input, option) {
  return option.label.includes(input);
};

function CommitteeTeam({ team, employees }) {
  const { accessToken } = useSelector((state) => state.authReducer);
  const [selectOption, setSelectOption] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [teamMember, setTeamMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const teamText = team === '사용자 위원' ? 'EMPLOYER' : 'EMPLOYEE';
  const [messageApi, contextHolder] = message.useMessage();

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.5,
      },
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

  useEffect(() => {
    const request = async () => {
      const url = process.env.REACT_APP_DB_HOST + '/api/committee/get';
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(url, {
        params: { role: teamText },
        headers,
      });
      setTeamMember(response.data);
    };
    request();
  }, []);

  useEffect(() => {
    if (employees) {
      employees.forEach((element) => {
        setSelectOption((selectOption) => [
          ...selectOption,
          { label: `${element.name}(${element.id})`, value: element.id },
        ]);
      });
    }
  }, [employees]);

  const onChange = (e) => {
    setSelectedValue(e);
  };

  const addCommittee = async () => {
    const url = process.env.REACT_APP_DB_HOST + '/api/committee/register';
    const headers = {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.post(
        url,
        { id: selectedValue, role: teamText },
        { headers },
      );
      setTeamMember([...teamMember, response.data]);
      success();
    } catch (e) {
      error();
    }
  };

  const memberRemover = (idx) => {
    setTeamMember(teamMember.filter((data) => data.employeeId !== idx));
  };

  return (
    <motion.div
      style={{ width: '100%', paddingLeft: '2vh' }}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {contextHolder}
      {loading ? <Loading /> : null}
      <h2>{team}</h2>
      {teamMember &&
        teamMember.map((data) => (
          <CommitteeItem
            key={data.employeeId}
            employee={data}
            deleteFunction={memberRemover}
          />
        ))}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          style={{ width: '20vw' }}
          showSearch
          placeholder="추가할 직원"
          onChange={onChange}
          filterOption={filterOption}
          options={selectOption}
        />
        <motion.div whileHover={{ scale: 1.2 }}>
          <PlusCircleOutlined
            style={{
              color: 'green',
              fontSize: '3vh',
              marginLeft: '1vh',
              cursor: 'pointer',
            }}
            onClick={addCommittee}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CommitteeTeam;
