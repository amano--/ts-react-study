# Java or C# プログラマが React + Typescript で心を折られないために事前に知っておいたほうが良いこと

## 前提

筆者は基本Javaのサーバーサイドエンジニアなのだが、縁あってこの一年フロントエンドにガッツリ関わるようになり、フロントエンドのアーキテクティングをどのようにしたらよいか、
を試行錯誤してきた。

React + Typescript のプログラミングでは、Java等オブジェクト指向ベースでの言語のプログラマが引っかかりやすい点、理解しにくい点が結構あるのだが、それを理解できるようになるには結構いろいろな資料を読む必要があるのですが、そこらへんがうまくまとまった適切な資料が僕の観測範囲ではありませんでした。そのため、新人教育等に必要なこともあって、自分なりに要点をこの記事にまとめました。

筆者はフロントエンド専門家ではないし、技術者レベルも高くはないので、適当なことを書き散らしている可能性があるので、適当に読んでもらえると幸いです。

## Structural Subtyping(構造的部分型)(TypeScript) と Nominal Subtyping(公称的部分型)(Java等) 違いを理解する

- 参考になるサイト
  - [ TypeScript: 異なる2つの型システム「公称型」と「構造的部分型」 ]( https://qiita.com/suin/items/52cf80021361168f6b0e )
  - [ Typescript の Structural Subtyping ] (https://qiita.com/tell-k/items/1a93acbb42e39377cd48)

以下の型は Java ( Nominal Subtyping ) では別の型だが、Structural Subtyping 目線では同じとみなされる。

```java

interface Foo {
  String foo(int a);
}

interface Bar {
  String foo(int a);
}

```

以下は通る。

```java
Foo foo = new Foo() {
    public String foo(int a) {
        return "foo";
    }
};
```

以下は Java ( Nominal Subtyping ) では当然コンパイルエラーになる。しかし、Structural Subtyping 目線では同じとみなされる。
なぜなら、foo メソッドの引数の型と戻り値の型が同じだからだ。

```java

Foo foo2 = new Bar() {
    public String foo(int a) {
        return "bar";
    }
};
```

Typescript (以下、TSと略記) で 同様の定義をしてみる。まずは関数部分のみに着目した定義。

```typescript
type Foo = (a:number) => string
type Bar = (a:number) => string

const hoge = (a:number) => {return "hoge"}  
// 略記法を使えば const hoge = (a:number) => "hoge"  とも書ける 

const foo:Foo = hoge
const bar:Bar = hoge

const foo2:Foo = bar

```

Java等のクラス記法に寄せて、再度定義してみる。

```typescript
type Foo = {foo : (a:number) => string}
type Bar = {foo : (a:number) => string}

// Javaでいうと 無名クラスのインスタンスを生成しているイメージ
const hoge = { foo : (a:number) => {return "hoge"}}  

const foo:Foo = hoge
const bar:Bar = hoge

// Bar型とFoo型はクラス構造が同じなので bar インスタンスをFoo型変数に代入できます。
const foo2:Foo = bar

```

さらに Java っぽく書いてみましょう。ちなみにこの書き方は個人的に非推奨です。理由は後で説明します

```typescript
interface Foo2 {
  foo(a:number):string
}

class Foo2Impl implements Foo2 {
  foo(a:number):string{
    return "Foo3"
  }
}

// Foo2型 を実装(継承)している Foo2Implクラスは、Foo型とクラス構造が同じなので代入できます。
const foo3:Foo = new Foo2Impl()
```

少しだけTSの文法に触れておきます。[const](https://typescript-jp.gitbook.io/deep-dive/future-javascript/const) は Java だと final と同等と思ってもらえれば、理解しやすいと思う。再代入不可の変数の定義をするときに使うキーワード。ちなみに 代入可能な変数の定義のキーワードは [ let ](https://typescript-jp.gitbook.io/deep-dive/future-javascript/let) ですが、ほぼ使う必要がありません。というよりは、非推奨に近い扱いなので、このキーワードを頻出するプログラムはよくないプログラムといえます。なるべく const で定義するようにしてみてください。

本格的に Typescript を勉強したい場合は [ 仕事ですぐに使える TypeScript ]( https://future-architect.github.io/typescript-guide/typescript-guide.pdf )
が一番参考になるかと思うのでぜひ読んでみてください。

現在の TS は Structural Subtyping(構造的部分型)(TypeScript) と Nominal Subtyping(公称的部分型) が混在している結構複雑な言語なのですが言語なのですが、なぜそうなったのかは歴史的経緯によるので、次はTSの歴史について簡単に触れていこうと思います。

## Typescriptの歴史を簡単に振り返る

Typescriptに関する詳しい歴史的経緯については [ TypeScript誕生の背景 ]( https://book.yyts.org/overview/before-typescript ) を参照してもらうとして、ここでは簡単に触れます。

Typescript の作者は C#の作者と同じ [アンダース・ヘルスバーグ](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%82%B9%E3%83%BB%E3%83%98%E3%83%AB%E3%82%B9%E3%83%90%E3%83%BC%E3%82%B0) です。つまり Typescript の初期(2014年)は とても C# っぽかった。それがJavaScriptの仕様 [ ECMAScript(エクマスクリプト) - jsprimer ](https://jsprimer.net/basic/ecmascript/) が、2015年(ES5)辺りからいい感じバージョンアップされるようになったので、Typescript の文法を ECMAScript に寄せるようになった。そのため 次期 ECMAScript で取り入れられる文法が先行して Typescript に取り入れられるなど、ECMAScriptのスーパセットと言う側面がつよくなっていきました。現在の Typescript は、C#からは離れ、ECMAScript に型システムを付加したものに変わったといえると思います。

また、関数型言語の流行りもあり、それら言語の特徴である Structural Subtyping の機能も Typescript に取り入れられるようになりました。そのため、現在では Structural Subtyping機能 と Nominal Subtyping機能  が混在した言語になっています。
## Nominal Subtyping のキーワード(予約語) はなるべく使わないようにする

なぜ Typescriptの歴史に触れたのかといえば、C# 由来の Nominal Subtyping用キーワード( class interface enum namespace )は、後方互換のため残されているものであって、現在のTSでは積極的に使うようなものではなくなっていることを強調したいからです。明確に言われることがあまりないのですが、今の Typescript ではこれらキーワードをつかわなくても書けます。というより使ってはいけない、と言っても良いでしょう。特にReactのコードを書くならなおさらです。

Reactの登場時(2013年) も、最初のコンポーネントの作り方は classベース、つまり Nominal Subtyping で作る方法でしたが、現在では Functional Component (FCと略される) と呼ばれる関数を作る方法に変化しています。React でも、classベースの作り方は後方互換のために残されているだけで、今使うべきは FC になっています。

が、ここで一つの罠があります。[ 公式のチュートリアル ](https://ja.reactjs.org/tutorial/tutorial.html) が、classベース で書かれているのです。現在では全くとは言いませんが、ほぼ役に立たない知識なのでやる価値は無いと思うのでお勧めしません。

## JavaScript(値の世界) と Typescript(型の世界) の世界は明確に別れていることを理解する

詳しくは以下を参照
- [ TypeScriptの宣言空間とその不満 ]( https://teppeis.hatenablog.com/entry/2014/04/typescript-declaration-spaces )
- [ 宣言空間 - TypeScript Deep Dive 日本語版 ]( https://typescript-jp.gitbook.io/deep-dive/project/declarationspaces )
- [ こわくないTypeScript〜Mapped TypeもConditional Typeも使いこなせ〜 ]( https://blog.uhy.ooo/entry/2020-08-31/dont-fear-ts/#%E5%9E%8B%E5%AE%9A%E7%BE%A9%E3%81%AF%E3%83%AD%E3%82%B8%E3%83%83%E3%82%AF%E3%81%A7%E3%81%82%E3%82%8B )

Java だと以下のように リフレクションAPIを通じて、クラス名からインスタンスを生成したり、インスタンスからクラス情報を取得できます。

```java
//クラス名からインスタンスを生成できる。
Class c = Class.forName("hoge.MyClass");

//インスタンスからクラス情報を取得できる。
Something target = new Something();
Class<Something> clazz = target.getClass(); 
```

少し言い換えると、クラス名(型の世界)からインスタンス(値の世界)を生成できる、つまり値の世界と型の世界はリフレクションAPIを通じてつながっていて、行き来できるといえるでしょう。それが可能なのはコンパイル後のバイトコードに型情報が埋め込まれているからです。

TSではどうでしょうか? よく知られている通りTSはJSにトランスパイルされます。Javaで例えるならバイトコードにあたるのがJSといえるので、JSに型情報が埋め込まれない限り値の世界と型の世界は行き来できません。つまり通常だとTS→JS トランスパイル時に [ 型消去 (type erasure) ]( https://ja.wikipedia.org/wiki/%E5%9E%8B%E6%B6%88%E5%8E%BB ) されるので、値の世界と型の世界はほぼ完全に別れています。つまり Javaのように リフレクションAPI を使ったコードが書けません。

それを TS で実現したい場合は [ reflect-metadata ]( https://github.com/rbuckton/reflect-metadata ) のようなライブラリーを使ってトランスパイル時に、値の世界(JS)に型情報を埋め込む必要がありますが、これもデコレーターという昔から話し合っているけど、いつ決まるのかもよくわからない仕様に依存しているため、現状積極的につかえる状態ではありません。

参考 [ TypeScriptによるデコレータの基礎と実践 ]( https://qiita.com/taqm/items/4bfd26dfa1f9610128bc ) [ Decorators ]( https://www.typescriptlang.org/docs/handbook/decorators.html )

型の世界と値の世界の境界をあまり意識しない Java の世界から来るとここらへんの境界の明確さに結構戸惑うので、型の世界と値の世界が別れていることを意識しながらTSコードを読んだり実装したりすると、いろいろなことに気がつくようになると思います。

たとえば以下のようなコードはエラーになりますが、型の世界と値の世界が別れていることを理解していないと意味が理解できないはずです。

```ts
// 値の世界(=JS にトランスパイルされる) への宣言
const hoge = ""

// 以下のコードは  「 'hoge' は値を参照していますが、ここでは型として使用されています。'typeof hoge' を意図していましたか?ts(2749) 」 というエラーになる
// type キーワードは 型の世界(=JSにトランスパイルされない)への宣言なので、値の世界を直接設定できない。そのため値の世界から typeof キーワードで 型情報を抽出する必要がある。
type Fuga = hoge

```

時々この手の謎のエラーに遭遇しますが、型の世界から、型情報が消去された値の世界(トランスパイル語のJSの世界)を参照しようとしていることが原因なので、型の世界(TS)と値の世界(JS) が分離されていることが理解できれば、謎のエラーへの対応もできるようになると思います。

次は、TSに限らないのですが、TSの 関数型言語的な機能部分を理解しようとすると、代数的データ型(ADT) という謎の概念に遭遇するのでそれについて簡単に触れていこうと思います。
## 代数的データ型(ADT) という謎の概念

TSに限らないのですが 関数型言語の勉強をすすめていくと、代数的データ型(ADT) という謎概念に遭遇します。調べていくうちに「代数的データ型というものの明確な定義はない」的な説明を見つけたりしてびっくりしたりするのだが、どうやらふわっとしたコンセンサスがなんとなくあるふわっとしたキーワードのようだ。「オブジェクト指向言語」とかの「オブジェクト」的な言葉と理解したｗ 

参考 [TypeScriptで学ぶ代数的データ型](https://zenn.dev/eagle/articles/ts-coproduct-introduction)

なので、とある勉強会で「代数的データ型(ADT)とはなんですか?」 と質問してみたところ

「簡単にいうと、データ型を代数的に扱えるということ。代数的とは データ型を足したり、かけたりできるということ」

と、個人的に非常に理解のすすむアドバイスを頂きました。

TS の学習を進めていくと [ Intersection型（交差型） ](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#intersection%E5%9E%8B%E4%BA%A4%E5%B7%AE%E5%9E%8B) や [ Union型（合併型） ](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#union%E5%9E%8B%E5%90%88%E4%BD%B5%E5%9E%8B) などの謎の型に遭遇します。そうこうしていくうちに [ Conditional Types ](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#conditional-types) などどいう 童貞を殺す型とかに遭遇し心を折られたりします。

今思えばこれらの型をJavaでいう標準クラスの Collection,List,Map のようなものだと理解しようとしていたから混乱していたのだとわかるのですが、その頃は Nominal脳だったためそういう理解しかできませんでした。

「TSでは 型も計算して算出します」

ということに気がつけば、Intersection型（交差型）を算出するために 型と型を掛け算するための演算子が 「＆」 で Union型（合併型）を算出するために、型と型を足し算するための演算子が「 | 」なだけ、ということがわかってきます。

## 型の世界には型を対象とした演算子がある


```java

class Parent {
  private String parent
}

class Child extends Parent {
  private String child
}

```

```ts
type Parent = { parent:string }

type Child = Parent & { child:string }
```


[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()


[ TypeScriptにおける型計算の基本 ]( https://qiita.com/recordare/items/58745ef66dd9162e4559 )

[ Typescript -型と関数とクラスとインターフェース- ]( https://www.mushroom-blog.com/371/)
[  ]( )
[  ]( )
[  ]( )
[  ]( )
[  ]( )
[  ]( )
[  ]( )
[  ]( )


型も演算対象であることに気がつく

型には型の演算子がある

## Nominal Subtyping のコードを Structural Subtyping で書き直す方法

```ts
interface MyClass {
  foo(a:number):string
}

class MyClassImpl implements MyClass {
  foo(a:number):string{
    return "MyClassImpl"
  }

}

const instance:MyClass = new MyClassImpl()
```

```typescript
type MyClass = {foo : (a:number) => string}

const instance:MyClass = { foo : (a:number) => {return "MyClassImpl"}} 
```

const MyClass:MyClass = { foo : (a:number) => {return "MyClassImpl"}} 


ちません。 

 が

始まったのですが

や、


、ここらへん明確にしておいたほうが良いと思ったので

か


Structural Subtyping(TypeScript) と Nominal Subtyping(C#) 違いを理解する


```typescript
type Foo = {foo : (a:number) => string}
```

同じ構造に Foo と Bar という <b>別名</b>([type alias](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases))  をつけているので、相互に代入可能なのは当たり前では有るのですが、Nominal脳のままだとちょっと理解に時間がかかる部分だと思う。

Nominal Subtyping だと、クラス名とクラス構造(データ構造と言っても良いかもしれない) が 1対1 なので、クラス名の数だけクラス構造が存在すると言えるが、
Structural Subtyping だと、一つのクラス構造 に対して複数の <b>別名</b> がつくという 1対多 の関係になっている。

ここらへんの違いへの理解が Nominal脳 の人が Structural Subtyping の言語をうまく扱えるようになるための重要なポイントだと個人的に思っている。

[ 集合の代数学 ]( https://ja.wikipedia.org/wiki/%E9%9B%86%E5%90%88%E3%81%AE%E4%BB%A3%E6%95%B0%E5%AD%A6 )

```


```typescript
interface Foo2 {
  foo(a:number):string
}

class Foo2Impl implements Foo2 {
  foo(a:number):string{
    return "Foo3"
  }

}

const foo3:Foo = new Foo2Impl()
```



- Nominal Subtyping    -> 代入できない。 
- Structural Subtyping -> 代入できる。引数と戻り値の型が同じなので、同じ型とみなされる
名前は一つ



## クラス名を捨てる

## = (イコール記号) の意味が違うことに気づく

## 継承関係は 包含関係([部分集合](https://ja.wikipedia.org/wiki/%E9%83%A8%E5%88%86%E9%9B%86%E5%90%88)) へ変わる


## Nominal Subtyping  -> Structural Subtyping 対比表

| Nominal Subtyping | Structural Subtyping  | 備考 | |
| --- | --- | ---  | ---  |
| interface | type |  |
| enum | Union型 or tagged Union| 
| namespace |  | 
| class | const Hoge = {hoge:string} |  |

## 公式チュートリアルが罠


# Java or C# プログラマが React + Typescript で心を折られないために事前に知っておいたほうが良いこと


## クラス名を捨てろ

## 名前を捨てろ

## 公式チュートリアルが罠