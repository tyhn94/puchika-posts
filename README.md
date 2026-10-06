# Puchika · Instagram otomatik paylaşım

Bu depo Puchi & Chika gönderilerini her gün kendiliğinden Instagram'a yükler.

- **queue.json**: sıradaki gönderiler (sırayla, günde bir tane; saat ayarı `timesUTC`, 15 = Türkiye saatiyle 18:00).
- **media/**: gönderilerin görselleri ve videoları.
- **bot/post.mjs**: paylaşımı yapan program (GitHub Actions her saat çalıştırır).
- **state/**: bot'un notları: neyin paylaşıldığı, takipçi ve beğeni sayıları. Elle değiştirme.

Bir şey ters giderse ya da içerik azalırsa bot bu depoda bir **Issue** açar ve GitHub sana e-posta atar.

Elle denemek için: **Actions → Puchika → Run workflow**
- `check`: sadece bağlantıyı kontrol eder
- `post-now`: sıradaki gönderiyi hemen paylaşır
