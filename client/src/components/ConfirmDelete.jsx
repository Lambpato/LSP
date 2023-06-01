import { useContext } from "react";
import { ActionContext } from "./ActionContext";

export default function ConfirmDelete ({path, id}) {
  const { globalToken } = useContext(ActionContext);

  const handleConfirm = async () => {
     try {
      const response = await fetch(`/api/${path}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${globalToken}`
        }
      });
      if (!response.ok) throw new Error (`Error Code: ${response.status} Error Message: It Boken`);
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <button
    type="button"
    className="btn- btn-primary"
    onClick={handleConfirm}
    data-bs-dismiss="modal">
      Confirm
    </button>
  )
};
