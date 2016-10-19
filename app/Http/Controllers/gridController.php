<?php

namespace App\Http\Controllers;

use App\griddata;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Database\Eloquent\Model;

class gridController extends Controller
{
    public function getgrid(){
        return view('grid');
    }
    public function  getData(){
        return User::all();;
    }
}
