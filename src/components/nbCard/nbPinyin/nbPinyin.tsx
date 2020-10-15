import { Component, h, Prop, State, Watch, Element } from '@stencil/core';
import { PinyinStyle } from '../../global';

@Component({
  tag: 'nb-pinyin',
  styleUrls: ['nbPinyin.scss'],
})
export class NbPinyin {
  @Prop() styleConfig: PinyinStyle;
  @Prop() pinyinList: any = [];
  @Prop() mediaList: Array<string> = [];
  @State() currentPinyin: string;
  @State() currentPinyinIndex: number;
  @Watch('pinyinList')
  watchPinyinList(value: any) {
    console.log(value);
    this.currentPinyin = value[0];
    this.currentPinyinIndex = 0
  }
  @Element() ele: HTMLElement;
  play(){
    const url = this.mediaList[this.currentPinyinIndex]
    const mp3 = new Audio(url)
    mp3.play()
  }
  render() {
    const { width } = this.styleConfig;
    const height = width / 3;
    return (
      <div>
        <div style={{ width: width + 'px', height: height + 'px', margin: '0 auto', position: 'relative' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} class="fontBg">
            <line x1={0} y1={0} x2={width} y2={0} stroke="#4f9aff" />
            <line x1={0} y1={height / 3} x2={width} y2={height / 3} stroke="#DDD" />
            <line x1={0} y1={(height / 3) * 2} x2={width} y2={(height / 3) * 2} stroke="#DDD" />
            <line x1={0} y1={height} x2={width} y2={height} stroke="#4f9aff" />
            <line x1={0} y1={0} x2={0} y2={height} stroke="#4f9aff" />
            <line x1={width} y1={0} x2={width} y2={height} stroke="#4f9aff" />
          </svg>
          <div
            class="pinyin"
            style={{
              width: width + 'px',
              height: height + 'px',
              lineHeight: width * 0.28 + 'px',
              fontSize: width * 0.24 + 'px',
            }}
          >
            {this.currentPinyin}
          </div>
          <select
            onChange={e => {
              const tg: any = e.target;
              this.currentPinyin = this.pinyinList[tg.selectedIndex];
              this.currentPinyinIndex = tg.selectedIndex
            }}
            id="pinyinSelect"
            style={{ position: 'absolute', left: width + 'px', top: '0px', width: '100px', height: '30px' }}
          >
            {this.pinyinList.map(item => (
              <option class="pinyinOption" value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            style={{ position: 'absolute', left: width + 'px', top: '30px', width:'80px', height: '30px' }}
              onClick={()=>{
                this.play()
              }}
          >播放声音</button>
        </div>
      </div>
    );
  }
}
