# Puchika · Instagram otomatik paylaşım

Bu depo Puchi & Chika gönderilerini kendiliğinden çizer ve Instagram'a yükler.

- **gen/posts.js**: bütün gönderiler (hikâyeler, meme'ler, yazılar) ve paylaşım saatleri (`SETTINGS.timesUTC`; 13, 18, 23 = Türkiye saatiyle 16:00, 21:00, 02:00). Yeni içerik = bu dosyanın yenisi.
- **gen/engine.html**: Puchika'nın piksel motoru ve sesleri; gönderileri bununla çizer.
- **bot/render.mjs**: sıradaki gönderileri birkaç gün önceden çizer (`media/` klasörüne).
- **bot/post.mjs**: paylaşımı yapar, Instagram bağlantısını canlı tutar.
- **queue.json, media/, state/**: bot kendisi yazar. Elle değiştirme.

Bir şey ters giderse ya da içerik azalırsa bot bu depoda bir **Issue** açar ve GitHub sana e-posta atar.

Elle denemek için: **Actions → Puchika → Run workflow**
- `check`: sadece kontrol eder
- `post-now`: sıradaki gönderiyi hemen paylaşır
