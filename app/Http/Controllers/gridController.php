<?php

namespace App\Http\Controllers;

use App\griddata;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

use App\Http\Requests;
use Illuminate\Database\Eloquent\Model;

class gridController extends Controller
{
    public function getgrid()
    {
        return view('grid');
    }

    public function getData(Request $s)
    {
        $paginate = isset($_GET['rows']) && !empty($_GET['rows']) ? $_GET['rows'] : 200;
        if($s->get('orderBy') && $s->get('orderType')){
            return User::orderBy($s->get('orderBy') , $s->get('orderType'))->paginate($paginate);
        }
        return User::paginate($paginate);
    }
}
