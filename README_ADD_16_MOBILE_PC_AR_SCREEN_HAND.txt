ADD_16 改訂内容
================

対象: three_scene/main.js, three_scene/index.html, three_scene/project-video-safe.css

1. スマホ動画再生対策
------------------
- nativeProjectVideo の <source> を直接複数並べる方式をやめ、JS側でsrcを1つだけ選ぶ方式に変更。
- projectmovie1_mobile.mp4 が存在する場合だけ、スマホでそれを優先。
- projectmovie1_mobile.mp4 が無い場合は、projectmovie1.mp4を直接使用。
- ネイティブ再生画面に「動画を直接開く / Open video directly」リンクを追加。

推奨スマホ用変換:
ffmpeg -i projectmovie1.mp4 -vf "scale=854:480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -profile:v baseline -level 3.1 -pix_fmt yuv420p -preset medium -crf 26 -c:a aac -b:a 128k -movflags +faststart projectmovie1_mobile.mp4

重要:
スマホで「could not be played」が出る場合、HTML/JSではなくMP4の中身のコーデック/プロファイル/ピクセル形式が端末非対応の可能性が高いです。
特に iPhone / Android で安全なのは H.264 baseline/main + AAC + yuv420p + faststart です。

2. PC Web上のthree.js動画黒画面対策
--------------------------------
- WebGL用の <video id="oceanVideo"> を完全に画面外/背面に追いやりすぎないように変更。
- 再生開始時に THREE.VideoTexture を再生成するように変更。
- requestVideoFrameCallback が使えるブラウザでは、動画フレームごとにテクスチャ更新を明示。

3. three.jsスクリーンサイズ
--------------------------
- 854:480 の映像比率を基準に、約2倍の 17.08 x 9.60 に変更。
- 既存の高位置・下向き配置は維持。

4. ARスクリーン
--------------
- AR内スクリーンを縦横4倍に拡大。
- ARスクリーンの高さを約2倍に変更。
- AR内の透明ヒットターゲットと操作ボタンも拡大。

5. VRコントローラー移動
---------------------
- 左コントローラー並進移動を、右スティックで回転したXRリグの向き基準に変更。
- ワールド座標固定っぽいズレを避けるため、移動方向は player.rotation.y から毎フレーム再計算。

6. 手モデル
----------
- 近未来グローブ風から、より自然な人型の手シルエットに変更。
- 球関節感・ロボット感を減らし、掌・指・親指の比率を人の手に近づけました。
- トリガー時の握り動作は維持。
