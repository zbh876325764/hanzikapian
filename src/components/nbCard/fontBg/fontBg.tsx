import { Component, Prop, h } from '@stencil/core';
import {HanziStyle} from '../../global'
@Component({
  tag: 'font-bg',
  styleUrls: ['fontBg.scss'],
})
export class FontBg {
  /**
   * 1 米字格
   * 2 田字格
   */
  @Prop() type: number;

  @Prop() insertId: string;

  @Prop({mutable:true}) styleConfig: HanziStyle
  componentWillLoad() {}
  componentDidRender() {}
  bgRender(type: number) {
    const {width=100} = this.styleConfig
    switch (type) {
      case 1:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} class="fontBg" id={this.insertId}>
            <line x1={0} y1={0} x2={width} y2={0} stroke="#DDD" />
            <line x1={0} y1={0} x2={0} y2={width} stroke="#DDD" />
            <line x1={width} y1={0} x2={width} y2={width} stroke="#DDD" />
            <line x1={0} y1={width} x2={width} y2={width} stroke="#DDD" />
            <line x1="0" y1="0" x2={width} y2={width} stroke="#DDD" />
            <line x1={width} y1="0" x2="0" y2={width} stroke="#DDD" />
            <line x1={width/2} y1="0" x2={width/2} y2={width} stroke="#DDD" />
            <line x1="0" y1={width/2} x2={width} y2={width/2} stroke="#DDD" />
          </svg>
        );
      case 2:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} class="fontBg" id={this.insertId}>
            <line x1={0} y1={0} x2={width} y2={0} stroke="#DDD" />
            <line x1={0} y1={0} x2={0} y2={width} stroke="#DDD" />
            <line x1={width} y1={0} x2={width} y2={width} stroke="#DDD" />
            <line x1={0} y1={width} x2={width} y2={width} stroke="#DDD" />
            <line x1={width/2} y1="0" x2={width/2} y2={width} stroke="#DDD" />
            <line x1="0" y1={width/2} x2={width} y2={width/2} stroke="#DDD" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} class="fontBg" id={this.insertId}>
            <line x1={0} y1={0} x2={width} y2={0} stroke="#DDD" />
            <line x1={0} y1={0} x2={0} y2={width} stroke="#DDD" />
            <line x1={width} y1={0} x2={width} y2={width} stroke="#DDD" />
            <line x1={0} y1={width} x2={width} y2={width} stroke="#DDD" />
            <line x1="0" y1="0" x2={width} y2={width} stroke="#DDD" />
            <line x1={width} y1="0" x2="0" y2={width} stroke="#DDD" />
            <line x1={width/2} y1="0" x2={width/2} y2={width} stroke="#DDD" />
            <line x1="0" y1={width/2} x2={width} y2={width/2} stroke="#DDD" />
          </svg>
        );
    }
  }
  render() {
    const {width} = this.styleConfig
    return <div style={{width:width+'px',height:width+'px'}}>{this.bgRender(this.type)}</div>;
  }
}
