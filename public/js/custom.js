/**
 * Created by User pc on 10/17/2016.
 */
(function ($) {
    $(window).bind('load', function () {
        var gridTable = $('.table-wrapper');
        var gridTable2 = $('.table-wrapper2');
        var gridTable3 = $('.table-wrapper3');
        var gridTable4 = $('.table-wrapper4');
        var table1 =  new buildTable(gridTable, [
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

        var table2 =  new buildTable(gridTable2, [
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

        var table3 =  new buildTable(gridTable3, [
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
        var table4 =  new buildTable(gridTable4, [
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
            rows: 10,
            paginationContainer: 'paginationWrapper',//class name to handle pagination
        });
        table1.renderThisTable();
        table2.renderThisTable();
        table3.renderThisTable();
        table4.renderThisTable();
    });


})(jQuery);

var buildTable = function (tableWrapper, settings, apiSettings) {
    this.tableWrapper = tableWrapper;
    this.tableSettings = settings;
    this.tableApiSettings = apiSettings;
    this.table = $('<table>', {'class': 'table table-bordered table-hover table-responsive js-data-table'});
    this.tableHead = $('<thead>');
    this.tableBody = $('<tbody>');
    this.paginateRender = true;
    this.paginateCurrent = 1;
    this.paginationWrapper = apiSettings.paginationContainer ?
        $('<div>', {class: apiSettings.paginationContainer}) : $('<div>', {class: 'paginationWrapper'});

    this.table.appendTo(this.tableWrapper);
    this.tableHead.appendTo(this.table);
    this.tableBody.appendTo(this.table);
    this.paginationWrapper.appendTo(this.tableWrapper);


    this.buildTableHead = function ($this) {
        var trOfHeading = $('<tr>');
        $this.tableSettings.forEach(function (item) {
            var th = $('<th>');
            if (item.sortable) {
                th.addClass('sortable ');
                th.attr('data-sort-target', item.name);
            }
            th.text(item.displayName);
            trOfHeading.append(th);
        });
        $this.tableHead.append(trOfHeading);
        $this.sortingTigger(this);
    };

    this.buildTableRows = function (tableData) {
        var tRows = [];
        $this = this;
        tableSettings = this.tableSettings;
        tableData.forEach(function (responseItem) {
            var tr = '<tr>', td = '';
            tableSettings.forEach(function (item) {
                td += '<td>' + escapeHtml(responseItem[item.name]) + '</td>';
            });
            tr += td + '</tr>';
            tRows.push(tr);
        });
        $this.tableBody.html(tRows.join());
    };

    this.buildPagination = function (total, perPage) {
        var ul = '<ul class="pagination">';
        var li = '';
        for (var i = 1; i <= Math.ceil(total / perPage); i++) {
            var classActive = $this.paginateCurrent == i ? 'active' : '';
            li += '<li class="' + classActive + '"><a href="#' + i + '">' + i + '</a></li>';
        }
        ul += li + '</ul>';
        this.paginationWrapper.html(ul);
        this.paginationFire(this);
    };

    this.generateTableData = function ($this) {
        data = {};
        if ($this.tableApiSettings.rows) {
            data.rows = $this.tableApiSettings.rows;
        }

        data.page = $this.paginateCurrent;

        if ($this.tableApiSettings.orderBy) {
            data.orderBy = $this.tableApiSettings.orderBy;
        }
        if ($this.tableApiSettings.orderType) {
            data.orderType = $this.tableApiSettings.orderType;
        }
        var url = $this.tableApiSettings.url;
        var getData = $.get(url, data);
        getData.fail(function(e){
            $($this.tableWrapper).html('<p class="alert-warning">'+e.statusText+'</p>');
            $($this.tableWrapper).removeClass('loading');
        });
        getData.then(function (data) {
            $this.buildTableHead($this);
            $this.buildTableRows(data.data);
            if ($this.paginateRender) {
                $this.buildPagination(data.total, data.per_page);
            }
            $($this.tableWrapper).removeClass('loading');
        });
    };

    this.paginationFire = function ($this) {
        $('.pagination li a', $this.paginationWrapper).on('click', function (e) {
            e.preventDefault();
            $this_paginate_item = $(this);
            $('.active', $this.paginationWrapper).removeClass('active');
            $this_paginate_item.parent().addClass('active');
            $this.paginateRender = false;
            $this.paginateCurrent = $this_paginate_item.html();
            $this.generateTableData($this);
        });
    };

    this.sortingTigger = function ($this) {
        $('.sortable', $this.tableHead).on('click', function () {
            var thisElement = $(this);

            $('.sortable', $this.table).not(this).removeClass('asc')
                .removeClass('desc')
                .removeAttr('data-sort-type');

            thisElement.hasClass('asc') ?
                thisElement.addClass('desc').removeClass('asc').attr('data-sort-type', 'desc') :
                thisElement.addClass('asc').removeClass('desc').attr('data-sort-type', 'asc');
            $('.active', $this.paginationWrapper).removeClass('active');
            $('.pagination li:first-child', $this.paginationWrapper).addClass('active');
            $this.tableApiSettings.orderBy = thisElement.attr('data-sort-target');
            $this.tableApiSettings.orderType = thisElement.attr('data-sort-type');
            $this.paginateRender = false;
            $this.paginateCurrent = 1;
            $this.generateTableData($this);
        });
    };

    this.renderThisTable = function () {
        this.generateTableData(this);
    }
};

function escapeHtml(text) {
    'use strict';
    text = text.toString();
    return text.replace(/[\"&<>]/g, function (a) {
        return {'"': '$quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}[a];
    });
}