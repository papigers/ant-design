import * as React from 'react';
import PropTypes from 'prop-types';
import RcPagination from 'rc-pagination';
import enUS from 'rc-pagination/lib/locale/en_US';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import Select from '../select';
import MiniSelect from './MiniSelect';

export interface PaginationProps {
  total?: number;
  defaultCurrent?: number;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize?: number) => void;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  onShowSizeChange?: (current: number, size: number) => void;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  size?: string;
  simple?: boolean;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next') => React.ReactNode;
}

export type PaginationLocale = any;

export default class Pagination extends React.Component<PaginationProps, {}> {
  static defaultProps = {
    prefixCls: 'ant-pagination',
    selectPrefixCls: 'ant-select',
  };
  static contextTypes = {
    isRtl: PropTypes.bool,
  };

  renderPagination = (locale: PaginationLocale) => {
    const { className, prefixCls, size, ...restProps } = this.props;
    const isSmall = size === 'small';
    const classes = classNames(className, {
      mini: isSmall,
      [`${prefixCls}-rtl`]: this.context.isRtl,
    });
    return (
      <RcPagination
        {...restProps}
        prefixCls={prefixCls}
        className={classes}
        selectComponentClass={isSmall ? MiniSelect : Select}
        locale={locale}
      />
    );
  }

  render() {
    return (
      <LocaleReceiver
        componentName="Pagination"
        defaultLocale={enUS}
      >
        {this.renderPagination}
      </LocaleReceiver>
    );
  }
}
