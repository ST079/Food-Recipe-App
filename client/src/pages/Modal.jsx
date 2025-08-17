<div
  className="modal fade"
  id="profileModal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabIndex="-1"
  aria-labelledby="profileModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      {/* Header */}
      <div className="modal-header">
        <h5 className="modal-title" id="profileModalLabel">
          👩‍🍳 Profile
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      {/* Body */}
      <div className="modal-body">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="profile"
            className="rounded-circle mb-3"
          />
          <h6>Chef Name</h6>
          <p className="text-muted">Short bio or details go here.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" className="btn btn-primary">
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>;
