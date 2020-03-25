$("document").ready(() => {
  $.get("http://localhost:3000/api/chirps", (data, status) => {
    console.log(status);
    console.log(data);
    for (let [key, body] of Object.entries(data)) {
      console.log(`${body.name}: ${body.text}`);
      $(".container").append(
        `<div class='card my-2'><h1 class='card-title'>${body.name}</h1><p class='card-body'>${body.text}</p></div>`
      );
    }
  });
});
