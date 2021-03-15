<template>
</template>
<script>
	var barcode = null; //扫描框
	var scanBarVew = null; //手电筒
	var scanBarOrc = null; //裁剪文字
	var searchInput = null; //搜索框
	export default {
		data() {
			return {
				name: '', //要在扫码界面自定义的内容
				flash: false, //是否打开闪光灯
				type: '',
				flashStyle: {
					top: '40%',
					left: '40%',
					height: '10%',
					width: '20%'
				},
			};
		},
		props: {
    /* 搜索框 placeholder*/
			inpPlaceholder: {
				type: String,
				default: "请输入商品编码/条码/名称",
			},
  	},
		methods: {
			// 初始化调用
			init(style) {
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				// plus.navigator.setFullscreen(true); //全屏
				const currentWebview = page.$getAppWebview();
				this.createBarcode(currentWebview, style); //创建二维码窗口	
				this.createView(currentWebview); //创建手电筒按钮及tips界面
				this.createOrc(currentWebview); //创建裁剪按钮
				this.createInput(currentWebview); //创建Input输入框
			},
			// 关闭扫码
			shutOff() {
				barcode.close(); //关闭扫码框
				scanBarVew.close(); //关闭手电筒
				scanBarOrc.close(); //关闭裁剪文字
				searchInput.close(); //关闭搜索框
			},
			// 扫码成功回调
			onmarked(type, result) {
				this.$emit('marked', result)
				barcode.close();
			},
			start() {
				barcode.start();
			},
			// 创建二维码窗口
			createBarcode(currentWebview, style) {
				//自定义窗口大小
				//条码类型常量数组，默认情况支持QR、EAN13、EAN8类型。 通过此参数可设置扫码识别支持的条码类型（注意：设置支持的条码类型越多，扫描识别速度可能将会降低）
				barcode = plus.barcode.create('barcode', [plus.barcode.QR, plus.barcode.EAN13, plus.barcode.EAN8, plus.barcode.DATAMATRIX,
					plus.barcode.AZTEC, plus.barcode.CODABAR, plus.barcode.ITF, plus.barcode.PDF417, plus.barcode.CODE128, plus.barcode
					.CODE128.UPCA
				], {
					top: style.top,
					left: '0',
					width: '100%',
					height: '100%', // 这里是全屏扫描框
					// height: this.fullscreen ? `calc(100% - ${style.top})`:'40%',//这里是自定义高度的扫描框
					scanbarColor: '#1DA7FF',
					position: 'static',
					frameColor: '#1DA7FF'
				});
				barcode.onmarked = this.onmarked;
				barcode.setFlash(this.flash);
				currentWebview.append(barcode);
				barcode.start();
			},
			// 创建手电筒按钮及tips
			createView(currentWebview) {
				// 创建打开手电筒的按钮
				scanBarVew = new plus.nativeObj.View('scanBarVew', {
						top: '75%',
						left: '0',
						height: '6%',
						width: '100%',
						position: 'static',
					},
					[{
							tag: 'img',
							id: 'scanBar',
							src: 'static/scanBar.png',
							position: {
								width: '6%',
								left: '46%',
								height: '70%',
								top: '0'
							}
						},
						{
							tag: 'font',
							id: 'font',
							text: '轻触照亮',
							textStyles: {
								size: '10px',
								color: '#ffffff'
							},
							position: {
								width: '80%',
								height: '50%',
								left: '9%',
								top: '60%'
							}
						}
					]);
				// backVew.interceptTouchEvent(true);
				scanBarVew.interceptTouchEvent(true);
				// currentWebview.append(content);
				currentWebview.append(scanBarVew);
				var temp = this;
				scanBarVew.addEventListener("click", (e) => { //点亮手电筒
					console.log("0000000000000")
					temp.flash = !temp.flash;
					if (temp.flash) {
						scanBarVew.draw([{
								tag: 'img',
								id: 'scanBar',
								src: 'static/yellow-scanBar.png',
								position: {
									width: '6%',
									left: '46%',
									height: '70%',
									top: '0'
								}
							},
							{
								tag: 'font',
								id: 'font',
								text: '轻触照亮',
								textStyles: {
									size: '10px',
									color: '#ffffff'
								},
								position: {
									width: '80%',
									height: '50%',
									left: '9%',
									top: '60%'
								}
							}
						]);
					} else {
						scanBarVew.draw([{
								tag: 'img',
								id: 'scanBar',
								src: 'static/scanBar.png',
								position: {
									width: '6%',
									left: '46%',
									height: '70%',
									top: '0'
								}
							},
							{
								tag: 'font',
								id: 'font',
								text: '轻触照亮',
								textStyles: {
									size: '10px',
									color: '#ffffff'
								},
								position: {
									width: '80%',
									height: '50%',
									left: '9%',
									top: '60%'
								}
							}
						])
					}
					if (barcode) {
						barcode.setFlash(temp.flash);
					}
				}, false)
			},
			// 创建裁剪按钮
			createOrc(currentWebview) {
				scanBarOrc = new plus.nativeObj.View('scanBarOrc', {
						top: "90%",
						left: "0",
						height: "4%",
						width: "100%",
						position: 'static'
					},
					[{
						tag: "font",
						id: "font",
						text: "识字",
						textStyles: {
							size: "16px",
							color: "#ffffff",
						},
						position: {
							width: "50%",
							left: "24%",
							top: "0",
							height: "50%"
						},
					}, ]);
				scanBarOrc.interceptTouchEvent(true);
				currentWebview.append(scanBarOrc);
				var temp = this;
				scanBarOrc.addEventListener("click", (e) => { //拍照上传
					// console.log(e,"拍照上传")
					temp.$emit("toPhotograph", e)
				}, false)
			},
			// 创建搜索按钮
			createInput(currentWebview) {
				searchInput = new plus.nativeObj.View('searchInput', {
						top: "20%",
						left: "0",
						height: "30px",
						width: "100%",
					},
					[{
						tag:'input',
						id:'input',
						color: "#ffffff",
						inputStyles:{
							type: "search",
							placeholder:this.inpPlaceholder,
							fonstSize:'16px',
							borderColor:"#eeeeee",
							borderRadius:'15px',
							borderWidth:'0px',
							color: "#ffffff",
							size: '16px',
							onComplete:(data)=>{
								console.log(data);
								if(data.text){
									barcode.close(); //关闭扫码框
									this.$emit('searchEvent',data.text)
								}
							}
						},
						position:{
							top:'10%',
							left:'10%',
							width:'80%',
							height:'30px',
						}
					}]);
				searchInput.interceptTouchEvent(true);
				currentWebview.append(searchInput);
				var temp = this;
				
				// searchInput.addEventListener("click", (e) => { //搜索
				// 	barcode.close(); //关闭扫码框
				// 	temp.$emit('searchEvent')
				// }, false)
			},
		},
		beforeDestroy() {
			// #ifdef APP-PLUS
			// 返回时退出全屏
			// barcode.close();
			this.shutOff();
			plus.navigator.setFullscreen(false);
			// #endif
		},
		onUnload() { // 监听页面卸载
			console.log("onUnload");
			// barcode.close();
			this.shutOff()
			plus.navigator.setFullscreen(false);
		}
	};
</script>

<style scoped>
</style>
