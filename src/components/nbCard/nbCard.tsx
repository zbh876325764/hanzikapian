import { Component, Prop, h, State, Watch } from '@stencil/core';
import { StyleConfig, CharactersStep, PinyinData, WriterConfig } from '../global';
@Component({
  tag: 'nb-card',
  styleUrls: ['nbCard.scss'],
})
export class NbCard {
  @Prop({ mutable: true }) word: string;
  @Prop({ mutable: true }) config: string;
  @State() styleConfig: StyleConfig = { hanzi: {}, pinyin: {} };
  @State() pinyinData: PinyinData = { id: '', media: [], p: '', p_heteronym: [], p_number: '', s: '' };
  @State() writer: any;
  @State() currentWord: string;
  @State() steps: CharactersStep = { total: 0, currentStep: 0 };
  @State() writerConfig: WriterConfig = { isRadicalHighlight: false, isAnimating: false, isDoing: false, isQuiz: false };
  @Watch('config')
  watchConfig(value: string) {
    const styleConfig = JSON.parse(value)
    const {pinyin,hanzi} = styleConfig
    if(pinyin.width<100){
      pinyin.width = 100
    }
    if(hanzi.width<100){
      hanzi.width = 100
    }
    this.styleConfig = JSON.parse(value);
  }
  @Watch('word')
  watchName(value: string) {
    this.initPinyin(value).then(res => {
      this.pinyinData = res;
    });
  }

  // 请求拼音数据
  async initPinyin(word: string) {
    const res = await fetch('http://localhost:1234/getpinyin?word=' + word, {
      method: 'post',
      mode: 'cors',
    });
    const data = await res.json();
    return data;
  }
  onLoadCharDataSuccess(e: any) {
    this.steps.total = e.medians.length;
    this.steps.currentStep = 0;
  }
  // 加载汉字
  renderHanzi(word: string, id: string) {
    const { hanzi } = this.styleConfig;
    const { width, strokeColor } = hanzi;
    const container = document.getElementById('character-root' + id);
    if (!container) {
      return;
    }
    if (!this.writer) {
      const self = this;
      this.writer = (window as any).HanziWriter.create('character-root' + id, word, {
        width: width || 100,
        height: width || 100,
        strokeColor: strokeColor || '#555',
        radicalColor: strokeColor,
        onLoadCharDataSuccess: this.onLoadCharDataSuccess.bind(self),
      });
    } else {
      this.writer.setCharacter(word);
    }
    this.currentWord = word;
  }
  //播放动画
  animateCharacter() {
    this.writer.animateCharacter();
  }
  // 单步动画
  animateStroke() {
    if (this.writerConfig.isDoing) {
      return;
    }
    if (this.writerConfig.isAnimating) {
      if (this.steps.currentStep + 1 === this.steps.total) {
        this.writerConfig = { ...this.writerConfig, isDoing: true };
        this.writer.animateStroke(this.steps.currentStep, {
          onComplete: () => {
            this.steps.currentStep = 0;
            this.writer.showCharacter({
              onComplete: () => {
                this.writerConfig = { ...this.writerConfig, isAnimating: false, isDoing: false };
              },
            });
          },
        });
      } else {
        this.writerConfig = { ...this.writerConfig, isDoing: true };
        this.writer.animateStroke(this.steps.currentStep, {
          onComplete: () => {
            this.steps.currentStep++;
            this.writerConfig = { ...this.writerConfig, isDoing: false };
          },
        });
      }
    } else {
      this.writer.hideCharacter({
        onComplete: () => {
          this.writerConfig = { ...this.writerConfig, isAnimating: true };
        },
      });
      this.writer.animateStroke(0, {
        onComplete: () => {
          this.steps.currentStep++;
        },
      });
    }
  }
  // 测试模式
  quiz() {
    if (!this.writerConfig.isQuiz) {
      this.writer.quiz({
        onComplete: () => {
          this.writerConfig = { ...this.writerConfig, isQuiz: false };
        },
      });
    } else {
      this.writer.cancelQuiz();
      this.writer.showCharacter();
    }
    this.writerConfig = { ...this.writerConfig, isQuiz: !this.writerConfig.isQuiz };
  }
  // 取消测试模式
  cancleQuiz() {
    this.writer.cancelQuiz();
    this.writer.showCharacter();
    this.writerConfig = { ...this.writerConfig, isQuiz: false };
  }
  // 部首高亮
  radicalHighlight() {
    const { hanzi } = this.styleConfig;
    const { strokeColor, radicalColor } = hanzi;
    if (this.writerConfig.isRadicalHighlight) {
      this.writer.updateColor('radicalColor', strokeColor || '#555', { duration: 0 });
    } else {
      this.writer.updateColor('radicalColor', radicalColor || '#168F16', { duration: 0 });
    }
    this.writerConfig = { ...this.writerConfig, isRadicalHighlight: !this.writerConfig.isRadicalHighlight };
  }
  componentWillLoad() {
    this.watchConfig(this.config);
    this.watchName(this.word);
  }
  componentDidRender() {
    const { s, id } = this.pinyinData;
    if (s && id && this.currentWord !== s) {
      this.renderHanzi(s, id);
    }
  }
  render() {
    const { hanzi, pinyin } = this.styleConfig;
    const { id, p_heteronym, media } = this.pinyinData;
    return (
      <div
        style={{
          width: Math.max(hanzi.width, pinyin.width) + 'px',
        }}
      >
        <div>
          <nb-pinyin styleConfig={pinyin} pinyinList={p_heteronym} mediaList={media}></nb-pinyin>
          <font-bg insertId={`character-root${id}`} type={1} styleConfig={hanzi}></font-bg>
          <button
            onClick={() => {
              this.cancleQuiz();
              this.animateCharacter();
            }}
          >
            连续
          </button>
          <button
            onClick={() => {
              if (this.writerConfig.isQuiz) {
                this.cancleQuiz();
              }
              this.animateStroke();
            }}
          >
            {this.writerConfig.isAnimating ? '下一步' : '分步'}
          </button>
          <button
            onClick={() => {
              this.quiz();
            }}
          >
            {this.writerConfig.isQuiz ? '演示模式' : '测试模式'}
          </button>
          <button
            onClick={() => {
              this.radicalHighlight();
            }}
          >
            {this.writerConfig.isRadicalHighlight ? '取消部首高亮' : '部首高亮'}
          </button>
        </div>
      </div>
    );
  }
}
