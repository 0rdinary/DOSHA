import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';

import Loading from './Loading';
import SidebarItem from './SidebarItem';

import '../styles/Sidebar.scss';

function Sidebar() {
  const { isFolded } = useSelector((state) => state.sideReducer);
  const { id, role, accessToken } = useSelector((state) => state.authReducer);
  const [isCommittee, setIsCommittee] = useState(false);

  useEffect(() => {
    // 로그인이 되어 있다면 => 위원회 위원인지 확인하고 가져오기
    if (id) {
      const request = async () => {
        const url = '/api/committee/isMember';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(url, {
          params: { id },
          headers,
        });

        if (response.data) {
          setIsCommittee(true);
        }
      };
      request();
    }
  }, []);

  return (
    <motion.div
      className="Sidebar"
      animate={isFolded ? { width: '11vh' } : { width: '20vh' }}
    >
      {role === 'ROLE_MANAGER' || role === 'ROLE_SUBMANAGER' ? (
        <SidebarItem
          name="appointments"
          src={
            role === 'ROLE_MANAGER'
              ? '/manager/appointments'
              : '/submanager/appointments'
          }
          idx={1}
        />
      ) : null}
      {role === 'ROLE_MANAGER' && (
        <SidebarItem name="educations" src="/manager/educations" idx={2} />
      )}
      {role === 'ROLE_MANAGER' && (
        <SidebarItem name="submanagerList" src="/submanager/list" idx={3} />
      )}
      {role === 'ROLE_MANAGER' && (
        <SidebarItem name="inspectionList" src="/inspectionlist" idx={4} />
      )}
      {role === 'ROLE_ADMIN' && (
        <SidebarItem name="committee" src="/committee" idx={5} />
      )}
      {role === 'ROLE_SUBMANAGER' && (
        <SidebarItem name="company" src="/company" idx={6} />
      )}
      {role === 'ROLE_SUBMANAGER' && (
        <SidebarItem name="inspection" src="/inspection" idx={7} />
      )}
      {isCommittee && (
        <SidebarItem name="proceedings" src="/proceedings" idx={8} />
      )}
      {role === 'ROLE_SUBMANAGER' && (
        <SidebarItem name="riskRegist" src="/risk/regist" idx={9} />
      )}
      {role === 'ROLE_ADMIN' && (
        <SidebarItem name="meetingList" src="/meeting/list" idx={10} />
      )}
      {role === 'ROLE_MANAGER' && (
        <SidebarItem name="riskList" src="/risk/list" idx={11} />
      )}
    </motion.div>
  );
}

export default Sidebar;
