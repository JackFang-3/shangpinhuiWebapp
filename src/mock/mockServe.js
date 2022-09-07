// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据引入进来【json数据没有对外暴露，但可以引入进来】
// webpack默认对外暴露的，图片，json数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock 数据：第一个参数地址 第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})//模拟首页大轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})