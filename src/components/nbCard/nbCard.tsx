import { Component, Prop, h, State, Watch } from '@stencil/core';
import { StyleConfig } from '../global';
import pinyin from 'pinyin'
@Component({
  tag: 'nb-card',
  styleUrls: ['nbCard.scss'],
})
export class NbCard {
  @Prop() name: string;
  @Prop({ mutable: true }) config: string;
  @State() styleConfig: StyleConfig = { hanzi: {}, pinyin: {} };

  @Watch('config')
  watchConfig(value:string) {
    this.styleConfig = JSON.parse(value);
  }
  initPinyin(word:string){
     return new Promise(function(resolve, reject) {
      setTimeout(() => {
        const res = pinyin(word)
        resolve(res);
      }, 500);
    });
  }
  componentWillLoad() {
    this.watchConfig(this.config);
    this.initPinyin('钟').then(res=>{
      console.log(res);
    })
  }
  componentDidLoad() {
    const { hanzi } = this.styleConfig;
    const { width, height, padding } = hanzi;
    (window as any).HanziWriter.create('character-root', '我', {
      width: width || 100,
      height: height || 100,
      padding: padding || 5,
    });
  }
  render() {
    const { hanzi, pinyin } = this.styleConfig;
    return (
      <div 
      id="root" 
      style={{ width: Math.max(hanzi.width,pinyin.width)+'px', height: pinyin.height+hanzi.height + 'px' }}
      >
        <nb-pinyin styleConfig={pinyin}></nb-pinyin>
        <font-bg insertId="character-root" type={1} styleConfig={hanzi}></font-bg>
      </div>
    );
  }
}
