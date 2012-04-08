/**
 * @title dragdrop.js
 * @author liuisaac
 *
 */

$(function() {

	$("#staple_list").carouFredSel({
		prev : '#staple_prev',
		next : '#staple_next',
		auto : false,
		circular : false,
		infinite : false,
	});

	$('#shelf').jScrollPane({
		showArrows : true,
	});
	
	
	$item_dialog = $('#item_dialog');
	$item_dialog.dialog({
		autoOpen : false,
		draggable : false,
		resizable : false,
		modal : true,
	});
	
	$add_dialog = $('#add_dialog');
	$add_dialog.dialog({
		autoOpen : false,
		draggable : false,
		resizable : false,
		minHeight : 650,
		minWidth : 550,
		modal : true
	});
	
	$('#add_button').click(function() {
		$add_dialog.dialog('open');
		// prevent the default action, e.g., following a link
		return false;
	});
	$alerts_dialog = $('#alerts_list');
	$alerts_dialog.dialog({
		autoOpen : false,
		draggable : false,
		resizable : false,
		minHeight : 650,
		minWidth : 550,
		modal : true,
	});
	$('#alert_button').click(function() {
		$alerts_dialog.dialog('open');
		// prevent the default action, e.g., following a link
		return false;
	});
	$shop_dialog = $('#shopping_list');
	$shop_dialog.dialog({
		autoOpen : false,
		draggable : false,
		resizable : false,
		minHeight : 600,
		minWidth : 550,
		modal : true
	}).bind('clickoutside', function(e) {
		$target = $(e.target);
		$shop_dialog.dialog('close');
		return false;
	});
	$('#list_button').click(function() {
		$shop_dialog.dialog('open');
		// prevent the default action, e.g., following a link
		return false;
	});

	$("li", "#storage").draggable({
		revert : "invalid", // when not dropped, the item will revert back to its initial position
		containment : "#main",
		scroll : false,
		helper : 'clone',
		appendTo : '#bottom',
	});
		
	$trash = $("#trash");
	$trash.droppable({
		accept : "li",
		activeClass : "trash_active",
		hoverClass : "trash_hover",
		drop : function(event, ui) {
			deleteStorage(ui.draggable);
			return false;
		}
	});
	$list = $("#list");
	$list.droppable({
		accept : "li",
		activeClass : "list_active",
		hoverClass : "list_hover",
		drop : function(event, ui) {
			addToShopping(ui.draggable);
			return false;
		}
	});

	$("#staple .anchor a").click(function() {
		$item = $(this).parent().parent().parent();
		stapleToStorage($item);
	});
		
	$("#storage .anchor a").click(function() {
		$item = $(this).parent().parent().parent(); 
		storageToStaple($item);
	});
});


function storageToStaple($item) {
	$item.fadeOut(1000, function() {
		addStaple($item);
		$('#shelf').jScrollPane({
			showArrows : true,
		});
	});
}

function stapleToStorage($item) {
	$add = $item.clone();

	$item.animate({
		opacity : 0
	}, 500).animate({
		width : 0,
		margin : 0,
		borderWidth : 0
	}, 500, function() {
		$("#staple_list").trigger("removeItem", $item);
		addStorage($add);
	});
}

function addToShopping($item) {
	$item.effect('bounce');
}

function deleteStorage($item) {
	$item.fadeOut(1000, function() {
		$item.remove();
		$('#shelf').jScrollPane({
			showArrows : true,
		})
	});
}

function addStaple($item) {
	$("#staple_list").trigger("insertItem", [$item.fadeIn(1000), 0, true, 0]);
	$("#staple_list").trigger("slideToPage", 0);
}
function addStorage($item) {	
	$item.fadeIn(1000).appendTo($("#storage"));
	$('#shelf').jScrollPane({
		showArrows : true,
	}).data('jsp').scrollToPercentY(100);

	$("li", "#storage").draggable({
		revert : "invalid", // when not dropped, the item will revert back to its initial position
		containment : "#main",
		scroll : false,
		helper : 'clone',
		appendTo : '#bottom',
	});
}

function openItem() {
	$item_dialog.dialog('open');
	// prevent the default action, e.g., following a link
	return false;
}
