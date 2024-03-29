import ConfirmDelete from './ConfirmDelete';

export default function DeleteModal({
  userId,
  path,
  id,
  reset,
  cancel,
  forbidden
}) {
  const action = path.slice(0, -1);

  return (
    <div
      className="modal fade"
      id="delete-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="true"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h2>
              {forbidden
                ? 'Demo Data Cannot Be Deleted!'
                : `Are you sure you want to delete this ${action}?`}
            </h2>
          </div>
          <div className="modal-footer">
            {forbidden || (
              <button
                onClick={cancel}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Cancel
              </button>
            )}

            {forbidden ? (
              <button
                onClick={reset}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Ok
              </button>
            ) : (
              <ConfirmDelete
                userId={userId}
                path={path}
                id={id}
                reset={reset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
