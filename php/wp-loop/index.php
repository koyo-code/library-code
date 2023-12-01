<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>wp-loop</title>
</head>
<body>
<?php if ( have_posts() ) : ?>
    <?php while( have_posts() ) : the_post(); ?>
        <?php
        // wordpressの時刻設定で出力
        the_time( get_option( 'date_format' ) );
        // 投稿のタイトルの出力
        the_title();
        // 投稿のカテゴリーの出力
        $category = get_the_category()[0];
        echo get_cat_name($category->term_id);
        // 投稿のパーマリンクの出力
        the_permalink();
        // 投稿のコンテンツの出力
        the_content();
        ?>
    <?php endwhile;?>
<?php endif; ?>
</body>
</html>