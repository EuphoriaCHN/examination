import React from 'react';
import { omit } from 'lodash';

import { Toast } from 'semi';

interface IWithMaxClickConfig {
  count: number;
  message?: (count: number, target: number) => string;
  messageWatermark?: number;
}

function withMaxClick(config: IWithMaxClickConfig) {
  const { count, message, messageWatermark } = config;

  return function <T extends {}>(Component: React.ComponentType<T>) {
    return function (props: T & { onMaxClick: () => void; }) {
      const timerRef = React.useRef<NodeJS.Timeout | null>(null);
      const counterRef = React.useRef(0);

      const handleOnClick = React.useCallback(() => {
        if (!!timerRef.current) clearTimeout(timerRef.current);

        ++counterRef.current;

        if (counterRef.current >= count) {
          counterRef.current = 0;
          return props.onMaxClick();
        } else {
          timerRef.current = setTimeout(() => {
            counterRef.current = 0;
          }, 3000);
        }

        let msg: string = '';

        if (typeof message === 'function') {
          msg = message(counterRef.current, config.count);
        }

        if (
          !!msg &&
          (
            typeof messageWatermark !== 'number' ||
            counterRef.current >= messageWatermark
          )
        ) {
          Toast.info(msg);
        }
      }, []);

      React.useEffect(() => {
        timerRef.current = null;
        counterRef.current = 0;
      }, []);

      return (
        <div onClick={handleOnClick}>
          <Component {...omit(props, ['onMaxClick']) as any} />
        </div>
      );
    }
  };
}

export default withMaxClick;
