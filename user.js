var data = [{username:"prahlad", password:"prahlad"},
          {username:"prahlad1", password:"prahlad1"},
          {username:"prahlad2", password:"prahlad2"}];
function check(form) {
  var x = form.userid.value;
  var y = form.pswrd.value;
  var count1 = 0;

  for (var i = 0; i < data.length; i++) {
    if ((data[i].username == x)&&(data[i].password == y)) {
        count1 = 1;
    }
  }
  if (count1 == 1) {
    window.open('/home/prahlad/Desktop/Webpage/login1.html')
  }
  else {
    window.alert('incorrect username or password')
  }
}
