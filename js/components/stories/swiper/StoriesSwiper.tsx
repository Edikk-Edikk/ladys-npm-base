import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  VFC,
} from 'react';
import 'swiper/swiper.min.css';
import { Swiper } from 'swiper/react';
import { StoriesSwiperNavigationPrev } from './StoriesSwiperNavigationPrev';
import { StoriesSwiperNavigationNext } from './StoriesSwiperNavigationNext';
import { Timeline } from './Timeline';
// @ts-ignore
import storiesSwiperCss from './stories-swiper.module.scss';

type PropsType = {
  stories: ReactElement[];
  duration?: number;
  initialSlide?: number;
};

const StoriesSwiper: VFC<PropsType> = ({
  stories = [],
  duration = 10000,
  initialSlide = 0,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
  const [progress, setProgress] = useState<number>(0);
  const refSwiper = useRef(null);
  let changeTimerId;
  let progressIntervalId;
  let progressLocal = 0;
  let isPause = false;

  const stopProgressInterval = (clearProgress = true) => {
    if (progressIntervalId) {
      clearTimeout(progressIntervalId);
      if (clearProgress) {
        setProgress(0);
        progressLocal = 0;
      }
    }
  };

  const startProgressInterval = (clearProgress = true) => {
    stopProgressInterval(clearProgress);
    progressIntervalId = setInterval(() => {
      setProgress((currentProgress) => {
        progressLocal = currentProgress + 10;
        return progressLocal;
      });
    }, 10);
  };

  const stopChangeTimer = () => {
    if (changeTimerId) {
      clearTimeout(changeTimerId);
    }
  };

  const startChangeTimer = (durationForce = duration) => {
    stopChangeTimer();
    changeTimerId = setTimeout(() => {
      refSwiper.current.slideNext();
    }, durationForce);
  };

  const pause = () => {
    isPause = true;
    stopProgressInterval(false);
    stopChangeTimer();
  };

  const resume = () => {
    isPause = false;
    startChangeTimer(duration - progressLocal);
    startProgressInterval(false);
  };

  const handlerSlideChange = (swiper) => {
    if (isPause) {
      return;
    }

    setCurrentSlide(swiper.realIndex);
    startChangeTimer();
    startProgressInterval();
  };

  useEffect(() => () => {
    stopChangeTimer();
    stopProgressInterval();
  }, []);

  return (
    <div className={storiesSwiperCss.storiesSwiperHolder}>
      <Timeline duration={duration} currentSlide={currentSlide} stories={stories} progress={progress} />
      <Swiper
        className={storiesSwiperCss.storiesSwiper}
        initialSlide={initialSlide}
        loop
        onSlideChange={handlerSlideChange}
        onTouchStart={pause}
        onTouchEnd={resume}
        onInit={(swiper) => {
          refSwiper.current = swiper;
        }}
      >
        <StoriesSwiperNavigationPrev swiper={refSwiper.current} />
        <StoriesSwiperNavigationNext swiper={refSwiper.current} />
        {stories}
      </Swiper>
    </div>
  );
};

export { StoriesSwiper };
