import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import '../../styles/MeetingItem.scss';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function MeetingItem({ meeting }) {
  const navigate = useNavigate();

  const navigateView = () => {
    navigate('/meeting/view', { state: meeting });
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
      onClick={navigateView}
    >
      <h3 style={{ marginLeft: '1vw' }}>{meeting.name}</h3>
    </motion.div>
  );
}
export default MeetingItem;
