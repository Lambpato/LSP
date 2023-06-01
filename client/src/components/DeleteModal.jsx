import ConfirmDelete from "./ConfirmDelete";

export default function DeleteModal ({ path, id }) {
const action = path.slice(0, -1);

  return (
    <div className="modal fade" id="delete-modal" data-bs-backdrop="static" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h2>Are you sure you want to delete this {action}?</h2>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <ConfirmDelete  path={path} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
