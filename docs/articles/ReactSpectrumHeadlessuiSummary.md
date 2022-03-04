# (※工事中) 2021/5 ReactSpectrum headlessui material-ui コードリーディング雑感 

## コンポーネントライブラリについての雑感

最近気になっている、コンポーネントライブラリのコードリーディング及び雑感をまとめます。
そもそも、コンポーネントライブラリってなんやねん、って話だと思うのですが、デザインが予めされている、React、Vue 等のFW用の Component集のことです。他の呼び方で、デザインシステムとか呼ばれることもあるのでややこしいですが、ここではコンポーネントライブラリで統一していきます。

React界隈で一番有名なコンポーネントライブラリは、おそらく [ material-ui ](https://github.com/mui-org/material-ui) だと思います。ただこのライブラリは歴史が古いだけあってコードがJSで書かれていて、統一感がなくコードを読んでいても、古くて読みにくいです。

仕事で使っているので仕方なく読むことはあるのですが、やっぱり型情報がないと、理解しにくい、読みにくいことは否めません。率直に言って学びはあまりないライブラリです。

他には [ React UIコンポーネントライブラリ ](https://qiita.com/mikan3rd/items/b9ac6125b1f14175677e#react-ui%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA) [ react-component-libraries ](https://github.com/enaqx/awesome-react#react-component-libraries) 等結構な数のライブラリがありますが、どれも 50歩100歩なのであえて選ぶことはないと思います。

というのも Hooks という破壊的イノベーションとも呼べる仕様が 2019/4 に Reactに組み込まれたわけですが、これが Reactのコーディング方法を根本的に変えてしまったため、これ以前のライブラリと、これ以後のライブラリでは、Hooks対応、最適化に対して根本的な違いがあったりします。
なので 殆どのライブラリは Hooks以前なので見た目以外の大差はないのです。

Hooks以後で 個人的に注目、学びがありそうと思っているライブラリが Adobe が 2020/7頃 にリアーキテキングした [ React Spectrum ](https://github.com/adobe/react-spectrum) もう一つが 最近 tailwind labs が出した [ headlessui ](https://headlessui.dev/) 

#### 【 参考情報 】

- [ React Spectrum ](https://github.com/adobe/react-spectrum) 
  - [ Adobe Design System の React Spectrum を理解していく ~ Part 1 概要~ ](https://zenn.dev/sakito/articles/608e0d5753d2ee4c3e69)

- [ headlessui ](https://headlessui.dev/) 
  - [Headless Component開発をはじめよう (Headless UI + React Spectrum)](https://zenn.dev/matamatanot/articles/7572dccafbc96d)


## headlessui レビューメモ

https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/components/label/label.tsx#L79
```ts
let DEFAULT_LABEL_TAG = 'label' as const
```

ってなってるけど、これは、

```ts
const DEFAULT_LABEL_TAG = 'label'
```

って書けばよいだけだと思うのだが違うんだろうか。てか、let って const が実装されてから非推奨的な扱いだと認識してるんだけど違うのかしら? react spectrum でも、基本 let で書かれているので、認識が揺らぎ始めているｗ

1コンポーネント、1Context な実装に見える。どういう設計思想に基づいてそうしたのかが気になる。

[ここらへん](https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/components/menu/menu.tsx#L74) Reducer 周りのコードが結構結構トリッキーに感じた。enumとインデックスシグネイチャの組み合わせで型安全に、ってとこなのだろうか。普通に Tagged union で switch case の方が読みやすいのではないか、と感じた。 

[ 単体テスト ]( https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/components/menu/menu.test.tsx ) があるのはいいけど、やっぱりUIの単体テストは理解しづらいなと感じる。Storybook+スナップショットテスト(storyshots) がある方が、使う側の理解はしやすいと思った

… 続く



Hooks以後で 個人的に注目、学びがありそうと思っているライブラリが Adobe が 2020/7頃 にリアーキテキングした [ 

マイクとカメラが上手くつながらないので、テキストで自己紹介失礼します。TypeScript + React でフロントエンド開発をしております。最近興味があるのが React Spectrum と 最近 tailwind labs が出した [ headlessui ](https://headlessui.dev/)  です。ここらへんのフレームワークのコードリーディングとかしてます。よろしくおねがいします
