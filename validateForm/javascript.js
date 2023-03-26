var fields = {
  email: {
    require: "vui long nhap email",
    email: "vui long nhap dung kieu email",
  },
  password: {
    require: "vui long nhap password",
  },
};

function $(id) {
  return document.getElementById(id);
}

function handleSubmitForm(event) {
  event.preventDefault();
  for (var key in fields) {
    try {
      showError(key, "");
      validateForm(key, $(key).value);
    } catch (error) {
      showError(key, error);
    }
  }
}

function showError(fieldName, error) {
  // set error cho field tuong ung
  $(`${fieldName}-error1`).innerText = error;
}

//dung de validate cac field ở obj fields phía trên
function validateForm(fieldName, value) {
  // lấy obj cần validate đối với từng field
  var objValidate = fields[fieldName];
  var regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  // check xem objValidate có key require hay ko
  if (objValidate.require) {
    if (!value) {
      throw objValidate.require;
    }
  }
  // check xem objValidate có key email hay ko

  if (objValidate.email) {
    if (!regexEmail.test(value)) {
      throw objValidate.email;
    }
  }
}

function onLoadWindow() {
  $("submit").onclick = handleSubmitForm;
}

window.onload = onLoadWindow;
