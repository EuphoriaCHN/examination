import React from 'react';

import './index.scss';

interface IProps {
  style?: React.CSSProperties;
  children: [JSX.Element, JSX.Element];
}

const BAR_WIDTH = 8 as const;
const LEFT_CHILD_MIN_WIDTH_RATIO = 0.35;
const LEFT_CHILD_MAX_WIDTH_RATIO = 0.65;

function DraggableWrapper(props: IProps) {
  const boxElRef = React.useRef<HTMLDivElement>(null);
  const leftElRef = React.useRef<HTMLDivElement>(null);
  const rightElRef = React.useRef<HTMLDivElement>(null);
  const barElRef = React.useRef<HTMLDivElement>(null);
  const maskElRef = React.useRef<HTMLDivElement>(null);

  const boxElClientWidthRef = React.useRef(0);

  const handleBarMouseDown = React.useCallback((ev: MouseEvent) => {
    if (barElRef.current?.isEqualNode(ev.target as any)) {
      boxElClientWidthRef.current = boxElRef.current?.clientWidth || 0;
      maskElRef.current!.style.display = 'block';
    }
  }, []);

  const handleBarMouseUp = React.useCallback((ev: MouseEvent) => {
    maskElRef.current!.style.display = 'none';
  }, []);

  const handleOnDruggingMouseLeave = React.useCallback((ev: MouseEvent) => {
    maskElRef.current!.style.display = 'none';
  }, []);

  const handleOnDruggingMouseMove = React.useCallback((ev: MouseEvent) => {
    const ratio = ev.offsetX / boxElClientWidthRef.current;

    let offsetX = ev.offsetX;

    // 移动的太快了，直接设置为极限值
    if (ratio < LEFT_CHILD_MIN_WIDTH_RATIO) {
      offsetX = boxElClientWidthRef.current * LEFT_CHILD_MIN_WIDTH_RATIO;
    } else if (ratio > LEFT_CHILD_MAX_WIDTH_RATIO) {
      offsetX = boxElClientWidthRef.current * LEFT_CHILD_MAX_WIDTH_RATIO;
    }

    const barLeft = offsetX - BAR_WIDTH / 2;
    const leftElWidth = offsetX - BAR_WIDTH / 2;
    const rightElWidth = boxElClientWidthRef.current - offsetX - BAR_WIDTH / 2;

    // 修改 bar 的位置
    barElRef.current!.style.left = `${barLeft}px`;
    // 修改左右孩子的宽度
    leftElRef.current!.style.width = `${leftElWidth}px`;
    rightElRef.current!.style.width = `${rightElWidth}px`;
  }, []);

  const handleBoxResize = React.useCallback((entry: ResizeObserverEntry[], ob: ResizeObserver) => {
    if (!boxElRef.current || !barElRef.current) return;

    // 如果整个 Box 被 resize 了，先重制 bar 的位置
    const boxWidth = boxElRef.current.clientWidth;
    barElRef.current.style.left = `${boxWidth / 2 - 2}px`;

    leftElRef.current!.style.width = ``;
    rightElRef.current!.style.width = ``;
  }, []);

  const initialize = React.useCallback(() => {
    if (
      !boxElRef.current ||
      !leftElRef.current ||
      !rightElRef.current ||
      !barElRef.current
    ) return;

    barElRef.current.style.display = 'block';
  }, []);

  React.useLayoutEffect(() => {
    setTimeout(() => initialize());

    let resizeObserver: ResizeObserver | null = null;

    if (!!boxElRef.current) {
      resizeObserver = new ResizeObserver(handleBoxResize);
    }

    boxElRef.current?.addEventListener('mousedown', handleBarMouseDown);
    boxElRef.current?.addEventListener('mouseup', handleBarMouseUp);
    maskElRef.current?.addEventListener('mousemove', handleOnDruggingMouseMove);
    maskElRef.current?.addEventListener('mouseleave', handleOnDruggingMouseLeave);

    !!boxElRef.current && resizeObserver?.observe(boxElRef.current);

    return () => {
      boxElRef.current?.removeEventListener('mousedown', handleBarMouseDown);
      boxElRef.current?.removeEventListener('mouseup', handleBarMouseUp);
      maskElRef.current?.removeEventListener('mousemove', handleOnDruggingMouseMove);
      maskElRef.current?.removeEventListener('mouseleave', handleOnDruggingMouseLeave);

      !!boxElRef.current && resizeObserver?.unobserve(boxElRef.current);
    };
  }, []);

  return (
    <div
      style={props.style}
      className={'draggable-wrapper'}
      ref={boxElRef}
      id={'fuck'}
    >
      <div className={'draggable-wrapper-item'} ref={leftElRef}>
        {props.children[0]}
      </div>
      <div className={'draggable-wrapper-item'} ref={rightElRef}>
        {props.children[1]}
      </div>
      <div
        className={'draggable-wrapper-bar'}
        ref={barElRef}
        style={{ width: BAR_WIDTH }}
      />
      <div className={'draggable-wrapper-mask'} ref={maskElRef} />
    </div>
  );
}

export default DraggableWrapper;
