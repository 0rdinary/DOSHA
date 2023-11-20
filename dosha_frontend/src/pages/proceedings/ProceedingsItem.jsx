import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import '../../styles/ProceedingsItem.scss';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function ProceedingsItem({ proceedings }) {
  const navigate = useNavigate();

  const navigateEdit = () => {
    navigate('/proceedings/edit', { state: proceedings });
  };
  return (
    <motion.div
      className="ProceedingsItemBox"
      variants={variants}
      whileHover={{
        backgroundColor: '#95bdfd',
        color: 'white',
      }}
      onClick={navigateEdit}
    >
      <h3 style={{ marginLeft: '1vw' }}>{proceedings.date} 회의</h3>
    </motion.div>
  );
}

export default ProceedingsItem;
