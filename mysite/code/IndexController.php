<?php

class IndexController extends Controller {

	function index() {
		Requirements::combine_files('memo.js', array(
			// Base jquery & jquery entwine
			THIRDPARTY_DIR . '/jquery/jquery.js',
			// JSON library
			THIRDPARTY_DIR . '/json-js/json2.js',

			// Model
			'mysite/javascript/thirdparty/underscore.js',
			'mysite/javascript/thirdparty/backbone.js',
			// Controller
			THIRDPARTY_DIR . '/jquery-entwine/dist/jquery.entwine-dist.js',
			// View
			'mysite/javascript/thirdparty/showdown.js',

			// Application
			'mysite/javascript/models.js',
			'mysite/javascript/application.js'
		));

		return $this->renderWith(array('Page'));
	}
}