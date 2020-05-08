

var thumbUp = document.getElementsByClassName("fas fa-mug-hot");
var thumbDown = document.getElementsByClassName("fas fa-volume-up");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const order = this.parentNode.parentNode.childNodes[3].innerText
        const status = this.parentNode.parentNode.childNodes[17].innerText
        console.log(status)
        fetch('orders', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'order': order,
            'status':status,
          })
        })

        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });

});
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        // const name = this.parentNode.parentNode.childNodes[1].innerText
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        // const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        // console.log(thumbDown)
        // fetch('thumbDown', {
        //   method: 'put',
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify({
        //     'name': name,
        //     'msg': msg,
        //     'thumbUp':thumbUp
        //   })
        // })
        // .then(response => {
        //   if (response.ok) return response.json()
        // })
        // .then(data => {
        //   console.log(data)
        //   window.location.reload(true)
        // })
        words()
      });
});

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload() //take the response and reload the page
//         })
//       });
// });
