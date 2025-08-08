
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Замените на ваши реальные значения
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;


app.use(cors());
app.use(bodyParser.json());

app.post('/send-data', async (req, res) => {
  const { name, activity, date } = req.body;

  const message = `
📝 Новая заявка:
👤 Имя: ${name}
🏄 Активность: ${activity}
⏰ Время: ${date}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: ADMIN_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Ошибка отправки:', err.message);
    res.status(500).json({ error: 'Не удалось отправить сообщение' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
