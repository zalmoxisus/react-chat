import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import ToolTip from 'react-portal-tooltip';
import initials from 'initials';
import styles from '../chat.scss';

const colors = [
  '#8e44ad', // wisteria
  '#1abc9c', // turquoise
  '#3498db', // peter river
  '#27ae60', // nephritis
  '#2980b9', // belize hole
  '#e67e22', // carrot
  '#16a085', // green sea
  '#e74c3c', // alizarin
  '#d35400', // pumpkin
  '#c0392b' // pomegranate
];

@inject('contactStore')
export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      mouseTop: true,
      mouseRight: false
    };
  }
  handleMouseEnter = (e) => {
    const mouseTop = e.pageY < (document.body.scrollHeight - 200);
    let mouseRight = true;
    if (this.props.size) {
      mouseRight = ((document.body.offsetWidth - e.pageX) > (this.props.size + 10));
    }
    setTimeout(() => { this.setState({ showTooltip: true }); }, 0);
    setTimeout(() => { this.setState({ mouseTop }); }, 0);
    setTimeout(() => { this.setState({ mouseRight }); }, 0);
  };
  handleMouseLeave = () => {
    this.setState({ showTooltip: false });
  };
  render() {
    const {
      src,
      name,
      contactStore,
      borderRadius = '20%',
      color,
      size = 40,
      ...rest
     } = this.props;

    const imageStyle = {
      display: 'block',
      borderRadius
    };

    const innerStyle = {
      display: 'flex',
      textAlign: 'center',
      verticalAlign: 'middle',
      color: '#fff',
      fontSize: '16px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius
    };
    if (size) {
      imageStyle.width = innerStyle.width = innerStyle.minWidth = size;
      imageStyle.height = innerStyle.height = innerStyle.minHeight = size;
    }

    let inner;
    if (src) {
      inner = <img style={imageStyle} src={src} alt={name} />;
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        const i = (name.charCodeAt(0) * name.length) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = initials(this.props.name);
    }
    return (
      <div
        style={innerStyle}
        {...rest}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        id={'a' + this.props.id}
      >
        {inner}
        {
          contactStore.toolTipPosition &&
          <ToolTip
            active={this.state.showTooltip}
            position={this.state.mouseRight ? contactStore.toolTipPosition : 'left'}
            arrow={ (this.state.mouseTop) ? 'top' : 'bottom' }
            parent={'#a' + this.props.id}
          >
            <div>
              <div className={styles.avtrName}>
                <div> {name} </div>
              </div>
              { src && <img src={src} /> }
            </div>
            <div>{this.props.children}</div>
          </ToolTip>
        }
      </div>
    );
  }
}

Avatar.wrappedComponent.propTypes = {
  contactStore: PropTypes.object,
  id: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  borderRadius: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  buttons: PropTypes.bool,
  children: React.PropTypes.any
};
