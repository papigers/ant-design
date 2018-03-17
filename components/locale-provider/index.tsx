import * as React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import classNames from 'classnames';
import { ModalLocale, changeConfirmLocale } from '../modal/locale';

export interface Locale {
  locale: string;
  Pagination?: Object;
  DatePicker?: Object;
  TimePicker?: Object;
  Calendar?: Object;
  Table?: Object;
  Modal?: ModalLocale;
  Popconfirm?: Object;
  Transfer?: Object;
  Select?: Object;
  Upload?: Object;
}

export interface LocaleProviderProps {
  locale: Locale;
  prefixCls?: string;
  inline?: boolean;
  rtl?: boolean;
  children?: React.ReactElement<any>;
}

function setMomentLocale(locale: Locale) {
  if (locale && locale.locale) {
    moment.locale(locale.locale);
  } else {
    moment.locale('en');
  }
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static propTypes = {
    locale: PropTypes.object,
    prefixCls: PropTypes.string,
    inline: PropTypes.bool,
    rtl: PropTypes.bool,
  };

  static defaultProps = {
    locale: {},
    prefixCls: 'ant-locale',
    inline: false,
    rtl: false,
  };

  static childContextTypes = {
    antLocale: PropTypes.object,
    isRtl: PropTypes.bool,
  };

  getChildContext() {
    return {
      antLocale: {
        ...this.props.locale,
        exist: true,
      },
      isRtl: this.props.rtl,
    };
  }

  componentWillMount() {
    setMomentLocale(this.props.locale);
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps: LocaleProviderProps) {
    const { locale } = this.props;
    const nextLocale = nextProps.locale;
    if (locale !== nextLocale) {
      setMomentLocale(nextProps.locale);
    }
  }

  componentDidUpdate() {
    const { locale } = this.props;
    changeConfirmLocale(locale && locale.Modal);
  }

  componentWillUnmount() {
    changeConfirmLocale();
  }

  render() {
    const { rtl, children, inline, prefixCls } = this.props;
    const direction = rtl ? 'rtl' : 'ltr';
    const Tag = inline ? 'span' : 'div';
    const className = classNames(prefixCls, {
      [`${prefixCls}-rtl`]: !!rtl,
      [`${prefixCls}-ltr`]: !rtl,
    });
    return (
      <Tag dir={direction} className={className}>
        {React.Children.only(children)}
      </Tag>
    );
  }
}
