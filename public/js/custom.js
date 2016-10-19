/**
 * Created by User pc on 10/17/2016.
 */

(function ($) {
    var tableREnder = function (table, settings) {
        if (!table.length) return;
        var url = table.attr('data-target-url');
        $.get(
            url,
            function (response) {
                var trOfHeading = $('<tr>');
                settings.forEach(function (item) {
                    var th = $('<th>');
                    if(item.sortable){
                        th.addClass('sortable ' +  item.name);
                    }
                    th.text(item.displayName);
                    trOfHeading.append(th);
                    table.find('thead').append(trOfHeading);
                });
                response.forEach(function (responseItem) {
                    var tr = $('<tr>') , td;
                    settings.forEach(function (item) {
                         td = $('<td>');
                        tr.append(td.text(responseItem[item.name]));
                    });
                    table.find('tbody').append(tr);
                });
            }
        ).fail(function(args , args2 , args3){
            // console.log('fails');
            // console.log(args);
            // console.log(args2);
            // console.log(args3);
        }).done(function(args , args2 , args3){
            // console.log('done');
            // console.log(args);
            // console.log(args2);
            // console.log(args3);
        }).always(function(args , args2 , args3){
            // console.log('always');
            // console.log(args);
            // console.log(args2);
            // console.log(args3);
        });
    };

    $(window).bind('load', function () {
        var gridTable = $('.build-grid-js');
        tableREnder(gridTable, [
            {
                name: 'id',
                sortable: true,
                displayName: 'ID'
            },
            {
                name: 'name',
                sortable: false,
                displayName: 'Name'
            },
            {
                name: 'email',
                sortable: true,
                displayName: 'Email'
            }
        ]);
    });
})(jQuery);