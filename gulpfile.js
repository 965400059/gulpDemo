var gulp 		= require('gulp');
var	sass 		= require('gulp-sass');//sass编译
var	browserSync = require('browser-sync').create();//创建服务器
var	reload      = browserSync.reload;//实时刷新
var	notify 		= require('gulp-notify');//提示
var	concat		= require('gulp-concat');//合并
var	cleanCss	= require('gulp-clean-css');//css压缩
var	rev			= require('gulp-rev');//版本管理
var	revCollector= require('gulp-rev-collector');//版本管理
var runSequence = require('run-sequence');//流的执行顺序
var del 		= require('del');//删除文件
var base64 		= require('gulp-base64');//图片转编码
var fs			= require('fs');//判断文件是否存在，node的方法
var imagemin	= require('gulp-imagemin');//图片压缩
var spriter		= require('gulp-css-spriter');//雪碧图
var uglify		= require('gulp-uglify');//js压缩
var babel		= require('gulp-babel');//es6转es5
var changed		= require('gulp-changed');//判断页面是否改动
var rename		= require('gulp-rename');//重命名

//js编码转换，合并，改名，压缩
gulp.task('js',function () {
	return	gulp.src(['./src/js/jquery.js','./src/js/packageMethod.js','./src/js/myLinkage.js','./src/js/jquery.tmpl.min.js',
					'./src/js/jquery.jqGrid.src.js','./src/js/grid.locale-cn.js',
					'./src/js/bootstrap.min.js','./src/js/bootstrapValidator.js',
					'./src/js/echarts.min.js','./src/js/china.js',
					'./src/js/layer.js','./src/js/WdatePicker.js'])
				.pipe(concat('libs.js'))
				.pipe(uglify())
				.pipe(rename({suffix:'.min'}))
				.pipe(gulp.dest('./dist/js'))
})

//sass编译，合并，图片转编码，雪碧图，压缩css，版本控制，实时刷新
gulp.task('sass',function(){
	return	gulp.src('./src/css/index.scss')
				.pipe(sass())
				.pipe(concat('index.css'))
				.pipe(base64({
					maxImageSize : 8*1024
				}))
				.pipe(spriter({
					'spriteSheet':'./dist/img/spriteSheet.png',
					'pathToSpriteSheetFromCSS' : '../img/spriteSheet.png'
				}))
				.pipe(cleanCss())
				.pipe(rev())
				.pipe(gulp.dest('./dist/css'))
				.pipe(notify("完成了sass编译 [<%= file.relative %>]"))
				.pipe(rev.manifest())
				.pipe(gulp.dest('./dist/rev'))
				.pipe(reload({stream:true}))
				.pipe(notify("生成版本配置文件 [<%= file.relative %>]"));
})

gulp.task('css',function () {
	gulp.src(['./src/css/bootstrap.min.css','./src/css/sb-admin.css','./src/css/bootstrapValidator.css',
			'./src/css/font-awesome.min.css','./src/css/morris.css','./src/css/mapPoi.css','./src/css/layer.css',
			'./src/css/ui.jqgrid.css','./src/css/jquery-ui-1.8.16.custom.css','./src/css/master.css','./src/css/WdatePicker.css'])
		.pipe(concat('style.css'))
		.pipe(cleanCss())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('./dist/css'))
})

//图片，判断是否改动，压缩，
gulp.task('img',function () {
	return	 gulp.src('./src/img/*.*')
				.pipe(changed('./src/img',{extension:'*.*'}))
				.pipe(imagemin())
				.pipe(gulp.dest('./dist/img'))
				.pipe(notify("完成了图片的移动"))
})

//html，判断版本是否变动，更改页面的css对应版本
gulp.task('html',function () {
	fs.exists('./dist/rev/rev-manifest.json',function(data){
		if(data){
			return	gulp.src(['./dist/rev/*.json','./index.html'])
						.pipe(revCollector())
						.pipe(gulp.dest('./dist/'))
						.pipe(reload({stream:true}))
						.pipe(notify("完成了html修改 [<%= file.relative %>]"));
		}else{
			runSequence('html');
		}
	})
})

//删除dist文件内容
gulp.task('clean', function() {
    	return del(['dist/*'])
    });

//服务器，执行流，创建服务器，添加文件监听
gulp.task('server', function() {
	runSequence('clean','img','js','sass','html')
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        port : '8888'
    });
    
    gulp.watch('./src/js/*.js',['js']);
    gulp.watch('./src/css/*.scss',['img','sass','html']);
    gulp.watch('./*.html',['html']);
});

//默认执行流
gulp.task('default',['server'])
