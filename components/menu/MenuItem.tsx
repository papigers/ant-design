import * as React from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '../tooltip';

class MenuItem extends React.Component<any, any> {
  static contextTypes = {
    inlineCollapsed: PropTypes.bool,
    isRtl: PropTypes.bool,
  };
  static isMenuItem = 1;
  private menuItem: any;
  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.menuItem.onKeyDown(e);
  }
  saveMenuItem = (menuItem: any) => {
    this.menuItem = menuItem;
  }
  render() {
    const { inlineCollapsed, isRtl } = this.context;
    const { className, ...props } = this.props;
    const overlayClasses = classNames(`${props.rootPrefixCls}-inline-collapsed-tooltip`, {
      [`${props.rootPrefixCls}-inline-collapsed-tooltip-rtl`]: isRtl,
    });
    const classes = classNames(className, {
      [`${props.rootPrefixCls}-item-rtl`]: isRtl,
    });
    const rtlInlineStyle = isRtl && props.mode === 'inline' ? {
      paddingRight: props.level * props.inlineIndent,
    } : {};
    return <Tooltip
      title={inlineCollapsed && props.level === 1 ? props.children : ''}
      placement={isRtl ? 'left' : 'right'}
      overlayClassName={overlayClasses}
    >
      <Item {...props} className={classes} ref={this.saveMenuItem} style={rtlInlineStyle} />
    </Tooltip>;
  }
}

export default MenuItem;
