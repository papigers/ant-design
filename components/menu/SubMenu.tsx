import * as React from 'react';
import PropTypes from 'prop-types';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';

class SubMenu extends React.Component<any, any> {
  static contextTypes = {
    antdMenuTheme: PropTypes.string,
    isRtl: PropTypes.bool,
  };
  private subMenu: any;
  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.subMenu.onKeyDown(e);
  }
  saveSubMenu = (subMenu: any) => {
    this.subMenu = subMenu;
    this.padSubMenuTitle();
  }
  padSubMenuTitle = () => {
    if (this.subMenu && this.subMenu.subMenuTitle) {
      const { mode, level, inlineIndent } = this.props;
      const rtlPaddingRight = this.context.isRtl && mode === 'inline' ? level * inlineIndent : null;

      if (rtlPaddingRight) {
        this.subMenu.subMenuTitle.setAttribute('style', `padding-right: ${rtlPaddingRight}px;`);
      }
    }
  }
  render() {
    const { rootPrefixCls, className } = this.props;
    const theme = this.context.antdMenuTheme;
    const classes = classNames(`${rootPrefixCls}-${theme}`, className, {
      [`${rootPrefixCls}-submenu-rtl`]: this.context.isRtl,
    });
    this.padSubMenuTitle();
    return (
      <RcSubMenu
        {...this.props}
        ref={this.saveSubMenu}
        popupClassName={classes}
      />
    );
  }
}

export default SubMenu;
