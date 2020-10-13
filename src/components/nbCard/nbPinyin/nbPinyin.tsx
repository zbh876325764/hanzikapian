import { Component, h, Prop } from '@stencil/core';
import {PinyinStyle} from '../../global'

@Component({
  tag: 'nb-pinyin',
  styleUrls:['nbPinyin.scss']
})
export class NbPinyin {
  @Prop() styleConfig:PinyinStyle

  componentWillLoad(){
  }
  componentDidLoad(){

  }
  render() {
    const {width,height} = this.styleConfig
    return (
      <div style={{width:width+'px',height:height+'px',margin:'0 auto',background:'#ccc'}}>

      </div>
    );
  }
}
