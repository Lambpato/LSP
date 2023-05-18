import { useContext } from "react";
import { ActionContext } from "./ActionContext";

export default function Model ({action, id}) {
  const { globalToken } = useContext(ActionContext);

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/${action}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${globalToken}`
        }
      });
      if (!response.ok) throw new Error (`Error Code: ${response.status} Error Message: It Boken`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Confirm</button>
        <button type="button" class="btn btn-primary">Cancel</button>
      </div>
    </div>
  </div>
</div>
  );
};
