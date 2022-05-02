var canvas = new fabric.Canvas('canvas');
document.getElementById('file').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;                    
    window.fabric.Image.fromURL(data, function (img) {
      img.set({
        left: 300,
        top: 0
      });
      img.scaleToHeight(300);
      img.scaleToWidth(300);
      canvas.add(img);
      var a = canvas.setActiveObject(oImg);
      var dataURL = canvas.toDataURL({format: 'jpg', quality: 1});
    })
    canvas.on('mouse:wheel', function(img) {
      var delta = img.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 1) zoom = 1;
      canvas.zoomToPoint({ x: img.e.offsetX, y: img.e.offsetY }, zoom);
      img.e.preventDefault();
      img.e.stopPropagation();
      var vpt = canvas.viewportTransform;
      if (zoom < 400 / 1000) {
        vpt[4] = 200 - 1500 * zoom / 2;
        vpt[5] = 200 - 600 * zoom / 2;
      } else {
        if (vpt[4] >= 0) {
          vpt[4] = 0;
        } else if (vpt[4] < canvas.getWidth() - 1500 * zoom) {
          vpt[4] = canvas.getWidth() - 1500 * zoom;
        }
        if (vpt[5] >= 0) {
          vpt[5] = 0;
        } else if (vpt[5] < canvas.getHeight() - 600 * zoom) {
          vpt[5] = canvas.getHeight() - 600 * zoom;
        }
      }})
  };
  reader.readAsDataURL(file);
});
