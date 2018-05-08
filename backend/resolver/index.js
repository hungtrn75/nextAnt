var User = require('./user')
var Board = require('./board')
//var UploadRes require( './FileResolver')
var { merge } = require("lodash")

let OutIndex = merge(User, Board);
let AllResolve = [OutIndex.Query, OutIndex.Mutation];

//let AllResolve = [OutIndex.Query];
//console.log(AllResolve)
module.exports = AllResolve