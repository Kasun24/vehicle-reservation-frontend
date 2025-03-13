import Swal from "sweetalert2";

export function showSuccess(message, title = "Success") {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
    timer: 1500,
  });
}

export function showError(message, title = "Error") {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
    timer: 1500,
  });
}
