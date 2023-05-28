import ConfirmDelete from "./ConfirmDelete";

export default function Modal ({action, current}) {
  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h2>Are you sure you want to delete this {action}</h2>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <ConfirmDelete  action={action} current={current}/>
          </div>
        </div>
      </div>
    </div>
  );
};
