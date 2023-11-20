import {
  FileDoneOutlined,
  ReadOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  FileSearchOutlined,
  ProfileOutlined,
  WarningOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../styles/SidebarItem.scss';
import { sideActions } from '../store/slices/sideReducer';

const components = {
  appointments: FileDoneOutlined,
  educations: ReadOutlined,
  submanagerList: UserOutlined,
  committee: UsergroupAddOutlined,
  company: SolutionOutlined,
  inspection: FileSearchOutlined,
  inspectionList: FileSearchOutlined,
  proceedings: ProfileOutlined,
  riskRegist: WarningOutlined,
  meetingList: CommentOutlined,
  riskList: WarningOutlined,
};
const names = {
  appointments: '선임서 관리',
  educations: '교육필증 관리',
  submanagerList: '관리감독자 조회',
  committee: '산업안전보건위원회 관리',
  company: '수급사 관리',
  inspection: '순회점검표 보고',
  inspectionList: '순회점검표 결제',
  proceedings: '산업안전보건위원회 회의록 관리',
  riskRegist: '위험성 평가표 제출',
  meetingList: '도급사업안전보건협의체 회의록 관리',
  riskList: '위험성 평가표 결제',
};

function SidebarItem({ name, src, idx }) {
  const { isFolded, index } = useSelector((state) => state.sideReducer);
  const [selected, setSelected] = useState(false);
  const ActiveComponent = components[name];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateHandler = () => {
    navigate(src);
    dispatch(sideActions.move(idx));
  };

  return (
    <div className="SidebarItem" onClick={navigateHandler}>
      <div
        className="SelectedMarker"
        style={idx === index ? { backgroundColor: '#57a1f2' } : null}
      />
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '6vh',
          borderRadius: '1vh',
        }}
        whileHover={{ scale: 1.1, backgroundColor: '#bababa' }}
      >
        <ActiveComponent className="SidebarItemIcon" />
        {!isFolded && (
          <motion.h3
            style={{ width: '9vh' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {names[name]}
          </motion.h3>
        )}
      </motion.div>
    </div>
  );
}

export default SidebarItem;
