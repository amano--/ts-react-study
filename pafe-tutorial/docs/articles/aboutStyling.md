# React の スタイリング

[ Reactのコンポーネントのスタイリングをどうやるか ](https://qiita.com/lightnet328/items/218eb1c4a347302cc340)


## 前提

## 公式チュートリアルが罠


2021年3月 現在では、Reactで作るコンポーネントは FunctionComponent が基本になっているのだが、公式のチュートリアルが ClassComponent でかかれれているのがなかなかの罠です。

FunctionComponent の基本形は以下の通り

```ts
// 慣習として Component の 属性の型は xxxProps と命名することが多い  
type ColorProps = { color: string ,text:string}

// FC は React.FunctionComponent のショートハンド
const ColorElement: React.FC<ColorProps> = (props) => (
  // <> は <React.Fragment> のショートハンド
  <>
    <p style={ { background:props.color } }> { props.text } </p>
    { props.children }
  </>
)
```

Reactでは よく使われるものにショートハンドが用意されていますが、初学者にとっては謎の記述の上検索しづらく引っかかりやすい部分のため説明しておきます。
<> は <React.Fragment> のショートハンド

が


// FC (FunctionComponentのショートハンド) 定義の基本形。
// React.FC の 型引数は必ずつける。

//  JSX.IntrinsicElements の説明
//
// Props の型の説明
//   <form action="xxx.php" method="post"/>
//    ↓
//   props = {action:"",method:"post"}
//
// 複数タグは return できないことの説明

const ChildNode: React.FC = () => <p>I am child.</p>


```ts
// node_modules/@types/react/index.d.ts

type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}

```

```ts
```

```ts
```

```ts
```

 ユーザ定義のコンポーネントの名前は大文字で始めること [ React 公式 / JSX を深く理解する ]( https://ja.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized )

JSX.IntrinsicElements の説明

```ts
//
//  
JSX.IntrinsicElements の説明
//
// Props の型の説明
//   <form action="xxx.php" method="post"/>
//    ↓
//   props = {action:"",method:"post"}
//
// 複数タグは return できないことの説明

const Hoge: React.VFC = () => <></>

export type RedProps = { red: string }
// FC (FunctionComponentのショートハンド) 定義の基本形。
// React.FC の 型引数は必ずつける。
const RedNode: React.VFC<RedProps> = (props) => (
  // <> は <React.Fragment> のショートハンド
  <>
    <p> I am {props.red} </p>
    <Hoge>aa</Hoge>
    {props.children}
  </>
)

```


```ts
```

```ts
```

```ts
```

```ts
```
