/**
 * @title dragdrop.js
 * @author liuisaac
 *
 */

$(function() {
	
	$('#itemalert').buttonset();
	$('#staplealert').buttonset();
	$('#listalert').buttonset();
	$( "#exp_date" ).datepicker();
	$( "#quantity_bar" ).progressbar({
		value: 68,
	});

	
	$('#main-bare').css('backgroundPosition', '33px 28px');
	
	$("#staple_list").sortable();
	$( "#staple_list" ).disableSelection();

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
		buttons : {
			Close : function() {
				$(this).dialog("close");
			},
			Edit : function() {
				$(this).dialog("close");
			}
			
		}
	});
	$add_dialog = $('#add_dialog');
	$add_dialog.dialog({
		autoOpen : false,
		resizable : false,
		maxHeight : 300, 
		minWidth : 800,
		modal : false,
		position: 'top',		
	});

	$('#add_button').click(function() {
		$add_dialog.dialog('open');
		$('#add_dialog input').blur();
		// prevent the default action, e.g., following a link
		return false;
	});
	
	$('#add_button_alt').click(function() {
		$add_dialog.dialog('open');
		$('#add_dialog input').blur();
		// prevent the default action, e.g., following a link
		return false;
	});	
	
	$alerts_dialog = $('#alerts_list');
	$alerts_dialog.dialog({
		autoOpen : false,
		draggable : false,
		resizable : false,
		minWidth : 400,
		modal : true,
		buttons : {
			Close : function() {
				$(this).dialog("close");
			}
		}
	});
	$('#alert_button').click(function() {
		$alerts_dialog.dialog('open');
		$('#alerts_list input').blur();
		// prevent the default action, e.g., following a link
		return false;
	});
	
	$('#alert_button_alt').click(function() {
		$alerts_dialog.dialog('open');
		$('#alerts_list input').blur();
		// prevent the default action, e.g., following a link
		return false;
	});

	
	$shop_dialog = $('#shopping_list');
	$shop_dialog.dialog({
		autoOpen : false,
		draggable : false,
		resizable : false,
		modal : true,
		buttons : {
			Save : function() {
				$(this).dialog("close");
			},
			Email : function() {
				$(this).dialog("close");
			},
			SMS : function() {
				$(this).dialog("close");
			}
		}
	});
	// .bind('clickoutside', function(e) {
		// $target = $(e.target);
		// $shop_dialog.dialog('close');
		// return false;
	// });
	$('#list_button').click(function() {
		$shop_dialog.dialog('open');
		$('button').blur();
		// prevent the default action, e.g., following a link
		return false;
	});
	$('#list_button_alt').click(function() {
		$shop_dialog.dialog('open');
		$('button').blur();
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
	
	$("li", "#add_dialog").draggable({
		revert : "invalid", // when not dropped, the item will revert back to its initial position
		containment : "#main",
		scroll : false,
		helper : 'clone',
		appendTo: '#bottom',
		zIndex: 2700, 
		
	});
	
	$trash = $("#trash");
	$trash.droppable({
		accept : "#storage li",
		activeClass : "trash_active",
		hoverClass : "trash_hover",
		drop : function(event, ui) {
			deleteStorage(ui.draggable);
			return false;
		}
	});
	
	$("#shelf").droppable({
		accept : "#add_dialog li",
		activeClass : "active_overlay",
		hoverClass : "hover_overlay",
		drop : function(event, ui) {
			addItemtoStorage(ui.draggable);
			toggleAlert("added item")
			return false;
		}
	});
	
	$list = $("#list");
	$list.droppable({
		accept : "#storage li",
		activeClass : "list_active",
		hoverClass : "list_hover",
		drop : function(event, ui) {
			addToShopping(ui.draggable);
			return false;
		}
	});

	// $("#staple .anchor a").click(function() {
		// stapleToStorage($(this));
	// });
	// $("#storage .anchor a").click(function() {
		// storageToStaple($(this));
	// });
});

function toggleAlert($text){
	$("#alert").children("span").html($text);
	$("#alert").fadeIn(1000, function() {
		$("#alert").delay(500).fadeOut(1000);
	});
}

function storageToStaple($this) {
	
	$this.attr("onclick", "stapleToStorage($(this))");
	$this.children("span").removeClass('ui-icon-unlocked').addClass('ui-icon-locked');
	$item = $this.parent().parent().parent();
	$add = $item.clone();
	$item.fadeOut(1000, function() {
		addStaple($add);
		$('#shelf').jScrollPane({
			showArrows : true,
		});
	});
}

function stapleToStorage($this) {
	$this.attr("onclick", "storageToStaple($(this))");
	$this.children("span").removeClass('ui-icon-locked').addClass('ui-icon-unlocked');
	$item = $this.parent().parent().parent();
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
	toggleAlert("Item added to shopping list")
}

function deleteStorage($item) {
	$item.fadeOut(1000, function() {
		$item.remove();
		$('#shelf').jScrollPane({
			showArrows : true,
		})
	});
	toggleAlert("Item removed")
}

function addItemtoStorage($item) {
	$add = $item.clone();
	var unlocked = $('<span />').addClass('ui-icon').addClass('ui-icon-unlocked');
	var viewicon = $('<span />').addClass('ui-icon').addClass('ui-icon-zoomin');
	var unlocklink = $('<a />').attr('href', '#').attr('onclick', 'storageToStaple($(this))').append(unlocked);
	var viewlink = $('<a />').attr('href', '#').attr('onclick', 'openItem()').append(viewicon);	
	var viewdiv = $('<div />').addClass('view').append(viewlink);
	var anchordiv = $('<div />').addClass('anchor').append(unlocklink);
	var toolbar = $('<div />').addClass('toolbar').append(anchordiv).append(viewdiv);
	$add.append(toolbar);
	addStorage($add);
}


function addStaple($item) {
	$("#staple_list").trigger("insertItem", [$item.fadeIn(1000), 0, true, 0]);
	$("#staple_list").trigger("slideToPage", 0);
	$("#staple_list").sortable();
}

function addStorage($item) {
	$item.fadeIn(1000).prependTo($("#storage"));
	$('#shelf').jScrollPane({
		showArrows : true,
	}).data('jsp').scrollToPercentY(0);

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
	$('button').blur();
	// prevent the default action, e.g., following a link
	return false;
}