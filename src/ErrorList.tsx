import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import useMemo from 'rc-util/lib/hooks/useMemo';
import useCacheErrors from './hooks/useCacheErrors';
import useForceUpdate from './hooks/useForceUpdate';
import { FormItemPrefixContext } from './context';

const EMPTY_LIST: React.ReactNode[] = [];

export interface ErrorListProps {
  errors?: React.ReactNode[];
  /** @private Internal usage. Do not use in your production */
  help?: React.ReactNode;
  /** @private Internal usage. Do not use in your production */
  onDomErrorVisibleChange?: (visible: boolean) => void;
}

export default function ErrorList({
  errors = EMPTY_LIST,
  help,
  onDomErrorVisibleChange,
}: ErrorListProps) {
  const forceUpdate = useForceUpdate();
  const { prefixCls, status } = React.useContext(FormItemPrefixContext);

  const [visible, cacheErrors] = useCacheErrors(
    errors,
    changedVisible => {
      if (changedVisible) {
        /**
         * We trigger in sync to avoid dom shaking but this get warning in react 16.13.
         *
         * So use Promise to keep in micro async to handle this.
         * https://github.com/ant-design/ant-design/issues/21698#issuecomment-593743485
         */
        Promise.resolve().then(() => {
          onDomErrorVisibleChange?.(true);
        });
      }
      forceUpdate();
    },
    !!help,
  );

  const memoErrors = useMemo(
    () => cacheErrors,
    visible,
    (_, nextVisible) => nextVisible,
  );

  // Memo status in same visible
  const [innerStatus, setInnerStatus] = React.useState(status);
  React.useEffect(() => {
    if (visible && status) {
      setInnerStatus(status);
    }
  }, [visible, status]);

  const baseClassName = `${prefixCls}-explain`;

  return (
    <CSSMotion
      motionDeadline={500}
      visible={visible}
      motionName="show-help"
      onLeaveEnd={() => {
        onDomErrorVisibleChange?.(false);
      }}
      motionAppear
      removeOnLeave
    >
      {({ className: motionClassName }: { className?: string }) => (
        <div
          className={classNames(
            baseClassName,// v3如果使用后缀,就找不到对应的样式了
            motionClassName,
          )}
          key="help"
        >
          {memoErrors.map((error, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} role="alert">
              {error}
            </div>
          ))}
        </div>
      )}
    </CSSMotion>
  );
}
