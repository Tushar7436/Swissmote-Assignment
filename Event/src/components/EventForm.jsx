import PropTypes from "prop-types";

const EventForm = ({ formData, setFormData, handleFormSubmit, isEditing, onCancel }) => {
  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-xl font-semibold">{isEditing ? "Edit Event" : "Create Event"}</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
          required
        />
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
          rows={4}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
        >
          <option value="Running">Running</option>
          <option value="Live">Live</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
        </select>
        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="text-sm font-medium text-gray-700">
            Event Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
          />
        </div>
        {formData.image && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Event preview"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        )}
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm md:text-base"
        >
          {isEditing ? "Update Event" : "Create Event"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm md:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

EventForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    image: PropTypes.instanceOf(File),
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default EventForm
