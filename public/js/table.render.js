var buildTable = function (tableWrapper, settings, apiSettings) {

    this.tableWrapper = tableWrapper;
    this.tableSettings = settings;
    this.tableApiSettings = apiSettings;
    this.paginateRender = true;
    this.paginateCurrent = 1;
    this.paginationWrapper = apiSettings.paginationContainer ? apiSettings.paginationContainer : 'paginationWrapper';

    nunjucks.configure({autoescape: true});

    this.generateTableData = function ($this) {
        var data = {};
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

        getData.fail(function (e) {
            $($this.tableWrapper).html('<p class="alert-warning">' + e.statusText + '</p>');
            $($this.tableWrapper).removeClass('loading');
        });

        getData.then(function (data) {
            if ($this.paginateRender) {

                var template = nunjucks.render('../template/table.html', {
                    tHeads: $this.tableSettings,
                    tRows: data.data
                });
                var pagination = nunjucks.render('../template/table.pagination.html', {
                    perPage: Math.ceil(data.total / data.per_page),
                    paginationClass: $this.paginationWrapper
                });
                $this.tableWrapper.html(template);
                $this.tableWrapper.append(pagination);
                $this.sortingTigger($this);
                $this.paginationFire($this);
                $($this.tableWrapper).removeClass('loading');

            } else {

                var tableRows = nunjucks.render('../template/tablerows.html', {
                    tHeads: $this.tableSettings,
                    tRows: data.data
                });
                $this.tableWrapper.find('tbody').html(tableRows);

            }
            $this.paginateRender = false;
        });
    };

    this.paginationFire = function ($this) {

        $('.pagination li a', $this.tableWrapper).on('click', function (e) {
            e.preventDefault();
            $this_paginate_item = $(this);
            $('.active', $this.tableWrapper).removeClass('active');
            $this_paginate_item.parent().addClass('active');
            $this.paginateRender = false;
            $this.paginateCurrent = $this_paginate_item.html();
            $this.generateTableData($this);
        });

    };

    this.sortingTigger = function ($this) {

        $('.sortable', $this.tableWrapper).on('click', function () {
            var thisElement = $(this);

            $('.sortable', $this.table).not(this).removeClass('asc')
                .removeClass('desc')
                .removeAttr('data-sort-type');

            thisElement.hasClass('asc') ?
                thisElement.addClass('desc').removeClass('asc').attr('data-sort-type', 'desc') :
                thisElement.addClass('asc').removeClass('desc').attr('data-sort-type', 'asc');
            $('.active', $this.tableWrapper).removeClass('active');
            $('.pagination li:first-child', $this.tableWrapper).addClass('active');
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