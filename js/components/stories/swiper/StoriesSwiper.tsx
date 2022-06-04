import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  VFC,
} from 'react';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StoriesSwiperNavigationPrev } from './StoriesSwiperNavigationPrev';
import { StoriesSwiperNavigationNext } from './StoriesSwiperNavigationNext';
import { Timeline } from './Timeline';
import storiesSwiperCss from './assets/stories-swiper.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

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
  useStyles(storiesSwiperCss);
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
  const [progress, setProgress] = useState<number>(0);
  const refSwiper = useRef(null);
  const refProgressIntervalId = useRef<NodeJS.Timer | number | null>(null);
  const refChangeTimerId = useRef<NodeJS.Timer | number | null>(null);
  const refIsPause = useRef<boolean>(false);
  const refProgress = useRef<number>(0);

  const stopProgressInterval = (clearProgress = true) => {
    if (refProgressIntervalId.current) {
      clearTimeout(refProgressIntervalId.current as number);
      if (clearProgress) {
        setProgress(0);
        refProgress.current = 0;
      }
    }
  };

  const startProgressInterval = (clearProgress = true) => {
    stopProgressInterval(clearProgress);
    refProgressIntervalId.current = setInterval(() => {
      setProgress((currentProgress) => {
        refProgress.current = currentProgress + 10;
        return refProgress.current;
      });
    }, 10);
  };

  const stopChangeTimer = () => {
    if (refChangeTimerId.current) {
      clearTimeout(refChangeTimerId.current as number);
    }
  };

  const startChangeTimer = (durationForce = duration) => {
    stopChangeTimer();
    refChangeTimerId.current = setTimeout(() => {
      refSwiper.current.slideNext();
    }, durationForce);
  };

  const pause = () => {
    refIsPause.current = true;
    stopProgressInterval(false);
    stopChangeTimer();
  };

  const resume = () => {
    refIsPause.current = false;
    startChangeTimer(duration - refProgress.current);
    startProgressInterval(false);
  };

  const handlerSlideChange = (swiper) => {
    if (refIsPause.current) {
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

  const storiesList = stories.map((storiesItem , index) => (
    <SwiperSlide key={`stories-${index}`}>
      {storiesItem}
    </SwiperSlide>
  ));

  return (
    <div className={storiesSwiperCss.storiesSwiperHolder}>
      <Timeline duration={duration} currentSlide={currentSlide} stories={storiesList} progress={progress} />
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
        {storiesList}
      </Swiper>
    </div>
  );
};

export { StoriesSwiper };
