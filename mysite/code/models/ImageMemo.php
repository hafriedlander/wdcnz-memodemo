<?php

/**
 * An ImageMemo is a single image we want to remember
 */
class ImageMemo extends Memo {
	static $db = array(
	);

	static $has_one = array(
		'Image' => 'Image'
	);

	static $default_fields = array('ImageURL');

	function getImageURL() {
		return $this->Image->URL;
	}
}