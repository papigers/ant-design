import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonSize } from './button';

export interface ButtonGroupProps {
  size?: ButtonSize;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

const ButtonGroup: React.SFC<ButtonGroupProps> = (props, { isRtl = false }) => {
  const { prefixCls = 'ant-btn-group', size, className, ...others } = props;

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
    default:
      break;
  }

  const classes = classNames(prefixCls, {
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-rtl`]: isRtl,
  }, className);

  return <div {...others} className={classes} />;
};

ButtonGroup.contextTypes = {
  isRtl: PropTypes.bool,
};

export default ButtonGroup;
