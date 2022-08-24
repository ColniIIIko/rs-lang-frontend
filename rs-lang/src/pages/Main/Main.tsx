import { motion } from 'framer-motion';
import './style.scss';

function Main() {
  return (
    <div className='main-wrapper'>
      <main className='main'>
        <motion.div
          className='main__intro1'
          animate={{ y: '40%', opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 2 }}
        >
          <p className='main__intro-text'>Изучай английский с Lang.</p>
          <p className='main__intro-subtext'>Приложение для эффективного изучения иностранных слов в игровой форме</p>
        </motion.div>
        <div className='main__img1'></div>
        <motion.div
          className='main__intro2'
          animate={{ y: '40%', opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 2, delay: 1 }}
        >
          <p className='main__intro-text'>Изучай английский с Lang.</p>
          <p className='main__intro-subtext'>Приложение для эффективного изучения иностранных слов в игровой форме</p>
        </motion.div>
        <div className='main__img2'></div>
      </main>
    </div>
  );
}

export default Main;
