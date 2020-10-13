export interface StyleConfig {
  hanzi:HanziStyle,
  pinyin:PinyinStyle
}

export interface HanziStyle{
  width?: number;
  height?: number;
  padding?:number;
}
export interface PinyinStyle{
  width?: number;
  height?: number;
}
