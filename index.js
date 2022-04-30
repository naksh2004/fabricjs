var canvas = new fabric.Canvas('canvas');
document.getElementById('file').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;                    
    window.fabric.Image.fromURL(data, function (img) {
      img.set({
        left: 400,
        top: 100
      });
      img.scaleToHeight(500);
      img.scaleToWidth(500);
      canvas.add(img);
      var a = canvas.setActiveObject(oImg);
      var dataURL = canvas.toDataURL({format: 'jpg', quality: 1});
    })
  };
  reader.readAsDataURL(file);
});
