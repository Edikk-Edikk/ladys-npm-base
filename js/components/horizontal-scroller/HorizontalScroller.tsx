import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type PropsType = {
  children: ReactElement[];
  innerAdditionalClassName: string;
};

const HorizontalScroller: React.FC<PropsType> = ({
  children,
  innerAdditionalClassName,
}) => {
  const refContainer = useRef<HTMLDivElement>();
  const refInner = useRef<HTMLDivElement>();
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [innerWidth, setInnerWidth] = useState<number>(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.isEqualNode(refInner.current)) {
          setInnerWidth(entry.target.clientWidth);
        } else {
          setContainerWidth(entry.target.clientWidth);
        }
      });
    });
    resizeObserver.observe(refInner.current);
    resizeObserver.observe(refContainer.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={refContainer} className="horizontal-scroller">
      <motion.div
        ref={refInner}
        className={classNames('horizontal-scroller__inner', innerAdditionalClassName)}
        drag="x"
        dragTransition={{
          min: -innerWidth + containerWidth,
          max: 0,
        }}
        dragConstraints={{
          right: 0,
          left: -innerWidth + containerWidth,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export { HorizontalScroller };
