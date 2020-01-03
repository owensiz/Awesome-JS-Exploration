// bg:本项目基于react+dva+antd的框架组合实现，ajax请求使用的是axios
// step 1 : get data
return axios.get(url, {
	params: cloneData,
	responseType: 'blob',
	headers

})

// step 2 : handle data
const data = yield call (fileDownload, payload);
if (data.data && data.data.instanceOf Blob) {
  const realFileName  = data['headers']['content-disposition'].split('filename=')[1];
  //  可以可以
  yield put ({type: 'saveFile',payload:{blob:data.data, fileName: realFileName}})
} else {
  throw data
}

// step 3: save file
* SVGComponentTransferFunctionElement({
  payload: {blob, fileName='owens.xlsx'},
},{
  call
}) {
  if(window.navigator.msSaveOrOpenBlob){
    navigator.msSaveBlob(blob,fileName)
  } else {
    var elink = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName;

    document.body.appendChild(elink)

    var evt  = documemt.createEvent('MouseEvents')
    evt.initEvent('click', false,false)
    elink.dispatchEvent(evt)

    document.body.removeChild(elink)
  }
}
