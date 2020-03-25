$("document").ready(() => {
  loadChirps();
  addChirp();
});

//Methods
const deleteChirp = props => {
  console.log(props.id);
  $(`#${props.id}`).remove();
  $.ajax({
    url: `http://localhost:3000/api/chirps/${props.id}`,
    type: "DELETE",
    success: (data, status) => console.log(`${data}: ${status}`)
  });
};

const modalEdit = props => {
  let editedChirp = {
    name: $("#editName").val(),
    text: $("#editTextArea").val()
  };
  console.log(editedChirp);
  $.ajax({
    url: `http://localhost:3000/api/chirps/${props}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(editedChirp)
  }).done(res => {
    console.log(res);
    loadChirps();
  });
};

const modalToggle = props => {
  $("#modalSave").click(() => modalEdit(props.id));
  console.log("before modalSave");
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
        data: JSON.stringify(chirp)
      }).done(res => {
        console.log(res);
        console.log(`post: ${chirp}`);
        loadChirps();
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
    type: "GET"
  }).done(data => {
    console.log(data);
    Object.entries(data).map(([key, value]) => {
      if (key === "nextid") {
        return null;
      } else {
        console.log(`${value.name}: ${value.text}, at ${key}`);
        $("#chirpsSection").prepend(
          `<div class='card p-3' id=${key}>
                <span class='delete' onclick={deleteChirp(this.parentNode)}>X</span>
                <h3 class='card-title'>${value.name}</h3>
                <p class='card-body'>${value.text}</p>
                <button class='btn btn-primary btn-sm w-25' onclick={modalToggle(this.parentNode)} data-target="#exampleModal" data-toggle="modal">Edit</button>
              </div>`
        );
      }
    });
  });
};
