/**
 * Created by User pc on 10/17/2016.
 */
(function ($) {
    $(window).bind('load', function () {
        var gridTable = $('.table-wrapper');
        var gridTable2 = $('.table-wrapper2');
        var gridTable3 = $('.table-wrapper3');
        var gridTable4 = $('.table-wrapper4');
        var table1 = new buildTable(gridTable, [
            {
                name: 'id',
                sortable: false,
                displayName: 'ID'
            },
        ], {
            url: '/api/grid',
            rows: 10,
            paginationContainer: 'paginationWrapper',//class name to handle pagination
        });

        var table2 = new buildTable(gridTable2, [
            {
                name: 'id',
                sortable: true,
                displayName: 'ID'
            },
            {
                name: 'name',
                sortable: true,
                displayName: 'Name'
            },
        ], {
            url: '/api/grid',
            rows: 10,
            paginationContainer: 'paginationWrapper',//class name to handle pagination
        });

        var table3 = new buildTable(gridTable3, [
            {
                name: 'name',
                sortable: true,
                displayName: 'Name'
            },
            {
                name: 'email',
                sortable: true,
                displayName: 'Email'
            }
        ], {
            url: '/api/grid',
            rows: 10,
            paginationContainer: 'paginationWrapper',//class name to handle pagination
        });
        var table4 = new buildTable(gridTable4, [
            {
                name: 'id',
                sortable: true,
                displayName: 'ID'
            },
            {
                name: 'name',
                sortable: true,
                displayName: 'Name'
            },
            {
                name: 'email',
                sortable: true,
                displayName: 'Email'
            }
        ], {
            url: '/api/grid',
            rows: 20,
            paginationContainer: 'paginationWrapper',//class name to handle pagination
        });
        table1.renderThisTable();
        table2.renderThisTable();
        table3.renderThisTable();
        table4.renderThisTable();
    });


})(jQuery);