import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import NotificationItem from './notification/NotificationItem';

import '../styles/Home.scss';

function Home() {
  const { count, notifications } = useSelector(
    (state) => state.notificationReducer,
  );

  console.log(notifications);

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

  return (
    <div className="HomeBox">
      <motion.div
        className="NotificationBox"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <h1 style={{ marginLeft: '2vh' }}>알림 확인</h1>
        <div className="NotificationTextBottom" />
        {notifications &&
          notifications.map((data) => (
            <NotificationItem
              key={data.id}
              notiId={data.id}
              notiType={data.notiType}
            />
          ))}
      </motion.div>
    </div>
  );
}
export default Home;
