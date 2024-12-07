const EditModal = ({ isOpen, onClose, review, onSubmit, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="rzr-hcm-hr-modal-overlay">
      <div className="rzr-hcm-hr-modal-content">
        <h2>Edit Review</h2>
        <form onSubmit={onSubmit}>
          <div className="rzr-hcm-hr-form-row">
            <div className="rzr-hcm-hr-form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={review.fullName}
                onChange={onChange}
                className="rzr-hcm-hr-input"
              />
            </div>
            <div className="rzr-hcm-hr-form-group">
              <label>Employee ID:</label>
              <input
                type="text"
                name="employeeId"
                value={review.employee_Id}
                onChange={onChange}
                className="rzr-hcm-hr-input"
              />
            </div>
          </div>
          <div className="rzr-hcm-hr-form-row">
            <div className="rzr-hcm-hr-form-group">
              <label>Review:</label>
              <input
                type="text"
                name="review"
                value={review.review}
                onChange={onChange}
                className="rzr-hcm-hr-input"
              />
            </div>
            <div className="rzr-hcm-hr-form-group">
              <label>Rating:</label>
              <input
                type="number"
                name="rating"
                value={review.rating}
                onChange={onChange}
                className="rzr-hcm-hr-input"
                max="5"
                min="1"
              />
            </div>
          </div>
          <div className="rzr-hcm-hr-form-row">
            <div className="rzr-hcm-hr-form-group">
              <label>Designation:</label>
              <input
                type="text"
                name="designation"
                value={review.designation}
                onChange={onChange}
                className="rzr-hcm-hr-input"
              />
            </div>
            <div className="rzr-hcm-hr-form-group">
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={review.department}
                onChange={onChange}
                className="rzr-hcm-hr-input"
              />
            </div>
          </div>
          <div className="rzr-hcm-hr-form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={review.createdAt}
              onChange={onChange}
              className="rzr-hcm-hr-input"
            />
          </div>
          <div className="rzr-hcm-hr-modal-buttons">
            <button type="submit" className="rzr-hcm-hr-button">
              Save
            </button>
            <button onClick={onClose} className="rzr-hcm-hr-button rzr-hcm-hr-button-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>


  );
};



export default EditModal;
