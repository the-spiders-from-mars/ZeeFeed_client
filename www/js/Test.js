/**
 * Created by duocai on 2017/5/7.
 */

var str = 'width="960"drt3453453453';
console.log(str.replace(new RegExp('width=\\"(\d{0,})\\"',"gm"), "width=\"100%\""));
