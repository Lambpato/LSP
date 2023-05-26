import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";

function Modal ({action, current}) {
  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h2>Are you sure you want to delete this {action}</h2>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <ConfirmDelete  action={action}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ToggleModal ({action, id}) {
  const [current, setCurrent] = useState();

      window.addEventListener('keydown', (e) => {
      current !== id ? setCurrent(id) : setCurrent(0);
      if ((e.key === 'D' && current !== 0) || (e.key === 'd' && current !== 0)) {
        console.log(e.key)
        return <Modal action={action} id={id}/>
    };
  });

}
