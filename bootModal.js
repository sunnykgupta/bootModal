/*
 * Author: @sunnykgupta
 * URL: https://github.com/sunnykgupta/bootModal
 * Licence: MIT
 *
 * $.bootModal("Enter Title Here","Enter Body Text HERE",options);
 * options is an object like:
 * {
 *  footer -> bool //Decides if the footer is shown
 *  header -> bool //Decides if the header is shown
 *  primaryText -> string //Displayed on primary btn.
 *  secondaryText -> string // If present, secondary button is show and text is the value provided.
 *  primaryCallback -> function //Called when user clicks primary btn.
 *  secondaryCallback -> function //Called when user clicks secondary btn.
 * }
 *
 */

(function($) {

  "use strict";
  var defaultOptions = {
    footer: false,
    header: true,
    headerText:"Warning!",
    primaryCallback: $.noop,
    secondaryCallback: $.noop,
    dismissCallback: $.noop,
    validationCallback: $.noop,
    onShown: $.noop,
    onShow: $.noop,
    primaryText: "Ok",
    secondaryText: "Cancel",
    // close - will handle cross icon display + Hide on Esc key
    close : true,
    // hideOnBgClick - will handle any hide on clicking bg-overlay.
    hideOnBgClick: true
  };
  $.bootModal = function(title, body, options) {
    options = $.extend(true, {}, defaultOptions, options);

    var close = '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" class="fa fa-times close-icon"></span><span class="sr-only">Close</span></button>'
        ,backdrop = options.hideOnBgClick ? true : 'static'

    var footer = '<div class="modal-footer clearfix">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">' + options.primaryText + '</button>';
    if (options.secondaryText != ''){
        footer += '<button type="button" class="btn btn-secondary" data-dismiss="modal">' + options.secondaryText + '</button>';
    }else{
        footer += '<span class="dummy-secondary"></div>';
    }
    footer += '</div>';

    if (!options.footer)
      footer = '';

    close = options.close ? close : '';
    
    return $('<div class="modal bootModal"' + 'data-backdrop="' + backdrop + '" data-keyboard="' + options.close +'">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="border: 0">' +
             close +
            '<h4 class="modal-title heading-2">'+options.headerText+'</h4>' +
            '</div>' +
            '<div class="modal-body text-1">' +
            '<p></p>' +
            '</div>' +
            footer +
            '</div>' +
            '</div>' +
            '</div>')

            .find('.modal-title')
            .html(title).end()
            .find('.modal-body')
            .html(body).end()
            .find('.modal-footer .btn-default')
            .click( function(e){
                options.primaryCallback(e);
            $(this).closest('.modal').data('callback','primary');
            }).end()
            .find('.modal-footer .btn-secondary')
            .click( function(e){
                options.secondaryCallback(e);
            $(this).closest('.modal').data('callback','secondary');
            }).end()
            .appendTo($('body'))
            .on('show.bs.modal', options.onShow)
            .on('shown.bs.modal', function(e) {
                $('.modal-header', $(this)).css({
                    padding: '30px 15px 15px 30px'
                });
                $('.modal-body', $(this)).css({
                    padding: '15px 30px 40px 30px'
                });
                $('.modal-dialog', $(this)).css({
                    position: 'absolute',
                    left: '50%',
                    'margin-left': -$('.modal-dialog', $(this)).width()/2
                });
                $('.modal-dialog', $(this)).css({
                    top: '50%',
                    'margin-top': -$('.modal-dialog', $(this)).height()/2
                });
                $('.modal-header', $(this)).css({
                    padding: '30px 15px 15px 30px'
                });
                $('.modal-body', $(this)).css({
                    padding: '15px 30px 40px 30px'
                });
                options.onShown.apply($(this), arguments);
            })
            .modal('show')
            .on('hidden.bs.modal', function(e) {
                var callbackValue = $(this).data("callback");
                if(callbackValue != "primary" && callbackValue != "secondary"){
                    options.dismissCallback();
                }
                $(this).remove();
            })
            .on('hide.bs.modal', function(e) {
                var callbackValue = $(this).data("callback");
                if(callbackValue != "primary" && callbackValue != "secondary"){
                    options.validationCallback();
                }
            });
  };
}(jQuery));
