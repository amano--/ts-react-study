# このプロジェクトについて

[ typescript-nextjs-starter ](https://github.com/jpedroschmitz/typescript-nextjs-starter) をベースに以下のライブラリーを追加し構築

"husky": {
"hooks": {
"prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
"pre-commit": "lint-staged",
"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
}
},

上記プロジェクトに以下を追加

- storybook

- testing-library

- eslint-config-airbnb-typescript

- react-spectrum 関連と lodash-es

```
yarn add @adobe/react-spectrum

yarn add react-stately

yarn add react-aria

yarn add @types/lodash-es

```

[ ゼロから学ぶ ReactNative アプリ開発 ](https://zenn.dev/nekoniki/books/671f61b486f8bf/viewer/65a2ac)

```
npx react-native init mobile --template react-native-template-typescript
```

 Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd "/Users/me/dev/now/tasting/native-frourio/mobile" && npx react-native run-android
  
  Run instructions for iOS:
    • cd "/Users/me/dev/now/tasting/native-frourio/mobile" && npx react-native run-ios
    - or -
    • Open mobile/ios/mobile.xcworkspace in Xcode or run "xed -b ios"
    • Hit the Run button
    
  Run instructions for macOS:
    • See https://aka.ms/ReactNativeGuideMacOS for the latest up-to-date instructions.
    

