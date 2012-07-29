<?php

/**
 * A TextMemo is a single image we want to remember
 */
class TextMemo extends Memo {
	static $db = array(
		'Note' => 'Text'
	);

	static $default_fields = array('Note');
	static $default_write_fields = array('Note');
}