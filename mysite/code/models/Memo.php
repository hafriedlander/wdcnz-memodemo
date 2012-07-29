<?php

/**
 * A Memo is a single piece of information we want to remember
 */
class Memo extends DataObject {
	use RESTItem;

	static $db = array(
		'Title' => 'Varchar(255)',
		'Tags' => 'Text'
	);

	static $default_fields = array('ID', 'Created', 'Title', 'Tags');
	static $default_write_fields = array('Title', 'Tags');

	function getID() {
		return $this->getField('ID');
	}
}

class Memo_Handler extends RESTItem_Handler {
	static $allowed_actions = array('GET', 'PUT');

	/**
	 * Gets a memo item
	 *
	 * @responds-with 200
	 *   The memo is returned in the body
	 *   @fields *
	 */
	function GET($request) {
		return $this->respondWith('*');
	}

	/**
	 * Updates a memo item
	 *
	 * @responds-with 200
	 *   The memo is updated. The memo is returned in the body
	 *   @fields *
	 */
	function PUT($request) {
		$this->parseRequest(array(
			'noun' => $this->failover
		));
		$this->write();

		return $this->respondWith('*');
	}
}

class Memos extends ViewableData {
	use RESTCollection;

	/**
	 * Get all Memos
	 * @return [Memo]
	 */
	function getItems() {
		return Memo::get()->toArray();
	}

	/**
	 * Get a specific Memp
	 * @return Memo
	 */
	function getItem($id) {
		return Memo::get()->byID($id);
	}
}

class Memos_handler extends RESTCollection_Handler {
	static $allowed_actions = array('GET', 'POST');

	/**
	 * Gets all memo items
	 *
	 * @responds-with 200
	 *   @as Memos
	 *   @fields *
	 */
	function GET($request) {
		return $this->respondWith('Items.*');
	}

	/**
	 * Creates a new memo item
	 *
	 * @responds-with 201
	 *   @as Memo
	 *   @fields *
	 */
	function POST($request) {
		$noun = $this->parseRequest(array(
			'defaulttype' => 'Memo'
		));
		$noun->write();

		$this->markAsNested($noun);

		return $this->respondAs(array(
			'noun' => $noun,
			'code' => 201,
			'location' => $noun->Link()
		));
	}

}