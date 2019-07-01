const functions = require('firebase-functions');
const {
  dialogflow,
  ImmersiveResponse
} = require('actions-on-google');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const app = dialogflow({
  debug: true
});

// TODO: Write your code here.

app.intent('Show - yes', conv => {
  conv.ask('わかりました。どの手を出しますか？グー？チョキ？それともパー？');
  conv.ask(new ImmersiveResponse({
    state: {
      scene: 'restart'
    }
  }));
});

const judgeMap = {
  rock: {
    rock: 'あいこです。',
    paper: 'あなたの負けです。',
    scissors: 'あなたの勝ちです！'
  },
  paper: {
    rock: 'あなたの勝ちです！',
    paper: 'あいこです。',
    scissors: 'あなたの負けです。'
  },
  scissors: {
    rock: 'あなたの負けです。',
    paper: 'あなたの勝ちです！',
    scissors: 'あいこです。'
  }
};

const pronoun = {
  rock: 'グー',
  scissors: 'チョキ',
  paper: 'パー'
};

app.intent('Show', (conv, param) => {
  // ユーザが出した手を取得する。
  const userChoice = param['user-choice'].toLowerCase();
  // アクションの手をランダムに決定する。
  const actionChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
  // 勝敗を示すメッセージを取得する。
  const message = judgeMap[userChoice][actionChoice];
  // SSMLを使って返事を組み立てる。
  const ssml = `
    <speak>
      <p>はい、私も何を出すか決めました。</p>
      <p>では、じゃんけんぽん！</p>
      <p>あなたは、${pronoun[userChoice]}を出しました。</p>
      <p>私は、${pronoun[actionChoice]}を出しました。</p>
      <p>${message}</p>
      <break time="400ms" />
      <p>もう一度遊びますか？</p>
    </speak>`;
  conv.ask(ssml);
  // 画面を更新するための情報を持つImmersiveResponseオブジェクト。
  conv.ask(new ImmersiveResponse({
    state: {
      scene: 'result',
      userChoice,
      actionChoice,
      message
    }
  }));
});

app.intent('Default Welcome Intent', conv => {
  conv.ask('どの手を出しますか？グー？チョキ？それともパー？');
  conv.ask(new ImmersiveResponse({
    url: `https://${firebaseConfig.projectId}.firebaseapp.com/`
  }));
});

exports.fulfillment = functions.https.onRequest(app);
