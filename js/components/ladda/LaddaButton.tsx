import { cloneElement, Component, ReactElement } from 'react';
import * as Ladda from 'ladda';
import { LaddaButton as LaddaButtonOriginType } from 'ladda';
import omit from 'lodash/omit';
import { OMITTED_PROPS, } from './constants';
import { PropsType } from './PropsType';
import { Style } from './style';
import './ladda.scss';

const defaultProps = {
  'data-style': Style.zoomIn,
};

class LaddaButton extends Component<PropsType, {}> {
  private laddaInstance: LaddaButtonOriginType;
  private node: HTMLButtonElement;

  componentDidMount() {
    const { loading } = this.props;

    this.laddaInstance = Ladda.create(this.node);

    if (loading) {
      this.laddaInstance.start();
    }
  }

  componentDidUpdate(prevProps) {
    this.updateLaddaInstance(prevProps);
  }

  componentWillUnmount() {
    this.laddaInstance.remove();
  }

  setNode = (node) => {
    this.node = node;
    if (node) {
      this.laddaInstance = Ladda.create(node);
    }
  }
  updateLaddaInstance = (props) => {
    const { loading } = this.props;

    if (props.loading !== loading) {
      if (loading) {
        this.laddaInstance.start();
      } else {
        this.laddaInstance.stop();
      }
    }
  }

  render() {
    const {
      disabled,
      loading,
      children,
    } = this.props;

    let childrenProps = omit(this.props, OMITTED_PROPS);

    return cloneElement(children as ReactElement, {
      ref: (element) => {
        // @ts-ignore
        const { ref } = children;

        this.setNode(element);
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref && typeof ref === 'object' && 'current' in ref) {
          ref.current = element;
        }
      },
      disabled: disabled || loading,
      ...childrenProps,
    });
  }
}

// @ts-ignore
LaddaButton.defaultProps = defaultProps;

export { LaddaButton };
