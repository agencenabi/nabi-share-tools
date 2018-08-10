/*
  PRINT
  ------
  Print the page on the button click
 */


;nb_print = (function($) {


	/**
	 * INITIALISE
	 * ----------
	 *
	 * @return {undefined}
	 */
	(function init() {
		nb_printBtn();
	})();


	/**
	 * PRINT BUTTON
	 * ----------
	 *
	 */
	function nb_printBtn() {
		$('#nbPrint').click(function(){
		     window.print();
		});
	}


	/*
		Return public methods
	 */
	return {
		nb_printBtn : nb_printBtn,
	}

})(jQuery);
