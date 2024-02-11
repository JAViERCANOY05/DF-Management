import { toast } from "react-toastify";

export function notifySuccess(meesage: string) {
  toast.success(` ${meesage} `, {
    position: "bottom-right",
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export function notifyWarning(meesage: string) {
  toast.warn(`${meesage} `, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export function notifyError(meesage: string) {
  toast.error(` ${meesage} `, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
