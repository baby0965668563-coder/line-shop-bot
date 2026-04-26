require('dotenv').config();

const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const event = req.body.events[0];

    if (!event || event.type !== 'message' || event.message.type !== 'text') {
      return res.sendStatus(200);
    }

    const text = event.message.text;

    let replyText = '';

    if (text.includes('大耳狗')) {
      replyText = '🛍️ 大耳狗喜拿玩偶\n💰 $590\n👉 現貨供應中';
    } else if (text.includes('庫洛米')) {
      replyText = '🛍️ 庫洛米抱枕\n💰 $680\n👉 預購中';
    } else if (text === '下單') {
      replyText = '請輸入：姓名 / 商品 / 數量';
    } else {
      replyText = '請輸入商品名稱，例如：大耳狗、庫洛米';
    }

    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(200);
  }
});

app.get('/', (req, res) => {
  res.send('LINE Bot 運作中');
});

app.listen(3001, () => {
  console.log('LINE 賣場客服 Bot 啟動中，Port: 3001');
});
