;nb_sharingTools = (function($) {

	/**
	 * Update
	 * ----------
	 *
	 */
	function update() {
		inlineSvg.inlineAllsvg();
		nb_like.nb_likeBtn();
		nb_like.nb_likePlurial();
		nb_share.nb_shareBtn();
		nb_print.nb_printBtn();
	}

	/*
		Return public methods
	 */
	return {
		update : update,
	}

})(jQuery);