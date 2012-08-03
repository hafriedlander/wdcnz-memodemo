<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Memos</title>

		<% base_tag %>

		<link href="mysite/css/reset.css" rel="stylesheet" type="text/css" />
		<link href="mysite/css/application.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<% if Form %>
			$Content
			$Form
		<% else %>
			<div id="space">
				<div id="panel">
					<div id="scroll">
						<ul id="memos"></ul>
					</div>
				</div>
			</div>
		<% end_if %>
	</body>
</html>