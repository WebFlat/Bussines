jQuery(function($){
    'use strict';
    
    //show del btn service***************************
    $('.dashboard__del-item').click(function() {
        $('.dashboard__del-service').show();
    })
    //hide del btn service***********************
	$(document).mouseup(function (e) {
        var container = $(".dashboard__item");
        if (container.has(e.target).length === 0){
            $('.dashboard__del-service').hide();
        }
    });



    //shoe-hide text services*************************
    $('.dashboard__service-show').click(function() {
        $(this).toggleClass('rotate');
        $(this).parent().siblings().toggleClass('show');
    })
    
    
    //get value date input****************************
    $('.profile__input--date').change(function() {
		var data = $('.profile__input--date').val();
		$('.profile__inp-date').val(data);
    });
    

    //active input to type*********************************
    $('.profile__edit').click(function() {
        $('.profile__input').removeAttr('disabled');
    })

    //delete file upload***********************
    $('.add-task__file-del').click(function() {
        $(this).parent().hide();
    }) 

});



