import $ from 'jquery';
$(document).ready(function(){
	$('.AgentUI__Inter-hide').click(function(){
		$('.AgentUI__live-Inter').css({'margin-left':'-19.8%','transition':'1s'});
		$('.AgentUI__Inter-hide').hide();
		$('.AgentUI__Inter-show').show();
	});
	$('.AgentUI__timeline-hide').click(function(){
		$('.AgentUI__timeline').css({'margin-right':'-80%','transition':'1s'});
		$('.AgentUI__timeline-hide').hide();
		$('.AgentUI__timeline-show').show();
	});

	$('.AgentUI__Inter-show').click(function(){
		$('.AgentUI__live-Inter').css({'margin-left':'0','transition':'1s'});
		$('.AgentUI__Inter-hide').show();
		$('.AgentUI__Inter-show').hide();
	});
	$('.AgentUI__timeline-show').click(function(){
		$('.AgentUI__timeline').css({'margin-right':'0','transition':'1s'});
		$('.AgentUI__timeline-hide').show();
		$('.AgentUI__timeline-show').hide();
	});

	// $('.AgentUI__nav-link').click(function(e){
	// 	e.preventDefault();
	// });
	$('.AgentUI__timeline-DashboardBtn').click(function(){
		$('.AgentUI__timeline-Dashboard').show();
		$('.AgentUI__timeline-Main').hide();
		$('.AgentUI__timeline-Profile').hide();
	});
	$('.AgentUI__timeline-ProfileBtn').click(function(){
		$('.AgentUI__timeline-Dashboard').hide();
		$('.AgentUI__timeline-Main').hide();
		$('.AgentUI__timeline-Profile').show();
	});
	$('.AgentUI__timeline-MainBtn').click(function(){
		$('.AgentUI__timeline-Dashboard').hide();
		$('.AgentUI__timeline-Main').show();
		$('.AgentUI__timeline-Profile').hide();
	});

	$('.AgentUI__break-btn').click(function(){
		$('.AgentUI__Break-div').fadeIn();
	});
	$('.AgentUI__Unbreak-btn').click(function(){
		$('.AgentUI__Break-div').fadeOut();
	});

	// notification dropdown js start
	$('.AgentUI__notification-div').click(function(e){
		e.stopPropagation();
	});	
	$('.AgentUI__notification-btn').click(function(e){
		$('.AgentUI__notification-div').toggle();
		$('.AgentUI__profile-div').hide();
		e.stopPropagation();
	});
	$('.AgentUI__notification-innerBtn').click(function(){
		$('.AgentUI__notification-bkBtn').fadeIn();
		$('.AgentUI__notification-list').slideDown();
		$('.AgentUI__notification-iconDiv').slideUp();
	});
	$('.AgentUI__notification-dropdown-item').click(function(){
		$('.AgentUI__notification-div').hide();
		$('.AgentUI__notification-list').hide();
		$('.AgentUI__notification-iconDiv').show();
	});
	$('.AgentUI__notification-bkBtn').click(function(){
		$('.AgentUI__notification-list').hide();
		$('.AgentUI__notification-iconDiv').show();
	});
	$('body').click(function(){
		$('.AgentUI__notification-div').hide();
		$('.AgentUI__profile-div').hide();
	});

	// notification dropdown js end

	// profile dropdown js start
	$('.AgentUI__profile-btn').click(function(e){
		$('.AgentUI__profile-div').toggle();
		$('.AgentUI__notification-div').hide();
		e.stopPropagation();
	});
	$('.AgentUI__profile-div').click(function(e){
		e.stopPropagation();
	});
	// profile dropdown js end

});