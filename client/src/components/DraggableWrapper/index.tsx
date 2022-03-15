import React from 'react';

import './index.scss';

type HiddenType = 'left' | 'right' | null;
interface IProps {
  style?: React.CSSProperties;
  children: [JSX.Element, JSX.Element];
  minWidthRatio?: number;
  closeRatio?: number;
  defaultHiddenType?: HiddenType;
}

const BAR_WIDTH = 8 as const;
const DEFAULT_MIN_WIDTH_RATIO = 0.35;

function DraggableWrapper(props: IProps) {
  const [hiddenBlock, setHiddenBlock] = React.useState<HiddenType>(props.defaultHiddenType ?? null);

  const boxElRef = React.useRef<HTMLDivElement>(null);
  const leftElRef = React.useRef<HTMLDivElement>(null);
  const rightElRef = React.useRef<HTMLDivElement>(null);
  const barElRef = React.useRef<HTMLDivElement>(null);
  const maskElRef = React.useRef<HTMLDivElement>(null);

  const boxElClientWidthRef = React.useRef(0);

  const minWidthLeftRatio = props.minWidthRatio ?? DEFAULT_MIN_WIDTH_RATIO;
  const maxWidthLeftRatio = 1 - minWidthLeftRatio;

  const minCloseRatio = props.closeRatio ?? -1;
  const maxCloseRatio = 1 - minCloseRatio;

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
    if (ratio < minWidthLeftRatio) {
      offsetX = boxElClientWidthRef.current * minWidthLeftRatio;
    } else if (ratio > maxWidthLeftRatio) {
      offsetX = boxElClientWidthRef.current * maxWidthLeftRatio;
    }

    // 设置了关闭阈值
    if (ratio < minCloseRatio) {
      offsetX = 0;
      setHiddenBlock('left');
    } else if (ratio > maxCloseRatio) {
      offsetX = boxElClientWidthRef.current - BAR_WIDTH / 2;
      setHiddenBlock('right');
    } else {
      setHiddenBlock(null);
    }

    const barLeft = Math.max(offsetX - BAR_WIDTH / 2, 0);
    const leftElWidth = Math.max(offsetX - BAR_WIDTH / 2, 0);
    const rightElWidth = boxElClientWidthRef.current - offsetX - BAR_WIDTH / 2;

    // 修改 bar 的位置
    barElRef.current!.style.left = `${barLeft}px`;
    // 修改左右孩子的宽度
    leftElRef.current!.style.width = `${leftElWidth}px`;
    rightElRef.current!.style.width = `${rightElWidth}px`;
  }, [minWidthLeftRatio, maxWidthLeftRatio, minCloseRatio, maxCloseRatio]);

  const handleBoxResize = React.useCallback((entry: ResizeObserverEntry[], ob: ResizeObserver) => {
    // 变的不是宽度
    if (entry[0].contentRect.width === boxElClientWidthRef.current) return;
    if (!boxElRef.current || !barElRef.current) return;

    // 如果整个 Box 被 resize 了，先重制 bar 的位置
    const boxWidth = boxElRef.current.clientWidth;
    barElRef.current.style.left = `${boxWidth / 2 - 2}px`;

    boxElClientWidthRef.current = entry[0].contentRect.width;

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
    boxElClientWidthRef.current = boxElRef.current?.clientWidth || 0;
  }, []);

  React.useLayoutEffect(() => {
    setTimeout(() => initialize());

    let resizeObserver: ResizeObserver | null = null;

    if (!!boxElRef.current) {
      resizeObserver = new ResizeObserver(handleBoxResize);
    }

    boxElRef.current?.addEventListener('mousedown', handleBarMouseDown);
    boxElRef.current?.addEventListener('mouseup', handleBarMouseUp);
    maskElRef.current?.addEventListener('mouseleave', handleOnDruggingMouseLeave);

    !!boxElRef.current && resizeObserver?.observe(boxElRef.current);

    return () => {
      boxElRef.current?.removeEventListener('mousedown', handleBarMouseDown);
      boxElRef.current?.removeEventListener('mouseup', handleBarMouseUp);
      maskElRef.current?.removeEventListener('mouseleave', handleOnDruggingMouseLeave);

      !!boxElRef.current && resizeObserver?.unobserve(boxElRef.current);
    };
  }, []);

  React.useLayoutEffect(() => {
    maskElRef.current?.addEventListener('mousemove', handleOnDruggingMouseMove);

    return () => {
      maskElRef.current?.removeEventListener('mousemove', handleOnDruggingMouseMove);
    };
  }, [handleOnDruggingMouseMove]);

  return (
    <div
      style={props.style}
      className={'draggable-wrapper'}
      ref={boxElRef}
    >
      <div className={'draggable-wrapper-item'} ref={leftElRef}>
        {hiddenBlock !== 'left' && props.children[0]}
      </div>
      <div className={'draggable-wrapper-item'} ref={rightElRef}>
        {hiddenBlock !== 'right' && props.children[1]}
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
