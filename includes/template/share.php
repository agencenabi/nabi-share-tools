<?php
/**
 * The template for displaying the Share Button
 *
 * @package WordPress
 * @subpackage nbst
 * @since nbst 1.2
 */
 $post = get_post();
 $pageUrl = 'https://' . $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
 $pageTitle = get_the_title();
 $pageDescription = "";
 $pageThumbnail = get_the_post_thumbnail_url($post->ID, 'full');

?>

<div class="nb__shareBtn">

	<?php if (in_array('dropdown', $display)) {  // If display parameter is dropdown ?>
		<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/share-icon.svg" alt="<?php _e('Partager cette page', 'nabi'); ?>" />
		<span class="nb__shareLabel"><?php _e('Partager', 'nabi'); ?></span>
		<div class="nb_shareOver">
	<?php } if (in_array('list', $display)) {  // If display parameter is list ?>
		<div class="nb_shareList">
	<?php }  if (in_array('icons', $display)) {  // If display parameter is icons ?>
		<div class="nb_shareIcons">
	<?php } ?>

		<!-- Facebook -->
		<a onclick="Share.popup('https://www.facebook.com/sharer/sharer.php?u=<?php echo $pageUrl; ?>')">
			<div class="facebook_share">
				<?php if (in_array('list', $display)) {  // If display parameter is list ?>
					<?php _e( 'Facebook', 'nabi' ); ?>
				<?php } else { ?>
					<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/facebook.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> <?php _e( 'Facebook', 'nabi' ); ?>">
				<?php } ?>
			</div>
		</a>

		<!-- Twitter -->
		<a onclick="Share.twitter(
			'<?php $url= the_permalink(); echo $url; ?>',
			'<?php the_title(); ?> '
			)">
			<div class="twitter_share">
				<?php if (in_array('list', $display)) {  // If display parameter is list ?>
					<?php _e( 'Twitter', 'nabi' ); ?>
				<?php } else { ?>
					<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/twitter.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> <?php _e( 'Twitter', 'nabi' ); ?>">
				<?php } ?>
			</div>
		</a>

		<!-- LinkedIn -->
		<a onclick="Share.linkedin(
			'<?php echo $pageUrl; ?>',
			'<?php bloginfo('name'); ?>'
		)">
			<div class="linkedin_share">
				<?php if (in_array('list', $display)) {  // If display parameter is list ?>
					<?php _e( 'LinkedIn', 'nabi' ); ?>
				<?php } else { ?>
					<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/linkedin.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> <?php _e( 'LinkedIn', 'nabi' ); ?>">
				<?php } ?>
			</div>
		</a>

		<!-- Pinterest -->
		<a onclick="Share.popup('http://pinterest.com/pin/create/link/?url=<?php echo $pageUrl; ?>&media=<?php echo $pageThumbnail; ?>&description=<?php echo $pageDescription; ?>')">
			<div class="pinterest_share">
				<?php if (in_array('list', $display)) {  // If display parameter is list ?>
					<?php _e( 'Pinterest', 'nabi' ); ?>
				<?php } else { ?>
					<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/pinterest.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> <?php _e( 'Pinterest', 'nabi' ); ?>">
				<?php } ?>
			</div>
		</a>

	</div>

</div>
