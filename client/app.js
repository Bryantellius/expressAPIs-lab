$("document").ready(() => {
  loadChirps();
  addChirp();
  $("#refresh").click(() => loadChirps());
});

//Methods
const modalEdit = () => {
  $("#modalSave").click(() => {
    let editedChirp = {
      name: $("#editName").val(),
      text: $("#editTextArea").val()
    };
    //   $.ajax({
    //     url: `http://localhost:3000/api/chirps/:id`,
    //     type: "PUT",
    //     data: JSON.stringify(editedChirp),
    //     contentType: "application/json",
    //     success: (data, status) => console.log(`${data}, ${status}`)
    //   });
    console.log(editedChirp);
  });
};

const addChirp = () => {
  $("#displayBtn").click(() => {
    if ($("#inputName").val() === "" || $("#chirpsTextArea").val() === "") {
      $("#inputSection").prepend(
        $(
          "<h5 class='text-center bg-warning rounded shadow' id='inputWarning'>Input fields cannot be blank</h5>"
        )
      );
    } else {
      let chirp = {
        name: $("#inputName").val(),
        text: $("#chirpsTextArea").val()
      };
      console.log(chirp);
      $.ajax({
        url: "http://localhost:3000/api/chirps",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(chirp),
        success: (data, status, key) => {
          console.log(status);
          console(`post: ${key}`);
          loadChirps();
        }
      });

      $("#inputWarning").remove();
      $("#inputName").val("");
      $("#chirpsTextArea").val("");
    }
  });
};

const loadChirps = () => {
  $("#chirpsSection").empty();
  $.ajax({
    url: "http://localhost:3000/api/chirps",
    type: "GET",
    success: data => {
      console.log(data);
      Object.entries(data).map(([key, value]) => {
        if (key === "nextid") {
          return null;
        } else {
          console.log(`${value.name}: ${value.text}`);
          $("#chirpsSection").prepend(
            `<div class='card p-3' id=${key}>
                <span class='delete'>X</span>
                <h3 class='card-title'>${value.name}</h3>
                <p class='card-body'>${value.text}</p>
                <button class='btn btn-primary btn-sm w-25' data-toggle="modal" data-target="#exampleModal">Edit</button>
                </div>`
          );
        }
      });
    }
  });
};
