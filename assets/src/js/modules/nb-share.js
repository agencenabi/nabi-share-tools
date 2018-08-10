;nb_share = (function($) {


	/**
	 * INITIALISE
	 * ----------
	 *
	 * @return {undefined}
	 */
	(function init() {
		nb_shareBtn();
	})();


	/**
	 * SHARE BUTTON
	 * ----------
	 *
	 */
	function nb_shareBtn() {

		Share={
			// Facebook Share
/*
			facebook:function(purl,ptitle,pimg,text) {
				url='http://www.facebook.com/sharer.php?s=100';
				url+='&p[title]='+encodeURIComponent(ptitle);
				url+='&p[summary]='+encodeURIComponent(text);
				url+='&p[url]='+encodeURIComponent(purl);
				Share.popup(url);
			},
*/
			// Twitter Share
			twitter:function(purl,ptitle){
				url='http://twitter.com/share?';
				url+='text='+encodeURIComponent(ptitle);
				url+='&url='+encodeURIComponent(purl);
				url+='&counturl='+encodeURIComponent(purl);
				Share.popup(url);
			},
			// Linkedin Share
			linkedin:function(purl,ptitle){
				url='http://www.linkedin.com/shareArticle?mini=true';
				url+='text='+encodeURIComponent(ptitle);
				url+='&url='+encodeURIComponent(purl);
				url+='&counturl='+encodeURIComponent(purl);
				Share.popup(url);
			},
			// Share popup
			// can be used for other social sharing, like G+ in this exemple.
			popup:function(url){
				window.open(url,'','toolbar=0,status=0,width=626, height=436');
			}
		};

		// On Hover
		$('.nb__shareBtn').mouseenter( function() {
			$('.nb_shareOver').fadeIn();
		});

		$('.nb__shareBtn').mouseleave( function() {
			$('.nb_shareOver').fadeOut();
		});

	}

	/*
		Return public methods
	 */
	return {
		nb_shareBtn : nb_shareBtn,
	}

})(jQuery);