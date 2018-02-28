function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var client_id = uuidv4();
//var position = ds.record.getRecord( 'position' );
//position.set({});

var draw = new SVG('drawing').size(500, 500);
var rect = draw.rect();
draw.on('mousedown', function(event){
    data = {
        'client': client_id,
        'x': event.x,
        'y': event.y
    }
    // position.set('start', data);
    // console.log(position.get());
    
    ds.event.emit('start', data);
    options = {};
    rect.draw(event, {});
});

draw.on('mouseup', function(event){
    data = {
        'client': client_id,
        'x': event.x,
        'y': event.y
    }
    // position.set('stop', data);
    // console.log(position.get());
    ds.event.emit('stop', data);
    rect.draw(event);
});

ds.event.subscribe('start', function(data){
    window.start = data;
    console.log(data)
});

ds.event.subscribe('stop', function(data){
    if(data.client == client_id){
        return;
    }
    window.stop = data;
    length = Math.abs(start.x-stop.x);
    height = Math.abs(start.y-stop.y);
    var rect = draw.rect(length, height).attr({ fill: '#f06' })
    console.log(data)
});

//position.subscribe('start', function(value){
//    debugger;
//    console.log(value);
//});
//
//position.subscribe('stop', function(value){
//    debugger;
//    console.log(value);
//});

//position.set(
//    client_id, {
//    'end': {
//        'x': event.x,
//        'y': event.y
//    }
//});

