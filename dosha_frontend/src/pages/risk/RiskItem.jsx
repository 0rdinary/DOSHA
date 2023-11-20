import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function RiskItem({ risk }) {
  const navigate = useNavigate();

  const navigateCheck = () => {
    navigate('/risk/check', { state: risk });
  };

  return (
    <motion.div
      className="ProceedingsItemBox"
      variants={variants}
      whileHover={{
        backgroundColor: '#95bdfd',
        color: 'white',
      }}
      onClick={navigateCheck}
    >
      <h3 style={{ marginLeft: '1vw' }}>
        {risk.employeeName}님의 위험성평가표 결제요청
      </h3>
    </motion.div>
  );
}

export default RiskItem;
