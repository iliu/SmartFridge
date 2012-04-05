/**
 * @title dragdrop.js
 * @author liuisaac
 *
 */

$(function() {
	$dialog = $('#hidden_dialog');
	$dialog.dialog({
		autoOpen : false,
		draggable : false,
		resizable : false,
		modal : true
	}).bind('clickoutside', function(e) {
		$target = $(e.target);
		$dialog.dialog('close');
		return false;
	});

	$('#opener').click(function() {
		$dialog.dialog('open');
		// prevent the default action, e.g., following a link
		return false;
	});

	$("li", "#storage").draggable({
		revert : "invalid", // when not dropped, the item will revert back to its initial position
		containment : "#main",
		scroll : false,
		helper : 'clone',
		appendTo : 'body'
	});
	$storage = $("#storage");
	$storage.droppable({
		accept : "#staple li",
		activeClass : "active_overlay",
		hoverClass : "hover_overlay",
		drop : function(event, ui) {
			deleteItem(ui.draggable);
			return false
		}
	});
	$trash = $("#trash");
	$trash.droppable({
		accept : "li",
		activeClass : "active_overlay",
		hoverClass : "hover_overlay",
		drop : function(event, ui) {
			deleteItem(ui.draggable);
			return false;
		}
	});

	$("#staple").carouFredSel({
		prev : '#staple_prev',
		next : '#staple_next',
		auto : false,
		circular : false,
		infinite : false,
	}).find("li").click(function() {
	$(this).animate({
		opacity 	: 0
	}, 500).animate({
		width		: 0,
		margin		: 0,
		borderWidth	: 0
	}, 500, function() {
		$("#staple").trigger("removeItem", $(this));
	}); });
	
	
	$("staple").sortable();
	
	$list = $("#list");
	$list.droppable({
		accept : "li",
		activeClass : "active_overlay",
		hoverClass : "hover_overlay",
		drop : function(event, ui) {
			addItem(ui.draggable);
			return false;
		}
	});

});
function deleteItem($item) {
	$item.fadeOut(function() {
		$item.remove();
	});
}

function addItem($item) {
	$item.effect('highlight').effect('bounce');
	// $item.remove();
}

function addStaple(){
	$("#staple").trigger("insertItem", ["<li></li>", 0, true, 0]);
}
