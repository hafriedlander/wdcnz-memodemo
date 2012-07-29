<?php

class MemoAdmin extends ModelAdmin {
	public static $managed_models = array('Memo', 'ImageMemo', 'TextMemo');

	public static $url_segment = 'memo-admin';

	public static $menu_title = 'Memo Admin';
}