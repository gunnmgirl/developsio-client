import { toast } from "react-toastify";

export default (message, type) => {
  switch (type) {
    case "error":
      toast.error(message);
      break;
    case "success":
      toast.success(message);
      break;
    default:
      toast(message);
  }
};
