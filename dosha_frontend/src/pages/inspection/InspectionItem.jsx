import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function InspectionItem({ inspection }) {
  const navigate = useNavigate();

  const navigateCheck = () => {
    navigate('/inspection/check', { state: inspection });
  };

  return (
    <motion.div
      className="MeetingItemBox"
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{
        backgroundColor: '#95bdfd',
        color: 'white',
      }}
      onClick={navigateCheck}
    >
      <h3 style={{ marginLeft: '1vw' }}>
        {inspection.employeeName}님의 순회점검표 결제요청
      </h3>
    </motion.div>
  );
}

export default InspectionItem;
